/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable compat/compat */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable dot-notation */

import cp from 'child_process';
import path from 'path';
import chalk from 'chalk';
import mk from '../mk';

const { spawn } = cp;
const { log } = console;
const { config } = mk;
const {
  defaultSettings: { defaultManager }
} = config;

const defaultsArgs = {
  list: ['--json', '--depth=0', '--parseable', '--long']
};

const cwd = process.cwd();

const execute = (
  manager = defaultManager,
  commandArgs,
  mode,
  directory,
  callback
) => {
  const resultP = new Promise(resolve => {
    const result = [];
    const errors = [];

    log(chalk.whiteBright.bold(`running: ${manager} ${commandArgs.join(' ')}`));
    callback('flow', null, `${manager} ${commandArgs.join(' ')}`);

    // on windows use npm.cmd
    const command = spawn(
      /^win/.test(process.platform) ? `${manager}.cmd` : manager,
      commandArgs,
      {
        env: process.env,
        cwd: mode === 'LOCAL' && directory ? path.dirname(directory) : cwd
      }
    );

    command.stdout.on('data', data => {
      result.push(String(data));
      callback('data-flow', null, String(data));
    });

    command.stderr.on('data', error => {
      errors.push(String(error));
      callback('error', String(error), null);
    });

    command.on('exit', code => {
      log(chalk.yellow.bold(`child exited with code ${code}`));
    });

    command.on('close', () => {
      log(
        chalk.greenBright.bold(`finished: ${manager} ${commandArgs.join(' ')}`)
      );

      const results = {
        status: 'close',
        errors,
        data: result.join(''),
        cmd: commandArgs
      };

      return resolve(results);
    });
  });

  return resultP;
};

/**
 * List command
 * use npm
 * */

exports.list = (options, callback) => {
  const command = ['list'];
  const { mode, directory } = options || {};

  if (!callback || typeof callback !== 'function') {
    return Promise.reject(
      'manager[list]: callback must be given and must be a function'
    );
  }

  if (!mode || typeof mode !== 'string') {
    return Promise.reject(
      'manager[list]: mode must be given and must be one of "GLOBAL" or "LOCAL"'
    );
  }

  const run =
    mode === 'GLOBAL' && !directory
      ? command.concat(defaultsArgs.list, '-g')
      : command.concat(defaultsArgs.list);

  // returns a Promise
  return execute('npm', run, mode, directory, callback);
};

/**
 * Outdated command
 * use npm
 */
exports.outdated = (options, callback) => {
  const command = ['outdated'];
  const { mode, directory } = options || {};

  if (!callback || typeof callback !== 'function') {
    return Promise.reject(
      'manager[outdated]: callback must be given and must be a function'
    );
  }

  if (!mode || typeof mode !== 'string') {
    return Promise.reject(
      'manager[outdated]: mode must be given and must be one of "GLOBAL" or "LOCAL"'
    );
  }

  const run =
    mode === 'GLOBAL' && !directory
      ? command.concat(defaultsArgs.list, '-g')
      : command.concat(defaultsArgs.list);

  // returns a Promise
  return execute('npm', run, mode, directory, callback);
};

/**
 * search for packages
 */
exports.search = (opts, callback) => {
  const command = ['search'];
  const { directory, mode, pkgName } = opts;
  const defaults = ['--depth=0', '--json'];

  if (!pkgName) {
    return Promise.reject('npm[search] package name parameter must be given');
  }

  const run = [].concat(command, pkgName).concat(defaults);
  return execute('npm', run, mode, directory, callback);
};

exports.install = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const manager = require(path.resolve(__dirname, activeManager));
    const run = manager['install'].call(this, opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    throw new Error(error);
  }
};

exports.update = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const manager = require(path.resolve(__dirname, activeManager));
    const run = manager['update'].call(this, opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    throw new Error(error);
  }
};

exports.uninstall = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const manager = require(path.resolve(__dirname, activeManager));
    const run = manager['uninstall'].call(this, opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    throw new Error(error);
  }
};

// npm view [<@scope>/]<name>[@<version>]
exports.view = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const manager = require(path.resolve(__dirname, activeManager));
    const run = manager['view'].call(this, opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    throw new Error(error);
  }
};
