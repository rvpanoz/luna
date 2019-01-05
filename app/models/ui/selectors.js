import {
  addNotification,
  clearNotifications,
  clearSnackbar,
  setSnackbar,
  setPage,
  setPageRows,
  toggleLoader,
  togglePackageLoader
} from './actions';

const doClearNotifications = dispatch => dispatch(clearNotifications());
const doClearSnackbar = dispatch => dispatch(clearSnackbar());
const doToggleLoader = (dispatch, payload) => dispatch(toggleLoader(payload));
const doTogglePackageLoader = (dispatch, payload) =>
  dispatch(togglePackageLoader(payload));
const doSetPage = (dispatch, payload) => dispatch(setPage(payload));
const doAddNotification = (dispatch, payload) =>
  dispatch(addNotification(payload));
const doSetSnackbar = (dispatch, payload) => dispatch(setSnackbar(payload));
const doSetPageRows = (dispatch, payload) => dispatch(setPageRows(payload));

export {
  doAddNotification,
  doClearNotifications,
  doClearSnackbar,
  doToggleLoader,
  doTogglePackageLoader,
  doSetPage,
  doSetPageRows,
  doSetSnackbar
};
