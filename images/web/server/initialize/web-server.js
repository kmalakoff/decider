const path = require('path');
const express = require('express');

const CLIENT_ENV_VARS = ['NODE_ENV', 'READ_API_URL', 'COMMAND_API_URL'];
const CLIENT_ENV_BOOTSTRAP = 'window.__ENV__={};' + CLIENT_ENV_VARS.map(key => `window.__ENV__["${key}"]=${JSON.stringify(process.env[key])};`).join('');
const CLIENT_HTML = `<html><head><title>Decider</title></head><body><div id="root"></div><script>(function() {${CLIENT_ENV_BOOTSTRAP}})();</script><script src="/client/bundle.js"></script></body></html>`;

module.exports = async function(options) {
  const app = express();
  app.use(require('cors')());
  app.get('/', (req, res) => { res.type('text/html; charset=UTF-8'); res.send(CLIENT_HTML); });
  app.use('/', express.static(path.join(__dirname, '..', '..', 'public')));

  await app.listen(options.webPort);
}
