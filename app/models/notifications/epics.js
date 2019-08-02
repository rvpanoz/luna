import { pipe, from, of } from 'rxjs';
import {
  tap,
  map,
  concatMap,
  mergeMap,
  catchError,
  ignoreElements
} from 'rxjs/operators';
import uuid from 'uuid/v1';
import { combineEpics, ofType } from 'redux-observable';

import {
  addNotification,
  updateNotifications
} from 'models/notifications/actions';

const notificationsEpic = pipe(
  ofType(updateNotifications.type),
  ignoreElements(),
  mergeMap(({ payload: { notifications } }) => from(notifications)),
  concatMap(notification => {
    const id = uuid();
    const [p1, p2] = notification.split(',');
    const [reason, required] = p1.split(':');
    const requiredBy = p2.replace('required by ', '');
    const [requiredName, requiredVersion] = required.split('@');
    const [requiredByName, requiredByVersion] = requiredBy.split('@');

    const notificationPayload = {
      id,
      reason,
      requiredName: requiredName.trim(),
      requiredVersion: requiredVersion.trim(),
      requiredByName: requiredName.trim(),
      requiredByVersion: requiredVersion.trim()
    };

    return [
      {
        type: addNotification.type,
        payload: notificationPayload
      }
    ];
  }),
  catchError(err => console.log(err))
);

export default combineEpics(notificationsEpic);
