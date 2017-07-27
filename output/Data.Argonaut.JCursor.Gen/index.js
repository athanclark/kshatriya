// Generated by purs version 0.11.6
"use strict";
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Lazy = require("../Control.Lazy");
var Control_Monad_Gen = require("../Control.Monad.Gen");
var Control_Monad_Gen_Class = require("../Control.Monad.Gen.Class");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class");
var Data_Argonaut_JCursor = require("../Data.Argonaut.JCursor");
var Data_Boolean = require("../Data.Boolean");
var Data_Char = require("../Data.Char");
var Data_Function = require("../Data.Function");
var Data_Functor = require("../Data.Functor");
var Data_Ord = require("../Data.Ord");
var Data_Ring = require("../Data.Ring");
var Data_String = require("../Data.String");
var Data_Unfoldable = require("../Data.Unfoldable");
var Prelude = require("../Prelude");
var genJCursor = function (dictMonadGen) {
    return function (dictMonadRec) {
        return function (dictLazy) {
            var genIndex = Control_Apply.apply(((dictMonadGen.Monad0()).Bind1()).Apply0())(Data_Functor.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Argonaut_JCursor.JIndex.create)(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(0)(1000)))(Control_Lazy.defer(dictLazy)(function (v) {
                return genJCursor(dictMonadGen)(dictMonadRec)(dictLazy);
            }));
            var genChar = Data_Functor.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Char.fromCharCode)(Control_Monad_Gen_Class.chooseInt(dictMonadGen)(0)(65535));
            var genString = Data_Functor.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_String.fromCharArray)(Control_Monad_Gen.unfoldable(dictMonadRec)(dictMonadGen)(Data_Unfoldable.unfoldableArray)(genChar));
            var genField = Control_Apply.apply(((dictMonadGen.Monad0()).Bind1()).Apply0())(Data_Functor.map((((dictMonadGen.Monad0()).Bind1()).Apply0()).Functor0())(Data_Argonaut_JCursor.JField.create)(genString))(Control_Lazy.defer(dictLazy)(function (v) {
                return genJCursor(dictMonadGen)(dictMonadRec)(dictLazy);
            }));
            var genJCursor$prime = function (size) {
                if (size > 0) {
                    return Control_Monad_Gen_Class.resize(dictMonadGen)(function (v) {
                        return v - 1 | 0;
                    })(Control_Monad_Gen.choose(dictMonadGen)(genField)(genIndex));
                };
                if (Data_Boolean.otherwise) {
                    return Control_Applicative.pure((dictMonadGen.Monad0()).Applicative0())(Data_Argonaut_JCursor.JCursorTop.value);
                };
                throw new Error("Failed pattern match at Data.Argonaut.JCursor.Gen line 17, column 3 - line 19, column 34: " + [ size.constructor.name ]);
            };
            return Control_Monad_Gen_Class.resize(dictMonadGen)(Data_Ord.min(Data_Ord.ordInt)(10))(Control_Monad_Gen_Class.sized(dictMonadGen)(genJCursor$prime));
        };
    };
};
module.exports = {
    genJCursor: genJCursor
};
