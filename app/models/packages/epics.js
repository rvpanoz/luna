/* eslint-disable */

import { pipe } from 'rxjs';
import { map, concatMap, tap, skipWhile } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { isPackageOutdated } from 'commons/utils';
import { setPage, toggleLoader } from 'models/ui/actions';
import { WARNING_MESSAGES, INFO_MESSAGES } from 'constants/AppConstants';

import {
  setPackagesStart,
  setPackagesSuccess,
  setOutdatedSuccess,
  updateData
} from './actions';
import { setSnackbar } from '../ui/actions';

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
  map(() =>
    updateLoader({
      loading: true,
      message: INFO_MESSAGES.loading
    })
  )
);

const packagesSuccessEpic = (action$, state$) =>
  action$.pipe(
    ofType(updateData.type),
    skipWhile(
      ({ payload: { dependencies } }) =>
        !Array.isArray(dependencies) || !dependencies.length
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

            const enhanceDependency = {
              ...dependency,
              latest: isOutdated ? outdatedPkg.latest : null,
              isOutdated
            };

            deps.push(enhanceDependency);
          }

          return deps;
        }, []);

        return {
          dependencies: withOutdated,
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
        const actions = [updateLoader({ loading: false })];

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
