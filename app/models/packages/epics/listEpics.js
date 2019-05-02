import { catchError, switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { listPackagesListener } from '../actions';
import { onListPackages$ } from '../listeners';

const listPackagesListenerEpic = action$ =>
  action$.pipe(
    ofType(listPackagesListener.type),
    switchMap(() => onListPackages$)
  );

export { listPackagesListenerEpic };