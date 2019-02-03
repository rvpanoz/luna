/* eslint-disable */

import { of, pipe } from 'rxjs';
import {
  map,
  concatMap,
  from,
  takeWhile,
  take,
  delay,
  tap,
  combineAll,
  takeLast,
  skipWhile,
  switchMap,
  ignoreElements
} from 'rxjs/operators';
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
    skipWhile(({ payload: { dependencies } }) => !dependencies.length),
    map(
      ({
        payload: { dependencies, outdated, projectName, projectVersion }
      }) => {
        const withOutdated = dependencies.map(pkg => {
          const [isOutdated, outdatedPkg] = isPackageOutdated(
            outdated,
            pkg.name
          );

          return {
            ...pkg,
            latest: isOutdated ? outdatedPkg.latest : null,
            isOutdated
          };
        });

        return {
          dependencies: withOutdated,
          outdated,
          projectName,
          projectVersion
        };
      }
    ),
    tap(console.log),
    concatMap(({ dependencies, outdated, projectName, projectVersion }) => {
      const {
        common: { page },
        packages: { fromSearch, fromSort }
      } = state$.value;
      const actions = [updateLoader({ loading: false })];

      if (page !== 0) {
        actions.unshift(setPage({ page: 0 }));
      }

      const withErrorsDependencies =
        dependencies &&
        dependencies.filter(dependency => dependency['__error']);

      const withPeerDependencies =
        dependencies &&
        dependencies.filter(dependency => dependency['__peerMissing']);

      if (withErrorsDependencies.length) {
        actions.push(
          setSnackbar({
            open: true,
            type: 'warning',
            message: WARNING_MESSAGES.errorPackages
          })
        );
      }

      const data = dependencies.filter(
        dependency => !dependency.__peerMissing || !dependency.__error
      );

      return [
        setPackages({
          projectName,
          projectVersion,
          fromSearch,
          fromSort,
          dependencies: data
        }),
        setOutdated({ outdated }),
        ...actions
      ];
    })
  );

export default combineEpics(packagesStartEpic, packagesSuccessEpic);
