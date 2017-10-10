var path = require('path');
var appRoot = path.join(__dirname, '..');

//ES6/ES7 (via Babel)
require('electron-compile').init(appRoot, require.resolve('./main'));
