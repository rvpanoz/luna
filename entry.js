var path = require('path');
var appRoot = path.join(__dirname, '..');

//ES6 compile
require('electron-compile').init(appRoot, require.resolve('./main'));
