/**
 * Global reducer: Handles state management for global operations.
 */

import { identity, merge, assoc, propOr, prop, append, prepend } from 'ramda';
// import format from 'date-fns/format';

import {
  updateNotifications,
  addNotification,
  clearNotifications,
  clearCommands,
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
  npmCommand,
  setActivePage
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
  [setActivePage.type]: (state, { payload: page }) => {
    console.log(page);
    return assoc('activePage', page, state);
  },
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
  [npmCommand.type]: (state, { payload: command }) =>
    merge(state, {
      commands: append(command, state.commands)
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
  [clearCommands.type]: state =>
    merge(state, {
      npm: {
        commands: []
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
