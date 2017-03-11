const EventEmitter = require('eventemitter3');
const findOrCreate = require('./find_or_create');

class EventStoreEventEmitter extends EventEmitter {
  constructor(es) {
    super();
    this.es = es;

    this.es.subscribeToAllFrom(null, true,
      (s, esEvent) => {
        try {
          const e = JSON.parse(esEvent.originalEvent.data.toString());
          if (e.type) this.emit('event', e);
        } catch (err) { console.error(err); }
      },
      () => { console.info('Live processing started.'); },
      (c, r, e) => { console.info('Subscription dropped.', c, r, e); },
      new (require('eventstore-node').UserCredentials)('admin', 'changeit')
    );
  }
}

const emitters = [];

module.exports = es => findOrCreate(
    emitters,
    x => x.es === es,
    () => new EventStoreEventEmitter(es)
  );
