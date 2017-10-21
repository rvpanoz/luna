import initialState from './initialState';
import {combineReducers} from "redux";
import {
  TOGGLE_MAIN_LOADER,
  SET_PACKAGES,
  SET_ACTIVE,
  TOGGLE_LOADER,
  SET_MODE,
  SET_APP_MESSAGE,
  ADD_MESSAGE,
  CLEAR_MESSAGES,
  TOGGLE_RELOAD,
  SET_SIDEBAR_CONTENT
} from '../constants/ActionTypes';

const global = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_MESSAGES:
      return Object.assign({}, state, {
        messages: []
      });
    case ADD_MESSAGE:
      let messages = state.messages;
      return (messages.length) ? {
        ...state,
        messages: [...state.messages, {
          level: action.level,
          body: action.body
        }]
      } :
      Object.assign({}, state, {
        messages: [{
          level: action.level,
          body: action.body
        }]
      })
    case TOGGLE_LOADER:
      return Object.assign({}, state, {loading: action.loading});
    case SET_MODE:
      return Object.assign({}, state, {
        mode: action.mode,
        packageActions: action.packageActions
      });
    case SET_APP_MESSAGE:
      return Object.assign({}, state, {
        appMessage: action.appMessage,
        open: action.open
      });
    default:
      return state;
  }
}

const sidebar = (state = initialState.sidebar, action) => {
  switch (action.type) {
    case SET_SIDEBAR_CONTENT:
      return Object.assign({}, state, {
        active: action.active
      });
      break;
    default:
      return state;
  }
}

const packages = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_RELOAD:
      return Object.assign({}, state, {
        status: action.status
      })
    case TOGGLE_MAIN_LOADER:
      return Object.assign({}, state, {isLoading: action.isLoading});
    case SET_PACKAGES:
      return Object.assign({}, state, {
        packages: action.packages,
        loading: false
      });
    case SET_ACTIVE:
      return Object.assign({}, state, {
        active: action.active,
        isLoading: action.isLoading || false
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({global, sidebar, packages})

export default rootReducer
