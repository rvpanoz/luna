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
  list: ['--json', '--depth=0', '--parseable']
};

const cwd = process.cwd();
const platform = os.platform();

const execute = (manager = defaultManager, commandArgs, mode, directory) => {
  const resultP = new Promise((resolve, reject) => {
    let result = '';
    let error = '';

    log(
      chalk.whiteBright.bgYellowBright.bold(
        `running: ${manager} ${commandArgs.join(' ')}`
      )
    );

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
        chalk.greenBright.bgWhiteBright.bold(
          `finished: ${manager} ${commandArgs.join(' ')}`
        )
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
 * */

exports.list = (options, callback) => {
  if (!callback || typeof callback !== 'function') {
    Promise.reject('callback must be given and must be a function');
  }

  const command = ['list'];
  const { mode, directory } = options || {};
  const commandArgs =
    mode === 'GLOBAL' ? [].concat(defaultsArgs.list, '-g') : defaultsArgs.list;
  const commandArgsReversed = commandArgs.reverse();
  const run = [].concat(command).concat(commandArgsReversed);

  // returns a Promise
  return execute('npm', run, mode, directory, callback);
};
