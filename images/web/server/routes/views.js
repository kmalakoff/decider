const _ = require('lodash');

const CLIENT_ENV_VARS = ['NODE_ENV', 'API_SERVICE_URL', 'SERVICEBUS_SERVICE_URL'];
const CLIENT_HTML = `<html>
  <head>
    <title>Decider</title>
  </head>
  <body>
    <div id="root"></div>
    <script>(function() { window.__ENV__=${JSON.stringify(_.pick(process.env, CLIENT_ENV_VARS))}; })();</script>
    <script src="${process.env.SERVICEBUS_SERVICE_URL}/primus/primus.js"></script>
    <script src="/client/bundle.js"></script>
  </body>
</html>`;

module.exports = function({app}) {
  app.get('/', (req, res) => { res.type('text/html; charset=UTF-8'); res.send(CLIENT_HTML); });
}
