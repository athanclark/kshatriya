// Generated by purs version 0.11.5
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Console = require("../Control.Monad.Eff.Console");
var Control_Monad_Eff_Ref = require("../Control.Monad.Eff.Ref");
var Control_Monad_Eff_Timer = require("../Control.Monad.Eff.Timer");
var Data_Boolean = require("../Data.Boolean");
var Data_Eq = require("../Data.Eq");
var Data_Function = require("../Data.Function");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Maybe = require("../Data.Maybe");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Data_Unit = require("../Data.Unit");
var GPIO = require("../GPIO");
var Kshatriya = require("../Kshatriya");
var Prelude = require("../Prelude");
var Server = require("../Server");
var pinCallback = function (stateRef) {
    return function (pin) {
        if (Data_Eq.eq(GPIO.eqGPIOPin)(pin)(Kshatriya.toGPIOPin(Kshatriya.loSigGPIOPinAble)(Kshatriya.LoSig.value))) {
            return function __do() {
                var v = GPIO.read(Kshatriya.toGPIOPin(Kshatriya.loSigGPIOPinAble)(Kshatriya.LoSig.value))();
                Control_Monad_Eff_Console.log("Low signal: " + Data_Show.show(Data_Show.showBoolean)(v))();
                if (v) {
                    return GPIO.write(Kshatriya.toGPIOPin(Kshatriya.loGPIOPinAble)(Kshatriya.Lo.value))(true)();
                };
                return GPIO.write(Kshatriya.toGPIOPin(Kshatriya.loGPIOPinAble)(Kshatriya.Lo.value))(false)();
            };
        };
        if (Data_Eq.eq(GPIO.eqGPIOPin)(pin)(Kshatriya.toGPIOPin(Kshatriya.turnSigGPIOPinAble)(Kshatriya.TurnSigL.value))) {
            return function __do() {
                var v = GPIO.read(Kshatriya.toGPIOPin(Kshatriya.turnSigGPIOPinAble)(Kshatriya.TurnSigL.value))();
                Control_Monad_Eff_Console.log("Left signal: " + Data_Show.show(Data_Show.showBoolean)(v))();
                var v1 = Control_Monad_Eff_Ref.readRef(stateRef)();
                if (v) {
                    if (v1.leftBlinker instanceof Data_Maybe.Nothing) {
                        var v2 = Control_Monad_Eff_Ref.newRef(false)();
                        var v3 = Control_Monad_Eff_Timer.setInterval(300)(function __do() {
                            var v3 = Control_Monad_Eff_Ref.readRef(v2)();
                            Control_Monad_Eff_Ref.modifyRef(v2)(Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraBoolean))();
                            GPIO.write(Kshatriya.toGPIOPin(Kshatriya.turnGPIOPinAble)(Kshatriya.TurnL.value))(v3)();
                            return GPIO.write(Kshatriya.toGPIOPin(Kshatriya.brakeGPIOPinAble)(Kshatriya.BrakeL.value))(v3)();
                        })();
                        return Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v4) {
                            var $32 = {};
                            for (var $33 in v4) {
                                if ({}.hasOwnProperty.call(v4, $33)) {
                                    $32[$33] = v4[$33];
                                };
                            };
                            $32.leftBlinker = new Data_Maybe.Just(v3);
                            return $32;
                        })();
                    };
                    return Data_Unit.unit;
                };
                if (v1.leftBlinker instanceof Data_Maybe.Just) {
                    Control_Monad_Eff_Timer.clearInterval(v1.leftBlinker.value0)();
                    Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v2) {
                        var $36 = {};
                        for (var $37 in v2) {
                            if ({}.hasOwnProperty.call(v2, $37)) {
                                $36[$37] = v2[$37];
                            };
                        };
                        $36.leftBlinker = Data_Maybe.Nothing.value;
                        return $36;
                    })();
                    GPIO.write(Kshatriya.toGPIOPin(Kshatriya.turnGPIOPinAble)(Kshatriya.TurnL.value))(false)();
                    return GPIO.write(Kshatriya.toGPIOPin(Kshatriya.brakeGPIOPinAble)(Kshatriya.BrakeL.value))(v1.braking)();
                };
                return Data_Unit.unit;
            };
        };
        if (Data_Eq.eq(GPIO.eqGPIOPin)(pin)(Kshatriya.toGPIOPin(Kshatriya.turnSigGPIOPinAble)(Kshatriya.TurnSigR.value))) {
            return function __do() {
                var v = GPIO.read(Kshatriya.toGPIOPin(Kshatriya.turnSigGPIOPinAble)(Kshatriya.TurnSigR.value))();
                Control_Monad_Eff_Console.log("Right signal: " + Data_Show.show(Data_Show.showBoolean)(v))();
                var v1 = Control_Monad_Eff_Ref.readRef(stateRef)();
                if (v) {
                    if (v1.rightBlinker instanceof Data_Maybe.Nothing) {
                        var v2 = Control_Monad_Eff_Ref.newRef(false)();
                        var v3 = Control_Monad_Eff_Timer.setInterval(300)(function __do() {
                            var v3 = Control_Monad_Eff_Ref.readRef(v2)();
                            Control_Monad_Eff_Ref.modifyRef(v2)(Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraBoolean))();
                            GPIO.write(Kshatriya.toGPIOPin(Kshatriya.turnGPIOPinAble)(Kshatriya.TurnR.value))(v3)();
                            return GPIO.write(Kshatriya.toGPIOPin(Kshatriya.brakeGPIOPinAble)(Kshatriya.BrakeR.value))(v3)();
                        })();
                        return Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v4) {
                            var $49 = {};
                            for (var $50 in v4) {
                                if ({}.hasOwnProperty.call(v4, $50)) {
                                    $49[$50] = v4[$50];
                                };
                            };
                            $49.rightBlinker = new Data_Maybe.Just(v3);
                            return $49;
                        })();
                    };
                    return Data_Unit.unit;
                };
                if (v1.rightBlinker instanceof Data_Maybe.Just) {
                    Control_Monad_Eff_Timer.clearInterval(v1.rightBlinker.value0)();
                    Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v2) {
                        var $53 = {};
                        for (var $54 in v2) {
                            if ({}.hasOwnProperty.call(v2, $54)) {
                                $53[$54] = v2[$54];
                            };
                        };
                        $53.rightBlinker = Data_Maybe.Nothing.value;
                        return $53;
                    })();
                    GPIO.write(Kshatriya.toGPIOPin(Kshatriya.turnGPIOPinAble)(Kshatriya.TurnR.value))(false)();
                    return GPIO.write(Kshatriya.toGPIOPin(Kshatriya.brakeGPIOPinAble)(Kshatriya.BrakeR.value))(v1.braking)();
                };
                return Data_Unit.unit;
            };
        };
        if (Data_Eq.eq(GPIO.eqGPIOPin)(pin)(Kshatriya.toGPIOPin(Kshatriya.brakeSigGPIOPinAble)(Kshatriya.BrakeSig.value))) {
            return function __do() {
                var v = GPIO.read(Kshatriya.toGPIOPin(Kshatriya.brakeSigGPIOPinAble)(Kshatriya.BrakeSig.value))();
                Control_Monad_Eff_Console.log("Brake signal: " + Data_Show.show(Data_Show.showBoolean)(v))();
                Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v1) {
                    var $60 = {};
                    for (var $61 in v1) {
                        if ({}.hasOwnProperty.call(v1, $61)) {
                            $60[$61] = v1[$61];
                        };
                    };
                    $60.braking = v;
                    return $60;
                })();
                var v1 = Control_Monad_Eff_Ref.readRef(stateRef)();
                (function () {
                    if (v1.leftBlinker instanceof Data_Maybe.Nothing) {
                        return GPIO.write(Kshatriya.toGPIOPin(Kshatriya.brakeGPIOPinAble)(Kshatriya.BrakeL.value))(v);
                    };
                    return Control_Applicative.pure(Control_Monad_Eff.applicativeEff)(Data_Unit.unit);
                })()();
                if (v1.rightBlinker instanceof Data_Maybe.Nothing) {
                    return GPIO.write(Kshatriya.toGPIOPin(Kshatriya.brakeGPIOPinAble)(Kshatriya.BrakeR.value))(v)();
                };
                return Data_Unit.unit;
            };
        };
        if (Data_Boolean.otherwise) {
            return Control_Monad_Eff_Console.log("!?!");
        };
        throw new Error("Failed pattern match at Main line 70, column 1 - line 133, column 11: " + [ stateRef.constructor.name, pin.constructor.name ]);
    };
};
var initialState = {
    leftBlinker: Data_Maybe.Nothing.value, 
    rightBlinker: Data_Maybe.Nothing.value, 
    braking: false
};
var main = function __do() {
    Control_Monad_Eff_Console.log("Hello sailor!")();
    GPIO.openWrite(Kshatriya.toGPIOPin(Kshatriya.loGPIOPinAble)(Kshatriya.Lo.value))(false)();
    GPIO.openWrite(Kshatriya.toGPIOPin(Kshatriya.turnGPIOPinAble)(Kshatriya.TurnL.value))(false)();
    GPIO.openWrite(Kshatriya.toGPIOPin(Kshatriya.turnGPIOPinAble)(Kshatriya.TurnR.value))(false)();
    GPIO.openWrite(Kshatriya.toGPIOPin(Kshatriya.brakeGPIOPinAble)(Kshatriya.BrakeL.value))(false)();
    GPIO.openWrite(Kshatriya.toGPIOPin(Kshatriya.brakeGPIOPinAble)(Kshatriya.BrakeR.value))(false)();
    var v = Control_Monad_Eff_Ref.newRef(initialState)();
    var f = pinCallback(v);
    GPIO.listen(Kshatriya.toGPIOPin(Kshatriya.loSigGPIOPinAble)(Kshatriya.LoSig.value))(f)();
    GPIO.listen(Kshatriya.toGPIOPin(Kshatriya.turnSigGPIOPinAble)(Kshatriya.TurnSigL.value))(f)();
    GPIO.listen(Kshatriya.toGPIOPin(Kshatriya.turnSigGPIOPinAble)(Kshatriya.TurnSigR.value))(f)();
    GPIO.listen(Kshatriya.toGPIOPin(Kshatriya.brakeSigGPIOPinAble)(Kshatriya.BrakeSig.value))(f)();
    Server.assignHttpHandler("/")(function (v1) {
        return function (v2) {
            return v2.sendFile("./frontend/index.html");
        };
    })();
    Server.engageServer(3000)(Control_Monad_Eff_Console.log("Server Started"))();
    return GPIO.sleep(10000)();
};
module.exports = {
    initialState: initialState, 
    main: main, 
    pinCallback: pinCallback
};
