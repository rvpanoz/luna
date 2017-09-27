//run shell commands

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const spawn = cp.spawn;
const utils = require('./utils');
const NPM_COMMANDS = [
  'ls', 'view', 'uninstall', 'update'
];

exports.doCmd = function(options = {}, cb) {
  let o = options;
  let cmd, pkgName, parameters = '-g --depth=0';

  //list global modules if no cmd passed
  cmd = o.cmd || 'ls';

  // if (o.packageName && cmd !== 'list') {
  //   cmd += ' ' + o.packageName;
  // }
  //
  // if(o.version) {
  //   cmd+=o.version;
  // }

  if (o.parameters) {
    parameters = o.parameters
  }

  // if (cmd !== 'uninstall') {
  //   cmd += '--json';
  // }

  const npm_exec = spawn(`npm ${cmd}`, [parameters]);

  npm_exec.stdout.on('data', (outout) => {
    console.log('stdout: ' + outout.toString());
    // if(utils.isJson(outout)) {
    //   cb(JSON.parse(outout));
    // } else {
    //   return null;
    // }
  });

  npm_exec.stderr.on('data', (err) => {
    console.log(err);
  });

  npm_exec.on('close', () => {
    console.log(arguments);
  });
}
