import { pipe } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import uuid from 'uuid/v1';
import { combineEpics, ofType } from 'redux-observable';

import { ERROR_TYPES } from 'constants/AppConstants';
import { parseMessage, matchType } from 'commons/utils';

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
  const [prefix] = message.split(':').slice(1);
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
  mergeMap(({ payload: { notifications } }) =>
    notifications.map(notification => {
      const id = uuid();
      const { messageType, payload } = parseNpmMessage(notification);

      return {
        type: addNotification.type,
        payload: {
          id,
          type: messageType,
          ...payload
        }
      };
    })
  )
);

export default combineEpics(notificationsEpic);
