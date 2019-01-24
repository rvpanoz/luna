/* eslint-disable */

import { of, pipe, from, concat } from 'rxjs';
import {
  map,
  mergeMap,
  takeWhile,
  merge,
  concatMap,
  filter,
  takeUntil,
  tap,
  ignoreElements,
  concatAll,
  mergeAll
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { ERROR_TYPES } from 'constants/AppConstants';
import {
  addNotification,
  commandMessage,
  toggleLoader
} from 'models/ui/actions';
import { parseMessage, switchcase, matchType } from 'commons/utils';
import {
  setPackagesStart,
  setPackagesSuccess,
  setOutdatedSuccess
} from './actions';

const ACTIONS_PREFIX = '@@LUNA_APP/DATA';

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

const setOutdated = dependencies => ({
  type: setOutdatedSuccess.type,
  payload: {
    dependencies
  }
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
  ofType(setPackagesSuccess.type),
  mergeMap(({ payload: { dependencies, outdated } }) =>
    concat(of(setOutdated(outdated)), of(updateLoader({ loading: false })))
  )
);

const messagesEpic = (action$, state$) =>
  action$.pipe(
    ofType(commandMessage.type),
    takeUntil(
      state$.pipe(
        filter(({ common: { enableNotifications } }) => enableNotifications)
      )
    ),
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
