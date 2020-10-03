import fs from 'fs';
import path from 'path';
import log from 'electron-log';
import { merge } from 'ramda';
import { switchcase } from '../commons/utils';
import { runCommand } from '../cli';
import mk from '../mk';

const {
  defaultSettings: { defaultManager },
} = mk || {};

const onNpmListOutdated = (event, options, store) => {
  const { activeManager = defaultManager, directory, mode } = options || {};
  const settings = store.get('user_settings');
  const history = store.get('history') || [];
  let yarnLock;

  // define callbacks
  const onFlow = (message) => event.sender.send('npm-command-flow', message);
  const onError = (error) =>
    event.sender.send('npm-list-outdated-error', error);

  const onComplete = (errors, data, cmd) => {
    if (directory && mode === 'local') {
      try {
        const dirName = path.dirname(path.resolve(directory));
        const { name } = path.parse(dirName) || {};

        const inDirectories = history.some(
          (pkg) => pkg.directory && pkg.directory.includes(dirName)
        );

        // add directory to history list
        if (!inDirectories) {
          store.set('history', [
            ...history,
            {
              name,
              directory: path.join(dirName, 'package.json'),
            },
          ]);
        }

        // check if yarn.lock exists
        yarnLock = fs.existsSync(
          path.join(path.dirname(directory), 'yarn.lock')
        );
      } catch (error) {
        log.error(error);
      }

      if (yarnLock) {
        event.sender.send('yarn-lock-detected');
      }
    }

    event.sender.send('loaded-packages-close', store.get('history'));
    event.sender.send('npm-list-outdated-completed', data, errors, cmd);
  };

  const callback = (result) => {
    const { status, errors, data, cmd, message } = result;

    return switchcase({
      flow: () => onFlow(message),
      close: () => onComplete(errors, data, cmd),
      error: (error) => onError(error),
    })(null)(status);
  };

  try {
    const params = merge(settings, {
      activeManager,
      ...options,
    });

    runCommand(params, callback);
  } catch (error) {
    event.sender.send('npm-list-outdated-error', error);
  }
};

export default onNpmListOutdated;
