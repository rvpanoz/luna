/* eslint-disable compat/compat */
/* eslint-disable import/prefer-default-export */

import log from 'electron-log';
import { from, merge } from 'rxjs';
import { apiManager as manager } from './cli';

/**
 * Run shell commands
 * @param {*} options
 * @param {*} callback
 */

const runCommand = (options, callback) => {
  const { cmd, ...rest } = options || {};

  // construct an array of promises. Each promise is an npm command
  const combine = () =>
    cmd.map((command, idx) => {
      try {
        const runner = manager[command];
        const result = runner(rest, callback, idx);

        return from(result);
      } catch (error) {
        log.error(error);
        throw new Error(error);
      }
    });

  // merge observables and run callback with the result
  merge(...combine()).subscribe(result => {
    try {
      callback(result);
    } catch (error) {
      log.error(error);
    }
  });
};

export { runCommand };
