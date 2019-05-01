import { combineEpics } from 'redux-observable';
import { installPackagesEpic } from './installationEpics';
import { initEpic, clearEpic } from './initEpics';
import { getPackagesListenerEpic } from './listEpics';
import {
  mapPackagesEpic,
  mapOutdatedPackagesEpic
} from './transformEpics';

export default combineEpics(
  clearEpic,
  getPackagesListenerEpic,
  initEpic,
  installPackagesEpic,
  mapPackagesEpic,
  mapOutdatedPackagesEpic
);
