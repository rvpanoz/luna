import { pipe, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import uuid from 'uuid/v1';
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
  const [prefix] = message.split(':');
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
    const { messageType = 'missing', payload } = parseNpmMessage(notification);
    const id = uuid();

    // 1 = missing, 2 = peer dep missing, 3 = extraneous
    return switchcase({
      missing: () => ({
        type: addNotification.type,
        payload: {
          id,
          type: 1,
          ...payload
        }
      }),
      ['peer dep missing']: () => ({
        type: addNotification.type,
        payload: {
          type: 2,
          id,
          ...payload
        }
      }),
      extraneous: () => ({
        type: addNotification.type,
        payload: {
          type: 3,
          id,
          ...payload
        }
      })
    })({ type: addNotification.type, payload: { type: 'ERROR' } })(messageType);
  })
);

export default combineEpics(notificationsEpic);
