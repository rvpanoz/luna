/* eslint-disable */

import cp from 'child_process';
import os from 'os';
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
      callback('flow', error, data);
    });

    command.stderr.on('data', err => {
      // mark with -eor- (end of error) in order to split with that in renderer
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
 * Uninstall/remove command
 */
exports.uninstall = function(opts, callback) {
  const { pkgName, mode, directory, multiple, packages, manager } = opts;
  const command = manager === 'yarn' ? ['remove'] : ['uninstall'];
  const defaults = [];

  function getNames() {
    if (multiple && packages && Array.isArray(packages)) {
      return packages;
    } else if (!pkgName && !multiple) {
      Promise.reject('manager[uninstall] package name parameter must be given');
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
