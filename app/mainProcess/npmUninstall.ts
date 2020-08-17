import log from 'electron-log';
import { switchcase } from '../commons/utils';
import { runCommand } from '../cli';

const onNpmUninstall = (event: any, options: any) => {
  const { activeManager = 'npm', ...rest } = options || {};

  const onFlow = (chunk: any) => event.sender.send('npm-uninstall-flow', chunk);
  const onError = (error: any) => event.sender.send('npm-uninstall-error', error);
  const onComplete = (errors: any, result: any, removedPackages: any) =>
    event.sender.send(
      'npm-uninstall-completed',
      result,
      errors,
      removedPackages
    );

  const callback = (result: any) => {
    const { status, errors, data } = result;
    const { packages } = options;

    return switchcase({
      flow: (dataChunk: string) => onFlow(dataChunk),
      close: () => onComplete(errors, data, packages),
      error: () => onError(errors)
    })(null)(status);
  };

  try {
    const params = {
      ...rest,
      activeManager
    };

    runCommand(params, callback);
  } catch (error) {
    log.error(error.message);
    event.sender.send('npm-uninstall-error', error);
  }
};

export default onNpmUninstall;
