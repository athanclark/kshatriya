// Generated by purs version 0.11.5
"use strict";
var $foreign = require("./foreign");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Uncurried = require("../Control.Monad.Eff.Uncurried");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Prelude = require("../Prelude");
var socketToImpl = function (v) {
    return {
        on: Control_Monad_Eff_Uncurried.mkEffFn1(function ($14) {
            return v.on(Control_Monad_Eff_Uncurried.runEffFn1($14));
        }), 
        send: Control_Monad_Eff_Uncurried.mkEffFn1(v.send)
    };
};
var socketFromImpl = function (v) {
    return {
        on: function ($15) {
            return Control_Monad_Eff_Uncurried.runEffFn1(v.on)(Control_Monad_Eff_Uncurried.mkEffFn1($15));
        }, 
        send: Control_Monad_Eff_Uncurried.runEffFn1(v.send)
    };
};
var responseToImpl = function (v) {
    return {
        sendFile: Control_Monad_Eff_Uncurried.mkEffFn1(v.sendFile)
    };
};
var responseFromImpl = function (v) {
    return {
        sendFile: Control_Monad_Eff_Uncurried.runEffFn1(v.sendFile)
    };
};
var engageServer = function (p) {
    return function (f) {
        return Control_Monad_Eff_Uncurried.runEffFn2($foreign.engageServerImpl)(p)(f);
    };
};
var assignHandlers = function (f) {
    return Control_Monad_Eff_Uncurried.runEffFn1($foreign.assignHandlersImpl)(Control_Monad_Eff_Uncurried.mkEffFn1(function ($16) {
        return f(socketFromImpl($16));
    }));
};
module.exports = {
    assignHandlers: assignHandlers, 
    engageServer: engageServer
};
