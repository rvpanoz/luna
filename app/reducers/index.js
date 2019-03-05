/**
 * Redux reducers
 * use combineReducers to combine reducers into one root reducer
 * */

import { combineReducers } from 'redux';
import common from './common';
import packages from './packages';

const rootReducer = combineReducers({ common, modules: packages });

export default rootReducer;
