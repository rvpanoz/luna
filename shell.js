//run shell commands

const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const exec = cp.exec;
const utils = require('./utils');

exports.doCmd = function(options = {}, cb) {
  let o = options;
  let cmd, pkgName, parameters;

  //list global modules if no cmd passed
  cmd = o.cmd || 'ls ';

  if (o.packageName && cmd !== 'ls') {
    cmd += ' ' + o.packageName;
  }

  if(o.version) {
    cmd+=o.version;
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
    if(utils.isJson(outout)) {
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
