const eventstore = require('eventstore-node');
const uuid = require('uuid');

module.exports = async (es, aggregate, command) => {
  const events = aggregate.execute(command);
  const esEvents = events.map(e => eventstore.createJsonEventData(uuid.v4(), e));
  return es.appendToStream(aggregate.streamName(), eventstore.expectedVersion.any, esEvents);
};
