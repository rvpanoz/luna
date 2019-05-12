
/**
 * Transformation epics
 */

import { map } from 'rxjs/operators';

import { pipe } from 'rxjs';
import { ofType } from 'redux-observable';

import { PACKAGE_GROUPS } from 'constants/AppConstants';
import { readPackageJson, isPackageOutdated } from 'commons/utils';

import {
  mapPackages,
  mapOutdatedPackages,
  setPackagesSuccess,
  setOutdatedSuccess
} from '../actions';

const setPackages = payload => ({
  type: setPackagesSuccess.type,
  payload
});

const setOutdatedPackages = payload => ({
  type: setOutdatedSuccess.type,
  payload
});

const mapPackagesEpic = (action$, state$) =>
  action$.pipe(
    ofType(mapPackages.type),
    map(
      ({
        payload: {
          data,
          fromSearch,
          fromSort,
          projectName,
          projectDescription,
          projectVersion
        }
      }) => {
        const {
          common: { mode, directory },
          packages: {
            packagesOutdated,
            project: { name, version, description }
          }
        } = state$.value;

        const enhancedDependencies = data.reduce(
          (alldependencies, dependency) => {
            const [pkgName, details] = fromSearch
              ? [
                dependency.name,
                {
                  version: dependency.version,
                  description: dependency.description
                }
              ]
              : dependency;

            const { extraneous, invalid, missing, peerMissing, problems } =
              details || {};

            const isOutdated = packagesOutdated.some(o => o.name === pkgName);
            const outdatedPkg = packagesOutdated.find(o => o.name === pkgName);

            const packageJSON = readPackageJson(directory); //side effect

            const group =
              mode === 'local'
                ? Object.keys(PACKAGE_GROUPS).find(
                  groupName =>
                    packageJSON[groupName] && packageJSON[groupName][pkgName]
                )
                : null;

            return [
              ...alldependencies,
              {
                name: pkgName,
                isOutdated,
                latest: isOutdated && outdatedPkg ? outdatedPkg.latest : dependency.version,
                __invalid: invalid,
                __hasError: missing || peerMissing || extraneous,
                __fromSearch: fromSearch,
                __group: group,
                ...details
              }
            ];
          },
          []
        );

        return {
          alldependencies: enhancedDependencies,
          projectName,
          projectDescription,
          projectVersion,
          fromSearch,
          fromSort
        };
      }
    ),
    map(
      ({
        alldependencies,
        projectName,
        projectDescription,
        projectVersion,
        fromSearch,
        fromSort
      }) =>
        setPackages({
          dependencies: alldependencies.filter(
            dependency => !Boolean(dependency.__invalid)
          ),
          projectName,
          projectDescription,
          projectVersion,
          fromSearch,
          fromSort
        })
    )
  );

const mapOutdatedPackagesEpic = pipe(
  ofType(mapOutdatedPackages.type),
  map(({ payload: { data } }) =>
    data.reduce((alldependencies, dependency) => {
      const [name, details] = dependency;

      return [
        ...alldependencies,
        {
          name,
          isOutdated: true,
          ...details
        }
      ];
    }, [])
  ),
  map(alldependencies => setOutdatedPackages({ outdated: alldependencies }))
);

export { mapPackagesEpic, mapOutdatedPackagesEpic };
