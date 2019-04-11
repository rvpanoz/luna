/* eslint-disable no-unused-vars */

import {
  map,
  mergeMap,
  takeWhile,
  concatMap,
  filter,
  tap,
  takeLast,
  takeUntil,
  last
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';
import { isPackageOutdated } from 'commons/utils';

import {
  toggleLoader,
  togglePackageLoader,
  setActivePage,
  setPage,
  clearSelected
} from 'models/ui/actions';

import { clearNotifications } from 'models/notifications/actions';
import { clearCommands, setRunningCommand } from 'models/npm/actions';

import {
  clearAll,
  clearPackages,
  installPackages,
  updatePackages,
  setPackagesStart,
  setPackagesSuccess,
  setOutdatedSuccess,
  updateData,
  viewPackage
} from './actions';

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

const setOutdated = payload => ({
  type: setOutdatedSuccess.type,
  payload
});

const setPackages = payload => ({
  type: setPackagesSuccess.type,
  payload
});

const clearAllData = () => ({
  type: clearAll.type
});

const clearAllEpic = action$ =>
  action$.pipe(
    ofType(clearAll.type),
    mergeMap(() => [
      { type: clearPackages.type },
      { type: clearCommands.type },
      { type: clearNotifications.type }
    ])
  );

const packagesStartEpic = (action$, state$) =>
  action$.pipe(
    ofType(setPackagesStart.type),
    map(({ payload: { channel, options } }) => {
      const { forceUpdate } = options || {};
      const {
        ui: { paused }
      } = state$.value;

      if (paused) {
        return { type: 'PAUSE_REQUEST' };
      }

      if (forceUpdate) {
        return { type: 'RESUME_REQUEST', payload: { forceUpdate } };
      }

      ipcRenderer.send(channel, options);
      return { type: 'RESUME_REQUEST' };
    }),
    takeWhile(({ type }) => type !== 'PAUSE_REQUEST'),
    concatMap(({ type, payload }) => {
      const { forceUpdate } = payload || {};
      const {
        packages: {
          packagesData,
          packagesOutdated,
          project: { name, version }
        }
      } = state$.value;

      if (forceUpdate) {
        return [
          {
            type: updateData.type,
            payload: {
              dependencies: packagesData,
              outdated: packagesOutdated,
              projectName: name,
              projectVersion: version
            }
          }
        ];
      }

      return [
        updateLoader({
          loading: true,
          message: 'Loading packages..'
        }),
        clearAllData()
      ];
    })
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

const viewPackagesEpic = action$ =>
  action$.pipe(
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

const updatePackagesEpic = action$ =>
  action$.pipe(
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

const packagesSuccessEpic = (action$, state$) =>
  action$.pipe(
    ofType(updateData.type),
    takeWhile(({ payload: { dependencies } }) => Array.isArray(dependencies)),
    map(
      ({
        payload: {
          dependencies,
          outdated,
          projectName,
          projectVersion,
          projectDescription
        }
      }) => {
        if (!dependencies.length) {
          return {
            dependencies
          };
        }

        const withOutdated = dependencies.reduce((deps = [], dependency) => {
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
            const [isOutdated, outdatedPkg] = isPackageOutdated(outdated, name);

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

        return {
          dependencies: withOutdated.filter(dependency => Boolean(dependency)),
          outdated,
          projectName,
          projectVersion,
          projectDescription
        };
      }
    ),
    concatMap(({ dependencies, outdated, projectName, projectVersion }) => {
      const {
        ui: { page },
        packages: {
          metadata: { fromSearch, fromSort }
        }
      } = state$.value;

      const actions = [];

      if (page !== 0) {
        actions.unshift(setPage({ page: 0 }));
      }

      if (dependencies && !dependencies.length) {
        return [updateLoader({ loading: false, message: null })];
      }

      return [
        setPackages({
          projectName,
          projectVersion,
          fromSearch,
          fromSort,
          dependencies
        }),
        setOutdated({ outdated }),
        ...actions,
        updateLoader({ loading: false, message: null })
      ];
    })
  );

export default combineEpics(
  packagesStartEpic,
  packagesSuccessEpic,
  installPackagesEpic,
  clearAllEpic,
  updatePackagesEpic,
  viewPackagesEpic
);
