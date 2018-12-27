/* eslint-disable */

import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA_APP/DATA');

const addNotification = ActionCreator('ADD_NOTIFICATION');
const addFilter = ActionCreator('ADD_FILTER');
const addSelected = ActionCreator('ADD_SELECTED');
const clearNotifications = ActionCreator('CLEAR_NOTIFICATIONS');
const clearSelected = ActionCreator('CLEAR_SELECTED');
const clearFilters = ActionCreator('CLEAR_FILTERS');
const setPackagesStart = ActionCreator('SET_PACKAGES_START');
const setPackagesSuccess = ActionCreator('SET_PACKAGES_SUCCESS');
const setPackagesOutdatedSuccess = ActionCreator(
  'SET_PACKAGES_OUTDATED_SUCCESS'
);
const setPackagesError = ActionCreator('SET_PACKAGES_ERROR');
const updatePackage = ActionCreator('UPDATE_PACKAGE');

export {
  addNotification,
  addFilter,
  addSelected,
  clearSelected,
  clearFilters,
  clearNotifications,
  setPackagesStart,
  setPackagesSuccess,
  setPackagesError,
  setPackagesOutdatedSuccess,
  updatePackage
};
