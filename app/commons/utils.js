/* eslint-disable */

import fs from 'fs';
import path from 'path';
import mk from '../mk';
import { APP_MODES, PACKAGE_GROUPS } from '../constants/AppConstants';
import { pick, merge, pluck } from 'ramda';

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
export const parseDependencies = (response, mode, directory) => {
  if (!response || typeof response !== 'string') {
    throw new Error(
      'utils[parseDependencies]: response parameter must be a string'
    );
  }

  try {
    const packageData = JSON.parse(response);
    const { name, version } = packageData || {};

    const packages = pick(['dependencies', 'problems'], packageData);
    const { dependencies, problems } = packages || {};

    const dataArray = dependencies
      ? objectEntries(dependencies)
      : objectEntries(packageData);

    if (!Array.isArray(dataArray) || !dataArray) {
      mk.log(
        `utils[parseDependencies]: cound not convert response data to array`
      );

      return;
    }

    const noDependencies = dataArray.every(dep => {
      const [name, details] = dep;
      return typeof details !== 'object';
    });

    if (noDependencies) {
      return [[], [], name, version];
    }

    const data = dataArray.map(pkgArr => {
      const [pkgName, details] = pkgArr;
      const { name, extraneous, problems, invalid, missing } = details || {};

      let group;

      if (mode && mode === 'local') {
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
        name: pkgName || name,
        invalid,
        missing,
        extraneous,
        problems,
        __group: group
      });
    });

    return [data, problems, name, version];
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Parses and maps npm search response
 * @param {*} response
 */
export const parseFromSearch = response => {
  if (!response || typeof response !== 'string') {
    throw new Error(
      'utils[parseFromSearch]: response parameter must be a string'
    );
  }

  try {
    const dataArray = JSON.parse(response);

    return [dataArray];
  } catch (error) {
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

      return `${dirParts[dirParts.length - 2]}${SEPARATOR}${
        dirParts[dirParts.length - 1]
      }${SEPARATOR}package.json`;
    } catch (error) {
      throw new Error(error);
    }
  }

  return null;
};

export const setupInstallOptions = (selected, options) => {
  const dependencies = [];
  const devDependencies = [];
  const optionalDependencies = [];
  const bundleDependencies = [];
  const peerDependencies = [];
  const noSave = [];

  const packagesWithOptions =
    selected &&
    selected.reduce((acc, pkg) => {
      const flag = options.find(option => option.name === pkg.name);
      const { name } = pkg;
      const packageName = `${name}@latest`;

      if (!flag) {
        dependencies.push(packageName);
      } else {
        switch (flag.options[0]) {
          case 'save-dev':
            devDependencies.push(packageName);
            break;
          case 'save-optional':
            optionalDependencies.push(packageName);
            break;
          case 'save-bundle':
            bundleDependencies.push(packageName);
            break;
          case 'no-save':
            noSave.push(packageName);
            break;
          case 'save-peer':
            peerDependencies.push(packageName);
            break;
          default:
            dependencies.push(packageName);
            break;
        }
      }

      return merge(acc, {
        dependencies,
        devDependencies,
        optionalDependencies,
        bundleDependencies,
        peerDependencies,
        noSave
      });
    }, {});

  return packagesWithOptions;
};
