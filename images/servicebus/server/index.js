require('./initialize');
const path = require('path');
const express = require('express');
const http = require('http');

async function initialize() {
  const app = express();
  app.use(require('cors')());

  const server = http.Server(app);
  const services = require('require-directory')(module, './services');
  for (var key in services) services[key] = await services[key]({app, server, services});

  const PORT = +process.env.PORT;
  try { await server.listen(PORT); console.log(`Server started on port: ${PORT}`); }
  catch(err) { return console.error(`Server failed to start on port: ${PORT}`, err); }
}

initialize();
