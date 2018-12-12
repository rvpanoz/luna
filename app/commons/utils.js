/* eslint-disable */

/**
 * Parser class
 */

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import mk from '../mk';
import { pick, path as rPath } from 'ramda';
import { APP_MODES, PACKAGE_GROUPS } from '../constants/AppConstants';

const { config } = mk;
const {
  defaultSettings: { manager }
} = config;

// TODO: dev
// const __directory = path.join(
//   'C:/projects/',
//   'agile/luna-test/',
//   'package.json'
// );

const __directory = '/home/rvpanoz/Projects/electron/luna-test/package.json';

const mappedPackages = (data, packageJson) =>
  data.map(pkg => {
    const hasError = typeof pkg.error === 'object';
    const { name } = pkg;
    let _group = null,
      _hasPeerMissing = false;

    /**
     * find group and attach to pkg, useful to show data in list
     */
    if (mode === APP_MODES.LOCAL && typeof packageJSON === 'object') {
      let found = false;

      Object.keys(PACKAGE_GROUPS).some((groupName, idx) => {
        found = packageJSON[groupName] && packageJSON[groupName][name];
        if (found) {
          _group = groupName;
        }

        return found;
      });
    }

    if (hasError) {
      return Rmerge(pkg, {
        _hasError: pkg.error
      });
    }

    const { version, peerMissing, required, missing, _from, link } = pkg;
    const outdatedPackage = Rprop(name, packagesOutdated);

    if (peerMissing && Array.isArray(peerMissing)) {
      _hasPeerMissing = true;
      peerMissing.forEach(pm => {
        addMessage(
          'error',
          `Package ${pm['requiredBy']} requires ${pm['requires']}`,
          pm['requires'],
          pm['requiredBy']
        );
      });
    }

    if (
      outdatedPackage &&
      typeof outdatedPackage === 'object' &&
      version !== outdatedPackage.latest
    ) {
      return Rmerge(pkg, {
        _group,
        _hasPeerMissing,
        latest: outdatedPackage.latest
      });
    }

    return Rmerge(pkg, {
      _group,
      _hasPeerMissing
    });
  });

/**
 * Parses the response
 * @param {*} data
 * @param {*} keys
 */
export const parse = (data, keys, options) => {
  if (typeof data === 'string' && Boolean(data.length) === false) {
    return;
  }

  const parseJson = (dataString, keys) => {
    try {
      const toJson = JSON.parse(dataString);

      return keys ? pick(keys, toJson) : toJson;
    } catch (error) {
      console.log(chalk.red.bold(error));
      return [];
    }
  };

  const packages = parseJson(data, keys);

  // TODO: map packages .. transform(_hasError, _hasPeerDependency, _group)
  return rPath(['dependencies'], packages);
};

export const readPackageJson = (directory = __directory) => {
  try {
    const packageJSON = fs.readFileSync(path.join(directory), {
      encoding: 'utf8'
    });

    return JSON.parse(packageJSON);
  } catch (error) {
    throw new Error(error);
  }
};
