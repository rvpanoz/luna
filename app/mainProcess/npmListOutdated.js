import fs from 'fs';
import path from 'path';
import log from 'electron-log';
import { merge } from 'ramda';
import { switchcase } from '../commons/utils';
import { runCommand } from '../shell';
import mk from '../mk';

const { config } = mk;
const { defaultSettings } = config || {};
const { defaultManager } = defaultSettings;

const onNpmListOutdated = (event, options, store) => {
  const settings = store.get('user_settings');
  const { activeManager = defaultManager, ...rest } = options || {};

  const handleLocalEvents = directory => {
    const openedPackages = store.get('openedPackages') || [];
    const yarnLock = fs.existsSync(
      path.join(path.dirname(directory), 'yarn.lock')
    );
    const dirName = path.dirname(path.resolve(directory));
    const parsedDirectory = path.parse(dirName);
    const { name } = parsedDirectory || {};

    if (yarnLock) {
      event.sender.send('yarn-warning-close');
    }

    const inDirectories = openedPackages.some(
      pkg => pkg.directory && pkg.directory.includes(dirName)
    );

    if (!inDirectories) {
      store.set('openedPackages', [
        ...openedPackages,
        {
          name,
          directory: path.join(dirName, 'package.json')
        }
      ]);
    }
  };

  const onFlow = chunk => event.sender.send('npm-list-outdated-flow', chunk);
  const onError = error => event.sender.send('npm-list-outdated-error', error);

  const onComplete = (errors, data, cmd) => {
    const { directory, mode } = rest;

    if (directory && mode === 'local') {
      handleLocalEvents(directory);
    }

    event.sender.send('npm-list-outdated-completed', data, errors, cmd);
  };

  const callback = result => {
    const { status, errors, data, cmd } = result;

    return switchcase({
      flow: dataChunk => onFlow(dataChunk),
      close: () => onComplete(errors, data, cmd),
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
    log.error(error.message);
    event.sender.send('npm-list-outdated-error', error);
  }
};

export default onNpmListOutdated;
