const _ = require('lodash');

module.exports = class CreateProposal {
  constructor(data) { _.extend(this, _.pick(data, 'name')); }
};
