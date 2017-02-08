const path = require('path');
const express = require('express');
const _ = require('lodash');

module.exports = function({app}) {
  if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../../webpack.config.js');

    const config = _.merge(_.cloneDeep(webpackConfig), {
      devtool: 'eval',
      entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?reload=true',
        webpackConfig.entry
      ],
      output: {
        path: '/',
        filename: 'bundle.js',
        publicPath: '/client/'
      },
      plugins: (webpackConfig.plugins || []).concat([new webpack.HotModuleReplacementPlugin()])
    });
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
      publicPath: config.output.publicPath,
      noInfo: true,
      quiet: false,
      lazy: false,
      stats: {colors: true}
    });

    // serve the content using webpack
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
  }
  else {
    app.use('/', express.static(path.join(__dirname, '..', '..', 'public')));
  }
}
