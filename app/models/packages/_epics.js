/* eslint-disable */

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
  npmActionsListener,
  prepareInstall,
  addInstallationOption
} from './actions';

import {
  onGetPackages$,
  onSearchPackages$,
  onNpmActions$,
  onViewPackage$
} from './listeners';

import { installationEpic } from './installationEpics';

import { onOffOperator } from './operators';
import MESSAGES from './messages';
import mk from '../../mk';

const IPC_EVENT = 'ipc-event';
const ON = 'ON';
const OFF = 'OFF';

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

const addInstallationOptionAction = payload => ({
  type: addInstallationOption.type,
  payload
});

const prepareInstallationOptions = payload => ({
  type: prepareInstall.type,
  payload
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
    onOffOperator(ON, OFF),
    tap(({ payload: { channel, options } }) =>
      ipcRenderer.send(channel, options)
    ),
    catchError(error => {
      mk.log(error);

      setSnackbar({
        type: 'error',
        open: true,
        message: 'Sorry an error occured. Please try again'
      });
    }),
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
    onOffOperator([ON, OFF]),
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

// installation

// deprecated
// const installMultiplePackagesEpic = (action$, state$) =>
//   action$.pipe(
//     ofType(installMultiplePackages.type),
//     map(() => {
//       const {
//         common: {
//           mode,
//           directory,
//           operations: { packagesInstallOptions }
//         }
//       } = state$.value;

//       if (mode === 'global') {
//         return {
//           from: 'global',
//           options: []
//         };
//       }

//       if (packagesInstallOptions && packagesInstallOptions.length) {
//         return {
//           from: 'flags',
//           options: packagesInstallOptions
//         };
//       }

//       const packagesFromPackageJson = readPackageJson(directory);
//       const packagesInstallOptionsFromJson = packagesFromPackageJson
//         ? objectEntries(
//             pick(
//               ['dependencies', 'devDependencies', 'optionalDependencies'],
//               packagesFromPackageJson
//             )
//           )
//         : [];

//       return {
//         from: 'json',
//         options: packagesInstallOptionsFromJson
//       };
//     }),
//     switchMap(({ from, options }) => {
//       const {
//         ui: { selected }
//       } = state$.value;

//       return of(
//         selected.map(selectedPackage => {
//           let details;

//           if (from === 'json') {
//             details = options.filter(option => {
//               /* eslint-disable-next-line */
//               const [groupName, dependencies] = option;

//               return dependencies[selectedPackage];
//             });

//             /* eslint-disable-next-line */
//             const [group, packages] = details[0];

//             return {
//               type: 'ADD_OPTIONS',
//               name: selectedPackage,
//               options: group ? [].concat(PACKAGE_GROUPS[group]) : []
//             };
//           }

//           if (from === 'flags') {
//             return {
//               type: 'ADD_OPTIONS',
//               name: selectedPackage,
//               options: options
//                 ? options.find(option => option.name === selectedPackage)
//                     .options
//                 : []
//             };
//           }

//           return {
//             type: 'ADD_OPTIONS',
//             name: selectedPackage,
//             options: []
//           };
//         })
//       );
//     }),
//     map(commandOptions => {
//       const {
//         ui: { selected },
//         common: { mode, directory }
//       } = state$.value;

//       const options = commandOptions.map(opt => opt.options);
//       const mergedOptions = [].concat(options);

//       const parameters = {
//         ipcEvent: 'install',
//         cmd: options.map(() => 'install'),
//         packages: selected,
//         pkgOptions: mergedOptions,
//         multiple: true,
//         mode,
//         directory
//       };

//       ipcRenderer.send(IPC_EVENT, parameters);

//       return updateLoader({
//         loading: true,
//         message: MESSAGES.install
//       });
//     })
//   );

const completeInstallationEpic = (action$, state$) =>
  action$.pipe(
    ofType(addInstallationOption.type),
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

const installMultiplePackagesFromGlobalEpic = (action$, state$) =>
  action$.pipe(
    ofType(installMultiplePackages.type),
    withLatestFrom(state$),
    filter(
      ([
        ,
        {
          common: { mode }
        }
      ]) => mode === 'global'
    ),
    map(() =>
      prepareInstallationOptions({
        from: 'global',
        options: []
      })
    )
  );

const prepareInstallEpic = (action$, state$) =>
  action$.pipe(
    ofType(prepareInstall.type),
    switchMap(({ from, options }) => {
      const {
        ui: { selected }
      } = state$.value;

      selected.map(selectedPackage => {
        let details;

        if (from === 'json') {
          details = options.filter(option => {
            const [, dependencies] = option;

            return dependencies[selectedPackage];
          });

          const [group] = details;

          return addInstallationOptionAction({
            name: selectedPackage,
            options: group ? [].concat(PACKAGE_GROUPS[group]) : []
          });
        }

        if (from === 'flags') {
          return addInstallationOptionAction({
            name: selectedPackage,
            options: options
              ? options.find(option => option.name === selectedPackage).options
              : []
          });
        }

        return addInstallationOptionAction({
          name: selectedPackage,
          options: []
        });
      });
    })
  );

// view
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
  switchMap(() => onGetPackages$),
  catchError(err => {
    mk.log(err);

    setSnackbar({
      type: 'error',
      open: true,
      message: 'Sorry an error occured. Please try again'
    });
  })
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

  installPackagesEpics,

  // installPackagesEpic,
  // installMultiplePackagesFromGlobalEpic,
  // prepareInstallEpic,
  // completeInstallationEpic,

  // installMultiplePackagesEpic,
  updatePackagesEpic,
  viewPackageEpic,
  viewPackageListenerEpic,
  getPackagesListenerEpic,
  searchPackagesListenerEpic,
  npmActionsListenerEpic,
  onMapPackagesEpic
);
