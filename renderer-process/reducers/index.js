import {
  TOGGLE_LOADER,
  TOGGLE_MAIN_LOADER,
  SET_PACKAGES,
  SET_ACTIVE,
  SET_MODE,
  SET_APP_MESSAGE
} from '../constants/ActionTypes';
import initialState from './initialState';

export default function packagesReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LOADER:
      return Object.assign({}, state, {
        loading: action.loading
      });
    case TOGGLE_MAIN_LOADER:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
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
    case SET_MODE:
      return Object.assign({}, state, {
        mode: action.mode
      });
    case SET_APP_MESSAGE:
      return Object.assign({}, state, {
        appMessage: action.appMessage,
        appMessageType: action.appMessageType
      });
    default:
      return state;
  }
}
