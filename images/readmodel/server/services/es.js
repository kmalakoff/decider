const _ = require('lodash');
const urlParse = require('url').parse;
const eventstore = require('eventstore-node');

module.exports = async function() {
  const connection = eventstore.createConnection({}, _.pick(urlParse(process.env.EVENTSTORE_SERVICE_URL), ['hostname', 'port']));

  // TODO: handle failed connections and reonnections
  return new Promise((resolve, reject) => {
    connection.connect();
    connection.once('connected', (url) => {
      console.log('Connected to eventstore at', url);
      resolve(connection);
    });
  });
}