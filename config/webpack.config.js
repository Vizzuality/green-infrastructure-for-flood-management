/* eslint camelcase:0 */
require('dotenv').config({ silent: true });

process.env.BROWSERSLIST_CONFIG = 'browserslist';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = process.cwd();

const config = {

  entry: [
    path.join(rootPath, 'src/main.jsx')
  ],

  output: {
    path: path.join(rootPath, 'dist/'),
    filename: '[name]-[hash].js',
    publicPath: '/'
  },

  externals: {
    leaflet: 'L'
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(scss|sass)$/,
        loader: 'style-loader!css-loader!sass-loader!postcss-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(eot|ttf|woff2|woff)$/,
        loader: 'url-loader?prefix=fonts/&context=/src/fonts'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader?prefix=image/&limit=5000&context=/src/images'
      }
    ]
  },

  resolve: {
    root: [
      path.join(rootPath, 'src')
    ],
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
  },

  sassLoader: {
    includePaths: [
      path.resolve('node_modules/foundation-sites/scss/'),
      path.resolve('node_modules/hamburgers/_sass/hamburgers/')
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
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

// Environment configuration
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      dead_code: true,
      drop_debugger: true,
      drop_console: true
    },
    comments: false
  }));
} else {
  config.devtool = 'source-map';
}

module.exports = config;
