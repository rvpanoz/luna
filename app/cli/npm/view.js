/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable compat/compat */

/**
 * npm view
 * @param {*} options
 */
const view = options => {
  const command = ['view'];
  const { mode, name, version } = options || {};
  const defaults = ['--depth=0', '--json'];

  if (!name) {
    throw new Error('npm[view] package name parameter must be given');
  }

  const commandArgs = mode === 'global' ? [].concat(defaults, '-g') : defaults;
  const run = []
    .concat(command)
    .concat(version ? [].concat([`${name}@${version}`]) : [name])
    .concat(commandArgs);

  return run;
};

export default view;
