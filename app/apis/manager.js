/* eslint-disable */

import cp from 'child_process';
import os from 'os';
import path from 'path';
import chalk from 'chalk';
import mk from '../mk';
import mapper from './mapper';
import { pick } from 'ramda';

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
const platform = os.platform();

const execute = (
  manager = defaultManager,
  commandArgs,
  mode,
  directory,
  callback
) => {
  const resultP = new Promise((resolve, reject) => {
    let result = '';
    let error = '';

    log(chalk.whiteBright.bold(`running: ${manager} ${commandArgs.join(' ')}`));

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
      result += `${String(data)}`;
      callback('flow', data);
    });

    command.stderr.on('data', err => {
      error += `${String(err)}`;
      callback('error', error);
    });

    command.on('exit', code => {
      log(chalk.yellow.bold(`child exited with code ${code}`));
    });

    command.on('close', () => {
      log(
        chalk.greenBright.bold(`finished: ${manager} ${commandArgs.join(' ')}`)
      );

      const results = {
        error,
        data: result,
        cmd: commandArgs,
        status: 'close'
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
  const command = 'list';
  const { mode, directory, manager } = options || {};

  if (!callback || typeof callback !== 'function') {
    Promise.reject(
      'manager[list]: callback must be given and must be a function'
    );
  }

  if (!mode || typeof mode !== 'string') {
    Promise.reject(
      'manager[list]: mode must be given and must be one of "GLOBAL" or "LOCAL"'
    );
  }

  const commandArgs =
    mode === 'GLOBAL' && !directory
      ? [].concat(command, defaultsArgs.list, '-g')
      : [].concat(command, defaultsArgs.list);

  const run = [].concat(commandArgs);

  // returns a Promise
  return execute('npm', run, mode, directory, callback);
};

/**
 * Outdated command
 * use npm
 */
exports.outdated = (options, callback) => {
  const command = 'outdated';
  const { mode, directory, manager } = options || {};

  if (!callback || typeof callback !== 'function') {
    Promise.reject(
      'manager[outdated]: callback must be given and must be a function'
    );
  }

  if (!mode || typeof mode !== 'string') {
    Promise.reject(
      'manager[outdated]: mode must be given and must be one of "GLOBAL" or "LOCAL"'
    );
  }

  const commandArgs =
    mode === 'GLOBAL' && !directory
      ? [].concat(command, defaultsArgs.list, '-g')
      : [].concat(command, defaultsArgs.list);

  const run = [].concat(commandArgs);

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

/**
 * install package
 */

exports.install = function(opts, callback) {
  const CMD = 'install';
  const {
    pkgName,
    mode,
    directory,
    pkgVersion,
    multiple,
    packages,
    activeManager
  } = opts;

  const mapperC = pick(['install'], mapper)[CMD].find(
    c => c.manager === activeManager
  );
  const command = [];
  const fn = `${activeManager}[${mapper.command}]`;

  if (mapperC) {
    command.push(mapperC.command);
  } else {
    return Promise.reject(`${activeManager}[ERROR]: cannot map command`);
  }

  const defaults = [],
    pkgOptions = opts.pkgOptions || [];

  if (!pkgName && !multiple) {
    return Promise.reject(`${fn}: package name parameter must be given`);
  }

  function getNames() {
    return multiple && packages && Array.isArray(packages)
      ? packages
      : pkgVersion
      ? `${pkgName}@${pkgVersion}`
      : pkgName;
  }

  const commandArgs = mode === 'GLOBAL' ? [].concat(defaults, '-g') : defaults;
  const commandOpts =
    pkgOptions && pkgOptions.length
      ? pkgOptions.map(option => `--${option}`)
      : [];

  const run = []
    .concat(command)
    .concat(commandArgs)
    .concat(getNames())
    .concat(commandOpts);

  return execute(activeManager, run, mode, directory, callback);
};

/**
 * uninstall package
 */
exports.uninstall = function(opts, callback) {
  const command = ['uninstall'];
  const { pkgName, mode, directory, multiple, packages } = opts;
  const defaults = [];

  function getNames() {
    if (multiple && packages && Array.isArray(packages)) {
      return packages;
    } else if (!pkgName && !multiple) {
      return Q.reject(
        new Error('npm[uninstall] package name parameter must be given')
      );
    } else {
      return pkgName;
    }
  }

  const commandArgs = mode === 'GLOBAL' ? [].concat(defaults, '-g') : defaults;
  const run = []
    .concat(command)
    .concat(commandArgs)
    .concat(getNames());
  return runCommand(run, directory, callback);
};
