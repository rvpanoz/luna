/**
 * Electron's Main process
 */

import electron from 'electron';
import {
  app,
  BrowserWindow,
  ipcMain,
  dialog
} from 'electron';

const cwd = process.cwd();
const NODE_ENV = process.env.NODE_ENV;
const config = require('./config');
const electronStore = require('electron-store');
const request = require('request');
const shell = require('./shell');
const winston = require('winston');

let platform = process.platform;
let MainWindow = null;
let debug = /--debug/.test(process.argv[2]);

const logger = new winston.Logger({
  level: 'info',
  transports: [
    new(winston.transports.Console)(),
    new(winston.transports.File)({
      filename: 'log.log'
    })
  ]
});

//hot-reload
if (NODE_ENV === 'development' && debug) {
  /** https://github.com/yan-foto/electron-reload - hard reset, starts a new process **/
  require('electron-reload')(cwd, {
    electron: require('electron'),
    ignored: /log.log|node_modules|dist|test|build|[\/\\]\./
  });
}

//instatiate electron store
const store = new electronStore();

// set store and config as global objects
// so we can call them via remote.getGlobal(name) in a renderer process
global.store = store;
global.config = config;
global.logger = logger;

function createMainWindow() {
  let screenSize = electron.screen.getPrimaryDisplay().size;

  //create main window
  MainWindow = new BrowserWindow({
    'min-width': 790,
    height: screenSize.height,
    show: true,
    resizable: true
  });

  //load index.html
  MainWindow.loadURL('file://' + __dirname + '/index.html');

  if (process.env.NODE_ENV === 'development' && debug) {
    //open devtools
    MainWindow.openDevTools();

    //inspect element on right click
    ipcMain.on('inspect-element', function(event, coords) {
      if (MainWindow) {
        MainWindow.inspectElement(coords.x, coords.y);
      }
    });
  }

  MainWindow.on('closed', () => {
    MainWindow = null;
  });
}

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
    event.sender.send('get-package-reply', data);
  });
});

ipcMain.on('search-packages', (event, options) => {
  shell.doCmd('search', options, (data, type) => {
    switch (true) {
      case (type === 'close'):
        event.sender.send('search-packages-close', data);
        break;
      case (type === 'error'):
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
 * register app events
 */
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  createMainWindow();

  if (process.env.NODE_ENV === 'development') {
    //load react devtools extension when app is ready
    BrowserWindow.addDevToolsExtension(
      '/home/rvpanoz/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.5.2_0'
    );
  }
});

app.on('gpu-process-crashed', (event, killed) => {
  throw new Error('gpu crached or is killed');
})

process.on('uncaughtException', function(err) {
  console.log(err);
});

// GPU AMD fix for Linux
if (platform === 'linux') {
  app.commandLine.appendSwitch('disable-gpu-compositing');
}
