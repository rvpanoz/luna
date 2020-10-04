import cp from 'child_process';
import path from 'path';
import chalk from 'chalk';
import { Observable } from 'rxjs';

import mk from '../mk';

const { spawn } = cp;
const cwd = process.cwd();
const {
  defaultSettings: { defaultManager },
} = mk || {};

const defaultsArgs = {
  list: ['--json', '--depth=0'],
  operation: ['--no-audit', '--ignore-scripts', '--verbose'],
};

/**
 * Uses spawn to spawn a new child process to run npm commands
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
  const isInitDirectory = Boolean(isLocal && operation === 'init');

  const result$ = new Observable((observer) => {
    const result = [];
    let errors = '';

    const initDirectory = isInitDirectory
      ? path.join(directory, 'package.json')
      : null;

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
      const command = spawn(
        /^win/.test(process.platform) ? `${manager}.cmd` : manager,
        commandArgs,
        {
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

        observer.next({
          status: 'close',
          errors,
          initDirectory,
          cmd: commandArgs,
          packageJson: Boolean(packageJson),
          data: result.join(''),
        });

        observer.complete();
      });
    } catch (error) {
      observer.error(error);
    }
  });

  return result$;
};

const list = (options) => {
  const command = ['list'];
  const { mode, directory } = options || {};

  const commandArgs =
    mode === 'global' && !directory
      ? command.concat(defaultsArgs.list, ['-g'])
      : command.concat(defaultsArgs.list);

  const params = {
    commandArgs,
    mode,
    directory,
  };

  return execute(params);
};

const outdated = (options) => {
  const command = ['outdated'];
  const { mode, directory } = options || {};

  const commandArgs =
    mode === 'global' && !directory
      ? command.concat(defaultsArgs.list, ['-g'])
      : command.concat(defaultsArgs.list);

  const params = {
    commandArgs,
    mode,
    directory,
  };

  return execute(params);
};

const search = (options) => {
  const command = ['search'];
  const { directory, mode, pkgName } = options || {};

  if (!pkgName) {
    throw new Error('npm[search] package name parameter must be given');
  }

  try {
    const commandArgs = command.concat(defaultsArgs.list, pkgName);

    const params = {
      commandArgs,
      mode,
      directory,
    };

    return execute(params);
  } catch (error) {
    throw new Error(error);
  }
};

const install = (options, idx) => {
  const { mode, directory, packageJson, activeManager = 'npm' } = options || {};

  try {
    const command = ['install'];
    const {
      mode,
      version,
      name,
      pkgOptions,
      multiple,
      packages,
      single,
      packageJson,
      packageLock,
    } = options || {};

    // create package-lock.json file
    if (packageLock) {
      return command.concat(['--package-lock-only']);
    }

    // attach -g option if mode is global
    const args =
      mode === 'global'
        ? [].concat(defaultsArgs.operation, '-g')
        : defaultsArgs.operation;

    let packagesToInstall;

    // handle installation of a single package
    if (single) {
      packagesToInstall = version ? [`${name}@${version}`] : [name];
    }

    // handle installation of multiple packages
    if (multiple && packages) {
      if (idx > -1 && packages.length > 1) {
        packagesToInstall = packages[idx];
      } else {
        packagesToInstall = packages;
      }
    }

    // get installation options
    const hasOptions = Boolean(Array.isArray(pkgOptions) && pkgOptions.length);
    const commandOptions =
      mode === 'local' && hasOptions
        ? multiple
          ? pkgOptions[idx].map((option) => `--${option}`)
          : pkgOptions.map((option) => `--${option}`)
        : [];

    // build running command
    const commandArgs = packageJson
      ? [].concat(command).concat(args)
      : []
          .concat(command)
          .concat(packagesToInstall)
          .concat(commandOptions)
          .concat(args);

    const params = {
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

const update = (options) => {
  const { mode, directory, activeManager = 'npm' } = options || {};

  try {
    const command = ['update'];
    const { name, mode, pkgOptions, multiple, packages } = options || {};

    if (!name && !multiple) {
      throw new Error('npm[update] package name parameter must be given');
    }

    function getNames() {
      return multiple && packages && Array.isArray(packages)
        ? packages
        : name.trim();
    }

    const args =
      mode === 'global'
        ? [].concat(defaultsArgs.operation, '-g')
        : defaultsArgs.operation;
    const commandOpts =
      pkgOptions && pkgOptions.length
        ? pkgOptions.map((option) => `--${option}`)
        : [];

    const commandArgs = []
      .concat(command)
      .concat(getNames())
      .concat(args)
      .concat(commandOpts);

    const params = {
      commandArgs,
      mode,
      directory,
    };

    return execute(params);
  } catch (error) {
    throw new Error(error);
  }
};

const uninstall = (options) => {
  const { mode, directory, activeManager = 'npm' } = options || {};

  try {
    const command = ['uninstall'];
    const { name, mode, multiple, packages } = options;

    function getNames() {
      if (multiple && Array.isArray(packages)) {
        return packages.filter((pkgName) => pkgName !== 'npm'); // do not uninstall npm :)
      }

      return name;
    }

    const args =
      mode === 'global'
        ? [].concat(defaultsArgs.operation, '-g')
        : defaultsArgs.operation;
    const commandArgs = [].concat(command).concat(args).concat(getNames());

    const params = {
      commandArgs,
      mode,
      directory,
    };

    return execute(params);
  } catch (error) {
    throw new Error(error);
  }
};

const view = (options) => {
  const { mode, directory, activeManager = 'npm' } = options || {};

  try {
    const command = ['view'];
    const { mode, name, version } = options || {};

    if (!name) {
      throw new Error('npm[view] package name parameter must be given');
    }

    const args =
      mode === 'global'
        ? [].concat(defaultsArgs.list, '-g')
        : defaultsArgs.list;
    const commandArgs = []
      .concat(command)
      .concat(version ? [].concat([`${name}@${version}`]) : [name])
      .concat(args);

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

const runAudit = (options) => {
  const { activeManager = 'npm', mode, directory } = options || {};

  try {
    const command = ['audit'];
    const commandOptions = [];
    const {
      options: { flag },
    } = options || {};

    if (flag) {
      const argv = flag === 'fix' ? flag : `fix --${flag}`;
      commandOptions.push(argv);
    }

    const commandArgs = command
      .concat(commandOptions)
      .concat(defaultsArgs.list);

    const params = {
      commandArgs,
      mode,
      directory,
    };

    return execute(params);
  } catch (error) {
    throw new Error(error);
  }
};

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
