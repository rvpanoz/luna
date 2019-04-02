/* eslint-disable */

/**
 * Run shell commands
 * npm [cmd] [[<@scope>/]<pkg> ...]
 * */

import { apiManager as manager } from './cli';

/**
 *
 * @param {*} options
 * @param {*} callback
 */

export const runCommand = (options, callback) => {
  const { cmd, ...rest } = options || {};

  // returns an array of Promises
  const combine = () =>
    cmd.map((command, idx) => {
      try {
        const runner = manager[command];
        const result = runner(rest, callback, idx);

        return result;
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
