module.exports = async function(es, aggregate) {
  return es.readStreamEventsForward(aggregate.streamName(), 0, 4096, true)
    .then(function (readResult) {
      readResult.events
        .map(e => JSON.parse(e.originalEvent.data.toString()))
        .forEach(e => aggregate.hydrate(e));
      return aggregate;
    });
}
