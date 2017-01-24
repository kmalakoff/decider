const path = require('path');
const app = require('express')();
const serveStatic = require('serve-static');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(serveStatic(path.resolve(__dirname, '..', 'public')));

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});

const bus = require('servicebus').bus({ url: process.env.RABBITMQ_URL || 'amqp://rabbitmq' });
bus.on('error', function(err) {
  console.log('error', err);
});

bus.listen('my.event', function(event) {
  console.log('my.event', event);
  io.emit('chat message', event);
});

setInterval(function () {
  console.log('sending my.event');
  bus.send('my.event', { my: 'event' });
}, 1000);