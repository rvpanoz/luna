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

export const parseMap = (response, mode, directory) => {
  // data && _writeToFile(data);
  try {
    const packages = JSON.parse(response);
    let data;

    //
    if (mode === APP_MODES.GLOBAL || !directory) {
      data = _getValues(rPath(['dependencies'], packages));
    } else if (mode === APP_MODES.LOCAL && typeof directory === 'string') {
      data = rPath(['dependencies', 'devDependencies'], packages);
    }

    if (!Array.isArray(data) || !data) {
      mk.log(`data is not valid`);
      return; // TODO: error_reporting
    }

    return data.map(pkg => {
      const hasError = typeof pkg.error === 'object';
      const { _from, name } = pkg;
      let _group = null,
        _hasPeerMissing = false,
        found = false;

      // find group and attach to pkg, useful to show data in list
      if (mode === APP_MODES.LOCAL) {
        const packageJSON = readPackageJson(directory);

        if (!Boolean(packageJSON)) {
          mk.log(`could not parse package.json in ${directory}`);
          return; // TODO: error_reporting
        }

        Object.keys(PACKAGE_GROUPS).some(groupName => {
          found = packageJSON[groupName] && packageJSON[groupName][name];
          if (found) {
            _group = groupName;
          }

          return found;
        });
      }

      return merge(pkg, {
        _group,
        _hasPeerMissing
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
