const uniqueId = require('lodash.uniqueid');

const wrap = fn => (...args) => fn(...args).catch((err) => args[1].status(500).send(err.message));

const hydrateAggregate = require('../lib/hydrate_aggregate');
const executeCommand = require('../lib/execute_command');
const CompleteSomething = require('../commands/complete_something');
const Voter = require('../aggregates/voter');

module.exports = function({app}) {
  app.get('/api/things', wrap(async function (req, res) {
    res.status(200).send([
      {id: uniqueId('c'), title: 'Semantic-Org/Semantic-UI', description: 'Updated 10 mins ago'},
      {id: uniqueId('c'), title: 'Semantic-Org/Semantic-UI', description: 'Updated 22 mins ago'},
      {id: uniqueId('c'), title: 'Semantic-Org/Semantic-UI', description: 'Updated 34 mins ago'}
    ]);
  }));

  app.post('/api/things', wrap(async function (req, res) {
    const command = new CompleteSomething(req.body.id, req.body.voter_id);
    try {
      await executeCommand(command.id, new Voter(), command);
      res.status(202).json(command);
    }
    catch (err) {
      if (err.name == 'ValidationFailed') { return res.status(400).json({message: err.message}); }
      else { console.error(err.stack); return res.status(500).json({message: err.message}); }
    }
  }));
}
