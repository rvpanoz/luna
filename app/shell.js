/* eslint-disable */

/**
 * Run shell commands
 * npm/yarn [cmd] [[<@scope>/]<pkg> ...]
 * */

import apiManager from './cli/manager';

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

    if (!callback || typeof callback !== 'function') {
      throw new Error('callback must be given and must be a function');
    }

    cmd.forEach(command => {
      const fc = () => {
        const runner = apiManager[command];
        return runner.apply(this, [rest, callback]);
      };

      promises.push(fc());
    });

    return promises;
  };

  Promise.all(combine()).then(results => {
    results.forEach(result => {
      const { status, ...values } = result;
      const { data, error, cmd } = values;

      if (status === 'close') {
        return callback(status, error, data, cmd);
      }
    });
  });
};
