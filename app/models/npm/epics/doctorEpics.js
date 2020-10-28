import { pipe } from 'rxjs';
import { tap, switchMap, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';
import { toggleLoader } from 'models/ui/actions';
import { runDoctor, npmDoctorListener } from 'models/npm/actions';
import { iMessage } from 'commons/utils';
import { onNpmDoctor$ } from '../listeners';

const updateLoader = (payload) => ({
  type: toggleLoader.type,
  payload,
});

/**
 * Send ipc event to main process to handle npm-doctor
 */
const npmRunDoctorEpic = (action$, state$) =>
  action$.pipe(
    ofType(runDoctor.type),
    tap(({ payload }) =>
      ipcRenderer.send('npm-doctor', {
        ...payload,
      })
    ),
    mergeMap(() => [
      updateLoader({
        loading: true,
        message: iMessage('info', 'doctor'),
      }),
    ])
  );

// listener epics
const npmRunDoctorListenerEpic = pipe(
  ofType(npmDoctorListener.type),
  switchMap(() => onNpmDoctor$)
);

export { npmRunDoctorEpic, npmRunDoctorListenerEpic };
