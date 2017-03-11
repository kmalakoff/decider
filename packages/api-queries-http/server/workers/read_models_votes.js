const _ = require('lodash');
const eventsEmitter = require('@decider/lib-shared/events_emitter');

module.exports = ({ services }) => {
  const emitter = eventsEmitter(services.es);
  emitter.on('event', (e) => {
    (async () => {
      switch (e.type) {
        case 'vote_created': {
          let res = await services.mongo
            .collection('votes')
            .updateMany(_.pick(e, 'id', 'name', 'proposal_id'), { $inc: { completed_count: 1 } });

          if (res.result.nModified < 1) {
            res = await services.mongo
              .collection('votes')
              .insert(_.defaults({ created_at: new Date() }, _.pick(e, 'id', 'name', 'proposal_id')));
          }

          services.servicebus.send('publish', { channel: 'votes', query: { id: e.id } });
          console.log('Updated read model:', JSON.stringify(e));
          break;
        }
        default: { break; }
      }
    })();
  });
};
