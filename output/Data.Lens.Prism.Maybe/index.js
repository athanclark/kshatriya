// Generated by purs version 0.11.6
"use strict";
var Data_Either = require("../Data.Either");
var Data_Function = require("../Data.Function");
var Data_Lens_Prism = require("../Data.Lens.Prism");
var Data_Maybe = require("../Data.Maybe");
var Data_Unit = require("../Data.Unit");
var Prelude = require("../Prelude");
var _Nothing = function (dictChoice) {
    return Data_Lens_Prism.prism(Data_Function["const"](Data_Maybe.Nothing.value))(Data_Maybe.maybe(new Data_Either.Right(Data_Unit.unit))(Data_Function["const"](new Data_Either.Left(Data_Maybe.Nothing.value))))(dictChoice);
};
var _Just = function (dictChoice) {
    return Data_Lens_Prism.prism(Data_Maybe.Just.create)(Data_Maybe.maybe(new Data_Either.Left(Data_Maybe.Nothing.value))(Data_Either.Right.create))(dictChoice);
};
module.exports = {
    _Just: _Just, 
    _Nothing: _Nothing
};
