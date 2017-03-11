const RETRY_SLEEP = 5000;

async function createServiceBus() {
  return new Promise((resolve, reject) => {
    console.log('Creating', process.env.RABBITMQ_SERVICE_URL);
    const servicebus = require('servicebus').bus({ url: process.env.RABBITMQ_SERVICE_URL });
    servicebus.on('ready', () => {
      console.log('Service bus ready:', process.env.RABBITMQ_SERVICE_URL);
      resolve(servicebus);
    });
    servicebus.on('error', reject);
    servicebus.on('connection.error', reject);
  });
}

module.exports = async () => new Promise(async (resolve, reject) => {
  let interval = setInterval(async () => {
    try {
      const servicebus = await createServiceBus();
      if (servicebus) {
        clearInterval(interval); interval = null;
        return resolve(servicebus);
      }
    } catch (err) {
      if (err.code !== 'ECONNREFUSED') {
        clearInterval(interval); interval = null;
        return reject(err);
      }
      console.log('Service bus not ready. Retrying connection', err.code, process.env.RABBITMQ_SERVICE_URL);
    }
  }, RETRY_SLEEP);
});
