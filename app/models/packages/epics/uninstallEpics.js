import { ipcRenderer } from 'electron';
import { ofType } from 'redux-observable';
import { of, pipe } from 'rxjs';
import { tap, switchMap, ignoreElements, catchError } from 'rxjs/operators';

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
  switchMap(() => onNpmUninstall$),
  catchError((error) =>
    of({
      type: '@@LUNA/ERROR/VIEW_PACKAGE',
      error: error.toString(),
    })
  )
);

export { uninstallPackagesEpic, uninstallPackagesListenerEpic };
