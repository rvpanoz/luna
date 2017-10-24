/**
* Run shell commands
* npm [cmd] [[<@scope>/]<pkg> ...]
**/

'use strict';

const cp = require('child_process');
const utils = require('./utils');
const spawn = cp.spawn;
const defaults = ['--depth=0', '--json'];

exports.doCommand = (options, callback) => {
  const opts = options || {};
  const cmd = opts.cmd;


  const execute = (command, callback) => {
    console.log(`running: npm ${command.join(' ')}`);

    let result = '';
    let npmc = spawn('npm', command, {
      maxBuffer: 1024 * 500
    });

    npmc.stdout.on('data', (data) => {
      result += data.toString();
      let dataToString = data.toString();
      callback(dataToString, 'reply');
    });

    npmc.stderr.on('data', (error) => {
      let errorToString = error.toString();
      callback(errorToString, 'error');
    });

    npmc.on('close', () => {
      console.log(`finish: npm ${command.join(' ')}`);
      callback(result, 'close');
    });
  }

  if (!cmd) {
    throw new Error('Shell: Command is missing');
  }

  let run = [cmd],
    params = [],
    args = [];
  let pkgName = opts.pkgName;
  let pkgVersion = opts.pkgVersion;

  if (pkgName) {
    if (pkgVersion) {
      pkgName += "@" + pkgVersion;
    }
    run.push(pkgName);
  }

  if (opts.params) {
    opts.params.forEach((param, idx) => {
      params.push(`-${param}`);
    });
  }

  if (opts.arguments) {
    for (let z in opts.arguments) {
      let v = opts.arguments[z];
      args.push(`--${z}=${v}`);
    }
  } else {
    args = defaults.concat();
  }

  let command = run.concat(params).concat(args);
  execute(command, callback);
}
