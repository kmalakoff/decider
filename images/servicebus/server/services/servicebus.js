module.exports = function() { return require('servicebus').bus({url: process.env.RABBITMQ_SERVICE_URL}); }
