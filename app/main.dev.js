/**
 * Electron's main process
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 */

'use strict';

import electron from 'electron';
import { app, BrowserWindow, remote, ipcMain, dialog } from 'electron';
import MenuBuilder from './menu';

const path = require('path');
const config = require('./config');
const cwd = process.cwd();
const NODE_ENV = process.env.NODE_ENV;
const platform = process.platform;
const shell = require('./shell');
const { execSync } = require('child_process');

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

ipcMain.on('analyze-json', (event, filePath) => {
  if (!filePath) {
    throw new Error('filePath is not defined');
  }
  const fs = require('fs');
  fs.readFile(filePath, 'utf8', (err, fileContent) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error('package.json does not exist');
        return;
      }
      throw err;
    }

    let content = false;
    try {
      content = JSON.parse(fileContent);
      event.sender.send('analyze-json-close', filePath, content);
    } catch (e) {
      throw new Error('Error: Unable to parse package.json file.');
    }
  });
});

ipcMain.on('ipc-event', (event, options) => {
  const opts = options || {};
  const ipcEvent = opts.ipcEvent || false;

  function callback(data, command, status) {
    switch (status) {
      case 'close':
        if (['Install', 'Update', 'Uninstall'].indexOf(ipcEvent) > -1) {
          event.sender.send('action-close', data, command);
        } else {
          event.sender.send(ipcEvent + '-close', data, command);
        }
        break;
      case 'error':
        event.sender.send('ipcEvent-error', data);
        break;
      default:
        event.sender.send(ipcEvent + '-reply', data, command);
    }
    return;
  }

  /**
  * At this point we try to run a shell command
  * sending output using spawn to renderer via ipc events
  **/
  try {
    shell.doCommand(opts, callback);
  } catch (e) {
    throw new Error(e);
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

  const Screen = electron.screen;
  let x,
    y;
  let screenSize = Screen.getPrimaryDisplay().size;
  let displays = electron.screen.getAllDisplays()
  let externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  if (externalDisplay) {
    x = externalDisplay.bounds.x + 50;
    y = externalDisplay.bounds.y + 50;
  }

  try {
    execSync('npm -v', {
      stdio: 'ignore'
    });
  } catch (e) {
    if(mainWindow !== null) {
      mainWindow.close();
    }
    dialog.showErrorBox('Fatal error', "NPM is not installed on your system.\nPlease visit https://www.npmjs.com for more details.");
    return;
  }

  //create main window
  mainWindow = new BrowserWindow({
    width: screenSize.width,
    height: screenSize.height,
    x: x,
    y: y,
    show: false,
    resizable: true,
    icon: path.join(__dirname, 'resources/icon.ico')
  });

  //load app.html file
  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
    mainWindow.openDevTools();
  });

  mainWindow.webContents.on('crashed', () => {
    //todo..
  });

  mainWindow.on('unresponsive', () => {
    //todo..
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
  console.error(err);
});
