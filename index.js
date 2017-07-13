// Generated by psc-bundle 0.10.7
var PS = {};
(function(exports) {
    "use strict";

  exports.log = function (s) {
    return function () {
      console.log(s);
      return {};
    };
  };
})(PS["Control.Monad.Eff.Console"] = PS["Control.Monad.Eff.Console"] || {});
(function(exports) {
    "use strict";

  exports.unit = {};
})(PS["Data.Unit"] = PS["Data.Unit"] || {});
(function(exports) {
  // Generated by purs version 0.11.5
  "use strict";
  var $foreign = PS["Data.Unit"];
  var Data_Show = PS["Data.Show"];
  exports["unit"] = $foreign.unit;
})(PS["Data.Unit"] = PS["Data.Unit"] || {});
(function(exports) {
  // Generated by purs version 0.11.5
  "use strict";
  var $foreign = PS["Control.Monad.Eff.Console"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  var Data_Show = PS["Data.Show"];
  var Data_Unit = PS["Data.Unit"];
  exports["log"] = $foreign.log;
})(PS["Control.Monad.Eff.Console"] = PS["Control.Monad.Eff.Console"] || {});
(function(exports) {
    "use strict";

  exports.mkEffFn1 = function mkEffFn1(fn) {
    return function(x) {
      return fn(x)();
    };
  };

  exports.runEffFn1 = function runEffFn1(fn) {
    return function(a) {
      return function() {
        return fn(a);
      };
    };
  };

  exports.runEffFn2 = function runEffFn2(fn) {
    return function(a) {
      return function(b) {
        return function() {
          return fn(a, b);
        };
      };
    };
  };
})(PS["Control.Monad.Eff.Uncurried"] = PS["Control.Monad.Eff.Uncurried"] || {});
(function(exports) {
  // Generated by purs version 0.11.5
  "use strict";
  var $foreign = PS["Control.Monad.Eff.Uncurried"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  exports["mkEffFn1"] = $foreign.mkEffFn1;
  exports["runEffFn1"] = $foreign.runEffFn1;
  exports["runEffFn2"] = $foreign.runEffFn2;
})(PS["Control.Monad.Eff.Uncurried"] = PS["Control.Monad.Eff.Uncurried"] || {});
(function(exports) {
    "use strict";

  //------------------------------------------------------------------------------
  // Array size ------------------------------------------------------------------
  //------------------------------------------------------------------------------

  exports.length = function (xs) {
    return xs.length;
  };

  //------------------------------------------------------------------------------
  // Sorting ---------------------------------------------------------------------
  //------------------------------------------------------------------------------

  exports.sortImpl = function (f) {
    return function (l) {
      // jshint maxparams: 2
      return l.slice().sort(function (x, y) {
        return f(x)(y);
      });
    };
  };

  //------------------------------------------------------------------------------
  // Subarrays -------------------------------------------------------------------
  //------------------------------------------------------------------------------

  exports.slice = function (s) {
    return function (e) {
      return function (l) {
        return l.slice(s, e);
      };
    };
  };
})(PS["Data.Array"] = PS["Data.Array"] || {});
(function(exports) {
  // Generated by purs version 0.11.5
  "use strict";
  var otherwise = true;
  exports["otherwise"] = otherwise;
})(PS["Data.Boolean"] = PS["Data.Boolean"] || {});
(function(exports) {
    "use strict";

  exports.refEq = function (r1) {
    return function (r2) {
      return r1 === r2;
    };
  };
})(PS["Data.Eq"] = PS["Data.Eq"] || {});
(function(exports) {
  // Generated by purs version 0.11.5
  "use strict";
  var $foreign = PS["Data.Eq"];
  var Data_Unit = PS["Data.Unit"];
  var Data_Void = PS["Data.Void"];        
  var Eq = function (eq) {
      this.eq = eq;
  }; 
  var eqString = new Eq($foreign.refEq);
  var eq = function (dict) {
      return dict.eq;
  };
  exports["Eq"] = Eq;
  exports["eq"] = eq;
  exports["eqString"] = eqString;
})(PS["Data.Eq"] = PS["Data.Eq"] || {});
(function(exports) {
    "use strict";

  exports.unsafeCompareImpl = function (lt) {
    return function (eq) {
      return function (gt) {
        return function (x) {
          return function (y) {
            return x < y ? lt : x === y ? eq : gt;
          };
        };
      };
    };
  };
})(PS["Data.Ord.Unsafe"] = PS["Data.Ord.Unsafe"] || {});
(function(exports) {
  // Generated by purs version 0.11.5
  "use strict";
  var Data_Eq = PS["Data.Eq"];
  var Data_Semigroup = PS["Data.Semigroup"];
  var Data_Show = PS["Data.Show"];        
  var LT = (function () {
      function LT() {

      };
      LT.value = new LT();
      return LT;
  })();
  var GT = (function () {
      function GT() {

      };
      GT.value = new GT();
      return GT;
  })();
  var EQ = (function () {
      function EQ() {

      };
      EQ.value = new EQ();
      return EQ;
  })();
  exports["LT"] = LT;
  exports["GT"] = GT;
  exports["EQ"] = EQ;
})(PS["Data.Ordering"] = PS["Data.Ordering"] || {});
(function(exports) {
  // Generated by purs version 0.11.5
  "use strict";
  var $foreign = PS["Data.Ord.Unsafe"];
  var Data_Ordering = PS["Data.Ordering"];        
  var unsafeCompare = $foreign.unsafeCompareImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value);
  exports["unsafeCompare"] = unsafeCompare;
})(PS["Data.Ord.Unsafe"] = PS["Data.Ord.Unsafe"] || {});
(function(exports) {
  // Generated by purs version 0.11.5
  "use strict";
  var $foreign = PS["Data.Ord"];
  var Data_Eq = PS["Data.Eq"];
  var Data_Function = PS["Data.Function"];
  var Data_Ord_Unsafe = PS["Data.Ord.Unsafe"];
  var Data_Ordering = PS["Data.Ordering"];
  var Data_Ring = PS["Data.Ring"];
  var Data_Semiring = PS["Data.Semiring"];
  var Data_Unit = PS["Data.Unit"];
  var Data_Void = PS["Data.Void"];        
  var Ord = function (Eq0, compare) {
      this.Eq0 = Eq0;
      this.compare = compare;
  }; 
  var ordString = new Ord(function () {
      return Data_Eq.eqString;
  }, Data_Ord_Unsafe.unsafeCompare);
  var compare = function (dict) {
      return dict.compare;
  };
  exports["Ord"] = Ord;
  exports["compare"] = compare;
  exports["ordString"] = ordString;
})(PS["Data.Ord"] = PS["Data.Ord"] || {});
(function(exports) {
  // Generated by purs version 0.11.5
  "use strict";
  var Control_Alt = PS["Control.Alt"];
  var Control_Alternative = PS["Control.Alternative"];
  var Control_Applicative = PS["Control.Applicative"];
  var Control_Apply = PS["Control.Apply"];
  var Control_Bind = PS["Control.Bind"];
  var Control_Category = PS["Control.Category"];
  var Control_Extend = PS["Control.Extend"];
  var Control_Monad = PS["Control.Monad"];
  var Control_MonadZero = PS["Control.MonadZero"];
  var Control_Plus = PS["Control.Plus"];
  var Data_Bounded = PS["Data.Bounded"];
  var Data_Eq = PS["Data.Eq"];
  var Data_Function = PS["Data.Function"];
  var Data_Functor = PS["Data.Functor"];
  var Data_Functor_Invariant = PS["Data.Functor.Invariant"];
  var Data_Monoid = PS["Data.Monoid"];
  var Data_Ord = PS["Data.Ord"];
  var Data_Ordering = PS["Data.Ordering"];
  var Data_Semigroup = PS["Data.Semigroup"];
  var Data_Show = PS["Data.Show"];
  var Data_Unit = PS["Data.Unit"];
  var Prelude = PS["Prelude"];        
  var Nothing = (function () {
      function Nothing() {

      };
      Nothing.value = new Nothing();
      return Nothing;
  })();
  var Just = (function () {
      function Just(value0) {
          this.value0 = value0;
      };
      Just.create = function (value0) {
          return new Just(value0);
      };
      return Just;
  })();
  exports["Nothing"] = Nothing;
  exports["Just"] = Just;
})(PS["Data.Maybe"] = PS["Data.Maybe"] || {});
(function(exports) {
  // Generated by purs version 0.11.5
  "use strict";
  var $foreign = PS["Data.Array"];
  var Control_Alt = PS["Control.Alt"];
  var Control_Alternative = PS["Control.Alternative"];
  var Control_Applicative = PS["Control.Applicative"];
  var Control_Apply = PS["Control.Apply"];
  var Control_Bind = PS["Control.Bind"];
  var Control_Category = PS["Control.Category"];
  var Control_Lazy = PS["Control.Lazy"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  var Control_Monad_Rec_Class = PS["Control.Monad.Rec.Class"];
  var Control_Monad_ST = PS["Control.Monad.ST"];
  var Control_Semigroupoid = PS["Control.Semigroupoid"];
  var Data_Array_ST = PS["Data.Array.ST"];
  var Data_Array_ST_Iterator = PS["Data.Array.ST.Iterator"];
  var Data_Boolean = PS["Data.Boolean"];
  var Data_Eq = PS["Data.Eq"];
  var Data_Foldable = PS["Data.Foldable"];
  var Data_Function = PS["Data.Function"];
  var Data_Functor = PS["Data.Functor"];
  var Data_HeytingAlgebra = PS["Data.HeytingAlgebra"];
  var Data_Maybe = PS["Data.Maybe"];
  var Data_NonEmpty = PS["Data.NonEmpty"];
  var Data_Ord = PS["Data.Ord"];
  var Data_Ordering = PS["Data.Ordering"];
  var Data_Ring = PS["Data.Ring"];
  var Data_Semigroup = PS["Data.Semigroup"];
  var Data_Semiring = PS["Data.Semiring"];
  var Data_Traversable = PS["Data.Traversable"];
  var Data_Tuple = PS["Data.Tuple"];
  var Data_Unfoldable = PS["Data.Unfoldable"];
  var Partial_Unsafe = PS["Partial.Unsafe"];
  var Prelude = PS["Prelude"];
  var sortBy = function (comp) {
      return function (xs) {
          var comp$prime = function (x) {
              return function (y) {
                  var v = comp(x)(y);
                  if (v instanceof Data_Ordering.GT) {
                      return 1;
                  };
                  if (v instanceof Data_Ordering.EQ) {
                      return 0;
                  };
                  if (v instanceof Data_Ordering.LT) {
                      return -1 | 0;
                  };
                  throw new Error("Failed pattern match at Data.Array line 475, column 15 - line 480, column 1: " + [ v.constructor.name ]);
              };
          };
          return $foreign.sortImpl(comp$prime)(xs);
      };
  };
  exports["sortBy"] = sortBy;
  exports["length"] = $foreign.length;
})(PS["Data.Array"] = PS["Data.Array"] || {});
(function(exports) {
    "use strict";

  // module Data.Generic

  exports.zipAll = function (f) {
    return function (xs) {
      return function (ys) {
        var l = xs.length < ys.length ? xs.length : ys.length;
        for (var i = 0; i < l; i++) {
          if (!f(xs[i])(ys[i])) {
            return false;
          }
        }
        return true;
      };
    };
  };
})(PS["Data.Generic"] = PS["Data.Generic"] || {});
(function(exports) {
  // Generated by purs version 0.11.5
  "use strict";
  var $foreign = PS["Data.Generic"];
  var Control_Applicative = PS["Control.Applicative"];
  var Control_Apply = PS["Control.Apply"];
  var Control_Semigroupoid = PS["Control.Semigroupoid"];
  var Data_Array = PS["Data.Array"];
  var Data_Boolean = PS["Data.Boolean"];
  var Data_Either = PS["Data.Either"];
  var Data_Eq = PS["Data.Eq"];
  var Data_Foldable = PS["Data.Foldable"];
  var Data_Function = PS["Data.Function"];
  var Data_Functor = PS["Data.Functor"];
  var Data_HeytingAlgebra = PS["Data.HeytingAlgebra"];
  var Data_Identity = PS["Data.Identity"];
  var Data_List_Types = PS["Data.List.Types"];
  var Data_Maybe = PS["Data.Maybe"];
  var Data_Monoid = PS["Data.Monoid"];
  var Data_NonEmpty = PS["Data.NonEmpty"];
  var Data_Ord = PS["Data.Ord"];
  var Data_Ordering = PS["Data.Ordering"];
  var Data_Ring = PS["Data.Ring"];
  var Data_Semigroup = PS["Data.Semigroup"];
  var Data_Show = PS["Data.Show"];
  var Data_String = PS["Data.String"];
  var Data_Traversable = PS["Data.Traversable"];
  var Data_Tuple = PS["Data.Tuple"];
  var Data_Unit = PS["Data.Unit"];
  var Data_Void = PS["Data.Void"];
  var Prelude = PS["Prelude"];
  var Type_Proxy = PS["Type.Proxy"];        
  var SProd = (function () {
      function SProd(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
      };
      SProd.create = function (value0) {
          return function (value1) {
              return new SProd(value0, value1);
          };
      };
      return SProd;
  })();
  var SRecord = (function () {
      function SRecord(value0) {
          this.value0 = value0;
      };
      SRecord.create = function (value0) {
          return new SRecord(value0);
      };
      return SRecord;
  })();
  var SNumber = (function () {
      function SNumber(value0) {
          this.value0 = value0;
      };
      SNumber.create = function (value0) {
          return new SNumber(value0);
      };
      return SNumber;
  })();
  var SBoolean = (function () {
      function SBoolean(value0) {
          this.value0 = value0;
      };
      SBoolean.create = function (value0) {
          return new SBoolean(value0);
      };
      return SBoolean;
  })();
  var SInt = (function () {
      function SInt(value0) {
          this.value0 = value0;
      };
      SInt.create = function (value0) {
          return new SInt(value0);
      };
      return SInt;
  })();
  var SString = (function () {
      function SString(value0) {
          this.value0 = value0;
      };
      SString.create = function (value0) {
          return new SString(value0);
      };
      return SString;
  })();
  var SChar = (function () {
      function SChar(value0) {
          this.value0 = value0;
      };
      SChar.create = function (value0) {
          return new SChar(value0);
      };
      return SChar;
  })();
  var SArray = (function () {
      function SArray(value0) {
          this.value0 = value0;
      };
      SArray.create = function (value0) {
          return new SArray(value0);
      };
      return SArray;
  })();
  var SUnit = (function () {
      function SUnit() {

      };
      SUnit.value = new SUnit();
      return SUnit;
  })();
  var SigProd = (function () {
      function SigProd(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
      };
      SigProd.create = function (value0) {
          return function (value1) {
              return new SigProd(value0, value1);
          };
      };
      return SigProd;
  })();
  var Generic = function (fromSpine, toSignature, toSpine) {
      this.fromSpine = fromSpine;
      this.toSignature = toSignature;
      this.toSpine = toSpine;
  };
  var toSpine = function (dict) {
      return dict.toSpine;
  };
  var toSignature = function (dict) {
      return dict.toSignature;
  };                  
  var fromSpine = function (dict) {
      return dict.fromSpine;
  };
  var force = function (f) {
      return f(Data_Unit.unit);
  };                                                           
  var eqThunk = function (dictEq) {
      return function (x) {
          return function (y) {
              return Data_Eq.eq(dictEq)(force(x))(force(y));
          };
      };
  };
  var eqRecordSigs = function (dictEq) {
      return function (arr1) {
          return function (arr2) {
              var labelCompare = function (r1) {
                  return function (r2) {
                      return Data_Ord.compare(Data_Ord.ordString)(r1.recLabel)(r2.recLabel);
                  };
              };
              var sorted1 = Data_Array.sortBy(labelCompare)(arr1);
              var sorted2 = Data_Array.sortBy(labelCompare)(arr2);
              var doCmp = function (x) {
                  return function (y) {
                      return x.recLabel === y.recLabel && Data_Eq.eq(dictEq)(force(x.recValue))(force(y.recValue));
                  };
              };
              return Data_Array.length(arr1) === Data_Array.length(arr2) && $foreign.zipAll(doCmp)(sorted1)(sorted2);
          };
      };
  };
  var eqGenericSpine = new Data_Eq.Eq(function (v) {
      return function (v1) {
          if (v instanceof SProd && v1 instanceof SProd) {
              return v.value0 === v1.value0 && (Data_Array.length(v.value1) === Data_Array.length(v1.value1) && $foreign.zipAll(eqThunk(eqGenericSpine))(v.value1)(v1.value1));
          };
          if (v instanceof SRecord && v1 instanceof SRecord) {
              return eqRecordSigs(eqGenericSpine)(v.value0)(v1.value0);
          };
          if (v instanceof SNumber && v1 instanceof SNumber) {
              return v.value0 === v1.value0;
          };
          if (v instanceof SBoolean && v1 instanceof SBoolean) {
              return v.value0 === v1.value0;
          };
          if (v instanceof SInt && v1 instanceof SInt) {
              return v.value0 === v1.value0;
          };
          if (v instanceof SString && v1 instanceof SString) {
              return v.value0 === v1.value0;
          };
          if (v instanceof SChar && v1 instanceof SChar) {
              return v.value0 === v1.value0;
          };
          if (v instanceof SArray && v1 instanceof SArray) {
              return Data_Array.length(v.value0) === Data_Array.length(v1.value0) && $foreign.zipAll(eqThunk(eqGenericSpine))(v.value0)(v1.value0);
          };
          if (v instanceof SUnit && v1 instanceof SUnit) {
              return true;
          };
          return false;
      };
  });
  var gEq = function (dictGeneric) {
      return function (x) {
          return function (y) {
              return Data_Eq.eq(eqGenericSpine)(toSpine(dictGeneric)(x))(toSpine(dictGeneric)(y));
          };
      };
  };
  exports["SigProd"] = SigProd;
  exports["SProd"] = SProd;
  exports["SRecord"] = SRecord;
  exports["SNumber"] = SNumber;
  exports["SBoolean"] = SBoolean;
  exports["SInt"] = SInt;
  exports["SString"] = SString;
  exports["SChar"] = SChar;
  exports["SArray"] = SArray;
  exports["SUnit"] = SUnit;
  exports["Generic"] = Generic;
  exports["fromSpine"] = fromSpine;
  exports["gEq"] = gEq;
  exports["toSignature"] = toSignature;
  exports["toSpine"] = toSpine;
  exports["eqGenericSpine"] = eqGenericSpine;
})(PS["Data.Generic"] = PS["Data.Generic"] || {});
(function(exports) {
    "use strict";
  var rpio =require("rpio");

  exports.openWriteImpl = function openWriteImpl (pin, def) {
    rpio.open(pin, rpio.OUTPUT, def ? rpio.HIGH : rpio.LOW);
  };

  exports.readPinImpl = function readPinImpl (pin) {
    var v = rpio.read(pin);

    if (v === 1) {
      return true;
    } else if (v === 0) {
      return false;
    } else {
      console.error("Strange return type from rpio.read():", v);
    }
  };

  exports.writePinImpl = function writePinImpl (pin, val) {
    rpio.write(pin, val ? rpio.HIGH : rpio.LOW);
  };

  exports.listenImpl = function listenImpl (pin, f) {
    rpio.open(pin, rpio.INPUT, rpio.PULL_DOWN);
    rpio.poll(pin, f);
  };

  exports.sleepImpl = function sleepImpl (n) {
    rpio.msleep(n);
  };
})(PS["GPIO"] = PS["GPIO"] || {});
(function(exports) {
  // Generated by purs version 0.11.5
  "use strict";
  var $foreign = PS["GPIO"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  var Control_Monad_Eff_Uncurried = PS["Control.Monad.Eff.Uncurried"];
  var Control_Semigroupoid = PS["Control.Semigroupoid"];
  var Data_Boolean = PS["Data.Boolean"];
  var Data_Eq = PS["Data.Eq"];
  var Data_Generic = PS["Data.Generic"];
  var Data_Maybe = PS["Data.Maybe"];
  var Prelude = PS["Prelude"];        
  var GPIO4 = (function () {
      function GPIO4() {

      };
      GPIO4.value = new GPIO4();
      return GPIO4;
  })();
  var GPIO5 = (function () {
      function GPIO5() {

      };
      GPIO5.value = new GPIO5();
      return GPIO5;
  })();
  var GPIO6 = (function () {
      function GPIO6() {

      };
      GPIO6.value = new GPIO6();
      return GPIO6;
  })();
  var GPIO12 = (function () {
      function GPIO12() {

      };
      GPIO12.value = new GPIO12();
      return GPIO12;
  })();
  var GPIO13 = (function () {
      function GPIO13() {

      };
      GPIO13.value = new GPIO13();
      return GPIO13;
  })();
  var GPIO16 = (function () {
      function GPIO16() {

      };
      GPIO16.value = new GPIO16();
      return GPIO16;
  })();
  var GPIO17 = (function () {
      function GPIO17() {

      };
      GPIO17.value = new GPIO17();
      return GPIO17;
  })();
  var GPIO18 = (function () {
      function GPIO18() {

      };
      GPIO18.value = new GPIO18();
      return GPIO18;
  })();
  var GPIO19 = (function () {
      function GPIO19() {

      };
      GPIO19.value = new GPIO19();
      return GPIO19;
  })();
  var GPIO20 = (function () {
      function GPIO20() {

      };
      GPIO20.value = new GPIO20();
      return GPIO20;
  })();
  var GPIO21 = (function () {
      function GPIO21() {

      };
      GPIO21.value = new GPIO21();
      return GPIO21;
  })();
  var GPIO22 = (function () {
      function GPIO22() {

      };
      GPIO22.value = new GPIO22();
      return GPIO22;
  })();
  var GPIO23 = (function () {
      function GPIO23() {

      };
      GPIO23.value = new GPIO23();
      return GPIO23;
  })();
  var GPIO24 = (function () {
      function GPIO24() {

      };
      GPIO24.value = new GPIO24();
      return GPIO24;
  })();
  var GPIO25 = (function () {
      function GPIO25() {

      };
      GPIO25.value = new GPIO25();
      return GPIO25;
  })();
  var GPIO26 = (function () {
      function GPIO26() {

      };
      GPIO26.value = new GPIO26();
      return GPIO26;
  })();
  var GPIO27 = (function () {
      function GPIO27() {

      };
      GPIO27.value = new GPIO27();
      return GPIO27;
  })();
  var toPin = function (v) {
      if (v instanceof GPIO4) {
          return 7;
      };
      if (v instanceof GPIO5) {
          return 29;
      };
      if (v instanceof GPIO6) {
          return 31;
      };
      if (v instanceof GPIO12) {
          return 32;
      };
      if (v instanceof GPIO13) {
          return 33;
      };
      if (v instanceof GPIO16) {
          return 36;
      };
      if (v instanceof GPIO17) {
          return 11;
      };
      if (v instanceof GPIO18) {
          return 12;
      };
      if (v instanceof GPIO19) {
          return 35;
      };
      if (v instanceof GPIO20) {
          return 38;
      };
      if (v instanceof GPIO21) {
          return 40;
      };
      if (v instanceof GPIO22) {
          return 15;
      };
      if (v instanceof GPIO23) {
          return 16;
      };
      if (v instanceof GPIO24) {
          return 18;
      };
      if (v instanceof GPIO25) {
          return 22;
      };
      if (v instanceof GPIO26) {
          return 37;
      };
      if (v instanceof GPIO27) {
          return 13;
      };
      throw new Error("Failed pattern match at GPIO line 50, column 9 - line 69, column 1: " + [ v.constructor.name ]);
  };
  var write = function (pin) {
      return function (val) {
          return Control_Monad_Eff_Uncurried.runEffFn2($foreign.writePinImpl)(toPin(pin))(val);
      };
  };
  var sleep = Control_Monad_Eff_Uncurried.runEffFn1($foreign.sleepImpl);
  var read = function (pin) {
      return Control_Monad_Eff_Uncurried.runEffFn1($foreign.readPinImpl)(toPin(pin));
  };
  var openWrite = function (pin) {
      return function (val) {
          return Control_Monad_Eff_Uncurried.runEffFn2($foreign.openWriteImpl)(toPin(pin))(val);
      };
  };
  var genericGPIOPin = new Data_Generic.Generic(function (v) {
      if (v instanceof Data_Generic.SProd && (v.value0 === "GPIO.GPIO4" && v.value1.length === 0)) {
          return new Data_Maybe.Just(GPIO4.value);
      };
      if (v instanceof Data_Generic.SProd && (v.value0 === "GPIO.GPIO5" && v.value1.length === 0)) {
          return new Data_Maybe.Just(GPIO5.value);
      };
      if (v instanceof Data_Generic.SProd && (v.value0 === "GPIO.GPIO6" && v.value1.length === 0)) {
          return new Data_Maybe.Just(GPIO6.value);
      };
      if (v instanceof Data_Generic.SProd && (v.value0 === "GPIO.GPIO12" && v.value1.length === 0)) {
          return new Data_Maybe.Just(GPIO12.value);
      };
      if (v instanceof Data_Generic.SProd && (v.value0 === "GPIO.GPIO13" && v.value1.length === 0)) {
          return new Data_Maybe.Just(GPIO13.value);
      };
      if (v instanceof Data_Generic.SProd && (v.value0 === "GPIO.GPIO16" && v.value1.length === 0)) {
          return new Data_Maybe.Just(GPIO16.value);
      };
      if (v instanceof Data_Generic.SProd && (v.value0 === "GPIO.GPIO17" && v.value1.length === 0)) {
          return new Data_Maybe.Just(GPIO17.value);
      };
      if (v instanceof Data_Generic.SProd && (v.value0 === "GPIO.GPIO18" && v.value1.length === 0)) {
          return new Data_Maybe.Just(GPIO18.value);
      };
      if (v instanceof Data_Generic.SProd && (v.value0 === "GPIO.GPIO19" && v.value1.length === 0)) {
          return new Data_Maybe.Just(GPIO19.value);
      };
      if (v instanceof Data_Generic.SProd && (v.value0 === "GPIO.GPIO20" && v.value1.length === 0)) {
          return new Data_Maybe.Just(GPIO20.value);
      };
      if (v instanceof Data_Generic.SProd && (v.value0 === "GPIO.GPIO21" && v.value1.length === 0)) {
          return new Data_Maybe.Just(GPIO21.value);
      };
      if (v instanceof Data_Generic.SProd && (v.value0 === "GPIO.GPIO22" && v.value1.length === 0)) {
          return new Data_Maybe.Just(GPIO22.value);
      };
      if (v instanceof Data_Generic.SProd && (v.value0 === "GPIO.GPIO23" && v.value1.length === 0)) {
          return new Data_Maybe.Just(GPIO23.value);
      };
      if (v instanceof Data_Generic.SProd && (v.value0 === "GPIO.GPIO24" && v.value1.length === 0)) {
          return new Data_Maybe.Just(GPIO24.value);
      };
      if (v instanceof Data_Generic.SProd && (v.value0 === "GPIO.GPIO25" && v.value1.length === 0)) {
          return new Data_Maybe.Just(GPIO25.value);
      };
      if (v instanceof Data_Generic.SProd && (v.value0 === "GPIO.GPIO26" && v.value1.length === 0)) {
          return new Data_Maybe.Just(GPIO26.value);
      };
      if (v instanceof Data_Generic.SProd && (v.value0 === "GPIO.GPIO27" && v.value1.length === 0)) {
          return new Data_Maybe.Just(GPIO27.value);
      };
      return Data_Maybe.Nothing.value;
  }, function ($dollarq) {
      return new Data_Generic.SigProd("GPIO.GPIOPin", [ {
          sigConstructor: "GPIO.GPIO4", 
          sigValues: [  ]
      }, {
          sigConstructor: "GPIO.GPIO5", 
          sigValues: [  ]
      }, {
          sigConstructor: "GPIO.GPIO6", 
          sigValues: [  ]
      }, {
          sigConstructor: "GPIO.GPIO12", 
          sigValues: [  ]
      }, {
          sigConstructor: "GPIO.GPIO13", 
          sigValues: [  ]
      }, {
          sigConstructor: "GPIO.GPIO16", 
          sigValues: [  ]
      }, {
          sigConstructor: "GPIO.GPIO17", 
          sigValues: [  ]
      }, {
          sigConstructor: "GPIO.GPIO18", 
          sigValues: [  ]
      }, {
          sigConstructor: "GPIO.GPIO19", 
          sigValues: [  ]
      }, {
          sigConstructor: "GPIO.GPIO20", 
          sigValues: [  ]
      }, {
          sigConstructor: "GPIO.GPIO21", 
          sigValues: [  ]
      }, {
          sigConstructor: "GPIO.GPIO22", 
          sigValues: [  ]
      }, {
          sigConstructor: "GPIO.GPIO23", 
          sigValues: [  ]
      }, {
          sigConstructor: "GPIO.GPIO24", 
          sigValues: [  ]
      }, {
          sigConstructor: "GPIO.GPIO25", 
          sigValues: [  ]
      }, {
          sigConstructor: "GPIO.GPIO26", 
          sigValues: [  ]
      }, {
          sigConstructor: "GPIO.GPIO27", 
          sigValues: [  ]
      } ]);
  }, function (v) {
      if (v instanceof GPIO4) {
          return new Data_Generic.SProd("GPIO.GPIO4", [  ]);
      };
      if (v instanceof GPIO5) {
          return new Data_Generic.SProd("GPIO.GPIO5", [  ]);
      };
      if (v instanceof GPIO6) {
          return new Data_Generic.SProd("GPIO.GPIO6", [  ]);
      };
      if (v instanceof GPIO12) {
          return new Data_Generic.SProd("GPIO.GPIO12", [  ]);
      };
      if (v instanceof GPIO13) {
          return new Data_Generic.SProd("GPIO.GPIO13", [  ]);
      };
      if (v instanceof GPIO16) {
          return new Data_Generic.SProd("GPIO.GPIO16", [  ]);
      };
      if (v instanceof GPIO17) {
          return new Data_Generic.SProd("GPIO.GPIO17", [  ]);
      };
      if (v instanceof GPIO18) {
          return new Data_Generic.SProd("GPIO.GPIO18", [  ]);
      };
      if (v instanceof GPIO19) {
          return new Data_Generic.SProd("GPIO.GPIO19", [  ]);
      };
      if (v instanceof GPIO20) {
          return new Data_Generic.SProd("GPIO.GPIO20", [  ]);
      };
      if (v instanceof GPIO21) {
          return new Data_Generic.SProd("GPIO.GPIO21", [  ]);
      };
      if (v instanceof GPIO22) {
          return new Data_Generic.SProd("GPIO.GPIO22", [  ]);
      };
      if (v instanceof GPIO23) {
          return new Data_Generic.SProd("GPIO.GPIO23", [  ]);
      };
      if (v instanceof GPIO24) {
          return new Data_Generic.SProd("GPIO.GPIO24", [  ]);
      };
      if (v instanceof GPIO25) {
          return new Data_Generic.SProd("GPIO.GPIO25", [  ]);
      };
      if (v instanceof GPIO26) {
          return new Data_Generic.SProd("GPIO.GPIO26", [  ]);
      };
      if (v instanceof GPIO27) {
          return new Data_Generic.SProd("GPIO.GPIO27", [  ]);
      };
      throw new Error("Failed pattern match at GPIO line 40, column 1 - line 40, column 50: " + [ v.constructor.name ]);
  });
  var fromPin = function (pin) {
      if (pin === 7) {
          return GPIO4.value;
      };
      if (pin === 29) {
          return GPIO5.value;
      };
      if (pin === 31) {
          return GPIO6.value;
      };
      if (pin === 32) {
          return GPIO12.value;
      };
      if (pin === 33) {
          return GPIO13.value;
      };
      if (pin === 36) {
          return GPIO16.value;
      };
      if (pin === 11) {
          return GPIO17.value;
      };
      if (pin === 12) {
          return GPIO18.value;
      };
      if (pin === 35) {
          return GPIO19.value;
      };
      if (pin === 38) {
          return GPIO20.value;
      };
      if (pin === 40) {
          return GPIO21.value;
      };
      if (pin === 15) {
          return GPIO22.value;
      };
      if (pin === 16) {
          return GPIO23.value;
      };
      if (pin === 18) {
          return GPIO24.value;
      };
      if (pin === 22) {
          return GPIO25.value;
      };
      if (pin === 37) {
          return GPIO26.value;
      };
      if (pin === 13) {
          return GPIO27.value;
      };
      if (Data_Boolean.otherwise) {
          return GPIO27.value;
      };
      throw new Error("Failed pattern match at GPIO line 70, column 1 - line 88, column 23: " + [ pin.constructor.name ]);
  };
  var listen = function (pin) {
      return function (f) {
          return Control_Monad_Eff_Uncurried.runEffFn2($foreign.listenImpl)(toPin(pin))(Control_Monad_Eff_Uncurried.mkEffFn1(function ($41) {
              return f(fromPin($41));
          }));
      };
  };
  var eqGPIOPin = new Data_Eq.Eq(Data_Generic.gEq(genericGPIOPin));
  exports["GPIO4"] = GPIO4;
  exports["GPIO5"] = GPIO5;
  exports["GPIO6"] = GPIO6;
  exports["GPIO12"] = GPIO12;
  exports["GPIO13"] = GPIO13;
  exports["GPIO16"] = GPIO16;
  exports["GPIO17"] = GPIO17;
  exports["GPIO18"] = GPIO18;
  exports["GPIO19"] = GPIO19;
  exports["GPIO20"] = GPIO20;
  exports["GPIO21"] = GPIO21;
  exports["GPIO22"] = GPIO22;
  exports["GPIO23"] = GPIO23;
  exports["GPIO24"] = GPIO24;
  exports["GPIO25"] = GPIO25;
  exports["GPIO26"] = GPIO26;
  exports["GPIO27"] = GPIO27;
  exports["listen"] = listen;
  exports["openWrite"] = openWrite;
  exports["read"] = read;
  exports["sleep"] = sleep;
  exports["write"] = write;
  exports["genericGPIOPin"] = genericGPIOPin;
  exports["eqGPIOPin"] = eqGPIOPin;
})(PS["GPIO"] = PS["GPIO"] || {});
(function(exports) {
  // Generated by purs version 0.11.5
  "use strict";
  var GPIO = PS["GPIO"];
  var Prelude = PS["Prelude"];
  var LoSig = (function () {
      function LoSig() {

      };
      LoSig.value = new LoSig();
      return LoSig;
  })();
  var Lo = (function () {
      function Lo() {

      };
      Lo.value = new Lo();
      return Lo;
  })();
  var GPIOPinAble = function (toGPIOPin) {
      this.toGPIOPin = toGPIOPin;
  }; 
  var toGPIOPin = function (dict) {
      return dict.toGPIOPin;
  };
  var loSigGPIOPinAble = new GPIOPinAble(function (v) {
      return GPIO.GPIO21.value;
  });
  var loGPIOPinAble = new GPIOPinAble(function (v) {
      return GPIO.GPIO4.value;
  });
  exports["Lo"] = Lo;
  exports["LoSig"] = LoSig;
  exports["GPIOPinAble"] = GPIOPinAble;
  exports["toGPIOPin"] = toGPIOPin;
  exports["loGPIOPinAble"] = loGPIOPinAble;
  exports["loSigGPIOPinAble"] = loSigGPIOPinAble;
})(PS["Kshatriya"] = PS["Kshatriya"] || {});
(function(exports) {
  // Generated by purs version 0.11.5
  "use strict";
  var Control_Bind = PS["Control.Bind"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  var Control_Monad_Eff_Console = PS["Control.Monad.Eff.Console"];
  var Data_Boolean = PS["Data.Boolean"];
  var Data_Eq = PS["Data.Eq"];
  var GPIO = PS["GPIO"];
  var Kshatriya = PS["Kshatriya"];
  var Prelude = PS["Prelude"];        
  var pinCallback = function (pin) {
      if (Data_Eq.eq(GPIO.eqGPIOPin)(pin)(Kshatriya.toGPIOPin(Kshatriya.loSigGPIOPinAble)(Kshatriya.LoSig.value))) {
          return function __do() {
              Control_Monad_Eff_Console.log("??")();
              var v = GPIO.read(Kshatriya.toGPIOPin(Kshatriya.loSigGPIOPinAble)(Kshatriya.LoSig.value))();
              if (v) {
                  return GPIO.write(Kshatriya.toGPIOPin(Kshatriya.loGPIOPinAble)(Kshatriya.Lo.value))(true)();
              };
              return GPIO.write(Kshatriya.toGPIOPin(Kshatriya.loGPIOPinAble)(Kshatriya.Lo.value))(false)();
          };
      };
      if (Data_Boolean.otherwise) {
          return Control_Monad_Eff_Console.log("!?!");
      };
      throw new Error("Failed pattern match at Main line 26, column 1 - line 34, column 11: " + [ pin.constructor.name ]);
  };
  var main = function __do() {
      Control_Monad_Eff_Console.log("Hello sailor!")();
      GPIO.openWrite(Kshatriya.toGPIOPin(Kshatriya.loGPIOPinAble)(Kshatriya.Lo.value))(false)();
      GPIO.listen(Kshatriya.toGPIOPin(Kshatriya.loSigGPIOPinAble)(Kshatriya.LoSig.value))(pinCallback)();
      return GPIO.sleep(10000)();
  };
  exports["main"] = main;
  exports["pinCallback"] = pinCallback;
})(PS["Main"] = PS["Main"] || {});
PS["Main"].main();
