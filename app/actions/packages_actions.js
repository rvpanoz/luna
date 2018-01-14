/**
 * Redux actions
 */

"use strict";

import * as types from "../constants/ActionTypes";

export function setTotalInstalled(total) {
  return {
    type: types.TOTAL_INSTALLED,
    total
  };
}

export function setPackagesOutdated(outdated) {
  return {
    type: types.SET_PACKAGES_OUTDATED,
    outdated
  };
}

export function setPackageActions(actions) {
  return {
    type: types.SET_PACKAGE_ACTIONS,
    actions
  };
}

export function setPackages(packages) {
  return {
    type: types.SET_PACKAGES,
    packages
  };
}

export function setActive(active) {
  return {
    type: types.SET_ACTIVE,
    active
  };
}

export function toggleMainLoader(isLoading) {
  return {
    type: types.TOGGLE_MAIN_LOADER,
    isLoading
  };
}
