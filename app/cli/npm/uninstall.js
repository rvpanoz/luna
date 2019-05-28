/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable compat/compat */

/**
 * npm uninstall
 * @param {*} options
 */
const uninstall = options => {
  const command = ['uninstall'];
  const { name, mode, multiple, packages } = options;
  const defaults = ['--verbose'];

  function getNames() {
    if (multiple && Array.isArray(packages)) {
      // do not uninstall npm
      return packages.filter(pkgName => pkgName !== 'npm');
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

export default uninstall;
