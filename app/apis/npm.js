/* eslint-disable func-names */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-else-return */

// NPM cli commands

import { merge } from 'ramda';
import cp from 'child_process';
import Q from 'q';
import path from 'path';
import chalk from 'chalk';
import { fetchStats } from './github';
import mk from '../mk';

const { spawn } = cp;
const log = console.log;

mk.logToFile = false;

/**
 *
 * @param {*} command
 * @param {*} directory
 * @param {*} callback
 * @param {*} opts
 * @dir: '/home/rvpanoz/Projects/electron/luna-test/package.json'
 */

// TODO: dev
const __directory = path.join(
  'C:/projects/',
  'agile/luna-test/',
  'package.json'
);

function runCommand(command, directory = __directory, callback, opts) {
  log(chalk.red.bold(`running: npm ${command.join(' ')}`));

  const deferred = Q.defer();
  const cwd = process.cwd();
  const { repo, pkgName, latest } = opts || {};
  let result = '';
  let error = '';

  // on windows use npm.cmd
  const npmc = spawn(
    /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
    command,
    {
      env: process.env,
      cwd: directory ? path.dirname(directory) : cwd
    }
  );

  npmc.stdout.on('data', data => {
    const dataToString = data.toString();

    result += dataToString;
    callback('stdout', command, dataToString);
  });

  npmc.stderr.on('data', err => {
    const errorToString = err.toString();

    error += `${errorToString} | `;
    callback('error', command, errorToString);
  });

  npmc.on('exit', code => {
    log(chalk.white.bold(`child exited with code ${code}`));
  });

  npmc.on('close', () => {
    log(chalk.green.bold(`finished: npm ${command.join(' ')}`));

    const results = {
      status: 'close',
      error: error.length ? error : null,
      data: result,
      cmd: command,
      latest
    };

    deferred.resolve(results);
  });

  return deferred.promise;
}

// npm list [[<@scope>/]<pkg> ...]
exports.list = function(opts, callback) {
  const command = ['list'];
  const { mode, directory } = opts;
  const defaults = ['--long', '--json', '--depth=0', '--parseable'];

  if (!callback || typeof callback !== 'function') {
    return Q.reject(
      new Error(
        'npm[list] callback parameter must be given and must be a function'
      )
    );
  }

  const commandArgs = mode === 'GLOBAL' ? [].concat(defaults, '-g') : defaults;
  const run = [].concat(command).concat(commandArgs.reverse());
  return runCommand(run, directory, callback);
};

// npm outdated [[<@scope>/]<pkg> ...]
exports.outdated = function(opts, callback) {
  const command = ['outdated'];
  const { mode, directory } = opts;
  const defaults = ['--depth=0', '--json'];

  if (!callback || typeof callback !== 'function') {
    return Q.reject(
      new Error(
        'npm[outdated] callback parameter must be given and must be a function'
      )
    );
  }

  const commandArgs = mode === 'GLOBAL' ? [].concat(defaults, '-g') : defaults;
  const run = [].concat(command).concat(commandArgs);
  return runCommand(run, directory, callback);
};

// npm view [<@scope>/]<name>[@<version>]
exports.view = function(opts, callback) {
  const command = ['view'];
  const { mode, directory, pkgName, pkgVersion, repo, latest } = opts;
  const defaults = ['--depth=0', '--json'];

  if (!pkgName) {
    return Q.reject(
      new Error('npm[view] package name parameter must be given')
    );
  }

  const commandArgs = mode === 'GLOBAL' ? [].concat(defaults, '-g') : defaults;

  // build npm command
  const run = []
    .concat(command)
    .concat(pkgVersion ? [].concat([`${pkgName}@${pkgVersion}`]) : [pkgName])
    .concat(commandArgs);

  return runCommand(run, directory, callback, {
    repo,
    pkgName,
    latest,
    fetchGithub: opts && opts.fetchGithub
  });
};

// npm search [-l|--long] [--json]
exports.search = function(opts, callback) {
  const command = ['search'];
  const { pkgName } = opts;
  const defaults = ['--depth=0', '--json'];

  if (!pkgName) {
    return Q.reject(
      new Error('npm[search] package name parameter must be given')
    );
  }

  const run = [].concat(command, pkgName).concat(defaults);
  return runCommand(run, null, callback);
};

// npm install [<@scope>/]<name>@<version>
exports.install = function(opts, callback) {
  const command = ['install'];
  const {
    pkgName,
    mode,
    directory,
    pkgVersion,
    multiple,
    packages,
    pkgOptions = []
  } = opts;
  const defaults = [];

  if (!pkgName && !multiple) {
    return Q.reject(
      new Error('npm[install] package name parameter must be given')
    );
  }

  function getNames() {
    return multiple && packages && Array.isArray(packages)
      ? packages
      : pkgVersion
      ? `${pkgName}@${pkgVersion}`
      : pkgName;
  }

  const commandArgs = mode === 'GLOBAL' ? [].concat(defaults, '-g') : defaults;
  const commandOpts =
    pkgOptions && pkgOptions.length
      ? pkgOptions.map(option => `--${option}`)
      : [];

  const run = []
    .concat(command)
    .concat(commandArgs)
    .concat(getNames())
    .concat(commandOpts);

  return runCommand(run, directory, callback);
};

// npm uninstall [<@scope>/]<pkg>[@<version>]
exports.uninstall = function(opts, callback) {
  const command = ['uninstall'];
  const { pkgName, mode, directory, multiple, packages } = opts;
  const defaults = [];

  function getNames() {
    if (multiple && packages && Array.isArray(packages)) {
      return packages;
    } else if (!pkgName && !multiple) {
      return Q.reject(
        new Error('npm[uninstall] package name parameter must be given')
      );
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
