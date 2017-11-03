//utilities

'use strict';

import { remote, ipcRenderer } from 'electron';

export function isArray() {
  let objectArray;
  objectArray = Object.prototype.toString().call(arguments[0]);
  return (objectArray === '[object Array]');
}

export function parse(data, key, all) {
  let arr = [], packages;
  try {
    packages = JSON.parse(data);
    if (key && packages[key]) {
      packages = packages[key];
      return Object.keys(packages).map(function(pkey) {
        return packages[pkey];
      });
    } else {
      return [];
    }
  } catch(e) {
    console.error(e);
    return false;
  }
}

export function showMessageBox(opts, cb = {}) {
  let name = opts.name;
  let action = opts.action;
  let version = opts.version;
  let message = "Would you like to $action $name@version";

  message = message.replace('$action', action).replace('$name@version', () => {
    if(name && version) {
      return name + ' to version ' + version;
    } else if(name && !version) {
      return name;
    } else {
      return '';
    }
  });

  remote.dialog.showMessageBox(remote.getCurrentWindow(), {
    type: 'question',
    message: `${message}\nContinue? `,
    buttons: ['CANCEL', action]
  }, (btnIdx) => {
    if(Boolean(btnIdx) === true) {
      cb();
    }
  });
}

export function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
