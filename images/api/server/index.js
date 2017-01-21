const path = require('path');
const express = require('express');

async function initialize() {
  const app = express();
  app.use(require('cors')());
  app.use(require('body-parser').json());

  const services = require('require-directory')(module, './services');
  for (var key in services) services[key] = await services[key]();
  const read_models = {};
  let read_model_callbacks = [];
  Object.values(require('require-directory')(module, './read_models')).forEach((m) => read_model_callbacks.push(m({app, services, read_models})));
  Object.values(require('require-directory')(module, './routes')).forEach((m) => m({app, services, read_models}));

  services.es.subscribeToAllFrom(null, true,
    function (s, es_event) {
      try {
        const e = JSON.parse(es_event.originalEvent.data.toString());
        if (e.type) read_model_callbacks.forEach(callback => callback(e));
      } catch (err) {}
    },
    function () { logger.info('Live processing started.'); },
    function (c, r, e) { logger.info('Subscription dropped.', c, r, e); },
    new (require('eventstore-node').UserCredentials)('admin', 'changeit')
  );

  const PORT = +process.env.PORT;
  try { await app.listen(PORT); console.log(`Server started on port: ${PORT}`); }
  catch(err) { return console.error(`Server failed to start on port: ${PORT}`, err); }
}

initialize();
