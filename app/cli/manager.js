/* eslint-disable compat/compat */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable global-require */
/* eslint-disable  no-nested-ternary */
/* eslint-disable  promise/catch-or-return */

import cp from 'child_process';
import path from 'path';
import chalk from 'chalk';
import log from 'electron-log';
import lockVerify from 'lock-verify';
import mk from '../mk';

const { spawn } = cp;
const { config } = mk;
const {
  defaultSettings: { defaultManager }
} = config;

const defaultsArgs = {
  list: ['--json', '--depth=0']
};

const cwd = process.cwd();

const execute = (
  manager = defaultManager,
  commandArgs = [],
  mode,
  directory
) => {
  const [operation] = commandArgs;

  const resultP = new Promise(resolve => {
    const result = [];
    let errors = '';

    log.info(
      chalk.whiteBright.bold(`running: ${manager} ${commandArgs.join(' ')}`)
    );

    // on windows use npm.cmd
    const command = spawn(
      /^win/.test(process.platform) ? `${manager}.cmd` : manager,
      commandArgs,
      {
        env: process.env,
        cwd:
          mode === 'local' && directory
            ? operation === 'init'
              ? path.resolve(directory)
              : path.dirname(directory)
            : cwd
      }
    );

    command.stdout.on('data', data => {
      const dataString = String(data);

      result.push(dataString);
    });

    command.stderr.on('data', error => {
      const errorString = String(error);

      errors += errorString;
    });

    command.on('exit', code => {
      log.info(chalk.yellow.bold(`child exited with code ${code}`));
    });

    command.on('close', () => {
      log.info(
        chalk.greenBright.bold(`finished: ${manager} ${commandArgs.join(' ')}`)
      );

      const resultString = result.join('');

      const commandResult = {
        status: 'close',
        errors,
        data: resultString,
        cmd: commandArgs
      };

      return resolve(commandResult);
    });
  });

  return resultP;
};

/**
 * npm list
 * @param {*} options
 * @param {*} callback
 */
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
 * npm outdated
 * @param {*} options
 * @param {*} callback
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
 * npm search
 * @param {*} opts
 * @param {*} callback
 */
const search = (opts, callback) => {
  const command = ['search'];
  const { directory, mode, pkgName } = opts || {};
  const defaults = ['--depth=0', '--json'];

  if (!pkgName) {
    return Promise.reject('npm[search] package name parameter must be given');
  }

  const run = command.concat(defaults, pkgName);

  return execute('npm', run, mode, directory, callback);
};

/**
 * npm install
 * @param {*} opts
 * @param {*} callback
 * @param {*} idx
 */
const install = (opts, callback, idx) => {
  const { mode, directory, activeManager = 'npm' } = opts || {};

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

/**
 * npm update
 * @param {*} opts
 * @param {*} callback
 */
const update = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts || {};

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

/**
 * npm uninstall
 * @param {*} opts
 * @param {*} callback
 */
const uninstall = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts || {};

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

/**
 * npm view
 * @param {*} opts
 * @param {*} callback
 */
const view = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts || {};

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

/**
 * npm audit
 * @param {*} opts
 * @param {*} callback
 */
const runAudit = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts || {};

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

/**
 * npm doctor
 * @param {*} opts
 * @param {*} callback
 */
const runDoctor = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts || {};

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

/**
 * npm prune
 * @param {*} opts
 * @param {*} callback
 */
const runPrune = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts || {};

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

/**
 * npm dedupe
 * @param {*} opts
 * @param {*} callback
 */
const runDedupe = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts || {};

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

/**
 *
 * @param {*} opts
 * @param {*} callback
 */
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

/**
 * npm cache clean
 * @param {*} opts
 * @param {*} callback
 */
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

/**
 * npm init
 * @param {*} opts
 * @param {*} callback
 */
const runInit = (opts, callback) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const init = require('./npm/tooling/init').default;

    if (typeof init === 'function') {
      const run = init(opts);

      return execute(activeManager, run, mode, directory, callback);
    }

    Promise.reject('cli:init is not defined');
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {*} opts
 */
const runLockVerify = opts => {
  const { directory } = opts || {};

  lockVerify(directory).then(result => {
    result.warnings.forEach(warning => console.error('Warning:', warning));

    if (!result.status) {
      result.errors.forEach(error => console.error(error));
    }

    return {
      status: 'close',
      errors: [],
      data: result,
      cmd: ['lockVerify']
    };
  });
};

export default {
  init: runInit,
  audit: runAudit,
  doctor: runDoctor,
  prune: runPrune,
  dedupe: runDedupe,
  verify: runVerify,
  clean: runClean,
  lockVerify: runLockVerify,
  list,
  outdated,
  search,
  install,
  update,
  uninstall,
  view
};
