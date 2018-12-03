/* eslint global-require: off */
/* eslint-disable compat/compat */

import { app, BrowserWindow, ipcMain } from 'electron';
import { merge } from 'ramda';
import ElectronStore from 'electron-store';
import { autoUpdater } from 'electron-updater';
import fs from 'fs';
import log from 'electron-log';
import MenuBuilder from './menu';
import shell from './shell';
import mk from './mk';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

mk.logToFile = true;

const APP_PATHS = {
  appData: app.getPath('appData'),
  userData: app.getPath('userData')
};

const { defaultSettings } = mk.config;

// NODE_EVN
const NODE_ENV = process.env.NODE_ENV;

// get parameters
const debug = /--debug/.test(process.argv[2]);
const needslog = /--log/.test(process.argv[3]);

// window min resolution
const MIN_WIDTH = 1366;
const MIN_HEIGHT = 768;

// store initialization
const Store = new ElectronStore();

// clear opened packages
Store.set('openedPackages', []);

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/** ipcRender events */

/* analyze directory */
ipcMain.on('analyze-json', (event, filePath) => {
  if (!filePath) {
    throw new Error('filePath is not defined');
  }

  try {
    fs.readFile(filePath, 'utf8', (err, fileContent) => {
      if (err) {
        if (err.code === 'ENOENT') {
          return;
        }
        throw new Error(err);
      }

      const content = JSON.parse(fileContent);
      const openedPackages = Store.get('openedPackages') || [];

      if (openedPackages.indexOf(filePath) === -1) {
        Store.set('openedPackages', [].concat(openedPackages, filePath));
      }

      event.sender.send(
        'analyze-json-close',
        filePath,
        content,
        Store.get('openedPackages')
      );
    });
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
});

/* generic ipc-event dispatcher */
ipcMain.on('ipc-event', (event, options) => {
  const opts = options || {};
  const { ipcEvent } = opts || {};

  function callback(status, command, data, ...args) {
    const isStatus = status && typeof status === 'string';

    if (!isStatus) {
      mk.log('FATAL: command status is not valid');
      throw new Error('command status is not valid');
    }

    // const args = arguments;

    // if (args.length === 1) {
    //   console.log(args);
    //   return;
    // }

    if (args.length === 2) {
      event.sender.send('ipcEvent-reply', args[1]);
      return;
    }

    switch (status) {
      case 'close':
        if (['install', 'update', 'uninstall'].indexOf(ipcEvent) > -1) {
          event.sender.send('action-close', data, command);
        } else {
          event.sender.send(`${ipcEvent}-close`, data, command, ...args);
        }
        break;
      case 'error':
        event.sender.send('ipcEvent-error', data);
        break;
      default:
        break;
    }
  }

  /**
   * At this point we try to run a shell command
   * sending output using spawn to renderer via ipc events
   * */
  try {
    const settings = Store.get('user_settings');

    shell.doCommand(merge(opts, settings || {}), callback);
  } catch (e) {
    throw new Error(e.message);
  }
});

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // remove this if the app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
});
