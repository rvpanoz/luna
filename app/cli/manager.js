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
  directory,
  packageJson,
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

      return resolve({
        status: 'close',
        errors,
        data: result.join(''),
        cmd: commandArgs,
        packageJson: Boolean(packageJson)
      });
    });
  });

  return resultP;
};

/**
 * npm list
 * @param {*} options
 */
const list = (options) => {
  const command = ['list'];
  const { mode, directory, linked } = options || {};

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
    return execute('npm', run, mode, directory);
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * npm outdated
 * @param {*} options
 */
const outdated = (options) => {
  const command = ['outdated'];
  const { mode, directory } = options || {};

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
    return execute('npm', run, mode, directory);
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * npm search
 * @param {*} opts
 */
const search = (opts) => {
  const command = ['search'];
  const { directory, mode, pkgName } = opts || {};
  const defaults = ['--depth=0', '--json'];

  if (!pkgName) {
    return Promise.reject('npm[search] package name parameter must be given');
  }

  try {
    const run = command.concat(defaults, pkgName);

    return execute('npm', run, mode, directory);
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * npm install
 * @param {*} opts
 * @param {*} idx
 */
const install = (opts, idx) => {
  const { mode, directory, packageJson, activeManager = 'npm' } = opts || {};

  try {
    const runInstall = require('./npm/install').default;
    const run = runInstall(opts, idx);

    return execute(activeManager, run, mode, directory, packageJson);
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * npm update
 * @param {*} opts
 */
const update = (opts) => {
  const { mode, directory, activeManager = 'npm' } = opts || {};

  try {
    const runUpdate = require('./npm/update').default;
    const run = runUpdate(opts);

    return execute(activeManager, run, mode, directory);
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * npm uninstall
 * @param {*} opts
 */
const uninstall = (opts) => {
  const { mode, directory, activeManager = 'npm' } = opts || {};

  try {
    const runUninstall = require('./npm/uninstall').default;
    const run = runUninstall(opts);

    return execute(activeManager, run, mode, directory);
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * npm view
 * @param {*} opts
 */
const view = (opts) => {
  const { mode, directory, activeManager = 'npm' } = opts || {};

  try {
    const runView = require('./npm/view').default;
    const run = runView(opts);

    return execute(activeManager, run, mode, directory);
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * npm audit
 * @param {*} opts
 */
const runAudit = (opts) => {
  const { activeManager = 'npm', mode, directory, ...options } = opts || {};

  try {
    const audit = require('./npm/audit').default;
    const run = audit(options);

    return execute(activeManager, run, mode, directory);
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * npm doctor
 * @param {*} opts
 */
const runDoctor = (opts) => {
  const { mode, directory, activeManager = 'npm' } = opts || {};

  try {
    const doctor = require('./npm/doctor').default;
    const run = doctor(opts);

    return execute(activeManager, run, mode, directory);
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * npm init
 * @param {*} opts
 */
const runInit = (opts) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const init = require('./npm/tooling/init').default;
    const run = init(opts);

    return execute(activeManager, run, mode, directory);
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * npm dedupe
 * @param {*} opts
 */
const runDedupe = (opts) => {
  const { mode, directory, activeManager = 'npm' } = opts;

  try {
    const dedupe = require('./npm/tooling/dedupe').default;
    const run = dedupe(opts);

    return execute(activeManager, run, mode, directory);
  } catch (error) {
    Promise.reject(error);
  }
};

export default {
  init: runInit,
  audit: runAudit,
  doctor: runDoctor,
  dedupe: runDedupe,
  list,
  outdated,
  search,
  install,
  update,
  uninstall,
  view
};
