/* eslint-disable */

import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA_APP/UI');

const addNotification = ActionCreator('ADD_NOTIFICATION');
const clearNotifications = ActionCreator('CLEAR_NOTIFICATIONS');
const setSnackbar = ActionCreator('SET_SNACKBAR');
const setManager = ActionCreator('SET_MANAGER');
const setMode = ActionCreator('SET_MODE');
const setPage = ActionCreator('SET_PAGE');
const setPageRows = ActionCreator('SET_PAGE_ROWS');
const toggleLoader = ActionCreator('TOGGLE_LOADER');

export {
  addNotification,
  clearNotifications,
  setSnackbar,
  setManager,
  setMode,
  setPage,
  setPageRows,
  toggleLoader
};
