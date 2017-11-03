import initialState from './initialState';
import {
  TOGGLE_MAIN_LOADER,
  SET_PACKAGES,
  TOTAL_INSTALLED,
  SET_ACTIVE,
  SET_MODAL_STATUS,
  SET_PACKAGES_OUTDATED,
  SET_PACKAGE_ACTIONS
} from '../constants/ActionTypes';

const packagesReducer = (state = initialState.packages, action) => {
  switch (action.type) {
    case SET_PACKAGES_OUTDATED:
      return Object.assign({}, state, {
        packagesOutdated: action.packagesOutdated,
        loading: false
      })
    case TOGGLE_MAIN_LOADER:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case SET_PACKAGES:
      return Object.assign({}, state, {
        packages: action.packages,
        loading: false
      });
    case SET_MODAL_STATUS:
      return Object.assign({}, state, {
        showModal: action.showModal
      });
    case TOTAL_INSTALLED:
      return Object.assign({}, state, {
        totalInstalled: action.totalInstalled
      });
    case SET_PACKAGES_OUTDATED:
      return Object.assign({}, state, {
        packagesOutdated: action.packages,
        loading: false
      });
    case SET_PACKAGE_ACTIONS:
      return Object.assign({}, state, {
        packageActions: action.packageActions
      });
    case SET_ACTIVE:
      return Object.assign({}, state, {
        active: action.active,
        loading: false,
        isLoading: false
      });
    default:
      return state;
  }
}

export default packagesReducer
