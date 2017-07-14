// Generated by purs version 0.11.5
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Bind = require("../Control.Bind");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_Eff_Console = require("../Control.Monad.Eff.Console");
var Control_Monad_Eff_Now = require("../Control.Monad.Eff.Now");
var Control_Monad_Eff_Ref = require("../Control.Monad.Eff.Ref");
var Control_Monad_Eff_Timer = require("../Control.Monad.Eff.Timer");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Argonaut = require("../Data.Argonaut");
var Data_Argonaut_Core = require("../Data.Argonaut.Core");
var Data_Argonaut_Encode_Class = require("../Data.Argonaut.Encode.Class");
var Data_Boolean = require("../Data.Boolean");
var Data_DateTime_Instant = require("../Data.DateTime.Instant");
var Data_Eq = require("../Data.Eq");
var Data_EuclideanRing = require("../Data.EuclideanRing");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Maybe = require("../Data.Maybe");
var Data_Ring = require("../Data.Ring");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Show = require("../Data.Show");
var Data_Time_Duration = require("../Data.Time.Duration");
var Data_Unit = require("../Data.Unit");
var GPIO = require("../GPIO");
var Kshatriya = require("../Kshatriya");
var $$Math = require("../Math");
var Prelude = require("../Prelude");
var Server = require("../Server");
var WebSocket = require("../WebSocket");
var HitSensor = (function () {
    function HitSensor() {

    };
    HitSensor.value = new HitSensor();
    return HitSensor;
})();
var LeftSensor = (function () {
    function LeftSensor() {

    };
    LeftSensor.value = new LeftSensor();
    return LeftSensor;
})();
var pinCallback = function (dispatchWS) {
    return function (stateRef) {
        return function (pin) {
            if (Data_Eq.eq(GPIO.eqGPIOPin)(pin)(Kshatriya.toGPIOPin(Kshatriya.loSigGPIOPinAble)(Kshatriya.LoSig.value))) {
                return function __do() {
                    var v = GPIO.read(Kshatriya.toGPIOPin(Kshatriya.loSigGPIOPinAble)(Kshatriya.LoSig.value))();
                    Control_Monad_Eff_Console.log("Low signal: " + Data_Show.show(Data_Show.showBoolean)(v))();
                    GPIO.write(Kshatriya.toGPIOPin(Kshatriya.loGPIOPinAble)(Kshatriya.Lo.value))(v)();
                    Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v1) {
                        var $35 = {};
                        for (var $36 in v1) {
                            if ({}.hasOwnProperty.call(v1, $36)) {
                                $35[$36] = v1[$36];
                            };
                        };
                        $35.lights = v;
                        return $35;
                    })();
                    return dispatchWS(new WebSocket.ChangedLights(v))();
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
                            Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v4) {
                                var $45 = {};
                                for (var $46 in v4) {
                                    if ({}.hasOwnProperty.call(v4, $46)) {
                                        $45[$46] = v4[$46];
                                    };
                                };
                                $45.leftBlinker = new Data_Maybe.Just(v3);
                                return $45;
                            })();
                            return dispatchWS(WebSocket.TurnLeft.value)();
                        };
                        return Data_Unit.unit;
                    };
                    if (v1.leftBlinker instanceof Data_Maybe.Just) {
                        Control_Monad_Eff_Timer.clearInterval(v1.leftBlinker.value0)();
                        Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v2) {
                            var $49 = {};
                            for (var $50 in v2) {
                                if ({}.hasOwnProperty.call(v2, $50)) {
                                    $49[$50] = v2[$50];
                                };
                            };
                            $49.leftBlinker = Data_Maybe.Nothing.value;
                            return $49;
                        })();
                        GPIO.write(Kshatriya.toGPIOPin(Kshatriya.turnGPIOPinAble)(Kshatriya.TurnL.value))(false)();
                        GPIO.write(Kshatriya.toGPIOPin(Kshatriya.brakeGPIOPinAble)(Kshatriya.BrakeL.value))(v1.braking)();
                        return dispatchWS(WebSocket.NoTurn.value)();
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
                            Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v4) {
                                var $62 = {};
                                for (var $63 in v4) {
                                    if ({}.hasOwnProperty.call(v4, $63)) {
                                        $62[$63] = v4[$63];
                                    };
                                };
                                $62.rightBlinker = new Data_Maybe.Just(v3);
                                return $62;
                            })();
                            return dispatchWS(WebSocket.TurnRight.value)();
                        };
                        return Data_Unit.unit;
                    };
                    if (v1.rightBlinker instanceof Data_Maybe.Just) {
                        Control_Monad_Eff_Timer.clearInterval(v1.rightBlinker.value0)();
                        Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v2) {
                            var $66 = {};
                            for (var $67 in v2) {
                                if ({}.hasOwnProperty.call(v2, $67)) {
                                    $66[$67] = v2[$67];
                                };
                            };
                            $66.rightBlinker = Data_Maybe.Nothing.value;
                            return $66;
                        })();
                        GPIO.write(Kshatriya.toGPIOPin(Kshatriya.turnGPIOPinAble)(Kshatriya.TurnR.value))(false)();
                        GPIO.write(Kshatriya.toGPIOPin(Kshatriya.brakeGPIOPinAble)(Kshatriya.BrakeR.value))(v1.braking)();
                        return dispatchWS(WebSocket.NoTurn.value)();
                    };
                    return Data_Unit.unit;
                };
            };
            if (Data_Eq.eq(GPIO.eqGPIOPin)(pin)(Kshatriya.toGPIOPin(Kshatriya.brakeSigGPIOPinAble)(Kshatriya.BrakeSig.value))) {
                return function __do() {
                    var v = GPIO.read(Kshatriya.toGPIOPin(Kshatriya.brakeSigGPIOPinAble)(Kshatriya.BrakeSig.value))();
                    Control_Monad_Eff_Console.log("Brake signal: " + Data_Show.show(Data_Show.showBoolean)(v))();
                    Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v1) {
                        var $73 = {};
                        for (var $74 in v1) {
                            if ({}.hasOwnProperty.call(v1, $74)) {
                                $73[$74] = v1[$74];
                            };
                        };
                        $73.braking = v;
                        return $73;
                    })();
                    dispatchWS(new WebSocket.ChangedBraking(v))();
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
            if (Data_Eq.eq(GPIO.eqGPIOPin)(pin)(Kshatriya.toGPIOPin(Kshatriya.wheelSigGPIOPinAble)(Kshatriya.WheelSig.value))) {
                return function __do() {
                    var v = GPIO.read(Kshatriya.toGPIOPin(Kshatriya.wheelSigGPIOPinAble)(Kshatriya.WheelSig.value))();
                    var v1 = Control_Monad_Eff_Ref.readRef(stateRef)();
                    if (v) {
                        if (v1.wheel.sensor instanceof LeftSensor) {
                            if (v1.wheel.lastHit instanceof Data_Maybe.Nothing) {
                                var v2 = Data_Functor.map(Control_Monad_Eff.functorEff)(Data_DateTime_Instant.unInstant)(Control_Monad_Eff_Now.now)();
                                return Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v3) {
                                    var $88 = {};
                                    for (var $89 in v3) {
                                        if ({}.hasOwnProperty.call(v3, $89)) {
                                            $88[$89] = v3[$89];
                                        };
                                    };
                                    $88.wheel = {
                                        sensor: HitSensor.value, 
                                        lastHit: new Data_Maybe.Just(v2), 
                                        lastSpeed: Data_Maybe.Nothing.value
                                    };
                                    return $88;
                                })();
                            };
                            if (v1.wheel.lastHit instanceof Data_Maybe.Just) {
                                var v2 = Data_Functor.map(Control_Monad_Eff.functorEff)(Data_DateTime_Instant.unInstant)(Control_Monad_Eff_Now.now)();
                                var v3 = Data_Ring.sub(Data_Time_Duration.ringMilliseconds)(v2)(v1.wheel.lastHit.value0);
                                var circum = 2.0 * $$Math.pi * Kshatriya.wheelRadius;
                                var spd = circum / v3;
                                if (v1.wheel.lastSpeed instanceof Data_Maybe.Nothing) {
                                    return Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v4) {
                                        var $94 = {};
                                        for (var $95 in v4) {
                                            if ({}.hasOwnProperty.call(v4, $95)) {
                                                $94[$95] = v4[$95];
                                            };
                                        };
                                        $94.wheel = {
                                            lastHit: new Data_Maybe.Just(v2), 
                                            lastSpeed: Data_Maybe.Just.create((3.0 / 4.0) * spd), 
                                            sensor: HitSensor.value
                                        };
                                        return $94;
                                    })();
                                };
                                if (v1.wheel.lastSpeed instanceof Data_Maybe.Just) {
                                    var spd_ = (3.0 / 4.0) * (spd - v1.wheel.lastSpeed.value0) + v1.wheel.lastSpeed.value0;
                                    return Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v4) {
                                        var $97 = {};
                                        for (var $98 in v4) {
                                            if ({}.hasOwnProperty.call(v4, $98)) {
                                                $97[$98] = v4[$98];
                                            };
                                        };
                                        $97.wheel = {
                                            lastHit: new Data_Maybe.Just(v2), 
                                            lastSpeed: new Data_Maybe.Just(spd_), 
                                            sensor: HitSensor.value
                                        };
                                        return $97;
                                    })();
                                };
                                throw new Error("Failed pattern match at Main line 205, column 19 - line 217, column 51: " + [ v1.wheel.lastSpeed.constructor.name ]);
                            };
                            throw new Error("Failed pattern match at Main line 190, column 29 - line 217, column 51: " + [ v1.wheel.lastHit.constructor.name ]);
                        };
                        if (v1.wheel.sensor instanceof HitSensor) {
                            return Data_Unit.unit;
                        };
                        throw new Error("Failed pattern match at Main line 189, column 18 - line 218, column 37: " + [ v1.wheel.sensor.constructor.name ]);
                    };
                    if (v1.wheel.sensor instanceof LeftSensor) {
                        return Data_Unit.unit;
                    };
                    if (v1.wheel.sensor instanceof HitSensor) {
                        return Control_Monad_Eff_Ref.modifyRef(stateRef)(function (state) {
                            var $106 = {};
                            for (var $107 in state) {
                                if ({}.hasOwnProperty.call(state, $107)) {
                                    $106[$107] = state[$107];
                                };
                            };
                            $106.wheel = (function () {
                                var $103 = {};
                                for (var $104 in state.wheel) {
                                    if ({}.hasOwnProperty.call(state.wheel, $104)) {
                                        $103[$104] = state["wheel"][$104];
                                    };
                                };
                                $103.sensor = LeftSensor.value;
                                return $103;
                            })();
                            return $106;
                        })();
                    };
                    throw new Error("Failed pattern match at Main line 219, column 18 - line 222, column 70: " + [ v1.wheel.sensor.constructor.name ]);
                };
            };
            if (Data_Boolean.otherwise) {
                return Control_Monad_Eff_Console.log("!?!");
            };
            throw new Error("Failed pattern match at Main line 116, column 1 - line 224, column 11: " + [ dispatchWS.constructor.name, stateRef.constructor.name, pin.constructor.name ]);
        };
    };
};
var initialState = {
    leftBlinker: Data_Maybe.Nothing.value, 
    rightBlinker: Data_Maybe.Nothing.value, 
    braking: false, 
    lights: false, 
    wheel: {
        lastHit: Data_Maybe.Nothing.value, 
        sensor: LeftSensor.value, 
        lastSpeed: Data_Maybe.Nothing.value
    }
};
var main = function __do() {
    Control_Monad_Eff_Console.log("Kshatriya starting")();
    GPIO.openWrite(Kshatriya.toGPIOPin(Kshatriya.loGPIOPinAble)(Kshatriya.Lo.value))(false)();
    GPIO.openWrite(Kshatriya.toGPIOPin(Kshatriya.turnGPIOPinAble)(Kshatriya.TurnL.value))(false)();
    GPIO.openWrite(Kshatriya.toGPIOPin(Kshatriya.turnGPIOPinAble)(Kshatriya.TurnR.value))(false)();
    GPIO.openWrite(Kshatriya.toGPIOPin(Kshatriya.brakeGPIOPinAble)(Kshatriya.BrakeL.value))(false)();
    GPIO.openWrite(Kshatriya.toGPIOPin(Kshatriya.brakeGPIOPinAble)(Kshatriya.BrakeR.value))(false)();
    Control_Monad_Eff_Console.log("Writable GPIO Pins Ready")();
    return Server.engageServer(3000)(Control_Monad_Eff_Console.log("server started"))(WebSocket.onReceive)(function (send) {
        return function __do() {
            Control_Monad_Eff_Console.log("?!?")();
            var v = Control_Monad_Eff_Ref.newRef(initialState)();
            var f = pinCallback(function ($114) {
                return send(Data_Show.show(Data_Argonaut_Core.showJson)(Data_Argonaut_Encode_Class.encodeJson(WebSocket.encodeJsonOutgoing)($114)));
            })(v);
            var listen$prime = function (dictGPIOPinAble) {
                return function (x) {
                    return function __do() {
                        GPIO.listen(Kshatriya.toGPIOPin(dictGPIOPinAble)(x))(f)();
                        return f(Kshatriya.toGPIOPin(dictGPIOPinAble)(x))();
                    };
                };
            };
            listen$prime(Kshatriya.loSigGPIOPinAble)(Kshatriya.LoSig.value)();
            listen$prime(Kshatriya.turnSigGPIOPinAble)(Kshatriya.TurnSigL.value)();
            listen$prime(Kshatriya.turnSigGPIOPinAble)(Kshatriya.TurnSigR.value)();
            listen$prime(Kshatriya.brakeSigGPIOPinAble)(Kshatriya.BrakeSig.value)();
            listen$prime(Kshatriya.wheelSigGPIOPinAble)(Kshatriya.WheelSig.value)();
            Control_Monad_Eff_Console.log("Readable GPIO Pins Ready")();
            return Control_Monad_Eff_Console.log("Kshatriya Ready")();
        };
    })();
};
module.exports = {
    HitSensor: HitSensor, 
    LeftSensor: LeftSensor, 
    initialState: initialState, 
    main: main, 
    pinCallback: pinCallback
};
