var express = require('express'), app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.use('/lib', express.static('lib'))
app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.sendFile(__dirname +
    '/dist/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(1337, () => {
  console.log('listening on *:1337');
});
