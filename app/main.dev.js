/**
 * Electron's main process
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 */

import electron from 'electron';
import { app, BrowserWindow, remote, ipcMain } from 'electron';
import MenuBuilder from './menu';

const config = require('./config');
const cwd = process.cwd();
const NODE_ENV = process.env.NODE_ENV;
const platform = process.platform;
const shell = require('./shell');

let debug = /--debug/.test(process.argv[2]);
let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};

/**
 * IPC events
 */

ipcMain.on('get-packages', (event, options) => {
  shell.doCmd('list', options, (data, type) => {
    switch (true) {
      case (type === 'close'):
        event.sender.send('get-packages-close', data);
        break;
      case (type === 'error'):
        logger.log(data);
        event.sender.send('get-packages-error', data);
        break;
      default:
        event.sender.send('search-packages-reply', data);
    }
  });
});

ipcMain.on('view-by-version', (event, options) => {
  shell.doCmd('view', options, (data) => {
    event.sender.send('view-by-version-reply', JSON.parse(data));
  });
});

ipcMain.on('get-package', (event, options) => {
  shell.doCmd('list', options, (data) => {
    event.sender.send('get-package-reply', JSON.parse(data));
  });
});

ipcMain.on('search-packages', (event, options) => {
  shell.doCmd('search', options, (data, type) => {
    switch (true) {
      case (type === 'close'):
        event.sender.send('search-packages-close', data);
        break;
      case (type === 'error'):
        logger.log(data);
        event.sender.send('search-packages-error', data);
        break;
      default:
        event.sender.send('search-packages-reply', data);
    }
  });
});

ipcMain.on('update-package', (event, options) => {
  shell.doCmd('install', options, (data, end) => {
    if (end) {
      event.sender.send('update-package-close', data);
    } else {
      event.sender.send('update-package-reply', data);
    }
  });
});

ipcMain.on('install-package', (event, options) => {
  shell.doCmd('install', options, (data, end) => {
    if (end) {
      event.sender.send('install-package-close', data);
    } else {
      event.sender.send('install-package-reply', data);
    }
  });
});

ipcMain.on('uninstall-package', (event, options) => {
  shell.doCmd('uninstall', options, (data, end) => {
    if (end) {
      event.sender.send('uninstall-package-close', data);
    } else {
      event.sender.send('uninstall-package-reply', data);
    }
  });
});

/* =========================== */

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
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  let screenSize = electron.screen.getPrimaryDisplay().size;

  //create main window
  mainWindow = new BrowserWindow({
    'min-width': 790,
    height: screenSize.height,
    show: true,
    resizable: true
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  if (process.env.NODE_ENV === 'development' && debug) {
    //open devtools
    mainWindow.openDevTools();

    //inspect element on right click
    ipcMain.on('inspect-element', function(event, coords) {
      if (mainWindow) {
        mainWindow.inspectElement(coords.x, coords.y);
      }
    });
  }

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

process.on('uncaughtException', function(err) {
  console.log(err);
});
