const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');

const APP_PATH = path.resolve(__dirname, 'client');

module.exports = {
  entry: path.join(APP_PATH, 'index.' + process.env.NODE_ENV + '.js'),
  output: {
    path: path.join(__dirname, 'public', 'client'),
    filename: 'bundle.js'
  },
  resolve: {extensions: ['', '.js', '.jsx']},
  module: {
    loaders: [
      {test: /\.jsx?$/, loaders: ['babel'], include: APP_PATH},
      {test: /\.css$/, loaders: ['style', 'css']},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?minetype=application/font-woff'},
      {test: /\.(ttf|eot|svg|jpg|png)$/, loader: 'file-loader'}
    ]
  }
};