const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const sharedConfig = require('./shared.js');

const rootPath = process.cwd();

module.exports = merge(sharedConfig, {

  devtool: 'cheap-module-source-map',

  stats: {
    errorDetails: true
  },

  output: {
    pathinfo: true
  },

  module: {
    rules: [{
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['file-loader'],
        include: [
          path.resolve(rootPath, 'node_modules', 'leaflet'),
          path.resolve(rootPath, 'src')
        ]
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]

});
