/* eslint-disable */

import fs from 'fs';
import path from 'path';
import { remote } from 'electron';
import {
  INFO_MESSAGES,
  WARNING_MESSAGES,
  ERROR_MESSAGES,
  CONFIRMATION_MESSAGES,
  TITLE_MESSAGES,
  ACTION_MESSAGES,
  LABEL_MESSAGES,
} from '../constants/AppMessages';

const SEPARATOR = path.sep;

/**
 *
 * @param {*} handler
 * @param {*} options
 */
export const showDialog = async (handler, options) => {
  if (!options || typeof options !== 'object') {
    return;
  }
  const { dialog, getCurrentWindow } = remote;
  const { mode, ...restOptions } = options || {};
  const modeHandler =
    mode === 'file' ? dialog.showOpenDialog : dialog.showMessageBox;

  const cb = (result) => {
    if (result) {
      handler && handler.apply(null, [result]);
    }
  };

  const result = await modeHandler(getCurrentWindow(), restOptions);
  cb(result);
};

/**
 *
 * @param {*} type
 * @param {*} key
 * @param {*} replacements
 */
export const iMessage = (type, key, replacements) => {
  const messageType = switchcase({
    confirmation: () => CONFIRMATION_MESSAGES,
    info: () => INFO_MESSAGES,
    title: () => TITLE_MESSAGES,
    action: () => ACTION_MESSAGES,
    warning: () => WARNING_MESSAGES,
    error: () => ERROR_MESSAGES,
    label: () => LABEL_MESSAGES,
  })(INFO_MESSAGES)(type);

  return messageType[key]
    ? messageType[key].replace(/%\w+%/g, (all) => replacements[all] || all)
    : key;
};

/**
 *
 * @param {*} namespace
 */
export const createActionCreator = (namespace) => (actionType) => {
  const type = `${namespace}/${actionType}`;
  const actionCreator = (payload) => ({
    type,
    payload,
  });

  actionCreator.type = type;
  Object.freeze(actionCreator);

  return actionCreator;
};

/**
 *
 * @param {*} str
 */
export const firstToUpper = (str) => {
  if (!str) {
    return null;
  }

  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index !== 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '');
};

/**
 * Object array
 * @param {*} obj
 */
export const objectEntries = (obj) => {
  let ownProps = Object.keys(obj);
  let i = ownProps.length;
  let resArray = new Array(i);

  while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];
  return resArray;
};

/**
 * Validate url
 * @param {*} url
 */
export const isUrl = (url) => {
  const matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  return matcher.test(url);
};

/**
 * @param {*} cases
 *
 */
export const switchcase = (cases) => (defaultCase) => (key) =>
  cases[key] && typeof cases[key] === 'function'
    ? cases[key].apply(undefined)
    : defaultCase;

/**
 *
 * @param {*} str
 */
export const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 *
 * @param {*} version
 */
export const isBeta = (version) => {
  if (!version) {
    return null;
  }

  return /beta/g.test(version);
};

/**
 *
 * @param {*} version
 */
export const isRC = (version) => {
  if (!version) {
    return null;
  }

  return /rc/g.test(version);
};

/**
 *
 * @param {*} version
 */
export const isAlpha = (version) => {
  if (!version) {
    return null;
  }

  return /alpha/g.test(version);
};

/**
 * Read package.json from a directory
 * @param {*} directory
 */
export const readPackageJson = (directory) => {
  try {
    const packageJSON = fs.readFileSync(path.join(directory), {
      encoding: 'utf8',
    });

    return JSON.parse(packageJSON);
  } catch (error) {
    return null;
  }
};

/**
 *
 * @param {*} subject
 * @param {*} needle
 */
export const matchType = (subject, needle) => {
  const prefixRegX = new RegExp(needle);

  return prefixRegX.test(subject);
};

/**
 * Parses and maps npm search response
 * @param {*} response
 */
export const parseFromSearch = (response) => {
  if (!response || typeof response !== 'string') {
    throw new Error(
      'utils[parseFromSearch]: response parameter must be a string'
    );
  }

  try {
    const dataArray = JSON.parse(response);

    return [dataArray];
  } catch (error) {
    throw new Error(error);
  }
};

export const parseMessage = (error) => {
  const errorParts = typeof error === 'string' && error.split(',');
  const errorMessage = errorParts && errorParts[0].split(':');

  if (errorMessage && errorMessage.length < 2) {
    return [];
  }

  return !errorMessage
    ? []
    : [errorMessage[0].trim(), errorMessage[1].trim(), errorParts[1]];
};

export const shrinkDirectory = (directory) => {
  if (directory) {
    try {
      const newPath = path.parse(directory);
      const { dir } = newPath || {};
      const dirParts = dir.split(SEPARATOR);

      return `${dirParts[dirParts.length - 2]}${SEPARATOR}${
        dirParts[dirParts.length - 1]
      }${SEPARATOR}package.json`;
    } catch (error) {
      throw new Error(error);
    }
  }

  return null;
};

export const parseNpmDoctor = (data) => {
  try {
    const dataToJson = JSON.parse(data);
    const { error } = dataToJson;

    if (error) {
      const { code, summary } = error;

      return {
        error: true,
        message: `${code}: ${summary}`,
        content: null,
      };
    }

    return dataToJson;
  } catch (error) {
    throw new Error(error);
  }
};

export const parseNpmAudit = (data) => {
  try {
    const dataToJson = JSON.parse(data);
    const { error } = dataToJson;

    if (error) {
      const { code, summary } = error;

      return {
        error: true,
        message: `${code}: ${summary}`,
        content: null,
      };
    }

    const { metadata, actions, advisories } = dataToJson || {};

    return {
      error: false,
      content: {
        metadata,
        actions,
        advisories,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
};

/** scroll to top */
export const scrollWrapper = (element, top) =>
  element &&
  element.scroll({
    top,
    behavior: 'smooth',
  });
