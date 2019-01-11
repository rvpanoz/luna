/**
 * Packages epics
 */

/** eslint-disable-import/no-duplicates */

import { combineEpics, ofType } from 'redux-observable';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { setSnackbar } from 'models/ui/actions';
import { clearFilters, setPackagesError, setPackagesSuccess } from './actions';

const setPackagesSuccessEpic = action$ =>
  action$.pipe(
    ofType(setPackagesSuccess.type),
    map(({ payload }) => {
      const { dependencies, outdated } = payload;

      return {
        type: setSnackbar.type,
        payload: {
          type: 'info',
          open: true,
          message: `${dependencies.length} dependencies loaded!\nFound ${
            outdated.length
          } outdated packages.`
        }
      };
    }),
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

export default combineEpics(setPackagesSuccessEpic, clearFiltersEpic);
