/**
 * development
 */

const path = require('path');
const electron = require('electron');
const cwd = process.cwd();
const crashReporter = electron.crashReporter;

module.exports = function() {
  console.info('development mode is on');

  crashReporter.start({
    productName: 'nodePM',
    companyName: 'nodePM',
    submitURL: 'http://127.0.0.1:3001/submit',
    uploadToServer: true
  });

  /** https://github.com/yan-foto/electron-reload - hard reset starts a new process **/
  require('electron-reload')(cwd, {
    electron: require('electron'),
    ignored: /log.log|node_modules|dist|build|[\/\\]\./
  });
}()
