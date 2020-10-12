/**
 * Npm reducer: Handles state management for npm operations
 */

import { assoc, prepend, identity, merge, prop, propOr } from 'ramda';
import {
  addActionError,
  clearCommands,
  commandError,
  commandMessage,
  setEnv,
  npmCommand,
  setRunningCommand,
  clearRunningCommand,
  clearAuditData,
  clearDoctorData,
  updateNpmAuditData,
  updateNpmAuditFixData,
  updateNpmDoctorData,
  updateNpmCacheData,
} from 'models/npm/actions';

import initialState from './initialState';

const { npm } = initialState;

const createReducer = (npmState, handlers) => (state = npmState, action) =>
  propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
  [updateNpmCacheData.type]: (state, { payload: { data } }) =>
    merge(state, {
      cache: {
        ...state.cache,
        result: data,
      },
    }),
  [updateNpmAuditData.type]: (state, { payload: { data } }) =>
    merge(state, {
      audit: {
        ...state.audit,
        result: data,
      },
    }),
  [updateNpmAuditFixData.type]: (state, { payload: { data } }) =>
    merge(state, {
      audit: {
        ...state.audit,
        result: data,
        fix: true,
      },
    }),
  [updateNpmDoctorData.type]: (state, { payload: { data } }) =>
    merge(state, {
      doctor: {
        ...state.doctor,
        result: data,
      },
    }),
  [addActionError.type]: (state, { payload: { error } }) => {
    const {
      operations: { commandsErrors },
    } = state;

    const newErrors = prepend(error, commandsErrors);

    return merge(state, {
      ...state,
      operations: {
        ...state.operations,
        commandsErrors: newErrors,
      },
    });
  },
  [clearRunningCommand.type]: (state) =>
    merge(state, {
      operationStatus: 'idle',
      operationPackages: [],
      operationCommand: null,
    }),
  [setRunningCommand.type]: (
    state,
    { payload: { operationStatus, operationPackages, operationCommand } }
  ) =>
    merge(state, {
      operationStatus,
      operationPackages,
      operationCommand,
    }),
  [setEnv.type]: (state, { payload: env }) => assoc('env', env, state),
  [npmCommand.type]: (state, { payload: command }) =>
    merge(state, {
      commands: prepend(command, state.npm.commands),
    }),
  [commandError.type]: (state, { payload: error }) =>
    assoc('command_error', error, state),
  [commandMessage.type]: (state, { payload: message }) =>
    assoc('command_message', message, state),
  [clearCommands.type]: (state) =>
    merge(state, {
      commands: [],
    }),
  [clearAuditData.type]: (state) =>
    merge(state, {
      audit: {
        result: null,
        fix: false,
      },
    }),
  [clearDoctorData.type]: (state) =>
    merge(state, {
      doctor: {
        result: null,
        fix: false,
      },
    }),
};

export default createReducer(npm, handlers);
