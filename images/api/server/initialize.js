const urlFormat = require('url').format;

process.env.EVENTSTORE_SERVICE_URL = process.env.EVENTSTORE_SERVICE_URL || urlFormat({protocol: 'http:', slashes: true, hostname: process.env.EVENTSTORE_SERVICE_HOST, port: process.env.EVENTSTORE_SERVICE__PORT});
process.env.MONGODB_SERVICE_URL = process.env.MONGODB_SERVICE_URL || urlFormat({protocol: 'mongodb:', slashes: true, hostname: process.env.MONGODB_SERVICE_HOST, port: process.env.MONGODB_SERVICE_PORT, pathname: `/${process.env.MONGODB_SERVICE_DB}`});
process.env.RABBITMQ_SERVICE_URL = process.env.RABBITMQ_SERVICE_URL || urlFormat({protocol: 'amqp:', slashes: true, hostname: process.env.RABBITMQ_SERVICE_HOST, port: process.env.RABBITMQ_SERVICE__PORT});
