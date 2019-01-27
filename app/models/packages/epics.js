/* eslint-disable */

import { of, pipe, from, concat } from 'rxjs';
import {
  map,
  mergeMap,
  filter,
  concatMap,
  delay,
  tap,
  zip
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { ERROR_TYPES } from 'constants/AppConstants';
import {
  addNotification,
  showWarning,
  showError,
  commandMessage,
  setSnackbar,
  toggleLoader
} from 'models/ui/actions';
import { parseMessage, switchcase, matchType } from 'commons/utils';
import {
  setPackagesStart,
  setPackagesSuccess,
  setOutdatedSuccess,
  updateData
} from './actions';

const updateLoader = payload => ({
  type: toggleLoader.type,
  payload
});

const setOutdated = payload => ({
  type: setOutdatedSuccess.type,
  payload
});

const setPackages = payload => ({
  type: setPackagesSuccess.type,
  payload
});

const updateSnackbar = payload => ({
  type: setSnackbar.type,
  payload
});

const triggerError = payload => ({
  type: showError.type,
  payload
});

const triggerWarning = payload => ({
  type: showWarning.type,
  payload
});

const packagesStartEpic = pipe(
  ofType(setPackagesStart.type),
  map(() =>
    updateLoader({
      loading: true,
      message: 'Loading packages..'
    })
  )
);

const packagesSuccessEpic = pipe(
  ofType(updateData.type),
  concatMap(
    ({ payload: { dependencies, outdated, projectName, projectVersion } }) => [
      setPackages({ dependencies, projectName, projectVersion }),
      setOutdated({ outdated }),
      updateLoader({ loading: false })
    ]
  ),
  delay(1200)
);

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

const messagesEpic = pipe(
  ofType(commandMessage.type),
  mergeMap(({ payload: { message = '' } }) => message.split(/\r?\n/)),
  filter(message => Boolean(message)),
  map(message => {
    const { messageType, payload } = parseNpmMessage(message);

    return switchcase({
      WARN: () => triggerWarning(payload),
      ERR: () => triggerError(payload)
    })({})(messageType);
  }),
  delay(1200)
  // concatMap(({ payload: { body, required } }) =>
  //   of(
  //     updateSnackbar({
  //       type: 'error',
  //       open: true,
  //       message: `${body} ${required}`
  //     })
  //   ).pipe(delay(1200))
  // )
);

export default combineEpics(
  packagesStartEpic,
  packagesSuccessEpic,
  messagesEpic
);
