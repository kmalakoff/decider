const CompleteSomething = require('../commands/complete_something');

module.exports = class Voter {
  constructor(id) {
    this.id = id;
    this.completed_count = 0;
  }

  streamName(id) { return this.constructor.name + '-' + (id || this.id); }

  hydrate(event) {
    switch(event.type) {
      case 'something_completed': { this.completed_count++; break; }
    }
  }

  execute(command) {
    if (command instanceof CompleteSomething) {
      if (command.voter_id != this.id) throw new Error('Validation: unexpected aggregate');
      return [{type: 'something_completed', voter_id: command.voter_id}];
    }
    throw new Error('Unrecognized command');
  }
}
