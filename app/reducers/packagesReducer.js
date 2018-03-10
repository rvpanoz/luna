/**
 Packages reducer:
 Handles state management for packages operations
 * */

import initialState from './initialState'
import * as R from 'ramda'

import {
  TOGGLE_EXPANDED,
  TOGGLE_MAIN_LOADER,
  SET_PACKAGES,
  SET_TOTAL,
  SET_ACTIVE,
  SET_PACKAGES_OUTDATED,
  SET_PACKAGE_ACTIONS,
  SET_PACKAGE_GROUP,
  SET_TAB_INDEX,
  SET_VERSION,
  SET_SELECTED_PACKAGE,
  ADD_COMMAND_OPTION,
  CLEAR_COMMAND_OPTIONS,
  REMOVE_COMMAND_OPTION
} from 'constants/ActionTypes'

import { PACKAGE_GROUPS } from 'constants/AppConstants'

// currying
const createReducer = (initialState, handlers) => (
  state = initialState,
  action
) => R.propOr(R.identity, R.prop('type', action), handlers)(state, action)

const handlers = {
  [TOGGLE_MAIN_LOADER]: (state, action) =>
    R.assoc('isLoading', action.isLoading, state),
  [TOGGLE_EXPANDED]: (state, action) =>
    R.assoc('expanded', !state.expanded, state),
  [SET_VERSION]: (state, action) => R.assoc('version', action.version, state),
  [SET_TAB_INDEX]: (state, action) =>
    R.assoc('tabIndex', action.tabIndex, state),
  [SET_PACKAGE_GROUP]: (state, action) =>
    R.merge(state, {
      group: action.group,
      cmdOptions: R.prepend(PACKAGE_GROUPS[action.group], state.cmdOptions)
    }),
  [CLEAR_COMMAND_OPTIONS]: (state, action) => R.assoc('cmdOptions', [], state),
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
  [SET_PACKAGES]: (state, action) =>
    R.merge(state, {
      packages: action.packages,
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
          ? R.remove(idx, 1, state.selected)
          : R.prepend(action.packageName, state.selected)
    })
  }
}

const reducer = createReducer(initialState.packages, handlers)
export default reducer
