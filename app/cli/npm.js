/**
 *
 * Npm module for npm cli commands
 */

/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable compat/compat */
/* eslint-disable no-nested-ternary */

/**
 * npm install [<@scope>/]<name>@<version>
 */
exports.install = (options, idx) => {
  const command = ['install'];
  const { mode, version = null, pkgOptions, multiple, packages } =
    options || {};
  const defaults = [];

  if (!packages && !multiple) {
    return Promise.reject('npm[install] package name parameter must be given');
  }

  const getNames = () => {
    if (multiple && Array.isArray(packages[idx])) {
      return packages[idx];
    }

    return version ? [`${packages[0]}@${version}`] : packages;
  };

  const commandArgs = mode === 'global' ? [].concat(defaults, '-g') : defaults;
  const commandOpts =
    pkgOptions && pkgOptions.length
      ? [pkgOptions[idx]].map(option => `--${option}`)
      : [];

  const run = []
    .concat(command)
    .concat(commandArgs)
    .concat(getNames())
    .concat(commandOpts);

  return run;
};

/**
 * npm install [<@scope>/]<name>@<version>
 */
exports.update = options => {
  const command = ['update'];
  const { name, mode, version = null, pkgOptions, multiple, packages } =
    options || {};
  const defaults = [];

  if (!name && !multiple) {
    return Promise.reject('npm[update] package name parameter must be given');
  }

  function getNames() {
    return multiple && packages && Array.isArray(packages)
      ? packages
      : version
      ? `${name}@${version}`.trim()
      : name.trim();
  }

  const commandArgs = mode === 'global' ? [].concat(defaults, '-g') : defaults;
  const commandOpts =
    pkgOptions && pkgOptions.length
      ? pkgOptions.map(option => `--${option}`)
      : [];

  const run = []
    .concat(command)
    .concat(commandArgs)
    .concat(getNames())
    .concat(commandOpts);

  return run;
};

/**
 * npm uninstall [<@scope>/]<pkg>[@<version>]
 */
exports.uninstall = options => {
  const command = ['uninstall'];
  const { name, mode, multiple, packages } = options;
  const defaults = [];

  function getNames() {
    if (multiple && packages && Array.isArray(packages)) {
      return packages;
    }

    if (!name && !multiple) {
      return Promise.reject(
        'npm[uninstall] package name parameter must be given'
      );
    }

    return name;
  }

  const commandArgs = mode === 'global' ? [].concat(defaults, '-g') : defaults;
  const run = []
    .concat(command)
    .concat(commandArgs)
    .concat(getNames());

  return run;
};

/**
 * npm view [<@scope>/]<name>[@<version>]
 */
exports.view = options => {
  const command = ['view'];
  const { mode, name, version } = options || {};
  const defaults = ['--depth=0', '--json'];

  if (!name) {
    return Promise.reject('npm[view] package name parameter must be given');
  }

  const commandArgs = mode === 'global' ? [].concat(defaults, '-g') : defaults;

  // build npm command
  const run = []
    .concat(command)
    .concat(version ? [].concat([`${name}@${version}`]) : [name])
    .concat(commandArgs);

  return run;
};
