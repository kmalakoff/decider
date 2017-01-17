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
      `webpack-dev-server/client?http://127.0.0.1:${options.webpackPort}`,
      webpackConfig.entry
    ],
    output: {
      path: '/',
      filename: 'bundle.js',
      publicPath: '/client/'
    },
    plugins: (webpackConfig.plugins || []).concat([new webpack.HotModuleReplacementPlugin()]),
  });

  await new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {'*': `http://127.0.0.1:${options.webPort}`}
  }).listen(options.webpackPort);
}
