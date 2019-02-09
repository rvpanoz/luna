/**
 * Global reducer: Handles state management for global operations.
 */

import { identity, merge, assoc, propOr, prop, prepend } from 'ramda';
import {
  updateNotifications,
  addNotification,
  clearNotifications,
  clearSnackbar,
  commandError,
  setSnackbar,
  setManager,
  setMode,
  setPage,
  setPageRows,
  setNpmVersion,
  toggleLoader,
  togglePackageLoader,
  uiException,
  npmCommand
} from 'models/ui/actions';
import initialState from './initialState';

const { packages, ...common } = initialState;

/**
 *
 * @param {*} commonState
 * @param {*} handlers
 */
const createReducer = (commonState, handlers) => (
  state = commonState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
  [uiException.type]: (state, { payload: message }) =>
    assoc('uiException', message, state),
  [setNpmVersion.type]: (state, { payload: version }) =>
    merge(state, {
      npm: {
        version
      }
    }),
  [updateNotifications.type]: (state, { payload: { notifications } }) =>
    assoc('notifications', notifications, state),
  [addNotification.type]: (
    state,
    { payload: { type, body, required, requiredBy } }
  ) =>
    merge(state, {
      notifications: prepend(
        {
          type,
          body,
          required,
          requiredBy
        },
        state.notifications
      )
    }),
  [npmCommand.type]: (state, { payload: message }) =>
    merge(state, {
      npm: {
        running: message
      }
    }),
  [commandError.type]: (state, { payload: error }) =>
    assoc('command_error', error, state),
  [clearSnackbar.type]: state =>
    merge(state, {
      snackbarOptions: {
        open: false,
        type: 'info',
        message: null
      }
    }),
  [clearNotifications.type]: state => assoc('notifications', [], state),
  [setSnackbar.type]: (state, { payload }) =>
    assoc('snackbarOptions', merge(state.snackbarOptions, payload), state),
  [setMode.type]: (state, { payload: { mode, directory } }) =>
    merge(state, {
      mode,
      directory
    }),
  [setManager.type]: (state, { payload: { manager } }) =>
    assoc('manager', manager, state),
  [setPage.type]: (state, { payload: { page } }) => assoc('page', page, state),
  [setPageRows.type]: (state, action) => {
    const {
      payload: { rowsPerPage }
    } = action;

    return assoc('rowsPerPage', rowsPerPage, state);
  },
  [toggleLoader.type]: (state, { payload: { loading, message } }) =>
    merge(state, {
      loader: {
        loading,
        message
      }
    }),
  [togglePackageLoader.type]: (state, { payload: { loading, message } }) =>
    merge(state, {
      packageLoader: {
        loading,
        message
      }
    })
};

const reducer = createReducer(common, handlers);
export default reducer;
