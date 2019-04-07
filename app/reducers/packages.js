/**
 * Packages reducer: Handles state management for packages operations
 */

import { identity, merge, prop, propOr } from 'ramda';
import {
  clearPackages,
  setPackagesStart,
  setPackagesSuccess,
  setOutdatedSuccess,
  removePackages
} from 'models/packages/actions';
import format from 'date-fns/format';

import initialState from './initialState';

const { modules } = initialState;

const createReducer = (packagesState, handlers) => (
  state = packagesState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
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
