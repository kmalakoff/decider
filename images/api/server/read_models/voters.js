const eventstore = require('eventstore-node');
const uuid = require('uuid');

module.exports = function({app, services, readModels}) {
  readModels.voters = readModels.voters || [];

  function findOrCreate(id) {
    let index = readModels.voters.findIndex(v => v.id === id);
    if (~index) return readModels.voters[index];
    let voter = {id: uuid.v4(), title: 'Semantic-Org/Semantic-UI', description: 'Updated 10 mins ago', completed_count: 0};
    readModels.voters.push(voter);
    return voter;
  }

  services.es.subscribeToAllFrom(null, true,
    function (s, es_event) {
      try {
        const e = JSON.parse(es_event.originalEvent.data.toString());
        switch(e.type) {
          case 'something_completed': {
            let voter = findOrCreate(e.voter_id);
            voter.completed_count++;
            break;
          }
        }
      } catch (err) {}
    },
    function () { logger.info('Live processing started.'); },
    function (c, r, e) { logger.info('Subscription dropped.', c, r, e); },
    new eventstore.UserCredentials('admin', 'changeit')
  );
}
