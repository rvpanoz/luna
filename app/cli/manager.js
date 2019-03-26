/* eslint-disable */

import cp from 'child_process';
import path from 'path';
import chalk from 'chalk';
import mk from '../mk';

const { spawn, exec } = cp;
const { log } = console;
const { config } = mk;
const {
  defaultSettings: { defaultManager }
} = config;

// default arguments
const defaultsArgs = {
  list: ['--json', '--depth=0', '--parseable']
};

// current working directory
const cwd = process.cwd();

const execute = (
  manager = defaultManager,
  commandArgs = [],
  mode,
  directory,
  callback
) => {
  const resultP = new Promise(resolve => {
    const result = [];
    let errors = '';

    log(chalk.whiteBright.bold(`running: ${manager} ${commandArgs.join(' ')}`));
    callback('flow', `${manager} ${commandArgs.join(' ')}`);

    // on windows use npm.cmd
    const command = cp.spawn(
      /^win/.test(process.platform) ? `${manager}.cmd` : manager,
      commandArgs,
      {
        env: process.env,
        cwd: mode === 'local' && directory ? path.dirname(directory) : cwd
      }
    );

    command.stdout.on('data', data => {
      result.push(String(data));
    });

    command.stderr.on('data', error => {
      errors += String(error);
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

const list = (options, callback) => {
  const command = ['list'];
  const { mode, directory, linked } = options || {};

  if (!callback || typeof callback !== 'function') {
    return Promise.reject(
      'manager[list]: callback must be given and must be a function'
    );
  }

  if (!mode || typeof mode !== 'string') {
    return Promise.reject(
      'manager[list]: mode must be given and must be one of "global" or "local"'
    );
  }

  const run =
    mode === 'global' && !directory
      ? linked
        ? command.concat(defaultsArgs.list, ['--link', '-g'])
        : command.concat(defaultsArgs.list, ['-g'])
      : command.concat(defaultsArgs.list);

  // returns a Promise
  return execute('npm', run, mode, directory, callback);
};

/**
 * Outdated command
 * use npm
 */
const outdated = (options, callback) => {
  const command = ['outdated'];
  const { mode, directory } = options || {};

  if (!callback || typeof callback !== 'function') {
    return Promise.reject(
      'manager[outdated]: callback must be given and must be a function'
    );
  }

  if (!mode || typeof mode !== 'string') {
    return Promise.reject(
      'manager[outdated]: mode must be given and must be one of "global" or "local"'
    );
  }

  const run =
    mode === 'global' && !directory
      ? command.concat(defaultsArgs.list, ['-g'])
      : command.concat(defaultsArgs.list);

  // returns a Promise
  return execute('npm', run, mode, directory, callback);
};

/**
 * search for packages
 */
const search = (opts, callback) => {
  const command = ['search'];
  const { directory, mode, pkgName } = opts;
  const defaults = ['--depth=0', '--json'];

  if (!pkgName) {
    return Promise.reject('npm[search] package name parameter must be given');
  }

  const run = command.concat(defaults, pkgName);

  return execute('npm', run, mode, directory, callback);
};

const install = (opts, callback, idx) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const manager = require(path.resolve(__dirname, activeManager));
    const { install } = manager.default;
    const run = install(opts, idx);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
  }
};

const update = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const manager = require(path.resolve(__dirname, activeManager));
    const { update } = manager.default;
    const run = update(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
  }
};

const uninstall = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const manager = require(path.resolve(__dirname, activeManager));
    const { uninstall } = manager.default;
    const run = uninstall(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
  }
};

// npm view [<@scope>/]<name>[@<version>]
const view = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const manager = require(path.resolve(__dirname, activeManager));
    const { view } = manager.default;
    const run = view(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
  }
};

const runAudit = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const manager = require(path.resolve(__dirname, activeManager));
    const { audit } = manager.default;
    const run = audit(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    throw new Error(error);
  }
};

const runDoctor = (opts, callback) => {
  console.log('running npm doctor');
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const manager = require(path.resolve(__dirname, activeManager));
    console.log(manager);
    const { doctor } = manager.default;
    const run = doctor(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    throw new Error(error);
  }
};

const runPrune = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const manager = require(path.resolve(__dirname, activeManager));
    const { prune } = manager.default;
    const run = prune(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    throw new Error(error);
  }
};

const runLockVerify = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const manager = require(path.resolve(__dirname, activeManager));
    const { lockVerify } = manager.default;
    const run = lockVerify(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  audit: runAudit,
  doctor: runDoctor,
  prune: runPrune,
  lockVerify: runLockVerify,
  list,
  outdated,
  search,
  install,
  update,
  uninstall,
  view
};
