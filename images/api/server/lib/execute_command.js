const uuid = require('uuid');
const esClient = require('eventstore-node');

module.exports = async function(es, aggregate, command) {
  const metadata = {timestamp: Date.now()};
  const events = aggregate.execute(command);
  const es_events = events.map(e => esClient.createJsonEventData(uuid.v4(), e, metadata));
  return es.appendToStream(aggregate.streamName(), esClient.expectedVersion.any, es_events);
}
