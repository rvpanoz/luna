import { ipcRenderer } from 'electron';
import { ofType } from 'redux-observable';
import { pipe } from 'rxjs';
import { map, tap, switchMap, ignoreElements } from 'rxjs/operators';

import { toggleLoader } from 'models/ui/actions';
import {
  updatePackages,
  updatePackagesListener
} from 'models/packages/actions';
import { iMessage } from 'commons/utils';
import { onNpmUpdate$ } from '../listeners';

const updateLoader = payload => ({
  type: toggleLoader.type,
  payload
});

const showUpdateLoaderEpic = action$ =>
  action$.pipe(
    ofType(updatePackages.type),
    map(() =>
      updateLoader({
        loading: true,
        message: iMessage('info', 'updating')
      })
    )
  );

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

const updatePackagesListenerEpic = pipe(
  ofType(updatePackagesListener.type),
  switchMap(() => onNpmUpdate$)
);

export { updatePackagesEpic, updatePackagesListenerEpic, showUpdateLoaderEpic };
