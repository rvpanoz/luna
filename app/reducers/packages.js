/**
 Packages reducer:
 Handles state management for packages operations
 * */

import * as R from 'ramda';
import initialState from './initialState';
import { SET_PACKAGES } from '../constants/ActionTypes';

const { common, metadata, ...packagesSlice } = initialState;

const createReducer = (packagesState, handlers) => (
  state = packagesState,
  action
) => R.propOr(R.identity, R.prop('type', action), handlers)(state, action);

const handlers = {
  [SET_PACKAGES]: (state, action) =>
    R.merge(state, {
      packages: action.packages
    })
};

export default createReducer(packagesSlice, handlers);
