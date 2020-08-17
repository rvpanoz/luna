import log from 'electron-log';
import { switchcase } from '../commons/utils';
import { runCommand } from '../cli';

const onNpmInit = (event: any, options: any) => {
  const { activeManager = 'npm', ...rest } = options || {};

  const onFlow = (chunk: any) => event.sender.send('npm-init-flow', chunk);
  const onError = (error: any) => event.sender.send('npm-init-error', error);
  const onComplete = (errors: any, data: any, initDirectory: string) => setTimeout(() => event.sender.send('npm-init-completed', errors, data, initDirectory), 2000)

  const callback = (result: any) => {
    const { status, errors, data, initDirectory } = result;

    return switchcase({
      flow: (dataChunk: string) => onFlow(dataChunk),
      close: () => onComplete(errors, data, initDirectory),
      error: (error: string) => onError(error)
    })(null)(status);
  };

  try {
    const params = {
      ...rest,
      activeManager
    }

    runCommand(params, callback);
  } catch (error) {
    log.error(error);
    event.sender.send('npm-init-error', error && error.message);
  }
};

export default onNpmInit;
