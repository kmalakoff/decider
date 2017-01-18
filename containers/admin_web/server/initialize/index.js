module.exports = async function(options) {
  const webPort = options.useWebpackDevServer ? options.port + 1 : options.port;

  try {
    if (options.useWebpackDevServer) {
      const initializeWebpackDevServer = require('./webpack-dev-server');
      await initializeWebpackDevServer({webPort, webpackPort: options.port});
      console.log(`Webpack Dev Server listening at localhost:${options.port}`);
    }
    const initializeWebServer = require('./web-server');
    await initializeWebServer({webPort});
    console.log(`Server listening at localhost:${webPort}`);
  } catch (err) {
    console.error('Failed to initialize server: ', err.message);
  }
}
