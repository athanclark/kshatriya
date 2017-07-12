// Generated by purs version 0.11.5
"use strict";
var Control_Bind = require("../Control.Bind");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Console = require("../Control.Monad.Eff.Console");
var GPIO = require("../GPIO");
var Prelude = require("../Prelude");
var main = function __do() {
    Control_Monad_Eff_Console.log("Hello sailor!")();
    GPIO.openWrite(GPIO.GPIO4.value)(false)();
    return GPIO.write(GPIO.GPIO4.value)(true)();
};
module.exports = {
    main: main
};
