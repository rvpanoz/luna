import {
  addNotification,
  clearAll,
  clearNotifications,
  clearSnackbar,
  setSnackbar,
  setPage,
  setMode,
  setPageRows,
  toggleLoader,
  togglePackageLoader
} from './actions';

const onClearNotifications = dispatch => dispatch(clearNotifications());
const onClearSnackbar = dispatch => dispatch(clearSnackbar());
const onToggleLoader = (dispatch, payload) => dispatch(toggleLoader(payload));

const onTogglePackageLoader = (dispatch, payload) =>
  dispatch(togglePackageLoader(payload));
const onSetPage = (dispatch, payload) => dispatch(setPage(payload));

const onAddNotification = (dispatch, payload) =>
  dispatch(addNotification(payload));
const onSetSnackbar = (dispatch, payload) => dispatch(setSnackbar(payload));
const onSetPageRows = (dispatch, payload) => dispatch(setPageRows(payload));
const onSetMode = (dispatch, payload) => dispatch(setMode(payload));
const onClearAll = dispatch => dispatch(clearAll());

export {
  onAddNotification,
  onClearAll,
  onClearNotifications,
  onClearSnackbar,
  onSetMode,
  onToggleLoader,
  onTogglePackageLoader,
  onSetPage,
  onSetPageRows,
  onSetSnackbar
};
