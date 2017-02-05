const wrap = fn => (...args) => fn(...args).catch((err) => args[1].status(500).send(err.message));

const executeAndRespond = require('../lib/execute_and_respond');
const CreateUser = require('../commands/users/create_user');
const User = require('../aggregates/user');

module.exports = function({app, services}) {
  app.post('/commands/v1/users', wrap(async function (req, res) {
    executeAndRespond(services.es, new User(), new CreateUser(req.body), res);
  }));
}