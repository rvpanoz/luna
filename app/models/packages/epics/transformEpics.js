import format from 'date-fns/format';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ofType } from 'redux-observable';
import { PACKAGE_GROUPS } from 'constants/AppConstants';
import { readPackageJson } from 'commons/utils';

import {
  mapPackages,
  mapOutdatedPackages,
  setPackagesSuccess,
  setPackagesSearchSuccess,
  setOutdatedSuccess,
  mapSearchPackages,
} from '../actions';

const setSearchPackages = (payload) => ({
  type: setPackagesSearchSuccess.type,
  payload,
});

const setPackages = (payload) => ({
  type: setPackagesSuccess.type,
  payload,
});

const setOutdatedPackages = (payload) => ({
  type: setOutdatedSuccess.type,
  payload,
});

const mapSearchPackagesEpic = (action$) =>
  action$.pipe(
    ofType(mapSearchPackages.type),
    map(({ payload: { data, fromSearch } }) => {
      const enhancedDependencies = data.map(({ name, version }) => ({
        name,
        latest: version,
        version: null,
      }));

      return setSearchPackages({
        dependencies: enhancedDependencies,
        fromSearch,
        lastUpdatedAt: format(new Date(), 'dd/MM/yyyy h:mm'),
      });
    })
  );

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
          projectVersion,
        },
      }) => {
        const {
          common: { mode, directory },
          packages: {
            packagesOutdated,
            project: { name, version, description },
          },
        } = state$.value;
        console.log(data);
        const enhancedDependencies = data.reduce(
          (alldependencies, dependency) => {
            const [pkgName, details] = fromSearch
              ? [
                  dependency.name,
                  {
                    version: dependency.version,
                    description: dependency.description,
                  },
                ]
              : dependency;

            const { extraneous, invalid, missing, peerMissing, problems } =
              details || {};

            const isOutdated = packagesOutdated.some((o) => o.name === pkgName);
            const outdatedPkg = packagesOutdated.find(
              (o) => o.name === pkgName
            );

            // side effect
            const packageJSON = readPackageJson(directory);

            const group =
              mode === 'local'
                ? Object.keys(PACKAGE_GROUPS).find(
                    (groupName) =>
                      packageJSON[groupName] && packageJSON[groupName][pkgName]
                  )
                : null;

            return [
              ...alldependencies,
              {
                name: pkgName,
                isOutdated,
                latest:
                  isOutdated && outdatedPkg
                    ? outdatedPkg.latest
                    : details.version,
                __invalid: invalid,
                __hasError: extraneous,
                __missing: missing,
                __peerMissing: peerMissing,
                __fromSearch: fromSearch,
                __group: group,
                ...details,
              },
            ];
          },
          []
        );

        return setPackages({
          dependencies: enhancedDependencies.filter(
            (dependency) =>
              !dependency.__invalid &&
              !dependency.__hasError &&
              // !dependency.__peerMissing &&
              !dependency.__missing
          ),
          projectName: fromSearch ? name : projectName,
          projectDescription: fromSearch ? description : projectDescription,
          projectVersion: fromSearch ? version : projectVersion,
          fromSearch,
          fromSort,
          lastUpdatedAt: format(new Date(), 'dd/MM/yyyy h:mm'),
        });
      }
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
          ...details,
        },
      ];
    }, [])
  ),
  map((alldependencies) => setOutdatedPackages({ outdated: alldependencies }))
);

export { mapPackagesEpic, mapOutdatedPackagesEpic, mapSearchPackagesEpic };
