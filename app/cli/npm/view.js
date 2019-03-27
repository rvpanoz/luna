/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable compat/compat */
/* eslint-disable no-nested-ternary */

/**
 * npm view [<@scope>/]<name>[@<version>]
 */

const view = options => {
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

export default view;
