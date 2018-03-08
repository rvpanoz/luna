/**
 * Redux actions
 */

import * as types from 'constants/ActionTypes'

export function setSelectedPackage(packageName) {
  return {
    type: types.SET_SELECTED_PACKAGE,
    packageName
  }
}

export function setVersion(version) {
  return {
    type: types.SET_VERSION,
    version
  }
}

export function setActiveTab(tabIndex) {
  return {
    type: types.SET_TAB_INDEX,
    tabIndex
  }
}

export function toggleExpanded() {
  return {
    type: types.TOGGLE_EXPANDED
  }
}

export function setTotal(total) {
  return {
    type: types.SET_TOTAL,
    total
  }
}

export function addCommandOption(option) {
  return {
    type: types.ADD_COMMAND_OPTION,
    option
  }
}

export function removeCommandOption(option) {
  return {
    type: types.REMOVE_COMMAND_OPTION,
    option
  }
}

export function clearCommandOptions() {
  return {
    type: types.CLEAR_COMMAND_OPTIONS
  }
}

export function setPackagesOutdated(outdated) {
  return {
    type: types.SET_PACKAGES_OUTDATED,
    outdated
  }
}

export function setPackageGroup(group) {
  return {
    type: types.SET_PACKAGE_GROUP,
    group
  }
}

export function setPackageActions(actions) {
  return {
    type: types.SET_PACKAGE_ACTIONS,
    actions
  }
}

export function setPackages(packages) {
  return {
    type: types.SET_PACKAGES,
    packages
  }
}

export function setActive(active) {
  return {
    type: types.SET_ACTIVE,
    active
  }
}

export function toggleMainLoader(isLoading) {
  return {
    type: types.TOGGLE_MAIN_LOADER,
    isLoading
  }
}
