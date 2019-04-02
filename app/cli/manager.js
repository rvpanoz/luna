/* eslint-disable */

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

// default arguments
const defaultsArgs = {
  list: ['--json', '--depth=0']
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
    const command = spawn(
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
      const errorString = String(error);

      errors += errorString;
      callback('error', String(errorString), null);
    });

    command.on('exit', code => {
      log(chalk.yellow.bold(`child exited with code ${code}`));
    });

    command.on('close', () => {
      log(
        chalk.greenBright.bold(`finished: ${manager} ${commandArgs.join(' ')}`)
      );

      const resultString = result.join('');

      const results = {
        status: 'close',
        errors,
        data: resultString,
        cmd: commandArgs
      };

      return resolve(results);
    });
  });

  return resultP;
};

/**
 * List command - use npm
 **/

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
 * Outdated command - use npm
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
 * search for packages - use npm
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
    const runInstall = require('./npm/install').default;

    if (typeof runInstall === 'function') {
      const run = runInstall(opts, idx);

      return execute(activeManager, run, mode, directory, callback);
    }

    Promise.reject('cli:install is not defined');
  } catch (error) {
    Promise.reject(error);
  }
};

const update = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const runUpdate = require('./npm/update').default;

    if (typeof runUpdate === 'function') {
      const run = runUpdate(opts);

      return execute(activeManager, run, mode, directory, callback);
    }

    Promise.reject('cli:update is not defined');
  } catch (error) {
    Promise.reject(error);
  }
};

const uninstall = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const runUninstall = require('./npm/uninstall').default;

    if (typeof runUninstall === 'function') {
      const run = runUninstall(opts);

      return execute(activeManager, run, mode, directory, callback);
    }

    Promise.reject('cli:uninstall is not defined');
  } catch (error) {
    Promise.reject(error);
  }
};

// npm view [<@scope>/]<name>[@<version>]
const view = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const runView = require('./npm/view').default;

    if (typeof runView === 'function') {
      const run = runView(opts);

      return execute(activeManager, run, mode, directory, callback);
    }

    Promise.reject('cli:view is not defined');
  } catch (error) {
    Promise.reject(error);
  }
};

const runAudit = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const audit = require('./npm/tooling/audit').default;

    if (typeof audit === 'function') {
      const run = audit(opts);

      return execute(activeManager, run, mode, directory, callback);
    }

    Promise.reject('cli:audit is not defined');
  } catch (error) {
    throw new Error(error);
  }
};

const runDoctor = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const doctor = require('./npm/tooling/doctor').default;

    if (typeof doctor === 'function') {
      const run = doctor(opts);

      return execute(activeManager, run, mode, directory, callback);
    }

    Promise.reject('cli:doctor is not defined');
  } catch (error) {
    throw new Error(error);
  }
};

const runPrune = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const prune = require('./npm/tooling/prune').default;

    if (typeof prune === 'function') {
      const run = prune(opts);

      return execute(activeManager, run, mode, directory, callback);
    }

    Promise.reject('cli:prune is not defined');
  } catch (error) {
    throw new Error(error);
  }
};

const runDedupe = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const dedupe = require('./npm/tooling/dedupe').default;

    if (typeof dedupe === 'function') {
      const run = dedupe(opts);

      return execute(activeManager, run, mode, directory, callback);
    }

    Promise.reject('cli:dedupe is not defined');
  } catch (error) {
    throw new Error(error);
  }
};

const runVerify = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const verify = require('./npm/tooling/verify').default;

    if (typeof verify === 'function') {
      const run = verify(opts);

      return execute(activeManager, run, mode, directory, callback);
    }

    Promise.reject('cli:verify is not defined');
  } catch (error) {
    throw new Error(error);
  }
};

const runClean = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const clean = require('./npm/tooling/clean').default;

    if (typeof clean === 'function') {
      const run = clean(opts);

      return execute(activeManager, run, mode, directory, callback);
    }

    Promise.reject('cli:clean is not defined');
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  audit: runAudit,
  doctor: runDoctor,
  prune: runPrune,
  dedupe: runDedupe,
  verify: runVerify,
  clean: runClean,
  list,
  outdated,
  search,
  install,
  update,
  uninstall,
  view
};
