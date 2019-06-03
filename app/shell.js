/* eslint-disable compat/compat */
/* eslint-disable import/prefer-default-export */

import log from 'electron-log';
import { from, merge } from 'rxjs';
import { concatMap, concat, mergeMap } from 'rxjs/operators';
import { apiManager as manager } from './cli';

/**
 * Run shell commands
 * @param {*} options
 * @param {*} callback
 */

const runCommand = (options, callback) => {
  const { cmd, ...rest } = options || {};

  // construct an array of observables
  const combine = () =>
    cmd.map((command, idx) => {
      try {
        const runner = manager[command];
        const result = runner(rest, callback, idx);

        return from(result);
      } catch (error) {
        log.error(error);
        throw new Error(error);
      }
    });

  const results$ = merge(...combine())
    .pipe(mergeMap(result => callback(result)))
    .subscribe();
};

export { runCommand };
