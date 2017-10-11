import * as types from '../constants/ActionTypes';
import modes from '../constants/Modes';
import { parse, isJson } from '../../utils';

export function setActivePage(activePage, pageTitle) {
  return {
    type: types.SET_ACTIVE_PAGE,
    activePage,
    pageTitle
  }
}

export function setAppMessage(appMessage, appMessageType) {
  return {
    type: types.SET_APP_MESSAGE,
    appMessage,
    appMessageType
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

export function setPackages(data) {
  let jsonData = isJson(data);
  if(!jsonData) {
    return {
      type: types.SET_APP_MESSAGE,
      app_message: jsonData
    }
  }

  let packages = parse(data, 'dependencies');
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

export function setMode(mode = modes.GLOBAL, packageActions=['Update', 'Uninstall']) {
  return {
    type: types.SET_MODE,
    mode,
    packageActions
  }
}
