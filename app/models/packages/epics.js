/* eslint-disable */

import { of, pipe } from 'rxjs';
import {
  map,
  concatMap,
  takeWhile,
  delay,
  tap,
  takeLast,
  skipWhile
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { setPage, toggleLoader } from 'models/ui/actions';

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
      message: 'Loading packages..'
    })
  )
);

const packagesSuccessEpic = (action$, state$) =>
  action$.pipe(
    ofType(updateData.type),
    skipWhile(({ payload: { dependencies } }) => !dependencies.length),
    concatMap(
      ({
        payload: { dependencies, outdated, projectName, projectVersion }
      }) => {
        const {
          common: { page },
          packages: { fromSearch, fromSort }
        } = state$.value;
        const actions = [updateLoader({ loading: false })];

        const withErrorsDependencies =
          dependencies &&
          dependencies.filter(dependency => dependency['__error']);

        if (withErrorsDependencies.length) {
          actions.push(
            setSnackbar({
              open: true,
              type: 'danger',
              message: 'There are dependencies with errors.'
            })
          );
        }

        // go to first page
        if (page !== 0) {
          actions.push(setPage({ page: 0 }));
        }

        return [
          setPackages({
            dependencies,
            projectName,
            projectVersion,
            fromSearch,
            fromSort
          }),
          setOutdated({ outdated })
        ].concat(actions);
      }
    )
  );

export default combineEpics(packagesStartEpic, packagesSuccessEpic);
