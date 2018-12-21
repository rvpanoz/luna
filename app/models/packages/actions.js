import { createActionCreator } from '../../commons/utils';

const ActionCreator = createActionCreator('@@LUNA_APP');

const addSelected = ActionCreator('ADD_SELECTED');
const clearSelected = ActionCreator('CLEAR_SELECTED');
const setPackagesStart = ActionCreator('SET_PACKAGES_START');
const setPackagesSuccess = ActionCreator('SET_PACKAGES_SUCCESS');
const setPackagesError = ActionCreator('SET_PACKAGES_ERROR');
const setPackagesOutdatedSuccess = ActionCreator(
  'SET_PACKAGES_OUTDATED_SUCCESS'
);

export {
  addSelected,
  clearSelected,
  setPackagesStart,
  setPackagesSuccess,
  setPackagesError,
  setPackagesOutdatedSuccess
};
