/**
 * Electron's Main process
 */

import {
  app,
  BrowserWindow
} from 'electron';

let mainWindow = null;
let cwd = process.cwd();
let NODE_ENV = process.env.NODE_ENV;

// get parameters
let debug = /--debug/.test(process.argv[4]);

//development mode
if (NODE_ENV === 'development' && debug) {
  require('./development/imports.js');
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  createMainWindow();
});
