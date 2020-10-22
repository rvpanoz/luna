import { ipcRenderer } from 'electron';
import { ofType } from 'redux-observable';
import { pipe } from 'rxjs';
import { tap, switchMap, ignoreElements } from 'rxjs/operators';

import {
  uninstallPackages,
  uninstallPackagesListener,
} from 'models/packages/actions';

import { onNpmUninstall$ } from '../listeners';

const uninstallPackagesEpic = (action$, state$) =>
  action$.pipe(
    ofType(uninstallPackages.type),
    tap(({ payload }) => {
      const {
        common: { mode, directory },
      } = state$.value;

      ipcRenderer.send(
        'npm-uninstall',
        Object.assign({}, payload, {
          mode,
          directory,
        })
      );
    }),
    ignoreElements()
  );

const uninstallPackagesListenerEpic = pipe(
  ofType(uninstallPackagesListener.type),
  switchMap(() => onNpmUninstall$)
);

export { uninstallPackagesEpic, uninstallPackagesListenerEpic };
