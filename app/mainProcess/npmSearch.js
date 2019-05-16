import log from 'electron-log';
import { merge } from 'ramda';
import { switchcase } from '../commons/utils';
import { runCommand } from '../shell';
import mk from '../mk';

const { config } = mk;
const { defaultSettings } = config || {};
const { defaultManager } = defaultSettings;

const onNpmSearch = (event, options, store) => {
  const settings = store.get('user_settings');
  const { activeManager = defaultManager, ...rest } = options || {};

  const onError = error => event.sender.send('npm-search-error', error);
  const onComplete = (errors, data) =>
    event.sender.send('npm-search-completed', data, errors);

  const callback = result => {
    const { status, errors, data } = result;

    return switchcase({
      close: () => onComplete(errors, data),
      error: error => onError(error)
    })(null)(status);
  };

  try {
    const params = merge(settings, {
      activeManager,
      ...rest
    });

    runCommand(params, callback);
  } catch (error) {
    log.error(error);
    event.sender.send('npm-search-fatal-error', error && error.message);
  }
};

export default onNpmSearch;
