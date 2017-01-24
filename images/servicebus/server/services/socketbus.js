const http = require('http');
const socketIO = require('socket.io');

module.exports = async function({app, services}) {
  const server = http.Server(app);
  const io = socketIO(server);

  io.on('connection', function (socket) {
    socket.on('change', function (data) {
      console.log('receiving change (socket)', data);
      io.emit('change', data);
    });
  });

  const bus = services.servicebus;
  bus.listen('change', function(data) {
    console.log('receiving change (bus)', data);
    io.emit('change', data);
  });

  const PORT = +process.env.PORT;
  try { await server.listen(PORT); console.log(`Server started on port: ${PORT}`); }
  catch(err) { return console.error(`Server failed to start on port: ${PORT}`, err); }
}
