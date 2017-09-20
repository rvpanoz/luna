//run shell commands

const cp = require('child_process');
const exec = cp.exec;

const fs = require('fs');
const path = require('path');

exports.npmLs = function(cb) {
  const npm_ls = exec('npm ls -g --depth=0 --json', {
    maxBuffer: 1024 * 500
  }, (error, stderr, stdout) => {

  });

  npm_ls.stdout.on('data', (data) => {
    fs.writeFileSync(path.join(process.cwd(), 'test/modules.json'), data);
    cb(JSON.parse(data));
  });

  npm_ls.stderr.on('data', (err) => {
    throw new Error(err);
  });

  npm_ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
