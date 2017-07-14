// Generated by purs version 0.11.5
"use strict";
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Profunctor = require("../Data.Profunctor");
var Data_Profunctor_Closed = require("../Data.Profunctor.Closed");
var Prelude = require("../Prelude");
var Grating = function (x) {
    return x;
};
var profunctorGrating = new Data_Profunctor.Profunctor(function (f) {
    return function (g) {
        return function (v) {
            return function (d) {
                return g(v(function (k) {
                    return d(function ($9) {
                        return k(f($9));
                    });
                }));
            };
        };
    };
});
var newtypeGrating = new Data_Newtype.Newtype(function (n) {
    return n;
}, Grating);
var closedGrating = new Data_Profunctor_Closed.Closed(function () {
    return profunctorGrating;
}, function (v) {
    return function (f) {
        return function (x) {
            return v(function (k) {
                return f(function (g) {
                    return k(g(x));
                });
            });
        };
    };
});
module.exports = {
    Grating: Grating, 
    newtypeGrating: newtypeGrating, 
    profunctorGrating: profunctorGrating, 
    closedGrating: closedGrating
};
