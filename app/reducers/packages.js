/**
 Packages reducer:
 Handles state management for packages operations
 * */

import * as R from 'ramda';
import initialState from './initialState';
import { SET_PACKAGES } from '../constants/ActionTypes';

const { ui, metadata, ...packagesStateSlice } = initialState;

const createReducer = (packagesState, handlers) => (
  state = packagesState,
  action
) => R.propOr(R.identity, R.prop('type', action), handlers)(state, action);

const handlers = {
  [SET_PACKAGES]: (state, action) => {
    return R.merge(state, {
      packages: action.packages
    });
  }
};

export default createReducer(packagesStateSlice, handlers);
