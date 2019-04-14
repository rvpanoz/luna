import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA/COMMON');

const initActions = ActionCreator('INIT_ACTIONS');
const addInstallOption = ActionCreator('ADD_INSTALL_OPTION');
const clearInstallOptions = ActionCreator('CLEAR_INSTALL_OPTIONS');
const setManager = ActionCreator('SET_MANAGER');
const setMode = ActionCreator('SET_MODE');
const updateStatus = ActionCreator('UPDATE_STATUS');

export {
  initActions,
  addInstallOption,
  clearInstallOptions,
  setManager,
  setMode,
  updateStatus
};
