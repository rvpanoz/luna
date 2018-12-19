import { constructAction } from '../../commons/utils';

const ActionCreator = constructAction('@@LUNA_APP');

const setPackagesStart = ActionCreator('SET_PACKAGES_START');
const setPackagesSuccess = ActionCreator('SET_PACKAGES_SUCCESS');
const setPackagesError = ActionCreator('SET_PACKAGES_ERROR');

export { setPackagesStart, setPackagesSuccess, setPackagesError };
