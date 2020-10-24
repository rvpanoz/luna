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

// npm utils
const parseNpmCacheData = ActionCreator('PARSE_NPM_CACHE_DATA');
const updateNpmCacheData = ActionCreator('UPDATE_NPM_CACHE_DATA');

// listeners
const npmInitListener = ActionCreator('REGISTER_LISTENER_INIT');
const npmDedupeListener = ActionCreator('REGISTER_LISTENER_DEDUPE');
const npmCacheListener = ActionCreator('REGISTER_LISTENER_CACHE');

// operations
const runInstall = ActionCreator('RUN_INSTALL');
const runUpdate = ActionCreator('RUN_UPDATE');
const runUninstall = ActionCreator('RUN_UNINSTALL');

// utilities
const runInit = ActionCreator('RUN_INIT');
const runLock = ActionCreator('RUN_INIT_LOCK');
const runDedupe = ActionCreator('RUN_DEDUPE');
const runCache = ActionCreator('RUN_CACHE');

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
  runDedupe,
  runInit,
  runLock,
  runCache,
  npmInitListener,
  npmDedupeListener,
  npmCacheListener,
  parseNpmCacheData,
  updateNpmCacheData,
};
