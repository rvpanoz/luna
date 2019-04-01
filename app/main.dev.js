/* eslint-disable */

import ElectronStore from 'electron-store';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { merge } from 'ramda';
import { app, BrowserWindow, ipcMain, screen } from 'electron';
import log from 'electron-log';

import { APP_TOOLS, APP_ACTIONS } from './constants/AppConstants';
import { switchcase } from './commons/utils';
import MenuBuilder from './menu';
import mk from './mk';
import { runCommand } from './shell';
import { CheckNpm } from '../internals/scripts';

const { config } = mk;
const { defaultSettings } = config || {};
const { startMinimized, defaultManager } = defaultSettings;

const {
  DEBUG_PROD = 0,
  DEBUG_DEV = 1,
  MIN_WIDTH = 1024,
  MIN_HEIGHT = 768,
  INSTALL_EXTENSIONS = 1,
  UPGRADE_EXTENSIONS,
  NODE_ENV,
  START_MINIMIZED = startMinimized
} = process.env;

const debug = /--debug/.test(process.argv[2]);
const APP_PATHS = {
  appData: app.getPath('appData'),
  userData: app.getPath('userData')
};

// store initialization
const Store = new ElectronStore();

// clear opened packages
Store.set('openedPackages', []);

// user settings
const settings = Store.get('user_settings');

let mainWindow = null;
let loadingScreen = null;

if (NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (NODE_ENV === 'development' || Boolean(DEBUG_PROD)) {
  const p = path.join(__dirname, '..', 'app', 'node_modules');

  DEBUG_DEV && require('electron-debug')();
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

// handle local events
const handleLocalEvents = (event, mode, directory) => {
  const openedPackages = Store.get('openedPackages') || [];
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
    Store.set('openedPackages', [
      ...openedPackages,
      {
        name,
        directory: path.join(dirName, 'package.json')
      }
    ]);
  }

  event.sender.send('loaded-packages-close', Store.get('openedPackages'));
};

/**
 * Listen to ipcRenderer events
 */

// channel: ipc-event
ipcMain.on('ipc-event', (event, options) => {
  const { ipcEvent, activeManager = defaultManager, ...rest } = options || {};

  let runningTimes = 1;

  const onClose = (status, errors, data, cmd) => {
    const { directory, mode } = rest;
    const actionIndex = APP_ACTIONS.indexOf(ipcEvent);
    const toolsIndex = APP_TOOLS.indexOf(ipcEvent);
    const commands = options.cmd;

    if (actionIndex > -1 && ipcEvent !== 'view') {
      if (commands.length === runningTimes) {
        return event.sender.send('action-close', errors, data, cmd);
      }

      runningTimes += 1;
    }

    if (toolsIndex > -1) {
      return event.sender.send('tool-close', errors, data, cmd);
    }

    if (directory && mode === 'local' && cmd.indexOf('list') > -1) {
      handleLocalEvents(event, mode, directory);
    }

    event.sender.send(`${ipcEvent}-close`, status, cmd, data, errors, options);
  };

  const callback = (status, errors, ...restArgs) =>
    switchcase({
      close: () => onClose(status, errors, ...restArgs)
    })(null)(status);

  /**
   * At this point we try to run a shell command sending output
   * to renderer process via ipc events
   */
  try {
    const params = merge(settings, {
      activeManager,
      ...rest
    });

    runCommand(params, callback);
  } catch (error) {
    mk.log(error.message);
    throw new Error(error);
  }
});

// channel: general
ipcMain.on('online-status-changed', (event, status) => {
  // TODO: implementation
});

app.on('window-all-closed', () => {
  /**
   * Respect the OSX convention of having the application
   * in memory even after all windows have been closed
   */

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.once('browser-window-created', (event, webContents) => {
  log.info(
    chalk.white.bgBlue.bold('[EVENT]'),
    'browser-window-created event fired'
  );
});

app.once('web-contents-created', (event, webContents) => {
  log.info(
    chalk.white.bgBlue.bold('[EVENT]'),
    'web-contents-created event fired'
  );
});

app.on('ready', async () => {
  log.info(chalk.white.bgBlue.bold('[EVENT]'), 'ready event fired');

  if (NODE_ENV === 'development') {
    INSTALL_EXTENSIONS && (await installExtensions());
  }

  let x = 0;
  let y = 0;
  const screenSize = screen.getPrimaryDisplay().size;
  const displays = screen.getAllDisplays();
  const externalDisplay = displays.find(
    display => display.bounds.x !== 0 || display.bounds.y !== 0
  );

  if (externalDisplay) {
    x = externalDisplay.bounds.x + 50;
    y = externalDisplay.bounds.y + 50;
  }

  // create mainWindow
  mainWindow = new BrowserWindow({
    minWidth: MIN_WIDTH || screenSize.width,
    minHeight: MIN_HEIGHT || screenSize.height,
    x,
    y,
    show: false,
    webPreferences: {
      nodeIntegration: true
    },
    resizable: true,
    icon: path.join(__dirname, 'resources/icon.ico')
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.once('ready-to-show', event => {
    log.info(chalk.white.bgBlue.bold('[EVENT]'), 'ready-to-show event fired');
  });

  mainWindow.webContents.on('did-finish-load', async event => {
    log.info(chalk.white.bgBlue.bold('[EVENT]'), 'did-finish-load event fired');

    if (!mainWindow) {
      throw new Error('mainWindow is not defined');
    }

    mainWindow.openDevTools();

    if (START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }

    if (NODE_ENV === 'development') {
      mainWindow.openDevTools();
    }

    // npm and node info
    const npmEnv = await CheckNpm();

    if (npmEnv.error) {
      event.sender.send('npm-error', String(npmEnv.error));
    } else {
      event.sender.send('get-env-close', npmEnv);
    }

    // user settings
    const userSettings = Store.get('user_settings') || defaultSettings;
    event.sender.send('settings-loaded-close', userSettings);

    // directories history
    const openedPackages = Store.get('opened_packages') || [];
    event.sender.send('loaded-packages-close', openedPackages);
  });

  mainWindow.webContents.on('crashed', event => {
    log.info(chalk.white.bgRed.bold('[CRASHED]'), event);
  });

  mainWindow.on('unresponsive', event => {
    log.info(chalk.white.bgRed.bold('[UNRESPONSIVE]'), event);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

process.on('uncaughtException', error => {
  log.error('[ERROR]', error.message);
  mainWindow.webContents.send('uncaught-exception', error.message);
});
