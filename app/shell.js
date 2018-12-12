/* eslint-disable */

/**
 * Run shell commands
 * npm [cmd] [[<@scope>/]<pkg> ...]
 * */

import Q from 'q';
import mk from './mk';
import apiManager from './apis/manager';

/**
 *
 * @param {*} options
 * @param {*} callback
 */
export const runCommand = (options, callback) => {
  const { cmd, ...rest } = options || {};

  const combine = () => {
    const promises = [];

    if (!cmd || !Array.isArray(cmd)) {
      throw new Error('cmd parameter must be given and must be an array');
    }

    cmd.forEach(command => {
      promises.push(
        (() => {
          try {
            // cli command e.g npm list --depth=0 --json
            return apiManager[command](callback, rest);
          } catch (error) {
            throw new Error(error);
          }
        })()
      );
    });

    return promises;
  };

  Q.allSettled(combine()).then(results => {
    results.forEach(async result => {
      if (result.state === 'fulfilled') {
        const { value } = result;

        callback.call(null, value);
      } else {
        mk.log(`ERROR: ${result.state} ${result.reason}`);
        callback.call(callback, 'error');
      }
    });
  });
};
