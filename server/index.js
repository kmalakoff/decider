require('./initialize');
const path = require('path');
const express = require('express');
const http = require('http');
const requireDirectory = require('require-directory');

async function initialize() {
  const app = express();
  app.use(require('cors')());
  app.use(require('body-parser').json());

  const server = http.Server(app);
  const services = requireDirectory(module, './services');
  const options = {app, server, services};
  for (var key in services) services[key] = await services[key](options);

  Object.values(requireDirectory(module, '../packages/decider-api/server/query/routes')).forEach((m) => m(options));
  Object.values(requireDirectory(module, '../packages/decider-api/server/command/routes')).forEach((m) => m(options));
  Object.values(requireDirectory(module, '../packages/decider-workers/server/workers')).forEach((m) => m(options));
  Object.values(requireDirectory(module, '../packages/decider-servicebus/server/workers')).forEach((m) => m(options));
  Object.values(requireDirectory(module, '../packages/decider-web/server/routes')).forEach((m) => m(options));

  const PORT = +process.env.PORT;
  try { await server.listen(PORT); console.log(`Server started on port: ${PORT}`); }
  catch(err) { return console.error(`Server failed to start on port: ${PORT}`, err); }
}

initialize().catch((err) => console.log(err));
