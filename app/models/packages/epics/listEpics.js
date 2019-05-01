import { catchError, switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { getPackagesListener, viewPackageListener } from '../actions';
import { onGetPackages$, onViewPackage$ } from '../listeners';

const getPackagesListenerEpic = action$ =>
  action$.pipe(
    ofType(getPackagesListener.type),
    switchMap(() => onGetPackages$)
  );

const viewPackageListenerEpic = action$ =>
  action$.pipe(
    ofType(viewPackageListener.type),
    switchMap(() => onViewPackage$),
    catchError(err =>
      setSnackbar({
        type: 'error',
        open: true,
        message: err
      })
    )
  );

export { getPackagesListenerEpic, viewPackageListenerEpic };
