const wrap = fn => (...args) => fn(...args).catch((err) => args[1].status(500).send(err.message));

const executeAndRespond = require('@decider/lib-shared/command/execute_and_respond');
const CreateVote = require('@decider/domain-voting/commands/create_vote');
const Vote = require('@decider/domain-voting/aggregates/vote');

module.exports = function({app, services}) {
  app.post('/commands/v1/votes', wrap(async (req, res) => {
    executeAndRespond(services.es, new Vote(), new CreateVote(req.body), res);
  }));
}
