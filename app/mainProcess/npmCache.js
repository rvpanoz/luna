import log from 'electron-log';
import { merge } from 'ramda';
import { switchcase } from '../commons/utils';
import { runCommand } from '../cli';
import mk from '../mk';

const {
    defaultSettings: { defaultManager }
} = mk || {};

const onNpmCache = (event, params, store) => {
    const settings = store.get('user_settings');
    const { activeManager = defaultManager, options, ...rest } = params || {};
    const { action } = options;

    const onFlow = chunk => event.sender.send('npm-cache-flow', chunk);
    const onError = error => event.sender.send('npm-cache-error', error);
    const onComplete = (errors, data) =>
        event.sender.send('npm-cache-completed', errors, data, action);

    const callback = result => {
        const { status, errors, data } = result;

        return switchcase({
            flow: dataChunk => onFlow(dataChunk),
            close: () => onComplete(errors, data),
            error: error => onError(error)
        })(null)(status);
    };

    try {
        const parameters = merge(settings, {
            activeManager,
            action,
            ...rest
        });

        runCommand(parameters, callback);
    } catch (error) {
        log.error(error);
        event.sender.send('npm-cache-error', error && error.message);
    }
};

export default onNpmCache;
