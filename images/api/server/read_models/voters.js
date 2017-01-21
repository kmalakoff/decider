const eventsEmitter = require('../lib/events_emitter');

let voters = []

function findOrCreate(id) {
  let index = voters.findIndex(v => v.id === id);
  if (~index) return voters[index];
  let voter = {id, title: 'Semantic-Org/Semantic-UI', completed_count: 0};
  voters.push(voter);
  return voter;
}

module.exports = function({app, services, read_models}) {
  read_models.voters = voters;

  const emitter = eventsEmitter(services.es);
  emitter.on('event', (e) => {
    switch(e.type) {
      case 'something_completed': {
        let voter = findOrCreate(e.voter_id);
        voter.completed_count++;
        break;
      }
    }
  });
}
