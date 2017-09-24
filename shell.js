//run shell commands

const cp = require('child_process');
const exec = cp.exec;

const fs = require('fs');
const path = require('path');

const NPM_COMMANDS = [
  'ls', 'info'
];

exports.doCmd = function(options = {}, cb) {
  let o = options;
  let cmd, pkgName, parameters;

  //list global modules if no cmd passed
  cmd = o.cmd || 'ls ';

  if(o.pkgName && cmd !== 'ls') {
    cmd+= ' ' + o.pkgName;
  }

  if(o.parameters) {
    cmd+=' ' + o.parameters;
  } else {
    cmd+=' -g --depth=0';
  }

  if(cmd !== 'uninstall') {
    //always return data in json format
    cmd+=' --json';
  }

  const npm_exec = exec(`npm ${cmd}`, {
    maxBuffer: 1024 * 500
  }, (error, stderr, stdout) => {
    if(error) {
      throw new Error(error);
    }
  });

  npm_exec.stdout.on('data', (outout) => {
    try {
      let jsonData = JSON.parse(outout);
      cb(JSON.parse(jsonData));
    } catch (e) {
      console.log(e);
    } finally {
      cb();
    }
  });

  npm_exec.stderr.on('data', (err) => {
    throw new Error(err);
  });

  npm_exec.on('close', () => {
    console.log(`${cmd} finish execution.`);
  })
}
