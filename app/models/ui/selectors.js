import {
  addNotification,
  clearNotifications,
  clearSnackbar,
  setSnackbar,
  setPage,
  setPageRows,
<<<<<<< 1beff8f651b44fbd14f7b672e915efa17d384a08
  toggleLoader,
  togglePackageLoader
=======
  toggleLoader
>>>>>>> clean up
} from './actions';

const doClearNotifications = dispatch => dispatch(clearNotifications());
const doClearSnackbar = dispatch => dispatch(clearSnackbar());
const doToggleLoader = (dispatch, payload) => dispatch(toggleLoader(payload));
<<<<<<< 1beff8f651b44fbd14f7b672e915efa17d384a08
const doTogglePackageLoader = (dispatch, payload) =>
  dispatch(togglePackageLoader(payload));
=======
>>>>>>> clean up
const doSetPage = (dispatch, payload) => dispatch(setPage(payload));
const doAddNotification = (dispatch, payload) =>
  dispatch(addNotification(payload));
const doSetSnackbar = (dispatch, payload) => dispatch(setSnackbar(payload));
<<<<<<< 1beff8f651b44fbd14f7b672e915efa17d384a08
=======

>>>>>>> clean up
const doSetPageRows = (dispatch, payload) => dispatch(setPageRows(payload));

export {
  doAddNotification,
  doClearNotifications,
  doClearSnackbar,
  doToggleLoader,
<<<<<<< 1beff8f651b44fbd14f7b672e915efa17d384a08
  doTogglePackageLoader,
=======
>>>>>>> clean up
  doSetPage,
  doSetPageRows,
  doSetSnackbar
};
