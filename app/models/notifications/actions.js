import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA_APP/NOTIFICATIONS');

const updateNotifications = ActionCreator('UPDATE_NOTIFICATIONS');
const addNotification = ActionCreator('ADD_NOTIFICATION');
const clearNotifications = ActionCreator('CLEAR_NOTIFICATIONS');

export { updateNotifications, addNotification, clearNotifications };
