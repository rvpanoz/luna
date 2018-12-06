/* eslint-disable */

/**
 * Parser class
 */

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { pick, path as rPath } from 'ramda';

//dev utils
import { writeToFile } from './utils';

const ROOTDIR = __dirname;

class Parser {
  _manager = null;

  constructor(manager) {
    this._manager = manager;
  }

  getManager() {
    return this._manager;
  }

  /**
   * Parses the response
   * @param {*} data
   * @param {*} keys
   */
  parse(data, keys = ['dependencies'], options) {
    const activeManager = this.getManager();

    if (typeof data === 'string' && Boolean(data.length) === false) {
      return;
    }

    const parseJson = (dataString, keys) => {
      try {
        const toJson = JSON.parse(dataString);
        const hasManyKeys = Array.isArray(keys) && keys.length;
        const hasOneKey = !Array.isArray(keys) && typeof keys === 'string';

        return keys ? pick(keys, toJson) : toJson;
      } catch (error) {
        console.log(chalk.red.bold(error));
        return [];
      }
    };

    const packages = parseJson(data, keys);
    // writeToFile('packages-debug.json', JSON.stringify(packages));

    const values =
      activeManager === 'yarn'
        ? rPath(['trees'], pick(['data'], packages))
        : rPath(['dependencies'], pick(['dependencies'], packages));

    // packages &&
    //   packages.map((pkg, idx) => {
    //     console.log(pkg);
    //   });

    return values;
  }

  readPackageJson() {
    try {
      const packageJSON = fs.readFileSync(
        path.join(ROOTDIR, '../package.json'),
        {
          encoding: 'utf8'
        }
      );

      return JSON.parse(packageJSON);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default Parser;
