/* eslint-disable */

import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA_APP/DATA');

const addActionError = ActionCreator('ACTION_ERROR');
const addFilter = ActionCreator('ADD_FILTER');
const addSelected = ActionCreator('ADD_SELECTED');
const clearSelected = ActionCreator('CLEAR_SELECTED');
const clearFilters = ActionCreator('CLEAR_FILTERS');
const clearPackages = ActionCreator('CLEAR_PACKAGES');
const setPackagesStart = ActionCreator('SET_PACKAGES_START');
const setPackagesSuccess = ActionCreator('SET_PACKAGES_SUCCESS');
const setPackagesOutdatedSuccess = ActionCreator(
  'SET_PACKAGES_OUTDATED_SUCCESS'
);
const setPackagesError = ActionCreator('SET_PACKAGES_ERROR');
const updatePackage = ActionCreator('UPDATE_PACKAGE');

export {
  addActionError,
  addFilter,
  addSelected,
  clearSelected,
  clearFilters,
  clearPackages,
  setPackagesStart,
  setPackagesSuccess,
  setPackagesError,
  setPackagesOutdatedSuccess,
  updatePackage
};
