/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable compat/compat */
/* eslint-disable no-nested-ternary */

/**
 * npm update
 * @param {*} options
 */
const update = options => {
  const command = ['update'];
  const { name, mode, pkgOptions, multiple, packages } = options || {};
  const defaults = ['--no-audit', '--verbose'];

  if (!name && !multiple) {
    throw new Error('npm[update] package name parameter must be given');
  }

  function getNames() {
    return multiple && packages && Array.isArray(packages)
      ? packages
      : name.trim();
  }

  const commandArgs = mode === 'global' ? [].concat(defaults, '-g') : defaults;
  const commandOpts =
    pkgOptions && pkgOptions.length
      ? pkgOptions.map(option => `--${option}`)
      : [];

  const run = []
    .concat(command)
    .concat(getNames())
    .concat(commandArgs)
    .concat(commandOpts);

  return run;
};

export default update;
