/* eslint-disable */

import { pipe } from 'rxjs';
import { map, concatMap, delay, tap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { toggleLoader } from 'models/ui/actions';

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
          packages: { fromSearch, fromSort }
        } = state$.value;

        return [
          setPackages({
            dependencies,
            projectName,
            projectVersion,
            fromSearch,
            fromSort
          }),
          setOutdated({ outdated }),
          updateLoader({ loading: false })
        ];
      }
    ),
    delay(1200)
  );

export default combineEpics(packagesStartEpic, packagesSuccessEpic);
