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

const { packages } = initialState;

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
      packagesData: [],
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
      ...state,
      packagesData: dependencies,
      project: {
        ...state.project,
        name: projectName,
        version: projectVersion,
        description: projectDescription,
        license: projectLicense,
        author: projectAuthor
      }
    });
  },
  [setOutdatedSuccess.type]: (state, { payload }) => {
    const { outdated } = payload;

    return merge(state, {
      ...state,
      packagesOutdated: outdated
    });
  },
  [removePackages.type]: (state, { payload: { removedPackages } }) => {
    const { packagesData, packagesOutdated } = state;

    // update packages
    const newPackages = packagesData.filter(
      pkg => removedPackages.indexOf(pkg.name) === -1
    );

    // update outdated packages
    const newPackagesOutdated = packagesOutdated.filter(
      pkg => removedPackages.indexOf(pkg.name) === -1
    );

    return merge(state, {
      ...state,
      packagesData: newPackages,
      packagesOutdated: newPackagesOutdated
    });
  }
};

export default createReducer(packages, handlers);
