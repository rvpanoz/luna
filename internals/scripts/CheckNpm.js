const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = () => {
  if (!/npm-cli\.js$/.test(process.env.npm_execpath || '')) {
    console.warn(
      "\u001b[33mYou don't seem to be using npm. This could produce unexpected results.\u001b[39m"
    );

    return;
  }

  return exec('npm config list --json');
};
