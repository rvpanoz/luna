import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@ALU/UI');

const addFilter = ActionCreator('ADD_FILTER');
const addSelected = ActionCreator('ADD_SELECTED');
const clearSelected = ActionCreator('CLEAR_SELECTED');
const clearFilters = ActionCreator('CLEAR_FILTERS');
const clearSnackbar = ActionCreator('CLEAR_SNACKBAR');
const setSnackbar = ActionCreator('SET_SNACKBAR');
const showError = ActionCreator('SHOW_ERROR');
const showWarning = ActionCreator('SHOW_WARNING');
const toggleLoader = ActionCreator('TOGGLE_LOADER');
const togglePackageLoader = ActionCreator('TOGGLE_PACKAGE_LOADER');
const setActivePage = ActionCreator('SET_ACTIVE_PAGE');
const setPage = ActionCreator('SET_PAGE');
const setPageRows = ActionCreator('SET_PAGE_ROWS');
const setSortOptions = ActionCreator('SET_SORT_OPTIONS');
const setUIException = ActionCreator('SET_UIEXCEPTION');
const updateFilters = ActionCreator('UPDATE_FILTERS');

export {
  addFilter,
  addSelected,
  clearSelected,
  clearFilters,
  clearSnackbar,
  setActivePage,
  setSnackbar,
  showError,
  showWarning,
  setSortOptions,
  setPage,
  setUIException,
  setPageRows,
  updateFilters,
  toggleLoader,
  togglePackageLoader
};
