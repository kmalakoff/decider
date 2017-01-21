const wrap = fn => (...args) => fn(...args).catch((err) => args[1].status(500).send(err.message));

const executeAndRespond = require('../../lib/execute_and_respond');
const CompleteSomething = require('../commands/complete_something');
const Voter = require('../aggregates/voter');

module.exports = function({app, services, read_models}) {
  app.post('/api/things', wrap(async function (req, res) {
    executeAndRespond(services.es, new Voter(req.body.voter_id), new CompleteSomething(req.body), res);
  }));
}
