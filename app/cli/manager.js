/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable global-require */
/* eslint-disable  promise/catch-or-return */
/* eslint-disable compat/compat */

import cp from 'child_process';
import path from 'path';
import chalk from 'chalk';
import lockVerify from 'lock-verify';
import mk from '../mk';

const { spawn } = cp;
const {
  defaultSettings: { defaultManager }
} = mk || {};

const defaultsArgs = {
  list: ['--json', '--depth=0']
};

const cwd = process.cwd();

/**
 *
 * @param {*} manager
 * @param {*} commandArgs
 * @param {*} mode
 * @param {*} directory
 */
const execute = (
  manager = defaultManager,
  commandArgs = [],
  mode,
  directory
) => {
  const [operation] = commandArgs;

  const resultP = new Promise(resolve => {
    const isLocal = mode === 'local' && directory;
    const result = [];
    let errors = '';

    console.log(
      chalk.blueBright.bold(`running: ${manager} ${commandArgs.join(' ')}`)
    );

    // on windows use npm.cmd
    const command = spawn(
      /^win/.test(process.platform) ? `${manager}.cmd` : manager,
      commandArgs,
      {
        env: process.env,
        cwd: isLocal
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
      console.log(chalk.yellowBright.bold(`child exited with code ${code}`));
    });

    command.on('close', () => {
      console.log(
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

  try {
    const run =
      mode === 'global' && !directory
        ? linked
          ? command.concat(defaultsArgs.list, ['--link', '-g'])
          : command.concat(defaultsArgs.list, ['-g'])
        : command.concat(defaultsArgs.list);

    // returns a Promise
    return execute('npm', run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
  }
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

  try {
    const run =
      mode === 'global' && !directory
        ? command.concat(defaultsArgs.list, ['-g'])
        : command.concat(defaultsArgs.list);

    // returns a Promise
    return execute('npm', run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
  }
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

  try {
    const run = command.concat(defaults, pkgName);

    return execute('npm', run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
  }
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
    const run = runInstall(opts, idx);

    return execute(activeManager, run, mode, directory, callback);
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
    const run = runUpdate(opts);

    return execute(activeManager, run, mode, directory, callback);
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
    const run = runUninstall(opts);

    return execute(activeManager, run, mode, directory, callback);
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
    const run = runView(opts);

    return execute(activeManager, run, mode, directory, callback);
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
  const { activeManager = 'npm', mode, directory, ...options } = opts || {};

  try {
    const audit = require('./npm/audit').default;
    const run = audit(options);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
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
    const doctor = require('./npm/doctor').default;
    const run = doctor(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
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
    const run = prune(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
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
    const run = dedupe(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
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
    const run = verify(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
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
    const run = clean(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
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
    const run = init(opts);

    return execute(activeManager, run, mode, directory, callback);
  } catch (error) {
    Promise.reject(error);
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
