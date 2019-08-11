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
    packageJson,
    packageLock
  } = options || {};
  console.log(packageJson)
  // '--unsafe-perm'
  const defaults = ['--verbose', '--no-audit'];

  // install from package.json file
  // if (packageJson) {
  //   return command.concat(['--ignore-scripts']);
  // }

  // create package-lock.json file
  if (packageLock) {
    return command.concat(['--package-lock-only']);
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
  const commandOptions = mode === 'local' && hasOptions ? multiple
    ? pkgOptions[idx].map(option => `--${option}`)
    : pkgOptions.map(option => `--${option}`)
    : ['--save-prod'];

  // build running command
  const run = packageJson ? [].concat(command).concat(commandArgs) : []
    .concat(command)
    .concat(packagesToInstall)
    .concat(commandOptions)
    .concat(commandArgs);

  return run;
};

export default install;
