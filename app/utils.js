//utilities

'use strict';
import { remote } from 'electron';

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
    }
  } catch(e) {
    console.error(e);
    return false;
  }

  return Object.keys(packages).map(function(pkey) {
    return packages[pkey];
  });
}

export function showMessageBox(opts, cb = {}) {
  let name = opts.name;
  let action = opts.action;
  let version = opts.version;
  let message = "Would you like to $action $name@version";

  message = message.replace('$action', action).replace('$name@version', () => {
    if(name && version) {
      return name + ' v' + version;
    } else if(name && !version) {
      return name;
    } else {
      return '';
    }
  });

  remote.dialog.showMessageBox(remote.getCurrentWindow(), {
    type: 'question',
    message: `${message}\nContinue? `,
    buttons: ['OK', 'CANCEL']
  }, (btnIdx) => {
    switch (btnIdx) {
      case 0:
        cb();
        break;
      default:
        return;
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

//using request module
export function makeRequest(opts, cb) {
  const Request = require('request');
  let options = opts || {};

  let callback = function(error, response, body) {
    if(error) {
      throw new Error(error);
    }
    if (response.statusCode == 200 && cb) {
      cb(body);
    } else {
      return response.statusCode;
    }
  }

  Request(options, callback);
}
