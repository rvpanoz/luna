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
    cmd+=o.pkgName;
  }

  if(o.parameters) {
    cmd+=o.parameters;
  } else {
    cmd+='-g --depth=0';
  }

  //always return data in json format
  cmd+=' --json';

  const npm_exec = exec(`npm ${cmd}`, {
    maxBuffer: 1024 * 500
  }, (error, stderr, stdout) => {
    if(error) {
      throw new Error(error);
    }
  });

  npm_exec.stdout.on('data', (outout) => {
    if(cb) {
      cb(JSON.parse(outout));
    }
  });

  npm_exec.stderr.on('data', (err) => {
    throw new Error(err);
  });

  npm_exec.on('close', () => {
    console.log(`${cmd} finish execution.`);
  })
}

exports.npmInfo = function(packageName, cb) {
  const npm_info = exec(`npm info ${packageName} --json`, {
    maxBuffer: 1024 * 500
  }, (error, stderr, stdout) => {

  });

  npm_info.stdout.on('data', (data) => {
    cb(JSON.parse(data));
  });

  npm_info.stderr.on('data', (err) => {
    throw new Error(err);
  });

  npm_info.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

exports.npmLs = function(cb) {
  const npm_ls = exec('npm ls -g --depth=0 --json', {
    maxBuffer: 1024 * 500
  }, (error, stderr, stdout) => {

  });

  npm_ls.stdout.on('data', (data) => {
    cb(JSON.parse(data));
  });

  npm_ls.stderr.on('data', (err) => {
    throw new Error(err);
  });

  npm_ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
