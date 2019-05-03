import { ipcRenderer } from 'electron';
import { map, tap, switchMap, ignoreElements } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { pipe } from 'rxjs';

import { togglePackageLoader } from 'models/ui/actions';
import { viewPackageStart, viewPackageListener } from '../actions';
import { onViewPackage$ } from '../listeners';

const updatePackageLoader = payload => ({
  type: togglePackageLoader.type,
  payload
});

const viewPackageEpic = pipe(
  ofType(viewPackageStart.type),
  map(() =>
    updatePackageLoader({
      loading: true
    })
  )
);

const viewPackageLoaderEpic = pipe(
  ofType(viewPackageStart.type),
  tap(({ payload: { options } }) => {
    ipcRenderer.send('npm-view', options);
  }),
  ignoreElements()
);

const viewPackageListenerEpic = pipe(
  ofType(viewPackageListener.type),
  switchMap(() => onViewPackage$)
);

export { viewPackageEpic, viewPackageLoaderEpic, viewPackageListenerEpic };
