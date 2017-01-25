require('./initialize');
const path = require('path');

async function initialize() {
  const services = require('require-directory')(module, './services');
  for (var key in services) services[key] = await services[key]({services});
  Object.values(require('require-directory')(module, './workers')).forEach((m) => m({services}));
}

initialize();
