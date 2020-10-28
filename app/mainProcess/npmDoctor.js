import log from 'electron-log';
import { merge } from 'ramda';
import { switchcase } from '../commons/utils';
import { runCommand } from '../lib';
import mk from '../mk';

const {
  defaultSettings: { defaultManager },
} = mk || {};

const onNpmDoctor = (event, options, store) => {
  const settings = store.get('user_settings');
  const { activeManager = defaultManager, ...rest } = options || {};

  const onFlow = (chunk) => event.sender.send('npm-doctor-flow', chunk);
  const onError = (error) => event.sender.send('npm-doctor-error', error);
  const onComplete = (errors, data) =>
    event.sender.send('npm-doctor-completed', data, errors);

  const callback = (result) => {
    const { status, errors, data } = result;

    return switchcase({
      flow: (dataChunk) => onFlow(dataChunk),
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
    event.sender.send('npm-doctor-error', error && error.message);
  }
};

export default onNpmDoctor;
