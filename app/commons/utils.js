/* eslint-disable */

/**
 * Parser class
 */

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import mk from '../mk';
import { pick, merge, path as rPath } from 'ramda';
import { APP_MODES, PACKAGE_GROUPS } from '../constants/AppConstants';

const { config } = mk;
const {
  defaultSettings: { manager }
} = config;

const _getKeys = obj => Object.keys(obj);
const _getValues = obj => Object.values(obj);

export const createActionCreator = namespace => actionType => {
  const type = `${namespace}/${actionType}`;
  const actionCreator = payload => ({
    type,
    payload
  });
  actionCreator.type = type;

  Object.freeze(actionCreator);

  return actionCreator;
};

/**
 * Object to array
 * @param {*} obj
 */
export const objectEntries = obj => {
  let ownProps = _getKeys(obj);
  let i = ownProps.length;
  let resArray = new Array(i);

  while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
  return resArray;
};

/**
 * Validate url
 * @param {*} url
 */
export const isUrl = url => {
  const matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  return matcher.test(url);
};

/**
 *
 * @param {*} str
 */
export const camelize = str => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index !== 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '');
};

/**
 * switch-case using currying
 * @param {*} cases
 */
export const switchcase = cases => defaultCase => key =>
  cases.hasOwnProperty(key) && typeof cases[key] === 'function'
    ? cases[key].apply(undefined)
    : defaultCase;

/**
 *
 * @param {*} str
 */
export const firstToUpper = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getFiltered = (data, filters) => {
  const groups = Object.keys(PACKAGE_GROUPS);
  let allFiltered = [];

  filters.forEach(filterName => {
    let filtered =
      data &&
      data.filter(pkg => {
        if (groups.indexOf(filterName) > -1) {
          return pkg['__group'] === filterName;
        }
        return !!pkg[filterName];
      });

    allFiltered = allFiltered.concat(filtered);
  });

  return allFiltered;
};

/**
 * Read package.json from a directory
 * @param {*} directory
 */
export const readPackageJson = directory => {
  try {
    const packageJSON = fs.readFileSync(path.join(directory), {
      encoding: 'utf8'
    });

    return JSON.parse(packageJSON);
  } catch (error) {
    mk.log(error);
    return false;
  }
};

/**
 *
 * @param {*} str
 */
export const isJson = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 *
 * @param {*} version
 */
export const isBeta = version => {
  if (!version) {
    return null;
  }

  return /beta/g.test(version);
};

/**
 *
 * @param {*} version
 */
export const isRC = version => {
  if (!version) {
    return null;
  }

  return /rc/g.test(version);
};

/**
 *
 * @param {*} version
 */
export const isAlpha = version => {
  if (!version) {
    return null;
  }

  return /alpha/g.test(version);
};

/**
 * Get package outdated
 * @param {*} outdatedPackages
 * @param {*} name
 */
export const isPackageOutdated = (outdatedPackages, name) => {
  if (!Array.isArray(outdatedPackages)) {
    return [false, null];
  }

  return [
    outdatedPackages.some(o => o.name === name),
    outdatedPackages.find(f => f.name === name)
  ];
};

/**
 * Parses and maps response
 * @param {*} response
 * @param {*} mode
 * @param {*} directory
 */
export const parseMap = (response, mode, directory, commandArgs) => {
  try {
    const packages = JSON.parse(response);
    const { name, version } = packages || {};
    const data = pick(['dependencies'], packages);
    let dataArray = [];

    if (!data.dependencies) {
      dataArray = objectEntries(packages);
    } else {
      dataArray = objectEntries(data.dependencies);
    }

    if (!Array.isArray(dataArray) || !dataArray) {
      mk.log(`utils[parseMap]: cound not convert data to array`);
      return;
    }

    const packagesData = dataArray.map(pkgArr => {
      const [pkgName, details] = pkgArr;

      let group = null;
      let hasPeerMissing = false;
      let found = false;
      let hasError = typeof details.error === 'object';

      // find group and attach to pkg, useful to show data in list
      if (mode === APP_MODES.LOCAL) {
        const packageJSON = readPackageJson(directory);

        if (!Boolean(packageJSON)) {
          mk.log(
            `utils[parseMap]: could not parse package.json in ${directory}`
          );
          return;
        }

        Object.keys(PACKAGE_GROUPS).some(groupName => {
          found = packageJSON[groupName] && packageJSON[groupName][pkgName];
          if (found) {
            group = groupName;
          }

          return found;
        });
      }

      return merge(details, {
        name: pkgName,
        __group: group || '',
        __error: hasError,
        __hasPeerMissing: hasPeerMissing
      });
    });

    return [name, version, packagesData];
  } catch (error) {
    mk.log(error.message);
    throw new Error(error);
  }
};
