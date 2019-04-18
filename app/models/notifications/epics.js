import { pipe, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { ERROR_TYPES } from 'constants/AppConstants';
import { parseMessage, switchcase, matchType } from 'commons/utils';

import {
  addNotification,
  updateNotifications
} from 'models/notifications/actions';

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
  ofType(updateNotifications.type),
  mergeMap(({ payload: { notifications } }) => from(notifications)),
  map(notification => {
    const { messageType = 'ERR', payload } = parseNpmMessage(notification);

    return switchcase({
      ERR: () => ({
        type: addNotification.type,
        payload: {
          ...payload,
          type: 'ERROR'
        }
      })
    })({ type: addNotification.type, payload: { type: 'ERROR' } })(messageType);
  })
);

export default combineEpics(notificationsEpic);
