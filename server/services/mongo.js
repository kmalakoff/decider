const MongoClient = require('mongodb').MongoClient;

module.exports = async () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(process.env.MONGODB_SERVICE_URL, {
      server: {
        poolSize: 10,
        autoReconnect: true,
        socketOptions: {connectTimeoutMS: 5000}
      }
    }, (err, db) => {
      if (err) return reject(err);
      console.log(`Connected to mongo at: ${process.env.MONGODB_SERVICE_URL}`); resolve(db);
  });
  });
}
