/* eslint-disable */

import path from 'path';
import Q from 'q';
import chalk from 'chalk';

const { log } = console;

const run = (command, directory, callback, opts) => {
  log(chalk.red.bold(`running: ${activeManager} ${command.join(' ')}`));

  const { activeManager = 'npm' } = opts || {};
  const deferred = Q.defer();
  const cwd = process.cwd();
  let result = '';
  let error = '';

  // on windows use npm.cmd or yarn.cmd
  const c = spawn(
    /^win/.test(process.platform) ? `${activeManager}.cmd` : activeManager,
    command,
    {
      env: process.env,
      cwd: directory ? path.dirname(directory) : cwd
    }
  );

  c.stdout.on('data', data => {
    const dataToString = data.toString();

    result += dataToString;
    callback('stdout', command, dataToString);
  });

  c.stderr.on('data', err => {
    const errorToString = err.toString();

    error += `${errorToString} | `;
    callback('error', command, errorToString);
  });

  c.on('exit', code => {
    log(chalk.white.bold(`child exited with code ${code}`));
  });

  c.on('close', () => {
    log(chalk.green.bold(`finished: npm ${command.join(' ')}`));

    const results = {
      status: 'close',
      error: error.length ? error : null,
      data: result,
      cmd: command
    };

    deferred.resolve(results);
  });

  return deferred.promise;
};

export default run;
