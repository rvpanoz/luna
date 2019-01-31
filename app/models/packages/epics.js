/* eslint-disable */

import { of, pipe } from 'rxjs';
import {
  map,
  concatMap,
  takeWhile,
  delay,
  tap,
  takeLast
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { setPage, toggleLoader } from 'models/ui/actions';

import {
  setPackagesStart,
  setPackagesSuccess,
  setOutdatedSuccess,
  updateData
} from './actions';

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
    concatMap(
      ({
        payload: { dependencies, outdated, projectName, projectVersion }
      }) => {
        const {
          common: { page },
          packages: { fromSearch, fromSort }
        } = state$.value;
        const actions = [updateLoader({ loading: false })];
        const withErrors =
          dependencies &&
          dependencies.filter(dependency => dependency['__error']);
        console.log(withErrors);

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
    ),
    tap(console.log)
  );

export default combineEpics(packagesStartEpic, packagesSuccessEpic);
