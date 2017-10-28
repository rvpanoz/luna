/**
* Run shell commands
* npm [cmd] [[<@scope>/]<pkg> ...]
**/

'use strict';

const cp = require('child_process');
const Q = require("q");
const spawn = cp.spawn;
const defaults = ['--depth=0', '--json'];

import {parse, isArray} from './utils';

function runCommand(command, callback) {
  const deferred = Q.defer();
  const cwd = process.cwd();
  let result = '';

  if (!command || typeof command !== 'object') {
    return Q.reject(new Error("shell[doCommand]:cmd must be given and must be an array"));
  }

  console.log(`running: npm ${command.join(" ")}`);
  let npmc = spawn('npm', command, {
    stdio: ['pipe', 'pipe', 'pipe'],
    encoding: 'utf8'
  });

  let errors = 0;

  npmc.stdout.on('data', (data) => {
    let dataToString = data.toString();
    result += dataToString;
  });

  npmc.stderr.on('data', (error) => {
    console.log(error);
    let errorToString = error.toString();
    callback(errorToString, null, 'error');
  });

  npmc.on('close', () => {
    console.log(`finish: npm ${command.join(' ')}`);
    deferred.resolve({
      data: result,
      status: 'close',
      cmd: command[0]
    });
  });

  return deferred.promise;
}

exports.doCommand = function(options, callback) {
  let opts = options || {};

  if (!opts.cmd) {
    throw new Error('shell[doCommand]: cmd parameter must given');
  }

  let run = [],
    params = [],
    args = [],
    pkgInfo = [];
  let pkgName = opts.pkgName;
  let pkgVersion = opts.pkgVersion;

  if (pkgName) {
    if (pkgVersion) {
      pkgInfo.push(pkgName + "@" + pkgVersion);
    } else {
      pkgInfo.push(pkgName);
    }
  }

  if (typeof opts.cmd === 'object') {
    for (let z = 0; z < opts.cmd.length; z++) {
      run.push(opts.cmd[z]);
    }
  } else {
    throw new Error('shell[doCommand]: cmd parameter must be given and must be an array');
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

  function combine() {
    let promises = [];
    run.forEach((cmd, idx) => {
      promises.push(function() {
        let command = [cmd].concat(pkgInfo).concat(params).concat(args);
        return runCommand(command, callback);
      }());
    });
    return promises;
  }

  Q.allSettled(combine()).then(function(results) {
    results.forEach(function(result) {
      if (result.state === "fulfilled") {
        callback(result.value.data, result.value.cmd, result.value.status);
      } else {
        let reason = result.reason;
        console.log(reason);
      }
    });
  });
}
