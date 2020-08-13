const path = require('path');

require('@babel/register')({
  extensions: ['.jsx', '.js'],
  cwd: path.join(__dirname, '..', '..'),
});
