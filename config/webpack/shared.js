require('dotenv').config({ silent: true });

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootPath = process.cwd();

const config = {

  entry: [
    'babel-polyfill',
    path.join(rootPath, 'src/main.jsx')
  ],

  output: {
    path: path.join(rootPath, 'dist/'),
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [{
      test: /\.(js|jsx)?$/,
      exclude: /(node_modules|lib)/,
      use: [{
        loader: 'babel-loader'
      }],
      include: [
        path.resolve(rootPath, 'src')
      ]
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      }),
      include: [
        path.resolve(rootPath, 'node_modules', 'leaflet'),
        path.resolve(rootPath, 'node_modules', 'rc-collapse'),
        path.resolve(rootPath, 'node_modules', 'react-toggle-switch'),
        path.resolve(rootPath, 'node_modules', 'react-input-range'),
        path.resolve(rootPath, 'node_modules', 'react-select'),
        path.resolve(rootPath, 'src')
      ]
    }, {
      test: /\.(scss|sass)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader', {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve('node_modules/foundation-sites/scss/'),
                path.resolve('node_modules/hamburgers/_sass/hamburgers/')
              ]
            }
          },
          'postcss-loader'
        ]
      }),
      include: [
        path.resolve(rootPath, 'node_modules', 'react-tabs'),
        path.resolve(rootPath, 'src')
      ]
    }, {
      test: /\.(eot|ttf|woff2|woff)$/,
      use: ['file-loader'],
      include: [
        path.resolve(rootPath, 'src')
      ]
    }]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(rootPath, 'src'),
      path.join(rootPath, 'node_modules')
    ]
  },

  resolveLoader: {
    modules: [
      path.join(rootPath, 'node_modules')
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html',
      googleAnalytics: process.env.NODE_ENV === 'production' ?
        process.env.GOOGLE_ANALYTICS : 'UA-XXXXXXXX-YY'
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
      config: {
        API_URL: JSON.stringify(process.env.API_URL),
        BASEMAP_TILE_URL: JSON.stringify(process.env.BASEMAP_TILE_URL),
        BASEMAP_LABELS_URL: JSON.stringify(process.env.BASEMAP_LABELS_URL),
        LAYER_URL: JSON.stringify(process.env.LAYER_URL)
      }
    })
  ]

};

module.exports = config;
