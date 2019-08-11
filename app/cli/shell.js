/* eslint-disable compat/compat */
/* eslint-disable import/prefer-default-export */

import log from 'electron-log';
import manager from './manager';

/**
 * Run shell commands
 * @param {*} options
 * @param {*} callback
 */

const runCommand = (options, callback) => {
  const { cmd, ...rest } = options || {};

  const combine = () =>
    cmd.map((command, idx) => {
      try {
        const runner = manager[command];
        const result = runner(rest, idx);

        return result; // returns a promise
      } catch (error) {
        log.error(error);
        throw new Error(error);
      }
    });

  const tasks = combine();

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

export default runCommand;
