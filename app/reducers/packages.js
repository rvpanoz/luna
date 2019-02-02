/* eslint-disable */

/**
 * Packages reducer: Handles state management for packages operations
 */

import { identity, merge, assoc, prepend, prop, propOr, remove } from 'ramda';
import initialState from './initialState';
import {
  addActionError,
  addFilter,
  addSelected,
  clearSelected,
  clearFilters,
  clearPackages,
  setActive,
  setPackagesStart,
  setPackagesSuccess,
  setOutdatedSuccess,
  setSortOptions
} from 'models/packages/actions';

import { isPackageOutdated } from 'commons/utils';
import format from 'date-fns/format';

const { packages } = initialState;

const createReducer = (packagesState, handlers) => (
  state = packagesState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
  [addActionError.type]: (state, { payload: { actionName, actionError } }) =>
    merge(state, {
      action: {
        actionName,
        actionError
      }
    }),
  [addFilter.type]: (state, { payload: { filter } }) => {
    const { filters } = state;
    const idx = filters.indexOf(filter);

    return merge(state, {
      page: 0,
      filters: idx !== -1 ? remove(idx, 1, filters) : prepend(filter, filters)
    });
  },
  [addSelected.type]: (state, action) => {
    const { selected } = state;
    const {
      payload: { name, force }
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
  [clearPackages.type]: state =>
    merge(state, {
      projectName: null,
      projectVersion: null,
      packages: [],
      packagesOutdated: []
    }),
  [setPackagesSuccess.type]: (state, { payload }) => {
    console.log(payload);
    const {
      dependencies,
      projectName,
      projectVersion,
      fromSort,
      fromSearch,
      outdated
    } = payload;

    const packages = dependencies
      ? dependencies
          .filter(pkg => pkg)
          .map(pkg => {
            const [isOutdated, outdatedPkg] = isPackageOutdated(
              outdated,
              pkg.name
            );

            return merge(pkg, {
              latest: isOutdated ? outdatedPkg.latest : null,
              isOutdated
            });
          })
      : [];

    return merge(state, {
      packages,
      fromSearch,
      fromSort,
      lastUpdatedAt:
        fromSort || fromSearch
          ? state.lastUpdatedAt
          : format(new Date(), 'DD/MM/YYYY h:mm:ss'),
      projectName,
      projectVersion,
      filters: [],
      selected: []
    });
  },
  [setOutdatedSuccess.type]: (state, { payload }) => {
    const { dependencies } = payload;

    return merge(state, {
      packagesOutdated: dependencies
    });
  },
  [setActive.type]: (state, { payload }) => {
    const { active } = payload;

    return assoc('active', active, state);
  },
  [setPackagesStart.type]: (state, { payload: { fromSearch, fromSort } }) =>
    merge(state, {
      fromSearch,
      fromSort,
      active: null,
      packageName: null,
      packageVersion: null,
      packagesOutdated: [],
      packages: [],
      filters: []
    }),
  [setSortOptions.type]: (state, { payload: { sortBy, sortDir } }) =>
    merge(state, {
      sortBy,
      sortDir
    })
};

export default createReducer(packages, handlers);
