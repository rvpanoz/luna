/**
 Packages reducer:
 Handles state management for packages operations
 * */

import { identity, merge, assoc, prepend, prop, propOr, remove } from 'ramda';
import initialState from './initialState';
import { SET_PACKAGES, SET_SELECTED_PACKAGE } from '../constants/ActionTypes';

const { packages } = initialState;

const createReducer = (packagesState, handlers) => (
  state = packagesState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
  [SET_PACKAGES]: (state, action) =>
    merge(state, {
      packages: action.packages
    }),
  [SET_SELECTED_PACKAGE]: (state, action) => {
    const { selected } = state;
    const { name, force } = action;
    const idx = selected.indexOf(action.name);
    let newSelected = [];

    if (idx !== -1 && Boolean(force) === true) {
      newSelected = selected;
    } else if (idx !== -1 && !force) {
      newSelected = remove(idx, 1, selected);
    } else {
      newSelected = prepend(name, selected);
    }

    return assoc('selected', newSelected, state);
  }
};

export default createReducer(packages, handlers);
