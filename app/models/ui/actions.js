/* eslint-disable */

import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA_APP/UI');

const addNotification = ActionCreator('ADD_NOTIFICATION');
const clearNotifications = ActionCreator('CLEAR_NOTIFICATIONS');
const clearSnackbar = ActionCreator('CLEAR_SNACKBAR');
const commandError = ActionCreator('COMMAND_ERROR');
const commandMessage = ActionCreator('COMMAND_MESSAGE');
const setSnackbar = ActionCreator('SET_SNACKBAR');
const setManager = ActionCreator('SET_MANAGER');
const setMode = ActionCreator('SET_MODE');
const setPage = ActionCreator('SET_PAGE');
const setPageRows = ActionCreator('SET_PAGE_ROWS');
const showError = ActionCreator('SHOW_ERROR');
const showWarning = ActionCreator('SHOW_WARNING');
const toggleLoader = ActionCreator('TOGGLE_LOADER');
const togglePackageLoader = ActionCreator('TOGGLE_PACKAGE_LOADER');
const uiException = ActionCreator('UI_EXCEPTION_ERROR');

export {
  addNotification,
  clearNotifications,
  clearSnackbar,
  commandError,
  commandMessage,
  setSnackbar,
  setManager,
  setMode,
  setPage,
  setPageRows,
  showError,
  showWarning,
  toggleLoader,
  togglePackageLoader,
  uiException
};
