/* eslint-disable */

import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA_APP/APP');

const commandError = ActionCreator('COMMAND_ERROR');

export { commandError };
