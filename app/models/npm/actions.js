import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA/NPM');

const addActionError = ActionCreator('ACTION_ERROR');
const clearCommands = ActionCreator('CLEAR_COMMANDS');
const commandError = ActionCreator('COMMAND_ERROR');
const commandMessage = ActionCreator('COMMAND_MESSAGE');
const npmCommand = ActionCreator('NPM_COMMAND');
const setEnv = ActionCreator('SET_ENV');
const setRunningCommand = ActionCreator('SET_RUNNING_COMMAND');
const clearRunningCommand = ActionCreator('CLEAR_RUNNING_COMMAND');
const npmToolsListener = ActionCreator('REGISTER_LISTENER_TOOLS');

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
  runAudit,
  runInit,
  npmToolsListener
};
