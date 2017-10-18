import * as types from '../constants/ActionTypes';
import modes from '../constants/Modes';
import { parse, isJson } from '../utils';

export function addNotification(notificationType, notificationMessage) {
  return {
    type: types.ADD_NOTIFICATION,
    notificationType,
    notificationMessage
  }
}

export function clearNotifications(notifications) {
  return {
    type: types.CLEAR_NOTIFICATIONS,
    notifications
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

export function setMode(mode = modes.GLOBAL, packageActions=['Update', 'Uninstall']) {
  return {
    type: types.SET_MODE,
    mode,
    packageActions
  }
}
