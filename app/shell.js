/* eslint-disable compat/compat */
/* eslint-disable import/prefer-default-export */

import log from 'electron-log';
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

        return result;
      } catch (error) {
        log.error(error);
        throw new Error(error);
      }
    });

  // array of promises
  const tasks = combine();

  // run in serial
  tasks
    .reduce(
      (promiseChain, currentTask) =>
        promiseChain.then(chainResults =>
          currentTask.then(currentResult => [...chainResults, currentResult])
        ),
      Promise.resolve([])
    )
    .then(results => results.map(result => callback(result)))
    .catch(error => {
      log.error(error);
      return Promise.reject(error);
    });
};

export { runCommand };
