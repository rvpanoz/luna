/**
 * Packages reducer: Handles state management for packages operations
 */

import { identity, merge, prepend, prop, propOr, remove } from 'ramda';
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
  setSortOptions,
  setPage,
  setPageRows,
  updateFilters,
  removePackages,
  clearInstallOptions
} from 'models/packages/actions';
import format from 'date-fns/format';

import initialState from './initialState';

const { modules } = initialState;

const createReducer = (packagesState, handlers) => (
  state = packagesState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
  [addActionError.type]: (state, { payload: { error } }) => {
    const {
      operations: { commandsErrors }
    } = state;

    const newErrors = prepend(error, commandsErrors);

    return merge(state, {
      ...state,
      operations: {
        ...state.operations,
        commandsErrors: newErrors
      }
    });
  },
  [updateFilters.type]: (state, { payload: { allFilters } }) =>
    merge(state, {
      ...state,
      filtering: {
        ...state.filtering,
        filters: allFilters
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

    const idx = selected.length ? selected.indexOf(name) : 0;

    if (idx === -1) {
      return state;
    }

    const packageOptions = packagesInstallOptions.find(
      option => option.name === name
    );

    if (!packageOptions) {
      return merge(state, {
        ...state,
        operations: {
          ...state.operations,
          packagesInstallOptions: prepend(
            {
              name,
              options
            },
            packagesInstallOptions
          )
        }
      });
    }

    const hasExactOptionIndex = options.indexOf('save-exact');
    const hasExactPackageIndex = packageOptions.options.indexOf('save-exact');

    if (hasExactOptionIndex > -1 && hasExactPackageIndex > -1) {
      return merge(state, {
        ...state,
        operations: {
          ...state.operations,
          packagesInstallOptions: packagesInstallOptions.map(o => {
            const optionName = o.name;

            if (optionName === name) {
              return {
                name: o.name,
                options: remove(hasExactPackageIndex, 1, packageOptions.options)
              };
            }

            return o;
          })
        }
      });
    }

    if (hasExactOptionIndex > -1 && hasExactPackageIndex === -1) {
      return merge(state, {
        ...state,
        operations: {
          ...state.operations,
          packagesInstallOptions: packagesInstallOptions.map(o => {
            const optionName = o.name;

            if (optionName === name) {
              return {
                name: o.name,
                options: o.options.concat(options)
              };
            }

            return o;
          })
        }
      });
    }

    return merge(state, {
      ...state,
      operations: {
        ...state.operations,
        packagesInstallOptions: packagesInstallOptions.map(o => {
          const optionName = o.name;

          if (optionName === name) {
            return {
              name: o.name,
              options:
                hasExactPackageIndex > -1
                  ? options.concat(['save-exact'])
                  : options
            };
          }

          return o;
        })
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
      ...state,
      filtering: {
        filters: [],
        page: 0
      }
    }),
  [clearInstallOptions.type]: state =>
    merge(state, {
      ...state,
      operations: {
        ...state.operations,
        packagesInstallOptions: []
      }
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
        version: null
      },
      data: {
        packages: [],
        packagesOutdated: []
      },
      operations: {
        selected: [],
        packagesInstallOptions: []
      },
      filtering: {
        filters: []
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
    }),
  [removePackages.type]: (state, { payload: { removedPackages } }) => {
    const {
      data: { packages, packagesOutdated }
    } = state;

    // update packages
    const newPackages = packages.filter(
      pkg => removedPackages.indexOf(pkg.name) === -1
    );

    // update outdated packages
    const newPackagesOutdated = packagesOutdated.filter(
      pkg => removedPackages.indexOf(pkg.name) === -1
    );

    return merge(state, {
      ...state,
      data: {
        ...state.data,
        packages: newPackages,
        packagesOutdated: newPackagesOutdated
      },
      operations: {
        ...state.operations,
        selected: [],
        packagesInstallOptions: []
      }
    });
  }
};

export default createReducer(modules, handlers);
