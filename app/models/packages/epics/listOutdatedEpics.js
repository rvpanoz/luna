import { switchMap, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of, pipe } from 'rxjs';

import {
  listOutdatedPackagesListener,
  searchPackagesListener,
} from '../actions';

import { onListOutdatedPackages$, onSearchPackages$ } from '../listeners';

const listOutdatedPackagesListenerEpic = pipe(
  ofType(listOutdatedPackagesListener.type),
  switchMap(() => onListOutdatedPackages$),
  catchError((error) =>
    of({
      type: '@@LUNA/ERROR/LIST_OUTDATED_PACKAGES',
      error: error.toString(),
    })
  )
);

const searchPackagesListenerEpic = pipe(
  ofType(searchPackagesListener.type),
  switchMap(() => onSearchPackages$),
  catchError((error) =>
    of({
      type: '@@LUNA/ERROR/SEARCH_PACKAGES',
      error: error.toString(),
    })
  )
);

export { listOutdatedPackagesListenerEpic, searchPackagesListenerEpic };
