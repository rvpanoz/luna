import { combineEpics } from 'redux-observable';
import { installPackagesEpic } from './installationEpics';
import { initEpic, clearEpic } from './initEpics';

export default combineEpics(initEpic, clearEpic, installPackagesEpic);
