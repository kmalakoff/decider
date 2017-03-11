const Primus = require('primus');

class Socketbus {
  constructor(primus, servicebus) {
    this.primus = primus;
    this.servicebus = servicebus;

    this.subscriptions = {};

    primus.on('connection', (spark) => {
      spark.on('data', (data) => { this.addSubscription(spark, data); });
      spark.on('disconnect', () => { this.removeSubscriptions(spark); });
    });

    servicebus.listen('publish', (data) => { this.broadcastMessage(data); });
  }

  addSubscription(spark, { channel, query }) {
    if (!channel) return console.log(spark.id, 'channel missing for subscribe');

    if (!(channel in this.subscriptions)) this.subscriptions[channel] = {};
    const subscriptions = this.subscriptions[channel];
    if (!(spark.id in subscriptions)) subscriptions[spark.id] = { spark, query: query || {} };
    // const sparkSubscriptions = subscriptions[spark.id];
    console.log('Added subscriptions:', spark.id, channel, query);
  }

  removeSubscriptions(spark) {
    this.subscriptions.forEach(channel => delete this.subscriptions[channel][spark.id]);
    console.log('Removed subscriptions:', spark.id);
  }

  broadcastMessage(data) {
    console.log('receiving change (servicebus)', data);
    const subscriptions = this.subscriptions[data.channel];
    (subscriptions || []).forEach((sparkId) => {
      console.log('publishing', sparkId, data.channel, data.query);
      subscriptions[sparkId].spark.write(data);
    });
  }
}

// TODO: move the non-initialization logic to a worker?
module.exports = async ({ server, services }) => {
  const primus = new Primus(server, { transformer: 'uws' });
  return new Socketbus(primus, services.servicebus);
};
