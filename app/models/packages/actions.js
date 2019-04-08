import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA_APP/PACKAGES');

const clearPackages = ActionCreator('CLEAR_PACKAGES');
const setPackagesStart = ActionCreator('SET_PACKAGES_START');
const setPackagesSuccess = ActionCreator('SET_PACKAGES_SUCCESS');
const setOutdatedSuccess = ActionCreator('SET_OUTDATED_SUCCESS');
const setPackagesError = ActionCreator('SET_PACKAGES_ERROR');
const updateData = ActionCreator('UPDATE_DATA');
const viewPackage = ActionCreator('VIEW_PACKAGE');
const setActive = ActionCreator('SET_ACTIVE');

const installPackages = ActionCreator('INSTALL_PACKAGES');
const updatePackages = ActionCreator('UPDATE_PACKAGES');
const removePackages = ActionCreator('REMOVE_PACKAGES');

const runTool = ActionCreator('RUN_TOOL');

export {
  installPackages,
  updatePackages,
  clearPackages,
  setActive,
  setPackagesStart,
  setPackagesSuccess,
  setPackagesError,
  setOutdatedSuccess,
  updateData,
  runTool,
  removePackages,
  viewPackage
};
