/**
* Global reducer - handles state management
* for global operations
**/

'use strict';

import initialState from './initialState';
import {
  SET_MODE,
  ADD_MESSAGE,
  CLEAR_MESSAGES,
  TOGGLE_LOADER,
  TOGGLE_MODAL,
  ADD_COMMAND_OPTION
} from '../constants/ActionTypes';

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMAND_OPTION:
      if (state.cmdOptions.length) {
        let optionIndex = state.cmdOptions.indexOf(action.option);

        if (optionIndex === -1) {
          return {
            ...state,
            cmdOptions: [
              ...state.cmdOptions,
              action.option
            ]
          }
        } else {
          return {
            ...state,
            cmdOptions: [...state.cmdOptions.slice(0, optionIndex)]
          }
        }
      } else {
        return {
          ...state,
          cmdOptions: [action.option]
        }
      }
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: []
      }
    case ADD_MESSAGE:
      return (state.messages.length)
        ? {
          ...state,
          messages: [
            ...state.messages, {
              level: action.level,
              body: action.body
            }
          ]
        } : {
          ...state,
          messages: [{
              level: action.level,
              body: action.body
          }]
        };
    case TOGGLE_LOADER:
      return {
        ...state,
        loading: action.loading
      }
    case SET_MODE:
      return {
        ...state,
        mode: action.mode,
        directory: action.directory
      }
    case TOGGLE_MODAL:
      return {
        ...state,
        showModal: action.showModal
      }
    default:
      return state;
  }
}

export default globalReducer
