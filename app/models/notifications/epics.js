import { pipe, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import uuid from 'uuid/v1';
import { combineEpics, ofType } from 'redux-observable';

import {
  addNotification,
  updateNotifications
} from 'models/notifications/actions';

const notificationsEpic = pipe(
  ofType(updateNotifications.type),
  mergeMap(({ payload: { notifications } }) => from(notifications)),
  map(notification => {
    const { messageType = 'ERR', payload } = parseNpmMessage(notification);
    const id = uuid();

    return [
      {
        type: addNotification.type,
        payload: {
          id,
          type: 'ERROR',
          ...payload
        }
      }),
      INFO: () => ({
        type: addNotification.type,
        payload: {
          type: 'INFO',
          id,
          ...payload
        }
      }),
      WARNING: () => ({
        type: addNotification.type,
        payload: {
          type: 'WARNING',
          id,
          ...payload
        }
      }
    ];
  }),
  catchError(error => {
    console.error(error);

    return of({
      type: '@@LUNA/ERROR/FATAL_NOTIFICATIONS',
      error: error.toString()
    })
  })
);

export default combineEpics(notificationsEpic);
