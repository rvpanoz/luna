module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          ie: 11
        },
        useBuiltIns: 'usage'
      }
    ],
    '@babel/preset-react'
  ],
  ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    // '@babel/plugin-syntax-import-meta',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-json-strings',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    // '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    // '@babel/plugin-proposal-numeric-separator',
    // '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-object-assign'
  ]
};
