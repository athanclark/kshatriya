"use strict";


var socket = require('socket.io-client');


exports.onImpl = function (c,f) {
  console.log('listening on',c,f);
  socket.on(c,function(msg) {
    console.log('got message on',c,msg);
    var result = f(msg);
    console.log('result:',c,result);
  });
};

exports.emitImpl = socket.emit;
