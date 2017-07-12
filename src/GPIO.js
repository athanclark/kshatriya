"use strict";


var rpio = require('rpio');


exports.openReadImpl = function openReadImpl (pin) {
  rpio.open(pin, rpio.INPUT);
};

exports.openWriteImpl = function openWriteImpl (pin, def) {
  rpio.open(pin, rpio.OUTPUT, def ? rpio.HIGH : rpio.LOW);
};

exports.readPinImpl = function readPinImpl (pin) {
  return rpio.read(pin);
};

exports.writePinImpl = function writePinImpl (pin, val) {
  rpio.write(pin, val ? rpio.HIGH : rpio.LOW);
};

exports.listenImpl = function listenImpl (pin, f) {
  rpio.poll(pin, f);
};
