import log from 'electron-log';
import { switchcase } from '../commons/utils';
import { runCommand } from '../cli';

const onNpmUninstall = (event, options) => {
  const { activeManager = 'npm', ...rest } = options || {};

  const onFlow = (chunk) => event.sender.send('npm-uninstall-flow', chunk);
  const onError = (error) => event.sender.send('npm-uninstall-error', error);
  const onComplete = (errors, result, removedPackages) =>
    event.sender.send(
      'npm-uninstall-completed',
      result,
      errors,
      removedPackages
    );

  const callback = (result) => {
    const { status, errors, data } = result;
    const { packages } = options;

    return switchcase({
      flow: (dataChunk) => onFlow(dataChunk),
      close: () => onComplete(errors, data, packages),
      error: () => onError(errors),
    })(null)(status);
  };

  try {
    const params = {
      ...rest,
      activeManager,
    };

    runCommand(params, callback);
  } catch (error) {
    log.error(error.message);
    event.sender.send('npm-uninstall-error', error);
  }
};

export default onNpmUninstall;
