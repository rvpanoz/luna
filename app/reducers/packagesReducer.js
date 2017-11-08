/**
* Packages reducer - handles state management
* for packages operations
**/

'use strict';

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
      return {
        ...state,
        packagesOutdated: action.packagesOutdated
      }
    case TOGGLE_MAIN_LOADER:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case SET_PACKAGES:
      return {
        ...state,
        packages: action.packages
      }
    case TOTAL_INSTALLED:
      return {
        ...state,
        totalInstalled: action.totalInstalled
      }
    case SET_PACKAGE_ACTIONS:
      const packageActions_default = [{
        text: 'Update',
        iconCls: 'refresh'
      }, {
        text: 'Uninstall',
        iconCls: 'trash'
      }];

      return {
        ...state,
        packageActions: (action.packageActions) ? action.packageActions : packageActions_default
      }
    case SET_ACTIVE:
      return {
        ...state,
        active: action.active,
        isLoading: false
      }
    default:
      return state;
  }
}

export default packagesReducer
