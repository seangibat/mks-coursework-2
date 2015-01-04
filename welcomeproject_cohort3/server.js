var express = require('express');
var app = express();
var cors = require('express-cors');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('./'));

var http = require('http').Server(app);
var io = require("socket.io")(http);

var config = {
  port: process.env.PORT || 8080
};

io.on('connection',function(socket) {
  console.log("a user connected");

  socket.on('disconnect', function() {
    console.log("user disconnected");
  });

  socket.on('sendMsg', function(msg) {
    socket.broadcast.emit('msg', msg);
  });
});


http.listen(config.port, function(){
  console.log('listening on *:' + config.port);
});
