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

export const objectEntries = obj => {
  let ownProps = Object.keys(obj),
    i = ownProps.length,
    resArray = new Array(i);

  while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
  return resArray;
};

export function isUrl(url) {
  const matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  return matcher.test(url);
}

export const switchcase = (cases) => (defaultCase) => (key) =>
  (cases.hasOwnProperty(key) && typeof cases[key] === 'function'
    ? cases[key].apply(undefined)
    : defaultCase);

export function firstToUpper(str) {
  const firstCharToUpperCase = str[0].toUpperCase();
  return `${firstCharToUpperCase}${str.slice(1, str.length).toLowerCase()}`;
}

export function autoBind(handlers, ctx) {
  const isReactComponent = (ctx instanceof React.Component);
  if(!isReactComponent) return;
  R.forEach((handler) => {
    if (typeof ctx[handler] === 'function') {
      ctx[handler] = ctx[handler].bind(ctx)
    }
  }, handlers)
}

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

export function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
