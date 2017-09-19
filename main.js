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

//development mode
if (NODE_ENV === 'development' && debug) {
  require('./development/imports.js');
}

//instatiate electron store
const store = new electronStore();

// set store and config as global objects
// so we can call them via remote.getGlobal in a renderer process
global.store = store;
global.config = config;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: true
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
