const _ = require('lodash');
const uuid = require('uuid');
const CreateProposal = require('../commands/proposals/create_proposal');

module.exports = class Proposal {
  constructor(id) {
    this.id = id;
    this.name = '';
  }

  streamName(id) { return this.constructor.name + '-' + (id || this.id); }

  hydrate(e) {
    switch(e.type) {
      case 'proposal_created': { _.extend(this, _.pick(e, 'id', 'name')); break; }
    }
  }

  execute(command) {
    if (command instanceof CreateProposal) {
      let events = [_.defaults({type: 'proposal_created', id: uuid.v4()}, _.pick(command, 'id', 'name'))];
      this.hydrate(events[0]); // TODO: is this correct?
      return events;
    }
    throw new Error('Unrecognized command');
  }
}
