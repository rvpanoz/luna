/* eslint-disable compat/compat */
/* eslint-disable import/prefer-default-export */

/**
 * Run shell commands
 * npm [cmd] [[<@scope>/]<pkg> ...]
 * */

import { apiManager as manager } from './cli';
import mk from './mk';

/**
 *
 * @param {*} options
 * @param {*} callback
 */

const runCommand = (options, callback) => {
  const { cmd, ...rest } = options || {};

  // an array of Promises
  const combine = () =>
    cmd.map((command, idx) => {
      try {
        const runner = manager[command];
        const result = runner(rest, callback, idx);

        return result;
      } catch (error) {
        mk.log(error);

        throw new Error(error);
      }
    });

  Promise.all(combine())
    .then(results =>
      results.forEach(result => {
        const { status, ...values } = result;
        const { data, errors, ...restValues } = values;

        if (status === 'close') {
          callback(status, errors, data, restValues.cmd);
        }
      })
    )
    .catch(error => Promise.reject(error));
};

export { runCommand };
