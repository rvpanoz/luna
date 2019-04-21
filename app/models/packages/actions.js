import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA/PACKAGES');

const clearAll = ActionCreator('CLEAR_ALL');
const clearPackages = ActionCreator('CLEAR_PACKAGES');
const setPackagesStart = ActionCreator('SET_PACKAGES_START');
const setPackagesSuccess = ActionCreator('SET_PACKAGES_SUCCESS');
const setOutdatedSuccess = ActionCreator('SET_OUTDATED_SUCCESS');
const setPackagesError = ActionCreator('SET_PACKAGES_ERROR');
const mapPackages = ActionCreator('MAP_PACKAGES');
const viewPackage = ActionCreator('VIEW_PACKAGE');
const setActive = ActionCreator('SET_ACTIVE');

const installPackages = ActionCreator('INSTALL_PACKAGES');
const installMultiplePackages = ActionCreator('INSTALL_MULTIPLE_PACKAGES');
const updatePackages = ActionCreator('UPDATE_PACKAGES');
const removePackages = ActionCreator('REMOVE_PACKAGES');

const getPackagesListener = ActionCreator('REGISTER_LISTENER_PACKAGES');
const searchPackagesListener = ActionCreator('REGISTER_LISTENER_SEARCH');
const viewPackageListener = ActionCreator('REGISTER_LISTENER_PACKAGE');
const npmActionsListener = ActionCreator('REGISTER_LISTENER_ACTION');

export {
  mapPackages,
  installPackages,
  installMultiplePackages,
  updatePackages,
  clearAll,
  clearPackages,
  setActive,
  setPackagesStart,
  setPackagesSuccess,
  setPackagesError,
  setOutdatedSuccess,
  removePackages,
  viewPackage,
  npmActionsListener,
  getPackagesListener,
  searchPackagesListener,
  viewPackageListener
};
