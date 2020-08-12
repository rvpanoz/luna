const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  extends: ['prettier', 'prettier/react'],
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  env: {
    browser: true, // access window, document, navigator objects
    node: true,
  },
  plugins: ['import', 'promise', 'compat', 'react', 'react-hooks'],
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, 'configs/webpack.config.eslint.js'),
      },
    },
  },
};
