import { ipcRenderer } from 'electron';
import { pipe, from } from 'rxjs';
import { map, mergeMap, takeWhile } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { ERROR_TYPES } from 'constants/AppConstants';
import { parseMessage, switchcase, matchType } from 'commons/utils';

import { addNotification, commandMessage, runCacheOperation } from './actions';

/**
 *
 * @param {*} prefix
 * npm ERR!, npm WARN, etc ...
 */
const matchMessageType = prefix => types =>
  types.find(type => matchType(prefix, type));

/**
 *
 * @param {*} message
 */
const parseNpmMessage = message => {
  const prefix = message.slice(0, 8).trim();
  const messageType = matchMessageType(prefix)(ERROR_TYPES);
  const [body, required, requiredBy] = parseMessage(message);

  return {
    messageType,
    payload: {
      body,
      required,
      requiredBy
    }
  };
};

const resumeRequest = () => ({
  type: 'RESUME_REQUEST'
});

const notificationsEpic = pipe(
  ofType(commandMessage.type),
  takeWhile(({ payload: error }) => typeof error === 'object'),
  mergeMap(({ payload: { error } }) => from(error)),
  map(notification => {
    const { messageType = 'ERR', payload } = parseNpmMessage(notification);

    return switchcase({
      ERR: () => ({
        type: addNotification.type,
        payload: {
          ...payload,
          type: 'ERROR'
        }
      })
    })({ type: addNotification.type, payload: { type: 'ERROR' } })(messageType);
  })
);

const npmCacheEpic = pipe(
  ofType(runCacheOperation.type),
  map(({ payload }) => {
    console.log(payload);
    ipcRenderer.send('ipc-event', payload);

    return resumeRequest();
  })
);

export default combineEpics(notificationsEpic, npmCacheEpic);
