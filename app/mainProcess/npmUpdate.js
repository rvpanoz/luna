import log from 'electron-log';
import { switchcase } from '../commons/utils';
import { runCommand } from '../cli';
import mk from '../cli/mk';

const {
  defaultSettings: { defaultManager },
} = mk || {};

const onNpmUpdate = (event, options) => {
  const { activeManager = defaultManager, ...rest } = options || {};

  const onFlow = (chunk) => event.sender.send('npm-update-flow', chunk);
  const onError = (error) => event.sender.send('npm-update-error', error);
  const onComplete = (errors, data) =>
    event.sender.send('npm-update-completed', data);

  const callback = (result) => {
    const { status, errors, data } = result;

    return switchcase({
      flow: (dataChunk) => onFlow(dataChunk),
      close: () => onComplete(errors, data),
      error: (error) => onError(error),
    })(null)(status);
  };

  try {
    const params = {
      activeManager,
      ...rest,
    };

    runCommand(params, callback);
  } catch (error) {
    log.error(error.message);
    event.sender.send('npm-update-error', error);
  }
};

export default onNpmUpdate;
