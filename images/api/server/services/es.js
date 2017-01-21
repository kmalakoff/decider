const eventstore = require('eventstore-node');

module.exports = async function() {
  // TODO: add configuration of event store
  const connection = eventstore.createConnection({}, {hostname: "eventstore", port: 1113});

  // TODO: handle failed connection
  return new Promise((resolve, reject) => {
    connection.connect();
    connection.once('connected', (url) => {
      console.log('Connected to eventstore at', url);
      resolve(connection);
    });
  });
}
