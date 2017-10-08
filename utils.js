//utilities

'use strict';
import { remote } from 'electron';

export function isArray() {
  let objectArray;
  objectArray = Object.prototype.toString().call(arguments[0]);
  return (objectArray === '[object Array]');
}

export function parse(data, key) {
  let packages = JSON.parse(data);
  let arr = [];

  if (key && packages[key]) {
    packages = packages[key];
  }

  return Object.keys(packages).map(function(pkey) {
    return packages[pkey];
  });
}

export function showMessageBox(opts, cb = {}) {
  let pkgName = opts.name;
  let action = opts.action;
  let version, message;

  version = (opts.version !== "0") ? opts.version : 'latest';
  switch (action) {
    case 'UNINSTALL':
      message = `${action} ${pkgName} from your system.`;
      break;
    default:
      message = `${action} ${pkgName} to ${version} version`;
  }
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
