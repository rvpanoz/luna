import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';

import { toggleLoader } from 'models/ui/actions';
import { runAudit } from 'models/npm/actions';

const updateLoader = payload => ({
  type: toggleLoader.type,
  payload
});

const npmRunAuditEpic = pipe(
  ofType(runAudit.type),
  map(({ payload }) => {
    ipcRenderer.send('ipc-event', payload);

    return updateLoader({
      loading: true,
      message: 'Running npm audit'
    });
  })
);

export default combineEpics(npmRunAuditEpic);
