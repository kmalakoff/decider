const path = require('path');

const APP_PATH = path.resolve(__dirname, 'client');

module.exports = {
  entry: path.join(APP_PATH, `index.${process.env.NODE_ENV}.js`),
  output: {
    path: path.join(__dirname, 'public', 'client'),
    filename: 'bundle.js'
  },
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      { test: /\.jsx?$/, loaders: ['babel-loader'], include: APP_PATH },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg|jpg|png)$/, loader: 'file-loader' }
    ]
  }
};
