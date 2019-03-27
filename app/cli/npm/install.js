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
  const defaults = ['--ignore-scripts'];

  if (!packages && !multiple && !name) {
    return Promise.reject('npm[install] package name parameter must be given');
  }

  const commandArgs = mode === 'global' ? [].concat(defaults, '-g') : defaults;

  const commandOpts = single
    ? pkgOptions || []
    : pkgOptions && pkgOptions[idx].map(option => `--${option}`);

  const packagesToInstall = single
    ? version
      ? [`${name}@${version}`]
      : [name]
    : [packages[idx]];

  const run = []
    .concat(command)
    .concat(commandArgs)
    .concat(packagesToInstall.filter(pkg => pkg !== undefined))
    .concat(commandOpts);

  console.log(run);
  return run;
};

export default install;
