import { tap, map, takeWhile, concatMap, skipWhile } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';
import { isPackageOutdated } from 'commons/utils';
import { runAudit } from 'models/packages/actions';

import {
  toggleLoader,
  clearCommands,
  clearNotifications,
  clearAll
} from 'models/ui/actions';

import {
  clearPackages,
  installPackages,
  updatePackages,
  setPackagesStart,
  setPackagesSuccess,
  setOutdatedSuccess,
  updateData,
  setPage
} from './actions';

const cleanNotifications = () => ({
  type: clearNotifications.type
});

const cleanCommands = () => ({
  type: clearCommands.type
});

const cleanPackages = () => ({
  type: clearPackages.type
});

const updateLoader = payload => ({
  type: toggleLoader.type,
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

const pauseRequest = () => ({
  type: 'PAUSE_REQUEST'
});

const resumeRequest = () => ({
  type: 'RESUME_REQUEST'
});

const cleanAllEpic = action$ =>
  action$.pipe(
    ofType(clearAll.type),
    concatMap(() => [
      updateLoader({
        loading: false
      }),
      cleanNotifications(),
      cleanPackages(),
      cleanCommands()
    ])
  );

const packagesStartEpic = action$ =>
  action$.pipe(
    ofType(setPackagesStart.type),
    map(({ payload: { channel, options, paused } }) => {
      if (paused) {
        return pauseRequest();
      }

      ipcRenderer.send(channel, options);
      return resumeRequest();
    }),
    takeWhile(({ type }) => type !== 'PAUSE_REQUEST'),
    concatMap(() => [
      updateLoader({
        loading: true,
        message: 'Loading packages..'
      }),
      cleanNotifications(),
      cleanPackages(),
      cleanCommands()
    ])
  );

const installPackagesEpic = action$ =>
  action$.pipe(
    ofType(installPackages.type),
    map(({ payload }) => {
      ipcRenderer.send('ipc-event', payload);

      return updateLoader({
        loading: true,
        message: 'Loading packages..'
      });
    })
  );

const updatePackagesEpic = action$ =>
  action$.pipe(
    ofType(updatePackages.type),
    map(({ payload }) => {
      ipcRenderer.send('ipc-event', payload);

      return updateLoader({
        loading: true,
        message: 'Loading packages..'
      });
    })
  );

const packagesSuccessEpic = (action$, state$) =>
  action$.pipe(
    ofType(updateData.type),
    takeWhile(
      ({ payload: { dependencies } }) =>
        Boolean(dependencies) && Array.isArray(dependencies)
    ),
    map(
      ({
        payload: {
          dependencies,
          outdated,
          projectName,
          projectVersion,
          projectDescription,
          projectLicense,
          projectAuthor
        }
      }) => {
        const withOutdated = dependencies.reduce((deps = [], dependency) => {
          const {
            name,
            peerMissing,
            invalid,
            extraneous,
            problems,
            missing
          } = dependency;

          if (!(peerMissing && missing) && !invalid && !extraneous) {
            const [isOutdated, outdatedPkg] = isPackageOutdated(outdated, name);
            const enhancedDependency = {
              ...dependency,
              latest: isOutdated ? outdatedPkg.latest : null,
              isOutdated
            };

            deps.push(enhancedDependency);
          } else {
            deps.push({
              name,
              invalid,
              extraneous,
              problems,
              isOutdated: false
            });
          }

          return deps;
        }, []);

        return {
          dependencies: withOutdated || dependencies,
          outdated,
          projectName,
          projectVersion,
          projectDescription,
          projectLicense,
          projectAuthor
        };
      }
    ),
    concatMap(
      ({
        dependencies,
        outdated,
        projectName,
        projectVersion,
        projectDescription,
        projectLicense,
        projectAuthor
      }) => {
        const {
          common: { page },
          modules: {
            metadata: { fromSearch, fromSort }
          }
        } = state$.value;

        const actions = dependencies.length
          ? [updateLoader({ loading: false, message: null })]
          : [];

        if (page !== 0) {
          actions.unshift(setPage({ page: 0 }));
        }

        return [
          setPackages({
            projectName,
            projectVersion,
            projectDescription,
            projectLicense,
            projectAuthor,
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

const audit = action$ =>
  action$.pipe(
    ofType(runAudit.type),
    map(({ payload: { channel, options, paused } }) => {
      ipcRenderer.send(channel, options);
      return resumeRequest();
    })
  );

export default combineEpics(
  audit,
  packagesStartEpic,
  packagesSuccessEpic,
  installPackagesEpic,
  cleanAllEpic,
  updatePackagesEpic
);
