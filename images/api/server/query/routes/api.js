const wrap = fn => (...args) => fn(...args).catch((err) => args[1].status(500).send(err.message));

module.exports = function({app, services, read_models}) {
  app.get('/api/things', wrap(async function (req, res) {
    res.status(200).send(read_models.voters || []);
  }));
}
