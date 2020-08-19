import log from 'electron-log';
import { switchcase } from '../commons/utils';
import { runCommand } from '../cli';

const onNpmInstall = (event, options) => {
  let runningTimes = 1;

  const onFlow = (chunk) => event.sender.send('npm-install-flow', chunk);
  const onError = (error) => event.sender.send('npm-install-error', error);

  const onComplete = (errors, data, command, packageJson) => {
    const { cmd } = options || {};

    if (cmd.length === runningTimes) {
      runningTimes = 1;
      return event.sender.send(
        'npm-install-completed',
        data,
        errors,
        command,
        packageJson
      );
    }

    runningTimes += 1;
  };

  const callback = (result) => {
    const { status, errors, data, packageJson, cmd } = result;

    return switchcase({
      flow: (dataChunk) => onFlow(dataChunk),
      close: () => onComplete(errors, data, cmd, packageJson),
      error: (error) => onError(error),
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
