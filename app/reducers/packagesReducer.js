/**
 * Packages reducer - handles state management
 * for packages operations
 **/

"use strict";

import initialState from "./initialState";
import { assoc, evolve, not, cond } from "ramda";

import {
  TOGGLE_MAIN_LOADER,
  SET_PACKAGES,
  TOTAL_INSTALLED,
  SET_ACTIVE,
  SET_MODAL_STATUS,
  SET_PACKAGES_OUTDATED,
  SET_PACKAGE_ACTIONS
} from "../constants/ActionTypes";

function switchcase (cases, defaultCase, key) => {
  if (cases.hasOwnProperty(key)) {
    return cases[key]
  } else {
    return defaultCase
  }
}

// const switchcase = action => {
//   switch (action.type) {
//     case SET_PACKAGES_OUTDATED:
//       return assoc("outdated", action.outdated, state);
//     case TOGGLE_MAIN_LOADER:
//       return assoc("isLoading", action.isLoading, state);
//     case SET_PACKAGES:
//       return assoc("packages", action.packages, state);
//     case TOTAL_INSTALLED:
//       return assoc("totalInstalled", action.total, state);
//     case SET_PACKAGE_ACTIONS:
//       return assoc("packageActions", action.actions ? action.actions : state.actions, state);
//     case SET_ACTIVE:
//       return evolve(
//         {
//           active: () => action.active,
//           isLoading: not
//         },
//         state
//       );
//     default:
//       return state;
//   }
// };

const reducer = (state = initialState.packages, action) => {
  switchcase({
    'SET_PACKAGES_OUTDATED': action.outdated
  })(state)(action.type);
};

export default reducer;
