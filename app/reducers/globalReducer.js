/**
 Global reducer:
 Handles state management for global operations.
 **/

"use strict";

import initialState from "./initialState";
import { identity, merge, evolve, assoc, propOr, prop, prepend } from "ramda";
import {
  SET_MODE,
  SET_PACKAGE_JSON,
  SET_ACTIVE_SIDEBAR,
  ADD_MESSAGE,
  CLEAR_MESSAGES,
  TOGGLE_LOADER,
  TOGGLE_MODAL,
  ADD_COMMAND_OPTION,
  CLEAR_COMMAND_OPTIONS,
  MENU_OPEN
} from "../constants/ActionTypes";

let { packages, ...globalState } = initialState;

//currying
const createReducer = (globalState, handlers) => (state = globalState, action) =>
  propOr(identity, prop("type", action), handlers)(state, action);

const handlers = {
  [SET_MODE]: (state, action) =>
    merge(state, {
      mode: action.mode,
      directory: action.directory
    }),
  [TOGGLE_LOADER]: (state, action) => assoc("loading", action.loading, state),
  [TOGGLE_MODAL]: (state, action) =>
    merge(state, {
      showModal: action.showModal,
      npmCmd: action.npmCmd
    }),
  [SET_PACKAGE_JSON]: (state, action) => assoc("packageJSON", action.packageJSON, state),
  [ADD_MESSAGE]: (state, action) =>
    merge(state, {
      messages: prepend(
        {
          level: action.level,
          body: action.body
        },
        state.messages
      )
    }),
  [CLEAR_MESSAGES]: (state, action) => assoc("messages", [], state),
  [CLEAR_COMMAND_OPTIONS]: (state, action) => assoc("cmdOptions", [], state),
  [ADD_COMMAND_OPTION]: (state, action) =>
    merge(state, {
      cmdOptions: prepend(action.option, state.cmdOptions)
    }),
  [MENU_OPEN]: (state, action) =>
    merge(state, {
      menuOpen: action.bool
    })
};

const reducer = createReducer(globalState, handlers);
export default reducer;
