/**
 Packages reducer:
 Handles state management for packages operations
 * */

import initialState from './initialState'
import * as R from 'ramda'

import {
  TOGGLE_EXPANDED,
  TOGGLE_MAIN_LOADER,
  TOGGLE_FILTERS,
  TOGGLE_DETAILS,
  SET_PACKAGES,
  SET_TOTAL,
  SET_ACTIVE,
  SET_PACKAGES_OUTDATED,
  SET_PACKAGE_ACTIONS,
  SET_PACKAGE_GROUP,
  SET_TAB_INDEX,
  SET_VERSION,
  SET_SELECTED_PACKAGE,
  SET_ROWS_PER_PAGE,
  SET_PAGE,
  ADD_FILTER,
  ADD_COMMAND_OPTION,
  CLEAR_COMMAND_OPTIONS,
  CLEAR_SELECTED,
  CLEAR_FILTERS,
  REMOVE_COMMAND_OPTION,
  SET_ERROR
} from 'constants/ActionTypes'

import { PACKAGE_GROUPS } from 'constants/AppConstants'

// currying
const createReducer = (initialState, handlers) => (
  state = initialState,
  action
) => R.propOr(R.identity, R.prop('type', action), handlers)(state, action)

const handlers = {
  [TOGGLE_DETAILS]: (state, action) =>
    R.assoc('showDetails', action.showDetails, state),
  [TOGGLE_FILTERS]: (state, action) =>
    R.assoc('showFilters', action.showFilters, state),
  [TOGGLE_MAIN_LOADER]: (state, action) =>
    R.assoc('isLoading', action.isLoading, state),
  [TOGGLE_EXPANDED]: (state, action) =>
    R.assoc('expanded', !state.expanded, state),
  [SET_PAGE]: (state, action) => R.assoc('page', action.pageNo, state),
  [SET_ROWS_PER_PAGE]: (state, action) =>
    R.assoc('rowsPerPage', action.rows, state),
  [SET_VERSION]: (state, action) => R.assoc('version', action.version, state),
  [SET_TAB_INDEX]: (state, action) =>
    R.assoc('tabIndex', action.tabIndex, state),
  [SET_PACKAGE_GROUP]: (state, action) => {
    let cmdOptions = [PACKAGE_GROUPS[action.group]]

    if (action.option) {
      cmdOptions.push(action.option)
    }

    cmdOptions.forEach((option) => R.prepend(option, state.cmdOptions))

    return R.merge(state, {
      group: action.group,
      cmdOptions
    })
  },
  [CLEAR_COMMAND_OPTIONS]: (state, action) => R.assoc('cmdOptions', [], state),
  [CLEAR_SELECTED]: (state, action) => R.assoc('selected', [], state),
  [CLEAR_FILTERS]: (state, action) => R.assoc('filters', [], state),
  [REMOVE_COMMAND_OPTION]: (state, action) => {
    const idx = state.cmdOptions.indexOf(action.option)
    return R.merge(state, {
      cmdOptions: R.remove(idx, 1, state.cmdOptions)
    })
  },
  [ADD_COMMAND_OPTION]: (state, action) => {
    const idx = state.cmdOptions.indexOf(action.option)
    return R.merge(state, {
      cmdOptions:
        idx !== -1
          ? R.remove(idx, 1, state.cmdOptions)
          : R.prepend(action.option, state.cmdOptions)
    })
  },
  [ADD_FILTER]: (state, action) => {
    const idx = state.filters.indexOf(action.filterName)
    return R.merge(state, {
      page: 0,
      filters:
        idx !== -1
          ? R.remove(idx, 1, state.filters)
          : R.prepend(action.filterName, state.filters)
    })
  },
  [SET_ERROR]: (state, action) => {
    return R.merge(state, {
      errors: R.prepend(action.error, state.errors)
    })
  },
  [SET_PACKAGES]: (state, action) =>
    R.merge(state, {
      packages: action.packages,
      order: action.order || 'asc',
      orderBy: action.orderBy || 'name',
      group: null,
      cmdOptions: [],
      selected: [],
      version: ''
    }),
  [SET_PACKAGES_OUTDATED]: (state, action) =>
    R.assoc('outdated', action.outdated, state),
  [SET_ACTIVE]: (state, action) => R.assoc('active', action.active, state),
  [SET_PACKAGE_ACTIONS]: (state, action) =>
    R.assoc('actions', action.actions || state.defaultActions, state),
  [SET_TOTAL]: (state, action) => R.assoc('total', action.total, state),
  [SET_SELECTED_PACKAGE]: (state, action) => {
    const idx = state.selected.indexOf(action.packageName)
    return R.merge(state, {
      selected:
        idx !== -1
          ? action.force && action.force === true
            ? state.selected
            : R.remove(idx, 1, state.selected)
          : R.prepend(action.packageName, state.selected)
    })
  }
}

const reducer = createReducer(initialState.packages, handlers)
export default reducer
