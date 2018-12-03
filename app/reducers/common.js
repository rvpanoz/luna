/**
 Global reducer:
 Handles state management for global operations.
 * */
import { identity, merge, assoc, propOr, prop, prepend } from 'ramda';
import {
  SET_MODE,
  SET_PACKAGE_JSON,
  SET_OPENED_PACKAGES,
  ADD_MESSAGE,
  CLEAR_MESSAGES,
  TOGGLE_LOADER,
  TOGGLE_SETTINGS,
  TOGGLE_SNACKBAR,
  TOGGLE_DRAWER,
  MENU_OPEN,
  SET_SETTINGS
} from '../constants/ActionTypes';
import initialState from './initialState';

const { metadata, packages, ...common } = initialState;

const createReducer = (commonState, handlers) => (state = common, action) =>
  propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
  [SET_OPENED_PACKAGES]: (state, action) =>
    assoc('openedPackages', action.packages, state),
  [SET_SETTINGS]: (state, action) => assoc('settings', action.settings, state),
  [SET_MODE]: (state, action) =>
    merge(state, {
      mode: action.mode,
      directory: action.directory
    }),
  [TOGGLE_SNACKBAR]: (state, action) =>
    merge(state, {
      snackBarOpen: action.snackBarOpen,
      snackbar: action.snackbarOptions ? action.snackbarOptions : state.snackbar
    }),
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
  [CLEAR_MESSAGES]: state => assoc('messages', [], state),
  [MENU_OPEN]: (state, action) => assoc('menuOpen', action.menuOpen, state)
};

const reducer = createReducer(common, handlers);
export default reducer;
