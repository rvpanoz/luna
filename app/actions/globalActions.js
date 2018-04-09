/**
 * Glabal actions
 */

import * as types from 'constants/ActionTypes'

export function toggleDrawer(bool) {
  return {
    type: types.TOGGLE_DRAWER,
    drawerOpen: bool
  }
}

export function toggleSnackbar(bool, options) {
  return {
    type: types.TOGGLE_SNACKBAR,
    snackBarOpen: bool,
    snackbarOptions: options
  }
}
export function toggleSettings(bool) {
  return {
    type: types.TOGGLE_SETTINGS,
    settingsOpen: bool
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
export function addMessage(level, body, requires, requiredBy) {
  return {
    type: types.ADD_MESSAGE,
    level,
    body,
    requires,
    requiredBy
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
