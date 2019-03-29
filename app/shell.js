/* eslint-disable */

/**
 * Run shell commands
 * npm [cmd] [[<@scope>/]<pkg> ...]
 * */

import manager from './cli/manager';

/**
 *
 * @param {*} options
 * @param {*} callback
 */

export const runCommand = (options, callback) => {
  const { cmd, ...rest } = options || {};

  const combine = () =>
    cmd.map((command, idx) => {
      try {
        const runner = manager[command];

        return runner(rest, callback, idx);
      } catch (error) {
        throw new Error(error);
      }
    });

  Promise.all(combine())
    .then(results => {
      results.forEach(result => {
        const { status, ...values } = result;
        const { data, errors, cmd } = values;

        if (status === 'close') {
          callback(status, errors, data, cmd);
        }
      });
    })
    .catch(error => {
      Promise.reject(error);
    });
};
