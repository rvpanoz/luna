import initialState from './initialState';
import {combineReducers} from "redux";
import {
  TOGGLE_LOADER,
  TOGGLE_MAIN_LOADER,
  SET_PACKAGES,
  SET_ACTIVE,
  SET_MODE,
  SET_PACKAGES_OUTDATED,
  ADD_MESSAGE,
  CLEAR_MESSAGES
} from '../constants/ActionTypes';

const global = (state = initialState, action) => {
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
        })
      case TOGGLE_LOADER : return Object.assign({}, state, {loading: action.loading});
    case SET_MODE:
      return Object.assign({}, state, {
        mode: action.mode,
        packageActions: action.packageActions
      });
    default:
      return state;
  }
}

const packages = (state = initialState, action) => {
  switch (action.type) {
    case SET_PACKAGES_OUTDATED:
      return Object.assign({}, state, {
        packagesOutdated: action.packagesOutdated,
        loading: false
      })
    case TOGGLE_MAIN_LOADER:
      return Object.assign({}, state, {isLoading: action.isLoading});
    case SET_PACKAGES:
      return Object.assign({}, state, {
        packages: action.packages,
        loading: false
      });
    case SET_PACKAGES_OUTDATED:
      return Object.assign({}, state, {
        packagesOutdated: action.packages,
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

const rootReducer = combineReducers({global, packages})

export default rootReducer
