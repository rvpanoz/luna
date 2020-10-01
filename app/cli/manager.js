import cp from 'child_process';
import path from 'path';
import chalk from 'chalk';
import { Observable } from 'rxjs';

import mk from '../mk';

const { spawn } = cp;
const {
  defaultSettings: { defaultManager },
} = mk || {};

const defaultsArgs = {
  list: ['--json', '--depth=0'],
};

const cwd = process.cwd();

/**
 *
 * @param {*} manager
 * @param {*} commandArgs
 * @param {*} mode
 * @param {*} directory
 */

const execute = ({
  manager = defaultManager,
  commandArgs = [],
  mode,
  directory,
  packageJson,
}) => {
  const [operation] = commandArgs;
  const { NODE_ENV } = process.env;
  const isLocal = Boolean(mode === 'local' && directory);
  const isDevelopment = Boolean(NODE_ENV === 'development');

  const result$ = new Observable((observer) => {
    const result = [];
    let errors = '';

    if (isDevelopment) {
      console.log(
        chalk.blueBright.bold(`running: ${manager} ${commandArgs.join(' ')}`)
      );
    }

    observer.next({
      status: 'flow',
      message: `running: ${manager} ${commandArgs.join(' ')}`,
    });

    try {
      // on windows use npm.cmd
      const command = spawn(
        /^win/.test(process.platform) ? `${manager}.cmd` : manager,
        commandArgs,
        {
          shell: true,
          env: process.env,
          cwd: isLocal
            ? operation === 'init'
              ? path.resolve(directory)
              : path.dirname(directory)
            : cwd,
        }
      );

      command.stdout.on('data', (data) => {
        const dataString = String(data);
        result.push(dataString);
      });

      command.stderr.on('data', (error) => {
        const errorString = String(error);
        errors += errorString;
      });

      command.on('exit', (code) => {
        if (isDevelopment) {
          console.log(
            chalk.yellowBright.bold(`child exited with code ${code}`)
          );
        }
      });

      command.on('close', () => {
        if (isDevelopment) {
          console.log(
            chalk.greenBright.bold(
              `finished: ${manager} ${commandArgs.join(' ')}`
            )
          );
        }

        observer.next({
          status: 'flow',
          message: `finished: ${manager} ${commandArgs.join(' ')}`,
        });

        const initDirectory =
          isLocal && operation === 'init'
            ? path.join(directory, 'package.json')
            : null;

        observer.next({
          status: 'close',
          errors,
          data: result.join(''),
          cmd: commandArgs,
          packageJson: Boolean(packageJson),
          initDirectory,
        });

        observer.complete();
      });
    } catch (error) {
      observer.error(error);
    }
  });

  return result$;
};

/**
 * npm list
 * @param {*} options
 */
const list = (options) => {
  const command = ['list'];
  const { mode, directory } = options || {};

  const commandArgs =
    mode === 'global' && !directory
      ? command.concat(defaultsArgs.list, ['-g'])
      : command.concat(defaultsArgs.list);

  const params = {
    activeManager: 'npm',
    commandArgs,
    mode,
    directory,
  };

  return execute(params);
};

/**
 * npm outdated
 * @param {*} options
 */
const outdated = (options) => {
  const command = ['outdated'];
  const { mode, directory } = options || {};

  const commandArgs =
    mode === 'global' && !directory
      ? command.concat(defaultsArgs.list, ['-g'])
      : command.concat(defaultsArgs.list);

  const params = {
    activeManager: 'npm',
    commandArgs,
    mode,
    directory,
  };

  return execute(params);
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
    const commandArgs = command.concat(defaults, pkgName);

    const params = {
      activeManager: 'npm',
      commandArgs,
      mode,
      directory,
    };

    return execute(params);
  } catch (error) {
    throw new Error(error);
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
    const commandArgs = runInstall(options, idx);

    const params = {
      activeManager,
      commandArgs,
      mode,
      directory,
      packageJson,
    };

    return execute(params);
  } catch (error) {
    throw new Error(error);
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
    const commandArgs = runUpdate(options);

    const params = {
      activeManager,
      commandArgs,
      mode,
      directory,
    };

    return execute(params);
  } catch (error) {
    throw new Error(error);
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
    const commandArgs = runUninstall(options);

    const params = {
      activeManager,
      commandArgs,
      mode,
      directory,
    };

    return execute(params);
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * npm view
 * @param {*} options
 */
const view = (options) => {
  const { mode, directory, activeManager = 'npm' } = options || {};

  try {
    const runView = require('./npm/view').default;
    const commandArgs = runView(options);

    const params = {
      activeManager,
      commandArgs,
      mode,
      directory,
    };

    return execute(params);
  } catch (error) {
    throw new Error(error);
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
    const commandArgs = audit(options);

    const params = {
      activeManager,
      commandArgs,
      mode,
      directory,
    };

    return execute(params);
  } catch (error) {
    throw new Error(error);
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
    const commandArgs = doctor(options);

    const params = {
      activeManager,
      commandArgs,
      mode,
      directory,
    };

    return execute(params);
  } catch (error) {
    throw new Error(error);
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
    const commandArgs = init(options);

    const params = {
      activeManager,
      commandArgs,
      mode,
      directory,
    };

    return execute(params);
  } catch (error) {
    throw new Error(error);
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
    const commandArgs = dedupe(options);

    const params = {
      activeManager,
      commandArgs,
      mode,
      directory,
    };

    return execute(params);
  } catch (error) {
    throw new Error(error);
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

    const commandArgs = cacheAction(params);
    const parameters = {
      activeManager,
      commandArgs,
      mode,
      directory,
    };

    return execute(parameters);
  } catch (error) {
    throw new Error(error);
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
  view,
};
