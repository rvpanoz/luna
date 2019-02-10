import { pipe, from } from 'rxjs';
import { map, mergeMap, filter } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { ERROR_TYPES } from 'constants/AppConstants';
import { parseMessage, switchcase, matchType } from 'commons/utils';

import { commandMessage, showError, showWarning } from './actions';

/**
 *
 * @param {*} prefix
 * npm ERR!, npm WARN, etc ...
 */
const matchMessageType = prefix => types =>
  types.find(type => matchType(prefix, type));

/**
 *
 * @param {*} message
 */
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

const notificationsEpic = pipe(
  ofType(commandMessage.type),
  mergeMap(({ payload: { message = '' } }) => {
    const messages = message.split(/\r?\n/);

    return from(messages).pipe(filter(msg => msg || !/^\s*$/.test(msg)));
  }),
  map(notification => {
    const { messageType, payload } = parseNpmMessage(notification);

    return switchcase({
      WARN: () => ({
        type: showWarning.type,
        payload
      }),
      ERR: () => ({
        type: showError.type,
        payload
      })
    })({})(messageType);
  })
);

export default combineEpics(notificationsEpic);
