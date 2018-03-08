/**
 * Redux actions
 */

import * as types from 'constants/ActionTypes'

export function toggleDrawer(bool) {
  return {
    type: types.TOGGLE_DRAWER,
    drawerOpen: bool
  }
}

export function setupSnackbar(snackbarOptions) {
  return {
    type: types.SETUP_SNACKBAR,
    snackbarOptions
  }
}

export function toggleSnackbar(bool) {
  return {
    type: types.TOGGLE_SNACKBAR,
    snackBarOpen: bool
  }
}
export function setSettings(settings) {
  return {
    type: types.SET_SETTINGS,
    settings
  }
}

export function handleDrawer(bool) {
  return {
    type: types.MENU_OPEN,
    menuOpen: bool
  }
}

export function setPackageJSON(packageJSON) {
  return {
    type: types.SET_PACKAGE_JSON,
    packageJSON
  }
}

export function setMode(mode, directory) {
  return {
    type: types.SET_MODE,
    mode,
    directory,
    packageJSON: null
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

export function toggleLoader(loading) {
  return {
    type: types.TOGGLE_LOADER,
    loading
  }
}

export function toggleSettings(bool) {
  return {
    type: types.TOGGLE_SETTINGS,
    settingsOpen: bool
  }
}
