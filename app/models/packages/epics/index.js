import { combineEpics } from 'redux-observable';

import { initEpic } from './initEpics';
import {
  installPackageListenerEpic,
  installPackageJsonEpic,
  installMultiplePackagesEpic,
  showInstallLoaderEpic,
} from './installationEpics';
import {
  uninstallPackagesEpic,
  uninstallPackagesListenerEpic,
} from './uninstallEpics';
import {
  listOutdatedPackagesListenerEpic,
  searchPackagesListenerEpic,
} from './listOutdatedEpics';
import {
  viewPackageEpic,
  viewPackageLoaderEpic,
  viewPackageListenerEpic,
} from './viewEpics';
import {
  updatePackagesEpic,
  updatePackagesListenerEpic,
  showUpdateLoaderEpic,
} from './updateEpics';
import { searchEpic, updateSearchFlagEpic } from './searchEpics';
import {
  mapSearchPackagesEpic,
  mapPackagesEpic,
  mapOutdatedPackagesEpic,
} from './transformEpics';

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
  installPackageJsonEpic,
  showInstallLoaderEpic,
  showUpdateLoaderEpic,
  mapSearchPackagesEpic,
  mapPackagesEpic,
  mapOutdatedPackagesEpic,
  searchEpic,
  updateSearchFlagEpic
);
