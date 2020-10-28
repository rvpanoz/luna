import { of } from 'rxjs';
import { mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { v1 as uuidv1 } from 'uuid';
import semver from 'semver';
import { combineEpics, ofType } from 'redux-observable';

import {
  parseNotification,
  updateNotification,
} from 'models/notifications/actions';

const parseNotificationEpic = (action$, state$) =>
  action$.pipe(
    ofType(parseNotification.type),
    withLatestFrom(state$),
    mergeMap((values) => {
      const [notification, state] = values;
      const {
        notifications: { notifications: stateNotifications },
      } = state;

      const id = uuidv1();
      const { payload: notificationText } = notification;
      console.log(notificationText);
      const [reason, details] = notificationText.split(':');
      const isExtraneous = reason === 'extraneous';
      const detailsArr = details.trim().split(',');
      const [requiredDetails, requiredByName] = detailsArr;
      const [requiredName, requiredVersion] = requiredDetails.split('@');
      const semVersion = requiredVersion
        ? semver.minVersion(requiredVersion)
        : null;

      const activeNotification = stateNotifications.find(
        (notificationItem) => notificationItem.requiredName === requiredName
      );

      let version = semVersion?.version;

      if (version && version.indexOf('-') > -1) {
        version = version.substring(0, version.indexOf('-'));
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
            minVersion: version || '1.0.0',
          },
        },
      ];
    }),
    catchError((error) =>
      of({
        type: '@@LUNA/ERROR/PARSE_NOTIFICATION',
        error: error.toString(),
      })
    )
  );

export default combineEpics(parseNotificationEpic);
