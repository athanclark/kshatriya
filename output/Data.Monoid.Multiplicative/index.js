// Generated by purs version 0.11.5
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Comonad = require("../Control.Comonad");
var Control_Extend = require("../Control.Extend");
var Control_Monad = require("../Control.Monad");
var Data_Bounded = require("../Data.Bounded");
var Data_Eq = require("../Data.Eq");
var Data_Functor = require("../Data.Functor");
var Data_Functor_Invariant = require("../Data.Functor.Invariant");
var Data_Monoid = require("../Data.Monoid");
var Data_Newtype = require("../Data.Newtype");
var Data_Ord = require("../Data.Ord");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Semiring = require("../Data.Semiring");
var Data_Show = require("../Data.Show");
var Prelude = require("../Prelude");
var Multiplicative = function (x) {
    return x;
};
var showMultiplicative = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(Multiplicative " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var semigroupMultiplicative = function (dictSemiring) {
    return new Data_Semigroup.Semigroup(function (v) {
        return function (v1) {
            return Data_Semiring.mul(dictSemiring)(v)(v1);
        };
    });
};
var ordMultiplicative = function (dictOrd) {
    return dictOrd;
};
var newtypeMultiplicative = new Data_Newtype.Newtype(function (n) {
    return n;
}, Multiplicative);
var monoidMultiplicative = function (dictSemiring) {
    return new Data_Monoid.Monoid(function () {
        return semigroupMultiplicative(dictSemiring);
    }, Data_Semiring.one(dictSemiring));
};
var invariantMultiplicative = new Data_Functor_Invariant.Invariant(function (f) {
    return function (v) {
        return function (v1) {
            return f(v1);
        };
    };
});
var functorMultiplicative = new Data_Functor.Functor(function (f) {
    return function (v) {
        return f(v);
    };
});
var extendMultiplicative = new Control_Extend.Extend(function () {
    return functorMultiplicative;
}, function (f) {
    return function (x) {
        return f(x);
    };
});
var eqMultiplicative = function (dictEq) {
    return dictEq;
};
var comonadMultiplicative = new Control_Comonad.Comonad(function () {
    return extendMultiplicative;
}, Data_Newtype.unwrap(newtypeMultiplicative));
var boundedMultiplicative = function (dictBounded) {
    return dictBounded;
};
var applyMultiplicative = new Control_Apply.Apply(function () {
    return functorMultiplicative;
}, function (v) {
    return function (v1) {
        return v(v1);
    };
});
var bindMultiplicative = new Control_Bind.Bind(function () {
    return applyMultiplicative;
}, function (v) {
    return function (f) {
        return f(v);
    };
});
var applicativeMultiplicative = new Control_Applicative.Applicative(function () {
    return applyMultiplicative;
}, Multiplicative);
var monadMultiplicative = new Control_Monad.Monad(function () {
    return applicativeMultiplicative;
}, function () {
    return bindMultiplicative;
});
module.exports = {
    Multiplicative: Multiplicative, 
    newtypeMultiplicative: newtypeMultiplicative, 
    eqMultiplicative: eqMultiplicative, 
    ordMultiplicative: ordMultiplicative, 
    boundedMultiplicative: boundedMultiplicative, 
    functorMultiplicative: functorMultiplicative, 
    invariantMultiplicative: invariantMultiplicative, 
    applyMultiplicative: applyMultiplicative, 
    applicativeMultiplicative: applicativeMultiplicative, 
    bindMultiplicative: bindMultiplicative, 
    monadMultiplicative: monadMultiplicative, 
    extendMultiplicative: extendMultiplicative, 
    comonadMultiplicative: comonadMultiplicative, 
    showMultiplicative: showMultiplicative, 
    semigroupMultiplicative: semigroupMultiplicative, 
    monoidMultiplicative: monoidMultiplicative
};