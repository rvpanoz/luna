/* eslint-disable */

/**
 * Run shell commands
 * npm/yarn [cmd] [[<@scope>/]<pkg> ...]
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

  const finalize = result => {
    const { state, value } = result;

    if (state === 'fulfilled') {
      console.log(value.data.slice(0, 200));
      callback.call(null, ...value);
    } else {
      mk.log(`${result.state} ${result.reason}`);
      // callback.call(null, 'error');
    }
  };

  Q.allSettled(combine()).then(results => {
    results.forEach(finalize);
  });
};
