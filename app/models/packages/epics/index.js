import { combineEpics } from 'redux-observable';

// initialization
import { initEpic } from './initEpics';

// installation related epics
import {
  installPackageListenerEpic,
  installPackageEpic,
  showLoaderEpic
} from './installationEpics';

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

// transformation epics
import { mapPackagesEpic, mapOutdatedPackagesEpic } from './transformEpics';

export default combineEpics(
  listOutdatedPackagesListenerEpic,
  searchPackagesListenerEpic,
  viewPackageListenerEpic,
  installPackageListenerEpic,
  viewPackageEpic,
  viewPackageLoaderEpic,
  initEpic,
  installPackageEpic,
  showLoaderEpic,
  mapPackagesEpic,
  mapOutdatedPackagesEpic
);
