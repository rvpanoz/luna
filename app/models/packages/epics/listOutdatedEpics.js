import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { pipe } from 'rxjs';

import {
  listOutdatedPackagesListener,
  searchPackagesListener
} from '../actions';

import { onListOutdatedPackages$, onSearchPackages$ } from '../listeners';

const listOutdatedPackagesListenerEpic = pipe(
  ofType(listOutdatedPackagesListener.type),
  switchMap(() => onListOutdatedPackages$)
);

const searchPackagesListenerEpic = pipe(
  ofType(searchPackagesListener.type),
  switchMap(() => onSearchPackages$)
);

export { listOutdatedPackagesListenerEpic, searchPackagesListenerEpic };
