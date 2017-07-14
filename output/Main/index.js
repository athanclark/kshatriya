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
var Data_Either = require("../Data.Either");
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
var Data_Tuple = require("../Data.Tuple");
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
                        var $39 = {};
                        for (var $40 in v1) {
                            if ({}.hasOwnProperty.call(v1, $40)) {
                                $39[$40] = v1[$40];
                            };
                        };
                        $39.lights = v;
                        return $39;
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
                                var $49 = {};
                                for (var $50 in v4) {
                                    if ({}.hasOwnProperty.call(v4, $50)) {
                                        $49[$50] = v4[$50];
                                    };
                                };
                                $49.leftBlinker = new Data_Maybe.Just(v3);
                                return $49;
                            })();
                            return dispatchWS(WebSocket.TurnLeft.value)();
                        };
                        return Data_Unit.unit;
                    };
                    if (v1.leftBlinker instanceof Data_Maybe.Just) {
                        Control_Monad_Eff_Timer.clearInterval(v1.leftBlinker.value0)();
                        Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v2) {
                            var $53 = {};
                            for (var $54 in v2) {
                                if ({}.hasOwnProperty.call(v2, $54)) {
                                    $53[$54] = v2[$54];
                                };
                            };
                            $53.leftBlinker = Data_Maybe.Nothing.value;
                            return $53;
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
                                var $66 = {};
                                for (var $67 in v4) {
                                    if ({}.hasOwnProperty.call(v4, $67)) {
                                        $66[$67] = v4[$67];
                                    };
                                };
                                $66.rightBlinker = new Data_Maybe.Just(v3);
                                return $66;
                            })();
                            return dispatchWS(WebSocket.TurnRight.value)();
                        };
                        return Data_Unit.unit;
                    };
                    if (v1.rightBlinker instanceof Data_Maybe.Just) {
                        Control_Monad_Eff_Timer.clearInterval(v1.rightBlinker.value0)();
                        Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v2) {
                            var $70 = {};
                            for (var $71 in v2) {
                                if ({}.hasOwnProperty.call(v2, $71)) {
                                    $70[$71] = v2[$71];
                                };
                            };
                            $70.rightBlinker = Data_Maybe.Nothing.value;
                            return $70;
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
                        var $77 = {};
                        for (var $78 in v1) {
                            if ({}.hasOwnProperty.call(v1, $78)) {
                                $77[$78] = v1[$78];
                            };
                        };
                        $77.braking = v;
                        return $77;
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
            if (Data_Eq.eq(GPIO.eqGPIOPin)(pin)(Kshatriya.toGPIOPin(Kshatriya.hornSigGPIOPinAble)(Kshatriya.HornSig.value))) {
                return function __do() {
                    var v = GPIO.read(Kshatriya.toGPIOPin(Kshatriya.hornSigGPIOPinAble)(Kshatriya.HornSig.value))();
                    Control_Monad_Eff_Console.log("Horn signal: " + Data_Show.show(Data_Show.showBoolean)(v))();
                    return GPIO.write(Kshatriya.toGPIOPin(Kshatriya.hornGPIOPinAble)(Kshatriya.Horn.value))(v)();
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
                                    var $93 = {};
                                    for (var $94 in v3) {
                                        if ({}.hasOwnProperty.call(v3, $94)) {
                                            $93[$94] = v3[$94];
                                        };
                                    };
                                    $93.wheel = {
                                        sensor: HitSensor.value, 
                                        lastHit: new Data_Maybe.Just(v2), 
                                        lastSpeed: Data_Maybe.Nothing.value
                                    };
                                    return $93;
                                })();
                            };
                            if (v1.wheel.lastHit instanceof Data_Maybe.Just) {
                                var v2 = Data_Functor.map(Control_Monad_Eff.functorEff)(Data_DateTime_Instant.unInstant)(Control_Monad_Eff_Now.now)();
                                var v3 = Data_Ring.sub(Data_Time_Duration.ringMilliseconds)(v2)(v1.wheel.lastHit.value0);
                                var circum = 2.0 * $$Math.pi * Kshatriya.wheelRadius;
                                var spd = circum / v3;
                                if (v1.wheel.lastSpeed instanceof Data_Maybe.Nothing) {
                                    return Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v4) {
                                        var $99 = {};
                                        for (var $100 in v4) {
                                            if ({}.hasOwnProperty.call(v4, $100)) {
                                                $99[$100] = v4[$100];
                                            };
                                        };
                                        $99.wheel = {
                                            lastHit: new Data_Maybe.Just(v2), 
                                            lastSpeed: Data_Maybe.Just.create((3.0 / 4.0) * spd), 
                                            sensor: HitSensor.value
                                        };
                                        return $99;
                                    })();
                                };
                                if (v1.wheel.lastSpeed instanceof Data_Maybe.Just) {
                                    var spd_ = (3.0 / 4.0) * (spd - v1.wheel.lastSpeed.value0) + v1.wheel.lastSpeed.value0;
                                    return Control_Monad_Eff_Ref.modifyRef(stateRef)(function (v4) {
                                        var $102 = {};
                                        for (var $103 in v4) {
                                            if ({}.hasOwnProperty.call(v4, $103)) {
                                                $102[$103] = v4[$103];
                                            };
                                        };
                                        $102.wheel = {
                                            lastHit: new Data_Maybe.Just(v2), 
                                            lastSpeed: new Data_Maybe.Just(spd_), 
                                            sensor: HitSensor.value
                                        };
                                        return $102;
                                    })();
                                };
                                throw new Error("Failed pattern match at Main line 223, column 19 - line 235, column 51: " + [ v1.wheel.lastSpeed.constructor.name ]);
                            };
                            throw new Error("Failed pattern match at Main line 208, column 29 - line 235, column 51: " + [ v1.wheel.lastHit.constructor.name ]);
                        };
                        if (v1.wheel.sensor instanceof HitSensor) {
                            return Data_Unit.unit;
                        };
                        throw new Error("Failed pattern match at Main line 207, column 18 - line 236, column 37: " + [ v1.wheel.sensor.constructor.name ]);
                    };
                    if (v1.wheel.sensor instanceof LeftSensor) {
                        return Data_Unit.unit;
                    };
                    if (v1.wheel.sensor instanceof HitSensor) {
                        return Control_Monad_Eff_Ref.modifyRef(stateRef)(function (state) {
                            var $111 = {};
                            for (var $112 in state) {
                                if ({}.hasOwnProperty.call(state, $112)) {
                                    $111[$112] = state[$112];
                                };
                            };
                            $111.wheel = (function () {
                                var $108 = {};
                                for (var $109 in state.wheel) {
                                    if ({}.hasOwnProperty.call(state.wheel, $109)) {
                                        $108[$109] = state["wheel"][$109];
                                    };
                                };
                                $108.sensor = LeftSensor.value;
                                return $108;
                            })();
                            return $111;
                        })();
                    };
                    throw new Error("Failed pattern match at Main line 237, column 18 - line 240, column 70: " + [ v1.wheel.sensor.constructor.name ]);
                };
            };
            if (Data_Boolean.otherwise) {
                return Control_Monad_Eff_Console.log("!?!");
            };
            throw new Error("Failed pattern match at Main line 130, column 1 - line 242, column 11: " + [ dispatchWS.constructor.name, stateRef.constructor.name, pin.constructor.name ]);
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
    return Server.engageServer(3000)(Control_Monad_Eff_Console.log("server started"))(WebSocket.onReceive)(function (send) {
        return function __do() {
            var v = Control_Monad_Eff_Ref.newRef(initialState)();
            var f = pinCallback(function ($127) {
                return send(Data_Show.show(Data_Argonaut_Core.showJson)(Data_Argonaut_Encode_Class.encodeJson(WebSocket.encodeJsonOutgoing)($127)));
            })(v);
            var listen$prime = function (dictGPIOPinAble) {
                return function (dictGPIOPinAble1) {
                    return function (dictGPIOPinAble2) {
                        return function (x) {
                            return function (meY) {
                                return function __do() {
                                    GPIO.listen(Kshatriya.toGPIOPin(dictGPIOPinAble)(x))(f)();
                                    var v1 = GPIO.read(Kshatriya.toGPIOPin(dictGPIOPinAble)(x))();
                                    (function () {
                                        if (meY instanceof Data_Maybe.Nothing) {
                                            return Control_Applicative.pure(Control_Monad_Eff.applicativeEff)(Data_Unit.unit);
                                        };
                                        if (meY instanceof Data_Maybe.Just) {
                                            if (meY.value0 instanceof Data_Either.Left) {
                                                return GPIO.openWrite(Kshatriya.toGPIOPin(dictGPIOPinAble1)(meY.value0.value0))(v1);
                                            };
                                            if (meY.value0 instanceof Data_Either.Right) {
                                                return function __do() {
                                                    GPIO.openWrite(Kshatriya.toGPIOPin(dictGPIOPinAble1)(meY.value0.value0.value0))(v1)();
                                                    return GPIO.openWrite(Kshatriya.toGPIOPin(dictGPIOPinAble2)(meY.value0.value0.value1))(v1)();
                                                };
                                            };
                                            throw new Error("Failed pattern match at Main line 65, column 24 - line 69, column 43: " + [ meY.value0.constructor.name ]);
                                        };
                                        throw new Error("Failed pattern match at Main line 63, column 11 - line 69, column 43: " + [ meY.constructor.name ]);
                                    })()();
                                    return f(Kshatriya.toGPIOPin(dictGPIOPinAble)(x))();
                                };
                            };
                        };
                    };
                };
            };
            listen$prime(Kshatriya.loSigGPIOPinAble)(Kshatriya.loGPIOPinAble)(Kshatriya.loGPIOPinAble)(Kshatriya.LoSig.value)(Data_Maybe.Just.create(new Data_Either.Left(Kshatriya.Lo.value)))();
            listen$prime(Kshatriya.turnSigGPIOPinAble)(Kshatriya.turnGPIOPinAble)(Kshatriya.turnGPIOPinAble)(Kshatriya.TurnSigL.value)(Data_Maybe.Just.create(new Data_Either.Left(Kshatriya.TurnL.value)))();
            listen$prime(Kshatriya.turnSigGPIOPinAble)(Kshatriya.turnGPIOPinAble)(Kshatriya.turnGPIOPinAble)(Kshatriya.TurnSigR.value)(Data_Maybe.Just.create(new Data_Either.Left(Kshatriya.TurnR.value)))();
            listen$prime(Kshatriya.brakeSigGPIOPinAble)(Kshatriya.brakeGPIOPinAble)(Kshatriya.brakeGPIOPinAble)(Kshatriya.BrakeSig.value)(Data_Maybe.Just.create(new Data_Either.Right(new Data_Tuple.Tuple(Kshatriya.BrakeL.value, Kshatriya.BrakeR.value))))();
            listen$prime(Kshatriya.wheelSigGPIOPinAble)(Kshatriya.loGPIOPinAble)(Kshatriya.loGPIOPinAble)(Kshatriya.WheelSig.value)(Data_Maybe.Nothing.value)();
            listen$prime(Kshatriya.hornSigGPIOPinAble)(Kshatriya.hornGPIOPinAble)(Kshatriya.hornGPIOPinAble)(Kshatriya.HornSig.value)(Data_Maybe.Just.create(new Data_Either.Left(Kshatriya.Horn.value)))();
            Control_Monad_Eff_Console.log("GPIO Pins Ready")();
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
