/**
* Redux actions
*/

import * as types from '../constants/ActionTypes';

export function setTotalInstalled(totalInstalled) {
  return {
    type: types.TOTAL_INSTALLED,
    totalInstalled
  }
}

export function setPackagesOutdated(packagesOutdated) {
  return {
    type: types.SET_PACKAGES_OUTDATED,
    packagesOutdated
  }
}

export function setPackageActions(packageActions) {
  return {
    type: types.SET_PACKAGE_ACTIONS,
    packageActions
  }
}

export function setPackages(packages) {
  return {
    type: types.SET_PACKAGES,
    packages
  }
}

export function setActive(active, isLoading) {
  return {
    type: types.SET_ACTIVE,
    active,
    isLoading
  }
}

export function toggleMainLoader(isLoading) {
  return {
    type: types.TOGGLE_MAIN_LOADER,
    isLoading
  };
}
