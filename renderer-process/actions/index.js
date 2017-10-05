import * as types from '../constants/ActionTypes';
import {remote, ipcRenderer} from 'electron';
import {parse} from '../../utils';

export function toggleLoader(loading) {
  return {
    type: types.TOGGLE_LOADER,
    loading
  };
}

export function setPackages(data) {
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
