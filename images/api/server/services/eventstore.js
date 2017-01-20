const eventstore = require('eventstore-node');

// TODO: handle configuration of event store
const connection = eventstore.createConnection({}, {"hostname": "eventstore", "port": 1113});

// TODO: handle multiple connection attempts
async function connect() {
  connection.connect();

  // TODO: handle failed connection
  return new Promise((resolve, reject) => {
    connection.once('connected', (url) => {
      console.log('Connected to eventstore at', url);
      resolve(connection);
    });
  });
}

module.exports = async function() {
  return await connect();
}
