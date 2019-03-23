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
  const defaults = [];

  if (!packages && !multiple && !name) {
    return Promise.reject('npm[install] package name parameter must be given');
  }

  const getNames = () => {
    if (single) {
      return version ? [`${name}@${version}`] : [name];
    }

    if (multiple && Array.isArray(packages[idx])) {
      return packages[idx];
    }

    return version ? [`${packages[0]}@${version}`] : packages;
  };

  const commandArgs = mode === 'global' ? [].concat(defaults, '-g') : defaults;
  const commandOpts =
    (single
      ? pkgOptions
      : pkgOptions && [pkgOptions[idx]].map(option => `--${option}`)) || [];

  const run = []
    .concat(command)
    .concat(commandArgs)
    .concat(getNames())
    .concat(commandOpts);

  return run;
};

export default install;
