/**
 * Redux reducers
 * use combineReducers to combine reducers
 * */


import { combineReducers } from 'redux';
import global from './globalReducer';
import packages from './packagesReducer';

const rootReducer = combineReducers({ global, packages });

export default rootReducer;
