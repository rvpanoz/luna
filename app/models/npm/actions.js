import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA/NPM');

const addActionError = ActionCreator('ACTION_ERROR');
const clearCommands = ActionCreator('CLEAR_COMMANDS');
const commandError = ActionCreator('COMMAND_ERROR');
const commandMessage = ActionCreator('COMMAND_MESSAGE');
const clearRunningCommand = ActionCreator('CLEAR_RUNNING_COMMAND');
const setEnv = ActionCreator('SET_ENV');
const setRunningCommand = ActionCreator('SET_RUNNING_COMMAND');
const npmCommand = ActionCreator('NPM_COMMAND');
const npmToolsListener = ActionCreator('REGISTER_LISTENER_TOOLS');

// operations
const runInstall = ActionCreator('RUN_INSTALL');
const runUpdate = ActionCreator('RUN_UPDATE');
const runUninstall = ActionCreator('RUN_UNINSTALL');

// tooling
const runAudit = ActionCreator('RUN_AUDIT');
const runInit = ActionCreator('RUN_INIT');

export {
  addActionError,
  clearCommands,
  commandError,
  commandMessage,
  setEnv,
  npmCommand,
  clearRunningCommand,
  setRunningCommand,
  runInstall,
  runUpdate,
  runUninstall,
  runAudit,
  runInit,
  npmToolsListener
};
