/**
 * global reducer: Handles state management for global operations.
 */

import { identity, merge, assoc, propOr, prop, prepend, remove } from 'ramda';

import {
  addFilter,
  addSelected,
  clearSelected,
  clearFilters,
  clearSnackbar,
  setSnackbar,
  toggleLoader,
  togglePackageLoader,
  setActivePage,
  setUIException,
  setSortOptions,
  setPage,
  setPageRows,
  updateFilters
} from 'models/ui/actions';

import initialState from './initialState';

const { ui } = initialState;

/**
 *
 * @param {*} commonState
 * @param {*} handlers
 */
const createReducer = (uiState, handlers) => (state = uiState, action) =>
  propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
  [setActivePage.type]: (state, { payload: { page, paused } }) =>
    merge(state, {
      activePage: page,
      paused
    }),
  [clearSnackbar.type]: state =>
    merge(state, {
      snackbar: {
        ...state.snackbar,
        type: 'info',
        open: false,
        message: null
      }
    }),
  [setSnackbar.type]: (state, { type, open, message }) =>
    merge(state, {
      snackbar: {
        ...state.snackbar,
        type,
        open,
        message
      }
    }),
  [setUIException.type]: (state, { payload: message }) =>
    assoc('uiException', message, state),
  [toggleLoader.type]: (state, { payload: { loading, message } }) =>
    merge(state, {
      loaders: {
        ...state.loaders,
        loader: {
          loading,
          message
        }
      }
    }),
  [togglePackageLoader.type]: (state, { payload: { loading, message } }) =>
    merge(state, {
      loaders: {
        ...state.loaders,
        packageLoader: {
          loading,
          message
        }
      }
    }),
  [updateFilters.type]: (state, { payload: { allFilters } }) =>
    merge(state, {
      ...state,
      filtering: {
        ...state.filtering,
        filters: allFilters
      }
    }),
  [addFilter.type]: (state, { payload: { filter } }) => {
    const {
      filtering: { filters }
    } = state;
    const idx = filters.indexOf(filter);

    return merge(state, {
      ...state,
      filtering: {
        ...state.filtering,
        page: 0,
        filters: idx !== -1 ? remove(idx, 1, filters) : prepend(filter, filters)
      }
    });
  },
  [addSelected.type]: (state, action) => {
    const { selected } = state;
    const {
      payload: { name, force }
    } = action;

    const idx = selected.indexOf(name);
    let newSelected = [];

    if (idx !== -1 && Boolean(force) === true) {
      newSelected = selected;
    } else if (idx !== -1 && !force) {
      newSelected = remove(idx, 1, selected);
    } else {
      newSelected = prepend(name, selected);
    }

    return merge(state, {
      ...state,
      selected: newSelected
    });
  },
  [clearFilters.type]: state =>
    merge(state, {
      filtering: {
        filters: [],
        page: 0
      }
    }),
  [clearSelected.type]: state =>
    merge(state, {
      ...state,
      selected: []
    }),
  [setSortOptions.type]: (state, { payload: { sortBy, sortDir } }) =>
    merge(state, {
      ...state,
      sorting: {
        sortBy,
        sortDir
      }
    }),
  [setPage.type]: (state, { payload: { page } }) =>
    merge(state, {
      pagination: {
        ...state.pagination,
        page
      }
    }),
  [setPageRows.type]: (state, { payload: { rowsPerPage } }) =>
    merge(state, {
      pagination: {
        ...state.pagination,
        rowsPerPage
      }
    })
};

const reducer = createReducer(ui, handlers);
export default reducer;
