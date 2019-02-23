import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA_APP/UI');

const updateNotifications = ActionCreator('UPDATE_NOTIFICATIONS');
const addNotification = ActionCreator('ADD_NOTIFICATION');
const clearNotifications = ActionCreator('CLEAR_NOTIFICATIONS');
const clearSnackbar = ActionCreator('CLEAR_SNACKBAR');
const clearCommands = ActionCreator('CLEAR_COMMANDS');
const commandError = ActionCreator('COMMAND_ERROR');
const commandMessage = ActionCreator('COMMAND_MESSAGE');
const setSnackbar = ActionCreator('SET_SNACKBAR');
const setManager = ActionCreator('SET_MANAGER');
const setMode = ActionCreator('SET_MODE');
const setEnv = ActionCreator('SET_ENV');
const showError = ActionCreator('SHOW_ERROR');
const showWarning = ActionCreator('SHOW_WARNING');
const toggleLoader = ActionCreator('TOGGLE_LOADER');
const togglePackageLoader = ActionCreator('TOGGLE_PACKAGE_LOADER');
const uiException = ActionCreator('UI_EXCEPTION_ERROR');
const npmCommand = ActionCreator('NPM_COMMAND');
const setActivePage = ActionCreator('SET_ACTIVE_PAGE');

export {
  updateNotifications,
  addNotification,
  clearNotifications,
  clearSnackbar,
  clearCommands,
  commandError,
  commandMessage,
  setActivePage,
  setSnackbar,
  setManager,
  setEnv,
  setMode,
  showError,
  showWarning,
  toggleLoader,
  togglePackageLoader,
  npmCommand,
  uiException
};
