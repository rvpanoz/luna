/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable compat/compat */
/* eslint-disable no-nested-ternary */

/**
 * npm install
 * @param {*} options
 * @param {*} idx
 */
const install = (options, idx) => {
  const command = ['install'];
  const {
    mode,
    version,
    name,
    pkgOptions,
    multiple,
    packages,
    single,
    packageJson
  } = options || {};

  // '--unsafe-perm use root'
  // '--ignore-scripts
  const defaults = ['--verbose'];

  // install from package.json file
  if (packageJson) {
    return command.concat(['--ignore-scripts']);
  }

  // attach -g option if mode is global
  const commandArgs = mode === 'global' ? [].concat(defaults, '-g') : defaults;

  let packagesToInstall;

  // handle installation of a single package
  if (single) {
    packagesToInstall = version ? [`${name}@${version}`] : [name];
  }

  // handle installation of multiple packages
  if (multiple && packages) {
    if (idx > -1 && packages.length > 1) {
      packagesToInstall = packages[idx];
    } else {
      packagesToInstall = packages;
    }
  }

  // get installation options
  const hasOptions = Array.isArray(pkgOptions) && pkgOptions.length;
  const commandOptions =
    mode === 'local' && hasOptions
      ? pkgOptions[idx].map(option => `--${option}`)
      : ['--save-prod'];

  // build running command
  const run = []
    .concat(command)
    .concat(packagesToInstall)
    .concat(commandOptions)
    .concat(commandArgs);

  console.log(run);
  return run;
};

export default install;
