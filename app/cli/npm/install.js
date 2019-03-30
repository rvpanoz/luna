/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable compat/compat */
/* eslint-disable no-nested-ternary */

/**
 * npm install [<@scope>/]<name>@<version>
 */

const install = (options, idx) => {
  const command = ['install'];
  const { mode, version, name, pkgOptions, multiple, packages, single } =
    options || {};
  const defaults = ['--ignore-scripts', '--verbose'];

  if (!packages && !multiple && !name) {
    return Promise.reject(
      'npm[install] package name or packages parameters must be given'
    );
  }

  const commandArgs = mode === 'global' ? [].concat(defaults, '-g') : defaults;
  const commandOptsSingle =
    pkgOptions && Array.isArray(pkgOptions)
      ? pkgOptions.map(option => `--${option}`)
      : null;
  const packagesToInstallSingle = version ? [`${name}@${version}`] : [name];

  let packagesToInstallMultiple = [];

  if (packages && Array.isArray(packages) && !name) {
    if (idx > -1 && packages.length > 1) {
      packagesToInstallMultiple = packages[idx];
    } else {
      packagesToInstallMultiple = packages;
    }
  } else {
    packagesToInstallMultiple = [name];
  }

  let commandOptsMultiple = [];

  if (pkgOptions && Array.isArray(pkgOptions)) {
    if (idx > -1 && pkgOptions.length > 1) {
      commandOptsMultiple = pkgOptions[idx].map(option => `--${option}`);
    } else {
      commandOptsMultiple = pkgOptions.map(option => `--${option}`);
    }
  }

  const runningCommandsOptions = single
    ? commandOptsSingle
    : commandOptsMultiple;

  const packagesToInstall = single
    ? packagesToInstallSingle
    : packagesToInstallMultiple;

  const run = []
    .concat(command)
    .concat(commandArgs)
    .concat(packagesToInstall)
    .concat(runningCommandsOptions);

  return run;
};

export default install;
