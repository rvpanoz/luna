/* eslint-disable */

import { of, pipe, from, concat } from 'rxjs';
import {
  map,
  mapTo,
  mergeMap,
  takeWhile,
  merge,
  concatMap,
  delay,
  tap
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { ERROR_TYPES } from 'constants/AppConstants';
import {
  addNotification,
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

/**
 *
 * @param {*} prefix
 * npm ERR!, npm WARN, etc ...
 */
const matchMessageType = prefix => types =>
  types.find(type => matchType(prefix, type));

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

const updateLoader = payload => ({
  type: toggleLoader.type,
  payload
});

const setOutdated = outdated => ({
  type: setOutdatedSuccess.type,
  payload: {
    dependencies: outdated
  }
});

const setPackages = payload => ({
  type: setPackagesSuccess.type,
  payload
});

const updateSnackbar = payload => ({
  type: setSnackbar.type,
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
      setOutdated(outdated),
      updateLoader({ loading: false })
    ]
  ),
  delay(1200),
  tap(res => console.log(res))
);

const messagesEpic = (action$, state$) =>
  action$.pipe(
    ofType(commandMessage.type),
    map(({ payload: { message = '' } }) => message.split('\n')),
    mergeMap(messages =>
      from(messages).pipe(
        takeWhile(message => message && message.length),
        concatMap(message => of(parseNpmMessage(message))),
        map(({ messageType, payload }) =>
          switchcase({
            WARN: () => ({
              type: addNotification.type,
              payload: merge(payload, {
                type: 'WARNING'
              })
            }),
            ERR: () => ({
              type: addNotification.type,
              payload: merge(payload, {
                type: 'ERROR'
              })
            })
          })({})(messageType)
        )
      )
    )
  );

export default combineEpics(
  packagesStartEpic,
  packagesSuccessEpic,
  messagesEpic
);
