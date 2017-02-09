const wrap = fn => (...args) => fn(...args).catch((err) => args[1].status(500).send(err.message));

const executeAndRespond = require('@decider/lib-shared/command/execute_and_respond');
const CreateProposal = require('@decider/domain-administration/commands/create_proposal');
const Proposal = require('@decider/domain-administration/aggregates/proposal');

module.exports = function({app, services}) {
  app.post('/commands/v1/proposals', wrap(async (req, res) => {
    executeAndRespond(services.es, new Proposal(), new CreateProposal(req.body), res);
  }));
}
