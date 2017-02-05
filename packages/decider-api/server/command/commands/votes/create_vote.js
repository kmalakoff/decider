const _ = require('lodash');

module.exports = class CreateVote {
  constructor(data) { _.extend(this, _.pick(data, 'name', 'proposal_id')); }
}
