/**
 * Redux reducers
 * use combineReducers to combine reducers
 * */

import { combineReducers } from 'redux';
import common from './common';
import packages from './packages';

const rootReducer = combineReducers({ common, packages });

export default rootReducer;
