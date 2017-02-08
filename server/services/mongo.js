const MongoClient = require('mongodb').MongoClient;

module.exports = async () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(process.env.MONGODB_SERVICE_URL, {poolSize: 10}, function(err, db) {
      if (err) return reject(err);
      console.log("Connected to mongo"); resolve(db);
    });
  });
}