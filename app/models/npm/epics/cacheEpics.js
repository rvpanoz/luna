import { pipe } from 'rxjs';
import { tap, switchMap, mergeMap, ignoreElements } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';
import { toggleLoader } from 'models/ui/actions';
import { runCache, npmCacheListener, parseNpmCacheData } from 'models/npm/actions';
import { iMessage } from 'commons/utils'
import { onNpmCache$ } from '../listeners';

const updateLoader = payload => ({
    type: toggleLoader.type,
    payload
});

/**
 * Parse npm cache verify data
 */
const npmCacheParseEpic = pipe(
    ofType(parseNpmCacheData.type),
    tap(console.log),
    ignoreElements()
)

/**
 * Send ipc event to main process to handle npm-cache
 */
const npmRunCacheEpic = (action$, state$) =>
    action$.pipe(
        ofType(runCache.type),
        tap(({ payload }) => {
            const {
                common: { mode, directory }
            } = state$.value;

            ipcRenderer.send('npm-cache', {
                ...payload,
                mode,
                directory
            });
        }),
        mergeMap(() => [
            updateLoader({
                loading: true,
                message: iMessage('info', 'cacheRunning', {
                    '%action%': 'verify' // TODO: add more actions
                })
            })]),
    );

// listener epics
const npmRunCacheListenerEpic = pipe(
    ofType(npmCacheListener.type),
    switchMap(() => onNpmCache$)
);

export { npmRunCacheEpic, npmRunCacheListenerEpic, npmCacheParseEpic };