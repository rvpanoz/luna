//utilities

'use strict';

export function isArray() {
  let objectArray;
  objectArray = Object.prototype.toString().call(arguments[0]);
  return (objectArray === '[object Array]');
}

export function parse(data, key) {
  let packages = JSON.parse(data);
  let arr = [];

  if (key) {
    packages = packages[key];
  }

  return Object.keys(packages).map(function(key) {
    return packages[key];
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
