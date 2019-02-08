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
      projectDescription: null,
      projectLicense: null,
      projectAuthor: null,
      packages: [],
      packagesOutdated: []
    }),
  [setPackagesSuccess.type]: (state, { payload }) => {
    const {
      dependencies,
      projectName,
      projectVersion,
      projectDescription,
      projectLicense,
      projectAuthor,
      fromSort,
      fromSearch
    } = payload;

    return merge(state, {
      packages: dependencies,
      fromSearch,
      fromSort,
      lastUpdatedAt:
        fromSort || fromSearch
          ? state.lastUpdatedAt
          : format(new Date(), 'DD/MM/YYYY h:mm:ss'),
      projectName,
      projectVersion,
      projectDescription,
      projectLicense,
      projectAuthor,
      filters: [],
      selected: []
    });
  },
  [setOutdatedSuccess.type]: (state, { payload }) => {
    const { outdated } = payload;

    return merge(state, {
      packagesOutdated: outdated
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
