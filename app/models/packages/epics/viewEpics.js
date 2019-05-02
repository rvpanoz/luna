import { catchError, switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { viewPackageListener } from '../actions';
import { onViewPackage$ } from '../listeners';

const viewPackageListenerEpic = action$ =>
    action$.pipe(
        ofType(viewPackageListener.type),
        switchMap(() => onViewPackage$)
    );

export { viewPackageListenerEpic };