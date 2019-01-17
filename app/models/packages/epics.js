/**
 * Packages epics
 */

/** eslint-disable */
/** eslint-disable-import/no-duplicates */

import { combineEpics, ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';

import { ERROR_TYPES } from 'constants/AppConstants';
import { commandError } from 'models/app/actions';
import { parseNpmError, switchcase } from 'commons/utils';

import { of } from 'rxjs';

const matchType = (subject, needle) => {
  const prefixRegX = new RegExp(needle);
  return prefixRegX.test(subject);
};

/**
 *
 * @param {*} error
 * npm ERR!, npm WARN
 */
const extractType = errorPrefix => types =>
  types.find(type => matchType(errorPrefix, type));

const handleCommandErrorsEpic = action$ =>
  action$.pipe(
    ofType(commandError.type),
    mergeMap(({ payload: { error } }) => {
      const prefix = error.slice(0, 8).trim(); // very buggy w/ warnings..
      const errorType = extractType(prefix)(ERROR_TYPES);
      console.log(prefix, error);
      const messages = error.split(prefix);

      return of(messages).pipe(
        map(message =>
          switchcase({
            WARN: () => ({
              type: 'SHOW_WARNING',
              message
            }),
            ERR: () => ({
              type: 'SHOW_ERROR',
              message: parseNpmError(message)
            })
          })([])(errorType)
        )
      );
    })
  );

export default combineEpics(handleCommandErrorsEpic);
