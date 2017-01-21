const eventstore = require('eventstore-node');

module.exports = async function() {
  // TODO: handle configuration of event store
  const connection = eventstore.createConnection({}, {"hostname": "eventstore", "port": 1113});
  connection.connect();

  // TODO: handle failed connection
  return new Promise((resolve, reject) => {
    connection.once('connected', (url) => {
      console.log('Connected to eventstore at', url);
      resolve(connection);
    });
  });
}
