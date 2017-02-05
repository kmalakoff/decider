require('./initialize');
const fs = require('fs');
const path = require('path');
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
  const PACKAGES = fs.readdirSync(path.resolve(path.join(__dirname, '..', 'packages')));
  const PACKAGE_MODULES = [path.join('server', 'routes'), path.join('server', 'workers')];
  PACKAGES.forEach((package) => PACKAGE_MODULES.forEach((mod) => {
    try { Object.values(requireDirectory(module, path.join('..', 'packages', package, mod), {visit: (m) => m(options)})); }
    catch (err) { if (!~['ENOTDIR', 'ENOENT'].indexOf(err.code)) throw err; }
  }));

  // start server
  const PORT = +process.env.PORT;
  try { await server.listen(PORT); console.log(`Server started on port: ${PORT}`); }
  catch(err) { return console.error(`Server failed to start on port: ${PORT}`, err); }
}

initialize().catch((err) => console.log(err));
