/**
 Global reducer:
 Handles state management for global operations.
 * */

import {
  SET_MODE,
  SET_PACKAGE_JSON,
  SET_ACTIVE_SIDEBAR,
  ADD_MESSAGE,
  CLEAR_MESSAGES,
  TOGGLE_LOADER,
  TOGGLE_SETTINGS,
  TOGGLE_SNACKBAR,
  TOGGLE_DRAWER,
  TOGGLE_DIALOG,
  MENU_OPEN,
  SET_SETTINGS,
  SETUP_SNACKBAR
} from 'constants/ActionTypes'
import initialState from './initialState'
import {
  identity,
  merge,
  evolve,
  assoc,
  propOr,
  prop,
  prepend,
  contains,
  remove
} from 'ramda'

const { packages, ...globalState } = initialState

// currying
const createReducer = (globalState, handlers) => (
  state = globalState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action)

const handlers = {
  [SETUP_SNACKBAR]: (state, action) =>
    assoc('snackbar', action.snackbarOptions, state),
  [SET_SETTINGS]: (state, action) => assoc('settings', action.settings, state),
  [SET_MODE]: (state, action) =>
    merge(state, {
      mode: action.mode,
      directory: action.directory
    }),
  [TOGGLE_SNACKBAR]: (state, action) =>
    assoc('snackBarOpen', action.snackBarOpen, state),
  [TOGGLE_DIALOG]: (state, action) =>
    assoc('dialogOpen', action.dialogOpen, state),
  [TOGGLE_DRAWER]: (state, action) =>
    assoc('drawerOpen', action.drawerOpen, state),
  [TOGGLE_LOADER]: (state, action) => assoc('loading', action.loading, state),
  [TOGGLE_SETTINGS]: (state, action) =>
    assoc('settingsOpen', action.settingsOpen, state),
  [SET_PACKAGE_JSON]: (state, action) =>
    assoc('packageJSON', action.packageJSON, state),
  [ADD_MESSAGE]: (state, action) =>
    merge(state, {
      messages: prepend(
        {
          level: action.level,
          body: action.body,
          requires: action.requires,
          requiredBy: action.requiredBy
        },
        state.messages
      )
    }),
  [CLEAR_MESSAGES]: (state, action) => assoc('messages', [], state),
  [MENU_OPEN]: (state, action) => assoc('menuOpen', action.menuOpen, state)
}

const reducer = createReducer(globalState, handlers)
export default reducer
