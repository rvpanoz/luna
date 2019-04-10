/* eslint-disable no-unused-vars */

import { map, mergeMap, takeWhile, concatMap, tap } from 'rxjs/operators';
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
    concatMap(() => [
      { type: clearPackages.type },
      { type: clearCommands.type },
      { type: clearNotifications.type }
    ])
  );

const packagesStartEpic = (action$, state$) =>
  action$.pipe(
    ofType(setPackagesStart.type),
    map(({ payload: { channel, options, paused, forceUpdate } }) => {
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
    concatMap(({ payload }) => {
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
        payload: { dependencies, outdated, projectName, projectVersion }
      }) => {
        const withOutdated = dependencies.reduce((deps = [], dependency) => {
          const {
            invalid,
            extraneous,
            peerMissing,
            problems,
            missing,
            ...rest
          } = dependency;

          const { name } = rest;

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
          projectVersion
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

      if (dependencies) {
        actions.push(updateLoader({ loading: false, message: null }));
      }

      if (page !== 0) {
        actions.unshift(setPage({ page: 0 }));
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
        ...actions
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
