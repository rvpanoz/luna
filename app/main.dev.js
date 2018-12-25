/* eslint-disable */

import ElectronStore from 'electron-store';
import path from 'path';
import fs from 'fs';
import log from 'electron-log';
import MenuBuilder from './menu';
import mk from './mk';

import { app, BrowserWindow, ipcMain, screen } from 'electron';
import { merge } from 'ramda';
import { autoUpdater } from 'electron-updater';
import { runCommand } from './shell';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

const APP_PATHS = {
  appData: app.getPath('appData'),
  userData: app.getPath('userData')
};

// defaults settings
const { config } = mk;
const {
  defaultSettings: { manager, startMinimized }
} = config;

const {
  DEBUG_PROD,
  UPGRADE_EXTENSIONS,
  NODE_ENV,
  START_MINIMIZED = startMinimized
} = process.env;

// get parameters
const debug = /--debug/.test(process.argv[2]);
const needslog = /--log/.test(process.argv[3]);

// window min resolution
const MIN_WIDTH = 0;
const MIN_HEIGHT = 0;

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

  require('electron-debug')();
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

// channel: analyze-json
ipcMain.on('analyze-json', (event, filePath) => {
  console.log(1);
  if (!filePath) {
    throw new Error('file path is not defined');
  }

  try {
    fs.readFile(filePath, 'utf8', (err, fileContent) => {
      if (err) {
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
  } catch (error) {
    mk.log(error.message);
    throw new Error(error);
  }
});

// channel: ipc-event
ipcMain.on('ipc-event', (event, options) => {
  const { ipcEvent, activeManager, ...rest } = options || {};

  const callback = (status, error, data, cmd) => {
    /**
     *  Send response to renderer process via ipc events
     */
    switch (status) {
      case 'close':
        if (['install', 'update', 'uninstall'].indexOf(ipcEvent) > -1) {
          event.sender.send('action-close', data);
        } else {
          event.sender.send(`${ipcEvent}-close`, status, cmd, data);
        }
        break;
      case 'error':
        event.sender.send('ipcEvent-error', error);
        break;
      default:
        break;
    }
  };

  /**
   * At this point we try to run a shell command sending output
   * using spawn to renderer via ipc events
   */
  try {
    const params = merge(settings, {
      activeManager,
      ...rest
    });

    runCommand.apply(null, [params, callback]);
  } catch (e) {
    mk.log(e.message);
    throw new Error(e);
  }
});

/**
 * Add event listeners
 */

app.on('window-all-closed', () => {
  /**
   * Respect the OSX convention of having the application
   * in memory even after all windows have been closed
   */

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (NODE_ENV === 'development') {
    await installExtensions();
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

  // TODO: needs work for RETINA displays

  // if (MIN_WIDTH > screenSize.width) {
  //   mk.log(`FATAL: low_resolution ${screenSize.width}x${screenSize.height}`)
  //   throw new Error(
  //     `Resolution ${screenSize.width}x${screenSize.height} is not supported.`
  //   )
  // }

  /**
   * Main window
   */
  mainWindow = new BrowserWindow({
    width: MIN_WIDTH || screenSize.width,
    height: MIN_HEIGHT || screenSize.height,
    x,
    y,
    show: false,
    resizable: true,
    icon: path.join(__dirname, 'resources/icon.ico')
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('mainWindow is not defined');
    }
    if (START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }

    if (NODE_ENV === 'development') {
      mainWindow.openDevTools();
    }
  });

  mainWindow.webContents.on('crashed', event => {
    console.log(event);
  });

  mainWindow.on('unresponsive', event => {
    console.log(event);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // eslint-disable-next-line
  // new AppUpdater(); // TODO: use AppUpdater
});

process.on('uncaughtException', error => {
  mk.log(error.message);
  mainWindow.webContents.send('uncaught-exception', error);
});
