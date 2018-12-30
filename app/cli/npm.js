/* eslint-disable */

/**
 * npm module for cli commands
 */

// npm install [<@scope>/]<name>@<version>
exports.install = options => {
  const command = ['install'];
  const { pkgName, mode, pkgVersion, pkgOptions, multiple, packages } =
    options || {};
  const defaults = [];

  if (!pkgName && !multiple) {
    return Promise.reject('npm[install] package name parameter must be given');
  }

  function getNames() {
    return multiple && packages && Array.isArray(packages)
      ? packages
      : pkgVersion
      ? `${pkgName}@${pkgVersion}`
      : pkgName;
  }

  const commandArgs = mode === 'GLOBAL' ? [].concat(defaults, '-g') : defaults;
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

// npm uninstall [<@scope>/]<pkg>[@<version>]
exports.uninstall = options => {
  const command = ['uninstall'];
  const { pkgName, mode, multiple, packages } = options;
  const defaults = [];

  function getNames() {
    if (multiple && packages && Array.isArray(packages)) {
      return packages;
    } else if (!pkgName && !multiple) {
      return Promise.reject(
        'npm[uninstall] package name parameter must be given'
      );
    } else {
      return pkgName;
    }
  }

  const commandArgs = mode === 'GLOBAL' ? [].concat(defaults, '-g') : defaults;
  const run = []
    .concat(command)
    .concat(commandArgs)
    .concat(getNames());

  return run;
};
