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
const updateNpmAuditData = ActionCreator('UPDATE_NPM_AUDIT_DATA');
const updateNpmDoctorData = ActionCreator('UPDATE_NPM_DOCTOR_DATA');

// reporting data
const updateNpmAuditData = ActionCreator('UPDATE_NPM_AUDIT_DATA');
const updateNpmDoctorData = ActionCreator('UPDATE_NPM_DOCTOR_DATA');
const clearAuditData = ActionCreator('CLEAR_AUDIT_DATA');

// listeners
const npmAuditListener = ActionCreator('REGISTER_LISTENER_AUDIT');
const npmDoctorListener = ActionCreator('REGISTER_LISTENER_DOCTOR');

// operations
const runInstall = ActionCreator('RUN_INSTALL');
const runUpdate = ActionCreator('RUN_UPDATE');
const runUninstall = ActionCreator('RUN_UNINSTALL');

// utilities
const runAudit = ActionCreator('RUN_AUDIT');
const runInit = ActionCreator('RUN_INIT');
const runDoctor = ActionCreator('RUN_DOCTOR');

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
  runDoctor,
  npmDoctorListener,
  npmAuditListener,
  clearAuditData,
  updateNpmDoctorData,
  updateNpmAuditData
};
