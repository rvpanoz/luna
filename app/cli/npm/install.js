/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable compat/compat */
/* eslint-disable no-nested-ternary */

/**
 * npm install [<@scope>/]<name>@<version>
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
  const defaults = ['--ignore-scripts', '--verbose'];

  if (!packages && !multiple && !name && !packageJson) {
    return Promise.reject(
      'npm[install] package name or packages parameters must be given'
    );
  }

  if (packageJson) {
    return command.concat(defaults);
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

  let commandOptsMultiple = ['save-prod'];
  const [commandFlags] = pkgOptions;

  if (Array.isArray(commandFlags)) {
    commandOptsMultiple = pkgOptions[idx].map(option => `--${option}`);
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
