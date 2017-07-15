"use strict";



var socket = new WebSocket('ws://localhost:3000');


exports.onImpl = function (f) {
  console.log('listening',f);
  socket.onmessage = function onmessageImpl (event) {
    console.log('got message', event);
    var result = f(event.data);
    console.log('result:',result);
  };
};

exports.sendImpl = socket.send;
