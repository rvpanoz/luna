import { pipe, from, of } from 'rxjs';
import {
  concatMap,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import uuid from 'uuid/v1';
import { combineEpics, ofType } from 'redux-observable';

import {
  addNotification,
  updateNotifications
} from 'models/notifications/actions';

const notificationsEpic = pipe(
  ofType(updateNotifications.type),
  mergeMap(({ payload: { notifications } }) => from(notifications)),
  concatMap(notification => {
    const id = uuid();
    const [reason, details] = notification.split(':');
    const isExtraneous = reason === 'extraneous';

    let detailsWithTrim = details.trim();
    const isNameSpace = detailsWithTrim.startsWith('@')

    // check for namespace
    if (isNameSpace) {
      detailsWithTrim = detailsWithTrim.slice(1, detailsWithTrim.length - 1)
    }

    const [requiredDetails, requiredByName] = isExtraneous ? detailsWithTrim.split('@') : detailsWithTrim.split(',');
    const [requiredName, requiredVersion] = requiredDetails.split('@');

    return [
      {
        type: addNotification.type,
        payload: {
          id,
          reason,
          requiredName: isNameSpace ? `@${requiredName}` : requiredName,
          requiredByName: isExtraneous ? '' : requiredByName.replace('required by', ''),
          requiredVersion: isExtraneous ? '' : requiredVersion,
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
