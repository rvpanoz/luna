import log from 'electron-log';
import { merge } from 'ramda';
import { switchcase } from '../commons/utils';
import { runCommand } from '../lib';
import mk from '../mk';

const {
  defaultSettings: { defaultManager },
} = mk || {};

const onNpmView = (event, options, store) => {
  console.log(options);
  const settings = store.get('user_settings');
  const { activeManager = defaultManager, ...rest } = options || {};

  const onFlow = (options) => event.sender.send('npm-command-flow', options);
  const onError = (error) => event.sender.send('npm-view-error', error);
  const onComplete = (errors, data) =>
    event.sender.send('npm-view-completed', errors, data, options);

  const callback = (result) => {
    const { status, errors, data, manager, cmd, isTerminated } = result;

    return switchcase({
      flow: () => onFlow({ manager, cmd, isTerminated }),
      close: () => onComplete(errors, data),
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
    event.sender.send('npm-view-error', error && error.message);
  }
};

export default onNpmView;
