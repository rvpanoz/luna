import log from 'electron-log';
import { merge } from 'ramda';
import { switchcase } from '../commons/utils';
import { runCommand } from '../cli';
import mk from '../mk';

const {
  defaultSettings: { defaultManager }
} = mk || {};

const onNpmAudit = (event, parameters, store) => {
  const settings = store.get('user_settings');
  const { activeManager = defaultManager, ...rest } = parameters || {};

  const onFlow = chunk => event.sender.send('npm-audit-flow', chunk);
  const onError = error => event.sender.send('npm-audit-error', error);
  const onComplete = (error, data) => {
    const { options: { flag } } = parameters || {};
    const evtName = flag ? 'npm-audit-fix-completed' : 'npm-audit-completed';

    return event.sender.send(evtName, error, data);
  }


  const callback = result => {
    const { status, errors, data } = result;

    return switchcase({
      flow: dataChunk => onFlow(dataChunk),
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
    event.sender.send('npm-audit-error', error && error.message);
  }
};

export default onNpmAudit;
