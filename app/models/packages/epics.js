/**
 * Packages epics
 */

/** eslint-disable */
/** eslint-disable-import/no-duplicates */

import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, concatAll, catchError } from 'rxjs/operators';

// ['WARN', 'ERR']
import { ERROR_TYPES } from 'constants/AppConstants';
import { commandMessage } from 'models/app/actions';
import { parseMessage, switchcase } from 'commons/utils';

import { of } from 'rxjs';

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
const handleMessagesEpic = action$ =>
  action$.pipe(
    ofType(commandMessage.type),
    mergeMap(({ payload: { message } }) => {
      const messages = message && message.split('\n');

      const mappedMessages = messages.map(npmMsg => {
        const prefix = npmMsg.slice(0, 8).trim(); // npm ERR! || npm WARN
        const messageType = matchMessageType(prefix)(ERROR_TYPES);

        return switchcase({
          WARN: () => ({
            type: 'SHOW_WARNING',
            warning: parseMessage(npmMsg)
          }),
          ERR: () => ({
            type: 'SHOW_ERROR',
            error: parseMessage(npmMsg)
          })
        })({})(messageType);
      });

      return of(mappedMessages.filter(({ type }) => Boolean(type)));
    }),
    concatAll(),
    catchError(error =>
      of({
        type: 'COMMAND_ERROR',
        error
      })
    )
  );

export default combineEpics(handleMessagesEpic);
