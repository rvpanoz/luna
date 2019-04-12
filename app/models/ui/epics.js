import { map } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { ipcRenderer } from 'electron';

import { toggleLoader } from 'models/ui/actions';

const updateLoader = payload => ({
  type: toggleLoader.type,
  payload
});

const loaderEpic = action$ =>
  action$.pipe(
    ofType(toggleLoader.type),
    map(({ payload }) => {
      console.log(payload);
      return {
        type: 'UI_LOADER'
      };
    })
  );

export default combineEpics(loaderEpic);
