const path = require('path');
const express = require('express');

async function initialize() {
  const app = express();
  app.use(require('cors')());
  app.use(require('body-parser').json());

  const services = require('require-directory')(module, './services');
  for (var key in services) services[key] = await services[key]({app, services});
  const read_models = {};
  Object.values(require('require-directory')(module, './query/read_models')).forEach((m) => m({app, services, read_models}));
  Object.values(require('require-directory')(module, './query/routes')).forEach((m) => m({app, services, read_models}));
  Object.values(require('require-directory')(module, './command/routes')).forEach((m) => m({app, services, read_models}));

  const PORT = +process.env.PORT;
  try { await app.listen(PORT); console.log(`Server started on port: ${PORT}`); }
  catch(err) { return console.error(`Server failed to start on port: ${PORT}`, err); }

  const bus = services.servicebus;
  setInterval(function () {
    console.log('sending change');
    bus.send('change', {data: 'hello'});
  }, 1000);
}

initialize();
