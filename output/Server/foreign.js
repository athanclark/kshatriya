"use strict";

var app = require('express')();
var http = require('http').Server(app);

var WebSocket = require('ws');


var wss = new WebSocket.Server({port: 8080});


exports.assignHomeHandler = function assignHttpHandler () {
  app.get("/",function (req,resp) {
    resp.sendFile(__dirname + "/frontend/index.html");
  });
  app.get("/index.js",function (req,resp) {
    resp.sendFile(__dirname + "/frontend/index.js");
  });
  app.get("/style.css",function (req,resp) {
    // resp.sendFile(__dirname + "/frontend/index.js");
  });
};


exports.assignSocketHandlerImpl = function assignSocketHandlerImpl (f) {
  wss.on('connection', function connectionImpl (ws) {
    f({
      on : function(f) {
        ws.on('message', f);
      },
      send : ws.send
    });
  });
};


exports.engageServerImpl = function engageServerImpl (port, f) {
  http.listen(port, f);
};
