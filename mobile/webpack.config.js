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
  resolveLoader: {
    root: [
      path.resolve(__dirname, '../shared_modules'),
      path.resolve(__dirname, './node_modules')
    ],
    extensions: ['', '.js']
  },
  resolve: {
    //allow using require paths relative to root rather than relative to path
    root: [
      path.resolve(__dirname, './app'),
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, '../shared_modules')],
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      //using babelrc, transpile all es2015 code
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  }
};
