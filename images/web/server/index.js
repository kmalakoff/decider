const path = require('path');
const express = require('express');

async function initialize() {
  const app = express();
  app.use(require('cors')());
  app.use(require('body-parser').json());

  const services = require('require-directory')(module, './services');
  for (var key in services) services[key] = await services[key]();
  Object.values(require('require-directory')(module, './routes')).forEach((m) => m({app, services}));

  const PORT = +process.env.PORT;
  try { await app.listen(PORT); console.log(`Server started on port: ${PORT}`); }
  catch(err) { return console.error(`Server failed to start on port: ${PORT}`, err); }
}

initialize();
