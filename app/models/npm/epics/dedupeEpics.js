import { pipe } from 'rxjs';
import { tap, switchMap, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';
import { toggleLoader } from 'models/ui/actions';
import { runDedupe, npmDedupeListener } from 'models/npm/actions';
import { iMessage } from 'commons/utils';
import { onNpmDedupe$ } from '../listeners';

const updateLoader = (payload) => ({
  type: toggleLoader.type,
  payload,
});

/**
 * Send ipc event to main process to handle npm-dedupe
 */
const npmRunDedupeEpic = (action$, state$) =>
  action$.pipe(
    ofType(runDedupe.type),
    tap(({ payload }) => {
      const {
        common: { mode, directory },
      } = state$.value;

      ipcRenderer.send('npm-dedupe', {
        ...payload,
        mode,
        directory,
      });
    }),
    mergeMap(() => [
      updateLoader({
        loading: true,
        message: iMessage('info', 'deduping'),
      }),
    ])
  );

// listener epics
const npmRunDedupeListenerEpic = pipe(
  ofType(npmDedupeListener.type),
  switchMap(() => onNpmDedupe$)
);

export { npmRunDedupeEpic, npmRunDedupeListenerEpic };
