/* eslint-disable */

import ElectronStore from 'electron-store';
import path from 'path';
import chalk from 'chalk';
import { app, BrowserWindow, ipcMain, screen } from 'electron';
import log from 'electron-log';

import { APP_TOOLS, APP_ACTIONS } from './constants/AppConstants';
import MenuBuilder from './menu';
import mk from './mk';
import { CheckNpm } from '../internals/scripts';

import { onNpmView, onNpmList, onNpmSearch, onNpmInstall } from './mainProcess';

const { config } = mk;
const { defaultSettings } = config || {};
const { startMinimized } = defaultSettings;

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
 * Event handling
 * send asynchronous messages between main and renderer process
 * https://electronjs.org/docs/api/ipc-renderer
 */

/**
 * Channel: npm-command
 * Supports: npm ls <@scope>/]<pkg>, npm outdated <@scope>/<pkg>
 * https://docs.npmjs.com/cli/ls.html
 * 
 * */
ipcMain.on('npm-command', (event, options) => onNpmList(event, options, Store));

/**
 * Channel: npm-search
 * Supports: npm search [search terms ...]
 * https://docs.npmjs.com/cli/search.html
 * 
 * */
ipcMain.on('npm-search', (event, options) => onNpmSearch(event, options, Store));

/**
 * Channel: npm-view
 * Supports: npm view <@scope>/<name>@<version>
 * https://docs.npmjs.com/cli/view.html
 * 
 * */
ipcMain.on('npm-view', (event, options) => onNpmView(event, options, Store));

/**
 * Channel: npm-install
 * Supports: npm install <@scope>/<name>@<version>
 * https://docs.npmjs.com/cli/install.html
 * 
 * */
ipcMain.on('npm-install', (event, options) => onNpmInstall(event, options, Store));

/**
 * Channel: general
 * Supports: 
 * 
 * */
ipcMain.on('online-status-changed', (event, status) => {

});

/**
 * app listeners
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
    const npmEnvError = npmEnv && npmEnv.error;

    event.sender.send('npm-env-close', npmEnvError, npmEnv);

    // user settings
    const userSettings = Store.get('user_settings') || defaultSettings;
    event.sender.send('settings-loaded-close', userSettings);

    // directories history
    const openedPackages = Store.get('opened_packages') || [];
    event.sender.send('history-close', openedPackages);

    // signal finish
    event.sender.send('finish-loaded');
  });

  mainWindow.webContents.on('crashed', event => {
    log.error(chalk.white.bgRed.bold('[CRASHED]'), event);
    app.quit() // TODO: handle this
  });

  mainWindow.on('unresponsive', event => {
    log.error(chalk.white.bgRed.bold('[UNRESPONSIVE]'), event);
    app.quit() // TODO: handle this
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

process.on('uncaughtException', error => {
  log.error('[ERROR]', error);
  mainWindow.webContents.send('uncaught-exception', error);
});
