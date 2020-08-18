/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, ipcMain, screen } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import CheckNpm from '../internals/scripts/CheckNpm'
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
import chalk from 'chalk';

// https://github.com/electron/electron/issues/18397
app.allowRendererProcessReuse = false;

const {
  MIN_WIDTH = 0,
  MIN_HEIGHT = 0,
  UPGRADE_EXTENSIONS = 1,
  NODE_ENV,
  START_MINIMIZED = false,
} = process.env;

const debug = /--debug/.test(process.argv[2]);
const systemPaths = {
  Home: app.getPath('home'),
  AppData: app.getPath('appData'),
  UserData: app.getPath('userData'),
};

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

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
    extensions.map((name) => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Create Main window
 */
const createWindow = async () => {
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

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    width: screenSize.width,
    height: screenSize.height,
    x,
    y,
    show: false,
    resizable: true,
    webPreferences: {
      nodeIntegration: NODE_ENV === 'development',
      preload: NODE_ENV === 'production' ? path.join(__dirname, 'dist/renderer.prod.js') : undefined
    },
    icon: path.join(__dirname, '..', 'resources/icon.png'),
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.webContents.on('did-finish-load', async (event: any) => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }

    const { stdout, stderr } = await CheckNpm();

    event.sender.send('npm-env-close', stderr, stdout);
    event.sender.send('finish-loaded');
  });

  mainWindow.webContents.on('crashed', (event: any) => {
    log.error(chalk.redBright.bold('[CRASHED]'), event);
    app.quit();
  });

  mainWindow.on('unresponsive', (event: any) => {
    log.error(chalk.redBright.bold('[UNRESPONSIVE]'), event);
    app.quit();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Event handling
 * send asynchronous messages between main and renderer process
 * https://electronjs.org/docs/api/ipc-renderer
 */

/**
 * Channel: npm-list-outdated
 * Supports: npm list <@scope>/]<pkg>, npm outdated <@scope>/<pkg>
 * https://docs.npmjs.com/cli/ls.html
 * https://docs.npmjs.com/cli/outdated.html
 *
 * */
ipcMain.on('npm-list-outdated', (event, options) =>
  onNpmListOutdated(event, options)
);

/**
 * Channel: npm-uninstall
 * Supports: npm uninstall <@scope>/]<pkg>
 * https://docs.npmjs.com/cli/uninstall.html
 *
 * */
ipcMain.on('npm-uninstall', (event, options) =>
  onNpmUninstall(event, options)
);

/**
 * Channel: npm-search
 * Supports: npm search [search terms ...]
 * https://docs.npmjs.com/cli/search.html
 *
 * */
ipcMain.on('npm-search', (event, options) =>
  onNpmSearch(event, options)
);

/**
 * Channel: npm-view
 * Supports: npm view <@scope>/<name>@<version>
 * https://docs.npmjs.com/cli/view.html
 *
 * */
ipcMain.on('npm-view', (event, options) => onNpmView(event, options));

/**
 * Channel: npm-install
 * Supports: npm install <@scope>/<name>@<version>
 * https://docs.npmjs.com/cli/install.html
 *
 * */
ipcMain.on('npm-install', (event, options) =>
  onNpmInstall(event, options)
);

/**
 * Channel: npm-update
 * Supports: npm update <@scope>/<name>@<version>
 * https://docs.npmjs.com/cli/update.html
 *
 * */
ipcMain.on('npm-update', (event, options) =>
  onNpmUpdate(event, options)
);

/**
 * Channel: npm-audit
 * Supports: npm audit [--json|--parseable]
 * https://docs.npmjs.com/cli/audit
 *
 */
// ipcMain.on('npm-audit', (event, options) => onNpmAudit(event, options));

/**
 * Channel: npm-init
 * Supports: npm init
 * https://docs.npmjs.com/cli/init
 *
 */
ipcMain.on('npm-init', (event, options) => onNpmInit(event, options));

/**
 * Channel: npm-dedupe
 * Supports: npm dedupe
 * https://docs.npmjs.com/cli/dedupe
 *
 */
// ipcMain.on('npm-dedupe', (event, options) =>
//   onNpmDedupe(event, options)
// );

/**
 * Channel: npm-init-lock
 * Supports: npm i --package-lock-only
 *
 */
// ipcMain.on('npm-init-lock', (event, options) =>
//   onNpmInitLock(event, options)
// );

/**
 * Channel: npm-doctor
 * Supports: npm doctor
 * https://docs.npmjs.com/cli/doctor
 *
 */
// ipcMain.on('npm-cache', (event, options) => onNpmCache(event, options));

/**
 * Channel: npm-doctor
 * Supports: npm doctor
 * https://docs.npmjs.com/cli/doctor
 *
 */
// ipcMain.on('npm-doctor', (event, options) =>
//   onNpmDoctor(event, options)
// );

/**
 * Add event listeners
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

if (process.env.E2E_BUILD === 'true') {
  // eslint-disable-next-line promise/catch-or-return
  app.whenReady().then(createWindow);
} else {
  app.on('ready', createWindow);
}

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
