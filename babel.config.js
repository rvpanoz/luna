/* eslint global-require: off */

const developmentEnvironments = ['development', 'test'];

const developmentPlugins = [];

const productionPlugins = [
  require('babel-plugin-dev-expression'),

  // babel-preset-react-optimize
  require('@babel/plugin-transform-react-constant-elements'),
  require('@babel/plugin-transform-react-inline-elements'),
  require('babel-plugin-transform-react-remove-prop-types'),
];

module.exports = (api) => {
  // see docs about api at https://babeljs.io/docs/en/config-files#apicache

  const development = api.env(developmentEnvironments);

  return {
    presets: [
      [
        require('@babel/preset-env'),
        {
          targets: { node: true },
        },
      ],
      [require('@babel/preset-react'), { development }],
    ],
    plugins: [
      // Stage 1
      require('@babel/plugin-proposal-export-default-from'),
      [require('@babel/plugin-proposal-optional-chaining'), { loose: false }],
      [
        require('@babel/plugin-proposal-pipeline-operator'),
        { proposal: 'minimal' },
      ],
      [
        require('@babel/plugin-proposal-nullish-coalescing-operator'),
        { loose: false },
      ],

      // Stage 2
      require('@babel/plugin-proposal-throw-expressions'),

      // Stage 3
      require('@babel/plugin-syntax-dynamic-import'),
      [require('@babel/plugin-proposal-class-properties'), { loose: true }],

      ...(development ? developmentPlugins : productionPlugins),
    ],
  };
};
