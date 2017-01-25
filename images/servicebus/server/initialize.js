const urlFormat = require('url').format;

process.env.RABBITMQ_SERVICE_URL = process.env.RABBITMQ_SERVICE_URL || urlFormat({protocol: 'amqp:', slashes: true, hostname: process.env.RABBITMQ_SERVICE_HOST, port: process.env.RABBITMQ_SERVICE__PORT});
