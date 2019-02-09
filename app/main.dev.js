/* eslint-disable */

/**
 * Applications main process
 */

import ElectronStore from 'electron-store';
import path from 'path';
import fs from 'fs';
import { merge } from 'ramda';
import { app, BrowserWindow, ipcMain, screen } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

import { APP_MODES, APP_ACTIONS } from './constants/AppConstants';
import { switchcase } from './commons/utils';
import MenuBuilder from './menu';
import mk from './mk';
import { runCommand } from './shell';
import chalk from 'chalk';

const { config } = mk;
const { defaultSettings } = config || {};
const { startMinimized, defaultManager } = defaultSettings;

const {
  DEBUG_PROD = 0,
  DEBUG_DEV = 1,
  MIN_WIDTH = 960,
  MIN_HEIGHT = 800,
  INSTALL_EXTENSIONS = 1,
  UPGRADE_EXTENSIONS,
  NODE_ENV,
  START_MINIMIZED = startMinimized
} = process.env;

const APP_PATHS = {
  appData: app.getPath('appData'),
  userData: app.getPath('userData')
};

// development parameters
// const debug = /--debug/.test(process.argv[2]);

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

// store initialization
const Store = new ElectronStore();

// clear opened packages
Store.set('openedPackages', []);

// user settings
const settings = Store.get('user_settings');

let mainWindow = null;

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

/**
 * Listen to ipcRenderer events
 */

// channel: ipc-event
ipcMain.on('ipc-event', (event, options) => {
  const { ipcEvent, activeManager = defaultManager, ...rest } = options || {};

  const onError = error => event.sender.send('ipcEvent-error', error);
  const onFlow = message => event.sender.send('ipcEvent-flow', message);

  const onClose = (status, errors, data, cmd) => {
    const { directory, mode } = rest;
    const actionIndex = APP_ACTIONS.indexOf(ipcEvent);

    if (actionIndex > -1 && ipcEvent !== 'view') {
      return event.sender.send('action-close', errors, data, cmd);
    }

    if (directory && mode === APP_MODES.LOCAL && cmd.includes('list')) {
      const openedPackages = Store.get('openedPackages') || [];
      const yarnLock = fs.existsSync(
        path.join(path.dirname(directory), 'yarn-lock.json')
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
    }

    event.sender.send('loaded-packages-close', Store.get('openedPackages'));
    event.sender.send(`${ipcEvent}-close`, status, cmd, data, errors, options);
  };

  const callback = (status, error, message, ...restArgs) =>
    switchcase({
      close: () => onClose(status, error, ...restArgs),
      error: () => onError(error),
      flow: () => onFlow(message)
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

app.on('window-all-closed', () => {
  /**
   * Respect the OSX convention of having the application
   * in memory even after all windows have been closed
   */

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.once('browser-window-created', () => {
  console.log(
    `${chalk.white.bgBlue.bold('[INFO] browser-window-created event')}`
  );
});

app.once('web-contents-created', event => {
  console.log(chalk.white.bgBlue.bold(`[INFO] web-contents-created event`));

  // TODO: check npm installation
  // try {
  //   const result = require('child_process').execSync('npm -v');
  //   const version = result.toString();

  //   if (NODE_ENV === 'development') {
  //     console.log(
  //       chalk.black.bgYellow.bold(`[INFO] found npm version ${version}`)
  //     );
  //   }

  //   event.sender.send('npm-version', version);
  // } catch (error) {
  //   event.sender.send('npm-error');
  // }
});

app.on('ready', async () => {
  console.log(chalk.white.bgBlue.bold(`[INFO] ready event`));

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
    // console.log(chalk.white.bgBlue.bold(`[INFO] ready-to-show started`));
  });

  mainWindow.webContents.on('did-finish-load', event => {
    // console.log(chalk.white.bgBlue.bold(`[INFO] did-finish-load started`));

    if (!mainWindow) {
      throw new Error('mainWindow is not defined');
    }

    if (START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }

    // user settings
    const userSettings = Store.get('user_settings') || defaultSettings;
    event.sender.send('settings_loaded', userSettings);

    // directories history
    const openedPackages = Store.get('opened_packages') || [];
    event.sender.send('loaded-packages-close', openedPackages);

    if (NODE_ENV === 'development') {
      mainWindow.openDevTools();
    }
  });

  mainWindow.webContents.on('crashed', event => {
    // console.log(event);
  });

  mainWindow.on('unresponsive', event => {
    // console.log(event);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  new AppUpdater();
});

process.on('uncaughtException', error => {
  mk.log(error.message);
  mainWindow.webContents.send('uncaught-exception', error.message);
});
