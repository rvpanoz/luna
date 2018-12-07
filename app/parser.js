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

// TODO: dev
const __directory = path.join(
  'C:/projects/',
  'agile/luna-test/',
  'package.json'
);

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

        return keys ? pick(keys, toJson) : toJson;
      } catch (error) {
        console.log(chalk.red.bold(error));
        return [];
      }
    };

    const packages = parseJson(data, keys);
    const packageJson = this.readPackageJson();

    const values =
      activeManager === 'yarn'
        ? rPath(['data', 'trees'], packages)
        : rPath(['dependencies'], packages);

    // TODO: map packages .. transform(_hasError, _hasPeerDependency, _group)
    return values;
  }

  readPackageJson(directory = __directory) {
    try {
      const packageJSON = fs.readFileSync(path.join(directory), {
        encoding: 'utf8'
      });

      return JSON.parse(packageJSON);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default Parser;
