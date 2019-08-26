/**
 * Notifications reducer: Handles state management for notifications operations
 */

import { assoc, prepend, identity, merge, prop, propOr } from 'ramda';
import {
  addNotification,
  clearNotifications,
  setActive
} from 'models/notifications/actions';

import initialState from './initialState';
import { updateNotification } from '../models/notifications/actions';

const { notifications } = initialState;

const createReducer = (notificationsState, handlers) => (
  state = notificationsState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action);
const handlers = {
  [setActive.type]: (state, { payload: { active } }) =>
    assoc('active', active, state),
  [updateNotification.type]: (
    state,
    data
  ) => {
    const { payload: {
      id,
      reason,
      requiredName,
      requiredVersion,
      minVersion,
      requiredByName
    } } = data || {};

    return merge(state, {
      notifications: prepend(
        {
          id,
          reason,
          requiredName,
          requiredVersion,
          minVersion,
          requiredByName
        },
        state.notifications
      )
    })
  },
  [clearNotifications.type]: state =>
    merge(state, {
      ...state,
      notifications: []
    })
};

export default createReducer(notifications, handlers);
