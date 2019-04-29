/* eslint-disable */

/**
 * Transformation epics
 */

import {
  catchError,
  map,
  tap,
  concatMap,
  mergeMap,
  switchMap,
  withLatestFrom,
  takeWhile,
  takeUntil,
  filter,
  combineLatest,
  delay,
  ignoreElements
} from 'rxjs/operators';

import { from, of, pipe } from 'rxjs';
import { ofType } from 'redux-observable';

import { PACKAGE_GROUPS } from 'constants/AppConstants';
import { readPackageJson } from 'commons/utils';

import {
  addOutdatedPackage,
  mapPackages,
  mapOutdatedPackages,
  mergePackages,
  setPackagesSuccess,
  setOutdatedSuccess,
  transformOutdatedPackages,
  transformDependency,
  transformationCompleted
} from '../actions';

const setUpdatedPackages = payload => ({
  type: setPackagesSuccess.type,
  payload
});

const setOutdatedPackages = payload => ({
  type: setOutdatedSuccess.type,
  payload
});

const mergePackagesEpic = pipe(
  ofType(mergePackages.type),
  tap(console.log)
);

const mapPackagesEpic = pipe(
  ofType(mapPackages.type),
  ignoreElements()
);

const mapOutdatedPackagesEpic = pipe(
  ofType(mapOutdatedPackages.type),
  switchMap(({ payload: { data } }) => from(data).pipe(
    concatMap(dependency => {
      const [name, details] = dependency;

      return [{
        name,
        isOutdated: true,
        ...details
      }]
    })
  )),
  map(dependency => addOutdatedPackage({ dependency }))
)

// TODO: how to use this and merge the result
const transformOutdatedPackagesEpic = pipe(
  ofType(transformOutdatedPackages.type),
  // tap(console.log),
  // ignoreElements()
)

const transformUpdatedPackagesEpic = action$ => action$.pipe(
  ofType(transformUpdatedPackages.type),
  ignoreElements()
)

const transformDependencyEpic = pipe(
  ofType(transformDependency.type),
  ignoreElements()
);


const transformLocalDependencyEpic = (action$, state$) => action$.pipe(
  ofType(transformDependency.type),
  filter(() => {
    const {
      common: { mode }
    } = state$.value;

    return mode === 'local'
  }),
  map(({ payload: { dependency } }) => {
    const {
      common: { directory }
    } = state$.value;

    const packageJSON = readPackageJson(directory);

    const group = Object.keys(PACKAGE_GROUPS).find(
      groupName =>
        packageJSON[groupName] && packageJSON[groupName][dependency.name]
    );

    return transformationCompleted({
      dependency: {
        ...details,
        name,
        __group: group || null
      }
    });
  }),
  tap(() => console.log('transformLocalDependencyEpic'))
)

const transformCompletedEpic = pipe(
  ofType(transformationCompleted.type),
  ignoreElements()
)

export { mapPackagesEpic, mapOutdatedPackagesEpic, transformOutdatedPackagesEpic };
