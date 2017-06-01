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
      test: /\.jsx?$/,
      exclude: /(node_modules|lib)/,
      use: ['babel-loader']
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
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
      })
    }]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(rootPath, 'src'),
      path.resolve('src'),
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
