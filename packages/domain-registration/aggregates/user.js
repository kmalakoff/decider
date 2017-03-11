const _ = require('lodash');
const uuid = require('uuid');
const CreateUser = require('../commands/create_user');

module.exports = class User {
  constructor(id) {
    this.id = id;
    this.first = '';
    this.last = '';
    this.email = '';
  }

  streamName(id) { return `${this.constructor.name}-${id || this.id}`; }

  hydrate(e) {
    switch (e.type) {
      case 'user_created': { _.extend(this, _.pick(e, 'id', 'first', 'last', 'email')); break; }
      default: { break; }
    }
  }

  execute(command) {
    if (command instanceof CreateUser) {
      const events = [_.defaults({ type: 'user_created', id: uuid.v4() }, _.pick(command, 'id', 'first', 'last', 'email'))];
      this.hydrate(events[0]); // TODO: is this correct?
      return events;
    }
    throw new Error('Unrecognized command');
  }
};
