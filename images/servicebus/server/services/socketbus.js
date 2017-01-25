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

  addSubscription(spark, {channel, query}) {
    if (!channel) return console.log(spark.id, 'channel missing for subscribe');

    let subscriptions = this.subscriptions[channel]
    if (!subscriptions) subscriptions = this.subscriptions[channel] = {};
    let spark_subscriptions = subscriptions[spark.id];
    if (!spark_subscriptions) spark_subscriptions = subscriptions[spark.id] = {spark, query: query || {}};
    console.log('Added subscriptions:', spark.id, channel, query);
  }

  removeSubscriptions(spark) {
    for (var channel in this.subscriptions) delete this.subscriptions[channel][spark.id];
    console.log('Removed subscriptions:', spark.id);
  }

  broadcastMessage(data) {
    console.log('receiving change (servicebus)', data);
    let subscriptions = this.subscriptions[data.channel];
    if (subscriptions) {
      for (var spark_id in subscriptions) {
        console.log('publishing', spark_id, data.channel, data.query);
        subscriptions[spark_id].spark.write(data);
      }
    }
  }
}

// TODO: move the non-initialization logic to a worker?
module.exports = async function({server, services}) { 
  const primus = new Primus(server, {transformer: 'uws'});
  return new Socketbus(primus, services.servicebus);
}
