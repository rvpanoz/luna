import { ipcRenderer } from 'electron';
import { ofType } from 'redux-observable';
import { pipe } from 'rxjs';
import { tap, switchMap, ignoreElements } from 'rxjs/operators';

import {
  uninstallPackages,
  uninstallPackagesListener
} from 'models/packages/actions';

import { onNpmUninstall$ } from '../listeners';

/**
 * Uninstall packages
 * supports global and local mode
 */
const uninstallPackagesEpic = (action$, state$) =>
  action$.pipe(
    ofType(uninstallPackages.type),
    tap(({ payload }) => {
      const {
        common: { mode, directory }
      } = state$.value;

      ipcRenderer.send(
        'npm-uninstall',
        Object.assign({}, payload, {
          mode,
          directory
        })
      );
    }),
    ignoreElements()
  );

// listener epics
const uninstallPackagesListenerEpic = pipe(
  ofType(uninstallPackagesListener.type),
  switchMap(() => onNpmUninstall$)
);

export { uninstallPackagesEpic, uninstallPackagesListenerEpic };
