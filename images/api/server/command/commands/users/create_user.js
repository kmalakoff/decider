const _ = require('lodash');

module.exports = class CreateUser {
  constructor(data) { _.extend(this, _.pick(data, 'first', 'last', 'email')); }
}
