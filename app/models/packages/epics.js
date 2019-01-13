/**
 * Packages epics
 */

/** eslint-disable-import/no-duplicates */

import { combineEpics, ofType } from 'redux-observable';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { setSnackbar, toggleLoader } from 'models/ui/actions';

import {
  clearFilters,
  setPackagesError,
  setPackagesSuccess,
  setPackagesStart,
  setActive
} from './actions';

const setPackagesStartEpic = action$ =>
  action$.pipe(
    ofType(setPackagesStart.type),
    map(() => ({
      type: toggleLoader.type,
      payload: {
        loading: true,
        message: 'Loading packages..'
      }
    })),
    catchError(err => {
      of({
        type: setPackagesError.type,
        err
      });
    })
  );

const setPackagesSuccessEpic = action$ =>
  action$.pipe(
    ofType(setPackagesSuccess.type),
    map(() => ({
      type: toggleLoader.type,
      payload: {
        looading: false
      }
    })),
    map(() => ({
      type: setActive.type,
      payload: {
        active: null
      }
    })),
    catchError(err => {
      of({
        type: setPackagesError.type,
        err
      });
    })
  );

const clearFiltersEpic = action$ =>
  action$.pipe(
    ofType(clearFilters.type),
    map(() => ({
      type: setSnackbar.type,
      payload: {
        open: true,
        message: 'Filters cleared'
      }
    }))
  );

export default combineEpics(
  clearFiltersEpic,
  setPackagesSuccessEpic,
  setPackagesStartEpic
);
