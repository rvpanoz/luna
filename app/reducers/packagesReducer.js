/**
 Packages reducer:
 Handles state management for packages operations
 * */

import initialState from './initialState'
import { identity, merge, propOr, prop, assoc, prepend, remove } from 'ramda'

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
  SET_SELECTED_PACKAGE
} from '../constants/ActionTypes'

// currying
const createReducer = (initialState, handlers) => (
  state = initialState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action)

const handlers = {
  [TOGGLE_MAIN_LOADER]: (state, action) =>
    assoc('isLoading', action.isLoading, state),
  [TOGGLE_EXPANDED]: (state, action) =>
    assoc('expanded', !state.expanded, state),
  [SET_VERSION]: (state, action) => assoc('version', action.version, state),
  [SET_TAB_INDEX]: (state, action) => assoc('tabIndex', action.tabIndex, state),
  [SET_PACKAGE_GROUP]: (state, action) => assoc('group', action.group, state),
  [SET_PACKAGES]: (state, action) => assoc('packages', action.packages, state),
  [SET_PACKAGES_OUTDATED]: (state, action) =>
    assoc('outdated', action.outdated, state),
  [SET_ACTIVE]: (state, action) => assoc('active', action.active, state),
  [SET_PACKAGE_ACTIONS]: (state, action) =>
    assoc('actions', action.actions || state.defaultActions, state),
  [SET_TOTAL]: (state, action) => assoc('total', action.total, state),
  [SET_SELECTED_PACKAGE]: (state, action) => {
    const idx = state.selected.indexOf(action.packageName)
    return merge(state, {
      selected:
        idx !== -1
          ? remove(idx, 1, state.selected)
          : prepend(action.packageName, state.selected)
    })
  }
}

const reducer = createReducer(initialState.packages, handlers)
export default reducer
