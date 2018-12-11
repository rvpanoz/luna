/* eslint-disable */

/**
 * Run shell commands
 * npm [cmd] [[<@scope>/]<pkg> ...]
 * */

import Q from 'q';
import mk from './mk';
import Parser from './parser';
import apiManager from './apis/manager';
import { UserException } from './mk';

const { config } = mk;
const {
  defaultSettings: { manager }
} = config;

/**
 *
 * @param {*} options
 * @param {*} callback
 */
export const runCommand = (options, callback) => {
  const { activeManager = manager, cmd, ...rest } = options || {};
  const ParserInst = new Parser(activeManager);

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
            return apiManager[command](rest, callback);
          } catch (error) {
            // mk.userException(error);
            throw new UserException(error);
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
        const { status, cmd, data } = value || {};

        const keys =
          manager === 'npm'
            ? [
                'dependencies',
                'devDependencies',
                'optionalDependenies',
                'peerDependencies'
              ]
            : ['data'];

        //  we have the response - parse, transform and send it back to ipcRenderer
        const packages = ParserInst.parse(data, keys, {
          manager
        });

        callback.apply(callback, [status, cmd, packages]);
      } else {
        mk.log(`ERROR: ${result.state} ${result.reason}`);
        callback.call(callback, 'error');
      }
    });
  });
};
