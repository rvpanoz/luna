import path from 'path';
import { pipe } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  // tap,
  switchMap
} from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';

import { toggleLoader, setSnackbar, setDialog } from 'models/ui/actions';
import { setMode } from 'models/common/actions';
import { runAudit, runInit, npmToolsListener } from 'models/npm/actions';
import { onNpmTools$ } from './listeners';

const updateLoader = payload => ({
  type: toggleLoader.type,
  payload
});

const npmToolsListenerEpic = pipe(
  ofType(npmToolsListener.type),
  switchMap(() => onNpmTools$),
  mergeMap(({ fix, operation, directory, content }) => {
    if (operation === 'init') {
      return [
        toggleLoader({
          loading: false,
          message: null
        }),
        setMode({
          mode: 'local',
          directory: path.join(directory, 'package.json')
        })
      ];
    }

    return [
      setSnackbar({
        open: true,
        type: 'info',
        message: `npm audit ${fix ? 'fix' : ''} completed`
      }),
      toggleLoader({
        loading: false,
        message: null
      }),
      setDialog({
        open: !fix,
        name: operation,
        content: fix ? null : content
      })
    ];
  }),
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
      message: fix ? 'Fixing..' : `Running npm audit`
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
