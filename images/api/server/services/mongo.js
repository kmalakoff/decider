const MongoClient = require('mongodb').MongoClient;

module.exports = async function() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(process.env.MONGO_URL, {poolSize: 10}, function(err, db) {
      if (err) return reject(err);
      console.log("Connected to mongo"); resolve(db);
    });
  });
}