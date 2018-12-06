/* eslint-disable */

/**
 * Run shell commands
 * npm [cmd] [[<@scope>/]<pkg> ...]
 * */

import Q from 'q';
import mk from './mk';
import Parser from './parser';

const { defaultSettings } = mk.config;
const { manager } = defaultSettings;

/**
 *
 * @param {*} options
 * @param {*} callback
 */
export const runCommand = (options, callback) => {
  const { activeManager = manager, cmd, ...rest } = options || {};
  const ParserInst = new Parser(activeManager);
  const packageJson = ParserInst.readPackageJson();

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
            // load api: npm and yarn are supported
            const api = require(`./apis/${activeManager}`);
            const rcommand = api[command];

            // run the command
            return rcommand.call(api, rest, callback);
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
        const { status, cmd, data } = value || {};

        const keys =
          activeManager === 'npm'
            ? [
                'dependencies',
                'devDependencies',
                'optionalDependenies',
                'peerDependencies'
              ]
            : ['data'];

        //  we have the response - parse, transform and send it back to ipcRenderer
        const packages = ParserInst.parse(data, keys, {
          manager: activeManager
        });

        callback.apply(callback, [status, cmd, packages]);
      } else {
        mk.log(`ERROR: ${result.state} ${result.reason}`);
        callback.call(callback, 'error');
      }
    });
  });
};
