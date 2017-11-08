/**
* Redux actions
*/

import * as types from '../constants/ActionTypes';
import * as Modes from '../constants/Modes';

export function addCommandOption(option) {
  return {
    type: types.ADD_COMMAND_OPTION,
    option
  }
}

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

export function addMessage(level, body) {
  return {
    type: types.ADD_MESSAGE,
    level,
    body
  }
}

export function clearMessages(messages) {
  return {
    type: types.CLEAR_MESSAGES,
    messages
  }
}

export function setActivePage(activePage, pageTitle) {
  return {
    type: types.SET_ACTIVE_PAGE,
    activePage,
    pageTitle
  }
}

export function toggleLoader(loading) {
  return {
    type: types.TOGGLE_LOADER,
    loading
  };
}

export function toggleMainLoader(isLoading) {
  return {
    type: types.TOGGLE_MAIN_LOADER,
    isLoading
  };
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

export function setMode(mode, directory) {
  return {
    type: types.SET_MODE,
    mode,
    directory
  }
}

export function setModal(showModal) {
  return {
    type: types.SET_MODAL_STATUS,
    showModal
  }
}
