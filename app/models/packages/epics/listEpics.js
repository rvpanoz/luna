import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { pipe } from 'rxjs';

import { listPackagesListener, searchPackagesListener } from '../actions';
import { onListPackages$, onSearchPackages$ } from '../listeners';

const listPackagesListenerEpic = pipe(
  ofType(listPackagesListener.type),
  switchMap(() => onListPackages$)
);

const searchPackagesListenerEpic = pipe(
  ofType(searchPackagesListener.type),
  switchMap(() => onSearchPackages$)
);

export { listPackagesListenerEpic, searchPackagesListenerEpic };
