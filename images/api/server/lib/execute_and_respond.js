const hydrateAggregate = require('./hydrate_aggregate');
const executeCommand = require('./execute_command');

module.exports = async function(es, aggregate, command, res) {
  try {
    await hydrateAggregate(es, aggregate);
    await executeCommand(es, aggregate, command);
    res.status(202).json(command);
  }
  catch (err) {
    if (err.name == 'ValidationFailed') { return res.status(400).json({message: err.message}); }
    else { console.error(err.stack); return res.status(500).json({message: err.message}); }
  }
}
