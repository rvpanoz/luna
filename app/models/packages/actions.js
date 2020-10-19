import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA/PACKAGES');

const clearAll = ActionCreator('CLEAR_ALL');
const clearPackages = ActionCreator('CLEAR_PACKAGES');
const setPackagesStart = ActionCreator('SET_PACKAGES_START');
const setPackagesSuccess = ActionCreator('SET_PACKAGES_SUCCESS');
const setOutdatedSuccess = ActionCreator('SET_OUTDATED_SUCCESS');
const setPackagesError = ActionCreator('SET_PACKAGES_ERROR');
const viewPackageStart = ActionCreator('VIEW_PACKAGE_START');
const setPackagesSearchStart = ActionCreator('SET_PACKAGES_SEARCH_START');
const setPackagesSearchSuccess = ActionCreator('SET_PACKAGES_SEARCH_SUCCESS');
const updateSearchFlag = ActionCreator('UPDATE_SEARCH');
const mapSearchPackages = ActionCreator('MAP_SEARCH_PACKAGES');
const mapPackages = ActionCreator('MAP_PACKAGES');
const mapOutdatedPackages = ActionCreator('MAP_OUTDATED_PACKAGES');
const mergePackages = ActionCreator('MERGE_PACKAGES');
const setActive = ActionCreator('SET_ACTIVE');
const installPackage = ActionCreator('INSTALL_PACKAGE');
const installPackageJson = ActionCreator('INSTALL_PACKAGE_JSON');
const installMultiplePackages = ActionCreator('INSTALL_MULTIPLE_PACKAGES');
const updatePackages = ActionCreator('UPDATE_PACKAGES');
const uninstallPackages = ActionCreator('UNINSTALL_PACKAGES');
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
const updatePackagesListener = ActionCreator(
  'REGISTER_LISTENER_UPDATE_PACKAGES'
);
const uninstallPackagesListener = ActionCreator(
  'REGISTER_LISTENER_UNINSTALL_PACKAGES'
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
  removePackages,
  mapPackages,
  mapSearchPackages,
  mapOutdatedPackages,
  mergePackages,
  uninstallPackages,
  installPackage,
  installPackageJson,
  installMultiplePackages,
  updatePackages,
  clearAll,
  clearPackages,
  setPackagesSearchStart,
  setPackagesSearchSuccess,
  setActive,
  setPackagesStart,
  setPackagesSuccess,
  setPackagesError,
  setOutdatedSuccess,
  viewPackageStart,
  npmActionsListener,
  uninstallPackagesListener,
  installPackageListener,
  listOutdatedPackagesListener,
  searchPackagesListener,
  viewPackageListener,
  updatePackagesListener,
  updateSearchFlag,
};
