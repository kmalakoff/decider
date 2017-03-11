const wrap = fn => (...args) => fn(...args).catch(err => args[1].status(500).send(err.message));

const executeAndRespond = require('@decider/lib-shared/command/execute_and_respond');
const CreateUser = require('@decider/domain-registration/commands/create_user');
const User = require('@decider/domain-registration/aggregates/user');

module.exports = ({ app, services }) => {
  app.post('/commands/v1/users', wrap(async (req, res) => {
    executeAndRespond(services.es, new User(), new CreateUser(req.body), res);
  }));
};
