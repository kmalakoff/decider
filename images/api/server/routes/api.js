const wrap = fn => (...args) => fn(...args).catch((err) => args[1].status(500).send(err.message));

const hydrateAggregate = require('../lib/hydrate_aggregate');
const executeCommand = require('../lib/execute_command');
const CompleteSomething = require('../commands/complete_something');
const Voter = require('../aggregates/voter');

module.exports = function({app, services, readModels}) {
  app.get('/api/things', wrap(async function (req, res) {
    res.status(200).send(readModels.voters || []);
  }));

  app.post('/api/things', wrap(async function (req, res) {
    const command = new CompleteSomething(req.body);
    try {
      const aggregate = new Voter(req.body.voter_id);
      await hydrateAggregate(services.es, aggregate);
      await executeCommand(services.es, aggregate, command);
      res.status(202).json(command);
    }
    catch (err) {
      if (err.name == 'ValidationFailed') { return res.status(400).json({message: err.message}); }
      else { console.error(err.stack); return res.status(500).json({message: err.message}); }
    }
  }));
}
