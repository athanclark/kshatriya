"use strict";


var rpio = require('rpio');


exports.openReadImpl = function openReadImpl (pin) {
  rpio.open(pin, rpio.INPUT);
};

exports.openWriteImpl = function openWriteImpl (pin, def) {
  rpio.open(pin, rpio.OUTPUT, def ? rpio.HIGH : rpio.LOW);
};

exports.readPinImpl = function readPinImpl (pin) {
  var v = rpio.read(pin);

  if (v === 1) {
    return true;
  } else if (v === 0) {
    return false;
  } else {
    console.error("Strange return type from rpio.read():", v);
  }
};

exports.writePinImpl = function writePinImpl (pin, val) {
  rpio.write(pin, val ? rpio.HIGH : rpio.LOW);
};

exports.listenImpl = function listenImpl (pin, f) {
  rpio.open(pin, rpio.INPUT, rpio.PULL_DOWN);
  rpio.poll(pin, f);
};

exports.sleepImpl = function sleepImpl (n) {
  rpio.msleep(n);
};
