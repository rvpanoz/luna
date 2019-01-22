/**
 * Packages epics
 */

/** eslint-disable */
/** eslint-disable-import/no-duplicates */

import { of, pipe, from } from 'rxjs';
import { map, mergeMap, takeWhile, concatMap, filter } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { merge } from 'ramda';

import { ERROR_TYPES } from 'constants/AppConstants';
import { addNotification, commandMessage } from 'models/ui/actions';
import { parseMessage, switchcase } from 'commons/utils';
import { setPackagesSuccess, setOutdatedSuccess } from './actions';

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

const packagesEpic = pipe(
  ofType(setPackagesSuccess.type),
  filter(
    ({ payload: { dependencies } }) =>
      Array.isArray(dependencies) && dependencies.length
  ),
  map(({ payload: { outdated } }) => ({
    type: setOutdatedSuccess.type,
    payload: {
      dependencies: outdated
    }
  }))
);

const messagesEpic = pipe(
  ofType(commandMessage.type),
  map(({ payload: { message = '' } }) => message.split('\n')),
  mergeMap(messages =>
    from(messages).pipe(
      takeWhile(message => message && message.length),
      concatMap(message => of(parseNpmMessage(message))),
      map(({ messageType, payload }) =>
        switchcase({
          WARN: () => ({
            type: addNotification.type,
            payload: merge(payload, {
              type: 'WARNING'
            })
          }),
          ERR: () => ({
            type: addNotification.type,
            payload: merge(payload, {
              type: 'ERROR'
            })
          })
        })({})(messageType)
      )
    )
  ),
  map(data => data)
);

export default combineEpics(packagesEpic, messagesEpic);
