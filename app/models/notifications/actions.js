import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA/NOTIFICATIONS');

const parseNotification = ActionCreator('PARSE_NOTIFICATION');
const updateNotification = ActionCreator('UPDATE_NOTIFICATION');
const setActive = ActionCreator('SET_ACTIVE');
const clearNotifications = ActionCreator('CLEAR_NOTIFICATIONS');
const updateNotifications = ActionCreator('UPDATE_NOTIFICATIONS');

export {
  updateNotifications,
  updateNotification,
  parseNotification,
  clearNotifications,
  setActive,
};
