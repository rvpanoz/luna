import { ipcRenderer } from 'electron';
import { ofType } from 'redux-observable';
import { pipe } from 'rxjs';
import { tap, switchMap, ignoreElements } from 'rxjs/operators';

import {
  updatePackages
  updatePackagesListener
} from 'models/packages/actions';

import { onNpmUpdate$ } from '../listeners';

/**
 * Update packages
 * supports global and local mode
 */
const updatePackagesEpic = (action$, state$) =>
  action$.pipe(
    ofType(updatePackages.type),
    tap(({ payload }) => {
      const {
        common: { mode, directory }
      } = state$.value;

      ipcRenderer.send(
        'npm-update',
        Object.assign({}, payload, {
          mode,
          directory
        })
      );
    }),
    ignoreElements()
  );

// listener epics
const updatePackagesListenerEpic = pipe(
  ofType(updatePackagesListener.type),
  switchMap(() => onNpmUpdate$)
);

export { updatePackagesEpic, updatePackagesListenerEpic };
