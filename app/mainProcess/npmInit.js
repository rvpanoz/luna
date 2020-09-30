import log from 'electron-log';
import { merge } from 'ramda';
import { switchcase } from '../commons/utils';
import { runCommand } from '../cli';
import mk from '../mk';

const {
  defaultSettings: { defaultManager },
} = mk || {};

const onNpmInit = (event, options, store) => {
  const settings = store.get('user_settings');
  const { activeManager = defaultManager, ...rest } = options || {};

  const onFlow = (chunk) => event.sender.send('npm-init-flow', chunk);
  const onError = (error) => event.sender.send('npm-init-error', error);
  const onComplete = (errors, data, initDirectory) =>
    setTimeout(
      () =>
        event.sender.send('npm-init-completed', errors, data, initDirectory),
      2000
    );

  const callback = (result) => {
    const { status, errors, data, initDirectory } = result;

    return switchcase({
      flow: (dataChunk) => onFlow(dataChunk),
      close: () => onComplete(errors, data, initDirectory),
      error: (error) => onError(error),
    })(null)(status);
  };

  try {
    const params = merge(settings, {
      activeManager,
      ...rest,
    });

    runCommand(params, callback);
  } catch (error) {
    log.error(error);
    event.sender.send('npm-init-error', error && error.message);
  }
};

export default onNpmInit;
