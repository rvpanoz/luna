/* eslint-disable */

/**
 * Run shell commands
 * npm [cmd] [[<@scope>/]<pkg> ...]
 * */

import apiManager from './cli/manager';

/**
 *
 * @param {*} options
 * @param {*} callback
 */

export const runCommand = (options, callback) => {
  const { cmd, ...rest } = options || {};

  const combine = () =>
    cmd.map(command => {
      // the apiManager function to call
      const runner = apiManager[command];
      return runner(rest, callback);
    });

  Promise.all(combine()).then(results => {
    results.forEach(result => {
      const { status, ...values } = result;
      const { data, error, message, cmd } = values;

      if (status === 'close') {
        callback(status, error, message, data, cmd);
      }
    });
  });
};
