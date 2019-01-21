/**
 * Packages epics
 */

/** eslint-disable */
/** eslint-disable-import/no-duplicates */

import { of, pipe } from 'rxjs';
import { delay, map, mergeMap, catchError } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { ERROR_TYPES } from 'constants/AppConstants';
import {
  showError,
  showWarning,
  commandMessage,
  commandError
} from 'models/ui/actions';
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

/**
 * NPM messages comes in the following format
 *
 * Error example:
 * npm ERR! peer dep missing: react-dom@^15.3.0 || ^16.0.0-alpha, required by react-virtualized@9.21.0
 *
 * Warning example
 * npm WARN react-d3-graph@2.0.0-rc2 requires a peer of d3@^5.5.0 but none is installed. You must install peer dependencies yourself
 *
 * With the following epic we can handle the stream of npm messages and dispatch multiple actions per message
 * there are 2 types of messages: WARNINGS and ERRORS
 *
 * dispatch payload example
 *
 * {
 *    type: 'SHOW_ERROR',
 *    error: ['npm error', 'react@>=15, 'required by react-router@4.3.1']
 * }
 *
 */

const handleMessagesEpic = pipe(
  ofType(commandMessage.type),
  map(({ payload: { message = '' } }) => {
    console.log(message);
    return message.split('\n');
  }),
  mergeMap(npmMsg => {
    const npmMsgToStr = npmMsg.join('');
    const prefix = npmMsgToStr.slice(0, 8).trim();
    const messageType = matchMessageType(prefix)(ERROR_TYPES);
    const [body, required, requiredBy] = parseMessage(npmMsgToStr);

    return of({
      messageType,
      payload: {
        body,
        required,
        requiredBy
      }
    }).pipe(map(value => value));
  }),
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
  ),
  delay(1200),
  catchError(error =>
    of({
      type: commandError.type,
      payload: {
        error: error.message
      }
    })
  )
);

export default combineEpics(handleMessagesEpic);
