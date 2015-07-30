var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 3000


app.use(express.static(__dirname + "/"))

var server = app.listen(port, function() {
  console.log('start');
});

var wss = new WebSocketServer({server: server})

wss.broadcast = function(data) {
  this.clients.forEach(function(client) {
    client.send(data);
  });
};

wss.on("connection", function(ws) {

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
  })

  ws.on('message', function(message) {
    console.log('message', message);
    wss.broadcast(message);
  });
});
