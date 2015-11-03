var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  debug: true,
  devtool: 'source-map',

  entry: './app.js',
  output: {
    path: path.resolve(__dirname, '../js'),
    filename: 'app.js'
  },
  resolve: {
    //allow using require paths relative to root rather than relative to path
    root: path.resolve('./'),
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      //using babelrc, transpile all es2015 code
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  }
};