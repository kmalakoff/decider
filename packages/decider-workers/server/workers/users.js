const _ = require('lodash');
const eventsEmitter = require('../lib/events_emitter');
const findOrCreate = require('../lib/find_or_create');

module.exports = function({app, services}) {
  const emitter = eventsEmitter(services.es);
  emitter.on('event', (e) => {
    (async () => {
      switch(e.type) {
        case 'user_created': {
          let res = await services.mongo.collection('users').updateMany(_.pick(e, 'id', 'first', 'last', 'email'), {$inc: {completed_count: 1}});
          if (res.result.nModified < 1) {
            res = await services.mongo.collection('users').insert(_.defaults({created_at: new Date()}, _.pick(e, 'id', 'first', 'last', 'email')));
          }

          services.servicebus.send('publish', {channel: 'users', query: {id: e.id}});
          console.log('Updated read model:', JSON.stringify(e));
          break;
        }
      }
    })();
  });
}