import {
  addNotification,
  clearNotifications,
  clearSnackbar,
  setSnackbar,
  setPage,
  setPageRows,
<<<<<<< c95bb4b50524e27e2c0538331b8ba3eee2323202
<<<<<<< 1beff8f651b44fbd14f7b672e915efa17d384a08
  toggleLoader,
  togglePackageLoader
=======
  toggleLoader
>>>>>>> clean up
=======
  toggleLoader,
  togglePackageLoader
>>>>>>> Package details first implementation, add more selectors and clean up packages
} from './actions';

const doClearNotifications = dispatch => dispatch(clearNotifications());
const doClearSnackbar = dispatch => dispatch(clearSnackbar());
const doToggleLoader = (dispatch, payload) => dispatch(toggleLoader(payload));
<<<<<<< c95bb4b50524e27e2c0538331b8ba3eee2323202
<<<<<<< 1beff8f651b44fbd14f7b672e915efa17d384a08
const doTogglePackageLoader = (dispatch, payload) =>
  dispatch(togglePackageLoader(payload));
=======
>>>>>>> clean up
=======
const doTogglePackageLoader = (dispatch, payload) =>
  dispatch(togglePackageLoader(payload));
>>>>>>> Package details first implementation, add more selectors and clean up packages
const doSetPage = (dispatch, payload) => dispatch(setPage(payload));
const doAddNotification = (dispatch, payload) =>
  dispatch(addNotification(payload));
const doSetSnackbar = (dispatch, payload) => dispatch(setSnackbar(payload));
<<<<<<< c95bb4b50524e27e2c0538331b8ba3eee2323202
<<<<<<< 1beff8f651b44fbd14f7b672e915efa17d384a08
=======

>>>>>>> clean up
=======
>>>>>>> Package details first implementation, add more selectors and clean up packages
const doSetPageRows = (dispatch, payload) => dispatch(setPageRows(payload));

export {
  doAddNotification,
  doClearNotifications,
  doClearSnackbar,
  doToggleLoader,
<<<<<<< c95bb4b50524e27e2c0538331b8ba3eee2323202
<<<<<<< 1beff8f651b44fbd14f7b672e915efa17d384a08
  doTogglePackageLoader,
=======
>>>>>>> clean up
=======
  doTogglePackageLoader,
>>>>>>> Package details first implementation, add more selectors and clean up packages
  doSetPage,
  doSetPageRows,
  doSetSnackbar
};
