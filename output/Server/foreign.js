"use strict";

var app = require('express')();
var http = require('http').Server(app);
var WebSocket = require('ws');
var wss = new WebSocket.Server({port: 3000});


exports.assignHandlersImpl = function assignHandlersImpl (f) {
  wss.on('connection', function(ws) {
    f({
      on : function(g) {
        ws.on('message', g);
      },
      send : ws.send
    });
  });
};
