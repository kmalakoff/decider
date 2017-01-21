const eventsEmitter = require('../../lib/events_emitter');
const findOrCreate = require('../../lib/find_or_create');

module.exports = function({app, services, read_models}) {
  read_models.voters = read_models.voters || [];

  const emitter = eventsEmitter(services.es);
  emitter.on('event', (e) => {
    switch(e.type) {
      case 'something_completed': {
        let voter = findOrCreate(
          read_models.voters,
          x => { return x.id === e.voter_id },
          () => { return {id: e.voter_id, title: 'Semantic-Org/Semantic-UI', completed_count: 0}; }
        );
        voter.completed_count++;
        break;
      }
    }
  });
}
