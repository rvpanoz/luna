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

exports.list = function(pkgName, scope='-g', options, cb) {
  const cmd = 'ls';
  let opts = options || ['--depth=0', '--json'];
  let params = [];

  if(pkgName) {
    params.push(pkgName);
  }

  params.push(scope);
  let npmc = spawn('npm', [cmd].concat(params).concat(opts), {
    maxBuffer: 1024 * 500
  });

  npmc.stdout.on('data', (data) => {
    cb(data.toString());
  });
  npmc.stderr.on('data', (data) => {
    cb(data.toString());
  });
  npmc.on('close', () => {
    console.log(`npm ${cmd} finished execution`);
  });
}

exports.install = function(pkgName, options, cb) {
  const cmd = 'install';
  let opts = [];

  let pkgversion = opts.push(`${pkgName}@${options.version || '@latest'}`);
  let scope = opts.push(options.scope || '-g');
  let env, params = [], result = '';

  opts.push('--json');
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

exports.uninstall = function(pkgName, options, cb) {
  const cmd = 'uninstall';
  let opts = [];

  let pkgversion = opts.push(pkgName);
  let scope = opts.push(options.scope || '-g');
  let env, params = [], result = '';

  opts.push('--json');
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

exports.view = function(pkgName, options, cb) {
  const cmd = 'view';
  let opts = [];

  let pkgversion = opts.push(`${pkgName}@${options.version || '@latest'}`);
  let scope = opts.push(options.scope || '-g');
  let env, params = [], result = '';

  opts.push('--json');
  let npmc = spawn('npm', [cmd].concat(opts), {
    maxBuffer: 1024 * 500
  });

  npmc.stdout.on('data', (data) => {
    cb('stdout', data.toString());
  });
  npmc.stderr.on('data', (data) => {
    cb('stderr', data.toString());
  });
  npmc.on('close', () => {
    console.log(`npm ${cmd} finished execution`);
  });
}
