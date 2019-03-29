/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable compat/compat */
/* eslint-disable no-nested-ternary */

/**
 * npm uninstall [<@scope>/]<pkg>[@<version>]
 */

const uninstall = options => {
  const command = ['uninstall'];
  const { name, mode, multiple, packages } = options;
  const defaults = ['--verbose'];

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

export default uninstall;
