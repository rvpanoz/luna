import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA/PACKAGES');

const clearAll = ActionCreator('CLEAR_ALL');
const clearPackages = ActionCreator('CLEAR_PACKAGES');
const setPackagesStart = ActionCreator('SET_PACKAGES_START');
const setPackagesSuccess = ActionCreator('SET_PACKAGES_SUCCESS');
const setOutdatedSuccess = ActionCreator('SET_OUTDATED_SUCCESS');
const setPackagesError = ActionCreator('SET_PACKAGES_ERROR');

const mapPackages = ActionCreator('MAP_PACKAGES');
const mapOutdatedPackages = ActionCreator('MAP_OUTDATED_PACKAGES');
const mergePackages = ActionCreator('MERGE_PACKAGES');
const viewPackageStart = ActionCreator('VIEW_PACKAGE_START');
const setActive = ActionCreator('SET_ACTIVE');
const installPackage = ActionCreator('INSTALL_PACKAGE');
const installMultiplePackages = ActionCreator('INSTALL_MULTIPLE_PACKAGES');
const updatePackages = ActionCreator('UPDATE_PACKAGES');
const removePackages = ActionCreator('REMOVE_PACKAGES');
const prepareInstall = ActionCreator('PREPARE_INSTALL');
const addInstallationOption = ActionCreator('ADD_INSTALLATION_OPTION');
const addOutdatedPackage = ActionCreator('ADD_UPDATED_PACKAGE');

const transformDependency = ActionCreator('TRANSFORM_DEPENDENCY');
const transformationCompleted = ActionCreator('TRANSFORMATION_COMPLETED');
const transformOutdatedPackages = ActionCreator('TRANSFORM_OUTDATED');
const transformUpdatedPackages = ActionCreator('TRANSFORM_UPDATED');

const listOutdatedPackagesListener = ActionCreator(
  'REGISTER_LISTENER_PACKAGES'
);

const searchPackagesListener = ActionCreator('REGISTER_LISTENER_SEARCH');
const viewPackageListener = ActionCreator('REGISTER_LISTENER_PACKAGE');
const installPackageListener = ActionCreator(
  'REGISTER_LISTENER_INSTALL_PACKAGE'
);
const npmActionsListener = ActionCreator('REGISTER_LISTENER_ACTION');

export {
  transformDependency,
  transformationCompleted,
  transformOutdatedPackages,
  transformUpdatedPackages,
  addOutdatedPackage,
  addInstallationOption,
  prepareInstall,
  mapPackages,
  mapOutdatedPackages,
  mergePackages,
  installPackage,
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
  viewPackageStart,
  npmActionsListener,
  installPackageListener,
  listOutdatedPackagesListener,
  searchPackagesListener,
  viewPackageListener
};
