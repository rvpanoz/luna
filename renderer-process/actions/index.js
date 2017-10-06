import * as types from '../constants/ActionTypes';
import { parse, isJson } from '../../utils';

export function toggleLoader(loading) {
  return {
    type: types.TOGGLE_LOADER,
    loading
  };
}

export function toggleMainLoader(packages_loading) {
  return {
    type: types.TOGGLE_MAIN_LOADER,
    packages_loading
  }
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

export function setActive(active) {
  return {
    type: types.SET_ACTIVE,
    active
  }
}

export function setMode(mode='global') {
  return {
    type: types.SET_MODE,
    mode
  }
}
