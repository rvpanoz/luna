/**
 * Build config for electron renderer process
 */

import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import baseConfig from './webpack.config.base';
import CheckNodeEnv from './internals/scripts/CheckNodeEnv';

CheckNodeEnv('production');

export default merge.smart(baseConfig, {
  mode: 'production',

  devtool: 'source-map',

  target: 'electron-renderer',

  entry: './app/index',

  output: {
    path: path.join(__dirname, 'app/dist'),
    publicPath: './dist/',
    filename: 'renderer.prod.js',
  },

  module: {
    rules: [
      // Extract all .css to style.css as is
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          publicPath: './',
          use: {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
          fallback: 'style-loader',
        }),
      },
      // Common Image Formats
      {
        test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
        use: 'file-loader',
      },
    ],
  },

  plugins: [
    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),

    new UglifyJSPlugin({
      parallel: true,
      sourceMap: true,
    }),

    new ExtractTextPlugin('style.css'),

    new BundleAnalyzerPlugin({
      analyzerMode:
        process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
      openAnalyzer: process.env.OPEN_ANALYZER === 'true',
    }),
  ],
});
