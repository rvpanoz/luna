//run shell commands

'use strict';

const ipcRenderer = require('electron').ipcRenderer;
const cp = require('child_process');
const exec = cp.exec;
const spawn = cp.spawn;
const utils = require('./utils');

exports.search = function(pkgName, cb) {
  const cmd = 'search';
  if(!pkgName) {
    return;
  }
  let result = '';
  let npmc = spawn('npm', [cmd, pkgName, '--json'], {
    maxBuffer: 1024 * 500
  });

  npmc.stdout.on('data', (data) => {
    let dataStr = data.toString();
    result+=dataStr;
    cb('stdout', dataStr);
  });
  npmc.stderr.on('data', (data) => {
    cb('stderr', data.toString());
  });
  npmc.on('close', () => {
    cb('close', result);
    console.log(`npm ${cmd} ${pkgName} finished execution`);
  });
}

exports.list = function(options, cb) {
  const cmd = 'ls';
  let opts = options || ['-g', '--depth=0', '--json'];
  let env, result = '';

  switch (arguments.length) {
    case 1:
      let arg1 = arguments[0];
      if(typeof arg1 === 'function') {
        cb = arg1;
      } else {
        console.log('shell->list: Invalid parameters');
      }
      break;
    default:
  }

  let npmc = spawn('npm', [cmd].concat(opts), {
    maxBuffer: 1024 * 500
  });

  npmc.stdout.on('data', (data) => {
    result+=data;
    cb('stdout', data.toString());
  });
  npmc.stderr.on('data', (data) => {
    cb('stderr', data.toString());
  });
  npmc.on('close', () => {
    console.log(`npm ${cmd} finished execution`);
    cb('close', result);
  });
}

exports.ndoCmd = function(cb, parameters, options) {
  let params = parameters || '-g';
  let coptions = options || {};

  let result = '';
  let cmd = coptions.cmd || 'install';

  let opts = [cmd, params, 'asar@0.4.1 --depth=0', '--json'];

  let npmc = spawn('npm', opts, {
    maxBuffer: 1024 * 500
  });

  npmc.stdout.on('data', (data) => {
    console.log(data);
    result+=data;
  });

  npmc.stderr.on('data', (data) => {
    cb('stderr', data);
  });

  npmc.on('close', () => {
    cb('close', result);
    console.log('command terminated');
  });
}

exports.doCmd = function(options = {}, cb) {
  let o = options;
  let cmd, pkgName, parameters;

  //list global modules if no cmd passed
  cmd = o.cmd || 'ls ';

  if (o.packageName && cmd !== 'ls') {
    cmd += ' ' + o.packageName;
  }

  if (o.version) {
    cmd += o.version;
  }

  if (o.parameters) {
    cmd += ' ' + o.parameters;
  } else {
    cmd += ' -g --depth=0';
  }

  if (cmd !== 'uninstall') {
    //always return data in json format
    cmd += ' --json';
  }

  const npm_exec = exec(`npm ${cmd}`, {
    maxBuffer: 1024 * 500
  }, (error, stderr, stdout) => {
    if (error) {
      throw new Error(error);
    }
  });

  npm_exec.stdout.on('data', (outout) => {
    if (utils.isJson(outout)) {
      cb(JSON.parse(outout));
    } else {
      return null;
    }
  });

  npm_exec.stderr.on('data', (err) => {
    throw new Error(err);
  });

  npm_exec.on('close', () => {
    console.log(`${cmd} finish execution.`);
  });
}
