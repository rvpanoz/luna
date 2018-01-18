/**
 Packages reducer:
 Handles state management for packages operations
 **/

'use strict'

import initialState from './initialState'
import * as R from 'ramda'

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
	R.propOr(R.identity, R.prop('type', action), handlers)(state, action)

const reducer = createReducer(initialState.packages, {
	[SET_PACKAGES]: (state, action) => R.assoc('packages', action.packages, state),
	[SET_PACKAGES_OUTDATED]: (state, action) => R.assoc('outdated', action.outdated, state),
	[SET_ACTIVE]: (state, action) => R.assoc('active', action.active, state),
	[TOGGLE_MAIN_LOADER]: (state, action) => R.assoc('isLoading', action.isLoading, state),
	[SET_PACKAGE_ACTIONS]: (state, action) => R.assoc('actions', action.actions || state.actions, state),
	[TOTAL_INSTALLED]: (state, action) => R.assoc('total', action.total, state)
})

export default reducer
