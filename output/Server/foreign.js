"use strict";

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


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
  io.on('connection', f);
};


exports.engageServerImpl = function engageServerImpl (port, f) {
  http.listen(port, f);
};
