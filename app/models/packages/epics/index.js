import { combineEpics } from 'redux-observable';

// initialization
import { initEpic } from './initEpics';

// installation related epics
import {
  installPackageListenerEpic,
  installPackageEpic,
  installPackageJsonEpic,
  installMultiplePackagesEpic,
  showInstallLoaderEpic,
} from './installationEpics';

// uninstall related epics
import {
  uninstallPackagesEpic,
  uninstallPackagesListenerEpic
} from './uninstallEpics';

// list, outdated, search related epics
import {
  listOutdatedPackagesListenerEpic,
  searchPackagesListenerEpic
} from './listOutdatedEpics';

// view related epics
import {
  viewPackageEpic,
  viewPackageLoaderEpic,
  viewPackageListenerEpic
} from './viewEpics';

// update related epics
import {
  updatePackagesEpic,
  updatePackagesListenerEpic,
  showUpdateLoaderEpic
} from './updateEpics';

// search related epics
import { searchEpic, updateSearchFlagEpic } from './searchEpics';

// transformation related epics
import { mapSearchPackagesEpic, mapPackagesEpic, mapOutdatedPackagesEpic } from './transformEpics';

export default combineEpics(
  listOutdatedPackagesListenerEpic,
  searchPackagesListenerEpic,
  viewPackageListenerEpic,
  installPackageListenerEpic,
  uninstallPackagesEpic,
  uninstallPackagesListenerEpic,
  viewPackageEpic,
  viewPackageLoaderEpic,
  updatePackagesEpic,
  updatePackagesListenerEpic,
  initEpic,
  installMultiplePackagesEpic,
  installPackageEpic,
  installPackageJsonEpic,
  showInstallLoaderEpic,
  showUpdateLoaderEpic,
  mapSearchPackagesEpic,
  mapPackagesEpic,
  mapOutdatedPackagesEpic,
  searchEpic,
  updateSearchFlagEpic,
);
