/* eslintrc  */

const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  env: {
    browser: true,
    node: true
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'linebreak-style': 0,
    'arrow-parens': ['off'],
    'compat/compat': 'error',
    'consistent-return': 'off',
    'comma-dangle': 'off',
    'generator-star-spacing': 'off',
    'import/no-unresolved': 'error',
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-console': 'off',
    'no-use-before-define': 'off',
    'no-multi-assign': 'off',
    'promise/param-names': 'error',
    'promise/always-return': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    'react/sort-comp': [
      'error',
      {
        order: [
          'type-annotations',
          'static-methods',
          'lifecycle',
          'everything-else',
          'render'
        ]
      }
    ],
    'react/jsx-no-bind': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 'off'
  },
  plugins: ['import', 'promise', 'compat', 'react', 'react-hooks'],
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, 'configs/webpack.config.eslint.js')
      }
    }
  }
};
