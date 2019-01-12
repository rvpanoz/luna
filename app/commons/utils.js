/* eslint-disable */

/**
 * Parser class
 */

import fs from 'fs';
import path from 'path';
import mk from '../mk';
import { APP_MODES, PACKAGE_GROUPS } from '../constants/AppConstants';
import { pick, merge } from 'ramda';

const _getKeys = obj => Object.keys(obj);

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
export const firstToUpper = str => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index !== 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '');
};

/**
 * @param {*} cases
 *
 */
export const switchcase = cases => defaultCase => key =>
  cases.hasOwnProperty(key) && typeof cases[key] === 'function'
    ? cases[key].apply(undefined)
    : defaultCase;

/**
 * Filtering
 * TODO: buggy combine returns only the last element! why?
 */
export const getFiltered = (data, filters) => {
  const groups = Object.keys(PACKAGE_GROUPS);

  const withFiltersData = filters.reduce((acc, filterName) => {
    const filtered =
      data &&
      data.filter(pkg => {
        if (groups.indexOf(filterName) > -1) {
          return pkg['__group'] === filterName;
        }

        return !!pkg[filterName];
      });

    if (filtered.length) {
      return acc ? acc.concat(filtered) : [];
    }
  }, []);

  return withFiltersData;
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
export const parseMap = (response, mode, directory) => {
  if (!response || typeof response !== 'string') {
    throw new Error('response parameter must be a string');
  }

  try {
    const packageJson = JSON.parse(response);

    const { name, version } = packageJson || {};

    const packages = pick(['dependencies'], packageJson);
    const { dependencies } = packages || {};

    let dataArray = [];

    if (Boolean(dependencies) === false) {
      dataArray = objectEntries(packageJson);
    } else {
      dataArray = objectEntries(dependencies);
    }

    if (!Array.isArray(dataArray) || !dataArray) {
      mk.log(`utils[parseMap]: cound not convert response data to array`);
      return;
    }

    const data = dataArray.map(pkgArr => {
      const [pkgName, details] = pkgArr;
      const { name, peerMissing } = details || {};

      let group;
      let hasError = typeof details.error === 'object';

      // find group and attach to pkg, useful to show data in list
      if (mode && mode === APP_MODES.LOCAL) {
        const packageJSON = readPackageJson(directory);

        if (!Boolean(packageJSON)) {
          mk.log(
            `utils[parseMap]: could not parse package.json in ${directory}`
          );
          return;
        }

        group = Object.keys(PACKAGE_GROUPS).find(groupName => {
          return packageJSON[groupName] && packageJSON[groupName][pkgName];
        });
      }

      return merge(details, {
        name: name || pkgName,
        __group: group || '',
        __error: hasError,
        __peerMissing: Array.isArray(peerMissing) && peerMissing.length
      });
    });

    return [name, version, data];
  } catch (error) {
    mk.log(error.message);
    return;
  }
};

export const filterByProp = (data, prop) =>
  data &&
  data.filter(item => {
    return item[prop];
  }, data);

export const parseNpmError = error => {
  if (!error) {
    return [];
  }

  const errorParts = typeof error === 'string' && error.split(',');
  const errorMessage = errorParts && errorParts[0].split(':');

  return !errorMessage
    ? []
    : [errorMessage[0].trim(), errorMessage[1].trim(), errorParts[1]];
};
