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
  }
}
