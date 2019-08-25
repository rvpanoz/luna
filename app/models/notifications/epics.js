import { pipe, from, of } from 'rxjs';
import {
  concatMap,
  mergeMap,
  map,
  tap,
  catchError,
  withLatestFrom,
  filter,
  ignoreElements,
  mapTo
} from 'rxjs/operators';
import uuid from 'uuid/v1';
import { combineEpics, ofType } from 'redux-observable';

import {
  addNotification,
  updateNotification,
  updateNotifications
} from 'models/notifications/actions';

const updateNotificationsEpic = (action$, state$) => action$.pipe(
  ofType(updateNotifications.type),
  mergeMap(({ payload: { notifications } }) => from(notifications)),
  withLatestFrom(state$),
  map(data => {
    const [notification, latestState] = data;
    console.log(notification, latestState);

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

    return {
      type: addNotification.type,
      payload: {
        id,
        reason,
        requiredName: isNameSpace ? `@${requiredName}` : requiredName,
        requiredByName: isExtraneous ? '' : requiredByName.trim().replace('required by', ''),
        requiredVersion: isExtraneous ? '' : requiredVersion,
      }
    };
  }),
  catchError(error => of({
    type: '@@LUNA/ERROR/FATAL_NOTIFICATIONS',
    error: error.toString()
  }))
);

const addNotificationEpic = (action$, state$) => action$.pipe(
  ofType(addNotification.type),
  withLatestFrom(state$),
  map(values => {
    const [notification, state] = values;
    const { notifications: {
      notifications: stateNotifications
    } } = state;

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

    console.log(id, reason, requiredName);

    return ({
      type: updateNotification.type,
      payload: {
        id: 1
      }
    })
  }),
  catchError(error => of({
    type: '@@LUNA/ERROR/ADD_NOTIFICATION',
    error: error.toString()
  })),
  // ignoreElements()
)

export default combineEpics(addNotificationEpic);
