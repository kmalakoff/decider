const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../../webpack.config');

module.exports = async function(options) {
  const config = _.merge(_.cloneDeep(webpackConfig), {
    devtool: 'eval',
    entry: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://0.0.0.0:${options.webpackPort}`,
      webpackConfig.entry
    ],
    output: {
      path: '/',
      filename: 'bundle.js',
      publicPath: '/client/'
    },
    plugins: (webpackConfig.plugins || []).concat([new webpack.HotModuleReplacementPlugin()])
  });

  await new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    progress: true,
    host: '0.0.0.0',
    port: options.webPort,
    historyApiFallback: true,
    watchOptions: {aggregateTimeout: 300, poll: 1000},
    proxy: {'*': `http://0.0.0.0:${options.webPort}`}
  }).listen(options.webpackPort, '0.0.0.0');
}
