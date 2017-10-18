import initialState from './initialState';
import {combineReducers} from "redux";
import {
  TOGGLE_MAIN_LOADER,
  SET_PACKAGES,
  SET_ACTIVE,
  TOGGLE_LOADER,
  SET_MODE,
  SET_APP_MESSAGE,
  ADD_NOTIFICATION,
  CLEAR_NOTIFICATIONS
} from '../constants/ActionTypes';

const global = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_NOTIFICATIONS:
      return Object.assing({}, state, {
        notifications: []
      });
    case ADD_NOTIFICATION:
      let notifications = state.notifications;
      console.log(...notifications);
      return (notifications.length) ? {
        ...state,
        notifications: [...state.notifications, {
          notificationType: action.notificationType,
          notificationMessage: action.notificationMessage
        }]
      } :
      Object.assign({}, state, {
        notifications: [{
          notificationType: action.notificationType,
          notificationMessage: action.notificationMessage
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

const sidebar = (state = {
  tabActive: 0
}, action) => {
  return Object.assign({}, state, {tabActive: action.tabActive});
}

const packages = (state = initialState, action) => {
  switch (action.type) {
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
