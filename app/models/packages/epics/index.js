import { combineEpics } from 'redux-observable';
import { installPackagesEpic } from './installationEpics';
import { initEpic } from './initEpics';
import { listPackagesListenerEpic } from './listEpics';
import { viewPackageListenerEpic } from './viewEpics'
import {
  mapPackagesEpic,
  mapOutdatedPackagesEpic
} from './transformEpics';

export default combineEpics(
  listPackagesListenerEpic,
  viewPackageListenerEpic,
  initEpic,
  installPackagesEpic,
  mapPackagesEpic,
  mapOutdatedPackagesEpic
);
