/**
* Run shell commands
* npm [cmd] [[<@scope>/]<pkg> ...]
**/

'use strict';

const cp = require('child_process');
const utils = require('./utils');
const Q = require("q");
const spawn = cp.spawn;
const defaults = ['--depth=0', '--json'];

const runCommand = function(command, callback) {
  const deferred = Q.defer();
  const cwd = process.cwd();

  if (!command || typeof command !== 'object') {
    return Q.reject(new Error("shell[doCommand]:cmd must be given and must be an array"));
  }

  let result = '';

  console.log(`running: npm ${command.join(" ")}`);
  let npmc = spawn('npm', command, {
    maxBuffer: 1024 * 500
  });

  npmc.stdout.on('data', (data) => {
    let dataToString = data.toString();
    result += dataToString;
  });

  npmc.stderr.on('data', (error) => {
    let errorToString = error.toString();
    callback(errorToString, 'error');
  });

  npmc.on('close', () => {
    console.log(`finish: npm ${command.join(' ')}`);
    deferred.resolve({
      data: result,
      status: 'close'
    });
  });

  return deferred.promise;
}

exports.doCommand = function(options, callback) {
  let opts = options || {};

  if (!opts.cmd) {
    throw new Error('shell[doCommand]: cmd parameter must given');
  }

  let run = [opts.cmd],
    params = [],
    args;
  let pkgName = opts.pkgName;
  let pkgVersion = opts.pkgVersion;

  if (pkgName) {
    if (pkgVersion) {
      pkgName += "@" + pkgVersion;
    }
    run.push(pkgName);
  }

  //setup params e.g -g, -long etc
  for (let z = 0; z < opts.params.length; z++) {
    let param = opts.params[z];
    params.push(`-${param}`);
  }

  //setup arguments e.g --depth, --json etc
  if (opts.arguments) {
    for (let z in opts.arguments) {
      let v = opts.arguments[z];
      args.push(`--${z}=${v}`);
    }
  } else {
    args = defaults.concat();
  }

  //try to execute the command
  let command = run.concat(params).concat(args);
  runCommand(command, callback).then((response) => {
    callback(response.data, response.status);
  }).catch((error) => {
    throw new Error(e);
  });
}
