import {
  addNotification,
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

const onTogglePackageLoader = dispatch => dispatch(togglePackageLoader());
const onSetPage = (dispatch, { page }) => dispatch(setPage({ page }));

const onAddNotification = (dispatch, payload) =>
  dispatch(addNotification(payload));
const onSetSnackbar = (dispatch, payload) => dispatch(setSnackbar(payload));
const onSetPageRows = (dispatch, payload) => dispatch(setPageRows(payload));
const onSetMode = (dispatch, payload) => dispatch(setMode(payload));

export {
  onAddNotification,
  onClearNotifications,
  onClearSnackbar,
  onSetMode,
  onToggleLoader,
  onTogglePackageLoader,
  onSetPage,
  onSetPageRows,
  onSetSnackbar
};
