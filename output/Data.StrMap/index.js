// Generated by purs version 0.11.6
"use strict";
var $foreign = require("./foreign");
var Control_Applicative = require("../Control.Applicative");
var Control_Apply = require("../Control.Apply");
var Control_Bind = require("../Control.Bind");
var Control_Category = require("../Control.Category");
var Control_Monad_Eff = require("../Control.Monad.Eff");
var Control_Monad_ST = require("../Control.Monad.ST");
var Control_Semigroupoid = require("../Control.Semigroupoid");
var Data_Array = require("../Data.Array");
var Data_Eq = require("../Data.Eq");
var Data_Foldable = require("../Data.Foldable");
var Data_Function = require("../Data.Function");
var Data_Function_Uncurried = require("../Data.Function.Uncurried");
var Data_Functor = require("../Data.Functor");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra");
var Data_Maybe = require("../Data.Maybe");
var Data_Monoid = require("../Data.Monoid");
var Data_Ord = require("../Data.Ord");
var Data_Semigroup = require("../Data.Semigroup");
var Data_Show = require("../Data.Show");
var Data_StrMap_ST = require("../Data.StrMap.ST");
var Data_Traversable = require("../Data.Traversable");
var Data_Tuple = require("../Data.Tuple");
var Data_Unfoldable = require("../Data.Unfoldable");
var Prelude = require("../Prelude");
var values = $foreign.toArrayWithKey(function (v) {
    return function (v1) {
        return v1;
    };
});
var toUnfoldable = function (dictUnfoldable) {
    return function ($44) {
        return Data_Array.toUnfoldable(dictUnfoldable)($foreign.toArrayWithKey(Data_Tuple.Tuple.create)($44));
    };
};
var toAscUnfoldable = function (dictUnfoldable) {
    return function ($45) {
        return Data_Array.toUnfoldable(dictUnfoldable)(Data_Array.sortWith(Data_Ord.ordString)(Data_Tuple.fst)($foreign.toArrayWithKey(Data_Tuple.Tuple.create)($45)));
    };
};
var toAscArray = toAscUnfoldable(Data_Unfoldable.unfoldableArray);
var toArray = $foreign.toArrayWithKey(Data_Tuple.Tuple.create);
var thawST = $foreign._copyEff;
var showStrMap = function (dictShow) {
    return new Data_Show.Show(function (m) {
        return "(fromFoldable " + (Data_Show.show(Data_Show.showArray(Data_Tuple.showTuple(Data_Show.showString)(dictShow)))(toArray(m)) + ")");
    });
};
var pureST = function (f) {
    return Control_Monad_Eff.runPure($foreign.runST(f));
};
var singleton = function (k) {
    return function (v) {
        return pureST(function __do() {
            var v1 = Data_StrMap_ST["new"]();
            return Data_StrMap_ST.poke(v1)(k)(v)();
        });
    };
};
var mutate = function (f) {
    return function (m) {
        return pureST(function __do() {
            var v = thawST(m)();
            var v1 = f(v)();
            return v;
        });
    };
};
var member = Data_Function_Uncurried.runFn4($foreign._lookup)(false)(Data_Function["const"](true));
var mapWithKey = function (f) {
    return function (m) {
        return $foreign._mapWithKey(m, f);
    };
};
var lookup = Data_Function_Uncurried.runFn4($foreign._lookup)(Data_Maybe.Nothing.value)(Data_Maybe.Just.create);
var isSubmap = function (dictEq) {
    return function (m1) {
        return function (m2) {
            var f = function (k) {
                return function (v) {
                    return $foreign._lookup(false, Data_Eq.eq(dictEq)(v), k, m2);
                };
            };
            return $foreign.all(f)(m1);
        };
    };
};
var isEmpty = $foreign.all(function (v) {
    return function (v1) {
        return false;
    };
});
var insert = function (k) {
    return function (v) {
        return mutate(function (s) {
            return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_StrMap_ST.poke(s)(k)(v));
        });
    };
};
var functorStrMap = new Data_Functor.Functor(function (f) {
    return function (m) {
        return $foreign._fmapStrMap(m, f);
    };
});
var fromFoldableWith = function (dictFoldable) {
    return function (f) {
        return function (l) {
            return pureST(function __do() {
                var v = Data_StrMap_ST["new"]();
                Data_Foldable.for_(Control_Monad_Eff.applicativeEff)(dictFoldable)(l)(function (v1) {
                    return Control_Bind.bind(Control_Monad_Eff.bindEff)($foreign._lookupST(v1.value1, f(v1.value1), v1.value0, v))(Data_StrMap_ST.poke(v)(v1.value0));
                })();
                return v;
            });
        };
    };
};
var fromFoldable = function (dictFoldable) {
    return function (l) {
        return pureST(function __do() {
            var v = Data_StrMap_ST["new"]();
            Control_Monad_Eff.foreachE(Data_Array.fromFoldable(dictFoldable)(l))(function (v1) {
                return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_StrMap_ST.poke(v)(v1.value0)(v1.value1));
            })();
            return v;
        });
    };
};
var freezeST = $foreign._copyEff;
var foldMaybe = function (f) {
    return function (z) {
        return function (m) {
            return $foreign._foldSCStrMap(m, z, f, Data_Maybe.fromMaybe);
        };
    };
};
var foldM = function (dictMonad) {
    return function (f) {
        return function (z) {
            return $foreign._foldM(Control_Bind.bind(dictMonad.Bind1()))(f)(Control_Applicative.pure(dictMonad.Applicative0())(z));
        };
    };
};
var semigroupStrMap = function (dictSemigroup) {
    return new Data_Semigroup.Semigroup(function (m1) {
        return function (m2) {
            return mutate(function (s1) {
                return Data_Functor["void"](Control_Monad_Eff.functorEff)(foldM(Control_Monad_Eff.monadEff)(function (s2) {
                    return function (k) {
                        return function (v2) {
                            return Data_StrMap_ST.poke(s2)(k)($foreign._lookup(v2, function (v1) {
                                return Data_Semigroup.append(dictSemigroup)(v1)(v2);
                            }, k, m2));
                        };
                    };
                })(s1)(m1));
            })(m2);
        };
    });
};
var monoidStrMap = function (dictSemigroup) {
    return new Data_Monoid.Monoid(function () {
        return semigroupStrMap(dictSemigroup);
    }, $foreign.empty);
};
var union = function (m) {
    return mutate(function (s) {
        return Data_Functor["void"](Control_Monad_Eff.functorEff)(foldM(Control_Monad_Eff.monadEff)(Data_StrMap_ST.poke)(s)(m));
    });
};
var unions = function (dictFoldable) {
    return Data_Foldable.foldl(dictFoldable)(union)($foreign.empty);
};
var fold = $foreign._foldM(Data_Function.applyFlipped);
var foldMap = function (dictMonoid) {
    return function (f) {
        return fold(function (acc) {
            return function (k) {
                return function (v) {
                    return Data_Semigroup.append(dictMonoid.Semigroup0())(acc)(f(k)(v));
                };
            };
        })(Data_Monoid.mempty(dictMonoid));
    };
};
var foldableStrMap = new Data_Foldable.Foldable(function (dictMonoid) {
    return function (f) {
        return foldMap(dictMonoid)(Data_Function["const"](f));
    };
}, function (f) {
    return fold(function (z) {
        return function (v) {
            return f(z);
        };
    });
}, function (f) {
    return function (z) {
        return function (m) {
            return Data_Foldable.foldr(Data_Foldable.foldableArray)(f)(z)(values(m));
        };
    };
});
var traversableStrMap = new Data_Traversable.Traversable(function () {
    return foldableStrMap;
}, function () {
    return functorStrMap;
}, function (dictApplicative) {
    return Data_Traversable.traverse(traversableStrMap)(dictApplicative)(Control_Category.id(Control_Category.categoryFn));
}, function (dictApplicative) {
    return function (f) {
        return function (ms) {
            return fold(function (acc) {
                return function (k) {
                    return function (v) {
                        return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map((dictApplicative.Apply0()).Functor0())(insert(k))(f(v)))(acc);
                    };
                };
            })(Control_Applicative.pure(dictApplicative)($foreign.empty))(ms);
        };
    };
});
var filterWithKey = function (predicate) {
    return function (m) {
        var go = (function () {
            var step = function (acc) {
                return function (k) {
                    return function (v) {
                        var $40 = predicate(k)(v);
                        if ($40) {
                            return Data_StrMap_ST.poke(acc)(k)(v);
                        };
                        return Control_Applicative.pure(Control_Monad_Eff.applicativeEff)(acc);
                    };
                };
            };
            return function __do() {
                var v = Data_StrMap_ST["new"]();
                return foldM(Control_Monad_Eff.monadEff)(step)(v)(m)();
            };
        })();
        return pureST(go);
    };
};
var filterKeys = function (predicate) {
    return filterWithKey(function ($46) {
        return Data_Function["const"](predicate($46));
    });
};
var filter = function (predicate) {
    return filterWithKey(Data_Function["const"](predicate));
};
var eqStrMap = function (dictEq) {
    return new Data_Eq.Eq(function (m1) {
        return function (m2) {
            return isSubmap(dictEq)(m1)(m2) && isSubmap(dictEq)(m2)(m1);
        };
    });
};
var ordStrMap = function (dictOrd) {
    return new Data_Ord.Ord(function () {
        return eqStrMap(dictOrd.Eq0());
    }, function (m1) {
        return function (m2) {
            return Data_Ord.compare(Data_Ord.ordArray(Data_Tuple.ordTuple(Data_Ord.ordString)(dictOrd)))(toAscArray(m1))(toAscArray(m2));
        };
    });
};
var eq1StrMap = new Data_Eq.Eq1(function (dictEq) {
    return Data_Eq.eq(eqStrMap(dictEq));
});
var $$delete = function (k) {
    return mutate(function (s) {
        return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_StrMap_ST["delete"](s)(k));
    });
};
var pop = function (k) {
    return function (m) {
        return Data_Functor.mapFlipped(Data_Maybe.functorMaybe)(lookup(k)(m))(function (a) {
            return new Data_Tuple.Tuple(a, $$delete(k)(m));
        });
    };
};
var alter = function (f) {
    return function (k) {
        return function (m) {
            var v = f(lookup(k)(m));
            if (v instanceof Data_Maybe.Nothing) {
                return $$delete(k)(m);
            };
            if (v instanceof Data_Maybe.Just) {
                return insert(k)(v.value0)(m);
            };
            throw new Error("Failed pattern match at Data.StrMap line 198, column 15 - line 200, column 25: " + [ v.constructor.name ]);
        };
    };
};
var update = function (f) {
    return function (k) {
        return function (m) {
            return alter(Data_Maybe.maybe(Data_Maybe.Nothing.value)(f))(k)(m);
        };
    };
};
module.exports = {
    alter: alter, 
    "delete": $$delete, 
    filter: filter, 
    filterKeys: filterKeys, 
    filterWithKey: filterWithKey, 
    fold: fold, 
    foldM: foldM, 
    foldMap: foldMap, 
    foldMaybe: foldMaybe, 
    freezeST: freezeST, 
    fromFoldable: fromFoldable, 
    fromFoldableWith: fromFoldableWith, 
    insert: insert, 
    isEmpty: isEmpty, 
    isSubmap: isSubmap, 
    lookup: lookup, 
    mapWithKey: mapWithKey, 
    member: member, 
    pop: pop, 
    pureST: pureST, 
    singleton: singleton, 
    thawST: thawST, 
    toAscUnfoldable: toAscUnfoldable, 
    toUnfoldable: toUnfoldable, 
    union: union, 
    unions: unions, 
    update: update, 
    values: values, 
    functorStrMap: functorStrMap, 
    foldableStrMap: foldableStrMap, 
    traversableStrMap: traversableStrMap, 
    eqStrMap: eqStrMap, 
    eq1StrMap: eq1StrMap, 
    ordStrMap: ordStrMap, 
    showStrMap: showStrMap, 
    semigroupStrMap: semigroupStrMap, 
    monoidStrMap: monoidStrMap, 
    all: $foreign.all, 
    empty: $foreign.empty, 
    keys: $foreign.keys, 
    runST: $foreign.runST, 
    size: $foreign.size, 
    toArrayWithKey: $foreign.toArrayWithKey
};
