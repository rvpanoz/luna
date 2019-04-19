import { pipe } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';

import { toggleLoader, setSnackbar } from 'models/ui/actions';
import { runAudit, runInit, npmToolsListener } from 'models/npm/actions';
import { onNpmTools$ } from './listeners';

const updateLoader = payload => ({
  type: toggleLoader.type,
  payload
});

const npmToolsListenerEpic = pipe(
  ofType(npmToolsListener.type),
  switchMap(() => onNpmTools$),
  catchError(err =>
    setSnackbar({
      type: 'error',
      open: true,
      message: err
    })
  )
);

const npmRunAuditEpic = pipe(
  ofType(runAudit.type),
  map(({ payload }) => {
    const { fix } = payload;

    ipcRenderer.send('ipc-event', payload);

    return updateLoader({
      loading: true,
      message: `Running npm audit ${fix && ' fix'}`
    });
  })
);

const npmRunInitEpic = pipe(
  ofType(runInit.type),
  map(({ payload }) => {
    ipcRenderer.send('ipc-event', payload);

    return updateLoader({
      loading: true,
      message: 'Running npm init'
    });
  })
);

export default combineEpics(
  npmRunAuditEpic,
  npmRunInitEpic,
  npmToolsListenerEpic
);
