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
console.log("websocket server created")

var connections = [];
var broadcast = function(message) {
    connections.forEach(function (con, i) {
        con.send(message);
    });
};


wss.on("connection", function(ws) {
  connections.push(ws);
  var id = setInterval(function() {
    // ws.send(JSON.stringify(new Date()), function() {  })
  }, 1000)

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })

  ws.on('message', function(message) {
    console.log('message', message);
    broadcast(JSON.stringify(message));
  });
});
