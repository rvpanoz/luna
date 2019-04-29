import { ipcRenderer } from 'electron';
import { ofType } from 'redux-observable';

import {
  mergeMap,
  concatMap,
  ignoreElements,
  catchError,
  tap
} from 'rxjs/operators';

import { clearSelected, toggleLoader } from 'models/ui/actions';
import { clearInstallOptions } from 'models/common/actions';
import { clearNotifications } from 'models/notifications/actions';
import { clearCommands } from 'models/npm/actions';

import { onOffOperator } from '../operators';
import { clearPackages, setPackagesStart } from '../actions';

import MESSAGES from '../messages';

const ON = 'ON';
const OFF = 'OFF';

const updateLoader = payload => ({
  type: toggleLoader.type,
  payload
});

const initEpic = (action$, state$) =>
  action$.pipe(
    ofType(setPackagesStart.type),
    mergeMap(({ payload: { channel, options } }) => {
      const {
        ui: { paused },
        common: { mode, directory }
      } = state$.value;

      return [
        paused ? OFF : ON,
        {
          payload: {
            channel,
            options: Object.assign({}, options, {
              mode,
              directory
            })
          }
        }
      ];
    }),
    onOffOperator(ON, OFF),
    tap(({ payload: { channel, options } }) =>
      ipcRenderer.send(channel, options)
    ),
    catchError(error => {
      console.error(error); // TODO: handle
    }),
    ignoreElements()
  );

const clearEpic = action$ =>
  action$.pipe(
    ofType(setPackagesStart.type),
    onOffOperator(ON, OFF),
    mergeMap(() => [
      updateLoader({
        loading: true,
        message: MESSAGES.loading
      }),
      clearSelected(),
      clearCommands(),
      clearNotifications(),
      clearInstallOptions(),
      clearPackages()
    ])
  );

export { initEpic, clearEpic };
