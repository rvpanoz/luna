/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable global-require */
/* eslint-disable compat/compat */

import cp from 'child_process';
import path from 'path';
import chalk from 'chalk';
import { Observable } from 'rxjs'

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

const execute = ({ manager = defaultManager, commandArgs = [], mode, directory, packageJson }) => {
  const [operation] = commandArgs;
  const isLocal = mode === 'local' && directory;

  const result$ = new Observable((observer) => {
    const result = [];
    let errors = '';

    console.log(
      chalk.blueBright.bold(`running: ${manager} ${commandArgs.join(' ')}`)
    );

    try {
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

        // emit flow data
        observer.next({
          status: 'flow',
          data: result
        })
      });

      command.stderr.on('data', error => {
        const errorString = String(error);

        errors += errorString
      });

      command.on('exit', code => {
        console.log(chalk.yellowBright.bold(`child exited with code ${code}`));
      });

      command.on('close', () => {
        console.log(
          chalk.greenBright.bold(`finished: ${manager} ${commandArgs.join(' ')}`)
        );

        // emit result data
        observer.next({
          status: 'close',
          errors,
          data: result.join(''),
          cmd: commandArgs,
          packageJson: Boolean(packageJson),
          initDirectory: isLocal && operation === 'init' ? path.join(directory, 'package.json') : null
        })

        observer.complete()
      });
    } catch (error) {
      observer.error(error)
    }

  })

  return result$;
}

/**
 * npm list
 * @param {*} options
 */
const list = (options) => {
  const command = ['list'];
  const { mode, directory } = options || {};

  const run = mode === 'global' && !directory
    ? command.concat(defaultsArgs.list, ['-g'])
    : command.concat(defaultsArgs.list);

  const params = {
    activeManager: 'npm',
    commandArgs: run,
    mode,
    directory
  }

  return execute(params);
}

/**
 * npm outdated
 * @param {*} options
 */
const outdated = (options) => {
  const command = ['outdated'];
  const { mode, directory } = options || {};

  const run =
    mode === 'global' && !directory
      ? command.concat(defaultsArgs.list, ['-g'])
      : command.concat(defaultsArgs.list);

  const params = {
    activeManager: 'npm',
    commandArgs: run,
    mode,
    directory
  }

  return execute(params)
};

/**
 * npm search
 * @param {*} options
 */
const search = (options) => {
  const command = ['search'];
  const { directory, mode, pkgName } = options || {};
  const defaults = ['--depth=0', '--json'];

  if (!pkgName) {
    throw new Error('npm[search] package name parameter must be given');
  }

  try {
    const run = command.concat(defaults, pkgName);

    const params = {
      activeManager: 'npm',
      commandArgs: run,
      mode,
      directory
    }

    return execute(params);
  } catch (error) {
    throw new Error(error)
  }
};

/**
 * npm install
 * @param {*} opts
 * @param {*} idx
 */
const install = (options, idx) => {
  const { mode, directory, packageJson, activeManager = 'npm' } = options || {};

  try {
    const runInstall = require('./npm/install').default;
    const run = runInstall(options, idx);

    const params = {
      activeManager,
      commandArgs: run,
      mode,
      directory,
      packageJson
    }

    return execute(params);
  } catch (error) {
    throw new Error(error)
  }
};

/**
 * npm update
 * @param {*} options
 */
const update = (options) => {
  const { mode, directory, activeManager = 'npm' } = options || {};

  try {
    const runUpdate = require('./npm/update').default;
    const run = runUpdate(options);

    const params = {
      activeManager,
      commandArgs: run,
      mode,
      directory
    }

    return execute(params);
  } catch (error) {
    throw new Error(error)
  }
};

/**
 * npm uninstall
 * @param {*} options
 */
const uninstall = (options) => {
  const { mode, directory, activeManager = 'npm' } = options || {};

  try {
    const runUninstall = require('./npm/uninstall').default;
    const run = runUninstall(options);

    const params = {
      activeManager,
      commandArgs: run,
      mode,
      directory
    }

    return execute(params);
  } catch (error) {
    throw new Error(error)
  }
};

/**
 * npm view
 * @param {*} options
 */
const view = options => {
  const { mode, directory, activeManager = 'npm' } = options || {};

  try {
    const runView = require('./npm/view').default;
    const run = runView(options);

    const params = {
      activeManager,
      commandArgs: run,
      mode,
      directory
    }

    return execute(params);
  } catch (error) {
    throw new Error(error)
  }
};

/**
 * npm audit
 * @param {*} options
 */
const runAudit = (options) => {
  const { activeManager = 'npm', mode, directory } = options || {};

  try {
    const audit = require('./npm/audit').default;
    const run = audit(options);

    const params = {
      activeManager,
      commandArgs: run,
      mode,
      directory
    }

    return execute(params);
  } catch (error) {
    throw new Error(error)
  }
};

/**
 * npm doctor
 * @param {*} options
 */
const runDoctor = (options) => {
  const { mode, directory, activeManager = 'npm' } = options || {};

  try {
    const doctor = require('./npm/doctor').default;
    const run = doctor(options);

    const params = {
      activeManager,
      commandArgs: run,
      mode,
      directory
    }

    return execute(params);
  } catch (error) {
    throw new Error(error)
  }
};

/**
 * npm init
 * @param {*} options
 */
const runInit = (options) => {
  const { mode, directory, activeManager = 'npm' } = options;

  try {
    const init = require('./npm/tooling/init').default;
    const run = init(options);

    const params = {
      activeManager,
      commandArgs: run,
      mode,
      directory
    }

    return execute(params);
  } catch (error) {
    throw new Error(error)
  }
};

/**
 * npm dedupe
 * @param {*} options
 */
const runDedupe = (options) => {
  const { mode, directory, activeManager = 'npm' } = options;

  try {
    const dedupe = require('./npm/tooling/dedupe').default;
    const run = dedupe(options);

    const params = {
      activeManager,
      commandArgs: run,
      mode,
      directory
    }

    return execute(params);
  } catch (error) {
    throw new Error(error)
  }
};

/**
 * npm cache
 * @param {*} options
 */
const runCache = (params) => {
  const { mode, directory, action, activeManager = 'npm' } = params;
  let cacheAction;

  try {
    switch (action) {
      case 'verify':
        cacheAction = require('./npm/tooling/verify').default;
        break;
      default:
        cacheAction = require('./npm/tooling/verify').default;
    }

    const run = cacheAction(params);
    const parameters = {
      activeManager,
      commandArgs: run,
      mode,
      directory
    }

    return execute(parameters);
  } catch (error) {
    throw new Error(error)
  }
};

export default {
  init: runInit,
  audit: runAudit,
  doctor: runDoctor,
  dedupe: runDedupe,
  cache: runCache,
  list,
  outdated,
  search,
  install,
  update,
  uninstall,
  view
};
