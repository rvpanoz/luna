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
  clearRunningCommand
} from 'models/npm/actions';

import initialState from './initialState';

const { npm } = initialState;

const createReducer = (npmState, handlers) => (state = npmState, action) =>
  propOr(identity, prop('type', action), handlers)(state, action);

const handlers = {
  [addActionError.type]: (state, { payload: { error } }) => {
    const {
      operations: { commandsErrors }
    } = state;

    const newErrors = prepend(error, commandsErrors);

    return merge(state, {
      ...state,
      operations: {
        ...state.operations,
        commandsErrors: newErrors
      }
    });
  },
  [clearRunningCommand.type]: state =>
    merge(state, {
      npm: {
        ...state.npm,
        operationStatus: 'idle',
        operationPackages: [],
        operationCommand: null
      }
    }),
  [setRunningCommand.type]: (
    state,
    { payload: { operationStatus, operationPackages, operationCommand } }
  ) =>
    merge(state, {
      npm: {
        ...state.npm,
        operationStatus,
        operationPackages,
        operationCommand
      }
    }),
  [setEnv.type]: (state, { payload: env }) =>
    merge(state, {
      npm: {
        ...state.npm,
        env
      }
    }),
  [npmCommand.type]: (state, { payload: command }) =>
    merge(state, {
      npm: {
        ...state.npm,
        commands: prepend(command, state.npm.commands)
      }
    }),
  [commandError.type]: (state, { payload: error }) =>
    assoc('command_error', error, state),
  [commandMessage.type]: (state, { payload: message }) =>
    assoc('command_message', message, state),
  [clearCommands.type]: state =>
    merge(state, {
      npm: {
        ...state.npm,
        paused: false,
        commands: []
      }
    })
};

export default createReducer(npm, handlers);
