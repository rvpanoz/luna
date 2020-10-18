import log from 'electron-log';
import { merge } from 'ramda';
import { switchcase } from '../commons/utils';
import { runCommand } from '../lib';
import mk from '../mk';

const {
  defaultSettings: { defaultManager },
} = mk || {};

const onNpmUpdate = (event, options, store) => {
  const settings = store.get('user_settings');
  const { activeManager = defaultManager, ...rest } = options || {};

  const onFlow = (options) => event.sender.send('npm-command-flow', options);
  const onError = (error) => event.sender.send('npm-update-error', error);

  const onComplete = (result) =>
    event.sender.send('npm-update-completed', result);

  const callback = (result) => {
    const { status, errors, data, manager, cmd, isTerminated } = result;

    return switchcase({
      flow: () => onFlow({ manager, cmd, isTerminated }),
      close: () => onComplete(errors, data),
      error: (error) => onError(error),
    })(null)(status);
  };

  // run npm update and send the result to renderer process via ipc event
  try {
    const params = merge(settings, {
      activeManager,
      ...rest,
    });

    runCommand(params, callback);
  } catch (error) {
    log.error(error.message);
    event.sender.send('npm-update-error', error);
  }
};

export default onNpmUpdate;
