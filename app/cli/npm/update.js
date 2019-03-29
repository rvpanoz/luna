/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable compat/compat */
/* eslint-disable no-nested-ternary */

/**
 * npm update [<@scope>/]<name>[@<version>]
 */

const update = options => {
  const command = ['update'];
  const { name, mode, version = null, pkgOptions, multiple, packages } =
    options || {};
  const defaults = ['--verbose'];

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

export default update;
