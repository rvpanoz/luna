/* eslint-disable */
import path from 'path';

/**
 * Run shell commands
 * npm [cmd] [[<@scope>/]<pkg> ...]
 * */

const apiManager = require(path.resolve(__dirname, 'cli/manager'));

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
        const runner = apiManager.default[command];

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
