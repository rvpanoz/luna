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

const { notifications } = initialState;

const createReducer = (notificationsState, handlers) => (
  state = notificationsState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action);
const handlers = {
  [setActive.type]: (state, { payload: { active } }) =>
    assoc('active', active, state),
  [addNotification.type]: (
    state,
    { payload: { type, body, required, requiredBy, id } }
  ) =>
    merge(state, {
      notifications: prepend(
        {
          id,
          type,
          body,
          required, // required.charAt(0) === '@' ? required.slice(1) : required,
          requiredBy
        },
        state.notifications
      )
    }),
  [clearNotifications.type]: state =>
    merge(state, {
      ...state,
      notifications: []
    })
};

export default createReducer(notifications, handlers);
