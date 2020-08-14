import fs from 'fs';
import path from 'path';
import log from 'electron-log';
import { switchcase } from '../commons/utils';
import { runCommand } from '../cli';

const onNpmListOutdated = (event: any, options: any) => {
  const { activeManager = 'npm', directory, mode } = options || {};

  const onFlow = (chunk: string) => event.sender.send('npm-list-outdated-flow', chunk);
  const onError = (error: any) =>
    event.sender.send('npm-list-outdated-error', error);

  const onComplete = (errors: any, data: any, cmd: string) => {
    debugger;

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

  const callback = (result: any) => {
    const { status, errors, data, cmd } = result;

    return switchcase({
      flow: (dataChunk: string) => onFlow(dataChunk),
      close: () => onComplete(errors, data, cmd),
      error: (error: string) => onError(error),
    })(null)(status);
  };

  try {
    const params = {
      activeManager,
      ...options,
    };

    runCommand(params, callback);
  } catch (error) {
    log.error(error.message);
    event.sender.send('npm-list-outdated-error', error);
  }
};

export default onNpmListOutdated;
