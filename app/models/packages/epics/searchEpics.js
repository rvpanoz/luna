/* eslint-disable import/prefer-default-export */

import { ipcRenderer } from 'electron';
import { ofType } from 'redux-observable';
import { pipe } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';

import { toggleLoader } from 'models/ui/actions';
import { setPackagesSearch, updateSearchFlag } from '../actions';

const updateLoader = payload => ({
  type: toggleLoader.type,
  payload
});

const updateSearchFlagEpic = pipe(
  ofType(setPackagesSearch.type),
  map(() =>
    updateSearchFlag({
      fromSearch: true
    })
  )
);

const searchEpic = (action$, state$) =>
  action$.pipe(
    ofType(setPackagesSearch.type),
    tap(({ payload: { channel, options } }) => {
      const {
        common: { mode, directory }
      } = state$.value;

      ipcRenderer.send(
        channel,
        Object.assign({}, options, {
          mode,
          directory
        })
      );
    }),
    concatMap(() => [
      updateLoader({
        loading: true,
        message: 'Searching...'
      })
    ])
  );

export { searchEpic, updateSearchFlagEpic };
