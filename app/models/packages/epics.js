import { pipe } from 'rxjs';
import { map, concatMap, skipWhile } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { isPackageOutdated } from 'commons/utils';
import { setPage, toggleLoader, clearCommands } from 'models/ui/actions';
import { INFO_MESSAGES } from 'constants/AppConstants';

import {
  clearPackages,
  setPackagesStart,
  setPackagesSuccess,
  setOutdatedSuccess,
  updateData
} from './actions';

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

const packagesStartEpic = pipe(
  ofType(setPackagesStart.type),
  concatMap(() => [
    cleanPackages(),
    updateLoader({
      loading: true,
      message: INFO_MESSAGES.loading
    })
  ])
);

const packagesSuccessEpic = (action$, state$) =>
  action$.pipe(
    ofType(updateData.type),
    skipWhile(
      ({ payload: { dependencies } }) =>
        !dependencies || !Array.isArray(dependencies) || !dependencies.length
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
          packages: { fromSearch, fromSort }
        } = state$.value;
        const actions = [cleanCommands(), updateLoader({ loading: false })];

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
