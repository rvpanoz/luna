import { pipe } from 'rxjs';
import { map, tap, switchMap, ignoreElements } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';

import { toggleLoader } from 'models/ui/actions';
import { runAudit, npmAuditListener } from 'models/npm/actions';

import { onNpmAudit$ } from '../listeners';

const updateLoader = payload => ({
  type: toggleLoader.type,
  payload
});

const showAuditingLoaderEpic = action$ =>
  action$.pipe(
    ofType(runAudit.type),
    map(() =>
      updateLoader({
        loading: true,
        message: 'Please wait. npm audit is running..'
      })
    )
  );

/**
 * Send ipc event to main process to handle npm-audit
 * supports local mode
 */
const npmRunAuditEpic = (action$, state$) =>
  action$.pipe(
    ofType(runAudit.type),
    tap(({ payload }) => {
      const {
        common: { mode, directory }
      } = state$.value;

      // const { fix } = payload;

      ipcRenderer.send('npm-audit', {
        ...payload,
        mode,
        directory
      });
    }),
    ignoreElements()
  );

// listener epics
const npmRunAuditListenerEpic = pipe(
  ofType(npmAuditListener.type),
  switchMap(() => onNpmAudit$)
);

export { npmRunAuditEpic, npmRunAuditListenerEpic, showAuditingLoaderEpic };
