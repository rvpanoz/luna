/* eslint-disable */

/**
 * Run shell commands
 * npm [cmd] [[<@scope>/]<pkg> ...]
 * */

import fs from 'fs';
import path from 'path';
import Q from 'q';
import npmApi from './apis/npm';
import mk from './mk';

/**
 *
 * @param {*} options
 * @param {*} callback
 */
export const runCommand = (options, callback) => {
  const { cmd, ...rest } = options || {};

  // helper fn to setup promises array
  const combine = () => {
    const promises = [];

    if (!cmd || !Array.isArray(cmd)) {
      throw new Error(
        'SHELL[doCommand]: cmd parameter must be given and must be an array'
      );
    }

    cmd.forEach(command => {
      promises.push(
        (() => {
          return npmApi[command]
            ? npmApi[command].call(this, rest, callback)
            : null;
        })()
      );
    });

    return promises;
  };

  Q.allSettled(combine()).then(results => {
    results.forEach(async result => {
      if (result.state === 'fulfilled') {
        // console.log(result);
        await fs.writeFileSync(
          'test.txt',
          JSON.stringify(result.value),
          'UTF-8'
        );

        const { value } = result;
        const { status, cmd, error, latest, ...rest } = value || {};
        // console.log(status);
        // callback.call(...value);
      } else {
        mk.log(`ERROR: ${result.state} ${result.reason}`);
        // callback(result);
      }
    });
  });
};
