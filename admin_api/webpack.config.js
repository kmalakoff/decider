const path = require('path');
const webpack = require('webpack');

const APP_PATH = path.resolve(__dirname, 'client');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: path.join(APP_PATH, 'index.' + NODE_ENV + '.jsx'),
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
