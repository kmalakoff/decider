const fs = require('fs');
const path = require('path');
const urlFormat = require('url').format;
const requireDirectory = require('require-directory');

// generate endpoints from Kubernetes defaults
process.env.EVENTSTORE_SERVICE_URL = process.env.EVENTSTORE_SERVICE_URL || urlFormat({protocol: 'http:', slashes: true, hostname: process.env.EVENTSTORE_SERVICE_HOST, port: process.env.EVENTSTORE_SERVICE_PORT});
process.env.MONGODB_SERVICE_URL = process.env.MONGODB_SERVICE_URL || urlFormat({protocol: 'mongodb:', slashes: true, hostname: process.env.MONGODB_SERVICE_HOST, port: process.env.MONGODB_SERVICE_PORT, pathname: `/${process.env.MONGODB_SERVICE_DB}`});
process.env.RABBITMQ_SERVICE_URL = process.env.RABBITMQ_SERVICE_URL || urlFormat({protocol: 'amqp:', slashes: true, hostname: process.env.RABBITMQ_SERVICE_HOST, port: process.env.RABBITMQ_SERVICE_PORT});

// no modules selected, load all available
if (!process.env.MODULES) {
  const PACKAGE_NAMES = fs.readdirSync(path.join(__dirname, '..', 'packages'));
  const MODULE_PATHS = ['server/routes', 'server/workers'];
  const EXPECTED_ERRORS = ['ENOTDIR', 'ENOENT'];

  let MODULES = [];
  PACKAGE_NAMES.forEach((package_name) => MODULE_PATHS.forEach((module_path) => {
    try { Object.values(requireDirectory(module, `../packages/${package_name}/${module_path}`, {visit: (_, full_path) => MODULES.push(full_path) })); }
    catch (err) { if (!~EXPECTED_ERRORS.indexOf(err.code)) throw err; }
  }));
  process.env.MODULES = JSON.stringify(MODULES);
}
