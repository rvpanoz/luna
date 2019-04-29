/**
 * Packages reducer: Handles state management for packages operations
 */

import { assoc, identity, merge, prop, propOr, prepend } from 'ramda';
import {
  addOutdatedPackage,
  clearPackages,
  setPackagesStart,
  setPackagesSuccess,
  setOutdatedSuccess,
  removePackages,
  setActive
} from 'models/packages/actions';
import format from 'date-fns/format';
import initialState from './initialState';

const { packages } = initialState;
const newDateFormatted = format(new Date(), 'DD/MM/YYYY h:mm');

const createReducer = (packagesState, handlers) => (
  state = packagesState,
  action
) => propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
  [setPackagesStart.type]: (state, { payload: { fromSearch, fromSort } }) =>
    merge(state, {
      metadata: {
        ...state.metadata,
        fromSearch,
        fromSort
      }
    }),
  [setActive.type]: (state, { payload: { active } }) =>
    assoc('active', active, state),
  [clearPackages.type]: state =>
    merge(state, {
      active: null,
      packagesData: [],
      packagesOutdated: [],
      metadata: {
        ...state.metadata,
        fromSearch: false,
        fromSort: false
      }
    }),
  [setPackagesSuccess.type]: (
    state,
    {
      payload: {
        dependencies,
        projectName,
        projectVersion,
        projectDescription,
        projectLicense,
        projectAuthor,
        fromSort,
        fromSearch
      }
    }
  ) =>
    merge(state, {
      packagesData: dependencies,
      project: {
        ...state.project,
        name: projectName,
        version: projectVersion,
        description: projectDescription,
        license: projectLicense,
        author: projectAuthor
      },
      metadata: {
        ...state.metadata,
        fromSearch,
        fromSort,
        lastUpdatedAt: newDateFormatted
      }
    }),
  [addOutdatedPackage.type]: (state, { payload: { dependency } }) => {
    const {
      packagesOutdated
    } = state

    return merge(state, {
      ...state,
      packagesOutdated: prepend(
        dependency,
        packagesOutdated
      )
    })

  },
  [setOutdatedSuccess.type]: (state, { payload: { outdated } }) =>
    merge(state, {
      ...state,
      packagesOutdated: outdated
    }),
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
