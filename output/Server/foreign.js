"use strict";

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


exports.assignHomeHandler = function assignHttpHandler () {
  app.get("/",function (req,resp) {
    resp.sendFile(__dirname + "/frontend/index.html");
  });
};


exports.assignSocketHandlerImpl = function assignSocketHandlerImpl (f) {
  io.on('connection', f);
};


exports.engageServerImpl = function engageServerImpl (port, f) {
  http.listen(port, f);
};
