/**
* Utilities
*
**/

import { remote, ipcRenderer } from 'electron';
import { APP_INFO } from './constants/AppConstants';
import * as R from 'ramda';
import React from 'react';

export const triggerEvent = (eventName, options) => {
  const {
    mode,
    directory,
    cmd,
    pkgName,
    pkgVersion,
    pkgOptions,
    multiple,
    packages,
    repo,
    latest
  } = options || {}

  ipcRenderer.send('ipc-event', {
    ipcEvent: eventName,
    cmd,
    directory,
    mode,
    multiple,
    packages,
    pkgName,
    pkgVersion,
    latest,
    pkgOptions,
    repo
  })
}

//object to array
export const objectEntries = obj => {
  let ownProps = Object.keys(obj),
    i = ownProps.length,
    resArray = new Array(i);

  while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
  return resArray;
};

//validate url
export function isUrl(url) {
  const matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  return matcher.test(url);
}

//switchcase currying
export const switchcase = (cases) => (defaultCase) => (key) =>
  (cases.hasOwnProperty(key) && typeof cases[key] === 'function'
    ? cases[key].apply(undefined)
    : defaultCase);

//convert first char to Uppercase
export function firstToUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//bind handler with the given context
export function autoBind(handlers, ctx) {
  const isReactComponent = (ctx instanceof React.Component);
  if(!isReactComponent) return;
  R.forEach((handler) => {
    if (typeof ctx[handler] === 'function') {
      ctx[handler] = ctx[handler].bind(ctx)
    }
  }, handlers)
}

//parse packages logic
export function parse(data, key, all) {
  let arr = [],
    packages;
  try {
    packages = JSON.parse(data);
    if (key && packages[key]) {
      packages = packages[key];
      return Object.keys(packages).map((pkey) => packages[pkey]);
    }
    return [];
  } catch (e) {
    console.error(e);
  }
}

//deprecated
export function showMessageBox(opts, cb = {}) {
  const name = opts.name;
  const action = opts.action;
  const version = opts.version;
  let message = APP_INFO.CONFIRMATION;

  message = message.replace('$action', action.toLowerCase()).replace('$name@version', () => {
    if (name && version) {
      return `${name} ${version}`;
    } else if (name) {
      return name;
    }
    return '';
  });
  remote.dialog.showMessageBox(
    remote.getCurrentWindow(),
    {
      title: 'Confirmation',
      type: 'question',
      message,
      buttons: ['CANCEL', firstToUpper(action)]
    },
    (btnIdx) => {
      if (Boolean(btnIdx) === true) {
        cb();
      }
    }
  );
}

//utility fn
export function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
