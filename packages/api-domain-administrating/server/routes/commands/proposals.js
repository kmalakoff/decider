const wrap = fn => (...args) => fn(...args).catch((err) => args[1].status(500).send(err.message));

const executeAndRespond = require('../../lib/execute_and_respond');
const CreateProposal = require('../../commands/create_proposal');
const Proposal = require('../../aggregates/proposal');

module.exports = function({app, services}) {
  app.post('/commands/v1/proposals', wrap(async function (req, res) {
    executeAndRespond(services.es, new Proposal(), new CreateProposal(req.body), res);
  }));
}
