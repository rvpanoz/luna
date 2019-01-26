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
const setOutdatedSuccess = ActionCreator('SET_OUTDATED_SUCCESS');
const setSortOptions = ActionCreator('SET_SORT_OPTIONS');
const setActive = ActionCreator('SET_ACTIVE_PACKAGE');
const setActiveError = ActionCreator('SET_ACTIVE_PACKAGE_ERROR');
const setPackagesError = ActionCreator('SET_PACKAGES_ERROR');
const updatePackage = ActionCreator('UPDATE_PACKAGE');
const updateData = ActionCreator('UPDATE_DATA');

export {
  addActionError,
  addFilter,
  addSelected,
  clearSelected,
  clearFilters,
  clearPackages,
  setActive,
  setActiveError,
  setPackagesStart,
  setPackagesSuccess,
  setPackagesError,
  setSortOptions,
  setOutdatedSuccess,
  updateData,
  updatePackage
};
