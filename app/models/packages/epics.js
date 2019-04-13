import { pipe } from 'rxjs';
import { map, mergeMap, takeWhile, concatMap } from 'rxjs/operators';
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

// TODO: :question
const packagesStartEpic = (action$, state$) =>
  action$.pipe(
    ofType(setPackagesStart.type),
    map(({ payload: { channel, options } }) => {
      const {
        ui: { paused }
      } = state$.value;

      if (paused) {
        return { type: 'PAUSE_REQUEST' };
      }

      ipcRenderer.send(channel, options);

      return { type: 'RESUME_REQUEST' };
    }),
    takeWhile(({ type }) => type === 'RESUME_REQUEST'),
    concatMap(() => [
      updateLoader({
        loading: true,
        message: 'Loading packages..'
      }),
      { type: clearCommands.type },
      { type: clearNotifications.type },
      { type: clearPackages.type }
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

const viewPackagesEpic = pipe(
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

// TODO: :question
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
                outdated,
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

        return {
          dependencies: enhancedDependencies,
          outdated,
          projectName,
          projectVersion,
          projectDescription
        };
      }
    ),
    concatMap(
      ({
        dependencies,
        outdated,
        projectName,
        projectVersion,
        projectDescription
      }) => {
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

        if (dependencies.length) {
          actions.push(
            updateLoader({
              loading: false,
              message: null
            })
          );
        }

        return [
          setPackages({
            projectName,
            projectVersion,
            projectDescription,
            fromSearch,
            fromSort,
            dependencies
          }),
          setOutdated({ outdated }),
          ...actions
        ];
      }
    )
  );

export default combineEpics(
  packagesStartEpic,
  packagesSuccessEpic,
  installPackagesEpic,
  updatePackagesEpic,
  viewPackagesEpic
);
