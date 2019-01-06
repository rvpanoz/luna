/* eslint-disable */

/**
 * Run shell commands
 * npm [cmd] [[<@scope>/]<pkg> ...]
 * */

import apiManager from './cli/manager';

/**
 *
 * @param {*} options
 * @param {*} callback
 */

export const runCommand = (options, callback) => {
  const { cmd, ...rest } = options || {};

<<<<<<< 4528f1a617e4e40b3a878a1525e2216fd7836e07
<<<<<<< e2c721b728ef2f002f21e369491b25af046eb9a6
  const combine = () =>
    cmd.map(command => {
      // the apiManager function to call
      const runner = apiManager[command];

      // return the function's result
      return runner(rest, callback);
    });

  Promise.all(combine()).then(results => {
=======
  const combine = () => {
    if (!cmd || !Array.isArray(cmd)) {
      throw new Error('cmd parameter must be given and must be an array');
    }

    if (!callback || typeof callback !== 'function') {
      throw new Error('callback must be given and must be a function');
    }

    const promises = cmd.map(command => {
      // const fc = () => {
      //   const runner = apiManager[command];
      //   return runner.call(this, rest, callback);
      // };

      // return fc();

=======
  const combine = () =>
    cmd.map(command => {
      // the apiManager function to call
>>>>>>> sync with preview, opt code
      const runner = apiManager[command];

      // return the function's result
      return runner(rest, callback);
    });

<<<<<<< 4528f1a617e4e40b3a878a1525e2216fd7836e07
>>>>>>> finish review
=======
  Promise.all(combine()).then(results => {
>>>>>>> sync with preview, opt code
    results.forEach(result => {
      const { status, ...values } = result;
      const { data, error, cmd } = values;

      if (status === 'close') {
        callback(status, error, data, cmd);
      }
    });
  });
};
