"use strict";

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


exports.assignHttpHandlerImpl = function assignHttpHandlerImpl (loc, f) {
  app.get(loc,f);
};


exports.assignSocketHandlerImpl = function assignSocketHandlerImpl (f) {
  io.on('connection', f);
};


exports.engageServerImpl = function engageServerImpl (port, f) {
  http.listen(port, f);
};
