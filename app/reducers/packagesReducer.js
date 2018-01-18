/**
 Packages reducer:
 Handles state management for packages operations
 **/

'use strict'

import initialState from './initialState'
import { identity, propOr, prop, assoc } from 'ramda'

import {
	TOGGLE_MAIN_LOADER,
	SET_PACKAGES,
	TOTAL_INSTALLED,
	SET_ACTIVE,
	SET_PACKAGES_OUTDATED,
	SET_PACKAGE_ACTIONS
} from '../constants/ActionTypes'

//currying
const createReducer = (initialState, handlers) => (state = initialState, action) =>
	propOr(identity, prop('type', action), handlers)(state, action)

const handlers = {
	[SET_PACKAGES]: (state, action) => assoc('packages', action.packages, state),
	[SET_PACKAGES_OUTDATED]: (state, action) => assoc('outdated', action.outdated, state),
	[SET_ACTIVE]: (state, action) => assoc('active', action.active, state),
	[TOGGLE_MAIN_LOADER]: (state, action) => assoc('isLoading', action.isLoading, state),
	[SET_PACKAGE_ACTIONS]: (state, action) => assoc('actions', action.actions || state.actions, state),
	[TOTAL_INSTALLED]: (state, action) => assoc('total', action.total, state)
}

const reducer = createReducer(initialState.packages, handlers)
export default reducer
