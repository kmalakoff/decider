const socketIO = require('socket.io');

class Socketbus {
  constructor(io, bus) {
    this.io = io;
    this.bus = bus;

    this.subscriptions = {};

    io.on('connection', (socket) => {
      socket.on('subscribe', (channel, query) => {
        if (!channel) return console.log(channel, missing);

        let subscriptions = this.subscriptions[channel]
        if (!subscriptions) subscriptions = this.subscriptions[channel] = {};
        let socket_subscriptions = subscriptions[socket.id];
        if (!socket_subscriptions) socket_subscriptions = subscriptions[socket.id] = {socket, query: query || {}};
        console.log('Added subscription:', socket.id, channel, query);
      });

      socket.on('disconnect', () => {
        for (var channel in this.subscriptions) delete this.subscriptions[channel][socket.id];
        console.log('Removed subscriptions:', socket.id);
      });
    });

    bus.listen('publish', (data) => {
      console.log('receiving change (bus)', data);
      let subscriptions = this.subscriptions[data.channel];
      if (subscriptions) {
        for (var socket_id in subscriptions) {
          console.log('publishing', socket_id, data.channel, data.query);
          subscriptions[socket_id].socket.emit('publish', data.channel, data.query);
        }
      }
    });
  }
}

module.exports = async function({server, services}) { return new Socketbus(socketIO(server), services.servicebus); }
