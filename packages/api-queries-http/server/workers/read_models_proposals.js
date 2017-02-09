const _ = require('lodash');
const eventsEmitter = require('@decider/lib-shared/events_emitter');
const findOrCreate = require('@decider/lib-shared/find_or_create');

module.exports = function({app, services}) {
  const emitter = eventsEmitter(services.es);
  emitter.on('event', (e) => {
    (async () => {
      switch(e.type) {
        case 'proposal_created': {
          let res = await services.mongo.collection('proposals').updateMany(_.pick(e, 'id', 'name'), {$inc: {completed_count: 1}});
          if (res.result.nModified < 1) {
            res = await services.mongo.collection('proposals').insert(_.defaults({created_at: new Date()}, _.pick(e, 'id', 'name')));
          }

          services.servicebus.send('publish', {channel: 'proposals', query: {id: e.id}});
          console.log('Updated read model:', JSON.stringify(e));
          break;
        }
      }
    })();
  });
}
