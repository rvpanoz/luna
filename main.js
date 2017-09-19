/**
 * Electron's Main process
 */

import {
  app,
  BrowserWindow,
  dialog
} from 'electron';

const cwd = process.cwd();
const NODE_ENV = process.env.NODE_ENV;
const config = require('./config');
const electronStore = require('electron-store');
const shell = require('./shell');
const winston = require('winston');

let platform = process.platform;
let mainWindow = null;
let debug = /--debug/.test(process.argv[4]);

global.logger = new winston.Logger({
  level: 'info',
  transports: [
    new(winston.transports.Console)(),
    new(winston.transports.File)({
      filename: 'log.log'
    })
  ]
});

if (NODE_ENV === 'development' && debug) {
  /** https://github.com/yan-foto/electron-reload - hard reset, starts a new process **/
  require('electron-reload')(cwd, {
    electron: require('electron'),
    ignored: /log.log|node_modules|dist|build|[\/\\]\./
  });
}

//instatiate electron store
const store = new electronStore();

// set store and config as global objects
// so we can call them via remote.getGlobal(name)
// in a renderer process
global.store = store;
global.config = config;

function createMainWindow() {

  //create main window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: true
  });

  //load index.html
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  if (process.env.NODE_ENV === 'development' && debug) {
    //open devtools
    mainWindow.openDevTools();

    //inspect element on right click
    ipcMain.on('inspect-element', function(event, coords) {
      if (MainWindow) {
        MainWindow.inspectElement(coords.x, coords.y);
      }
    });
  }

  //on close event
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

app.on('gpu-process-crashed', (event, killed) => {
  throw new Error('gpu crached or is killed');
})

process.on('uncaughtException', function(err) {
  console.log(err);
});

// GPU AMD fix for Linux
if(platform === 'linux') {
  app.commandLine.appendSwitch('disable-gpu-compositing');
}
