/* eslint-disable import/prefer-default-export */
/* eslint-disable compat/compat */

import { ipcRenderer } from 'electron';
import { ofType } from 'redux-observable';
import { pipe } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { clearSelected, toggleLoader } from 'models/ui/actions';
import { clearInstallOptions } from 'models/common/actions';
import { clearCommands } from 'models/npm/actions';
import { iMessage } from 'commons/utils';
import { updateSearchFlag, setPackagesSearchStart } from '../actions';

const updateLoader = (payload) => ({
  type: toggleLoader.type,
  payload,
});

const updateSearchFlagEpic = pipe(
  ofType(setPackagesSearchStart.type),
  map(() =>
    updateSearchFlag({
      fromSearch: true,
    })
  )
);

const searchEpic = (action$, state$) =>
  action$.pipe(
    ofType(setPackagesSearchStart.type),
    tap(({ payload: { channel, options } }) => {
      const {
        common: { mode, directory },
      } = state$.value;

      ipcRenderer.send(
        channel,
        Object.assign({}, options, {
          mode,
          directory,
        })
      );
    }),
    concatMap(() => [
      updateLoader({
        loading: true,
        message: iMessage('info', 'searching'),
      }),
      clearSelected(),
      clearCommands(),
      clearInstallOptions(),
    ])
  );

export { searchEpic, updateSearchFlagEpic };
