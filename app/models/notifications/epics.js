import { of } from 'rxjs';
import {
  mergeMap,
  catchError,
  withLatestFrom,
} from 'rxjs/operators';
import uuid from 'uuid/v1';
import semver from 'semver';
import { combineEpics, ofType } from 'redux-observable';

import {
  addNotification,
  updateNotification
} from 'models/notifications/actions';

const addNotificationEpic = (action$, state$) =>
  action$.pipe(
    ofType(addNotification.type),
    withLatestFrom(state$),
    mergeMap(values => {
      const [notification, state] = values;
      const {
        notifications: { notifications: stateNotifications }
      } = state;

      const id = uuid();
      const { payload: notificationText } = notification;

      const [reason, details] = notificationText.split(':');
      const isExtraneous = reason === 'extraneous';

      let detailsWithTrim = details.trim();
      const isNameSpace = detailsWithTrim.startsWith('@');

      if (isNameSpace) {
        detailsWithTrim = detailsWithTrim.slice(1, detailsWithTrim.length - 1);
      }

      const [requiredDetails, requiredByName] = isExtraneous
        ? detailsWithTrim.split('@')
        : detailsWithTrim.split(',');
      const [requiredName, requiredVersion] = requiredDetails.split('@');

      const minVersion = semver.minVersion(requiredVersion);
      const activeNotification = stateNotifications.find(
        notificationItem => notificationItem.requiredName === requiredName
      );

      if (activeNotification && typeof activeNotification === 'object') {
        const isGreaterThanMinVersion = semver.gte(
          activeNotification.minVersion,
          minVersion.version
        );

        if (!isGreaterThanMinVersion) {
          // remove notification from state
          return [{
            type: updateNotification.type,
            payload: {
              id: activeNotification.id,
              _remove: true
            }
          }
          ];
        }
      }

      return [
        {
          type: updateNotification.type,
          payload: {
            id,
            reason,
            requiredName,
            requiredVersion,
            requiredByName,
            minVersion: minVersion.version
          }
        }
      ];
    }),
    catchError(error =>
      of({
        type: '@@LUNA/ERROR/ADD_NOTIFICATION',
        error: error.toString()
      })
    )
  );

export default combineEpics(addNotificationEpic);
