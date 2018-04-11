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
            mozjpeg: { progressive: true },
            gifsicle: { interlaced: false },
            optipng: { optimizationLevel: 7 },
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: { comments: false }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]

});
