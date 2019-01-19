/* eslint-disable */

import { createActionCreator } from 'commons/utils';

const ActionCreator = createActionCreator('@@LUNA_APP/APP');

const commandMessage = ActionCreator('COMMAND_MESSAGE');

export { commandMessage };
