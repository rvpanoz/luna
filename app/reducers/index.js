/**
 * Root reducer
 * use combineReducers to combine reducers into one root reducer
 * */

import { combineReducers } from 'redux';
import common from './common';
import packages from './packages';
import ui from './ui';
import notifications from './notifications';

const rootReducer = combineReducers({ common, packages, ui, notifications });

export default rootReducer;
