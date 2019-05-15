import { combineEpics } from 'redux-observable';
import { installPackageEpic, updateLoaderEpic } from './installationEpics';
import { initEpic } from './initEpics';
import {
  listOutdatedPackagesListenerEpic,
  searchPackagesListenerEpic
} from './listOutdatedEpics';
import {
  viewPackageEpic,
  viewPackageLoaderEpic,
  viewPackageListenerEpic
} from './viewEpics';
import { mapPackagesEpic, mapOutdatedPackagesEpic } from './transformEpics';

export default combineEpics(
  listOutdatedPackagesListenerEpic,
  searchPackagesListenerEpic,
  viewPackageListenerEpic,
  viewPackageEpic,
  viewPackageLoaderEpic,
  initEpic,
  installPackageEpic,
  updateLoaderEpic,
  mapPackagesEpic,
  mapOutdatedPackagesEpic
);
