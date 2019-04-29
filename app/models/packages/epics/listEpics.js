import { catchError, switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { getPackagesListener } from '../actions';
import { onGetPackages$ } from '../listeners';

const getPackagesListenerEpic = action$ =>
  action$.pipe(
    ofType(getPackagesListener.type),
    switchMap(() => onGetPackages$)
  );

export { getPackagesListenerEpic };
