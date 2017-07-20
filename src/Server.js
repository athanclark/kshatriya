"use strict";

var app = require('express')();
var http = require('http');
var WebSocket = require('ws');
var cors = require('cors');

app.use(cors());


exports.engageServerImpl = function engageServerImpl (port, onServe, onMessage, websocket) {
  app.use(express.static('public'));
  app.get("/",function (req,resp) {
    resp.sendFile(__dirname + "/frontend/index.html");
  });
  app.get("/index.js",function (req,resp) {
    resp.sendFile(__dirname + "/frontend/index.js");
  });
  app.get("/style.css",function (req,resp) {
    // resp.sendFile(__dirname + "/frontend/index.js");
  });
  app.get("/jquery.min.js",function (req,resp) {
    resp.sendFile(__dirname + "/frontend/jquery.min.js");
  });

  var server = http.createServer(app);

  var wss = new WebSocket.Server({server: server});

  wss.on("connection", function connection (ws, req) {
    ws.on("message", onMessage);
    websocket(function (msg) {
      ws.send(msg);
    });
  });

  server.listen(port, onServe);
};
