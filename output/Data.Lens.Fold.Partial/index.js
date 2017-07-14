// Generated by purs version 0.11.5
"use strict";
var Data_Function = require("../Data.Function");
var Data_Lens_Fold = require("../Data.Lens.Fold");
var Data_Lens_Types = require("../Data.Lens.Types");
var Data_Maybe = require("../Data.Maybe");
var Data_Maybe_First = require("../Data.Maybe.First");
var Data_Newtype = require("../Data.Newtype");
var Data_Tuple = require("../Data.Tuple");
var Partial_Unsafe = require("../Partial.Unsafe");
var Prelude = require("../Prelude");
var unsafeView = function (dictPartial) {
    return function (s) {
        return function (l) {
            return Data_Maybe["fromMaybe'"](function (v) {
                return Partial_Unsafe.unsafeCrashWith("unsafeView: Empty fold");
            })(Data_Lens_Fold.previewOn(s)(l));
        };
    };
};
var unsafeIndexedFold = function (dictPartial) {
    return function (s) {
        return function (l) {
            return Data_Maybe["fromMaybe'"](function (v) {
                return Partial_Unsafe.unsafeCrashWith("unsafeIndexedFold: empty Fold");
            })(Data_Newtype.unwrap(Data_Maybe_First.newtypeFirst)(Data_Lens_Fold.ifoldMapOf(l)(function (i) {
                return function (a) {
                    return Data_Maybe_First.First(new Data_Maybe.Just(new Data_Tuple.Tuple(i, a)));
                };
            })(s)));
        };
    };
};
module.exports = {
    unsafeIndexedFold: unsafeIndexedFold, 
    unsafeView: unsafeView
};