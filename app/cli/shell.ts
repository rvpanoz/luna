import log from 'electron-log';
import { concat } from 'rxjs';
import { catchError } from 'rxjs/operators';
import manager from './manager';

import { RunOptions } from '../types';

/**
 * Run shell commands
 * @param {*} options
 * @param {*} callback
 */

const runCommand = (options: RunOptions, callback: Function) => {
  const { cmd, ...rest } = options;

  // create an array of observables
  const combine = () =>
    cmd.map((command: string, idx: number) => {
      const runner = manager[command];
      const result$ = runner(rest, idx);

      return result$.pipe(catchError((error) => log.error(error)));
    });

  // subscribe to observables in order as previous completes
  concat(...combine()).subscribe((result) => callback(result));
};

export default runCommand;
