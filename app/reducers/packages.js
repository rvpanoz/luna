/**
 * Packages reducer: Handles state management for packages operations
 */

import { identity, merge, prepend, prop, propOr, remove } from 'ramda';
import {
  addActionError,
  addFilter,
  addSelected,
  addInstallOption,
  addNotificationInstallOption,
  clearSelected,
  clearFilters,
  clearPackages,
  setActive,
  setPackagesStart,
  setPackagesSuccess,
  setOutdatedSuccess,
  setSortOptions,
  setPage,
  setPageRows
} from 'models/packages/actions';
import format from 'date-fns/format';

import initialState from './initialState';

const { modules } = initialState;

const createReducer = (packagesState, handlers) => (
  state = packagesState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
  [addActionError.type]: (state, { payload: { actionName, actionError } }) =>
    merge(state, {
      ...state,
      operations: {
        ...state.operations,
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
      ...state,
      filtering: {
        ...state.filtering,
        page: 0,
        filters: idx !== -1 ? remove(idx, 1, filters) : prepend(filter, filters)
      }
    });
  },
  [addInstallOption.type]: (state, action) => {
    const {
      operations: { packagesInstallOptions, selected }
    } = state;
    const {
      payload: { name, options }
    } = action;

    let newOptions = [];

    const idx = selected.indexOf(name);
    const packageInstallOptions =
      packagesInstallOptions &&
      packagesInstallOptions.find(
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

        if (packageName === name) {
          return {
            ...option,
            options
          };
        }

        return option;
      });
    }

    return merge(state, {
      ...state,
      operations: {
        ...state.operations,
        packagesInstallOptions: newOptions
      }
    });
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

    return merge(state, {
      ...state,
      operations: {
        ...state.operations,
        selected: newSelected
      }
    });
  },
  [clearFilters.type]: state =>
    merge(state, {
      ...state.filtering,
      filters: []
    }),
  [clearSelected.type]: state =>
    merge(state, {
      ...state,
      operations: {
        packagesInstallOptions: [],
        selected: []
      }
    }),
  [clearPackages.type]: state =>
    merge(state, {
      ...state,
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
      ...state,
      data: {
        ...state.data,
        packages: dependencies
      },
      operations: {
        selected: [],
        packagesInstallOptions: []
      },
      project: {
        ...state.project,
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
        ...state.metadata,
        lastUpdatedAt:
          fromSort || fromSearch
            ? state.lastUpdatedAt
            : format(new Date(), 'DD/MM/YYYY h:mm:ss'),
        fromSearch,
        fromSort
      },
      pagination: {
        ...state.pagination,
        page: 0
      }
    });
  },
  [setOutdatedSuccess.type]: (state, { payload }) => {
    const { outdated } = payload;

    return merge(state, {
      ...state,
      data: {
        ...state.data,
        packagesOutdated: outdated
      }
    });
  },
  [setActive.type]: (state, { payload }) => {
    const { active } = payload;

    return merge(state, {
      ...state,
      active
    });
  },
  [setPackagesStart.type]: (state, { payload: { fromSearch, fromSort } }) =>
    merge(state, {
      ...state,
      active: null,
      filtering: {
        filters: []
      },
      operations: {
        selected: [],
        packagesInstallOptions: []
      },
      metadata: {
        fromSearch,
        fromSort
      }
    }),
  [setSortOptions.type]: (state, { payload: { sortBy, sortDir } }) =>
    merge(state, {
      ...state,
      sorting: {
        sortBy,
        sortDir
      }
    }),
  [setPage.type]: (state, { payload: { page } }) =>
    merge(state, {
      pagination: {
        ...state.pagination,
        page
      }
    }),
  [setPageRows.type]: (state, { payload: { rowsPerPage } }) =>
    merge(state, {
      pagination: {
        ...state.pagination,
        rowsPerPage
      }
    })
};

export default createReducer(modules, handlers);
