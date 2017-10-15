/**
 * Electron's main process
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 */

import electron from 'electron';
import {app, BrowserWindow, remote, ipcMain} from 'electron';
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

//devtools
const installExtensions = async() => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload))).catch(console.log);
};

/**
 * IPC events
 */

ipcMain.on('ipc-event', (event, options) => {
  const opts = options || {};
  const ipcEvent = opts.ipcEvent || false;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function callback(data, status) {
    switch (true) {
      case(status && status === 'close'):
        event.sender.send(ipcEvent + '-close', data);
        break;
      case(status && status === 'error'):
        event.sender.send(ipcEvent + '-error', data);
        break;
      default:
        event.sender.send(ipcEvent + '-reply', data);
    }
    return;
  }

  if (ipcEvent && typeof ipcEvent === 'string') {
    let cmdArr = ipcEvent.split('-');
    if (cmdArr.length === 2) {
      let cmd = cmdArr[0] + capitalizeFirstLetter(cmdArr[1]);
      if (shell[cmd]) {
        /**
        * At this point we try to run a shell command
        * sending output (using spawn mod) to renderer via ipc events
        **/
        try {
          shell[cmd](opts, callback);
        } catch (e) {
          throw new Error(e);
        }
      }
    }
  }
});

/* =========================== */

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

app.on('ready', async() => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  //get screen size
  let screenSize = electron.screen.getPrimaryDisplay().size;

  //create main window
  mainWindow = new BrowserWindow({width: screenSize.width, height: screenSize.height, show: false, resizable: true});

  //load app.html file
  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('show', () => {
    //todo..
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
