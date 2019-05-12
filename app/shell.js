/* eslint-disable compat/compat */
/* eslint-disable import/prefer-default-export */

/**
 * Run shell commands
 * npm [cmd] [[<@scope>/]<pkg> ...]
 * */

import log from 'electron-log';
import { apiManager as manager } from './cli';

/**
 *
 * @param {*} options
 * @param {*} callback
 */

const runCommand = (options, callback) => {
  const { cmd, ...rest } = options || {};

  // an array of promises with npm commands to run
  const combine = () =>
    cmd.map((command, idx) => {
      try {
        const runner = manager[command];
        const result = runner(rest, callback, idx);

        return result;
      } catch (error) {
        log.error(error);
        throw new Error(error);
      }
    });

  Promise.all(combine())
    .then(results => results.forEach(result => callback(result)))
    .catch(error => {
      log.error(error);
      return Promise.reject(error);
    });
};

export { runCommand };
