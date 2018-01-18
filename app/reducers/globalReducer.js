/**
 Global reducer:
 Handles state management for global operations
 **/

'use strict'

import initialState from './initialState'
import * as R from 'ramda'
import {
	SET_MODE,
	SET_PACKAGE_JSON,
	ADD_MESSAGE,
	CLEAR_MESSAGES,
	TOGGLE_LOADER,
	TOGGLE_MODAL,
	ADD_COMMAND_OPTION,
	CLEAR_COMMAND_OPTIONS
} from '../constants/ActionTypes'

let { packages, ...globalState } = initialState

//currying
const createReducer = (globalState, handlers) => (state = globalState, action) =>
	R.propOr(R.identity, R.prop('type', action), handlers)(state, action)

const handlers = {
	[SET_MODE]: (state, action) =>
		R.merge(state, {
			mode: action.mode,
			directory: action.directory
		}),
	[TOGGLE_LOADER]: (state, action) => R.assoc('loading', action.loading, state),
	[TOGGLE_MODAL]: (state, action) =>
		R.merge(state, {
			showModal: action.showModal,
			npmCmd: action.npmCmd
		}),
	[SET_PACKAGE_JSON]: (state, action) => R.assoc('packageJSON', action.packageJSON, state),
	[ADD_MESSAGE]: (state, action) =>
		R.merge(state, {
			messages: R.prepend(
				{
					level: action.level,
					body: action.body
				},
				state.messages
			)
		}),
	[CLEAR_MESSAGES]: (state, action) => R.assoc('messages', [], state),
	[CLEAR_COMMAND_OPTIONS]: (state, action) => R.assoc('cmdOptions', [], state),
	[ADD_COMMAND_OPTION]: (state, action) =>
		R.merge(state, {
			cmdOptions: R.prepend(action.option, state.cmdOptions)
		})
}

const reducer = createReducer(globalState, handlers)
export default reducer
