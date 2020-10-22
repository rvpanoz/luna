import log from 'electron-log';
import { merge } from 'ramda';
import { switchcase } from '../commons/utils';
import { runCommand } from '../lib';
import mk from '../mk';

const {
  defaultSettings: { defaultManager },
} = mk || {};

const onNpmUninstall = (event, options, store) => {
  const settings = store.get('user_settings');
  const { activeManager = defaultManager, ...rest } = options || {};

  const onFlow = (options) => event.sender.send('npm-command-flow', options);
  const onError = (error) => event.sender.send('npm-uninstall-error', error);

  const onComplete = (errors, result, removedPackages) =>
    event.sender.send(
      'npm-uninstall-completed',
      result,
      errors,
      removedPackages
    );

  const callback = (result) => {
    const { status, errors, data, manager, cmd, isTerminated } = result;
    const { packages } = options;

    return switchcase({
      flow: () => onFlow({ manager, cmd, isTerminated }),
      close: () => onComplete(errors, data, packages),
      error: () => onError(errors),
    })(null)(status);
  };

  try {
    const params = merge(settings, {
      activeManager,
      ...rest,
    });

    runCommand(params, callback);
  } catch (error) {
    log.error(error.message);
    event.sender.send('npm-uninstall-error', error);
  }
};

export default onNpmUninstall;
