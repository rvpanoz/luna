import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA/NPM');

// general actions
const addActionError = ActionCreator('ACTION_ERROR');
const clearCommands = ActionCreator('CLEAR_COMMANDS');
const commandError = ActionCreator('COMMAND_ERROR');
const commandMessage = ActionCreator('COMMAND_MESSAGE');
const clearRunningCommand = ActionCreator('CLEAR_RUNNING_COMMAND');
const setEnv = ActionCreator('SET_ENV');
const setRunningCommand = ActionCreator('SET_RUNNING_COMMAND');
const npmCommand = ActionCreator('NPM_COMMAND');

// listeners
const npmAuditListener = ActionCreator('REGISTER_LISTENER_AUDIT');

// operations
const runInstall = ActionCreator('RUN_INSTALL');
const runUpdate = ActionCreator('RUN_UPDATE');
const runUninstall = ActionCreator('RUN_UNINSTALL');

// utilities
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
  npmAuditListener
};
