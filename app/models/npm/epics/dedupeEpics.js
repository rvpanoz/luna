import { pipe } from 'rxjs';
import { tap, switchMap, ignoreElements } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';
import { runDedupe, npmDedupeListener } from 'models/npm/actions';
import { onNpmDedupe$ } from '../listeners';

/**
 * Send ipc event to main process to handle npm-dedupe
 */
const npmRunDedupeEpic = (action$, state$) =>
    action$.pipe(
        ofType(runDedupe.type),
        tap(({ payload }) => {
            const {
                common: { mode, directory }
            } = state$.value;

            ipcRenderer.send('npm-dedupe', {
                ...payload,
                mode,
                directory
            });
        }),
        ignoreElements()
    );

// listener epics
const npmRunDedupeListenerEpic = pipe(
    ofType(npmDedupeListener.type),
    switchMap(() => onNpmDedupe$)
);

export { npmRunDedupeEpic, npmRunDedupeListenerEpic };