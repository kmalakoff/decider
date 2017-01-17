const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config');

const PORT = process.env.PORT;

const config = _.merge(_.cloneDeep(webpackConfig), {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://0.0.0.0:${PORT}`,
    webpackConfig.entry
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/client/'
  },
  plugins: (webpackConfig.plugins || []).concat([new webpack.HotModuleReplacementPlugin()])
});

new WebpackDevServer(webpack(config), {
  contentBase: '/client',
  publicPath: path.join(__dirname, '..', 'public'),

  hot: true,
  inline: true,
  progress: true,
  host: '0.0.0.0',
  port: PORT,
  historyApiFallback: true,
  watchOptions: {aggregateTimeout: 300, poll: 1000}
}).listen(PORT, '0.0.0.0', (err) => {
  if (err) return console.error(`Server failed to start on port: ${PORT}`, err);
  console.log(`Server started on port: ${PORT}`);
});
