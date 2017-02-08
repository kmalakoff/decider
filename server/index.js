require('./initialize');
const express = require('express');
const http = require('http');
const requireDirectory = require('require-directory');

async function initialize() {
  const app = express();
  const server = http.Server(app);
  app.use(require('cors')());
  app.use(require('body-parser').json());

  // initialize services
  const services = requireDirectory(module, './services');
  const options = {app, server, services};
  for (var key in services) services[key] = await services[key](options);

  // initialize modules
  const MODULES = JSON.parse(process.env.MODULES);
  MODULES.forEach((module_path) => { console.log(`Loading module: ${module_path}`); require(module_path)(options); });

  // start server
  const PORT = +process.env.PORT;
  try { await server.listen(PORT); console.log(`Server started on port: ${PORT}`); }
  catch(err) { return console.error(`Server failed to start on port: ${PORT}`, err); }
}

initialize().catch(console.error);
