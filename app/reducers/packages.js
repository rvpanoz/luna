/**
 * Packages reducer: Handles state management for packages operations
 */

import { identity, merge, assoc, prepend, prop, propOr, remove } from 'ramda';
import {
  addActionError,
  addFilter,
  addSelected,
  addInstallOption,
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

import initialState from './initialState';

const { packages } = initialState;

const createReducer = (packagesState, handlers) => (
  state = packagesState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
  [addActionError.type]: (state, { payload: { actionName, actionError } }) =>
    merge(state.operations, {
      action: {
        actionName,
        actionError
      }
    }),
  [addFilter.type]: (state, { payload: { filter } }) => {
    const {
      filtering: { filters }
    } = state;
    const idx = filters.indexOf(filter);

    return merge(state, {
      page: 0,
      filters: idx !== -1 ? remove(idx, 1, filters) : prepend(filter, filters)
    });
  },
  [addInstallOption.type]: (state, action) => {
    const { packagesInstallOptions, selected } = state.operations;
    const {
      payload: { name, options }
    } = action;

    let newOptions = [];

    const idx = selected.indexOf(name);
    const packageInstallOptions = packagesInstallOptions.find(
      installOptions => installOptions.name === name
    );

    if (idx === -1) {
      return state;
    }

    if (!packageInstallOptions) {
      newOptions = prepend(
        {
          name,
          options
        },
        packagesInstallOptions
      );
    } else {
      newOptions = packagesInstallOptions.map(option => {
        const packageName = option.name;
        const packageOptions = options;

        if (packageName === name) {
          return {
            ...option,
            options: packageOptions
          };
        }

        return option;
      });
    }

    return assoc('packagesInstallOptions', newOptions, state);
  },
  [addSelected.type]: (state, action) => {
    const {
      operations: { selected }
    } = state;
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
      project: {
        name: null,
        version: null,
        description: null,
        license: null,
        author: null
      },
      data: {
        packages: [],
        packagesOutdated: []
      }
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
      data: {
        packages: dependencies
      },
      operations: {
        selected: [],
        packageInstallOptions: []
      },
      project: {
        name: projectName,
        version: projectVersion,
        description: projectDescription,
        license: projectLicense,
        author: projectAuthor
      },
      filtering: {
        filters: []
      },
      metadata: {
        lastUpdatedAt:
          fromSort || fromSearch
            ? state.lastUpdatedAt
            : format(new Date(), 'DD/MM/YYYY h:mm:ss'),
        fromSearch,
        fromSort
      }
    });
  },
  [setOutdatedSuccess.type]: (state, { payload }) => {
    const { outdated } = payload;

    return merge(state, {
      data: {
        packagesOutdated: outdated
      }
    });
  },
  [setActive.type]: (state, { payload }) => {
    const { active } = payload;

    return assoc('active', active, state);
  },
  [setPackagesStart.type]: (state, { payload: { fromSearch, fromSort } }) =>
    merge(state, {
      active: null,
      filtering: {
        filters: []
      },
      operations: {
        selected: [],
        packageInstallOptions: []
      },
      metadata: {
        fromSearch,
        fromSort
      },
      project: {
        name: null,
        version: null,
        description: null,
        license: null,
        author: null
      },
      data: {
        packagesOutdated: [],
        packages: []
      }
    }),
  [setSortOptions.type]: (state, { payload: { sortBy, sortDir } }) =>
    merge(state, {
      sorting: {
        sortBy,
        sortDir
      }
    })
};

export default createReducer(packages, handlers);
