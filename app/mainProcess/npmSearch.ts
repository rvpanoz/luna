import log from 'electron-log';
import { switchcase } from '../commons/utils';
import { runCommand } from '../cli';

const onNpmSearch = (event: any, options: any) => {
  const { activeManager = 'npm', ...rest } = options || {};

  const onError = (error: string) => event.sender.send('npm-search-error', error);
  const onComplete = (errors: any, data: any) =>
    event.sender.send('npm-search-completed', data, errors);

  const callback = (result: any) => {
    const { status, errors, data } = result;

    return switchcase({
      close: () => onComplete(errors, data),
      error: (error: string) => onError(error)
    })(null)(status);
  };

  try {
    const params = {
      activeManager,
      ...rest
    };

    runCommand(params, callback);
  } catch (error) {
    log.error(error);
    event.sender.send('npm-search-error', error && error.message);
  }
};

export default onNpmSearch;
