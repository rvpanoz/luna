/* eslint-disable */

/**
 Packages reducer:
 Handles state management for packages operations
 * */

import { identity, merge, assoc, prepend, prop, propOr, remove } from 'ramda';
import initialState from './initialState';
import {
  addSelected,
  clearSelected,
  setPackagesStart,
  setPackagesSuccess,
  setPackagesOutdatedSuccess,
  setPackagesError
} from '../models/packages/actions';

const { packages } = initialState;

const createReducer = (packagesState, handlers) => (
  state = packagesState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
  [addSelected.type]: (state, action) => {
    const { selected } = state;
    const {
      payload: { name },
      payload: { force }
    } = action;

    const idx = selected.indexOf(name);
    let newSelected = [];

    if (idx !== -1 && Boolean(force) === true) {
      newSelected = selected;
    } else if (idx !== -1 && !force) {
      newSelected = remove(idx, 1, selected);
    } else {
      newSelected = prepend(name, selected);
    }

    return assoc('selected', newSelected, state);
  },
  [clearSelected.type]: state => assoc('selected', [], state),
  [setPackagesSuccess.type]: (state, { payload }) =>
    merge(state, {
      packages: payload,
      loading: false
    }),
  [setPackagesOutdatedSuccess.type]: (state, { payload }) =>
    merge(state, {
      packagesOutdated: payload,
      loading: false
    }),
  [setPackagesError.type]: (state, action) =>
    merge(state, {
      error: action.payload,
      packages: [],
      loading: false
    }),
  [setPackagesStart.type]: state =>
    merge(state, {
      loading: true
    })
};

export default createReducer(packages, handlers);
