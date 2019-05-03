import { combineEpics } from 'redux-observable';
import { installPackagesEpic } from './installationEpics';
import { initEpic } from './initEpics';
import { listPackagesListenerEpic, searchPackagesListenerEpic } from './listEpics';
import { viewPackageEpic, viewPackageLoaderEpic, viewPackageListenerEpic } from './viewEpics'
import {
  mapPackagesEpic,
  mapOutdatedPackagesEpic
} from './transformEpics';

export default combineEpics(
  listPackagesListenerEpic,
  searchPackagesListenerEpic,
  viewPackageListenerEpic,
  viewPackageEpic,
  viewPackageLoaderEpic,
  initEpic,
  installPackagesEpic,
  mapPackagesEpic,
  mapOutdatedPackagesEpic
);
