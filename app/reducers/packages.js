/* eslint-disable */

/**
 Packages reducer:
 Handles state management for packages operations
 * */

import { identity, merge, assoc, prepend, prop, propOr, remove } from 'ramda';
import initialState from './initialState';
import {
  addFilter,
  addSelected,
  clearSelected,
  clearFilters,
  updatePackage,
  setPackagesStart,
  setPackagesSuccess,
  setPackagesOutdatedSuccess,
  setPackagesError
} from '../models/packages/actions';
import { isPackageOutdated } from '../commons/utils';

const { packages } = initialState;

const createReducer = (packagesState, handlers) => (
  state = packagesState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
  [addFilter.type]: (state, { payload }) => {
    const { filterName } = payload;
    const { filters } = state;
    const idx = filters.indexOf(filterName);

    return merge(state, {
      page: 0,
      filters:
        idx !== -1 ? remove(idx, 1, filters) : prepend(filterName, filters)
    });
  },
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
  [clearFilters.type]: state => assoc('filters', [], state),
  [clearSelected.type]: state => assoc('selected', [], state),
  [setPackagesSuccess.type]: (state, { payload }) => {
    const { packagesOutdated } = state;
    let newPayload = payload.map(pkg => {
      const [isOutdated, outdatedPkg] = isPackageOutdated(
        packagesOutdated,
        pkg.name
      );

      return merge(pkg, {
        latest: isOutdated ? outdatedPkg.latest : pkg.version,
        isOutdated
      });
    });

    return merge(state, {
      packages: newPayload,
      loading: false
    });
  },
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
    }),
  [updatePackage.type]: (state, { name, props }) => {
    const { packages } = state;
    const pkg = packages.find(pkg => pkg.name === name);
    const newPkg = merge(pkg, props);

    return merge(state, {
      packages: packages.map(pkg => (pkg.name === name ? newPkg : pkg))
    });
  }
};

export default createReducer(packages, handlers);
