import log from 'electron-log';
import { switchcase } from '../commons/utils';
import { runCommand } from '../cli';
import { CommandResult, RunOptions } from '../types';

const onNpmInstall = (event: any, options: RunOptions) => {
  let runningTimes = 1;

  const onFlow = (chunk: string) => event.sender.send('npm-install-flow', chunk);
  const onError = (error: string) => event.sender.send('npm-install-error', error);

  const onComplete = (errors: string, data: string, command: [string], packageJson?: boolean) => {
    const { cmd } = options || {};

    if (cmd.length === runningTimes) {
      runningTimes = 1;
      return event.sender.send('npm-install-completed', data, errors, command, packageJson);
    }

    runningTimes += 1;
  };

  const callback = (result: CommandResult) => {
    const { status, errors, data, packageJson, cmd } = result;

    return switchcase({
      flow: (dataChunk: string) => onFlow(dataChunk),
      close: () => onComplete(errors, data, cmd, packageJson),
      error: (error: string) => onError(error)
    })(null)(status);
  };

  try {
    runCommand({ ...options }, callback);
  } catch (error) {
    log.error(error.message);
    event.sender.send('npm-install-error', error);
  }
};

export default onNpmInstall;
