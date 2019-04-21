/* eslint-disable no-underscore-dangle */

import { pipe } from 'rxjs';
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
  catchError,
  merge
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

const ON = Symbol('ON');
const OFF = Symbol('OFF');

const isPaused = data => [ON, OFF].includes(data);

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
        message: 'Loading packages..'
      }),
      clearSelected(),
      clearCommands(),
      clearNotifications(),
      clearInstallOptions(),
      clearPackages()
    ])
  );

const installPackagesEpic = action$ =>
  action$.pipe(
    ofType(installPackages.type),
    mergeMap(({ payload }) => {
      ipcRenderer.send('ipc-event', payload);

      return [
        updateLoader({
          loading: true,
          message: 'Installing packages..'
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
          operations: { packagesInstallOptions },
          directory
        }
      } = state$.value;

      const packagesFromPackageJson = readPackageJson(directory);
      const packagesInstallOptionsFromJson = objectEntries(
        pick(
          ['dependencies', 'devDependencies', 'optionalDependencies'],
          packagesFromPackageJson
        )
      );

      return {
        options: packagesInstallOptionsFromJson || []
      };
    }),
    tap(console.log),
    mergeMap(({ options }) => {
      const {
        common: {
          mode,
          directory,
          selected,
          operations: { packagesInstallOptions }
        }
      } = state$.value;

      const pkgOptions =
        (packagesInstallOptions.length && packagesInstallOptions) || options;

      const parameters = {
        ipcEvent: 'install',
        cmd: ['install'],
        packages: selected,
        pkgOptions,
        multiple: true,
        mode,
        directory
      };

      console.log(parameters);
      // ipcRenderer.send('ipc-event', payload);

      return [
        updateLoader({
          loading: true,
          message: 'Installing packages..'
        }),
        setActivePage({
          page: 'packages',
          paused: false
        })
      ];
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

const updatePackagesEpic = pipe(
  ofType(updatePackages.type),
  mergeMap(({ payload }) => {
    const { ipcEvent, packages, name } = payload;

    ipcRenderer.send('ipc-event', payload);

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
        message: 'Updating packages..'
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

const getPackagesListenerEpic = (action$, state$) =>
  action$.pipe(
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
  installPackagesEpic,
  installMultiplePackagesEpic,
  updatePackagesEpic,
  viewPackageEpic,
  viewPackageListenerEpic,
  getPackagesListenerEpic,
  searchPackagesListenerEpic,
  npmActionsListenerEpic,
  onMapPackagesEpic
);
