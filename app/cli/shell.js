/* eslint-disable compat/compat */
/* eslint-disable import/prefer-default-export */

import log from 'electron-log';
import manager from './manager';

import { concat, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators';

/**
 * Run shell commands
 * @param {*} options
 * @param {*} callback
 */

const runCommand = (options, callback) => {
  const { cmd, ...rest } = options;

  // create an array of observables
  const combine = () =>
    cmd.map((command, idx) => {
      const runner = manager[command];
      const result$ = runner(rest, idx);

      return result$;
    });

  // subscribe to observables in order as previous completes
  concat.apply(null, combine()).subscribe(result => callback(result));
}

export default runCommand;
