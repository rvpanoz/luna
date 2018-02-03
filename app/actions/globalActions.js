/**
 * Redux actions
 */

import * as types from 'constants/ActionTypes';

export function setSettings(settings) {
  return {
    type: types.SET_SETTINGS,
    settings
  };
}

export function handleDrawer(status) {
  return {
    type: types.MENU_OPEN,
    menuOpen: status
  };
}

export function setPackageJSON(packageJSON) {
  return {
    type: types.SET_PACKAGE_JSON,
    packageJSON
  };
}

export function addCommandOption(option) {
  return {
    type: types.ADD_COMMAND_OPTION,
    option
  };
}

export function clearCommandOptions() {
  return {
    type: types.CLEAR_COMMAND_OPTIONS
  };
}

export function setMode(mode, directory) {
  return {
    type: types.SET_MODE,
    mode,
    directory,
    packageJSON: null
  };
}

export function addMessage(level, body) {
  return {
    type: types.ADD_MESSAGE,
    level,
    body
  };
}

export function clearMessages(messages) {
  return {
    type: types.CLEAR_MESSAGES,
    messages
  };
}

export function toggleLoader(loading) {
  return {
    type: types.TOGGLE_LOADER,
    loading
  };
}

export function toggleSettings(bool) {
  return {
    type: types.TOGGLE_SETTINGS,
    settingsOpen: bool
  };
}
