const sleep = require('sleep-promise');

async function createServiceBus() {
  return new Promise((resolve, reject) => {
    console.log('Creating', process.env.RABBITMQ_SERVICE_URL);
    servicebus = require('servicebus').bus({url: process.env.RABBITMQ_SERVICE_URL});
    servicebus.on('ready', (err) => {
      console.log('Service bus ready:', process.env.RABBITMQ_SERVICE_URL);
      resolve(servicebus);
    });
    servicebus.on('error', (err) => { reject(err); });
  });
}

module.exports = async function() {
  return new Promise(async (resolve, reject) => {
    while (true) {
      try {
        let servicebus = await createServiceBus();
        if (servicebus) return resolve(servicebus);
      }
      catch (err) {
        console.log(err);
        sleep(500);
      }
    }
  });
}
