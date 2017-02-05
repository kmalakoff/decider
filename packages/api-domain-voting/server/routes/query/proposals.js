const wrap = fn => (...args) => fn(...args).catch((err) => args[1].status(500).send(err.message));

module.exports = function({app, services}) {
  app.get('/query/v1/proposals', wrap(async function (req, res) {
    let cursor = await services.mongo.collection('proposals').find();
    let results = await cursor.toArray();
    res.status(200).send(results);
  }));
}
