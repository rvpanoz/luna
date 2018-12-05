/* eslint-disable */

/**
 * Run shell commands
 * npm [cmd] [[<@scope>/]<pkg> ...]
 * */

import fs from 'fs';
import path from 'path';
import Q from 'q';
import npmApi from './apis/npm';
import yarnApi from './apis/yarn';
import mk from './mk';

const { defaultSettings } = mk.config;
const { manager } = defaultSettings;

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

    // TODO: find a better way to use manager's apis
    cmd.forEach(command => {
      promises.push(
        (() => {
          const managerCmd =
            manager === 'npm' ? npmApi[command] : yarnApi[command];
          return managerCmd
            ? managerCmd.call(managerCmd, rest, callback)
            : null;
        })()
      );
    });

    return promises;
  };

  Q.allSettled(combine()).then(results => {
    results.forEach(async result => {
      if (result.state === 'fulfilled') {
        const { value } = result;
        const { status, cmd, error, latest, data } = value || {};

        callback.apply(callback, [status, cmd, data]);
      } else {
        mk.log(`ERROR: ${result.state} ${result.reason}`);
        callback.call(callback, 'error');
      }
    });
  });
};
