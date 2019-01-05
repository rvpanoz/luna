/* eslint-disable */

/**
 * Global reducer: Handles state management for global operations.
 */

import { identity, merge, assoc, propOr, prop, prepend } from 'ramda';
import {
  addNotification,
  clearNotifications,
  clearSnackbar,
  setSnackbar,
  setManager,
  setMode,
  setPage,
  setPageRows,
  toggleLoader,
  togglePackageLoader
} from 'models/ui/actions';
import initialState from './initialState';

const { packages, ...common } = initialState;

const createReducer = (commonState, handlers) => (
  state = commonState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
  [addNotification.type]: (
    state,
    { payload: { level, body, requires, requiredBy } }
  ) =>
    merge(state, {
      notifications: prepend(
        {
          level,
          body,
          requires,
          requiredBy
        },
        state.notifications
      )
    }),
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
  [setMode.type]: (state, { payload: { mode }, payload: { directory } }) =>
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
  [toggleLoader.type]: (
    state,
    { payload: { loading }, payload: { message } }
  ) =>
    merge(state, {
      loader: {
        loading,
        message
      }
    }),
  [togglePackageLoader.type]: (
    state,
    { payload: { loading }, payload: { message } }
  ) =>
    merge(state, {
      packageLoader: {
        loading,
        message
      }
    })
};

const reducer = createReducer(common, handlers);
export default reducer;
