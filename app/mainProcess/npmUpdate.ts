import log from 'electron-log';
import { merge } from 'ramda';
import { switchcase } from '../commons/utils';
import { runCommand } from '../cli';
import mk from '../cli/mk';

const {
  defaultSettings: { defaultManager }
} = mk || {};

const onNpmUpdate = (event, options, store) => {
  const settings = store.get('user_settings');
  const { activeManager = defaultManager, ...rest } = options || {};

  const onFlow = chunk => event.sender.send('npm-update-flow', chunk);
  const onError = error => event.sender.send('npm-update-error', error);
  const onComplete = result =>
    event.sender.send('npm-update-completed', result);

  const callback = result => {
    const { status, errors, data } = result;

    return switchcase({
      flow: dataChunk => onFlow(dataChunk),
      close: () => onComplete(errors, data),
      error: error => onError(error)
    })(null)(status);
  };

  // run npm update and send the result to renderer process via ipc event
  try {
    const params = merge(settings, {
      activeManager,
      ...rest
    });

    runCommand(params, callback);
  } catch (error) {
    log.error(error.message);
    event.sender.send('npm-update-error', error);
  }
};

export default onNpmUpdate;
