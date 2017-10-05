import {
  TOGGLE_LOADER,
  SET_PACKAGES,
  SET_ACTIVE,
  SET_MODE
} from '../constants/ActionTypes';
import initialState from './initialState';

export default function packagesReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LOADER:
      return Object.assign({}, state, {
        loading: action.loading
      });
    case SET_PACKAGES:
      return Object.assign({}, state, {
        packages: action.packages,
        active: null
      });
    case SET_ACTIVE:
      return Object.assign({}, state, {
        active: action.active
      });
    case SET_MODE:
      return Object.assign({}, state, {
        mode: action.mode,
        active: null
      });
    default:
      return state;
  }
}
