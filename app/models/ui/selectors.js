import {
  addNotification,
  clearNotifications,
  clearSnackbar,
  setSnackbar,
  setPage,
  setPageRows,
  toggleLoader
} from './actions';

const doClearNotifications = dispatch => dispatch(clearNotifications());
const doClearSnackbar = dispatch => dispatch(clearSnackbar());
const doToggleLoader = (dispatch, payload) => dispatch(toggleLoader(payload));
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
  doSetPage,
  doSetPageRows,
  doSetSnackbar
};
