const express = require('express');
const path = require('path');
const morgan = require('morgan')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'assets')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('success connect to web-socket!')

  socket.on('getMessageAll', (message) => {
    io.sockets.emit('getMessageAll', message)
  })
})


server.listen(4000), console.log("Server is listening on", 4000)