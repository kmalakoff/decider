const EventEmitter = require('eventemitter3');
const findOrCreate = require('../lib/find_or_create');

class EventStoreEventEmitter extends EventEmitter {
  constructor(es) {
    super();
    this.es = es;

    this.es.subscribeToAllFrom(null, true,
      (s, es_event) => {
        try {
          const e = JSON.parse(es_event.originalEvent.data.toString());
          if (e.type) this.emit('event', e);
        } catch (err) {}
      },
      function () { logger.info('Live processing started.'); },
      function (c, r, e) { logger.info('Subscription dropped.', c, r, e); },
      new (require('eventstore-node').UserCredentials)('admin', 'changeit')
    );
  }
}

let emitters = []

module.exports = function(es) {
  return findOrCreate(
    emitters,
    x => { return x.es === es },
    () => new EventStoreEventEmitter(es)
  );
}
