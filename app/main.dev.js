/* eslint global-require: off, no-console: off */

/**
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack.
 */

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { app, BrowserWindow, ipcMain, screen } from 'electron';
import ElectronStore from 'electron-store';
import installExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import path from 'path';
import chalk from 'chalk';
import log from 'electron-log';
import fixPath from 'fix-path';
import MenuBuilder from './menu';
import mk from './mk';
import {
  onNpmListOutdated,
  onNpmView,
  onNpmSearch,
  onNpmInstall,
  onNpmUpdate,
  onNpmUninstall,
  onNpmAudit,
  onNpmCache,
  onNpmDoctor,
  onNpmDedupe,
  onNpmInit,
  onNpmInitLock,
} from './mainProcess';

const {
  defaultSettings: { startMinimized },
} = mk || {};

/* eslint-disable-next-line */
const debug = /--debug/.test(process.argv[2]);

/* eslint-disable-next-line */
const APP_PATHS = {
  Home: app.getPath('home'),
  AppData: app.getPath('appData'),
  UserData: app.getPath('userData'),
};

// Fix deprecation warning (Electron 8)
app.allowRendererProcessReuse = true;

const {
  DEBUG_PROD = 0,
  MIN_WIDTH = 1280,
  MIN_HEIGHT = 960,
  UPGRADE_EXTENSIONS = 1,
  NODE_ENV,
  START_MINIMIZED = startMinimized,
} = process.env;

const Store = new ElectronStore();
Store.set('history', []);

let mainWindow = null;

if (NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
  fixPath();
}

if (NODE_ENV === 'development' || DEBUG_PROD) {
  require('electron-debug')();
}

const setupExtensions = async () => {
  return installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
};

/**
 * Event handling
 * send asynchronous messages between main and renderer process
 * https://electronjs.org/docs/api/ipc-renderer
 */

/**
 * Channel: npm-list-outaded
 * Supports: npm list <@scope>/]<pkg>, npm outdated <@scope>/<pkg>
 * https://docs.npmjs.com/cli/ls.html
 * https://docs.npmjs.com/cli/outdated.html
 *
 * */
ipcMain.on('npm-list-outdated', (event, options) =>
  onNpmListOutdated(event, options, Store)
);

/**
 * Channel: npm-uninstall
 * Supports: npm uninstall <@scope>/]<pkg>
 * https://docs.npmjs.com/cli/uninstall.html
 *
 * */
ipcMain.on('npm-uninstall', (event, options) =>
  onNpmUninstall(event, options, Store)
);

/**
 * Channel: npm-search
 * Supports: npm search [search terms ...]
 * https://docs.npmjs.com/cli/search.html
 *
 * */
ipcMain.on('npm-search', (event, options) =>
  onNpmSearch(event, options, Store)
);

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
ipcMain.on('npm-install', (event, options) =>
  onNpmInstall(event, options, Store)
);

/**
 * Channel: npm-update
 * Supports: npm update <@scope>/<name>@<version>
 * https://docs.npmjs.com/cli/update.html
 *
 * */
ipcMain.on('npm-update', (event, options) =>
  onNpmUpdate(event, options, Store)
);

/**
 * Channel: npm-audit
 * Supports: npm audit [--json|--parseable]
 * https://docs.npmjs.com/cli/audit
 *
 */
ipcMain.on('npm-audit', (event, options) => onNpmAudit(event, options, Store));

/**
 * Channel: npm-init
 * Supports: npm init
 * https://docs.npmjs.com/cli/init
 *
 */
ipcMain.on('npm-init', (event, options) => onNpmInit(event, options, Store));

/**
 * Channel: npm-dedupe
 * Supports: npm dedupe
 * https://docs.npmjs.com/cli/dedupe
 *
 */
ipcMain.on('npm-dedupe', (event, options) =>
  onNpmDedupe(event, options, Store)
);

/**
 * Channel: npm-init-lock
 * Supports: npm i --package-lock-only
 *
 */
ipcMain.on('npm-init-lock', (event, options) =>
  onNpmInitLock(event, options, Store)
);

/**
 * Channel: npm-doctor
 * Supports: npm doctor
 * https://docs.npmjs.com/cli/doctor
 *
 */
ipcMain.on('npm-cache', (event, options) => onNpmCache(event, options, Store));

/**
 * Channel: npm-doctor
 * Supports: npm doctor
 * https://docs.npmjs.com/cli/doctor
 *
 */
ipcMain.on('npm-doctor', (event, options) =>
  onNpmDoctor(event, options, Store)
);

/**
 * app listeners
 * Supports: general app events
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

/* eslint-disable-next-line */
app.once('browser-window-created', (event, webContents) => {
  NODE_ENV === 'development' &&
    log.log(chalk.green.bold('[EVENT]: browser-window-created event fired'));
});

/* eslint-disable-next-line */
app.once('web-contents-created', (event, webContents) => {
  NODE_ENV === 'development' &&
    log.log(chalk.green.bold('[EVENT]: web-contents-created event fired'));
});

/**
 * Create main window
 */
const createMainWindow = async () => {
  let x = 0;
  let y = 0;
  const screenSize = screen.getPrimaryDisplay().size;
  const displays = screen.getAllDisplays();
  const externalDisplay = displays.find(
    (display) => display.bounds.x !== 0 || display.bounds.y !== 0
  );

  if (externalDisplay) {
    x = externalDisplay.bounds.x + 50;
    y = externalDisplay.bounds.y + 50;
  }

  mainWindow = new BrowserWindow({
    minWidth: MIN_WIDTH || screenSize.width,
    minHeight: MIN_HEIGHT || screenSize.height,
    x,
    y,
    show: false,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    icon: path.join(__dirname, '..', 'resources/icon.png'),
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.once('ready-to-show', () => {
    NODE_ENV === 'development' &&
      log.log(chalk.green.bold('[EVENT]: ready-to-show event fired'));
  });

  mainWindow.webContents.on('did-finish-load', async (event) => {
    NODE_ENV === 'development' &&
      log.log(chalk.green.bold('[EVENT]: did-finish-load event fired'));

    if (!mainWindow) {
      throw new Error('mainWindow is not defined');
    }

    if (START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }

    if (NODE_ENV === 'development' || DEBUG_PROD) {
      mainWindow.openDevTools();
    }

    // user settings
    const userSettings = Store.get('user_settings') || {};
    event.sender.send('settings-loaded-close', userSettings);

    // directories history
    const history = Store.get('history') || [];
    event.sender.send('history-close', history);

    // signal finish
    event.sender.send('finish-loaded');
  });

  mainWindow.webContents.on('crashed', (event) => {
    log.error(chalk.redBright.bold('[CRASHED]'), event);
    app.quit();
  });

  mainWindow.on('unresponsive', (event) => {
    log.error(chalk.redBright.bold('[UNRESPONSIVE]'), event);
    app.quit();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
};

app
  .whenReady()
  .then(async () => {
    NODE_ENV === 'development' &&
      log.log(chalk.green.bold('[EVENT]: ready event fired'));

    // TODO: fix error when installing extensions
    // if (NODE_ENV === 'development' || DEBUG_PROD) {
    //   await setupExtensions();
    // }

    createMainWindow();
  })
  .catch((error) => log.error(error));

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createMainWindow();
});

process.on('uncaughtException', (error) => {
  log.error('[ERROR]', error);
  mainWindow.webContents.send('uncaught-exception', error);
});
