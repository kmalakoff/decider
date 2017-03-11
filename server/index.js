require('./initialize');
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const requireDirectory = require('require-directory');

async function initialize() {
  const app = express();
  const server = http.Server(app);
  app.use(cors());
  app.use(bodyParser.json());

  // initialize services
  const services = requireDirectory(module, './services');
  const options = { app, server, services };
  await Promise.all(Object.entries(services).map(async ([key, value]) => { services[key] = await value(options); }));

  // initialize modules
  const MODULES = JSON.parse(process.env.MODULES);
  MODULES.forEach((modulePath) => { console.log(`Loading module: ${modulePath}`); require(modulePath)(options); });

  // start server
  const PORT = +process.env.PORT;
  try {
    await server.listen(PORT); console.log(`Server started on port: ${PORT}`);
  } catch (err) { console.error(`Server failed to start on port: ${PORT}`, err); }
}

initialize().catch(console.error);
