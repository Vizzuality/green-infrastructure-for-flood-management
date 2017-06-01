const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const sharedConfig = require('./shared.js');

const rootPath = process.cwd();

module.exports = merge(sharedConfig, {

  output: { filename: '[name]-[hash].js' },

  module: {
    rules: [{
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true
            },
            gifsicle: {
              interlaced: false
            },
            optipng: {
              optimizationLevel: 7
            },
            pngquant: {
              quality: '75-90',
              speed: 4
            }
          }
        }
      ],
      include: [
        path.resolve(rootPath, 'node_modules', 'leaflet'),
        path.resolve(rootPath, 'src')
      ]
    }]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ]

});
