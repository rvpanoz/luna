/**
 * Packages epics
 */

/** eslint-disable */
/** eslint-disable-import/no-duplicates */

import { of, pipe, from } from 'rxjs';
import { delay, map, mergeMap, takeWhile, concatMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { ERROR_TYPES } from 'constants/AppConstants';
import { showError, showWarning, commandMessage } from 'models/ui/actions';
import { parseMessage, switchcase } from 'commons/utils';

/**
 *
 * @param {*} subject
 * @param {*} needle
 */
const matchType = (subject, needle) => {
  const prefixRegX = new RegExp(needle);

  return prefixRegX.test(subject);
};

/**
 *
 * @param {*} prefix
 * npm ERR!, npm WARN, etc ...
 */
const matchMessageType = prefix => types =>
  types.find(type => matchType(prefix, type));

const parseNpmMessage = message => {
  const prefix = message.slice(0, 8).trim();
  const messageType = matchMessageType(prefix)(ERROR_TYPES);
  const [body, required, requiredBy] = parseMessage(message);

  return {
    messageType,
    payload: {
      body,
      required,
      requiredBy
    }
  };
};

const handleMessagesEpic = pipe(
  ofType(commandMessage.type),
  map(({ payload: { message = '' } }) => message.split('\n')),
  mergeMap(messages =>
    from(messages).pipe(
      takeWhile(message => message && message.length),
      concatMap(message => of(parseNpmMessage(message)).pipe(delay(1200))),
      map(({ messageType, payload }) =>
        switchcase({
          WARN: () => ({
            type: showWarning.type,
            payload
          }),
          ERR: () => ({
            type: showError.type,
            payload
          })
        })({})(messageType)
      )
    )
  )
);

export default combineEpics(handleMessagesEpic);
