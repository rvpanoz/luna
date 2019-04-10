/**
 * Root reducer
 * use combineReducers to combine reducers into one root reducer
 * */

import { combineReducers } from 'redux';
import common from './common';
import packages from './packages';
import npm from './npm';
import ui from './ui';
import notifications from './notifications';

const rootReducer = combineReducers({
  common,
  packages,
  ui,
  notifications,
  npm
});

export default rootReducer;
