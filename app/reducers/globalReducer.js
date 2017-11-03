import initialState from './initialState';
import {
  SET_MODE,
  ADD_MESSAGE,
  CLEAR_MESSAGES,
  TOGGLE_LOADER
} from '../constants/ActionTypes';

const globalReducer = (state = initialState.global, action) => {
  switch (action.type) {
    case CLEAR_MESSAGES:
      return Object.assign({}, state, {messages: []});
    case ADD_MESSAGE:
      let messages = state.messages;
      return (messages.length)
        ? {
          ...state,
          messages: [
            ...state.messages, {
              level: action.level,
              body: action.body
            }
          ]
        }
        : Object.assign({}, state, {
          messages: [
            {
              level: action.level,
              body: action.body
            }
          ]
        });
    case TOGGLE_LOADER:
      return Object.assign({}, state, {
        loading: action.loading
      });
    case SET_MODE:
      return Object.assign({}, state, {
        mode: action.mode,
        directory: action.directory,
        messages: [],
        loading: true
      });
    default:
      return state;
  }
}

export default globalReducer
