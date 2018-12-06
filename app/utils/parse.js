/* eslint-disable */

import fs from 'fs';
import path from 'path';
import { filter as Rfilter, merge as Rmerge, prop as Rprop } from 'ramda';
import { APP_MODES, PACKAGE_GROUPS } from '../constants/AppConstants';
import { pickAll } from 'ramda';

const ROOT = __dirname;

const yarnParse = response => {
  const packageJsonObj = parsePackageJSON();
  const partialPackageJsonObj = pickAll(
    ['dependencies', 'devDependencies', 'optionalDependencies'],
    packageJsonObj
  );
  const packages = parse(response);
  const {
    data: { trees }
  } = packages;

  const packageValues = Object.values(partialPackageJsonObj);
  console.log(packageValues);

  return trees.reduce((acc, pkg, idx) => {
    return [...acc, 1];
  }, []);
};

export const parseJson = data => {
  try {
  } catch (error) {
    throw new Error(error);
  }
};

export const parsePackageJSON = () => {
  try {
    const packageJSON = fs.readFileSync(path.join(ROOT, '../package.json'), {
      encoding: 'utf8'
    });

    return JSON.parse(packageJSON);
  } catch (error) {
    throw new Error(error);
  }
};

export const setupPackagesFromResponse = (
  response,
  packagesOutdated = [],
  mode = 'GLOBAL',
  manager = 'yarn',
  packageJSON = {}
) => {
  if (Boolean(response.length) === false) {
    return;
  }

  const data =
    manager === 'npm' ? parse(response, 'dependencies') : yarnParse(response);

  // console.log(data);
  return [];

  if (!data || !Array.isArray(data)) {
    throw new Error('Cannot parse packages');
  }

  const mappedPackages = data.map(pkg => {
    const {
      version,
      error,
      peerMissing,
      name,
      required,
      missing,
      _from,
      link
    } = pkg;
    const hasError = typeof error === 'object';
    let group = null;
    let hasPeerMissing = false;

    // find group and attach to pkg, useful to show data in list
    if (mode === APP_MODES.LOCAL && typeof packageJSON === 'object') {
      let found = false;

      Object.keys(PACKAGE_GROUPS).some(groupName => {
        found = packageJSON[groupName] && packageJSON[groupName][name];
        if (found) {
          group = groupName;
        }

        return found;
      });
    }

    if (hasError) {
      return Rmerge(pkg, {
        hasError: pkg.error
      });
    }

    const outdatedPackage = Rprop(name, packagesOutdated);

    if (peerMissing && Array.isArray(peerMissing)) {
      hasPeerMissing = true;
      // TODO: add error messages
    }

    if (
      outdatedPackage &&
      typeof outdatedPackage === 'object' &&
      version !== outdatedPackage.latest
    ) {
      return Rmerge(pkg, {
        group,
        hasPeerMissing,
        latest: outdatedPackage.latest
      });
    }

    return Rmerge(pkg, {
      group,
      hasPeerMissing
    });
  });

  const listPackages = Rfilter(pkg => {
    return !pkg.hasPeerMissing && !pkg.hasError;
  }, mappedPackages);

  return listPackages;
};
