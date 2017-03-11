const _ = require('lodash');
const uuid = require('uuid');
const CreateVote = require('../commands/create_vote');

module.exports = class Vote {
  constructor(id) {
    this.id = id;
    this.name = '';
  }

  streamName(id) {
    return `${this.constructor.name}-${id || this.id}`;
  }

  hydrate(e) {
    switch (e.type) {
      case 'vote_created': { _.extend(this, _.pick(e, 'id', 'name', 'proposal_id')); break; }
      default: { break; }
    }
  }

  execute(command) {
    if (command instanceof CreateVote) {
      const events = [
        _.defaults({ type: 'vote_created', id: uuid.v4() }, _.pick(command, 'id', 'name', 'proposal_id'))
      ];
      this.hydrate(events[0]); // TODO: is this correct?
      return events;
    }
    throw new Error('Unrecognized command');
  }
};
