import log from 'electron-log';
import { concat } from 'rxjs';
import { catchError } from 'rxjs/operators';
import manager from './manager';

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

      return result$.pipe(catchError((error) => log.error(error)));
    });

  // subscribe to observables in order as previous completes
  concat(...combine()).subscribe((result) => callback(result));
};

export default runCommand;
