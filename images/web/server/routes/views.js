const CLIENT_ENV_VARS = ['NODE_ENV', 'API_URL'];
const CLIENT_ENV_BOOTSTRAP = 'window.__ENV__={};' + CLIENT_ENV_VARS.map(key => `window.__ENV__["${key}"]=${JSON.stringify(process.env[key])};`).join('');
const CLIENT_HTML = `<html><head><title>Decider</title></head><body><div id="root"></div><script>(function() {${CLIENT_ENV_BOOTSTRAP}})();</script><script src="/client/bundle.js"></script></body></html>`;

module.exports = function(app) {
  app.get('/', (req, res) => { res.type('text/html; charset=UTF-8'); res.send(CLIENT_HTML); });
}