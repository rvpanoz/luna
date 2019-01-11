/**
 * UI epics
 */

/** eslint-disable-import/no-duplicates */

import { combineEpics, ofType } from 'redux-observable';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  clearAll,
  clearNotifications,
  clearSnackbar,
  uiError
} from './actions';

const clearUiEpic = action$ =>
  action$.pipe(
    ofType(clearAll.type),
    map(() => ({
      type: clearNotifications.type
    })),
    map(
      () => ({
        type: clearSnackbar.type
      }),
      catchError(err => {
        of({
          type: uiError.type,
          err
        });
      })
    )
  );

export default combineEpics(clearUiEpic);
