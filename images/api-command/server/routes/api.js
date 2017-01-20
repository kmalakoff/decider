const uniqueId = require('lodash.uniqueid');

const wrap = fn => (...args) => fn(...args).catch((err) => args[1].status(500).send(err.message));

module.exports = function(app) {
  app.get('/api/things', wrap(async function (req, res) {
    res.status(200).send([
      {id: uniqueId('c'), title: 'Semantic-Org/Semantic-UI', description: 'Updated 10 mins ago'},
      {id: uniqueId('c'), title: 'Semantic-Org/Semantic-UI', description: 'Updated 22 mins ago'},
      {id: uniqueId('c'), title: 'Semantic-Org/Semantic-UI', description: 'Updated 34 mins ago'}
    ]);
  }));
}
