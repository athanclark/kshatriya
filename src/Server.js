"use strict";

var app = require('express')();
var http = require('http').Server(app);
var expressWs = require('express-ws')(app);

var WebSocket = require('ws');


// var wss = new WebSocket.Server({port: 3000});


exports.assignHandlersImpl = function assignHandlersImpl (f) {
  app.get("/",function (req,resp) {
    resp.sendFile(__dirname + "/frontend/index.html");
  });
  app.get("/index.js",function (req,resp) {
    resp.sendFile(__dirname + "/frontend/index.js");
  });
  app.get("/style.css",function (req,resp) {
    // resp.sendFile(__dirname + "/frontend/index.js");
  });
  app.ws("/ux", function (ws,req) {
    f({
      on : function(g) {
        ws.on('message', g);
      },
      send : ws.send
    });
  });
};


exports.engageServerImpl = function engageServerImpl (port, f) {
  http.listen(port, f);
};
