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
  setPackagesStart,
  setPackagesSuccess,
  setPackagesOutdatedSuccess
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
  [clearPackages.type]: state =>
    merge(state, {
      packages: [],
      packagesOutdated: []
    }),
  [setPackagesSuccess.type]: (state, { payload }) => {
    const { data, name, version, fromSort, fromSearch, outdated } = payload;

    const packages = data
      ? data.map(pkg => {
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
      lastUpdatedAt: fromSort
        ? state.lastUpdatedAt
        : format(new Date(), 'DD/MM/YYYY h:mm:ss'),
      projectName: name,
      projectVersion: version,
      filters: [],
      selected: []
    });
  },
  [setPackagesOutdatedSuccess.type]: (state, { payload }) => {
    const { data } = payload;

    return merge(state, {
      packagesOutdated: data
    });
  },
  [setPackagesStart.type]: (state, { packageName, packageVersion }) =>
    merge(state, {
      packageName,
      packageVersion,
      packagesOutdated: [],
      packages: []
    })
};

export default createReducer(packages, handlers);
