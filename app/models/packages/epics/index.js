import { combineEpics } from 'redux-observable';

// initialization
import { initEpic } from './initEpics';

// installation related epics
import {
  installPackageListenerEpic,
  installPackageEpic,
  installMultiplePackagesEpic,
  showLoaderEpic
} from './installationEpics';

// uninstall related epics
import {
  uninstallPackagesListenerEpic,
} from './uninstallEpics'

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

// transformation related epics
import { mapPackagesEpic, mapOutdatedPackagesEpic } from './transformEpics';

export default combineEpics(
  listOutdatedPackagesListenerEpic,
  searchPackagesListenerEpic,
  viewPackageListenerEpic,
  installPackageListenerEpic,
  uninstallPackagesListenerEpic,
  viewPackageEpic,
  viewPackageLoaderEpic,
  initEpic,
  installMultiplePackagesEpic,
  installPackageEpic,
  showLoaderEpic,
  mapPackagesEpic,
  mapOutdatedPackagesEpic
);
