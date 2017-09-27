//utilities

'use strict';

module.exports = {
  isArray: function() {
    let args = arguments, objectArray;
    if(!args.length) {
      return;
    }
    objectArray = Object.prototype.toString().call(arguments[0]);
    return (objectArray === '[object Array]');
  },
  parse(data) {
    let packages = data.dependencies;
    let arr = [];
    for (let z in packages) {
      let mod = {
        name: z,
        version: packages[z].version
      }
      arr.push(mod);
    }
    return arr;
  },
  isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}
