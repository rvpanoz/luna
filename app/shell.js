/* eslint-disable func-names */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */

/**
 * Run shell commands
 * npm [cmd] [[<@scope>/]<pkg> ...]
 * */

import Q from 'q';
import npmApi from './apis/npm';
import mk from './mk';

exports.doCommand = function(options, callback) {
  const { cmd, ...rest } = options || {};

  // helper fn to setup promises array
  const combine = () => {
    let promises = [];

    if (!cmd || !Array.isArray(cmd)) {
      throw new Error(
        'SHELL[doCommand]: cmd parameter must be given and must be an array'
      );
    }

    cmd.forEach(command => {
      promises.push(
        (function() {
          return npmApi[command]
            ? npmApi[command].call(this, rest, callback)
            : null;
        })()
      );
    });

    return promises;
  };

  Q.allSettled(combine()).then(results => {
    results.forEach(result => {
      if (result.state === 'fulfilled') {
        callback(
          result.value.status,
          result.value.cmd,
          result.value.data,
          result.value.latest,
          result.value.stats,
          result.value.dataString
        );
      } else {
        mk.log(`${result.state} ${result.reason}`);
        callback(result);
      }
    });
  });
};
