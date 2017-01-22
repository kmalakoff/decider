const eventsEmitter = require('../../lib/events_emitter');
const findOrCreate = require('../../lib/find_or_create');

module.exports = function({app, services, read_models}) {
  read_models.voters = read_models.voters || [];

  const emitter = eventsEmitter(services.es);
  emitter.on('event', (e) => {
    (async () => {
      switch(e.type) {
        case 'something_completed': {
          let res = await services.mongo.collection('voters').updateMany({voter_id: e.voter_id}, {$inc: {completed_count: 1}});
          if (res.result.nModified < 1) {
            res = await services.mongo.collection('voters').insert({created_at: new Date(), voter_id: e.voter_id, text: 'Semantic-Org/Semantic-UI', completed_count: 1})
          }

          console.log('Updated read model:', JSON.stringify({voter_id: e.voter_id}));
          break;
        }
      }
    })();
  });
}
