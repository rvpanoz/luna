/* eslint-disable */

import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA_APP/UI');

const addNotification = ActionCreator('ADD_NOTIFICATION');
const clearNotifications = ActionCreator('CLEAR_NOTIFICATIONS');
const clearAll = ActionCreator('CLEAR_ALL');
const clearSnackbar = ActionCreator('CLEAR_SNACKBAR');
const setSnackbar = ActionCreator('SET_SNACKBAR');
const setManager = ActionCreator('SET_MANAGER');
const setMode = ActionCreator('SET_MODE');
const setPage = ActionCreator('SET_PAGE');
const setPageRows = ActionCreator('SET_PAGE_ROWS');
const toggleLoader = ActionCreator('TOGGLE_LOADER');
const togglePackageLoader = ActionCreator('TOGGLE_PACKAGE_LOADER');
const uiError = ActionCreator('UI_ERROR');

export {
  addNotification,
  clearNotifications,
  clearSnackbar,
  clearAll,
  setSnackbar,
  setManager,
  setMode,
  setPage,
  setPageRows,
  toggleLoader,
  togglePackageLoader,
  uiError
};
