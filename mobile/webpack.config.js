var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  debug: true,
  devtool: 'source-map',

  entry: {
    'index.ios': ['./app/main.ios.js'],
    'index.android': ['./app/main.android.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      //using babelrc, transpile all es2015 code
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  }
};
