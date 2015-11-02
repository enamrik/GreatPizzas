var webpack = require('webpack');
var path = require('path');
var webpackConfig = require('./webpack.config');
webpackConfig.entry = {};

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],
    singleRun: true,
    frameworks: [ 'mocha' ],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: [ 'dots' ],
    webpack: Object.assign({}, webpackConfig, {
      devtool: 'inline-source-map',
      plugins: [
        new webpack.IgnorePlugin(/react-native/),
        new webpack.IgnorePlugin(/image!/)
      ]
    }),
    webpackServer: {
      noInfo: true
    }
  });
};
