/**
 Global reducer:
 Handles state management for global operations
 **/

"use strict";

import initialState from "./initialState";
import * as R from "ramda";
import {
  SET_MODE,
  SET_PACKAGE_JSON,
  ADD_MESSAGE,
  CLEAR_MESSAGES,
  TOGGLE_LOADER,
  TOGGLE_MODAL,
  ADD_COMMAND_OPTION,
  CLEAR_COMMAND_OPTIONS
} from "../constants/ActionTypes";

let { packages, ...globalState } = initialState;

//currying
const createReducer = (globalState, handlers) => (state = globalState, action) =>
  R.propOr(R.identity, R.prop("type", action), handlers)(state, action);

const default_reducer = (state = globalState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        showModal: action.showModal,
        npmCmd: action.npmCmd
      };
    case ADD_COMMAND_OPTION:
      if (state.cmdOptions && state.cmdOptions.length) {
        let optionIndex = state.cmdOptions.indexOf(action.option);
        if (optionIndex === -1) {
          return {
            ...state,
            cmdOptions: [...state.cmdOptions, action.option]
          };
        } else {
          return {
            ...state,
            cmdOptions: [...state.cmdOptions.slice(0, optionIndex)]
          };
        }
      } else {
        return {
          ...state,
          cmdOptions: [action.option]
        };
      }
    case CLEAR_COMMAND_OPTIONS:
      return {
        ...state,
        cmdOptions: []
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: []
      };
    case ADD_MESSAGE:
      return state.messages.length
        ? {
            ...state,
            messages: [
              ...state.messages,
              {
                level: action.level,
                body: action.body
              }
            ]
          }
        : {
            ...state,
            messages: [
              {
                level: action.level,
                body: action.body
              }
            ]
          };
    case TOGGLE_LOADER:
      return {
        ...state,
        loading: action.loading
      };
    case SET_MODE:
      return {
        ...state,
        mode: action.mode,
        directory: action.directory
      };
    case SET_PACKAGE_JSON:
      return {
        ...state,
        packageJSON: action.packageJSON
      };
    default:
      return state;
  }
};

const handlers = {
  [SET_MODE]: (state, action) =>
    R.evolve(
      {
        mode: () => action.mode,
        directory: () => action.directory
      },
      state
    ),
  [TOGGLE_LOADER]: (state, action) => R.assoc("loading", action.loading, state),
  [TOGGLE_MODAL]: (state, action) =>
    R.evolve(
      {
        showModal => action.showModal,
        npmCmd => action.npmCmd
      },
      state
    ),
  [SET_PACKAGE_JSON]: (state, action) => R.assoc("packageJSON", action.packageJSON, state)
};

const reducer = createReducer(globalState, handlers);
export default reducer;
