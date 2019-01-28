/* eslint-disable */

import { pipe } from 'rxjs';
import { map, concatMap, delay, tap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { setSnackbar, toggleLoader } from 'models/ui/actions';

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

const packagesSuccessEpic = pipe(
  ofType(updateData.type),
  concatMap(
    ({ payload: { dependencies, outdated, projectName, projectVersion } }) => [
      setPackages({ dependencies, projectName, projectVersion }),
      setOutdated({ outdated }),
      updateLoader({ loading: false })
    ]
  ),
  delay(1200)
);

export default combineEpics(packagesStartEpic, packagesSuccessEpic);
