const wrap = fn => (...args) => fn(...args).catch(err => args[1].status(500).send(err.message));

module.exports = ({ app, services }) => {
  app.get('/query/v1/votes', wrap(async (req, res) => {
    const cursor = await services.mongo.collection('votes').find();
    const results = await cursor.toArray();
    res.status(200).send(results);
  }));
};
