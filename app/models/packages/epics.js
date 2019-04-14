import { pipe } from 'rxjs';
import {
  map,
  tap,
  mergeMap,
  switchMap,
  concatMap,
  withLatestFrom,
  filter,
  ignoreElements,
  takeWhile,
  catchError
} from 'rxjs/operators';

import { combineEpics, ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';
import { isPackageOutdated } from 'commons/utils';

import {
  toggleLoader,
  togglePackageLoader,
  setActivePage,
  setSnackbar,
  clearSelected
} from 'models/ui/actions';

import { clearNotifications } from 'models/notifications/actions';
import { clearCommands, setRunningCommand } from 'models/npm/actions';
import { initActions } from 'models/common/actions';

import {
  clearPackages,
  installPackages,
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

const onInitActionsEpic = pipe(
  ofType(initActions.type),
  mergeMap(() => [
    getPackagesListener(),
    searchPackagesListener(),
    viewPackageListener(),
    npmActionsListener()
  ])
);

const startEpic = (action$, state$) =>
  action$.pipe(
    ofType(setPackagesStart.type),
    mergeMap(({ payload: { channel, options } }) => {
      const {
        ui: { paused }
      } = state$.value;

      return [paused ? OFF : ON, { payload: { channel, options } }];
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
      clearCommands(),
      clearNotifications(),
      clearPackages()
    ])
  );

const installPackagesEpic = pipe(
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
          dependencies,
          projectName,
          projectVersion,
          projectDescription,
          fromSearch,
          fromSort
        }
      }) => {
        const {
          packages: { packagesOutdated }
        } = state$.value;

        const enhancedDependencies = dependencies
          .filter(dependency => dependency && typeof dependency === 'object')
          .reduce((deps = [], dependency) => {
            const {
              name,
              invalid,
              extraneous,
              peerMissing,
              problems,
              missing,
              ...rest
            } = dependency;

            if (!invalid && !peerMissing) {
              const [isOutdated, outdatedPkg] = isPackageOutdated(
                packagesOutdated,
                name
              );

              const enhancedDependency = {
                ...rest,
                name,
                extraneous,
                missing,
                peerMissing,
                latest: isOutdated ? outdatedPkg.latest : null,
                isOutdated
              };

              deps.push(enhancedDependency);
            }

            return deps;
          }, []);

        return setPackages({
          dependencies: enhancedDependencies,
          projectName,
          projectVersion,
          projectDescription,
          fromSearch,
          fromSort
        });
      }
    )
  );

const getPackagesListenerEpic = (action$, state$) =>
  action$.pipe(
    ofType(getPackagesListener.type),
    switchMap(() => {
      const {
        common: { mode, directory }
      } = state$.value;

      return onGetPackages$({
        mode,
        directory
      });
    }),
    catchError(err =>
      setSnackbar({
        type: 'error',
        open: true,
        message: err
      })
    )
  );

const searchPackagesListenerEpic = action$ =>
  action$.pipe(
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

const npmActionsListenerEpic = (action$, state$) =>
  action$.pipe(
    ofType(npmActionsListener.type),
    switchMap(() => {
      const {
        common: { mode, directory }
      } = state$.value;

      return onNpmActions$({ mode, directory });
    }),
    tap(console.log),
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
  onInitActionsEpic,
  startCleanPackages,
  startEpic,
  installPackagesEpic,
  updatePackagesEpic,
  viewPackageEpic,
  viewPackageListenerEpic,
  getPackagesListenerEpic,
  searchPackagesListenerEpic,
  npmActionsListenerEpic,
  onMapPackagesEpic
);
