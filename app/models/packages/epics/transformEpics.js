import { catchError, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { readPackageJson, isPackageOutdated } from 'commons/utils';
import { mapPackages, setPackagesSuccess } from '../actions';

const setPackages = payload => ({
  type: setPackagesSuccess.type,
  payload
});

const mapPackagesEpic = (action$, state$) =>
  action$.pipe(
    ofType(mapPackages.type),
    map(
      ({
        payload: {
          data,
          projectName,
          projectVersion,
          projectDescription,
          fromSearch,
          fromSort
        }
      }) => {
        const {
          common: { mode, directory },
          packages: {
            packagesOutdated,
            project: { name, version, description }
          }
        } = state$.value;

        const enhancedDependencies = data.reduce((deps = [], dependency) => {
          let group;

          const [pkgName, details] = fromSearch
            ? [
                dependency.name,
                {
                  version: dependency.version,
                  description: dependency.description
                }
              ]
            : dependency;

          const { extraneous, invalid, missing, peerMissing } = details || {};

          if (mode === 'local') {
            const packageJSON = readPackageJson(directory);

            if (!packageJSON) {
              return null;
            }

            group = Object.keys(PACKAGE_GROUPS).find(
              groupName =>
                packageJSON[groupName] && packageJSON[groupName][pkgName]
            );
          }

          if (!invalid && !peerMissing && !missing && !extraneous) {
            const [isOutdated, outdatedPkg] = isPackageOutdated(
              packagesOutdated,
              pkgName
            );

            const enhancedDependency = {
              ...details,
              name: pkgName,
              extraneous,
              missing,
              peerMissing,
              latest: isOutdated ? outdatedPkg.latest : null,
              isOutdated,
              __hasError: missing || peerMissing || extraneous,
              __fromSearch: fromSearch,
              __group: group
            };

            deps.push(enhancedDependency);
          }

          return deps;
        }, []);

        return setPackages({
          dependencies: enhancedDependencies,
          projectName: projectName || name,
          projectVersion: projectVersion || version,
          projectDescription: projectDescription || description,
          fromSearch,
          fromSort
        });
      }
    ),
    catchError(error => {
      console.error(error); // TODO: handle
    })
  );

export { mapPackagesEpic };
