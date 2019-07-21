import { pipe } from 'rxjs';
import { map, tap, switchMap, ignoreElements } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';

import { toggleDoctorLoader } from 'models/ui/actions';
import { runDoctor, npmDoctorListener } from 'models/npm/actions';

import { onNpmDoctor$ } from '../listeners';

const updateLoader = payload => ({
  type: toggleDoctorLoader.type,
  payload
});

const showDoctorLoaderEpic = action$ =>
  action$.pipe(
    ofType(runDoctor.type),
    map(() =>
      updateLoader({
        loading: true,
        message: 'Please wait. npm doctor is running..'
      })
    )
  );

/**
 * Send ipc event to main process to handle npm-doctor
 * supports local mode
 */
const npmRunDoctorEpic = (action$, state$) =>
  action$.pipe(
    ofType(runDoctor.type),
    tap(({ payload }) => {
      const {
        common: { mode, directory }
      } = state$.value;

      ipcRenderer.send('npm-doctor', {
        ...payload,
        mode,
        directory
      });
    }),
    ignoreElements()
  );

// listener epics
const npmRunDoctorListenerEpic = pipe(
  ofType(npmDoctorListener.type),
  switchMap(() => onNpmDoctor$)
);

export { npmRunDoctorEpic, npmRunDoctorListenerEpic, showDoctorLoaderEpic };
