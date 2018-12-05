/* eslint-disable */

/**
 * Run shell commands
 * npm [cmd] [[<@scope>/]<pkg> ...]
 * */

import fs from 'fs';
import path from 'path';
import Q from 'q';
import mk from './mk';
import { NPM, YARN } from './constants/AppConstants';

const { defaultSettings } = mk.config;
const { manager } = defaultSettings;

/**
 *
 * @param {*} options
 * @param {*} callback
 */
export const runCommand = (options, callback) => {
  const { activeManager = manager, cmd, ...rest } = options || {};

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
          try {
            const api = require(`./apis/${activeManager}`);
            const r_command = api[command];

            return r_command.call(api, rest, callback);
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
        const { status, cmd, error, latest, data } = value || {};

        callback.apply(callback, [status, cmd, data]);
      } else {
        mk.log(`ERROR: ${result.state} ${result.reason}`);
        callback.call(callback, 'error');
      }
    });
  });
};
