/**
 * Base webpack config used across other specific configs
 */

const path = require('path');
const webpack = require('webpack');

export default {
  module: {
    rules: [
      {
        test: /\.js|.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname, 'src'),
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    new webpack.NamedModulesPlugin(),
  ],
};
