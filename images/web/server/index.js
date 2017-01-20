const PORT = +process.env.PORT;

const path = require('path');
const express = require('express');
const app = express();
app.use(require('cors')());

const CLIENT_ENV_VARS = ['NODE_ENV', 'READ_API_URL', 'COMMAND_API_URL'];
const CLIENT_ENV_BOOTSTRAP = 'window.__ENV__={};' + CLIENT_ENV_VARS.map(key => `window.__ENV__["${key}"]=${JSON.stringify(process.env[key])};`).join('');
const CLIENT_HTML = `<html><head><title>Decider</title></head><body><div id="root"></div><script>(function() {${CLIENT_ENV_BOOTSTRAP}})();</script><script src="/client/bundle.js"></script></body></html>`;
app.get('/', (req, res) => { res.type('text/html; charset=UTF-8'); res.send(CLIENT_HTML); });

if (process.env.NODE_ENV !== 'production') {
  const _ = require('lodash');

  let webpack = require('webpack');
  let webpackMiddleware = require('webpack-dev-middleware');
  let webpackHotMiddleware = require('webpack-hot-middleware');
  let webpackConfig = require('../webpack.config.js');

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
    watchOptions: {aggregateTimeout: 300, poll: true},
    stats: {colors: true}
  });

  // serve the content using webpack
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}
else {
  app.use('/', express.static(path.join(__dirname, '..', 'public')));
}

app.listen(PORT, (err) => {
  if (err) return console.error(`Server failed to start on port: ${PORT}`, err);
  console.log(`Server started on port: ${PORT}`);
});
