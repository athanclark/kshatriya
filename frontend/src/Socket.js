"use strict";


var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:3000');


console.log('socket...', socket);

exports.onImpl = function (f) {
  console.log('listening',f);
  ws.on('message',function(msg) {
    console.log('got message',msg);
    var result = f(msg);
    console.log('result:',result);
  });
};

exports.sendImpl = ws.send;
