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

const execute = (manager = defaultManager, commandArgs, mode, directory) => {
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
      result += String(data);
    });

    command.stderr.on('data', err => {
      error += String(err);
    });

    command.on('exit', code => {
      log(chalk.yellow.bold(`child exited with code ${code}`));
    });

    command.on('close', () => {
      log(
        chalk.greenBright.bold(`finished: ${manager} ${commandArgs.join(' ')}`)
      );

      const hasError = Boolean(error.length) ? error : null;
      const results = {
        error: hasError,
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
