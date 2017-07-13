"use strict";

var app = require('express')();
var http = require('http').Server(app);
var WebSocket = require('ws');



exports.engageServerImpl = function engageServerImpl (port, onServe, websocket) {
  app.get("/",function (req,resp) {
    resp.sendFile(__dirname + "/frontend/index.html");
  });
  app.get("/index.js",function (req,resp) {
    resp.sendFile(__dirname + "/frontend/index.js");
  });
  app.get("/style.css",function (req,resp) {
    // resp.sendFile(__dirname + "/frontend/index.js");
  });

  var wss = new WebSocket.Server({server: app});

  wss.on("connection", function (ws) {
    websocket({
      on : function(g) {
        ws.on('message', g);
      },
      send : ws.send
    });
  });

  var handle = http.listen(port, onServe);
};
