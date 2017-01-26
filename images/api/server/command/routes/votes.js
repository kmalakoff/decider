const wrap = fn => (...args) => fn(...args).catch((err) => args[1].status(500).send(err.message));

const executeAndRespond = require('../lib/execute_and_respond');
const CreateVote = require('../commands/votes/create_vote');
const Vote = require('../aggregates/vote');

module.exports = function({app, services}) {
  app.post('/commands/v1/votes', wrap(async function (req, res) {
    executeAndRespond(services.es, new Vote(), new CreateVote(req.body), res);
  }));
}
