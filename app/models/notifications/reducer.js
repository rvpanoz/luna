/**
 * Notifications reducer
 * Handles state management for notifications operations
 */

import { assoc, prepend, identity, merge, prop, propOr } from 'ramda';
import {
  clearNotifications,
  setActive,
  updateNotification,
} from 'models/notifications/actions';
import initialState from '../initialState';

const { notifications } = initialState;

const createReducer = (notificationsState, handlers) => (
  state = notificationsState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
  [setActive.type]: (state, { payload: { active } }) =>
    assoc('active', active, state),
  [updateNotification.type]: (state, data) => {
    const {
      payload: {
        id,
        reason,
        requiredName,
        requiredVersion,
        minVersion,
        requiredByName,
        _remove,
      },
    } = data || {};

    if (_remove) {
      return assoc(
        'notifications',
        state.notifications.filter((notification) => notification.id !== id),
        state
      );
    }

    return merge(state, {
      notifications: prepend(
        {
          id,
          reason,
          requiredName,
          requiredVersion,
          minVersion,
          requiredByName,
        },
        state.notifications
      ),
    });
  },
  [clearNotifications.type]: (state) =>
    merge(state, {
      ...state,
      notifications: [],
    }),
};

export default createReducer(notifications, handlers);
