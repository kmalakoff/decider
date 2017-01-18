const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');

const APP_PATH = path.resolve(__dirname, 'client');
const CLIENT_ENV_VARS = require('./config/client_environment_variables');

module.exports = {
  entry: path.join(APP_PATH, 'index.' + process.env.NODE_ENV + '.jsx'),
  output: {
    path: path.join(__dirname, 'public', 'client'),
    filename: 'bundle.js'
  },
  resolve: {extensions: ['', '.js', '.jsx']},
  plugins: [new webpack.DefinePlugin({'process.env': _.pick(process.env, CLIENT_ENV_VARS)})],
  module: {
    loaders: [
      {test: /\.jsx?$/, loaders: ['babel'], include: APP_PATH},
      {test: /\.css$/, loaders: ['style', 'css']},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?minetype=application/font-woff'},
      {test: /\.(ttf|eot|svg|jpg|png)$/, loader: 'file-loader'}
    ]
  }
};
