import fs from 'fs';
import path from 'path';
import log from 'electron-log';
import { switchcase } from '../commons/utils';
import { runCommand } from '../cli';
import { CommandResult, RunOptions } from '../types';

const onNpmListOutdated = (event: any, options: RunOptions) => {
  const { directory, mode } = options || {};

  const onFlow = (chunk: string) => event.sender.send('npm-list-outdated-flow', chunk);
  const onError = (error: string) =>
    event.sender.send('npm-list-outdated-error', error);

  const onComplete = (errors: string, data: string, cmd: [string]) => {
    if (directory && mode === 'local') {
      try {
        const yarnLock = fs.existsSync(
          path.join(path.dirname(directory), 'yarn.lock')
        );

        if (yarnLock) {
          event.sender.send('yarn-lock-detected');
        }
      } catch (error) {
        throw new Error(error);
      }
    }

    event.sender.send('loaded-packages-close');
    event.sender.send('npm-list-outdated-completed', data, errors, cmd);
  };

  const callback = (result: CommandResult) => {
    const { status, errors, data, cmd } = result;

    return switchcase({
      flow: (dataChunk: string) => onFlow(dataChunk),
      close: () => onComplete(errors, data, cmd),
      error: (error: string) => onError(error),
    })(null)(status);
  };

  try {
    runCommand({ ...options }, callback);
  } catch (error) {
    log.error(error.message);
    event.sender.send('npm-list-outdated-error', error);
  }
};

export default onNpmListOutdated;
