import { from } from 'rxjs';
import {
  map,
  concatMap,
  skipWhile,
  tap,
  takeWhile,
  switchMap
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';
import { isPackageOutdated } from 'commons/utils';
import {
  toggleLoader,
  clearCommands,
  clearNotifications,
  setActivePage
} from 'models/ui/actions';
import { INFO_MESSAGES } from 'constants/AppConstants';

import {
  clearPackages,
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
  type: 'CANCEL_REQUEST'
});

const resetPage = payload => ({
  type: setActivePage.type,
  payload
});

const packagesStartEpic = (action$, state$) => {
  const {
    common: {
      npm: { paused }
    }
  } = state$.value;

  return action$.pipe(
    ofType(setPackagesStart.type),
    map(({ payload: { channel, options } }) => {
      console.log(paused);
      if (paused) {
        return pauseRequest();
      }

      ipcRenderer.send(channel, options);
    }),
    concatMap(() => [
      updateLoader({
        loading: true,
        message: INFO_MESSAGES.loading
      }),
      cleanNotifications(),
      cleanPackages(),
      cleanCommands()
    ])
  );
};

const packagesSuccessEpic = (action$, state$) =>
  action$.pipe(
    ofType(updateData.type),
    skipWhile(({ payload: { dependencies } }) => {
      console.log(dependencies);
      const noData = !dependencies || !Array.isArray(dependencies);

      return noData;
    }),
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
          const { name, __peerMissing, __error } = dependency;

          if (!__peerMissing && !__error) {
            const [isOutdated, outdatedPkg] = isPackageOutdated(outdated, name);
            const {
              author,
              bugs,
              deprecated,
              description,
              extraneous,
              licence,
              peerDependencies,
              version,
              __group
            } = dependency;

            const enhanceDependency = {
              author,
              bugs,
              deprecated,
              description,
              extraneous,
              licence,
              name,
              peerDependencies,
              version,
              latest: isOutdated ? outdatedPkg.latest : null,
              isOutdated,
              __error,
              __peerMissing,
              __group
            };

            deps.push(enhanceDependency);
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
          repository: {
            metadata: { fromSearch, fromSort }
          }
        } = state$.value;

        const actions = [
          cleanCommands(),
          updateLoader({ loading: false, message: null })
        ];

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

export default combineEpics(packagesStartEpic, packagesSuccessEpic);
