"use strict";


var socket = require('socket.io-client');


exports.assignSocketHandlerImpl = socket.on;

exports.emitImpl = socket.emit;
