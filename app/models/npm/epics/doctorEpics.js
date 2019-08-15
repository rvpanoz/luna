import { pipe } from 'rxjs';
import { map, tap, switchMap, ignoreElements } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';
import { toggleDoctorLoader } from 'models/ui/actions';
import { runDoctor, npmDoctorListener, parseNpmDoctorData, updateNpmDoctorData } from 'models/npm/actions';
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

/**
* Parse npm audit output
* @param {*} action$
*/
const npmDoctorParseEpic = action$ =>
  action$.pipe(
    ofType(parseNpmDoctorData.type),
    map(({ payload: data }) => {
      let content = null;

      try {
        const dataToJson = JSON.parse(data);
        const { error } = dataToJson;

        if (error) {
          const { code, summary, detail } = error;

          return updateNpmDoctorData({
            data: {
              error: {
                code,
                detail,
                message: summary
              },
              content: null
            }
          });
        }
      } catch (error) {
        content = data.split('\n').map(line => line.trim().replace(/  +/g, ' '));
      }

      return updateNpmDoctorData({
        data: {
          error: null,
          content
        }
      });
    })
  );

// listener epics
const npmRunDoctorListenerEpic = pipe(
  ofType(npmDoctorListener.type),
  switchMap(() => onNpmDoctor$)
);

export { npmRunDoctorEpic, npmRunDoctorListenerEpic, npmDoctorParseEpic, showDoctorLoaderEpic };
