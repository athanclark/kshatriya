// Generated by purs version 0.11.5
"use strict";
var Control_Bind = require("../Control.Bind");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Console = require("../Control.Monad.Eff.Console");
var Prelude = require("../Prelude");
var Server = require("../Server");
var websocket = function (v) {
    return function __do() {
        Control_Monad_Eff_Console.log("connected!")();
        return v.send("ayooo")();
    };
};
module.exports = {
    websocket: websocket
};
