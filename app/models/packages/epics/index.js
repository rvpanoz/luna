import { combineEpics } from 'redux-observable';
import { installPackagesEpic } from './installationEpics';
import { initEpic } from './initEpics';
import { getPackagesListenerEpic, viewPackageListenerEpic } from './listEpics';
import {
  mapPackagesEpic,
  mapOutdatedPackagesEpic
} from './transformEpics';

export default combineEpics(
  getPackagesListenerEpic,
  viewPackageListenerEpic,
  initEpic,
  installPackagesEpic,
  mapPackagesEpic,
  mapOutdatedPackagesEpic
);
