/**
 * Build config for development electron renderer process that uses
 * Hot-Module-Replacement
 */

import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import chalk from 'chalk'
import merge from 'webpack-merge'
import { spawn, execSync } from 'child_process'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import baseConfig from './webpack.config.base'
import CheckNodeEnv from './internals/scripts/CheckNodeEnv'

CheckNodeEnv('development')

const port = process.env.port || 1213
const publicPath = `http://localhost:${port}/dist`
const dll = path.resolve(process.cwd(), 'dll')
const manifest = path.resolve(dll, 'renderer.json')

/**``
 * Warn if the DLL is not built
 */
if (!(fs.existsSync(dll) && fs.existsSync(manifest))) {
  console.log(
    chalk.black.bgYellow.bold(
      'The DLL files are missing. Sit back while we build them for you with "npm run build-dll"'
    )
  )
  execSync('npm run build-dll')
}

export default merge.smart(baseConfig, {
  devtool: 'inline-source-map',

  target: 'electron-renderer',

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}/`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'app/index.js')
  ],

  resolve: {
    alias: {
      actions: path.resolve(__dirname, 'app/actions'),
      constants: path.resolve(__dirname, 'app/constants'),
      common: path.resolve(__dirname, 'app/components/common'),
      components: path.resolve(__dirname, 'app/components'),
      containers: path.resolve(__dirname, 'app/containers'),
      styles: path.resolve(__dirname, 'app/styles'),
      utils: path.resolve(__dirname, 'app/utils')
    }
  },

  output: {
    publicPath: `http://localhost:${port}/dist/`,
    filename: 'renderer.dev.js'
  },

  module: {
    rules: [
      {
        test: /\.js|.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: [
              'transform-class-properties',
              'transform-es2015-classes',
              'react-hot-loader/babel'
            ]
          }
        }
      },
      // {
      // 	test: /\.js|.jsx$/,
      // 	exclude: /node_modules/,
      // 	use: ['eslint-loader']
      // },
      {
        test: /\.global\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /^((?!\.global).)*\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          }
        ]
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader'
      }
    ]
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(manifest),
      sourceType: 'var'
    }),

    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     *
     * By default, use 'development' as NODE_ENV. This can be overriden with
     * 'staging', for example, by changing the ENV variables in the npm scripts
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),

    new webpack.LoaderOptionsPlugin({
      debug: true
    }),

    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ],

  node: {
    __dirname: false,
    __filename: false
  },

  devServer: {
    port,
    publicPath,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'dist'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    },
    before() {
      if (process.env.START_HOT) {
        console.log('Starting Main Process...')
        spawn('npm', ['run', 'start-main-dev'], {
          shell: true,
          env: process.env,
          stdio: 'inherit'
        })
          .on('close', (code) => process.exit(code))
          .on('error', (spawnError) => console.error(spawnError))
      }
    }
  }
})
