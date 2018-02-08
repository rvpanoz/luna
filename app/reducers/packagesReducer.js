/**
 Packages reducer:
 Handles state management for packages operations
 * */

import initialState from './initialState'
import { identity, propOr, prop, assoc } from 'ramda'

import {
  TOGGLE_MAIN_LOADER,
  SET_PACKAGES,
  SET_TOTAL,
  SET_ACTIVE,
  SET_PACKAGES_OUTDATED,
  SET_PACKAGE_ACTIONS,
  SET_PACKAGE_GROUP
} from '../constants/ActionTypes'

// currying
const createReducer = (initialState, handlers) => (
  state = initialState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action)

const handlers = {
  [SET_PACKAGE_GROUP]: (state, action) => assoc('group', action.group, state),
  [SET_PACKAGES]: (state, action) => assoc('packages', action.packages, state),
  [SET_PACKAGES_OUTDATED]: (state, action) =>
    assoc('outdated', action.outdated, state),
  [SET_ACTIVE]: (state, action) => assoc('active', action.active, state),
  [TOGGLE_MAIN_LOADER]: (state, action) =>
    assoc('isLoading', action.isLoading, state),
  [SET_PACKAGE_ACTIONS]: (state, action) =>
    assoc('actions', action.actions || state.actions, state),
  [SET_TOTAL]: (state, action) => assoc('total', action.total, state)
}

const reducer = createReducer(initialState.packages, handlers)
export default reducer
