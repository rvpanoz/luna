/* eslint-disable no-underscore-dangle */

import { of, pipe } from 'rxjs';
import { PACKAGE_GROUPS } from 'constants/AppConstants';
import {
  readPackageJson,
  isPackageOutdated,
  objectEntries
} from 'commons/utils';
import { pick } from 'ramda';

import {
  map,
  tap,
  mergeMap,
  switchMap,
  concatMap,
  withLatestFrom,
  filter,
  ignoreElements,
  catchError
} from 'rxjs/operators';

import { combineEpics, ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';

import {
  toggleLoader,
  togglePackageLoader,
  setActivePage,
  setSnackbar,
  clearSelected
} from 'models/ui/actions';
import { clearInstallOptions } from 'models/common/actions';
import { clearNotifications } from 'models/notifications/actions';
import { clearCommands, setRunningCommand } from 'models/npm/actions';

import {
  clearPackages,
  installPackages,
  installMultiplePackages,
  updatePackages,
  setPackagesStart,
  setPackagesSuccess,
  mapPackages,
  viewPackage,
  getPackagesListener,
  searchPackagesListener,
  viewPackageListener,
  npmActionsListener
} from './actions';

import {
  onGetPackages$,
  onSearchPackages$,
  onNpmActions$,
  onViewPackage$
} from './listeners';

const IPC_EVENT = 'ipc-event';
const MESSAGES = {
  install: 'Installing packages..',
  update: 'Updating packages..',
  loading: 'Loading packages..'
};
const ON = Symbol('ON');
const OFF = Symbol('OFF');

const updateCommand = ({
  operationStatus,
  operationPackages,
  operationCommand
}) => ({
  type: setRunningCommand.type,
  payload: {
    operationStatus,
    operationPackages,
    operationCommand
  }
});

const updateLoader = payload => ({
  type: toggleLoader.type,
  payload
});

const updatePackageLoader = payload => ({
  type: togglePackageLoader.type,
  payload
});

const setPackages = payload => ({
  type: setPackagesSuccess.type,
  payload
});

const isPaused = data => [ON, OFF].includes(data);

// operator to handle pause event
const onOffOperator = () => src$ =>
  src$.pipe(
    withLatestFrom(src$.pipe(filter(isPaused))),
    filter(([value, paused]) => paused === ON), // eslint-disable-line
    map(([value]) => value),
    filter(data => !isPaused(data))
  );

const startEpic = (action$, state$) =>
  action$.pipe(
    ofType(setPackagesStart.type),
    mergeMap(({ payload: { channel, options } }) => {
      const {
        ui: { paused },
        common: { mode, directory }
      } = state$.value;

      return [
        paused ? OFF : ON,
        {
          payload: {
            channel,
            options: Object.assign({}, options, {
              mode,
              directory
            })
          }
        }
      ];
    }),
    onOffOperator(),
    tap(({ payload: { channel, options } }) =>
      ipcRenderer.send(channel, options)
    ),
    ignoreElements()
  );

const startCleanPackages = (action$, state$) =>
  action$.pipe(
    ofType(setPackagesStart.type),
    mergeMap(() => {
      const {
        ui: { paused }
      } = state$.value;

      return [paused ? OFF : ON, {}];
    }),
    onOffOperator(),
    concatMap(() => [
      updateLoader({
        loading: true,
        message: MESSAGES.loading
      }),
      clearSelected(),
      clearCommands(),
      clearNotifications(),
      clearInstallOptions(),
      clearPackages()
    ])
  );

const installPackageEpic = action$ =>
  action$.pipe(
    ofType(installPackages.type),
    mergeMap(({ payload }) => {
      ipcRenderer.send(IPC_EVENT, payload);

      return [
        updateLoader({
          loading: true,
          message: MESSAGES.install
        }),
        setActivePage({
          page: 'packages',
          paused: false
        })
      ];
    })
  );

const installMultiplePackagesEpic = (action$, state$) =>
  action$.pipe(
    ofType(installMultiplePackages.type),
    map(() => {
      const {
        common: {
          mode,
          directory,
          operations: { packagesInstallOptions }
        }
      } = state$.value;

      if (mode === 'global') {
        return {
          from: 'global',
          options: []
        };
      }

      if (packagesInstallOptions && packagesInstallOptions.length) {
        return {
          from: 'flags',
          options: packagesInstallOptions
        };
      }

      const packagesFromPackageJson = readPackageJson(directory);
      const packagesInstallOptionsFromJson = packagesFromPackageJson
        ? objectEntries(
            pick(
              ['dependencies', 'devDependencies', 'optionalDependencies'],
              packagesFromPackageJson
            )
          )
        : [];

      return {
        from: 'json',
        options: packagesInstallOptionsFromJson
      };
    }),
    switchMap(({ from, options }) => {
      const {
        ui: { selected }
      } = state$.value;

      return of(
        selected.map(selectedPackage => {
          let details;

          if (from === 'json') {
            details = options.filter(option => {
              /* eslint-disable-next-line */
              const [groupName, dependencies] = option;

              return dependencies[selectedPackage];
            });

            /* eslint-disable-next-line */
            const [group, packages] = details[0];

            return {
              type: 'ADD_OPTIONS',
              name: selectedPackage,
              options: group ? [].concat(PACKAGE_GROUPS[group]) : []
            };
          }

          if (from === 'flags') {
            return {
              type: 'ADD_OPTIONS',
              name: selectedPackage,
              options: options
                ? options.find(option => option.name === selectedPackage)
                    .options
                : []
            };
          }

          return {
            type: 'ADD_OPTIONS',
            name: selectedPackage,
            options: []
          };
        })
      );
    }),
    map(commandOptions => {
      const {
        ui: { selected },
        common: { mode, directory }
      } = state$.value;

      const options = commandOptions.map(opt => opt.options);
      const mergedOptions = [].concat(options);

      const parameters = {
        ipcEvent: 'install',
        cmd: options.map(() => 'install'),
        packages: selected,
        pkgOptions: mergedOptions,
        multiple: true,
        mode,
        directory
      };

      ipcRenderer.send(IPC_EVENT, parameters);

      return updateLoader({
        loading: true,
        message: MESSAGES.install
      });
    })
  );

const viewPackageEpic = pipe(
  ofType(viewPackage.type),
  map(({ payload }) => {
    const { name } = payload;

    ipcRenderer.send('ipc-event', payload);

    return updatePackageLoader({
      loading: true,
      message: `Loading ${name}`
    });
  })
);

const updatePackagesEpic = (action$, state$) =>
  action$.pipe(
    ofType(updatePackages.type),
    mergeMap(({ payload }) => {
      const {
        common: { mode, directory }
      } = state$.value;
      const { ipcEvent, packages, name } = payload;

      ipcRenderer.send(
        'ipc-event',
        Object.assign({}, payload, {
          mode,
          directory
        })
      );

      if (ipcEvent === 'uninstall') {
        return [
          updateCommand({
            operationStatus: 'running',
            operationCommand: ipcEvent,
            operationPackages: packages && packages.length ? packages : [name]
          }),
          {
            type: clearSelected.type
          }
        ];
      }

      return [
        updateLoader({
          loading: true,
          message: MESSAGES.update
        }),
        setActivePage({
          page: 'packages',
          paused: false
        }),
        updateCommand({
          operationStatus: 'running',
          operationCommand: ipcEvent,
          operationPackages: packages && packages.length ? packages : [name]
        })
      ];
    })
  );

const onMapPackagesEpic = (action$, state$) =>
  action$.pipe(
    ofType(mapPackages.type),
    map(
      ({
        payload: {
          data,
          projectName,
          projectVersion,
          projectDescription,
          fromSearch,
          fromSort
        }
      }) => {
        const {
          common: { mode, directory },
          packages: {
            packagesOutdated,
            project: { name, version, description }
          }
        } = state$.value;

        const enhancedDependencies = data.reduce((deps = [], dependency) => {
          let group;

          const [pkgName, details] = fromSearch
            ? [
                dependency.name,
                {
                  version: dependency.version,
                  description: dependency.description
                }
              ]
            : dependency;

          const { extraneous, invalid, missing, peerMissing } = details || {};

          if (mode === 'local') {
            const packageJSON = readPackageJson(directory);

            if (!packageJSON) {
              return null;
            }

            group = Object.keys(PACKAGE_GROUPS).find(
              groupName =>
                packageJSON[groupName] && packageJSON[groupName][pkgName]
            );
          }

          if (!invalid && !peerMissing && !missing && !extraneous) {
            const [isOutdated, outdatedPkg] = isPackageOutdated(
              packagesOutdated,
              pkgName
            );

            const enhancedDependency = {
              ...details,
              name: pkgName,
              extraneous,
              missing,
              peerMissing,
              latest: isOutdated ? outdatedPkg.latest : null,
              isOutdated,
              __hasError: missing || peerMissing || extraneous,
              __fromSearch: fromSearch,
              __group: group
            };

            deps.push(enhancedDependency);
          }

          return deps;
        }, []);

        return setPackages({
          dependencies: enhancedDependencies,
          projectName: projectName || name,
          projectVersion: projectVersion || version,
          projectDescription: projectDescription || description,
          fromSearch,
          fromSort
        });
      }
    )
  );

const getPackagesListenerEpic = pipe(
  ofType(getPackagesListener.type),
  switchMap(() => onGetPackages$()),
  catchError(err =>
    setSnackbar({
      type: 'error',
      open: true,
      message: err
    })
  )
);

const searchPackagesListenerEpic = pipe(
  ofType(searchPackagesListener.type),
  switchMap(() => onSearchPackages$),
  catchError(err =>
    setSnackbar({
      type: 'error',
      open: true,
      message: err
    })
  )
);

const npmActionsListenerEpic = pipe(
  ofType(npmActionsListener.type),
  switchMap(() => onNpmActions$),
  catchError(err =>
    setSnackbar({
      type: 'error',
      open: true,
      message: err
    })
  )
);

const viewPackageListenerEpic = action$ =>
  action$.pipe(
    ofType(viewPackageListener.type),
    switchMap(() => onViewPackage$),
    catchError(err =>
      setSnackbar({
        type: 'error',
        open: true,
        message: err
      })
    )
  );

export default combineEpics(
  startCleanPackages,
  startEpic,
  installPackageEpic,
  installMultiplePackagesEpic,
  updatePackagesEpic,
  viewPackageEpic,
  viewPackageListenerEpic,
  getPackagesListenerEpic,
  searchPackagesListenerEpic,
  npmActionsListenerEpic,
  onMapPackagesEpic
);
