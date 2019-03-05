/* eslint-disable */

import fs from 'fs';
import path from 'path';
import mk from '../mk';
import { APP_MODES, PACKAGE_GROUPS } from '../constants/AppConstants';
import { pick, merge } from 'ramda';

const SEPARATOR = path.sep;

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
 * Object array
 * @param {*} obj
 */
export const objectEntries = obj => {
  let ownProps = Object.keys(obj);
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
 * @param {*} outdated
 * @param {*} name
 */
export const isPackageOutdated = (outdated, name) => {
  if (!Array.isArray(outdated)) {
    return [false, null];
  }

  return [
    outdated.some(o => o.name === name),
    outdated.find(f => f.name === name)
  ];
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
 * @param {*} subject
 * @param {*} needle
 */
export const matchType = (subject, needle) => {
  const prefixRegX = new RegExp(needle);

  return prefixRegX.test(subject);
};

/**
 * Parses and maps npm list response
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
    const { name, version, description, license, author } = packageJson || {};

    const packages = pick(['dependencies'], packageJson);
    const { dependencies } = packages || {};

    const dataArray = dependencies
      ? objectEntries(dependencies)
      : objectEntries(packageJson);

    if (!Array.isArray(dataArray) || !dataArray) {
      mk.log(`utils[parseMap]: cound not convert response data to array`);
      return;
    }

    const data = dataArray.map(pkgArr => {
      const [pkgName, details] = pkgArr;
      const { name, peerMissing } = details || {};

      let group;
      let hasError = typeof details && details.error === 'object';

      // find group and attach to package
      if (mode && mode === APP_MODES.local) {
        const packageJSON = readPackageJson(directory);

        if (!Boolean(packageJSON)) {
          mk.log(
            `utils[parseMap]: could not parse package.json in ${directory}`
          );

          return;
        }

        group = Object.keys(PACKAGE_GROUPS).find(
          groupName => packageJSON[groupName] && packageJSON[groupName][pkgName]
        );
      }

      return merge(details, {
        name: name || pkgName,
        __group: group,
        __error: hasError,
        __peerMissing: Array.isArray(peerMissing) && peerMissing.length
      });
    });

    return [data, name, version, description, license, author];
  } catch (error) {
    mk.log(error);
    throw new Error(error);
  }
};

export const parseMessage = error => {
  const errorParts = typeof error === 'string' && error.split(',');
  const errorMessage = errorParts && errorParts[0].split(':');

  if (errorMessage && errorMessage.length < 2) {
    return [];
  }

  return !errorMessage
    ? []
    : [errorMessage[0].trim(), errorMessage[1].trim(), errorParts[1]];
};

export const shrinkDirectory = directory => {
  let newPath;

  if (directory) {
    try {
      newPath = path.parse(directory);

      const { dir } = newPath || {};
      const dirParts = dir.split(SEPARATOR);

      return `${dirParts[dirParts.length - 1]}${SEPARATOR}package.json`;
    } catch (error) {
      throw new Error(error);
    }
  }

  return null;
};
