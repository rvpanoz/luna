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

const _writeToFile = content =>
  fs.writeFileSync(
    path.join(__dirname, '..', 'app', 'packages-debug.json'),
    content,
    {
      encoding: 'utf8'
    }
  );

const _getKeys = obj => Object.keys(obj);
const _getValues = obj => Object.values(obj);

/**
 * Object to array
 * @param {*} obj
 */
export const objectEntries = obj => {
  let ownProps = _getKeys(obj),
    i = ownProps.length,
    resArray = new Array(i);

  while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
  return resArray;
};

export const parseMap = (response, mode, directory) => {
  try {
    const packages = JSON.parse(response);
    const data = pick(['dependencies'], packages);
    const dataArray = objectEntries(data.dependencies);

    if (!Array.isArray(dataArray) || !dataArray) {
      mk.log(`utils[parseMap]: cound not convert data to array`);
      return;
    }

    return dataArray.map(pkgArr => {
      const [pkgName, details] = pkgArr;
      let group = null;
      let hasPeerMissing = false;
      let found = false;
      let hasError = typeof details.error === 'object';

      // find group and attach to pkg, useful to show data in list
      if (mode === APP_MODES.LOCAL) {
        const packageJSON = readPackageJson(directory);

        if (!Boolean(packageJSON)) {
          mk.log(`could not parse package.json in ${directory}`);
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

      // TODO: destruct details
      return merge(details, {
        __group: group,
        __error: hasError,
        __hasPeerMissing: hasPeerMissing
      });
    });
  } catch (error) {
    mk.log(error);
  }
};

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
