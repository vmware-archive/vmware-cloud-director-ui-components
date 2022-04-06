(self["webpackChunkvmware_cloud_director_ui_components"] = self["webpackChunkvmware_cloud_director_ui_components"] || []).push([[429],{

/***/ 5416:
/*!************************************************!*\
  !*** ./node_modules/classlist.js/classList.js ***!
  \************************************************/
/***/ (function() {

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20150312
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in self) {

// Full polyfill for browsers with no classList support
// Including IE < Edge missing SVGElement.classList
if (!("classList" in document.createElement("_")) 
	|| document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

(function (view) {

"use strict";

if (!('Element' in view)) return;

var
	  classListProp = "classList"
	, protoProp = "prototype"
	, elemCtrProto = view.Element[protoProp]
	, objCtr = Object
	, strTrim = String[protoProp].trim || function () {
		return this.replace(/^\s+|\s+$/g, "");
	}
	, arrIndexOf = Array[protoProp].indexOf || function (item) {
		var
			  i = 0
			, len = this.length
		;
		for (; i < len; i++) {
			if (i in this && this[i] === item) {
				return i;
			}
		}
		return -1;
	}
	// Vendors: please allow content code to instantiate DOMExceptions
	, DOMEx = function (type, message) {
		this.name = type;
		this.code = DOMException[type];
		this.message = message;
	}
	, checkTokenAndGetIndex = function (classList, token) {
		if (token === "") {
			throw new DOMEx(
				  "SYNTAX_ERR"
				, "An invalid or illegal string was specified"
			);
		}
		if (/\s/.test(token)) {
			throw new DOMEx(
				  "INVALID_CHARACTER_ERR"
				, "String contains an invalid character"
			);
		}
		return arrIndexOf.call(classList, token);
	}
	, ClassList = function (elem) {
		var
			  trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
			, classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
			, i = 0
			, len = classes.length
		;
		for (; i < len; i++) {
			this.push(classes[i]);
		}
		this._updateClassName = function () {
			elem.setAttribute("class", this.toString());
		};
	}
	, classListProto = ClassList[protoProp] = []
	, classListGetter = function () {
		return new ClassList(this);
	}
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
	return this[i] || null;
};
classListProto.contains = function (token) {
	token += "";
	return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
	;
	do {
		token = tokens[i] + "";
		if (checkTokenAndGetIndex(this, token) === -1) {
			this.push(token);
			updated = true;
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.remove = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
		, index
	;
	do {
		token = tokens[i] + "";
		index = checkTokenAndGetIndex(this, token);
		while (index !== -1) {
			this.splice(index, 1);
			updated = true;
			index = checkTokenAndGetIndex(this, token);
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.toggle = function (token, force) {
	token += "";

	var
		  result = this.contains(token)
		, method = result ?
			force !== true && "remove"
		:
			force !== false && "add"
	;

	if (method) {
		this[method](token);
	}

	if (force === true || force === false) {
		return force;
	} else {
		return !result;
	}
};
classListProto.toString = function () {
	return this.join(" ");
};

if (objCtr.defineProperty) {
	var classListPropDesc = {
		  get: classListGetter
		, enumerable: true
		, configurable: true
	};
	try {
		objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	} catch (ex) { // IE 8 doesn't support enumerable:true
		if (ex.number === -0x7FF5EC54) {
			classListPropDesc.enumerable = false;
			objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
		}
	}
} else if (objCtr[protoProp].__defineGetter__) {
	elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

} else {
// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

(function () {
	"use strict";

	var testElement = document.createElement("_");

	testElement.classList.add("c1", "c2");

	// Polyfill for IE 10/11 and Firefox <26, where classList.add and
	// classList.remove exist but support only one argument at a time.
	if (!testElement.classList.contains("c2")) {
		var createMethod = function(method) {
			var original = DOMTokenList.prototype[method];

			DOMTokenList.prototype[method] = function(token) {
				var i, len = arguments.length;

				for (i = 0; i < len; i++) {
					token = arguments[i];
					original.call(this, token);
				}
			};
		};
		createMethod('add');
		createMethod('remove');
	}

	testElement.classList.toggle("c3", false);

	// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	// support the second argument.
	if (testElement.classList.contains("c3")) {
		var _toggle = DOMTokenList.prototype.toggle;

		DOMTokenList.prototype.toggle = function(token, force) {
			if (1 in arguments && !this.contains(token) === !force) {
				return force;
			} else {
				return _toggle.call(this, token);
			}
		};

	}

	testElement = null;
}());

}

}



/***/ }),

/***/ 40686:
/*!**********************************************!*\
  !*** ./node_modules/systemjs/dist/system.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*
 * SystemJS v0.20.19 Dev
 */
!function () {
  "use strict";

  function e(e) {
    return ut ? Symbol() : "@@" + e;
  }

  function t(e, t) {
    ot || (t = t.replace(at ? /file:\/\/\//g : /file:\/\//g, ""));
    var r,
        n = (e.message || e) + "\n  " + t;
    r = ft && e.fileName ? new Error(n, e.fileName, e.lineNumber) : new Error(n);
    var o = e.originalErr ? e.originalErr.stack : e.stack;
    return r.stack = it ? n + "\n  " + o : o, r.originalErr = e.originalErr || e, r;
  }

  function r(e, t) {
    throw new RangeError('Unable to resolve "' + e + '" to ' + t);
  }

  function n(e, t) {
    e = e.trim();
    var n = t && t.substr(0, t.indexOf(":") + 1),
        o = e[0],
        i = e[1];
    if ("/" === o && "/" === i) return n || r(e, t), n + e;

    if ("." === o && ("/" === i || "." === i && ("/" === e[2] || 2 === e.length && (e += "/")) || 1 === e.length && (e += "/")) || "/" === o) {
      var a,
          s = !n || "/" !== t[n.length];

      if (s ? (void 0 === t && r(e, t), a = t) : a = "/" === t[n.length + 1] ? "file:" !== n ? (a = t.substr(n.length + 2)).substr(a.indexOf("/") + 1) : t.substr(8) : t.substr(n.length + 1), "/" === o) {
        if (!s) return t.substr(0, t.length - a.length - 1) + e;
        r(e, t);
      }

      for (var u = a.substr(0, a.lastIndexOf("/") + 1) + e, l = [], c = -1, f = 0; f < u.length; f++) if (-1 === c) {
        if ("." !== u[f]) c = f;else {
          if ("." !== u[f + 1] || "/" !== u[f + 2] && f + 2 !== u.length) {
            if ("/" !== u[f + 1] && f + 1 !== u.length) {
              c = f;
              continue;
            }

            f += 1;
          } else l.pop(), f += 2;

          s && 0 === l.length && r(e, t);
        }
      } else "/" === u[f] && (l.push(u.substring(c, f + 1)), c = -1);

      return -1 !== c && l.push(u.substr(c)), t.substr(0, t.length - a.length) + l.join("");
    }

    return -1 !== e.indexOf(":") ? it && ":" === e[1] && "\\" === e[2] && e[0].match(/[a-z]/i) ? "file:///" + e.replace(/\\/g, "/") : e : void 0;
  }

  function o(e) {
    if (e.values) return e.values();
    if ("undefined" == typeof Symbol || !Symbol.iterator) throw new Error("Symbol.iterator not supported in this browser");
    var t = {};
    return t[Symbol.iterator] = function () {
      var t = Object.keys(e),
          r = 0;
      return {
        next: function () {
          return r < t.length ? {
            value: e[t[r++]],
            done: !1
          } : {
            value: void 0,
            done: !0
          };
        }
      };
    }, t;
  }

  function i() {
    this.registry = new u();
  }

  function a(e) {
    if (!(e instanceof l)) throw new TypeError("Module instantiation did not return a valid namespace object.");
    return e;
  }

  function s(e) {
    if (void 0 === e) throw new RangeError("No resolution found.");
    return e;
  }

  function u() {
    this[mt] = {};
  }

  function l(e) {
    Object.defineProperty(this, vt, {
      value: e
    }), Object.keys(e).forEach(c, this);
  }

  function c(e) {
    Object.defineProperty(this, e, {
      enumerable: !0,
      get: function () {
        return this[vt][e];
      }
    });
  }

  function f() {
    i.call(this);
    var e = this.registry.delete;

    this.registry.delete = function (r) {
      var n = e.call(this, r);
      return t.hasOwnProperty(r) && !t[r].linkRecord && (delete t[r], n = !0), n;
    };

    var t = {};
    this[yt] = {
      lastRegister: void 0,
      records: t
    }, this.trace = !1;
  }

  function d(e, t, r) {
    return e.records[t] = {
      key: t,
      registration: r,
      module: void 0,
      importerSetters: void 0,
      loadError: void 0,
      evalError: void 0,
      linkRecord: {
        instantiatePromise: void 0,
        dependencies: void 0,
        execute: void 0,
        executingRequire: !1,
        moduleObj: void 0,
        setters: void 0,
        depsInstantiatePromise: void 0,
        dependencyInstantiations: void 0
      }
    };
  }

  function p(e, t, r, n, o) {
    var i = n[t];
    if (i) return Promise.resolve(i);
    var a = o.records[t];
    return a && !a.module ? a.loadError ? Promise.reject(a.loadError) : h(e, a, a.linkRecord, n, o) : e.resolve(t, r).then(function (t) {
      if (i = n[t]) return i;
      if ((a = o.records[t]) && !a.module || (a = d(o, t, a && a.registration)), a.loadError) return Promise.reject(a.loadError);
      var r = a.linkRecord;
      return r ? h(e, a, r, n, o) : a;
    });
  }

  function g(e, t, r) {
    return function () {
      var e = r.lastRegister;
      return e ? (r.lastRegister = void 0, t.registration = e, !0) : !!t.registration;
    };
  }

  function h(e, r, n, o, i) {
    return n.instantiatePromise || (n.instantiatePromise = (r.registration ? Promise.resolve() : Promise.resolve().then(function () {
      return i.lastRegister = void 0, e[bt](r.key, e[bt].length > 1 && g(e, r, i));
    })).then(function (t) {
      if (void 0 !== t) {
        if (!(t instanceof l)) throw new TypeError("Instantiate did not return a valid Module object.");
        return delete i.records[r.key], e.trace && v(e, r, n), o[r.key] = t;
      }

      var a = r.registration;
      if (r.registration = void 0, !a) throw new TypeError("Module instantiation did not call an anonymous or correctly named System.register.");
      return n.dependencies = a[0], r.importerSetters = [], n.moduleObj = {}, a[2] ? (n.moduleObj.default = n.moduleObj.__useDefault = {}, n.executingRequire = a[1], n.execute = a[2]) : y(e, r, n, a[1]), r;
    }).catch(function (e) {
      throw r.linkRecord = void 0, r.loadError = r.loadError || t(e, "Instantiating " + r.key);
    }));
  }

  function m(e, t, r, n, o, i) {
    return e.resolve(t, r).then(function (r) {
      i && (i[t] = r);
      var a = o.records[r],
          s = n[r];
      if (s && (!a || a.module && s !== a.module)) return s;
      if (a && a.loadError) throw a.loadError;
      (!a || !s && a.module) && (a = d(o, r, a && a.registration));
      var u = a.linkRecord;
      return u ? h(e, a, u, n, o) : a;
    });
  }

  function v(e, t, r) {
    e.loads = e.loads || {}, e.loads[t.key] = {
      key: t.key,
      deps: r.dependencies,
      dynamicDeps: [],
      depMap: r.depMap || {}
    };
  }

  function y(e, t, r, n) {
    var o = r.moduleObj,
        i = t.importerSetters,
        a = !1,
        s = n.call(st, function (e, t) {
      if ("object" == typeof e) {
        var r = !1;

        for (var n in e) t = e[n], "__useDefault" === n || n in o && o[n] === t || (r = !0, o[n] = t);

        if (!1 === r) return t;
      } else {
        if ((a || e in o) && o[e] === t) return t;
        o[e] = t;
      }

      for (var s = 0; s < i.length; s++) i[s](o);

      return t;
    }, new x(e, t.key));
    r.setters = s.setters, r.execute = s.execute, s.exports && (r.moduleObj = o = s.exports, a = !0);
  }

  function b(e, r, n, o, i) {
    if (n.depsInstantiatePromise) return n.depsInstantiatePromise;

    for (var a = Array(n.dependencies.length), s = 0; s < n.dependencies.length; s++) a[s] = m(e, n.dependencies[s], r.key, o, i, e.trace && n.depMap || (n.depMap = {}));

    var u = Promise.all(a).then(function (e) {
      if (n.dependencyInstantiations = e, n.setters) for (var t = 0; t < e.length; t++) {
        var o = n.setters[t];

        if (o) {
          var i = e[t];
          if (i instanceof l) o(i);else {
            if (i.loadError) throw i.loadError;
            o(i.module || i.linkRecord.moduleObj), i.importerSetters && i.importerSetters.push(o);
          }
        }
      }
      return r;
    });
    return e.trace && (u = u.then(function () {
      return v(e, r, n), r;
    })), (u = u.catch(function (e) {
      throw n.depsInstantiatePromise = void 0, t(e, "Loading " + r.key);
    })).catch(function () {}), n.depsInstantiatePromise = u;
  }

  function w(e, t, r, n, o) {
    return new Promise(function (r, i) {
      function a(t) {
        var r = t.linkRecord;
        r && -1 === u.indexOf(t) && (u.push(t), c++, b(e, t, r, n, o).then(s, i));
      }

      function s(e) {
        c--;
        var t = e.linkRecord;
        if (t) for (var n = 0; n < t.dependencies.length; n++) {
          var o = t.dependencyInstantiations[n];
          o instanceof l || a(o);
        }
        0 === c && r();
      }

      var u = [],
          c = 0;
      a(t);
    });
  }

  function x(e, t) {
    this.loader = e, this.key = this.id = t, this.meta = {
      url: t
    };
  }

  function k(e, t, r, n, o, i) {
    if (t.module) return t.module;
    if (t.evalError) throw t.evalError;
    if (i && -1 !== i.indexOf(t)) return t.linkRecord.moduleObj;
    var a = O(e, t, r, n, o, r.setters ? [] : i || []);
    if (a) throw a;
    return t.module;
  }

  function E(e, t, r, n, o, i, a) {
    return function (s) {
      for (var u = 0; u < r.length; u++) if (r[u] === s) {
        var c,
            f = n[u];
        return c = f instanceof l ? f : k(e, f, f.linkRecord, o, i, a), "__useDefault" in c ? c.__useDefault : c;
      }

      throw new Error("Module " + s + " not declared as a System.registerDynamic dependency of " + t);
    };
  }

  function O(e, r, n, o, i, a) {
    a.push(r);
    var s;
    if (n.setters) for (var u, c, f = 0; f < n.dependencies.length; f++) if (!((u = n.dependencyInstantiations[f]) instanceof l) && ((c = u.linkRecord) && -1 === a.indexOf(u) && (s = u.evalError ? u.evalError : O(e, u, c, o, i, c.setters ? a : [])), s)) return r.linkRecord = void 0, r.evalError = t(s, "Evaluating " + r.key), r.evalError;
    if (n.execute) if (n.setters) s = S(n.execute);else {
      var d = {
        id: r.key
      },
          p = n.moduleObj;
      Object.defineProperty(d, "exports", {
        configurable: !0,
        set: function (e) {
          p.default = p.__useDefault = e;
        },
        get: function () {
          return p.__useDefault;
        }
      });
      var g = E(e, r.key, n.dependencies, n.dependencyInstantiations, o, i, a);
      if (!n.executingRequire) for (f = 0; f < n.dependencies.length; f++) g(n.dependencies[f]);
      s = j(n.execute, g, p.default, d), d.exports !== p.__useDefault && (p.default = p.__useDefault = d.exports);
      var h = p.default;
      if (h && h.__esModule) for (var m in h) Object.hasOwnProperty.call(h, m) && (p[m] = h[m]);
    }
    if (r.linkRecord = void 0, s) return r.evalError = t(s, "Evaluating " + r.key);

    if (o[r.key] = r.module = new l(n.moduleObj), !n.setters) {
      if (r.importerSetters) for (f = 0; f < r.importerSetters.length; f++) r.importerSetters[f](r.module);
      r.importerSetters = void 0;
    }
  }

  function S(e) {
    try {
      e.call(wt);
    } catch (e) {
      return e;
    }
  }

  function j(e, t, r, n) {
    try {
      var o = e.call(st, t, r, n);
      void 0 !== o && (n.exports = o);
    } catch (e) {
      return e;
    }
  }

  function _() {}

  function P(e) {
    return e instanceof l ? e : new l(e && e.__esModule ? e : {
      default: e,
      __useDefault: e
    });
  }

  function M(e) {
    return void 0 === xt && (xt = "undefined" != typeof Symbol && !!Symbol.toStringTag), e instanceof l || xt && "[object Module]" == Object.prototype.toString.call(e);
  }

  function R(e, t) {
    (t || this.warnings && "undefined" != typeof console && console.warn) && console.warn(e);
  }

  function C(e, t, r) {
    var n = new Uint8Array(t);
    return 0 === n[0] && 97 === n[1] && 115 === n[2] ? WebAssembly.compile(t).then(function (t) {
      var n = [],
          o = [],
          i = {};
      return WebAssembly.Module.imports && WebAssembly.Module.imports(t).forEach(function (e) {
        var t = e.module;
        o.push(function (e) {
          i[t] = e;
        }), -1 === n.indexOf(t) && n.push(t);
      }), e.register(n, function (e) {
        return {
          setters: o,
          execute: function () {
            e(new WebAssembly.Instance(t, i).exports);
          }
        };
      }), r(), !0;
    }) : Promise.resolve(!1);
  }

  function L(e, t) {
    if ("." === e[0]) throw new Error("Node module " + e + " can't be loaded as it is not a package require.");

    if (!kt) {
      var r = this._nodeRequire("module"),
          n = decodeURI(t.substr(at ? 8 : 7));

      (kt = new r(n)).paths = r._nodeModulePaths(n);
    }

    return kt.require(e);
  }

  function A(e, t) {
    for (var r in t) Object.hasOwnProperty.call(t, r) && (e[r] = t[r]);

    return e;
  }

  function I(e, t) {
    for (var r in t) Object.hasOwnProperty.call(t, r) && void 0 === e[r] && (e[r] = t[r]);

    return e;
  }

  function F(e, t, r) {
    for (var n in t) if (Object.hasOwnProperty.call(t, n)) {
      var o = t[n];
      void 0 === e[n] ? e[n] = o : o instanceof Array && e[n] instanceof Array ? e[n] = [].concat(r ? o : e[n]).concat(r ? e[n] : o) : "object" == typeof o && null !== o && "object" == typeof e[n] ? e[n] = (r ? I : A)(A({}, e[n]), o) : r || (e[n] = o);
    }
  }

  function K(e) {
    if (Pt || Mt) {
      var t = document.createElement("link");
      Pt ? (t.rel = "preload", t.as = "script") : t.rel = "prefetch", t.href = e, document.head.appendChild(t);
    } else new Image().src = e;
  }

  function D(e, t, r) {
    try {
      importScripts(e);
    } catch (e) {
      r(e);
    }

    t();
  }

  function U(e, t, r, n, o) {
    function i() {
      n(), s();
    }

    function a(t) {
      s(), o(new Error("Fetching " + e));
    }

    function s() {
      for (var e = 0; e < Rt.length; e++) if (Rt[e].err === a) {
        Rt.splice(e, 1);
        break;
      }

      u.removeEventListener("load", i, !1), u.removeEventListener("error", a, !1), document.head.removeChild(u);
    }

    if (e = e.replace(/#/g, "%23"), _t) return D(e, n, o);
    var u = document.createElement("script");
    u.type = "text/javascript", u.charset = "utf-8", u.async = !0, t && (u.crossOrigin = t), r && (u.integrity = r), u.addEventListener("load", i, !1), u.addEventListener("error", a, !1), u.src = e, document.head.appendChild(u);
  }

  function q(e, t) {
    for (var r = e.split("."); r.length;) t = t[r.shift()];

    return t;
  }

  function T(e, t, r) {
    var o = N(t, r);

    if (o) {
      var i = t[o] + r.substr(o.length),
          a = n(i, nt);
      return void 0 !== a ? a : e + i;
    }

    return -1 !== r.indexOf(":") ? r : e + r;
  }

  function z(e) {
    var t = this.name;

    if (t.substr(0, e.length) === e && (t.length === e.length || "/" === t[e.length] || "/" === e[e.length - 1] || ":" === e[e.length - 1])) {
      var r = e.split("/").length;
      r > this.len && (this.match = e, this.len = r);
    }
  }

  function N(e, t) {
    if (Object.hasOwnProperty.call(e, t)) return t;
    var r = {
      name: t,
      match: void 0,
      len: 0
    };
    return Object.keys(e).forEach(z, r), r.match;
  }

  function J(e, t, r, n) {
    if ("file:///" === e.substr(0, 8)) {
      if (Ft) return $(e, t, r, n);
      throw new Error("Unable to fetch file URLs in this environment.");
    }

    e = e.replace(/#/g, "%23");
    var o = {
      headers: {
        Accept: "application/x-es-module, */*"
      }
    };
    return r && (o.integrity = r), t && ("string" == typeof t && (o.headers.Authorization = t), o.credentials = "include"), fetch(e, o).then(function (e) {
      if (e.ok) return n ? e.arrayBuffer() : e.text();
      throw new Error("Fetch error: " + e.status + " " + e.statusText);
    });
  }

  function $(e, t, r, n) {
    return new Promise(function (r, o) {
      function i() {
        r(n ? s.response : s.responseText);
      }

      function a() {
        o(new Error("XHR error: " + (s.status ? " (" + s.status + (s.statusText ? " " + s.statusText : "") + ")" : "") + " loading " + e));
      }

      e = e.replace(/#/g, "%23");
      var s = new XMLHttpRequest();
      n && (s.responseType = "arraybuffer"), s.onreadystatechange = function () {
        4 === s.readyState && (0 == s.status ? s.response ? i() : (s.addEventListener("error", a), s.addEventListener("load", i)) : 200 === s.status ? i() : a());
      }, s.open("GET", e, !0), s.setRequestHeader && (s.setRequestHeader("Accept", "application/x-es-module, */*"), t && ("string" == typeof t && s.setRequestHeader("Authorization", t), s.withCredentials = !0)), s.send(null);
    });
  }

  function B(e, t, r, n) {
    return "file:///" != e.substr(0, 8) ? Promise.reject(new Error('Unable to fetch "' + e + '". Only file URLs of the form file:/// supported running in Node.')) : (Lt = Lt || __webpack_require__(/*! fs */ 79099), e = at ? e.replace(/\//g, "\\").substr(8) : e.substr(7), new Promise(function (t, r) {
      Lt.readFile(e, function (e, o) {
        if (e) return r(e);
        if (n) t(o);else {
          var i = o + "";
          "\ufeff" === i[0] && (i = i.substr(1)), t(i);
        }
      });
    }));
  }

  function W() {
    throw new Error("No fetch method is defined for this environment.");
  }

  function G() {
    return {
      pluginKey: void 0,
      pluginArgument: void 0,
      pluginModule: void 0,
      packageKey: void 0,
      packageConfig: void 0,
      load: void 0
    };
  }

  function H(e, t, r) {
    var n = G();

    if (r) {
      var o;
      t.pluginFirst ? -1 !== (o = r.lastIndexOf("!")) && (n.pluginArgument = n.pluginKey = r.substr(0, o)) : -1 !== (o = r.indexOf("!")) && (n.pluginArgument = n.pluginKey = r.substr(o + 1)), n.packageKey = N(t.packages, r), n.packageKey && (n.packageConfig = t.packages[n.packageKey]);
    }

    return n;
  }

  function Z(e, t) {
    var r = this[St],
        n = G(),
        o = H(this, r, t),
        i = this;
    return Promise.resolve().then(function () {
      var r = e.lastIndexOf("#?");
      if (-1 === r) return Promise.resolve(e);
      var n = he.call(i, e.substr(r + 2));
      return me.call(i, n, t, !0).then(function (t) {
        return t ? e.substr(0, r) : "@empty";
      });
    }).then(function (e) {
      var a = ne(r.pluginFirst, e);
      return a ? (n.pluginKey = a.plugin, Promise.all([ee.call(i, r, a.argument, o && o.pluginArgument || t, n, o, !0), i.resolve(a.plugin, t)]).then(function (e) {
        if (n.pluginArgument = e[0], n.pluginKey = e[1], n.pluginArgument === n.pluginKey) throw new Error("Plugin " + n.pluginArgument + " cannot load itself, make sure it is excluded from any wildcard meta configuration via a custom loader: false rule.");
        return oe(r.pluginFirst, e[0], e[1]);
      })) : ee.call(i, r, e, o && o.pluginArgument || t, n, o, !1);
    }).then(function (e) {
      return ve.call(i, e, t, o);
    }).then(function (e) {
      return re.call(i, r, e, n), n.pluginKey || !n.load.loader ? e : i.resolve(n.load.loader, e).then(function (t) {
        return n.pluginKey = t, n.pluginArgument = e, e;
      });
    }).then(function (e) {
      return i[jt][e] = n, e;
    });
  }

  function X(e, t) {
    var r = ne(e.pluginFirst, t);

    if (r) {
      var n = X.call(this, e, r.plugin);
      return oe(e.pluginFirst, Q.call(this, e, r.argument, void 0, !1, !1), n);
    }

    return Q.call(this, e, t, void 0, !1, !1);
  }

  function Y(e, t) {
    var r = this[St],
        n = G(),
        o = o || H(this, r, t),
        i = ne(r.pluginFirst, e);
    return i ? (n.pluginKey = Y.call(this, i.plugin, t), oe(r.pluginFirst, V.call(this, r, i.argument, o.pluginArgument || t, n, o, !!n.pluginKey), n.pluginKey)) : V.call(this, r, e, o.pluginArgument || t, n, o, !!n.pluginKey);
  }

  function Q(e, t, r, o, i) {
    var a = n(t, r || nt);
    if (a) return T(e.baseURL, e.paths, a);

    if (o) {
      var s = N(e.map, t);
      if (s && (t = e.map[s] + t.substr(s.length), a = n(t, nt))) return T(e.baseURL, e.paths, a);
    }

    if (this.registry.has(t)) return t;
    if ("@node/" === t.substr(0, 6)) return t;
    var u = i && "/" !== t[t.length - 1],
        l = T(e.baseURL, e.paths, u ? t + "/" : t);
    return u ? l.substr(0, l.length - 1) : l;
  }

  function V(e, t, r, n, o, i) {
    if (o && o.packageConfig && "." !== t[0]) {
      var a = o.packageConfig.map,
          s = a && N(a, t);

      if (s && "string" == typeof a[s]) {
        var u = ue(this, e, o.packageConfig, o.packageKey, s, t, n, i);
        if (u) return u;
      }
    }

    var l = Q.call(this, e, t, r, !0, !0),
        c = de(e, l);
    if (n.packageKey = c && c.packageKey || N(e.packages, l), !n.packageKey) return l;
    if (-1 !== e.packageConfigKeys.indexOf(l)) return n.packageKey = void 0, l;
    n.packageConfig = e.packages[n.packageKey] || (e.packages[n.packageKey] = Ee());
    var f = l.substr(n.packageKey.length + 1);
    return ae(this, e, n.packageConfig, n.packageKey, f, n, i);
  }

  function ee(e, t, r, n, o, i) {
    var a = this;
    return Et.then(function () {
      if (o && o.packageConfig && "./" !== t.substr(0, 2)) {
        var r = o.packageConfig.map,
            s = r && N(r, t);
        if (s) return ce(a, e, o.packageConfig, o.packageKey, s, t, n, i);
      }

      return Et;
    }).then(function (o) {
      if (o) return o;
      var s = Q.call(a, e, t, r, !0, !0),
          u = de(e, s);
      return n.packageKey = u && u.packageKey || N(e.packages, s), n.packageKey ? -1 !== e.packageConfigKeys.indexOf(s) ? (n.packageKey = void 0, n.load = te(), n.load.format = "json", n.load.loader = "", Promise.resolve(s)) : (n.packageConfig = e.packages[n.packageKey] || (e.packages[n.packageKey] = Ee()), (u && !n.packageConfig.configured ? pe(a, e, u.configPath, n) : Et).then(function () {
        var t = s.substr(n.packageKey.length + 1);
        return le(a, e, n.packageConfig, n.packageKey, t, n, i);
      })) : Promise.resolve(s);
    });
  }

  function te() {
    return {
      extension: "",
      deps: void 0,
      format: void 0,
      loader: void 0,
      scriptLoad: void 0,
      globals: void 0,
      nonce: void 0,
      integrity: void 0,
      sourceMap: void 0,
      exports: void 0,
      encapsulateGlobal: !1,
      crossOrigin: void 0,
      cjsRequireDetection: !0,
      cjsDeferDepsExecute: !1,
      esModule: !1
    };
  }

  function re(e, t, r) {
    r.load = r.load || te();
    var n,
        o = 0;

    for (var i in e.meta) if (-1 !== (n = i.indexOf("*")) && i.substr(0, n) === t.substr(0, n) && i.substr(n + 1) === t.substr(t.length - i.length + n + 1)) {
      var a = i.split("/").length;
      a > o && (o = a), F(r.load, e.meta[i], o !== a);
    }

    if (e.meta[t] && F(r.load, e.meta[t], !1), r.packageKey) {
      var s = t.substr(r.packageKey.length + 1),
          u = {};

      if (r.packageConfig.meta) {
        o = 0;
        ge(r.packageConfig.meta, s, function (e, t, r) {
          r > o && (o = r), F(u, t, r && o > r);
        }), F(r.load, u, !1);
      }

      !r.packageConfig.format || r.pluginKey || r.load.loader || (r.load.format = r.load.format || r.packageConfig.format);
    }
  }

  function ne(e, t) {
    var r,
        n,
        o = e ? t.indexOf("!") : t.lastIndexOf("!");
    if (-1 !== o) return e ? (r = t.substr(o + 1), n = t.substr(0, o)) : (r = t.substr(0, o), n = t.substr(o + 1) || r.substr(r.lastIndexOf(".") + 1)), {
      argument: r,
      plugin: n
    };
  }

  function oe(e, t, r) {
    return e ? r + "!" + t : t + "!" + r;
  }

  function ie(e, t, r, n, o) {
    if (!n || !t.defaultExtension || "/" === n[n.length - 1] || o) return n;
    var i = !1;
    if (t.meta && ge(t.meta, n, function (e, t, r) {
      if (0 === r || e.lastIndexOf("*") !== e.length - 1) return i = !0;
    }), !i && e.meta && ge(e.meta, r + "/" + n, function (e, t, r) {
      if (0 === r || e.lastIndexOf("*") !== e.length - 1) return i = !0;
    }), i) return n;
    var a = "." + t.defaultExtension;
    return n.substr(n.length - a.length) !== a ? n + a : n;
  }

  function ae(e, t, r, n, o, i, a) {
    if (!o) {
      if (!r.main) return n;
      o = "./" === r.main.substr(0, 2) ? r.main.substr(2) : r.main;
    }

    if (r.map) {
      var s = "./" + o,
          u = N(r.map, s);

      if (u || (s = "./" + ie(t, r, n, o, a)) !== "./" + o && (u = N(r.map, s)), u) {
        var l = ue(e, t, r, n, u, s, i, a);
        if (l) return l;
      }
    }

    return n + "/" + ie(t, r, n, o, a);
  }

  function se(e, t, r) {
    return !(t.substr(0, e.length) === e && r.length > e.length);
  }

  function ue(e, t, r, n, o, i, a, s) {
    "/" === i[i.length - 1] && (i = i.substr(0, i.length - 1));
    var u = r.map[o];
    if ("object" == typeof u) throw new Error("Synchronous conditional normalization not supported sync normalizing " + o + " in " + n);
    if (se(o, u, i) && "string" == typeof u) return V.call(e, t, u + i.substr(o.length), n + "/", a, a, s);
  }

  function le(e, t, r, n, o, i, a) {
    if (!o) {
      if (!r.main) return Promise.resolve(n);
      o = "./" === r.main.substr(0, 2) ? r.main.substr(2) : r.main;
    }

    var s, u;
    return r.map && (s = "./" + o, (u = N(r.map, s)) || (s = "./" + ie(t, r, n, o, a)) !== "./" + o && (u = N(r.map, s))), (u ? ce(e, t, r, n, u, s, i, a) : Et).then(function (e) {
      return e ? Promise.resolve(e) : Promise.resolve(n + "/" + ie(t, r, n, o, a));
    });
  }

  function ce(e, t, r, n, o, i, a, s) {
    "/" === i[i.length - 1] && (i = i.substr(0, i.length - 1));
    var u = r.map[o];
    if ("string" == typeof u) return se(o, u, i) ? ee.call(e, t, u + i.substr(o.length), n + "/", a, a, s).then(function (t) {
      return ve.call(e, t, n + "/", a);
    }) : Et;
    var l = [],
        c = [];

    for (var d in u) {
      var p = he(d);
      c.push({
        condition: p,
        map: u[d]
      }), l.push(f.prototype.import.call(e, p.module, n));
    }

    return Promise.all(l).then(function (e) {
      for (var t = 0; t < c.length; t++) {
        var r = c[t].condition,
            n = q(r.prop, "__useDefault" in e[t] ? e[t].__useDefault : e[t]);
        if (!r.negate && n || r.negate && !n) return c[t].map;
      }
    }).then(function (r) {
      if (r) return se(o, r, i) ? ee.call(e, t, r + i.substr(o.length), n + "/", a, a, s).then(function (t) {
        return ve.call(e, t, n + "/", a);
      }) : Et;
    });
  }

  function fe(e) {
    var t = e.lastIndexOf("*"),
        r = Math.max(t + 1, e.lastIndexOf("/"));
    return {
      length: r,
      regEx: new RegExp("^(" + e.substr(0, r).replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, "[^\\/]+") + ")(\\/|$)"),
      wildcard: -1 !== t
    };
  }

  function de(e, t) {
    for (var r, n, o = !1, i = 0; i < e.packageConfigPaths.length; i++) {
      var a = e.packageConfigPaths[i],
          s = Dt[a] || (Dt[a] = fe(a));

      if (!(t.length < s.length)) {
        var u = t.match(s.regEx);
        !u || r && (o && s.wildcard || !(r.length < u[1].length)) || (r = u[1], o = !s.wildcard, n = r + a.substr(s.length));
      }
    }

    if (r) return {
      packageKey: r,
      configPath: n
    };
  }

  function pe(e, r, n, o, i) {
    var a = e.pluginLoader || e;
    return -1 === r.packageConfigKeys.indexOf(n) && r.packageConfigKeys.push(n), a.import(n).then(function (e) {
      Oe(o.packageConfig, e, o.packageKey, !0, r), o.packageConfig.configured = !0;
    }).catch(function (e) {
      throw t(e, "Unable to fetch package configuration file " + n);
    });
  }

  function ge(e, t, r) {
    var n;

    for (var o in e) {
      var i = "./" === o.substr(0, 2) ? "./" : "";
      if (i && (o = o.substr(2)), -1 !== (n = o.indexOf("*")) && o.substr(0, n) === t.substr(0, n) && o.substr(n + 1) === t.substr(t.length - o.length + n + 1) && r(o, e[i + o], o.split("/").length)) return;
    }

    var a = e[t] && Object.hasOwnProperty.call(e, t) ? e[t] : e["./" + t];
    a && r(a, a, 0);
  }

  function he(e) {
    var t,
        r,
        n,
        o = e.lastIndexOf("|");
    return -1 !== o ? (t = e.substr(o + 1), r = e.substr(0, o), "~" === t[0] && (n = !0, t = t.substr(1))) : (n = "~" === e[0], t = "default", r = e.substr(n), -1 !== Ut.indexOf(r) && (t = r, r = null)), {
      module: r || "@system-env",
      prop: t,
      negate: n
    };
  }

  function me(e, t, r) {
    return f.prototype.import.call(this, e.module, t).then(function (t) {
      var n = q(e.prop, t);
      if (r && "boolean" != typeof n) throw new TypeError("Condition did not resolve to a boolean.");
      return e.negate ? !n : n;
    });
  }

  function ve(e, t, r) {
    var n = e.match(qt);
    if (!n) return Promise.resolve(e);
    var o = he.call(this, n[0].substr(2, n[0].length - 3));
    return me.call(this, o, t, !1).then(function (r) {
      if ("string" != typeof r) throw new TypeError("The condition value for " + e + " doesn't resolve to a string.");
      if (-1 !== r.indexOf("/")) throw new TypeError("Unabled to interpolate conditional " + e + (t ? " in " + t : "") + "\n\tThe condition value " + r + ' cannot contain a "/" separator.');
      return e.replace(qt, r);
    });
  }

  function ye(e, t, r) {
    for (var n = 0; n < Tt.length; n++) {
      var o = Tt[n];
      t[o] && Er[o.substr(0, o.length - 6)] && r(t[o]);
    }
  }

  function be(e, t) {
    var r = {};

    for (var n in e) {
      var o = e[n];
      t > 1 ? o instanceof Array ? r[n] = [].concat(o) : "object" == typeof o ? r[n] = be(o, t - 1) : "packageConfig" !== n && (r[n] = o) : r[n] = o;
    }

    return r;
  }

  function we(e, t) {
    var r = e[t];
    return r instanceof Array ? e[t].concat([]) : "object" == typeof r ? be(r, 3) : e[t];
  }

  function xe(e) {
    if (e) {
      if (-1 !== Or.indexOf(e)) return we(this[St], e);
      throw new Error('"' + e + '" is not a valid configuration name. Must be one of ' + Or.join(", ") + ".");
    }

    for (var t = {}, r = 0; r < Or.length; r++) {
      var n = Or[r],
          o = we(this[St], n);
      void 0 !== o && (t[n] = o);
    }

    return t;
  }

  function ke(e, t) {
    var r = this,
        o = this[St];

    if ("warnings" in e && (o.warnings = e.warnings), "wasm" in e && (o.wasm = "undefined" != typeof WebAssembly && e.wasm), ("production" in e || "build" in e) && tt.call(r, !!e.production, !!(e.build || Er && Er.build)), !t) {
      var i;
      ye(r, e, function (e) {
        i = i || e.baseURL;
      }), (i = i || e.baseURL) && (o.baseURL = n(i, nt) || n("./" + i, nt), "/" !== o.baseURL[o.baseURL.length - 1] && (o.baseURL += "/")), e.paths && A(o.paths, e.paths), ye(r, e, function (e) {
        e.paths && A(o.paths, e.paths);
      });

      for (var a in o.paths) -1 !== o.paths[a].indexOf("*") && (R.call(o, "Path config " + a + " -> " + o.paths[a] + " is no longer supported as wildcards are deprecated."), delete o.paths[a]);
    }

    if (e.defaultJSExtensions && R.call(o, "The defaultJSExtensions configuration option is deprecated.\n  Use packages defaultExtension instead.", !0), "boolean" == typeof e.pluginFirst && (o.pluginFirst = e.pluginFirst), e.map) for (var a in e.map) {
      var s = e.map[a];

      if ("string" == typeof s) {
        var u = Q.call(r, o, s, void 0, !1, !1);
        "/" === u[u.length - 1] && ":" !== a[a.length - 1] && "/" !== a[a.length - 1] && (u = u.substr(0, u.length - 1)), o.map[a] = u;
      } else {
        m = (m = Q.call(r, o, "/" !== a[a.length - 1] ? a + "/" : a, void 0, !0, !0)).substr(0, m.length - 1);
        var l = o.packages[m];
        l || ((l = o.packages[m] = Ee()).defaultExtension = ""), Oe(l, {
          map: s
        }, m, !1, o);
      }
    }

    if (e.packageConfigPaths) {
      for (var c = [], f = 0; f < e.packageConfigPaths.length; f++) {
        var d = e.packageConfigPaths[f],
            p = Math.max(d.lastIndexOf("*") + 1, d.lastIndexOf("/")),
            g = Q.call(r, o, d.substr(0, p), void 0, !1, !1);
        c[f] = g + d.substr(p);
      }

      o.packageConfigPaths = c;
    }

    if (e.bundles) for (var a in e.bundles) {
      for (var h = [], f = 0; f < e.bundles[a].length; f++) h.push(r.normalizeSync(e.bundles[a][f]));

      o.bundles[a] = h;
    }
    if (e.packages) for (var a in e.packages) {
      if (a.match(/^([^\/]+:)?\/\/$/)) throw new TypeError('"' + a + '" is not a valid package name.');
      var m = Q.call(r, o, "/" !== a[a.length - 1] ? a + "/" : a, void 0, !0, !0);
      m = m.substr(0, m.length - 1), Oe(o.packages[m] = o.packages[m] || Ee(), e.packages[a], m, !1, o);
    }
    if (e.depCache) for (var a in e.depCache) o.depCache[r.normalizeSync(a)] = [].concat(e.depCache[a]);
    if (e.meta) for (var a in e.meta) if ("*" === a[0]) A(o.meta[a] = o.meta[a] || {}, e.meta[a]);else {
      var v = Q.call(r, o, a, void 0, !0, !0);
      A(o.meta[v] = o.meta[v] || {}, e.meta[a]);
    }
    "transpiler" in e && (o.transpiler = e.transpiler);

    for (var y in e) -1 === Or.indexOf(y) && -1 === Tt.indexOf(y) && (r[y] = e[y]);

    ye(r, e, function (e) {
      r.config(e, !0);
    });
  }

  function Ee() {
    return {
      defaultExtension: void 0,
      main: void 0,
      format: void 0,
      meta: void 0,
      map: void 0,
      packageConfig: void 0,
      configured: !1
    };
  }

  function Oe(e, t, r, n, o) {
    for (var i in t) "main" === i || "format" === i || "defaultExtension" === i || "configured" === i ? n && void 0 !== e[i] || (e[i] = t[i]) : "map" === i ? (n ? I : A)(e.map = e.map || {}, t.map) : "meta" === i ? (n ? I : A)(e.meta = e.meta || {}, t.meta) : Object.hasOwnProperty.call(t, i) && R.call(o, '"' + i + '" is not a valid package configuration option in package ' + r);

    return void 0 === e.defaultExtension && (e.defaultExtension = "js"), void 0 === e.main && e.map && e.map["."] ? (e.main = e.map["."], delete e.map["."]) : "object" == typeof e.main && (e.map = e.map || {}, e.map["./@main"] = e.main, e.main.default = e.main.default || "./", e.main = "@main"), e;
  }

  function Se(e) {
    return zt ? Wt + new Buffer(e).toString("base64") : "undefined" != typeof btoa ? Wt + btoa(unescape(encodeURIComponent(e))) : "";
  }

  function je(e, t, r, n) {
    var o = e.lastIndexOf("\n");

    if (t) {
      if ("object" != typeof t) throw new TypeError("load.metadata.sourceMap must be set to an object.");
      t = JSON.stringify(t);
    }

    return (n ? "(function(System, SystemJS) {" : "") + e + (n ? "\n})(System, System);" : "") + ("\n//# sourceURL=" != e.substr(o, 15) ? "\n//# sourceURL=" + r + (t ? "!transpiled" : "") : "") + (t && Se(t) || "");
  }

  function _e(e, t, r, n, o) {
    Nt || (Nt = document.head || document.body || document.documentElement);
    var i = document.createElement("script");
    i.text = je(t, r, n, !1);
    var a,
        s = window.onerror;
    if (window.onerror = function (e) {
      a = addToError(e, "Evaluating " + n), s && s.apply(this, arguments);
    }, Pe(e), o && i.setAttribute("nonce", o), Nt.appendChild(i), Nt.removeChild(i), Me(), window.onerror = s, a) return a;
  }

  function Pe(e) {
    0 == Gt++ && (Bt = st.System), st.System = st.SystemJS = e;
  }

  function Me() {
    0 == --Gt && (st.System = st.SystemJS = Bt);
  }

  function Re(e, t, r, n, o, i, a) {
    if (t) {
      if (i && Ht) return _e(e, t, r, n, i);

      try {
        Pe(e), !Jt && e._nodeRequire && (Jt = e._nodeRequire("vm"), $t = Jt.runInThisContext("typeof System !== 'undefined' && System") === e), $t ? Jt.runInThisContext(je(t, r, n, !a), {
          filename: n + (r ? "!transpiled" : "")
        }) : (0, eval)(je(t, r, n, !a)), Me();
      } catch (e) {
        return Me(), e;
      }
    }
  }

  function Ce(e) {
    return "file:///" === e.substr(0, 8) ? e.substr(7 + !!at) : Zt && e.substr(0, Zt.length) === Zt ? e.substr(Zt.length) : e;
  }

  function Le(e, t) {
    return Ce(this.normalizeSync(e, t));
  }

  function Ae(e) {
    var t,
        r = e.lastIndexOf("!"),
        n = (t = -1 !== r ? e.substr(0, r) : e).split("/");
    return n.pop(), n = n.join("/"), {
      filename: Ce(t),
      dirname: Ce(n)
    };
  }

  function Ie(e) {
    function t(e, t) {
      for (var r = 0; r < e.length; r++) if (e[r][0] < t.index && e[r][1] > t.index) return !0;

      return !1;
    }

    It.lastIndex = tr.lastIndex = rr.lastIndex = 0;
    var r,
        n = [],
        o = [],
        i = [];

    if (e.length / e.split("\n").length < 200) {
      for (; r = rr.exec(e);) o.push([r.index, r.index + r[0].length]);

      for (; r = tr.exec(e);) t(o, r) || i.push([r.index + r[1].length, r.index + r[0].length - 1]);
    }

    for (; r = It.exec(e);) if (!t(o, r) && !t(i, r)) {
      var a = r[1].substr(1, r[1].length - 2);
      if (a.match(/"|'/)) continue;
      n.push(a);
    }

    return n;
  }

  function Fe(e) {
    if (-1 === nr.indexOf(e)) {
      try {
        var t = st[e];
      } catch (t) {
        nr.push(e);
      }

      this(e, t);
    }
  }

  function Ke(e) {
    if ("string" == typeof e) return q(e, st);
    if (!(e instanceof Array)) throw new Error("Global exports must be a string or array.");

    for (var t = {}, r = 0; r < e.length; r++) t[e[r].split(".").pop()] = q(e[r], st);

    return t;
  }

  function De(e, t, r, n) {
    var o = st.define;
    st.define = void 0;
    var i;

    if (r) {
      i = {};

      for (var a in r) i[a] = st[a], st[a] = r[a];
    }

    return t || (Yt = {}, Object.keys(st).forEach(Fe, function (e, t) {
      Yt[e] = t;
    })), function () {
      var e,
          r = t ? Ke(t) : {},
          a = !!t;
      if (t && !n || Object.keys(st).forEach(Fe, function (o, i) {
        Yt[o] !== i && void 0 !== i && (n && (st[o] = void 0), t || (r[o] = i, void 0 !== e ? a || e === i || (a = !0) : e = i));
      }), r = a ? r : e, i) for (var s in i) st[s] = i[s];
      return st.define = o, r;
    };
  }

  function Ue(e, t) {
    var r = ((e = e.replace(tr, "")).match(ar)[1].split(",")[t] || "require").replace(sr, ""),
        n = ur[r] || (ur[r] = new RegExp(or + r + ir, "g"));
    n.lastIndex = 0;

    for (var o, i = []; o = n.exec(e);) i.push(o[2] || o[3]);

    return i;
  }

  function qe(e) {
    return function (t, r, n) {
      e(t, r, n), "object" != typeof (r = n.exports) && "function" != typeof r || "__esModule" in r || Object.defineProperty(n.exports, "__esModule", {
        value: !0
      });
    };
  }

  function Te(e, t) {
    Vt = e, cr = t, Qt = void 0, lr = !1;
  }

  function ze(e) {
    Qt ? e.registerDynamic(Vt ? Qt[0].concat(Vt) : Qt[0], !1, cr ? qe(Qt[1]) : Qt[1]) : lr && e.registerDynamic([], !1, _);
  }

  function Ne(e, t) {
    !e.load.esModule || "object" != typeof t && "function" != typeof t || "__esModule" in t || Object.defineProperty(t, "__esModule", {
      value: !0
    });
  }

  function Je(e, t) {
    var r = this,
        n = this[St];
    return (Be(n, this, e) || Et).then(function () {
      if (!t()) {
        var o = r[jt][e];

        if ("@node/" === e.substr(0, 6)) {
          if (!r._nodeRequire) throw new TypeError("Error loading " + e + ". Can only load node core modules in Node.");
          return r.registerDynamic([], !1, function () {
            return L.call(r, e.substr(6), r.baseURL);
          }), void t();
        }

        return o.load.scriptLoad ? !o.load.pluginKey && fr || (o.load.scriptLoad = !1, R.call(n, 'scriptLoad not supported for "' + e + '"')) : !1 !== o.load.scriptLoad && !o.load.pluginKey && fr && (o.load.deps || o.load.globals || !("system" === o.load.format || "register" === o.load.format || "global" === o.load.format && o.load.exports) || (o.load.scriptLoad = !0)), o.load.scriptLoad ? new Promise(function (n, i) {
          if ("amd" === o.load.format && st.define !== r.amdDefine) throw new Error("Loading AMD with scriptLoad requires setting the global `" + pr + ".define = SystemJS.amdDefine`");
          U(e, o.load.crossOrigin, o.load.integrity, function () {
            if (!t()) {
              o.load.format = "global";
              var e = o.load.exports && Ke(o.load.exports);
              r.registerDynamic([], !1, function () {
                return Ne(o, e), e;
              }), t();
            }

            n();
          }, i);
        }) : $e(r, e, o).then(function () {
          return We(r, e, o, t, n.wasm);
        });
      }
    }).then(function (t) {
      return delete r[jt][e], t;
    });
  }

  function $e(e, t, r) {
    return r.pluginKey ? e.import(r.pluginKey).then(function (e) {
      r.pluginModule = e, r.pluginLoad = {
        name: t,
        address: r.pluginArgument,
        source: void 0,
        metadata: r.load
      }, r.load.deps = r.load.deps || [];
    }) : Et;
  }

  function Be(e, t, r) {
    var n = e.depCache[r];
    if (n) for (a = 0; a < n.length; a++) t.normalize(n[a], r).then(K);else {
      var o = !1;

      for (var i in e.bundles) {
        for (var a = 0; a < e.bundles[i].length; a++) {
          var s = e.bundles[i][a];

          if (s === r) {
            o = !0;
            break;
          }

          if (-1 !== s.indexOf("*")) {
            var u = s.split("*");

            if (2 !== u.length) {
              e.bundles[i].splice(a--, 1);
              continue;
            }

            if (r.substr(0, u[0].length) === u[0] && r.substr(r.length - u[1].length, u[1].length) === u[1]) {
              o = !0;
              break;
            }
          }
        }

        if (o) return t.import(i);
      }
    }
  }

  function We(e, t, r, n, o) {
    return r.load.exports && !r.load.format && (r.load.format = "global"), Et.then(function () {
      if (r.pluginModule && r.pluginModule.locate) return Promise.resolve(r.pluginModule.locate.call(e, r.pluginLoad)).then(function (e) {
        e && (r.pluginLoad.address = e);
      });
    }).then(function () {
      return r.pluginModule ? (o = !1, r.pluginModule.fetch ? r.pluginModule.fetch.call(e, r.pluginLoad, function (e) {
        return Kt(e.address, r.load.authorization, r.load.integrity, !1);
      }) : Kt(r.pluginLoad.address, r.load.authorization, r.load.integrity, !1)) : Kt(t, r.load.authorization, r.load.integrity, o);
    }).then(function (i) {
      return o && "string" != typeof i ? C(e, i, n).then(function (o) {
        if (!o) {
          var a = ot ? new TextDecoder("utf-8").decode(new Uint8Array(i)) : i.toString();
          return Ge(e, t, a, r, n);
        }
      }) : Ge(e, t, i, r, n);
    });
  }

  function Ge(e, t, r, n, o) {
    return Promise.resolve(r).then(function (t) {
      return "detect" === n.load.format && (n.load.format = void 0), Ve(t, n), n.pluginModule ? (n.pluginLoad.source = t, n.pluginModule.translate ? Promise.resolve(n.pluginModule.translate.call(e, n.pluginLoad, n.traceOpts)).then(function (e) {
        if (n.load.sourceMap) {
          if ("object" != typeof n.load.sourceMap) throw new Error("metadata.load.sourceMap must be set to an object.");
          Xe(n.pluginLoad.address, n.load.sourceMap);
        }

        return "string" == typeof e ? e : n.pluginLoad.source;
      }) : t) : t;
    }).then(function (r) {
      return n.load.format || '"bundle"' !== r.substring(0, 8) ? "register" === n.load.format || !n.load.format && He(r) ? (n.load.format = "register", r) : "esm" === n.load.format || !n.load.format && r.match(gr) ? (n.load.format = "esm", Ye(e, r, t, n, o)) : r : (n.load.format = "system", r);
    }).then(function (t) {
      if ("string" != typeof t || !n.pluginModule || !n.pluginModule.instantiate) return t;
      var r = !1;
      return n.pluginLoad.source = t, Promise.resolve(n.pluginModule.instantiate.call(e, n.pluginLoad, function (e) {
        if (t = e.source, n.load = e.metadata, r) throw new Error("Instantiate must only be called once.");
        r = !0;
      })).then(function (e) {
        return r ? t : P(e);
      });
    }).then(function (r) {
      if ("string" != typeof r) return r;
      n.load.format || (n.load.format = Ze(r));
      var i = !1;

      switch (n.load.format) {
        case "esm":
        case "register":
        case "system":
          if (u = Re(e, r, n.load.sourceMap, t, n.load.integrity, n.load.nonce, !1)) throw u;
          if (!o()) return Ot;
          return;

        case "json":
          var a = JSON.parse(r);
          return e.newModule({
            default: a,
            __useDefault: a
          });

        case "amd":
          var s = st.define;
          st.define = e.amdDefine, Te(n.load.deps, n.load.esModule);
          var u = Re(e, r, n.load.sourceMap, t, n.load.integrity, n.load.nonce, !1);
          if ((i = o()) || (ze(e), i = o()), st.define = s, u) throw u;
          break;

        case "cjs":
          var l = n.load.deps,
              c = (n.load.deps || []).concat(n.load.cjsRequireDetection ? Ie(r) : []);

          for (var f in n.load.globals) n.load.globals[f] && c.push(n.load.globals[f]);

          e.registerDynamic(c, !0, function (o, i, a) {
            if (o.resolve = function (t) {
              return Le.call(e, t, a.id);
            }, a.paths = [], a.require = o, !n.load.cjsDeferDepsExecute && l) for (var s = 0; s < l.length; s++) o(l[s]);
            var u = Ae(a.id),
                c = {
              exports: i,
              args: [o, i, a, u.filename, u.dirname, st, st]
            },
                f = "(function (require, exports, module, __filename, __dirname, global, GLOBAL";
            if (n.load.globals) for (var d in n.load.globals) c.args.push(o(n.load.globals[d])), f += ", " + d;
            var p = st.define;
            st.define = void 0, st.__cjsWrapper = c, r = f + ") {" + r.replace(yr, "") + "\n}).apply(__cjsWrapper.exports, __cjsWrapper.args);";
            var g = Re(e, r, n.load.sourceMap, t, n.load.integrity, n.load.nonce, !1);
            if (g) throw g;
            Ne(n, i), st.__cjsWrapper = void 0, st.define = p;
          }), i = o();
          break;

        case "global":
          c = n.load.deps || [];

          for (var f in n.load.globals) {
            var d = n.load.globals[f];
            d && c.push(d);
          }

          e.registerDynamic(c, !1, function (o, i, a) {
            var s;

            if (n.load.globals) {
              s = {};

              for (var u in n.load.globals) n.load.globals[u] && (s[u] = o(n.load.globals[u]));
            }

            var l = n.load.exports;
            l && (r += "\n" + pr + '["' + l + '"] = ' + l + ";");
            var c = De(a.id, l, s, n.load.encapsulateGlobal),
                f = Re(e, r, n.load.sourceMap, t, n.load.integrity, n.load.nonce, !0);
            if (f) throw f;
            var d = c();
            return Ne(n, d), d;
          }), i = o();
          break;

        default:
          throw new TypeError('Unknown module format "' + n.load.format + '" for "' + t + '".' + ("es6" === n.load.format ? ' Use "esm" instead here.' : ""));
      }

      if (!i) throw new Error("Module " + t + " detected as " + n.load.format + " but didn't execute correctly.");
    });
  }

  function He(e) {
    var t = e.match(hr);
    return t && "System.register" === e.substr(t[0].length, 15);
  }

  function Ze(e) {
    return e.match(mr) ? "amd" : (vr.lastIndex = 0, It.lastIndex = 0, It.exec(e) || vr.exec(e) ? "cjs" : "global");
  }

  function Xe(e, t) {
    var r = e.split("!")[0];
    t.file && t.file != e || (t.file = r + "!transpiled"), (!t.sources || t.sources.length <= 1 && (!t.sources[0] || t.sources[0] === e)) && (t.sources = [r]);
  }

  function Ye(e, r, n, o, i) {
    if (!e.transpiler) throw new TypeError("Unable to dynamically transpile ES module\n   A loader plugin needs to be configured via `SystemJS.config({ transpiler: 'transpiler-module' })`.");

    if (o.load.deps) {
      for (var a = "", s = 0; s < o.load.deps.length; s++) a += 'import "' + o.load.deps[s] + '"; ';

      r = a + r;
    }

    return e.import.call(e, e.transpiler).then(function (t) {
      if (!(t = t.__useDefault || t).translate) throw new Error(e.transpiler + " is not a valid transpiler plugin.");
      return t === o.pluginModule ? r : ("string" == typeof o.load.sourceMap && (o.load.sourceMap = JSON.parse(o.load.sourceMap)), o.pluginLoad = o.pluginLoad || {
        name: n,
        address: n,
        source: r,
        metadata: o.load
      }, o.load.deps = o.load.deps || [], Promise.resolve(t.translate.call(e, o.pluginLoad, o.traceOpts)).then(function (e) {
        var t = o.load.sourceMap;
        return t && "object" == typeof t && Xe(n, t), "esm" === o.load.format && He(e) && (o.load.format = "register"), e;
      }));
    }, function (e) {
      throw t(e, "Unable to load transpiler to transpile " + n);
    });
  }

  function Qe(e, t, r) {
    for (var n, o = t.split("."); o.length > 1;) e = e[n = o.shift()] = e[n] || {};

    void 0 === e[n = o.shift()] && (e[n] = r);
  }

  function Ve(e, t) {
    var r = e.match(br);
    if (r) for (var n = r[0].match(wr), o = 0; o < n.length; o++) {
      var i = n[o],
          a = i.length,
          s = i.substr(0, 1);

      if (";" == i.substr(a - 1, 1) && a--, '"' == s || "'" == s) {
        var u = i.substr(1, i.length - 3),
            l = u.substr(0, u.indexOf(" "));

        if (l) {
          var c = u.substr(l.length + 1, u.length - l.length - 1);
          "deps" === l && (l = "deps[]"), "[]" === l.substr(l.length - 2, 2) ? (l = l.substr(0, l.length - 2), t.load[l] = t.load[l] || [], t.load[l].push(c)) : "use" !== l && Qe(t.load, l, c);
        } else t.load[u] = !0;
      }
    }
  }

  function et() {
    f.call(this), this._loader = {}, this[jt] = {}, this[St] = {
      baseURL: nt,
      paths: {},
      packageConfigPaths: [],
      packageConfigKeys: [],
      map: {},
      packages: {},
      depCache: {},
      meta: {},
      bundles: {},
      production: !1,
      transpiler: void 0,
      loadedBundles: {},
      warnings: !1,
      pluginFirst: !1,
      wasm: !1
    }, this.scriptSrc = dr, this._nodeRequire = er, this.registry.set("@empty", Ot), tt.call(this, !1, !1), Xt(this);
  }

  function tt(e, t) {
    this[St].production = e, this.registry.set("@system-env", Er = this.newModule({
      browser: ot,
      node: !!this._nodeRequire,
      production: !t && e,
      dev: t || !e,
      build: t,
      default: !0
    }));
  }

  function rt(e, t) {
    R.call(e[St], "SystemJS." + t + " is deprecated for SystemJS.registry." + t);
  }

  var nt,
      ot = "undefined" != typeof window && "undefined" != typeof document,
      it = "undefined" != typeof process && process.versions && process.versions.node,
      at = "undefined" != typeof process && "string" == typeof process.platform && process.platform.match(/^win/),
      st = "undefined" != typeof self ? self : global,
      ut = "undefined" != typeof Symbol;

  if ("undefined" != typeof document && document.getElementsByTagName) {
    if (!(nt = document.baseURI)) {
      var lt = document.getElementsByTagName("base");
      nt = lt[0] && lt[0].href || window.location.href;
    }
  } else "undefined" != typeof location && (nt = location.href);

  if (nt) {
    var ct = (nt = nt.split("#")[0].split("?")[0]).lastIndexOf("/");
    -1 !== ct && (nt = nt.substr(0, ct + 1));
  } else {
    if ("undefined" == typeof process || !process.cwd) throw new TypeError("No environment baseURI");
    nt = "file://" + (at ? "/" : "") + process.cwd(), at && (nt = nt.replace(/\\/g, "/"));
  }

  "/" !== nt[nt.length - 1] && (nt += "/");
  var ft = "_" == new Error(0, "_").fileName,
      dt = Promise.resolve();
  i.prototype.constructor = i, i.prototype.import = function (e, r) {
    if ("string" != typeof e) throw new TypeError("Loader import method must be passed a module key string");
    var n = this;
    return dt.then(function () {
      return n[gt](e, r);
    }).then(a).catch(function (n) {
      throw t(n, "Loading " + e + (r ? " from " + r : ""));
    });
  };
  var pt = i.resolve = e("resolve"),
      gt = i.resolveInstantiate = e("resolveInstantiate");
  i.prototype[gt] = function (e, t) {
    var r = this;
    return r.resolve(e, t).then(function (e) {
      return r.registry.get(e);
    });
  }, i.prototype.resolve = function (e, r) {
    var n = this;
    return dt.then(function () {
      return n[pt](e, r);
    }).then(s).catch(function (n) {
      throw t(n, "Resolving " + e + (r ? " to " + r : ""));
    });
  };
  var ht = "undefined" != typeof Symbol && Symbol.iterator,
      mt = e("registry");
  ht && (u.prototype[Symbol.iterator] = function () {
    return this.entries()[Symbol.iterator]();
  }, u.prototype.entries = function () {
    var e = this[mt];
    return o(Object.keys(e).map(function (t) {
      return [t, e[t]];
    }));
  }), u.prototype.keys = function () {
    return o(Object.keys(this[mt]));
  }, u.prototype.values = function () {
    var e = this[mt];
    return o(Object.keys(e).map(function (t) {
      return e[t];
    }));
  }, u.prototype.get = function (e) {
    return this[mt][e];
  }, u.prototype.set = function (e, t) {
    if (!(t instanceof l)) throw new Error("Registry must be set with an instance of Module Namespace");
    return this[mt][e] = t, this;
  }, u.prototype.has = function (e) {
    return Object.hasOwnProperty.call(this[mt], e);
  }, u.prototype.delete = function (e) {
    return !!Object.hasOwnProperty.call(this[mt], e) && (delete this[mt][e], !0);
  };
  var vt = e("baseObject");
  l.prototype = Object.create(null), "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(l.prototype, Symbol.toStringTag, {
    value: "Module"
  });
  var yt = e("register-internal");
  f.prototype = Object.create(i.prototype), f.prototype.constructor = f;
  var bt = f.instantiate = e("instantiate");
  f.prototype[f.resolve = i.resolve] = function (e, t) {
    return n(e, t || nt);
  }, f.prototype[bt] = function (e, t) {}, f.prototype[i.resolveInstantiate] = function (e, t) {
    var r = this,
        n = this[yt],
        o = this.registry[mt];
    return p(r, e, t, o, n).then(function (e) {
      if (e instanceof l) return e;
      var t = e.linkRecord;

      if (!t) {
        if (e.module) return e.module;
        throw e.evalError;
      }

      return w(r, e, t, o, n).then(function () {
        return k(r, e, t, o, n, void 0);
      });
    });
  }, f.prototype.register = function (e, t, r) {
    var n = this[yt];
    void 0 === r ? n.lastRegister = [e, t, void 0] : (n.records[e] || d(n, e, void 0)).registration = [t, r, void 0];
  }, f.prototype.registerDynamic = function (e, t, r, n) {
    var o = this[yt];
    "string" != typeof e ? o.lastRegister = [e, t, r] : (o.records[e] || d(o, e, void 0)).registration = [t, r, n];
  }, x.prototype.import = function (e) {
    return this.loader.trace && this.loader.loads[this.key].dynamicDeps.push(e), this.loader.import(e, this.key);
  };
  var wt = {};
  Object.freeze && Object.freeze(wt);

  var xt,
      kt,
      Et = Promise.resolve(),
      Ot = new l({}),
      St = e("loader-config"),
      jt = e("metadata"),
      _t = "undefined" == typeof window && "undefined" != typeof self && "undefined" != typeof importScripts,
      Pt = !1,
      Mt = !1;

  if (ot && function () {
    var e = document.createElement("link").relList;

    if (e && e.supports) {
      Mt = !0;

      try {
        Pt = e.supports("preload");
      } catch (e) {}
    }
  }(), ot) {
    var Rt = [],
        Ct = window.onerror;

    window.onerror = function (e, t) {
      for (var r = 0; r < Rt.length; r++) if (Rt[r].src === t) return void Rt[r].err(e);

      Ct && Ct.apply(this, arguments);
    };
  }

  var Lt,
      At,
      It = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF."'])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`)\s*\)/g,
      Ft = "undefined" != typeof XMLHttpRequest,
      Kt = At = "undefined" != typeof self && void 0 !== self.fetch ? J : Ft ? $ :  true && "undefined" != typeof process ? B : W,
      Dt = {},
      Ut = ["browser", "node", "dev", "build", "production", "default"],
      qt = /#\{[^\}]+\}/,
      Tt = ["browserConfig", "nodeConfig", "devConfig", "buildConfig", "productionConfig"],
      zt = "undefined" != typeof Buffer;

  try {
    zt && "YQ==" !== new Buffer("a").toString("base64") && (zt = !1);
  } catch (e) {
    zt = !1;
  }

  var Nt,
      Jt,
      $t,
      Bt,
      Wt = "\n//# sourceMappingURL=data:application/json;base64,",
      Gt = 0,
      Ht = !1;
  ot && "undefined" != typeof document && document.getElementsByTagName && (window.chrome && window.chrome.extension || navigator.userAgent.match(/^Node\.js/) || (Ht = !0));

  var Zt,
      Xt = function (e) {
    function t(r, n, o, i) {
      if ("object" == typeof r && !(r instanceof Array)) return t.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));

      if ("string" == typeof r && "function" == typeof n && (r = [r]), !(r instanceof Array)) {
        if ("string" == typeof r) {
          var a = e.decanonicalize(r, i),
              s = e.get(a);
          if (!s) throw new Error('Module not already loaded loading "' + r + '" as ' + a + (i ? ' from "' + i + '".' : "."));
          return "__useDefault" in s ? s.__useDefault : s;
        }

        throw new TypeError("Invalid require");
      }

      for (var u = [], l = 0; l < r.length; l++) u.push(e.import(r[l], i));

      Promise.all(u).then(function (e) {
        n && n.apply(null, e);
      }, o);
    }

    function r(r, n, o) {
      function i(r, i, l) {
        for (var c = [], f = 0; f < n.length; f++) c.push(r(n[f]));

        if (l.uri = l.id, l.config = _, -1 !== u && c.splice(u, 0, l), -1 !== s && c.splice(s, 0, i), -1 !== a) {
          var d = function (n, o, i) {
            return "string" == typeof n && "function" != typeof o ? r(n) : t.call(e, n, o, i, l.id);
          };

          d.toUrl = function (t) {
            return e.normalizeSync(t, l.id);
          }, c.splice(a, 0, d);
        }

        var p = st.require;
        st.require = t;
        var g = o.apply(-1 === s ? st : i, c);
        st.require = p, void 0 !== g && (l.exports = g);
      }

      "string" != typeof r && (o = n, n = r, r = null), n instanceof Array || (o = n, n = ["require", "exports", "module"].splice(0, o.length)), "function" != typeof o && (o = function (e) {
        return function () {
          return e;
        };
      }(o)), r || Vt && (n = n.concat(Vt), Vt = void 0);
      var a, s, u;
      -1 !== (a = n.indexOf("require")) && (n.splice(a, 1), r || (n = n.concat(Ue(o.toString(), a)))), -1 !== (s = n.indexOf("exports")) && n.splice(s, 1), -1 !== (u = n.indexOf("module")) && n.splice(u, 1), r ? (e.registerDynamic(r, n, !1, i), Qt ? (Qt = void 0, lr = !0) : lr || (Qt = [n, i])) : e.registerDynamic(n, !1, cr ? qe(i) : i);
    }

    e.set("@@cjs-helpers", e.newModule({
      requireResolve: Le.bind(e),
      getPathVars: Ae
    })), e.set("@@global-helpers", e.newModule({
      prepareGlobal: De
    })), r.amd = {}, e.amdDefine = r, e.amdRequire = t;
  };

  "undefined" != typeof window && "undefined" != typeof document && window.location && (Zt = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : ""));
  var Yt,
      Qt,
      Vt,
      er,
      tr = /(^|[^\\])(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
      rr = /("[^"\\\n\r]*(\\.[^"\\\n\r]*)*"|'[^'\\\n\r]*(\\.[^'\\\n\r]*)*')/g,
      nr = ["_g", "sessionStorage", "localStorage", "clipboardData", "frames", "frameElement", "external", "mozAnimationStartTime", "webkitStorageInfo", "webkitIndexedDB", "mozInnerScreenY", "mozInnerScreenX"],
      or = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",
      ir = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",
      ar = /\(([^\)]*)\)/,
      sr = /^\s+|\s+$/g,
      ur = {},
      lr = !1,
      cr = !1,
      fr = (ot || _t) && "undefined" != typeof navigator && navigator.userAgent && !navigator.userAgent.match(/MSIE (9|10).0/);
   false || "undefined" == typeof process || process.browser || (er = undefined);
  var dr,
      pr = "undefined" != typeof self ? "self" : "global",
      gr = /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?(?!type)([^"'\(\)\n; ]+)\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s*(\{|default|function|class|var|const|let|async\s+function))/,
      hr = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/,
      mr = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])define\s*\(\s*("[^"]+"\s*,\s*|'[^']+'\s*,\s*)?\s*(\[(\s*(("[^"]+"|'[^']+')\s*,|\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*(\s*("[^"]+"|'[^']+')\s*,?)?(\s*(\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*\s*\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/,
      vr = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])(exports\s*(\[['"]|\.)|module(\.exports|\['exports'\]|\["exports"\])\s*(\[['"]|[=,\.]))/,
      yr = /^\#\!.*/,
      br = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/,
      wr = /\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;
  if ("undefined" == typeof Promise) throw new Error("SystemJS needs a Promise polyfill.");

  if ("undefined" != typeof document) {
    var xr = document.getElementsByTagName("script"),
        kr = xr[xr.length - 1];
    document.currentScript && (kr.defer || kr.async) && (kr = document.currentScript), dr = kr && kr.src;
  } else if ("undefined" != typeof importScripts) try {
    throw new Error("_");
  } catch (e) {
    e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/, function (e, t) {
      dr = t;
    });
  } else "undefined" != typeof __filename && (dr = __filename);

  var Er;
  et.prototype = Object.create(f.prototype), et.prototype.constructor = et, et.prototype[et.resolve = f.resolve] = et.prototype.normalize = Z, et.prototype.load = function (e, t) {
    return R.call(this[St], "System.load is deprecated."), this.import(e, t);
  }, et.prototype.decanonicalize = et.prototype.normalizeSync = et.prototype.resolveSync = Y, et.prototype[et.instantiate = f.instantiate] = Je, et.prototype.config = ke, et.prototype.getConfig = xe, et.prototype.global = st, et.prototype.import = function () {
    return f.prototype.import.apply(this, arguments).then(function (e) {
      return "__useDefault" in e ? e.__useDefault : e;
    });
  };

  for (var Or = ["baseURL", "map", "paths", "packages", "packageConfigPaths", "depCache", "meta", "bundles", "transpiler", "warnings", "pluginFirst", "production", "wasm"], Sr = "undefined" != typeof Proxy, jr = 0; jr < Or.length; jr++) !function (e) {
    Object.defineProperty(et.prototype, e, {
      get: function () {
        var t = we(this[St], e);
        return Sr && "object" == typeof t && (t = new Proxy(t, {
          set: function (t, r) {
            throw new Error("Cannot set SystemJS." + e + '["' + r + '"] directly. Use SystemJS.config({ ' + e + ': { "' + r + '": ... } }) rather.');
          }
        })), t;
      },
      set: function (t) {
        throw new Error("Setting `SystemJS." + e + "` directly is no longer supported. Use `SystemJS.config({ " + e + ": ... })`.");
      }
    });
  }(Or[jr]);

  et.prototype.delete = function (e) {
    return rt(this, "delete"), this.registry.delete(e);
  }, et.prototype.get = function (e) {
    return rt(this, "get"), this.registry.get(e);
  }, et.prototype.has = function (e) {
    return rt(this, "has"), this.registry.has(e);
  }, et.prototype.set = function (e, t) {
    return rt(this, "set"), this.registry.set(e, t);
  }, et.prototype.newModule = function (e) {
    return new l(e);
  }, et.prototype.isModule = M, et.prototype.register = function (e, t, r) {
    return "string" == typeof e && (e = X.call(this, this[St], e)), f.prototype.register.call(this, e, t, r);
  }, et.prototype.registerDynamic = function (e, t, r, n) {
    return "string" == typeof e && (e = X.call(this, this[St], e)), f.prototype.registerDynamic.call(this, e, t, r, n);
  }, et.prototype.version = "0.20.19 Dev";

  var _r = new et();

  (ot || _t) && (st.SystemJS = st.System = _r),  true && module.exports && (module.exports = _r);
}();

/***/ }),

/***/ 7277:
/*!***********************************************!*\
  !*** ./node_modules/zone.js/fesm2015/zone.js ***!
  \***********************************************/
/***/ (function() {

"use strict";

/**
 * @license Angular v12.0.0-next.0
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const Zone$1 = (function (global) {
    const performance = global['performance'];
    function mark(name) {
        performance && performance['mark'] && performance['mark'](name);
    }
    function performanceMeasure(name, label) {
        performance && performance['measure'] && performance['measure'](name, label);
    }
    mark('Zone');
    // Initialize before it's accessed below.
    // __Zone_symbol_prefix global can be used to override the default zone
    // symbol prefix with a custom one if needed.
    const symbolPrefix = global['__Zone_symbol_prefix'] || '__zone_symbol__';
    function __symbol__(name) {
        return symbolPrefix + name;
    }
    const checkDuplicate = global[__symbol__('forceDuplicateZoneCheck')] === true;
    if (global['Zone']) {
        // if global['Zone'] already exists (maybe zone.js was already loaded or
        // some other lib also registered a global object named Zone), we may need
        // to throw an error, but sometimes user may not want this error.
        // For example,
        // we have two web pages, page1 includes zone.js, page2 doesn't.
        // and the 1st time user load page1 and page2, everything work fine,
        // but when user load page2 again, error occurs because global['Zone'] already exists.
        // so we add a flag to let user choose whether to throw this error or not.
        // By default, if existing Zone is from zone.js, we will not throw the error.
        if (checkDuplicate || typeof global['Zone'].__symbol__ !== 'function') {
            throw new Error('Zone already loaded.');
        }
        else {
            return global['Zone'];
        }
    }
    class Zone {
        constructor(parent, zoneSpec) {
            this._parent = parent;
            this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
            this._properties = zoneSpec && zoneSpec.properties || {};
            this._zoneDelegate =
                new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
        }
        static assertZonePatched() {
            if (global['Promise'] !== patches['ZoneAwarePromise']) {
                throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
                    'has been overwritten.\n' +
                    'Most likely cause is that a Promise polyfill has been loaded ' +
                    'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
                    'If you must load one, do so before loading zone.js.)');
            }
        }
        static get root() {
            let zone = Zone.current;
            while (zone.parent) {
                zone = zone.parent;
            }
            return zone;
        }
        static get current() {
            return _currentZoneFrame.zone;
        }
        static get currentTask() {
            return _currentTask;
        }
        // tslint:disable-next-line:require-internal-with-underscore
        static __load_patch(name, fn, ignoreDuplicate = false) {
            if (patches.hasOwnProperty(name)) {
                // `checkDuplicate` option is defined from global variable
                // so it works for all modules.
                // `ignoreDuplicate` can work for the specified module
                if (!ignoreDuplicate && checkDuplicate) {
                    throw Error('Already loaded patch: ' + name);
                }
            }
            else if (!global['__Zone_disable_' + name]) {
                const perfName = 'Zone:' + name;
                mark(perfName);
                patches[name] = fn(global, Zone, _api);
                performanceMeasure(perfName, perfName);
            }
        }
        get parent() {
            return this._parent;
        }
        get name() {
            return this._name;
        }
        get(key) {
            const zone = this.getZoneWith(key);
            if (zone)
                return zone._properties[key];
        }
        getZoneWith(key) {
            let current = this;
            while (current) {
                if (current._properties.hasOwnProperty(key)) {
                    return current;
                }
                current = current._parent;
            }
            return null;
        }
        fork(zoneSpec) {
            if (!zoneSpec)
                throw new Error('ZoneSpec required!');
            return this._zoneDelegate.fork(this, zoneSpec);
        }
        wrap(callback, source) {
            if (typeof callback !== 'function') {
                throw new Error('Expecting function got: ' + callback);
            }
            const _callback = this._zoneDelegate.intercept(this, callback, source);
            const zone = this;
            return function () {
                return zone.runGuarded(_callback, this, arguments, source);
            };
        }
        run(callback, applyThis, applyArgs, source) {
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        }
        runGuarded(callback, applyThis = null, applyArgs, source) {
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        }
        runTask(task, applyThis, applyArgs) {
            if (task.zone != this) {
                throw new Error('A task can only be run in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            }
            // https://github.com/angular/zone.js/issues/778, sometimes eventTask
            // will run in notScheduled(canceled) state, we should not try to
            // run such kind of task but just return
            if (task.state === notScheduled && (task.type === eventTask || task.type === macroTask)) {
                return;
            }
            const reEntryGuard = task.state != running;
            reEntryGuard && task._transitionTo(running, scheduled);
            task.runCount++;
            const previousTask = _currentTask;
            _currentTask = task;
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                    task.cancelFn = undefined;
                }
                try {
                    return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                // if the task's state is notScheduled or unknown, then it has already been cancelled
                // we should not reset the state to scheduled
                if (task.state !== notScheduled && task.state !== unknown) {
                    if (task.type == eventTask || (task.data && task.data.isPeriodic)) {
                        reEntryGuard && task._transitionTo(scheduled, running);
                    }
                    else {
                        task.runCount = 0;
                        this._updateTaskCount(task, -1);
                        reEntryGuard &&
                            task._transitionTo(notScheduled, running, notScheduled);
                    }
                }
                _currentZoneFrame = _currentZoneFrame.parent;
                _currentTask = previousTask;
            }
        }
        scheduleTask(task) {
            if (task.zone && task.zone !== this) {
                // check if the task was rescheduled, the newZone
                // should not be the children of the original zone
                let newZone = this;
                while (newZone) {
                    if (newZone === task.zone) {
                        throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${task.zone.name}`);
                    }
                    newZone = newZone.parent;
                }
            }
            task._transitionTo(scheduling, notScheduled);
            const zoneDelegates = [];
            task._zoneDelegates = zoneDelegates;
            task._zone = this;
            try {
                task = this._zoneDelegate.scheduleTask(this, task);
            }
            catch (err) {
                // should set task's state to unknown when scheduleTask throw error
                // because the err may from reschedule, so the fromState maybe notScheduled
                task._transitionTo(unknown, scheduling, notScheduled);
                // TODO: @JiaLiPassion, should we check the result from handleError?
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            if (task._zoneDelegates === zoneDelegates) {
                // we have to check because internally the delegate can reschedule the task.
                this._updateTaskCount(task, 1);
            }
            if (task.state == scheduling) {
                task._transitionTo(scheduled, scheduling);
            }
            return task;
        }
        scheduleMicroTask(source, callback, data, customSchedule) {
            return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, undefined));
        }
        scheduleMacroTask(source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
        }
        scheduleEventTask(source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
        }
        cancelTask(task) {
            if (task.zone != this)
                throw new Error('A task can only be cancelled in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            task._transitionTo(canceling, scheduled, running);
            try {
                this._zoneDelegate.cancelTask(this, task);
            }
            catch (err) {
                // if error occurs when cancelTask, transit the state to unknown
                task._transitionTo(unknown, canceling);
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            this._updateTaskCount(task, -1);
            task._transitionTo(notScheduled, canceling);
            task.runCount = 0;
            return task;
        }
        _updateTaskCount(task, count) {
            const zoneDelegates = task._zoneDelegates;
            if (count == -1) {
                task._zoneDelegates = null;
            }
            for (let i = 0; i < zoneDelegates.length; i++) {
                zoneDelegates[i]._updateTaskCount(task.type, count);
            }
        }
    }
    // tslint:disable-next-line:require-internal-with-underscore
    Zone.__symbol__ = __symbol__;
    const DELEGATE_ZS = {
        name: '',
        onHasTask: (delegate, _, target, hasTaskState) => delegate.hasTask(target, hasTaskState),
        onScheduleTask: (delegate, _, target, task) => delegate.scheduleTask(target, task),
        onInvokeTask: (delegate, _, target, task, applyThis, applyArgs) => delegate.invokeTask(target, task, applyThis, applyArgs),
        onCancelTask: (delegate, _, target, task) => delegate.cancelTask(target, task)
    };
    class ZoneDelegate {
        constructor(zone, parentDelegate, zoneSpec) {
            this._taskCounts = { 'microTask': 0, 'macroTask': 0, 'eventTask': 0 };
            this.zone = zone;
            this._parentDelegate = parentDelegate;
            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
            this._forkCurrZone =
                zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate._forkCurrZone);
            this._interceptZS =
                zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
            this._interceptDlgt =
                zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
            this._interceptCurrZone =
                zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate._interceptCurrZone);
            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
            this._invokeDlgt =
                zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
            this._invokeCurrZone =
                zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate._invokeCurrZone);
            this._handleErrorZS =
                zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
            this._handleErrorDlgt =
                zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
            this._handleErrorCurrZone =
                zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate._handleErrorCurrZone);
            this._scheduleTaskZS =
                zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
            this._scheduleTaskDlgt = zoneSpec &&
                (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
            this._scheduleTaskCurrZone =
                zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate._scheduleTaskCurrZone);
            this._invokeTaskZS =
                zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
            this._invokeTaskDlgt =
                zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
            this._invokeTaskCurrZone =
                zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate._invokeTaskCurrZone);
            this._cancelTaskZS =
                zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
            this._cancelTaskDlgt =
                zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
            this._cancelTaskCurrZone =
                zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate._cancelTaskCurrZone);
            this._hasTaskZS = null;
            this._hasTaskDlgt = null;
            this._hasTaskDlgtOwner = null;
            this._hasTaskCurrZone = null;
            const zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
            const parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
            if (zoneSpecHasTask || parentHasTask) {
                // If we need to report hasTask, than this ZS needs to do ref counting on tasks. In such
                // a case all task related interceptors must go through this ZD. We can't short circuit it.
                this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
                this._hasTaskDlgt = parentDelegate;
                this._hasTaskDlgtOwner = this;
                this._hasTaskCurrZone = zone;
                if (!zoneSpec.onScheduleTask) {
                    this._scheduleTaskZS = DELEGATE_ZS;
                    this._scheduleTaskDlgt = parentDelegate;
                    this._scheduleTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onInvokeTask) {
                    this._invokeTaskZS = DELEGATE_ZS;
                    this._invokeTaskDlgt = parentDelegate;
                    this._invokeTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onCancelTask) {
                    this._cancelTaskZS = DELEGATE_ZS;
                    this._cancelTaskDlgt = parentDelegate;
                    this._cancelTaskCurrZone = this.zone;
                }
            }
        }
        fork(targetZone, zoneSpec) {
            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
                new Zone(targetZone, zoneSpec);
        }
        intercept(targetZone, callback, source) {
            return this._interceptZS ?
                this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) :
                callback;
        }
        invoke(targetZone, callback, applyThis, applyArgs, source) {
            return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) :
                callback.apply(applyThis, applyArgs);
        }
        handleError(targetZone, error) {
            return this._handleErrorZS ?
                this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) :
                true;
        }
        scheduleTask(targetZone, task) {
            let returnTask = task;
            if (this._scheduleTaskZS) {
                if (this._hasTaskZS) {
                    returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
                }
                // clang-format off
                returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
                // clang-format on
                if (!returnTask)
                    returnTask = task;
            }
            else {
                if (task.scheduleFn) {
                    task.scheduleFn(task);
                }
                else if (task.type == microTask) {
                    scheduleMicroTask(task);
                }
                else {
                    throw new Error('Task is missing scheduleFn.');
                }
            }
            return returnTask;
        }
        invokeTask(targetZone, task, applyThis, applyArgs) {
            return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) :
                task.callback.apply(applyThis, applyArgs);
        }
        cancelTask(targetZone, task) {
            let value;
            if (this._cancelTaskZS) {
                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
            }
            else {
                if (!task.cancelFn) {
                    throw Error('Task is not cancelable');
                }
                value = task.cancelFn(task);
            }
            return value;
        }
        hasTask(targetZone, isEmpty) {
            // hasTask should not throw error so other ZoneDelegate
            // can still trigger hasTask callback
            try {
                this._hasTaskZS &&
                    this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
            }
            catch (err) {
                this.handleError(targetZone, err);
            }
        }
        // tslint:disable-next-line:require-internal-with-underscore
        _updateTaskCount(type, count) {
            const counts = this._taskCounts;
            const prev = counts[type];
            const next = counts[type] = prev + count;
            if (next < 0) {
                throw new Error('More tasks executed then were scheduled.');
            }
            if (prev == 0 || next == 0) {
                const isEmpty = {
                    microTask: counts['microTask'] > 0,
                    macroTask: counts['macroTask'] > 0,
                    eventTask: counts['eventTask'] > 0,
                    change: type
                };
                this.hasTask(this.zone, isEmpty);
            }
        }
    }
    class ZoneTask {
        constructor(type, source, callback, options, scheduleFn, cancelFn) {
            // tslint:disable-next-line:require-internal-with-underscore
            this._zone = null;
            this.runCount = 0;
            // tslint:disable-next-line:require-internal-with-underscore
            this._zoneDelegates = null;
            // tslint:disable-next-line:require-internal-with-underscore
            this._state = 'notScheduled';
            this.type = type;
            this.source = source;
            this.data = options;
            this.scheduleFn = scheduleFn;
            this.cancelFn = cancelFn;
            if (!callback) {
                throw new Error('callback is not defined');
            }
            this.callback = callback;
            const self = this;
            // TODO: @JiaLiPassion options should have interface
            if (type === eventTask && options && options.useG) {
                this.invoke = ZoneTask.invokeTask;
            }
            else {
                this.invoke = function () {
                    return ZoneTask.invokeTask.call(global, self, this, arguments);
                };
            }
        }
        static invokeTask(task, target, args) {
            if (!task) {
                task = this;
            }
            _numberOfNestedTaskFrames++;
            try {
                task.runCount++;
                return task.zone.runTask(task, target, args);
            }
            finally {
                if (_numberOfNestedTaskFrames == 1) {
                    drainMicroTaskQueue();
                }
                _numberOfNestedTaskFrames--;
            }
        }
        get zone() {
            return this._zone;
        }
        get state() {
            return this._state;
        }
        cancelScheduleRequest() {
            this._transitionTo(notScheduled, scheduling);
        }
        // tslint:disable-next-line:require-internal-with-underscore
        _transitionTo(toState, fromState1, fromState2) {
            if (this._state === fromState1 || this._state === fromState2) {
                this._state = toState;
                if (toState == notScheduled) {
                    this._zoneDelegates = null;
                }
            }
            else {
                throw new Error(`${this.type} '${this.source}': can not transition to '${toState}', expecting state '${fromState1}'${fromState2 ? ' or \'' + fromState2 + '\'' : ''}, was '${this._state}'.`);
            }
        }
        toString() {
            if (this.data && typeof this.data.handleId !== 'undefined') {
                return this.data.handleId.toString();
            }
            else {
                return Object.prototype.toString.call(this);
            }
        }
        // add toJSON method to prevent cyclic error when
        // call JSON.stringify(zoneTask)
        toJSON() {
            return {
                type: this.type,
                state: this.state,
                source: this.source,
                zone: this.zone.name,
                runCount: this.runCount
            };
        }
    }
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  MICROTASK QUEUE
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    const symbolSetTimeout = __symbol__('setTimeout');
    const symbolPromise = __symbol__('Promise');
    const symbolThen = __symbol__('then');
    let _microTaskQueue = [];
    let _isDrainingMicrotaskQueue = false;
    let nativeMicroTaskQueuePromise;
    function scheduleMicroTask(task) {
        // if we are not running in any task, and there has not been anything scheduled
        // we must bootstrap the initial task creation by manually scheduling the drain
        if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
            // We are not running in Task, so we need to kickstart the microtask queue.
            if (!nativeMicroTaskQueuePromise) {
                if (global[symbolPromise]) {
                    nativeMicroTaskQueuePromise = global[symbolPromise].resolve(0);
                }
            }
            if (nativeMicroTaskQueuePromise) {
                let nativeThen = nativeMicroTaskQueuePromise[symbolThen];
                if (!nativeThen) {
                    // native Promise is not patchable, we need to use `then` directly
                    // issue 1078
                    nativeThen = nativeMicroTaskQueuePromise['then'];
                }
                nativeThen.call(nativeMicroTaskQueuePromise, drainMicroTaskQueue);
            }
            else {
                global[symbolSetTimeout](drainMicroTaskQueue, 0);
            }
        }
        task && _microTaskQueue.push(task);
    }
    function drainMicroTaskQueue() {
        if (!_isDrainingMicrotaskQueue) {
            _isDrainingMicrotaskQueue = true;
            while (_microTaskQueue.length) {
                const queue = _microTaskQueue;
                _microTaskQueue = [];
                for (let i = 0; i < queue.length; i++) {
                    const task = queue[i];
                    try {
                        task.zone.runTask(task, null, null);
                    }
                    catch (error) {
                        _api.onUnhandledError(error);
                    }
                }
            }
            _api.microtaskDrainDone();
            _isDrainingMicrotaskQueue = false;
        }
    }
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  BOOTSTRAP
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    const NO_ZONE = { name: 'NO ZONE' };
    const notScheduled = 'notScheduled', scheduling = 'scheduling', scheduled = 'scheduled', running = 'running', canceling = 'canceling', unknown = 'unknown';
    const microTask = 'microTask', macroTask = 'macroTask', eventTask = 'eventTask';
    const patches = {};
    const _api = {
        symbol: __symbol__,
        currentZoneFrame: () => _currentZoneFrame,
        onUnhandledError: noop,
        microtaskDrainDone: noop,
        scheduleMicroTask: scheduleMicroTask,
        showUncaughtError: () => !Zone[__symbol__('ignoreConsoleErrorUncaughtError')],
        patchEventTarget: () => [],
        patchOnProperties: noop,
        patchMethod: () => noop,
        bindArguments: () => [],
        patchThen: () => noop,
        patchMacroTask: () => noop,
        patchEventPrototype: () => noop,
        isIEOrEdge: () => false,
        getGlobalObjects: () => undefined,
        ObjectDefineProperty: () => noop,
        ObjectGetOwnPropertyDescriptor: () => undefined,
        ObjectCreate: () => undefined,
        ArraySlice: () => [],
        patchClass: () => noop,
        wrapWithCurrentZone: () => noop,
        filterProperties: () => [],
        attachOriginToPatched: () => noop,
        _redefineProperty: () => noop,
        patchCallbacks: () => noop
    };
    let _currentZoneFrame = { parent: null, zone: new Zone(null, null) };
    let _currentTask = null;
    let _numberOfNestedTaskFrames = 0;
    function noop() { }
    performanceMeasure('Zone', 'Zone');
    return global['Zone'] = Zone;
})(typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global);

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Suppress closure compiler errors about unknown 'Zone' variable
 * @fileoverview
 * @suppress {undefinedVars,globalThis,missingRequire}
 */
/// <reference types="node"/>
// issue #989, to reduce bundle size, use short name
/** Object.getOwnPropertyDescriptor */
const ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
/** Object.defineProperty */
const ObjectDefineProperty = Object.defineProperty;
/** Object.getPrototypeOf */
const ObjectGetPrototypeOf = Object.getPrototypeOf;
/** Object.create */
const ObjectCreate = Object.create;
/** Array.prototype.slice */
const ArraySlice = Array.prototype.slice;
/** addEventListener string const */
const ADD_EVENT_LISTENER_STR = 'addEventListener';
/** removeEventListener string const */
const REMOVE_EVENT_LISTENER_STR = 'removeEventListener';
/** zoneSymbol addEventListener */
const ZONE_SYMBOL_ADD_EVENT_LISTENER = Zone.__symbol__(ADD_EVENT_LISTENER_STR);
/** zoneSymbol removeEventListener */
const ZONE_SYMBOL_REMOVE_EVENT_LISTENER = Zone.__symbol__(REMOVE_EVENT_LISTENER_STR);
/** true string const */
const TRUE_STR = 'true';
/** false string const */
const FALSE_STR = 'false';
/** Zone symbol prefix string const. */
const ZONE_SYMBOL_PREFIX = Zone.__symbol__('');
function wrapWithCurrentZone(callback, source) {
    return Zone.current.wrap(callback, source);
}
function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
    return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
}
const zoneSymbol = Zone.__symbol__;
const isWindowExists = typeof window !== 'undefined';
const internalWindow = isWindowExists ? window : undefined;
const _global = isWindowExists && internalWindow || typeof self === 'object' && self || global;
const REMOVE_ATTRIBUTE = 'removeAttribute';
const NULL_ON_PROP_VALUE = [null];
function bindArguments(args, source) {
    for (let i = args.length - 1; i >= 0; i--) {
        if (typeof args[i] === 'function') {
            args[i] = wrapWithCurrentZone(args[i], source + '_' + i);
        }
    }
    return args;
}
function patchPrototype(prototype, fnNames) {
    const source = prototype.constructor['name'];
    for (let i = 0; i < fnNames.length; i++) {
        const name = fnNames[i];
        const delegate = prototype[name];
        if (delegate) {
            const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name);
            if (!isPropertyWritable(prototypeDesc)) {
                continue;
            }
            prototype[name] = ((delegate) => {
                const patched = function () {
                    return delegate.apply(this, bindArguments(arguments, source + '.' + name));
                };
                attachOriginToPatched(patched, delegate);
                return patched;
            })(delegate);
        }
    }
}
function isPropertyWritable(propertyDesc) {
    if (!propertyDesc) {
        return true;
    }
    if (propertyDesc.writable === false) {
        return false;
    }
    return !(typeof propertyDesc.get === 'function' && typeof propertyDesc.set === 'undefined');
}
const isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
// Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
// this code.
const isNode = (!('nw' in _global) && typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]');
const isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow['HTMLElement']);
// we are in electron of nw, so we are both browser and nodejs
// Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
// this code.
const isMix = typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]' && !isWebWorker &&
    !!(isWindowExists && internalWindow['HTMLElement']);
const zoneSymbolEventNames = {};
const wrapFn = function (event) {
    // https://github.com/angular/zone.js/issues/911, in IE, sometimes
    // event will be undefined, so we need to use window.event
    event = event || _global.event;
    if (!event) {
        return;
    }
    let eventNameSymbol = zoneSymbolEventNames[event.type];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[event.type] = zoneSymbol('ON_PROPERTY' + event.type);
    }
    const target = this || event.target || _global;
    const listener = target[eventNameSymbol];
    let result;
    if (isBrowser && target === internalWindow && event.type === 'error') {
        // window.onerror have different signiture
        // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#window.onerror
        // and onerror callback will prevent default when callback return true
        const errorEvent = event;
        result = listener &&
            listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error);
        if (result === true) {
            event.preventDefault();
        }
    }
    else {
        result = listener && listener.apply(this, arguments);
        if (result != undefined && !result) {
            event.preventDefault();
        }
    }
    return result;
};
function patchProperty(obj, prop, prototype) {
    let desc = ObjectGetOwnPropertyDescriptor(obj, prop);
    if (!desc && prototype) {
        // when patch window object, use prototype to check prop exist or not
        const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
        if (prototypeDesc) {
            desc = { enumerable: true, configurable: true };
        }
    }
    // if the descriptor not exists or is not configurable
    // just return
    if (!desc || !desc.configurable) {
        return;
    }
    const onPropPatchedSymbol = zoneSymbol('on' + prop + 'patched');
    if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
        return;
    }
    // A property descriptor cannot have getter/setter and be writable
    // deleting the writable and value properties avoids this error:
    //
    // TypeError: property descriptors must not specify a value or be writable when a
    // getter or setter has been specified
    delete desc.writable;
    delete desc.value;
    const originalDescGet = desc.get;
    const originalDescSet = desc.set;
    // substr(2) cuz 'onclick' -> 'click', etc
    const eventName = prop.substr(2);
    let eventNameSymbol = zoneSymbolEventNames[eventName];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[eventName] = zoneSymbol('ON_PROPERTY' + eventName);
    }
    desc.set = function (newValue) {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        let target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return;
        }
        let previousValue = target[eventNameSymbol];
        if (previousValue) {
            target.removeEventListener(eventName, wrapFn);
        }
        // issue #978, when onload handler was added before loading zone.js
        // we should remove it with originalDescSet
        if (originalDescSet) {
            originalDescSet.apply(target, NULL_ON_PROP_VALUE);
        }
        if (typeof newValue === 'function') {
            target[eventNameSymbol] = newValue;
            target.addEventListener(eventName, wrapFn, false);
        }
        else {
            target[eventNameSymbol] = null;
        }
    };
    // The getter would return undefined for unassigned properties but the default value of an
    // unassigned property is null
    desc.get = function () {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        let target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return null;
        }
        const listener = target[eventNameSymbol];
        if (listener) {
            return listener;
        }
        else if (originalDescGet) {
            // result will be null when use inline event attribute,
            // such as <button onclick="func();">OK</button>
            // because the onclick function is internal raw uncompiled handler
            // the onclick will be evaluated when first time event was triggered or
            // the property is accessed, https://github.com/angular/zone.js/issues/525
            // so we should use original native get to retrieve the handler
            let value = originalDescGet && originalDescGet.call(this);
            if (value) {
                desc.set.call(this, value);
                if (typeof target[REMOVE_ATTRIBUTE] === 'function') {
                    target.removeAttribute(prop);
                }
                return value;
            }
        }
        return null;
    };
    ObjectDefineProperty(obj, prop, desc);
    obj[onPropPatchedSymbol] = true;
}
function patchOnProperties(obj, properties, prototype) {
    if (properties) {
        for (let i = 0; i < properties.length; i++) {
            patchProperty(obj, 'on' + properties[i], prototype);
        }
    }
    else {
        const onProperties = [];
        for (const prop in obj) {
            if (prop.substr(0, 2) == 'on') {
                onProperties.push(prop);
            }
        }
        for (let j = 0; j < onProperties.length; j++) {
            patchProperty(obj, onProperties[j], prototype);
        }
    }
}
const originalInstanceKey = zoneSymbol('originalInstance');
// wrap some native API on `window`
function patchClass(className) {
    const OriginalClass = _global[className];
    if (!OriginalClass)
        return;
    // keep original class in global
    _global[zoneSymbol(className)] = OriginalClass;
    _global[className] = function () {
        const a = bindArguments(arguments, className);
        switch (a.length) {
            case 0:
                this[originalInstanceKey] = new OriginalClass();
                break;
            case 1:
                this[originalInstanceKey] = new OriginalClass(a[0]);
                break;
            case 2:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                break;
            case 3:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                break;
            case 4:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                break;
            default:
                throw new Error('Arg list too long.');
        }
    };
    // attach original delegate to patched function
    attachOriginToPatched(_global[className], OriginalClass);
    const instance = new OriginalClass(function () { });
    let prop;
    for (prop in instance) {
        // https://bugs.webkit.org/show_bug.cgi?id=44721
        if (className === 'XMLHttpRequest' && prop === 'responseBlob')
            continue;
        (function (prop) {
            if (typeof instance[prop] === 'function') {
                _global[className].prototype[prop] = function () {
                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                };
            }
            else {
                ObjectDefineProperty(_global[className].prototype, prop, {
                    set: function (fn) {
                        if (typeof fn === 'function') {
                            this[originalInstanceKey][prop] = wrapWithCurrentZone(fn, className + '.' + prop);
                            // keep callback in wrapped function so we can
                            // use it in Function.prototype.toString to return
                            // the native one.
                            attachOriginToPatched(this[originalInstanceKey][prop], fn);
                        }
                        else {
                            this[originalInstanceKey][prop] = fn;
                        }
                    },
                    get: function () {
                        return this[originalInstanceKey][prop];
                    }
                });
            }
        }(prop));
    }
    for (prop in OriginalClass) {
        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
            _global[className][prop] = OriginalClass[prop];
        }
    }
}
function patchMethod(target, name, patchFn) {
    let proto = target;
    while (proto && !proto.hasOwnProperty(name)) {
        proto = ObjectGetPrototypeOf(proto);
    }
    if (!proto && target[name]) {
        // somehow we did not find it, but we can see it. This happens on IE for Window properties.
        proto = target;
    }
    const delegateName = zoneSymbol(name);
    let delegate = null;
    if (proto && (!(delegate = proto[delegateName]) || !proto.hasOwnProperty(delegateName))) {
        delegate = proto[delegateName] = proto[name];
        // check whether proto[name] is writable
        // some property is readonly in safari, such as HtmlCanvasElement.prototype.toBlob
        const desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
        if (isPropertyWritable(desc)) {
            const patchDelegate = patchFn(delegate, delegateName, name);
            proto[name] = function () {
                return patchDelegate(this, arguments);
            };
            attachOriginToPatched(proto[name], delegate);
        }
    }
    return delegate;
}
// TODO: @JiaLiPassion, support cancel task later if necessary
function patchMacroTask(obj, funcName, metaCreator) {
    let setNative = null;
    function scheduleTask(task) {
        const data = task.data;
        data.args[data.cbIdx] = function () {
            task.invoke.apply(this, arguments);
        };
        setNative.apply(data.target, data.args);
        return task;
    }
    setNative = patchMethod(obj, funcName, (delegate) => function (self, args) {
        const meta = metaCreator(self, args);
        if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === 'function') {
            return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask);
        }
        else {
            // cause an error by calling it directly.
            return delegate.apply(self, args);
        }
    });
}
function attachOriginToPatched(patched, original) {
    patched[zoneSymbol('OriginalDelegate')] = original;
}
let isDetectedIEOrEdge = false;
let ieOrEdge = false;
function isIE() {
    try {
        const ua = internalWindow.navigator.userAgent;
        if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1) {
            return true;
        }
    }
    catch (error) {
    }
    return false;
}
function isIEOrEdge() {
    if (isDetectedIEOrEdge) {
        return ieOrEdge;
    }
    isDetectedIEOrEdge = true;
    try {
        const ua = internalWindow.navigator.userAgent;
        if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1 || ua.indexOf('Edge/') !== -1) {
            ieOrEdge = true;
        }
    }
    catch (error) {
    }
    return ieOrEdge;
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Zone.__load_patch('ZoneAwarePromise', (global, Zone, api) => {
    const ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    const ObjectDefineProperty = Object.defineProperty;
    function readableObjectToString(obj) {
        if (obj && obj.toString === Object.prototype.toString) {
            const className = obj.constructor && obj.constructor.name;
            return (className ? className : '') + ': ' + JSON.stringify(obj);
        }
        return obj ? obj.toString() : Object.prototype.toString.call(obj);
    }
    const __symbol__ = api.symbol;
    const _uncaughtPromiseErrors = [];
    const isDisableWrappingUncaughtPromiseRejection = global[__symbol__('DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION')] === true;
    const symbolPromise = __symbol__('Promise');
    const symbolThen = __symbol__('then');
    const creationTrace = '__creationTrace__';
    api.onUnhandledError = (e) => {
        if (api.showUncaughtError()) {
            const rejection = e && e.rejection;
            if (rejection) {
                console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
            }
            else {
                console.error(e);
            }
        }
    };
    api.microtaskDrainDone = () => {
        while (_uncaughtPromiseErrors.length) {
            const uncaughtPromiseError = _uncaughtPromiseErrors.shift();
            try {
                uncaughtPromiseError.zone.runGuarded(() => {
                    if (uncaughtPromiseError.throwOriginal) {
                        throw uncaughtPromiseError.rejection;
                    }
                    throw uncaughtPromiseError;
                });
            }
            catch (error) {
                handleUnhandledRejection(error);
            }
        }
    };
    const UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__('unhandledPromiseRejectionHandler');
    function handleUnhandledRejection(e) {
        api.onUnhandledError(e);
        try {
            const handler = Zone[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
            if (typeof handler === 'function') {
                handler.call(this, e);
            }
        }
        catch (err) {
        }
    }
    function isThenable(value) {
        return value && value.then;
    }
    function forwardResolution(value) {
        return value;
    }
    function forwardRejection(rejection) {
        return ZoneAwarePromise.reject(rejection);
    }
    const symbolState = __symbol__('state');
    const symbolValue = __symbol__('value');
    const symbolFinally = __symbol__('finally');
    const symbolParentPromiseValue = __symbol__('parentPromiseValue');
    const symbolParentPromiseState = __symbol__('parentPromiseState');
    const source = 'Promise.then';
    const UNRESOLVED = null;
    const RESOLVED = true;
    const REJECTED = false;
    const REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
        return (v) => {
            try {
                resolvePromise(promise, state, v);
            }
            catch (err) {
                resolvePromise(promise, false, err);
            }
            // Do not return value or you will break the Promise spec.
        };
    }
    const once = function () {
        let wasCalled = false;
        return function wrapper(wrappedFunction) {
            return function () {
                if (wasCalled) {
                    return;
                }
                wasCalled = true;
                wrappedFunction.apply(null, arguments);
            };
        };
    };
    const TYPE_ERROR = 'Promise resolved with itself';
    const CURRENT_TASK_TRACE_SYMBOL = __symbol__('currentTaskTrace');
    // Promise Resolution
    function resolvePromise(promise, state, value) {
        const onceWrapper = once();
        if (promise === value) {
            throw new TypeError(TYPE_ERROR);
        }
        if (promise[symbolState] === UNRESOLVED) {
            // should only get value.then once based on promise spec.
            let then = null;
            try {
                if (typeof value === 'object' || typeof value === 'function') {
                    then = value && value.then;
                }
            }
            catch (err) {
                onceWrapper(() => {
                    resolvePromise(promise, false, err);
                })();
                return promise;
            }
            // if (value instanceof ZoneAwarePromise) {
            if (state !== REJECTED && value instanceof ZoneAwarePromise &&
                value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) &&
                value[symbolState] !== UNRESOLVED) {
                clearRejectedNoCatch(value);
                resolvePromise(promise, value[symbolState], value[symbolValue]);
            }
            else if (state !== REJECTED && typeof then === 'function') {
                try {
                    then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
                }
                catch (err) {
                    onceWrapper(() => {
                        resolvePromise(promise, false, err);
                    })();
                }
            }
            else {
                promise[symbolState] = state;
                const queue = promise[symbolValue];
                promise[symbolValue] = value;
                if (promise[symbolFinally] === symbolFinally) {
                    // the promise is generated by Promise.prototype.finally
                    if (state === RESOLVED) {
                        // the state is resolved, should ignore the value
                        // and use parent promise value
                        promise[symbolState] = promise[symbolParentPromiseState];
                        promise[symbolValue] = promise[symbolParentPromiseValue];
                    }
                }
                // record task information in value when error occurs, so we can
                // do some additional work such as render longStackTrace
                if (state === REJECTED && value instanceof Error) {
                    // check if longStackTraceZone is here
                    const trace = Zone.currentTask && Zone.currentTask.data &&
                        Zone.currentTask.data[creationTrace];
                    if (trace) {
                        // only keep the long stack trace into error when in longStackTraceZone
                        ObjectDefineProperty(value, CURRENT_TASK_TRACE_SYMBOL, { configurable: true, enumerable: false, writable: true, value: trace });
                    }
                }
                for (let i = 0; i < queue.length;) {
                    scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                }
                if (queue.length == 0 && state == REJECTED) {
                    promise[symbolState] = REJECTED_NO_CATCH;
                    let uncaughtPromiseError = value;
                    try {
                        // Here we throws a new Error to print more readable error log
                        // and if the value is not an error, zone.js builds an `Error`
                        // Object here to attach the stack information.
                        throw new Error('Uncaught (in promise): ' + readableObjectToString(value) +
                            (value && value.stack ? '\n' + value.stack : ''));
                    }
                    catch (err) {
                        uncaughtPromiseError = err;
                    }
                    if (isDisableWrappingUncaughtPromiseRejection) {
                        // If disable wrapping uncaught promise reject
                        // use the value instead of wrapping it.
                        uncaughtPromiseError.throwOriginal = true;
                    }
                    uncaughtPromiseError.rejection = value;
                    uncaughtPromiseError.promise = promise;
                    uncaughtPromiseError.zone = Zone.current;
                    uncaughtPromiseError.task = Zone.currentTask;
                    _uncaughtPromiseErrors.push(uncaughtPromiseError);
                    api.scheduleMicroTask(); // to make sure that it is running
                }
            }
        }
        // Resolving an already resolved promise is a noop.
        return promise;
    }
    const REJECTION_HANDLED_HANDLER = __symbol__('rejectionHandledHandler');
    function clearRejectedNoCatch(promise) {
        if (promise[symbolState] === REJECTED_NO_CATCH) {
            // if the promise is rejected no catch status
            // and queue.length > 0, means there is a error handler
            // here to handle the rejected promise, we should trigger
            // windows.rejectionhandled eventHandler or nodejs rejectionHandled
            // eventHandler
            try {
                const handler = Zone[REJECTION_HANDLED_HANDLER];
                if (handler && typeof handler === 'function') {
                    handler.call(this, { rejection: promise[symbolValue], promise: promise });
                }
            }
            catch (err) {
            }
            promise[symbolState] = REJECTED;
            for (let i = 0; i < _uncaughtPromiseErrors.length; i++) {
                if (promise === _uncaughtPromiseErrors[i].promise) {
                    _uncaughtPromiseErrors.splice(i, 1);
                }
            }
        }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
        clearRejectedNoCatch(promise);
        const promiseState = promise[symbolState];
        const delegate = promiseState ?
            (typeof onFulfilled === 'function') ? onFulfilled : forwardResolution :
            (typeof onRejected === 'function') ? onRejected : forwardRejection;
        zone.scheduleMicroTask(source, () => {
            try {
                const parentPromiseValue = promise[symbolValue];
                const isFinallyPromise = !!chainPromise && symbolFinally === chainPromise[symbolFinally];
                if (isFinallyPromise) {
                    // if the promise is generated from finally call, keep parent promise's state and value
                    chainPromise[symbolParentPromiseValue] = parentPromiseValue;
                    chainPromise[symbolParentPromiseState] = promiseState;
                }
                // should not pass value to finally callback
                const value = zone.run(delegate, undefined, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ?
                    [] :
                    [parentPromiseValue]);
                resolvePromise(chainPromise, true, value);
            }
            catch (error) {
                // if error occurs, should always return this error
                resolvePromise(chainPromise, false, error);
            }
        }, chainPromise);
    }
    const ZONE_AWARE_PROMISE_TO_STRING = 'function ZoneAwarePromise() { [native code] }';
    const noop = function () { };
    class ZoneAwarePromise {
        static toString() {
            return ZONE_AWARE_PROMISE_TO_STRING;
        }
        static resolve(value) {
            return resolvePromise(new this(null), RESOLVED, value);
        }
        static reject(error) {
            return resolvePromise(new this(null), REJECTED, error);
        }
        static race(values) {
            let resolve;
            let reject;
            let promise = new this((res, rej) => {
                resolve = res;
                reject = rej;
            });
            function onResolve(value) {
                resolve(value);
            }
            function onReject(error) {
                reject(error);
            }
            for (let value of values) {
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then(onResolve, onReject);
            }
            return promise;
        }
        static all(values) {
            return ZoneAwarePromise.allWithCallback(values);
        }
        static allSettled(values) {
            const P = this && this.prototype instanceof ZoneAwarePromise ? this : ZoneAwarePromise;
            return P.allWithCallback(values, {
                thenCallback: (value) => ({ status: 'fulfilled', value }),
                errorCallback: (err) => ({ status: 'rejected', reason: err })
            });
        }
        static allWithCallback(values, callback) {
            let resolve;
            let reject;
            let promise = new this((res, rej) => {
                resolve = res;
                reject = rej;
            });
            // Start at 2 to prevent prematurely resolving if .then is called immediately.
            let unresolvedCount = 2;
            let valueIndex = 0;
            const resolvedValues = [];
            for (let value of values) {
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                const curValueIndex = valueIndex;
                try {
                    value.then((value) => {
                        resolvedValues[curValueIndex] = callback ? callback.thenCallback(value) : value;
                        unresolvedCount--;
                        if (unresolvedCount === 0) {
                            resolve(resolvedValues);
                        }
                    }, (err) => {
                        if (!callback) {
                            reject(err);
                        }
                        else {
                            resolvedValues[curValueIndex] = callback.errorCallback(err);
                            unresolvedCount--;
                            if (unresolvedCount === 0) {
                                resolve(resolvedValues);
                            }
                        }
                    });
                }
                catch (thenErr) {
                    reject(thenErr);
                }
                unresolvedCount++;
                valueIndex++;
            }
            // Make the unresolvedCount zero-based again.
            unresolvedCount -= 2;
            if (unresolvedCount === 0) {
                resolve(resolvedValues);
            }
            return promise;
        }
        constructor(executor) {
            const promise = this;
            if (!(promise instanceof ZoneAwarePromise)) {
                throw new Error('Must be an instanceof Promise.');
            }
            promise[symbolState] = UNRESOLVED;
            promise[symbolValue] = []; // queue;
            try {
                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
            }
            catch (error) {
                resolvePromise(promise, false, error);
            }
        }
        get [Symbol.toStringTag]() {
            return 'Promise';
        }
        get [Symbol.species]() {
            return ZoneAwarePromise;
        }
        then(onFulfilled, onRejected) {
            let C = this.constructor[Symbol.species];
            if (!C || typeof C !== 'function') {
                C = this.constructor || ZoneAwarePromise;
            }
            const chainPromise = new C(noop);
            const zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
            }
            return chainPromise;
        }
        catch(onRejected) {
            return this.then(null, onRejected);
        }
        finally(onFinally) {
            let C = this.constructor[Symbol.species];
            if (!C || typeof C !== 'function') {
                C = ZoneAwarePromise;
            }
            const chainPromise = new C(noop);
            chainPromise[symbolFinally] = symbolFinally;
            const zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
            }
            return chainPromise;
        }
    }
    // Protect against aggressive optimizers dropping seemingly unused properties.
    // E.g. Closure Compiler in advanced mode.
    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
    ZoneAwarePromise['race'] = ZoneAwarePromise.race;
    ZoneAwarePromise['all'] = ZoneAwarePromise.all;
    const NativePromise = global[symbolPromise] = global['Promise'];
    global['Promise'] = ZoneAwarePromise;
    const symbolThenPatched = __symbol__('thenPatched');
    function patchThen(Ctor) {
        const proto = Ctor.prototype;
        const prop = ObjectGetOwnPropertyDescriptor(proto, 'then');
        if (prop && (prop.writable === false || !prop.configurable)) {
            // check Ctor.prototype.then propertyDescriptor is writable or not
            // in meteor env, writable is false, we should ignore such case
            return;
        }
        const originalThen = proto.then;
        // Keep a reference to the original method.
        proto[symbolThen] = originalThen;
        Ctor.prototype.then = function (onResolve, onReject) {
            const wrapped = new ZoneAwarePromise((resolve, reject) => {
                originalThen.call(this, resolve, reject);
            });
            return wrapped.then(onResolve, onReject);
        };
        Ctor[symbolThenPatched] = true;
    }
    api.patchThen = patchThen;
    function zoneify(fn) {
        return function (self, args) {
            let resultPromise = fn.apply(self, args);
            if (resultPromise instanceof ZoneAwarePromise) {
                return resultPromise;
            }
            let ctor = resultPromise.constructor;
            if (!ctor[symbolThenPatched]) {
                patchThen(ctor);
            }
            return resultPromise;
        };
    }
    if (NativePromise) {
        patchThen(NativePromise);
        patchMethod(global, 'fetch', delegate => zoneify(delegate));
    }
    // This is not part of public API, but it is useful for tests, so we expose it.
    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
    return ZoneAwarePromise;
});

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// override Function.prototype.toString to make zone.js patched function
// look like native function
Zone.__load_patch('toString', (global) => {
    // patch Func.prototype.toString to let them look like native
    const originalFunctionToString = Function.prototype.toString;
    const ORIGINAL_DELEGATE_SYMBOL = zoneSymbol('OriginalDelegate');
    const PROMISE_SYMBOL = zoneSymbol('Promise');
    const ERROR_SYMBOL = zoneSymbol('Error');
    const newFunctionToString = function toString() {
        if (typeof this === 'function') {
            const originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
            if (originalDelegate) {
                if (typeof originalDelegate === 'function') {
                    return originalFunctionToString.call(originalDelegate);
                }
                else {
                    return Object.prototype.toString.call(originalDelegate);
                }
            }
            if (this === Promise) {
                const nativePromise = global[PROMISE_SYMBOL];
                if (nativePromise) {
                    return originalFunctionToString.call(nativePromise);
                }
            }
            if (this === Error) {
                const nativeError = global[ERROR_SYMBOL];
                if (nativeError) {
                    return originalFunctionToString.call(nativeError);
                }
            }
        }
        return originalFunctionToString.call(this);
    };
    newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
    Function.prototype.toString = newFunctionToString;
    // patch Object.prototype.toString to let them look like native
    const originalObjectToString = Object.prototype.toString;
    const PROMISE_OBJECT_TO_STRING = '[object Promise]';
    Object.prototype.toString = function () {
        if (typeof Promise === 'function' && this instanceof Promise) {
            return PROMISE_OBJECT_TO_STRING;
        }
        return originalObjectToString.call(this);
    };
});

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let passiveSupported = false;
if (typeof window !== 'undefined') {
    try {
        const options = Object.defineProperty({}, 'passive', {
            get: function () {
                passiveSupported = true;
            }
        });
        window.addEventListener('test', options, options);
        window.removeEventListener('test', options, options);
    }
    catch (err) {
        passiveSupported = false;
    }
}
// an identifier to tell ZoneTask do not create a new invoke closure
const OPTIMIZED_ZONE_EVENT_TASK_DATA = {
    useG: true
};
const zoneSymbolEventNames$1 = {};
const globalSources = {};
const EVENT_NAME_SYMBOL_REGX = new RegExp('^' + ZONE_SYMBOL_PREFIX + '(\\w+)(true|false)$');
const IMMEDIATE_PROPAGATION_SYMBOL = zoneSymbol('propagationStopped');
function prepareEventNames(eventName, eventNameToString) {
    const falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
    const trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
    const symbol = ZONE_SYMBOL_PREFIX + falseEventName;
    const symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
    zoneSymbolEventNames$1[eventName] = {};
    zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
    zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
}
function patchEventTarget(_global, apis, patchOptions) {
    const ADD_EVENT_LISTENER = (patchOptions && patchOptions.add) || ADD_EVENT_LISTENER_STR;
    const REMOVE_EVENT_LISTENER = (patchOptions && patchOptions.rm) || REMOVE_EVENT_LISTENER_STR;
    const LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.listeners) || 'eventListeners';
    const REMOVE_ALL_LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.rmAll) || 'removeAllListeners';
    const zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
    const ADD_EVENT_LISTENER_SOURCE = '.' + ADD_EVENT_LISTENER + ':';
    const PREPEND_EVENT_LISTENER = 'prependListener';
    const PREPEND_EVENT_LISTENER_SOURCE = '.' + PREPEND_EVENT_LISTENER + ':';
    const invokeTask = function (task, target, event) {
        // for better performance, check isRemoved which is set
        // by removeEventListener
        if (task.isRemoved) {
            return;
        }
        const delegate = task.callback;
        if (typeof delegate === 'object' && delegate.handleEvent) {
            // create the bind version of handleEvent when invoke
            task.callback = (event) => delegate.handleEvent(event);
            task.originalDelegate = delegate;
        }
        // invoke static task.invoke
        task.invoke(task, target, [event]);
        const options = task.options;
        if (options && typeof options === 'object' && options.once) {
            // if options.once is true, after invoke once remove listener here
            // only browser need to do this, nodejs eventEmitter will cal removeListener
            // inside EventEmitter.once
            const delegate = task.originalDelegate ? task.originalDelegate : task.callback;
            target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate, options);
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = false
    const globalZoneAwareCallback = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        const target = this || event.target || _global;
        const tasks = target[zoneSymbolEventNames$1[event.type][FALSE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                const copyTasks = tasks.slice();
                for (let i = 0; i < copyTasks.length; i++) {
                    if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                        break;
                    }
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = true
    const globalZoneAwareCaptureCallback = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        const target = this || event.target || _global;
        const tasks = target[zoneSymbolEventNames$1[event.type][TRUE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                const copyTasks = tasks.slice();
                for (let i = 0; i < copyTasks.length; i++) {
                    if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                        break;
                    }
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    function patchEventTargetMethods(obj, patchOptions) {
        if (!obj) {
            return false;
        }
        let useGlobalCallback = true;
        if (patchOptions && patchOptions.useG !== undefined) {
            useGlobalCallback = patchOptions.useG;
        }
        const validateHandler = patchOptions && patchOptions.vh;
        let checkDuplicate = true;
        if (patchOptions && patchOptions.chkDup !== undefined) {
            checkDuplicate = patchOptions.chkDup;
        }
        let returnTarget = false;
        if (patchOptions && patchOptions.rt !== undefined) {
            returnTarget = patchOptions.rt;
        }
        let proto = obj;
        while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
            proto = ObjectGetPrototypeOf(proto);
        }
        if (!proto && obj[ADD_EVENT_LISTENER]) {
            // somehow we did not find it, but we can see it. This happens on IE for Window properties.
            proto = obj;
        }
        if (!proto) {
            return false;
        }
        if (proto[zoneSymbolAddEventListener]) {
            return false;
        }
        const eventNameToString = patchOptions && patchOptions.eventNameToString;
        // a shared global taskData to pass data for scheduleEventTask
        // so we do not need to create a new object just for pass some data
        const taskData = {};
        const nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
        const nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] =
            proto[REMOVE_EVENT_LISTENER];
        const nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] =
            proto[LISTENERS_EVENT_LISTENER];
        const nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] =
            proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
        let nativePrependEventListener;
        if (patchOptions && patchOptions.prepend) {
            nativePrependEventListener = proto[zoneSymbol(patchOptions.prepend)] =
                proto[patchOptions.prepend];
        }
        /**
         * This util function will build an option object with passive option
         * to handle all possible input from the user.
         */
        function buildEventListenerOptions(options, passive) {
            if (!passiveSupported && typeof options === 'object' && options) {
                // doesn't support passive but user want to pass an object as options.
                // this will not work on some old browser, so we just pass a boolean
                // as useCapture parameter
                return !!options.capture;
            }
            if (!passiveSupported || !passive) {
                return options;
            }
            if (typeof options === 'boolean') {
                return { capture: options, passive: true };
            }
            if (!options) {
                return { passive: true };
            }
            if (typeof options === 'object' && options.passive !== false) {
                return Object.assign(Object.assign({}, options), { passive: true });
            }
            return options;
        }
        const customScheduleGlobal = function (task) {
            // if there is already a task for the eventName + capture,
            // just return, because we use the shared globalZoneAwareCallback here.
            if (taskData.isExisting) {
                return;
            }
            return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
        };
        const customCancelGlobal = function (task) {
            // if task is not marked as isRemoved, this call is directly
            // from Zone.prototype.cancelTask, we should remove the task
            // from tasksList of target first
            if (!task.isRemoved) {
                const symbolEventNames = zoneSymbolEventNames$1[task.eventName];
                let symbolEventName;
                if (symbolEventNames) {
                    symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
                }
                const existingTasks = symbolEventName && task.target[symbolEventName];
                if (existingTasks) {
                    for (let i = 0; i < existingTasks.length; i++) {
                        const existingTask = existingTasks[i];
                        if (existingTask === task) {
                            existingTasks.splice(i, 1);
                            // set isRemoved to data for faster invokeTask check
                            task.isRemoved = true;
                            if (existingTasks.length === 0) {
                                // all tasks for the eventName + capture have gone,
                                // remove globalZoneAwareCallback and remove the task cache from target
                                task.allRemoved = true;
                                task.target[symbolEventName] = null;
                            }
                            break;
                        }
                    }
                }
            }
            // if all tasks for the eventName + capture have gone,
            // we will really remove the global event callback,
            // if not, return
            if (!task.allRemoved) {
                return;
            }
            return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
        };
        const customScheduleNonGlobal = function (task) {
            return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        const customSchedulePrepend = function (task) {
            return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        const customCancelNonGlobal = function (task) {
            return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
        };
        const customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
        const customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
        const compareTaskCallbackVsDelegate = function (task, delegate) {
            const typeOfDelegate = typeof delegate;
            return (typeOfDelegate === 'function' && task.callback === delegate) ||
                (typeOfDelegate === 'object' && task.originalDelegate === delegate);
        };
        const compare = (patchOptions && patchOptions.diff) ? patchOptions.diff : compareTaskCallbackVsDelegate;
        const unpatchedEvents = Zone[zoneSymbol('UNPATCHED_EVENTS')];
        const passiveEvents = _global[zoneSymbol('PASSIVE_EVENTS')];
        const makeAddListener = function (nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget = false, prepend = false) {
            return function () {
                const target = this || _global;
                let eventName = arguments[0];
                if (patchOptions && patchOptions.transferEventName) {
                    eventName = patchOptions.transferEventName(eventName);
                }
                let delegate = arguments[1];
                if (!delegate) {
                    return nativeListener.apply(this, arguments);
                }
                if (isNode && eventName === 'uncaughtException') {
                    // don't patch uncaughtException of nodejs to prevent endless loop
                    return nativeListener.apply(this, arguments);
                }
                // don't create the bind delegate function for handleEvent
                // case here to improve addEventListener performance
                // we will create the bind delegate when invoke
                let isHandleEvent = false;
                if (typeof delegate !== 'function') {
                    if (!delegate.handleEvent) {
                        return nativeListener.apply(this, arguments);
                    }
                    isHandleEvent = true;
                }
                if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
                    return;
                }
                const passive = passiveSupported && !!passiveEvents && passiveEvents.indexOf(eventName) !== -1;
                const options = buildEventListenerOptions(arguments[2], passive);
                if (unpatchedEvents) {
                    // check upatched list
                    for (let i = 0; i < unpatchedEvents.length; i++) {
                        if (eventName === unpatchedEvents[i]) {
                            if (passive) {
                                return nativeListener.call(target, eventName, delegate, options);
                            }
                            else {
                                return nativeListener.apply(this, arguments);
                            }
                        }
                    }
                }
                const capture = !options ? false : typeof options === 'boolean' ? true : options.capture;
                const once = options && typeof options === 'object' ? options.once : false;
                const zone = Zone.current;
                let symbolEventNames = zoneSymbolEventNames$1[eventName];
                if (!symbolEventNames) {
                    prepareEventNames(eventName, eventNameToString);
                    symbolEventNames = zoneSymbolEventNames$1[eventName];
                }
                const symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
                let existingTasks = target[symbolEventName];
                let isExisting = false;
                if (existingTasks) {
                    // already have task registered
                    isExisting = true;
                    if (checkDuplicate) {
                        for (let i = 0; i < existingTasks.length; i++) {
                            if (compare(existingTasks[i], delegate)) {
                                // same callback, same capture, same event name, just return
                                return;
                            }
                        }
                    }
                }
                else {
                    existingTasks = target[symbolEventName] = [];
                }
                let source;
                const constructorName = target.constructor['name'];
                const targetSource = globalSources[constructorName];
                if (targetSource) {
                    source = targetSource[eventName];
                }
                if (!source) {
                    source = constructorName + addSource +
                        (eventNameToString ? eventNameToString(eventName) : eventName);
                }
                // do not create a new object as task.data to pass those things
                // just use the global shared one
                taskData.options = options;
                if (once) {
                    // if addEventListener with once options, we don't pass it to
                    // native addEventListener, instead we keep the once setting
                    // and handle ourselves.
                    taskData.options.once = false;
                }
                taskData.target = target;
                taskData.capture = capture;
                taskData.eventName = eventName;
                taskData.isExisting = isExisting;
                const data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : undefined;
                // keep taskData into data to allow onScheduleEventTask to access the task information
                if (data) {
                    data.taskData = taskData;
                }
                const task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
                // should clear taskData.target to avoid memory leak
                // issue, https://github.com/angular/angular/issues/20442
                taskData.target = null;
                // need to clear up taskData because it is a global object
                if (data) {
                    data.taskData = null;
                }
                // have to save those information to task in case
                // application may call task.zone.cancelTask() directly
                if (once) {
                    options.once = true;
                }
                if (!(!passiveSupported && typeof task.options === 'boolean')) {
                    // if not support passive, and we pass an option object
                    // to addEventListener, we should save the options to task
                    task.options = options;
                }
                task.target = target;
                task.capture = capture;
                task.eventName = eventName;
                if (isHandleEvent) {
                    // save original delegate for compare to check duplicate
                    task.originalDelegate = delegate;
                }
                if (!prepend) {
                    existingTasks.push(task);
                }
                else {
                    existingTasks.unshift(task);
                }
                if (returnTarget) {
                    return target;
                }
            };
        };
        proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
        if (nativePrependEventListener) {
            proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
        }
        proto[REMOVE_EVENT_LISTENER] = function () {
            const target = this || _global;
            let eventName = arguments[0];
            if (patchOptions && patchOptions.transferEventName) {
                eventName = patchOptions.transferEventName(eventName);
            }
            const options = arguments[2];
            const capture = !options ? false : typeof options === 'boolean' ? true : options.capture;
            const delegate = arguments[1];
            if (!delegate) {
                return nativeRemoveEventListener.apply(this, arguments);
            }
            if (validateHandler &&
                !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
                return;
            }
            const symbolEventNames = zoneSymbolEventNames$1[eventName];
            let symbolEventName;
            if (symbolEventNames) {
                symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
            }
            const existingTasks = symbolEventName && target[symbolEventName];
            if (existingTasks) {
                for (let i = 0; i < existingTasks.length; i++) {
                    const existingTask = existingTasks[i];
                    if (compare(existingTask, delegate)) {
                        existingTasks.splice(i, 1);
                        // set isRemoved to data for faster invokeTask check
                        existingTask.isRemoved = true;
                        if (existingTasks.length === 0) {
                            // all tasks for the eventName + capture have gone,
                            // remove globalZoneAwareCallback and remove the task cache from target
                            existingTask.allRemoved = true;
                            target[symbolEventName] = null;
                            // in the target, we have an event listener which is added by on_property
                            // such as target.onclick = function() {}, so we need to clear this internal
                            // property too if all delegates all removed
                            if (typeof eventName === 'string') {
                                const onPropertySymbol = ZONE_SYMBOL_PREFIX + 'ON_PROPERTY' + eventName;
                                target[onPropertySymbol] = null;
                            }
                        }
                        existingTask.zone.cancelTask(existingTask);
                        if (returnTarget) {
                            return target;
                        }
                        return;
                    }
                }
            }
            // issue 930, didn't find the event name or callback
            // from zone kept existingTasks, the callback maybe
            // added outside of zone, we need to call native removeEventListener
            // to try to remove it.
            return nativeRemoveEventListener.apply(this, arguments);
        };
        proto[LISTENERS_EVENT_LISTENER] = function () {
            const target = this || _global;
            let eventName = arguments[0];
            if (patchOptions && patchOptions.transferEventName) {
                eventName = patchOptions.transferEventName(eventName);
            }
            const listeners = [];
            const tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i];
                let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                listeners.push(delegate);
            }
            return listeners;
        };
        proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function () {
            const target = this || _global;
            let eventName = arguments[0];
            if (!eventName) {
                const keys = Object.keys(target);
                for (let i = 0; i < keys.length; i++) {
                    const prop = keys[i];
                    const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                    let evtName = match && match[1];
                    // in nodejs EventEmitter, removeListener event is
                    // used for monitoring the removeListener call,
                    // so just keep removeListener eventListener until
                    // all other eventListeners are removed
                    if (evtName && evtName !== 'removeListener') {
                        this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
                    }
                }
                // remove removeListener listener finally
                this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, 'removeListener');
            }
            else {
                if (patchOptions && patchOptions.transferEventName) {
                    eventName = patchOptions.transferEventName(eventName);
                }
                const symbolEventNames = zoneSymbolEventNames$1[eventName];
                if (symbolEventNames) {
                    const symbolEventName = symbolEventNames[FALSE_STR];
                    const symbolCaptureEventName = symbolEventNames[TRUE_STR];
                    const tasks = target[symbolEventName];
                    const captureTasks = target[symbolCaptureEventName];
                    if (tasks) {
                        const removeTasks = tasks.slice();
                        for (let i = 0; i < removeTasks.length; i++) {
                            const task = removeTasks[i];
                            let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                    if (captureTasks) {
                        const removeTasks = captureTasks.slice();
                        for (let i = 0; i < removeTasks.length; i++) {
                            const task = removeTasks[i];
                            let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                }
            }
            if (returnTarget) {
                return this;
            }
        };
        // for native toString patch
        attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
        attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
        if (nativeRemoveAllListeners) {
            attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
        }
        if (nativeListeners) {
            attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
        }
        return true;
    }
    let results = [];
    for (let i = 0; i < apis.length; i++) {
        results[i] = patchEventTargetMethods(apis[i], patchOptions);
    }
    return results;
}
function findEventTasks(target, eventName) {
    if (!eventName) {
        const foundTasks = [];
        for (let prop in target) {
            const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
            let evtName = match && match[1];
            if (evtName && (!eventName || evtName === eventName)) {
                const tasks = target[prop];
                if (tasks) {
                    for (let i = 0; i < tasks.length; i++) {
                        foundTasks.push(tasks[i]);
                    }
                }
            }
        }
        return foundTasks;
    }
    let symbolEventName = zoneSymbolEventNames$1[eventName];
    if (!symbolEventName) {
        prepareEventNames(eventName);
        symbolEventName = zoneSymbolEventNames$1[eventName];
    }
    const captureFalseTasks = target[symbolEventName[FALSE_STR]];
    const captureTrueTasks = target[symbolEventName[TRUE_STR]];
    if (!captureFalseTasks) {
        return captureTrueTasks ? captureTrueTasks.slice() : [];
    }
    else {
        return captureTrueTasks ? captureFalseTasks.concat(captureTrueTasks) :
            captureFalseTasks.slice();
    }
}
function patchEventPrototype(global, api) {
    const Event = global['Event'];
    if (Event && Event.prototype) {
        api.patchMethod(Event.prototype, 'stopImmediatePropagation', (delegate) => function (self, args) {
            self[IMMEDIATE_PROPAGATION_SYMBOL] = true;
            // we need to call the native stopImmediatePropagation
            // in case in some hybrid application, some part of
            // application will be controlled by zone, some are not
            delegate && delegate.apply(self, args);
        });
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function patchCallbacks(api, target, targetName, method, callbacks) {
    const symbol = Zone.__symbol__(method);
    if (target[symbol]) {
        return;
    }
    const nativeDelegate = target[symbol] = target[method];
    target[method] = function (name, opts, options) {
        if (opts && opts.prototype) {
            callbacks.forEach(function (callback) {
                const source = `${targetName}.${method}::` + callback;
                const prototype = opts.prototype;
                if (prototype.hasOwnProperty(callback)) {
                    const descriptor = api.ObjectGetOwnPropertyDescriptor(prototype, callback);
                    if (descriptor && descriptor.value) {
                        descriptor.value = api.wrapWithCurrentZone(descriptor.value, source);
                        api._redefineProperty(opts.prototype, callback, descriptor);
                    }
                    else if (prototype[callback]) {
                        prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
                    }
                }
                else if (prototype[callback]) {
                    prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
                }
            });
        }
        return nativeDelegate.call(target, name, opts, options);
    };
    api.attachOriginToPatched(target[method], nativeDelegate);
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const globalEventHandlersEventNames = [
    'abort',
    'animationcancel',
    'animationend',
    'animationiteration',
    'auxclick',
    'beforeinput',
    'blur',
    'cancel',
    'canplay',
    'canplaythrough',
    'change',
    'compositionstart',
    'compositionupdate',
    'compositionend',
    'cuechange',
    'click',
    'close',
    'contextmenu',
    'curechange',
    'dblclick',
    'drag',
    'dragend',
    'dragenter',
    'dragexit',
    'dragleave',
    'dragover',
    'drop',
    'durationchange',
    'emptied',
    'ended',
    'error',
    'focus',
    'focusin',
    'focusout',
    'gotpointercapture',
    'input',
    'invalid',
    'keydown',
    'keypress',
    'keyup',
    'load',
    'loadstart',
    'loadeddata',
    'loadedmetadata',
    'lostpointercapture',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'mousewheel',
    'orientationchange',
    'pause',
    'play',
    'playing',
    'pointercancel',
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointerlockchange',
    'mozpointerlockchange',
    'webkitpointerlockerchange',
    'pointerlockerror',
    'mozpointerlockerror',
    'webkitpointerlockerror',
    'pointermove',
    'pointout',
    'pointerover',
    'pointerup',
    'progress',
    'ratechange',
    'reset',
    'resize',
    'scroll',
    'seeked',
    'seeking',
    'select',
    'selectionchange',
    'selectstart',
    'show',
    'sort',
    'stalled',
    'submit',
    'suspend',
    'timeupdate',
    'volumechange',
    'touchcancel',
    'touchmove',
    'touchstart',
    'touchend',
    'transitioncancel',
    'transitionend',
    'waiting',
    'wheel'
];
const documentEventNames = [
    'afterscriptexecute', 'beforescriptexecute', 'DOMContentLoaded', 'freeze', 'fullscreenchange',
    'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'fullscreenerror',
    'mozfullscreenerror', 'webkitfullscreenerror', 'msfullscreenerror', 'readystatechange',
    'visibilitychange', 'resume'
];
const windowEventNames = [
    'absolutedeviceorientation',
    'afterinput',
    'afterprint',
    'appinstalled',
    'beforeinstallprompt',
    'beforeprint',
    'beforeunload',
    'devicelight',
    'devicemotion',
    'deviceorientation',
    'deviceorientationabsolute',
    'deviceproximity',
    'hashchange',
    'languagechange',
    'message',
    'mozbeforepaint',
    'offline',
    'online',
    'paint',
    'pageshow',
    'pagehide',
    'popstate',
    'rejectionhandled',
    'storage',
    'unhandledrejection',
    'unload',
    'userproximity',
    'vrdisplayconnected',
    'vrdisplaydisconnected',
    'vrdisplaypresentchange'
];
const htmlElementEventNames = [
    'beforecopy', 'beforecut', 'beforepaste', 'copy', 'cut', 'paste', 'dragstart', 'loadend',
    'animationstart', 'search', 'transitionrun', 'transitionstart', 'webkitanimationend',
    'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend'
];
const mediaElementEventNames = ['encrypted', 'waitingforkey', 'msneedkey', 'mozinterruptbegin', 'mozinterruptend'];
const ieElementEventNames = [
    'activate',
    'afterupdate',
    'ariarequest',
    'beforeactivate',
    'beforedeactivate',
    'beforeeditfocus',
    'beforeupdate',
    'cellchange',
    'controlselect',
    'dataavailable',
    'datasetchanged',
    'datasetcomplete',
    'errorupdate',
    'filterchange',
    'layoutcomplete',
    'losecapture',
    'move',
    'moveend',
    'movestart',
    'propertychange',
    'resizeend',
    'resizestart',
    'rowenter',
    'rowexit',
    'rowsdelete',
    'rowsinserted',
    'command',
    'compassneedscalibration',
    'deactivate',
    'help',
    'mscontentzoom',
    'msmanipulationstatechanged',
    'msgesturechange',
    'msgesturedoubletap',
    'msgestureend',
    'msgesturehold',
    'msgesturestart',
    'msgesturetap',
    'msgotpointercapture',
    'msinertiastart',
    'mslostpointercapture',
    'mspointercancel',
    'mspointerdown',
    'mspointerenter',
    'mspointerhover',
    'mspointerleave',
    'mspointermove',
    'mspointerout',
    'mspointerover',
    'mspointerup',
    'pointerout',
    'mssitemodejumplistitemremoved',
    'msthumbnailclick',
    'stop',
    'storagecommit'
];
const webglEventNames = ['webglcontextrestored', 'webglcontextlost', 'webglcontextcreationerror'];
const formEventNames = ['autocomplete', 'autocompleteerror'];
const detailEventNames = ['toggle'];
const frameEventNames = ['load'];
const frameSetEventNames = ['blur', 'error', 'focus', 'load', 'resize', 'scroll', 'messageerror'];
const marqueeEventNames = ['bounce', 'finish', 'start'];
const XMLHttpRequestEventNames = [
    'loadstart', 'progress', 'abort', 'error', 'load', 'progress', 'timeout', 'loadend',
    'readystatechange'
];
const IDBIndexEventNames = ['upgradeneeded', 'complete', 'abort', 'success', 'error', 'blocked', 'versionchange', 'close'];
const websocketEventNames = ['close', 'error', 'open', 'message'];
const workerEventNames = ['error', 'message'];
const eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
function filterProperties(target, onProperties, ignoreProperties) {
    if (!ignoreProperties || ignoreProperties.length === 0) {
        return onProperties;
    }
    const tip = ignoreProperties.filter(ip => ip.target === target);
    if (!tip || tip.length === 0) {
        return onProperties;
    }
    const targetIgnoreProperties = tip[0].ignoreProperties;
    return onProperties.filter(op => targetIgnoreProperties.indexOf(op) === -1);
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
    // check whether target is available, sometimes target will be undefined
    // because different browser or some 3rd party plugin.
    if (!target) {
        return;
    }
    const filteredProperties = filterProperties(target, onProperties, ignoreProperties);
    patchOnProperties(target, filteredProperties, prototype);
}
function propertyDescriptorPatch(api, _global) {
    if (isNode && !isMix) {
        return;
    }
    if (Zone[api.symbol('patchEvents')]) {
        // events are already been patched by legacy patch.
        return;
    }
    const supportsWebSocket = typeof WebSocket !== 'undefined';
    const ignoreProperties = _global['__Zone_ignore_on_properties'];
    // for browsers that we can patch the descriptor:  Chrome & Firefox
    if (isBrowser) {
        const internalWindow = window;
        const ignoreErrorProperties = isIE() ? [{ target: internalWindow, ignoreProperties: ['error'] }] : [];
        // in IE/Edge, onProp not exist in window object, but in WindowPrototype
        // so we need to pass WindowPrototype to check onProp exist or not
        patchFilteredProperties(internalWindow, eventNames.concat(['messageerror']), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, ObjectGetPrototypeOf(internalWindow));
        patchFilteredProperties(Document.prototype, eventNames, ignoreProperties);
        if (typeof internalWindow['SVGElement'] !== 'undefined') {
            patchFilteredProperties(internalWindow['SVGElement'].prototype, eventNames, ignoreProperties);
        }
        patchFilteredProperties(Element.prototype, eventNames, ignoreProperties);
        patchFilteredProperties(HTMLElement.prototype, eventNames, ignoreProperties);
        patchFilteredProperties(HTMLMediaElement.prototype, mediaElementEventNames, ignoreProperties);
        patchFilteredProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
        patchFilteredProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
        patchFilteredProperties(HTMLFrameElement.prototype, frameEventNames, ignoreProperties);
        patchFilteredProperties(HTMLIFrameElement.prototype, frameEventNames, ignoreProperties);
        const HTMLMarqueeElement = internalWindow['HTMLMarqueeElement'];
        if (HTMLMarqueeElement) {
            patchFilteredProperties(HTMLMarqueeElement.prototype, marqueeEventNames, ignoreProperties);
        }
        const Worker = internalWindow['Worker'];
        if (Worker) {
            patchFilteredProperties(Worker.prototype, workerEventNames, ignoreProperties);
        }
    }
    const XMLHttpRequest = _global['XMLHttpRequest'];
    if (XMLHttpRequest) {
        // XMLHttpRequest is not available in ServiceWorker, so we need to check here
        patchFilteredProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames, ignoreProperties);
    }
    const XMLHttpRequestEventTarget = _global['XMLHttpRequestEventTarget'];
    if (XMLHttpRequestEventTarget) {
        patchFilteredProperties(XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype, XMLHttpRequestEventNames, ignoreProperties);
    }
    if (typeof IDBIndex !== 'undefined') {
        patchFilteredProperties(IDBIndex.prototype, IDBIndexEventNames, ignoreProperties);
        patchFilteredProperties(IDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
        patchFilteredProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
        patchFilteredProperties(IDBDatabase.prototype, IDBIndexEventNames, ignoreProperties);
        patchFilteredProperties(IDBTransaction.prototype, IDBIndexEventNames, ignoreProperties);
        patchFilteredProperties(IDBCursor.prototype, IDBIndexEventNames, ignoreProperties);
    }
    if (supportsWebSocket) {
        patchFilteredProperties(WebSocket.prototype, websocketEventNames, ignoreProperties);
    }
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Zone.__load_patch('util', (global, Zone, api) => {
    api.patchOnProperties = patchOnProperties;
    api.patchMethod = patchMethod;
    api.bindArguments = bindArguments;
    api.patchMacroTask = patchMacroTask;
    // In earlier version of zone.js (<0.9.0), we use env name `__zone_symbol__BLACK_LISTED_EVENTS` to
    // define which events will not be patched by `Zone.js`.
    // In newer version (>=0.9.0), we change the env name to `__zone_symbol__UNPATCHED_EVENTS` to keep
    // the name consistent with angular repo.
    // The  `__zone_symbol__BLACK_LISTED_EVENTS` is deprecated, but it is still be supported for
    // backwards compatibility.
    const SYMBOL_BLACK_LISTED_EVENTS = Zone.__symbol__('BLACK_LISTED_EVENTS');
    const SYMBOL_UNPATCHED_EVENTS = Zone.__symbol__('UNPATCHED_EVENTS');
    if (global[SYMBOL_UNPATCHED_EVENTS]) {
        global[SYMBOL_BLACK_LISTED_EVENTS] = global[SYMBOL_UNPATCHED_EVENTS];
    }
    if (global[SYMBOL_BLACK_LISTED_EVENTS]) {
        Zone[SYMBOL_BLACK_LISTED_EVENTS] = Zone[SYMBOL_UNPATCHED_EVENTS] =
            global[SYMBOL_BLACK_LISTED_EVENTS];
    }
    api.patchEventPrototype = patchEventPrototype;
    api.patchEventTarget = patchEventTarget;
    api.isIEOrEdge = isIEOrEdge;
    api.ObjectDefineProperty = ObjectDefineProperty;
    api.ObjectGetOwnPropertyDescriptor = ObjectGetOwnPropertyDescriptor;
    api.ObjectCreate = ObjectCreate;
    api.ArraySlice = ArraySlice;
    api.patchClass = patchClass;
    api.wrapWithCurrentZone = wrapWithCurrentZone;
    api.filterProperties = filterProperties;
    api.attachOriginToPatched = attachOriginToPatched;
    api._redefineProperty = Object.defineProperty;
    api.patchCallbacks = patchCallbacks;
    api.getGlobalObjects = () => ({
        globalSources,
        zoneSymbolEventNames: zoneSymbolEventNames$1,
        eventNames,
        isBrowser,
        isMix,
        isNode,
        TRUE_STR,
        FALSE_STR,
        ZONE_SYMBOL_PREFIX,
        ADD_EVENT_LISTENER_STR,
        REMOVE_EVENT_LISTENER_STR
    });
});

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const taskSymbol = zoneSymbol('zoneTask');
function patchTimer(window, setName, cancelName, nameSuffix) {
    let setNative = null;
    let clearNative = null;
    setName += nameSuffix;
    cancelName += nameSuffix;
    const tasksByHandleId = {};
    function scheduleTask(task) {
        const data = task.data;
        data.args[0] = function () {
            return task.invoke.apply(this, arguments);
        };
        data.handleId = setNative.apply(window, data.args);
        return task;
    }
    function clearTask(task) {
        return clearNative.call(window, task.data.handleId);
    }
    setNative =
        patchMethod(window, setName, (delegate) => function (self, args) {
            if (typeof args[0] === 'function') {
                const options = {
                    isPeriodic: nameSuffix === 'Interval',
                    delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 :
                        undefined,
                    args: args
                };
                const callback = args[0];
                args[0] = function timer() {
                    try {
                        return callback.apply(this, arguments);
                    }
                    finally {
                        // issue-934, task will be cancelled
                        // even it is a periodic task such as
                        // setInterval
                        // https://github.com/angular/angular/issues/40387
                        // Cleanup tasksByHandleId should be handled before scheduleTask
                        // Since some zoneSpec may intercept and doesn't trigger
                        // scheduleFn(scheduleTask) provided here.
                        if (!(options.isPeriodic)) {
                            if (typeof options.handleId === 'number') {
                                // in non-nodejs env, we remove timerId
                                // from local cache
                                delete tasksByHandleId[options.handleId];
                            }
                            else if (options.handleId) {
                                // Node returns complex objects as handleIds
                                // we remove task reference from timer object
                                options.handleId[taskSymbol] = null;
                            }
                        }
                    }
                };
                const task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
                if (!task) {
                    return task;
                }
                // Node.js must additionally support the ref and unref functions.
                const handle = task.data.handleId;
                if (typeof handle === 'number') {
                    // for non nodejs env, we save handleId: task
                    // mapping in local cache for clearTimeout
                    tasksByHandleId[handle] = task;
                }
                else if (handle) {
                    // for nodejs env, we save task
                    // reference in timerId Object for clearTimeout
                    handle[taskSymbol] = task;
                }
                // check whether handle is null, because some polyfill or browser
                // may return undefined from setTimeout/setInterval/setImmediate/requestAnimationFrame
                if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' &&
                    typeof handle.unref === 'function') {
                    task.ref = handle.ref.bind(handle);
                    task.unref = handle.unref.bind(handle);
                }
                if (typeof handle === 'number' || handle) {
                    return handle;
                }
                return task;
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(window, args);
            }
        });
    clearNative =
        patchMethod(window, cancelName, (delegate) => function (self, args) {
            const id = args[0];
            let task;
            if (typeof id === 'number') {
                // non nodejs env.
                task = tasksByHandleId[id];
            }
            else {
                // nodejs env.
                task = id && id[taskSymbol];
                // other environments.
                if (!task) {
                    task = id;
                }
            }
            if (task && typeof task.type === 'string') {
                if (task.state !== 'notScheduled' &&
                    (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
                    if (typeof id === 'number') {
                        delete tasksByHandleId[id];
                    }
                    else if (id) {
                        id[taskSymbol] = null;
                    }
                    // Do not cancel already canceled functions
                    task.zone.cancelTask(task);
                }
            }
            else {
                // cause an error by calling it directly.
                delegate.apply(window, args);
            }
        });
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function patchCustomElements(_global, api) {
    const { isBrowser, isMix } = api.getGlobalObjects();
    if ((!isBrowser && !isMix) || !_global['customElements'] || !('customElements' in _global)) {
        return;
    }
    const callbacks = ['connectedCallback', 'disconnectedCallback', 'adoptedCallback', 'attributeChangedCallback'];
    api.patchCallbacks(api, _global.customElements, 'customElements', 'define', callbacks);
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function eventTargetPatch(_global, api) {
    if (Zone[api.symbol('patchEventTarget')]) {
        // EventTarget is already patched.
        return;
    }
    const { eventNames, zoneSymbolEventNames, TRUE_STR, FALSE_STR, ZONE_SYMBOL_PREFIX } = api.getGlobalObjects();
    //  predefine all __zone_symbol__ + eventName + true/false string
    for (let i = 0; i < eventNames.length; i++) {
        const eventName = eventNames[i];
        const falseEventName = eventName + FALSE_STR;
        const trueEventName = eventName + TRUE_STR;
        const symbol = ZONE_SYMBOL_PREFIX + falseEventName;
        const symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
        zoneSymbolEventNames[eventName] = {};
        zoneSymbolEventNames[eventName][FALSE_STR] = symbol;
        zoneSymbolEventNames[eventName][TRUE_STR] = symbolCapture;
    }
    const EVENT_TARGET = _global['EventTarget'];
    if (!EVENT_TARGET || !EVENT_TARGET.prototype) {
        return;
    }
    api.patchEventTarget(_global, [EVENT_TARGET && EVENT_TARGET.prototype]);
    return true;
}
function patchEvent(global, api) {
    api.patchEventPrototype(global, api);
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Zone.__load_patch('legacy', (global) => {
    const legacyPatch = global[Zone.__symbol__('legacyPatch')];
    if (legacyPatch) {
        legacyPatch();
    }
});
Zone.__load_patch('queueMicrotask', (global, Zone, api) => {
    api.patchMethod(global, 'queueMicrotask', delegate => {
        return function (self, args) {
            Zone.current.scheduleMicroTask('queueMicrotask', args[0]);
        };
    });
});
Zone.__load_patch('timers', (global) => {
    const set = 'set';
    const clear = 'clear';
    patchTimer(global, set, clear, 'Timeout');
    patchTimer(global, set, clear, 'Interval');
    patchTimer(global, set, clear, 'Immediate');
});
Zone.__load_patch('requestAnimationFrame', (global) => {
    patchTimer(global, 'request', 'cancel', 'AnimationFrame');
    patchTimer(global, 'mozRequest', 'mozCancel', 'AnimationFrame');
    patchTimer(global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
});
Zone.__load_patch('blocking', (global, Zone) => {
    const blockingMethods = ['alert', 'prompt', 'confirm'];
    for (let i = 0; i < blockingMethods.length; i++) {
        const name = blockingMethods[i];
        patchMethod(global, name, (delegate, symbol, name) => {
            return function (s, args) {
                return Zone.current.run(delegate, global, args, name);
            };
        });
    }
});
Zone.__load_patch('EventTarget', (global, Zone, api) => {
    patchEvent(global, api);
    eventTargetPatch(global, api);
    // patch XMLHttpRequestEventTarget's addEventListener/removeEventListener
    const XMLHttpRequestEventTarget = global['XMLHttpRequestEventTarget'];
    if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
        api.patchEventTarget(global, [XMLHttpRequestEventTarget.prototype]);
    }
});
Zone.__load_patch('MutationObserver', (global, Zone, api) => {
    patchClass('MutationObserver');
    patchClass('WebKitMutationObserver');
});
Zone.__load_patch('IntersectionObserver', (global, Zone, api) => {
    patchClass('IntersectionObserver');
});
Zone.__load_patch('FileReader', (global, Zone, api) => {
    patchClass('FileReader');
});
Zone.__load_patch('on_property', (global, Zone, api) => {
    propertyDescriptorPatch(api, global);
});
Zone.__load_patch('customElements', (global, Zone, api) => {
    patchCustomElements(global, api);
});
Zone.__load_patch('XHR', (global, Zone) => {
    // Treat XMLHttpRequest as a macrotask.
    patchXHR(global);
    const XHR_TASK = zoneSymbol('xhrTask');
    const XHR_SYNC = zoneSymbol('xhrSync');
    const XHR_LISTENER = zoneSymbol('xhrListener');
    const XHR_SCHEDULED = zoneSymbol('xhrScheduled');
    const XHR_URL = zoneSymbol('xhrURL');
    const XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol('xhrErrorBeforeScheduled');
    function patchXHR(window) {
        const XMLHttpRequest = window['XMLHttpRequest'];
        if (!XMLHttpRequest) {
            // XMLHttpRequest is not available in service worker
            return;
        }
        const XMLHttpRequestPrototype = XMLHttpRequest.prototype;
        function findPendingTask(target) {
            return target[XHR_TASK];
        }
        let oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
        let oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        if (!oriAddListener) {
            const XMLHttpRequestEventTarget = window['XMLHttpRequestEventTarget'];
            if (XMLHttpRequestEventTarget) {
                const XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
                oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
        }
        const READY_STATE_CHANGE = 'readystatechange';
        const SCHEDULED = 'scheduled';
        function scheduleTask(task) {
            const data = task.data;
            const target = data.target;
            target[XHR_SCHEDULED] = false;
            target[XHR_ERROR_BEFORE_SCHEDULED] = false;
            // remove existing event listener
            const listener = target[XHR_LISTENER];
            if (!oriAddListener) {
                oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
            if (listener) {
                oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
            }
            const newListener = target[XHR_LISTENER] = () => {
                if (target.readyState === target.DONE) {
                    // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                    // readyState=4 multiple times, so we need to check task state here
                    if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
                        // check whether the xhr has registered onload listener
                        // if that is the case, the task should invoke after all
                        // onload listeners finish.
                        // Also if the request failed without response (status = 0), the load event handler
                        // will not be triggered, in that case, we should also invoke the placeholder callback
                        // to close the XMLHttpRequest::send macroTask.
                        // https://github.com/angular/angular/issues/38795
                        const loadTasks = target[Zone.__symbol__('loadfalse')];
                        if (target.status !== 0 && loadTasks && loadTasks.length > 0) {
                            const oriInvoke = task.invoke;
                            task.invoke = function () {
                                // need to load the tasks again, because in other
                                // load listener, they may remove themselves
                                const loadTasks = target[Zone.__symbol__('loadfalse')];
                                for (let i = 0; i < loadTasks.length; i++) {
                                    if (loadTasks[i] === task) {
                                        loadTasks.splice(i, 1);
                                    }
                                }
                                if (!data.aborted && task.state === SCHEDULED) {
                                    oriInvoke.call(task);
                                }
                            };
                            loadTasks.push(task);
                        }
                        else {
                            task.invoke();
                        }
                    }
                    else if (!data.aborted && target[XHR_SCHEDULED] === false) {
                        // error occurs when xhr.send()
                        target[XHR_ERROR_BEFORE_SCHEDULED] = true;
                    }
                }
            };
            oriAddListener.call(target, READY_STATE_CHANGE, newListener);
            const storedTask = target[XHR_TASK];
            if (!storedTask) {
                target[XHR_TASK] = task;
            }
            sendNative.apply(target, data.args);
            target[XHR_SCHEDULED] = true;
            return task;
        }
        function placeholderCallback() { }
        function clearTask(task) {
            const data = task.data;
            // Note - ideally, we would call data.target.removeEventListener here, but it's too late
            // to prevent it from firing. So instead, we store info for the event listener.
            data.aborted = true;
            return abortNative.apply(data.target, data.args);
        }
        const openNative = patchMethod(XMLHttpRequestPrototype, 'open', () => function (self, args) {
            self[XHR_SYNC] = args[2] == false;
            self[XHR_URL] = args[1];
            return openNative.apply(self, args);
        });
        const XMLHTTPREQUEST_SOURCE = 'XMLHttpRequest.send';
        const fetchTaskAborting = zoneSymbol('fetchTaskAborting');
        const fetchTaskScheduling = zoneSymbol('fetchTaskScheduling');
        const sendNative = patchMethod(XMLHttpRequestPrototype, 'send', () => function (self, args) {
            if (Zone.current[fetchTaskScheduling] === true) {
                // a fetch is scheduling, so we are using xhr to polyfill fetch
                // and because we already schedule macroTask for fetch, we should
                // not schedule a macroTask for xhr again
                return sendNative.apply(self, args);
            }
            if (self[XHR_SYNC]) {
                // if the XHR is sync there is no task to schedule, just execute the code.
                return sendNative.apply(self, args);
            }
            else {
                const options = { target: self, url: self[XHR_URL], isPeriodic: false, args: args, aborted: false };
                const task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
                if (self && self[XHR_ERROR_BEFORE_SCHEDULED] === true && !options.aborted &&
                    task.state === SCHEDULED) {
                    // xhr request throw error when send
                    // we should invoke task instead of leaving a scheduled
                    // pending macroTask
                    task.invoke();
                }
            }
        });
        const abortNative = patchMethod(XMLHttpRequestPrototype, 'abort', () => function (self, args) {
            const task = findPendingTask(self);
            if (task && typeof task.type == 'string') {
                // If the XHR has already completed, do nothing.
                // If the XHR has already been aborted, do nothing.
                // Fix #569, call abort multiple times before done will cause
                // macroTask task count be negative number
                if (task.cancelFn == null || (task.data && task.data.aborted)) {
                    return;
                }
                task.zone.cancelTask(task);
            }
            else if (Zone.current[fetchTaskAborting] === true) {
                // the abort is called from fetch polyfill, we need to call native abort of XHR.
                return abortNative.apply(self, args);
            }
            // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no
            // task
            // to cancel. Do nothing.
        });
    }
});
Zone.__load_patch('geolocation', (global) => {
    /// GEO_LOCATION
    if (global['navigator'] && global['navigator'].geolocation) {
        patchPrototype(global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
    }
});
Zone.__load_patch('PromiseRejectionEvent', (global, Zone) => {
    // handle unhandled promise rejection
    function findPromiseRejectionHandler(evtName) {
        return function (e) {
            const eventTasks = findEventTasks(global, evtName);
            eventTasks.forEach(eventTask => {
                // windows has added unhandledrejection event listener
                // trigger the event listener
                const PromiseRejectionEvent = global['PromiseRejectionEvent'];
                if (PromiseRejectionEvent) {
                    const evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                    eventTask.invoke(evt);
                }
            });
        };
    }
    if (global['PromiseRejectionEvent']) {
        Zone[zoneSymbol('unhandledPromiseRejectionHandler')] =
            findPromiseRejectionHandler('unhandledrejection');
        Zone[zoneSymbol('rejectionHandledHandler')] =
            findPromiseRejectionHandler('rejectionhandled');
    }
});


/***/ }),

/***/ 42410:
/*!********************************************!*\
  !*** ./projects/examples/src/polyfills.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classlist_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classlist.js */ 5416);
/* harmony import */ var classlist_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classlist_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zone_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zone.js */ 7277);
/* harmony import */ var zone_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(zone_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_es6_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/es6/array */ 56974);
/* harmony import */ var core_js_es6_array__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_array__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_es6_date__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/es6/date */ 60366);
/* harmony import */ var core_js_es6_date__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_date__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_es6_function__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/es6/function */ 49805);
/* harmony import */ var core_js_es6_function__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_function__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_es6_map__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/es6/map */ 33349);
/* harmony import */ var core_js_es6_map__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_map__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_es6_math__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/es6/math */ 32109);
/* harmony import */ var core_js_es6_math__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_math__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_es6_number__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/es6/number */ 2582);
/* harmony import */ var core_js_es6_number__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_number__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_es6_object__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/es6/object */ 75227);
/* harmony import */ var core_js_es6_object__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_object__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_es6_parse_float__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/es6/parse-float */ 23260);
/* harmony import */ var core_js_es6_parse_float__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_parse_float__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_es6_parse_int__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/es6/parse-int */ 33759);
/* harmony import */ var core_js_es6_parse_int__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_parse_int__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_es6_reflect__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/es6/reflect */ 42401);
/* harmony import */ var core_js_es6_reflect__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_reflect__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_es6_regexp__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/es6/regexp */ 86535);
/* harmony import */ var core_js_es6_regexp__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_regexp__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_es6_set__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/es6/set */ 41925);
/* harmony import */ var core_js_es6_set__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_set__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_es6_string__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/es6/string */ 14336);
/* harmony import */ var core_js_es6_string__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_string__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_es6_symbol__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/es6/symbol */ 18250);
/* harmony import */ var core_js_es6_symbol__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_symbol__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/es7/reflect */ 24965);
/* harmony import */ var core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var systemjs_dist_system__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! systemjs/dist/system */ 40686);
/* harmony import */ var systemjs_dist_system__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(systemjs_dist_system__WEBPACK_IMPORTED_MODULE_17__);
/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
 // Run `npm install --save classlist.js`.
/**
 * Web Animations `@angular/platform-browser/animations`
 * Only required if AnimationBuilder is used within the application and using IE/Edge or Safari.
 * Standard animation support in Angular DOES NOT require any polyfills (as of Angular 6.0).
 */
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 * because those flags need to be set before `zone.js` being loaded, and webpack
 * will put import in the top of bundle, so user need to create a separate file
 * in this directory (for example: zone-flags.ts), and put the following flags
 * into that file, and then add the following code before importing zone.js.
 * import './zone-flags.ts';
 *
 * The flags allowed in zone-flags.ts are listed here.
 *
 * The following flags will work for all browsers.
 *
 * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
 * (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
 * (window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
 *
 *  in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
 *  with the following flag, it will bypass `zone.js` patch for IE/Edge
 *
 *  (window as any).__Zone_enable_cross_context_check = true;
 *
 */
/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */















/* IE10 and IE11 */
// import 'url-polyfill';
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
/**
 * Patches in SystemJs for use by the VCD Angular Client. This package is @vcd/angular-client.
 * This project requires that you use system JS to provide a module that gives injection tokens. We need
 * to mock this module.
 */

window.SystemJs = systemjs_dist_system__WEBPACK_IMPORTED_MODULE_17___default().registry.set('@vcd/common', systemjs_dist_system__WEBPACK_IMPORTED_MODULE_17___default().newModule({})); // >= 9.5


/***/ }),

/***/ 56974:
/*!*******************************************!*\
  !*** ./node_modules/core-js/es6/array.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.string.iterator */ 46255);
__webpack_require__(/*! ../modules/es6.array.is-array */ 84022);
__webpack_require__(/*! ../modules/es6.array.from */ 51261);
__webpack_require__(/*! ../modules/es6.array.of */ 30989);
__webpack_require__(/*! ../modules/es6.array.join */ 79305);
__webpack_require__(/*! ../modules/es6.array.slice */ 58003);
__webpack_require__(/*! ../modules/es6.array.sort */ 9486);
__webpack_require__(/*! ../modules/es6.array.for-each */ 75689);
__webpack_require__(/*! ../modules/es6.array.map */ 28293);
__webpack_require__(/*! ../modules/es6.array.filter */ 56846);
__webpack_require__(/*! ../modules/es6.array.some */ 78206);
__webpack_require__(/*! ../modules/es6.array.every */ 61009);
__webpack_require__(/*! ../modules/es6.array.reduce */ 81095);
__webpack_require__(/*! ../modules/es6.array.reduce-right */ 3698);
__webpack_require__(/*! ../modules/es6.array.index-of */ 71574);
__webpack_require__(/*! ../modules/es6.array.last-index-of */ 62322);
__webpack_require__(/*! ../modules/es6.array.copy-within */ 92782);
__webpack_require__(/*! ../modules/es6.array.fill */ 17454);
__webpack_require__(/*! ../modules/es6.array.find */ 28928);
__webpack_require__(/*! ../modules/es6.array.find-index */ 24685);
__webpack_require__(/*! ../modules/es6.array.species */ 42904);
__webpack_require__(/*! ../modules/es6.array.iterator */ 2291);
module.exports = __webpack_require__(/*! ../modules/_core */ 21207).Array;


/***/ }),

/***/ 60366:
/*!******************************************!*\
  !*** ./node_modules/core-js/es6/date.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.date.now */ 44848);
__webpack_require__(/*! ../modules/es6.date.to-json */ 7047);
__webpack_require__(/*! ../modules/es6.date.to-iso-string */ 59654);
__webpack_require__(/*! ../modules/es6.date.to-string */ 59712);
__webpack_require__(/*! ../modules/es6.date.to-primitive */ 41997);
module.exports = Date;


/***/ }),

/***/ 49805:
/*!**********************************************!*\
  !*** ./node_modules/core-js/es6/function.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.function.bind */ 87028);
__webpack_require__(/*! ../modules/es6.function.name */ 9087);
__webpack_require__(/*! ../modules/es6.function.has-instance */ 71306);
module.exports = __webpack_require__(/*! ../modules/_core */ 21207).Function;


/***/ }),

/***/ 33349:
/*!*****************************************!*\
  !*** ./node_modules/core-js/es6/map.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.object.to-string */ 60230);
__webpack_require__(/*! ../modules/es6.string.iterator */ 46255);
__webpack_require__(/*! ../modules/web.dom.iterable */ 44515);
__webpack_require__(/*! ../modules/es6.map */ 47672);
module.exports = __webpack_require__(/*! ../modules/_core */ 21207).Map;


/***/ }),

/***/ 32109:
/*!******************************************!*\
  !*** ./node_modules/core-js/es6/math.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.math.acosh */ 37960);
__webpack_require__(/*! ../modules/es6.math.asinh */ 26960);
__webpack_require__(/*! ../modules/es6.math.atanh */ 51786);
__webpack_require__(/*! ../modules/es6.math.cbrt */ 6199);
__webpack_require__(/*! ../modules/es6.math.clz32 */ 63944);
__webpack_require__(/*! ../modules/es6.math.cosh */ 37990);
__webpack_require__(/*! ../modules/es6.math.expm1 */ 69768);
__webpack_require__(/*! ../modules/es6.math.fround */ 4572);
__webpack_require__(/*! ../modules/es6.math.hypot */ 27409);
__webpack_require__(/*! ../modules/es6.math.imul */ 58063);
__webpack_require__(/*! ../modules/es6.math.log10 */ 50032);
__webpack_require__(/*! ../modules/es6.math.log1p */ 71481);
__webpack_require__(/*! ../modules/es6.math.log2 */ 78310);
__webpack_require__(/*! ../modules/es6.math.sign */ 83955);
__webpack_require__(/*! ../modules/es6.math.sinh */ 82347);
__webpack_require__(/*! ../modules/es6.math.tanh */ 65335);
__webpack_require__(/*! ../modules/es6.math.trunc */ 19657);
module.exports = __webpack_require__(/*! ../modules/_core */ 21207).Math;


/***/ }),

/***/ 2582:
/*!********************************************!*\
  !*** ./node_modules/core-js/es6/number.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.number.constructor */ 63796);
__webpack_require__(/*! ../modules/es6.number.to-fixed */ 70572);
__webpack_require__(/*! ../modules/es6.number.to-precision */ 91153);
__webpack_require__(/*! ../modules/es6.number.epsilon */ 35505);
__webpack_require__(/*! ../modules/es6.number.is-finite */ 90513);
__webpack_require__(/*! ../modules/es6.number.is-integer */ 87325);
__webpack_require__(/*! ../modules/es6.number.is-nan */ 31205);
__webpack_require__(/*! ../modules/es6.number.is-safe-integer */ 85095);
__webpack_require__(/*! ../modules/es6.number.max-safe-integer */ 59881);
__webpack_require__(/*! ../modules/es6.number.min-safe-integer */ 53347);
__webpack_require__(/*! ../modules/es6.number.parse-float */ 6329);
__webpack_require__(/*! ../modules/es6.number.parse-int */ 54115);
module.exports = __webpack_require__(/*! ../modules/_core */ 21207).Number;


/***/ }),

/***/ 75227:
/*!********************************************!*\
  !*** ./node_modules/core-js/es6/object.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.symbol */ 3186);
__webpack_require__(/*! ../modules/es6.object.create */ 1648);
__webpack_require__(/*! ../modules/es6.object.define-property */ 58514);
__webpack_require__(/*! ../modules/es6.object.define-properties */ 38242);
__webpack_require__(/*! ../modules/es6.object.get-own-property-descriptor */ 66315);
__webpack_require__(/*! ../modules/es6.object.get-prototype-of */ 83237);
__webpack_require__(/*! ../modules/es6.object.keys */ 4023);
__webpack_require__(/*! ../modules/es6.object.get-own-property-names */ 3601);
__webpack_require__(/*! ../modules/es6.object.freeze */ 19447);
__webpack_require__(/*! ../modules/es6.object.seal */ 25338);
__webpack_require__(/*! ../modules/es6.object.prevent-extensions */ 3617);
__webpack_require__(/*! ../modules/es6.object.is-frozen */ 88548);
__webpack_require__(/*! ../modules/es6.object.is-sealed */ 26064);
__webpack_require__(/*! ../modules/es6.object.is-extensible */ 55808);
__webpack_require__(/*! ../modules/es6.object.assign */ 36264);
__webpack_require__(/*! ../modules/es6.object.is */ 62795);
__webpack_require__(/*! ../modules/es6.object.set-prototype-of */ 73150);
__webpack_require__(/*! ../modules/es6.object.to-string */ 60230);

module.exports = __webpack_require__(/*! ../modules/_core */ 21207).Object;


/***/ }),

/***/ 23260:
/*!*************************************************!*\
  !*** ./node_modules/core-js/es6/parse-float.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.parse-float */ 10039);
module.exports = __webpack_require__(/*! ../modules/_core */ 21207).parseFloat;


/***/ }),

/***/ 33759:
/*!***********************************************!*\
  !*** ./node_modules/core-js/es6/parse-int.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.parse-int */ 57012);
module.exports = __webpack_require__(/*! ../modules/_core */ 21207).parseInt;


/***/ }),

/***/ 42401:
/*!*********************************************!*\
  !*** ./node_modules/core-js/es6/reflect.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.reflect.apply */ 22537);
__webpack_require__(/*! ../modules/es6.reflect.construct */ 64879);
__webpack_require__(/*! ../modules/es6.reflect.define-property */ 20344);
__webpack_require__(/*! ../modules/es6.reflect.delete-property */ 45806);
__webpack_require__(/*! ../modules/es6.reflect.enumerate */ 63966);
__webpack_require__(/*! ../modules/es6.reflect.get */ 87890);
__webpack_require__(/*! ../modules/es6.reflect.get-own-property-descriptor */ 64859);
__webpack_require__(/*! ../modules/es6.reflect.get-prototype-of */ 96039);
__webpack_require__(/*! ../modules/es6.reflect.has */ 16124);
__webpack_require__(/*! ../modules/es6.reflect.is-extensible */ 92347);
__webpack_require__(/*! ../modules/es6.reflect.own-keys */ 27254);
__webpack_require__(/*! ../modules/es6.reflect.prevent-extensions */ 69541);
__webpack_require__(/*! ../modules/es6.reflect.set */ 66651);
__webpack_require__(/*! ../modules/es6.reflect.set-prototype-of */ 90685);
module.exports = __webpack_require__(/*! ../modules/_core */ 21207).Reflect;


/***/ }),

/***/ 86535:
/*!********************************************!*\
  !*** ./node_modules/core-js/es6/regexp.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.regexp.constructor */ 41567);
__webpack_require__(/*! ../modules/es6.regexp.exec */ 73072);
__webpack_require__(/*! ../modules/es6.regexp.to-string */ 30316);
__webpack_require__(/*! ../modules/es6.regexp.flags */ 55130);
__webpack_require__(/*! ../modules/es6.regexp.match */ 46581);
__webpack_require__(/*! ../modules/es6.regexp.replace */ 79927);
__webpack_require__(/*! ../modules/es6.regexp.search */ 55514);
__webpack_require__(/*! ../modules/es6.regexp.split */ 53360);
module.exports = __webpack_require__(/*! ../modules/_core */ 21207).RegExp;


/***/ }),

/***/ 41925:
/*!*****************************************!*\
  !*** ./node_modules/core-js/es6/set.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.object.to-string */ 60230);
__webpack_require__(/*! ../modules/es6.string.iterator */ 46255);
__webpack_require__(/*! ../modules/web.dom.iterable */ 44515);
__webpack_require__(/*! ../modules/es6.set */ 2057);
module.exports = __webpack_require__(/*! ../modules/_core */ 21207).Set;


/***/ }),

/***/ 14336:
/*!********************************************!*\
  !*** ./node_modules/core-js/es6/string.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.string.from-code-point */ 12811);
__webpack_require__(/*! ../modules/es6.string.raw */ 37988);
__webpack_require__(/*! ../modules/es6.string.trim */ 11064);
__webpack_require__(/*! ../modules/es6.string.iterator */ 46255);
__webpack_require__(/*! ../modules/es6.string.code-point-at */ 11848);
__webpack_require__(/*! ../modules/es6.string.ends-with */ 29713);
__webpack_require__(/*! ../modules/es6.string.includes */ 65166);
__webpack_require__(/*! ../modules/es6.string.repeat */ 6060);
__webpack_require__(/*! ../modules/es6.string.starts-with */ 32915);
__webpack_require__(/*! ../modules/es6.string.anchor */ 33399);
__webpack_require__(/*! ../modules/es6.string.big */ 84610);
__webpack_require__(/*! ../modules/es6.string.blink */ 64946);
__webpack_require__(/*! ../modules/es6.string.bold */ 9662);
__webpack_require__(/*! ../modules/es6.string.fixed */ 31129);
__webpack_require__(/*! ../modules/es6.string.fontcolor */ 51355);
__webpack_require__(/*! ../modules/es6.string.fontsize */ 91630);
__webpack_require__(/*! ../modules/es6.string.italics */ 19802);
__webpack_require__(/*! ../modules/es6.string.link */ 36788);
__webpack_require__(/*! ../modules/es6.string.small */ 90905);
__webpack_require__(/*! ../modules/es6.string.strike */ 22482);
__webpack_require__(/*! ../modules/es6.string.sub */ 72207);
__webpack_require__(/*! ../modules/es6.string.sup */ 31342);
__webpack_require__(/*! ../modules/es6.regexp.match */ 46581);
__webpack_require__(/*! ../modules/es6.regexp.replace */ 79927);
__webpack_require__(/*! ../modules/es6.regexp.search */ 55514);
__webpack_require__(/*! ../modules/es6.regexp.split */ 53360);
module.exports = __webpack_require__(/*! ../modules/_core */ 21207).String;


/***/ }),

/***/ 18250:
/*!********************************************!*\
  !*** ./node_modules/core-js/es6/symbol.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.symbol */ 3186);
__webpack_require__(/*! ../modules/es6.object.to-string */ 60230);
module.exports = __webpack_require__(/*! ../modules/_core */ 21207).Symbol;


/***/ }),

/***/ 24965:
/*!*********************************************!*\
  !*** ./node_modules/core-js/es7/reflect.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es7.reflect.define-metadata */ 55270);
__webpack_require__(/*! ../modules/es7.reflect.delete-metadata */ 74848);
__webpack_require__(/*! ../modules/es7.reflect.get-metadata */ 13637);
__webpack_require__(/*! ../modules/es7.reflect.get-metadata-keys */ 52275);
__webpack_require__(/*! ../modules/es7.reflect.get-own-metadata */ 42430);
__webpack_require__(/*! ../modules/es7.reflect.get-own-metadata-keys */ 20580);
__webpack_require__(/*! ../modules/es7.reflect.has-metadata */ 76781);
__webpack_require__(/*! ../modules/es7.reflect.has-own-metadata */ 98701);
__webpack_require__(/*! ../modules/es7.reflect.metadata */ 91993);
module.exports = __webpack_require__(/*! ../modules/_core */ 21207).Reflect;


/***/ }),

/***/ 41740:
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/***/ (function(module) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ 64995:
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_a-number-value.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var cof = __webpack_require__(/*! ./_cof */ 92377);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),

/***/ 65067:
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ 21906)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ 73933)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 265:
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_advance-string-index.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var at = __webpack_require__(/*! ./_string-at */ 39810)(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ 11516:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_an-instance.js ***!
  \******************************************************/
/***/ (function(module) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ 54539:
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 98378);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ 48434:
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-copy-within.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 67533);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 60757);
var toLength = __webpack_require__(/*! ./_to-length */ 64249);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),

/***/ 81359:
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_array-fill.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 67533);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 60757);
var toLength = __webpack_require__(/*! ./_to-length */ 64249);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ 6409:
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-from-iterable.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ 99857);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),

/***/ 56620:
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ 91501);
var toLength = __webpack_require__(/*! ./_to-length */ 64249);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 60757);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ 36161:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ 35532);
var IObject = __webpack_require__(/*! ./_iobject */ 36813);
var toObject = __webpack_require__(/*! ./_to-object */ 67533);
var toLength = __webpack_require__(/*! ./_to-length */ 64249);
var asc = __webpack_require__(/*! ./_array-species-create */ 39222);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ 60002:
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_array-reduce.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ./_a-function */ 41740);
var toObject = __webpack_require__(/*! ./_to-object */ 67533);
var IObject = __webpack_require__(/*! ./_iobject */ 36813);
var toLength = __webpack_require__(/*! ./_to-length */ 64249);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),

/***/ 21773:
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var isArray = __webpack_require__(/*! ./_is-array */ 78951);
var SPECIES = __webpack_require__(/*! ./_wks */ 21906)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ 39222:
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ 21773);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ 29412:
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_bind.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ./_a-function */ 41740);
var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var invoke = __webpack_require__(/*! ./_invoke */ 33915);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),

/***/ 61320:
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ 92377);
var TAG = __webpack_require__(/*! ./_wks */ 21906)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ 92377:
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/***/ (function(module) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ 39584:
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-strong.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(/*! ./_object-dp */ 19026).f;
var create = __webpack_require__(/*! ./_object-create */ 10493);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 96399);
var ctx = __webpack_require__(/*! ./_ctx */ 35532);
var anInstance = __webpack_require__(/*! ./_an-instance */ 11516);
var forOf = __webpack_require__(/*! ./_for-of */ 99857);
var $iterDefine = __webpack_require__(/*! ./_iter-define */ 19136);
var step = __webpack_require__(/*! ./_iter-step */ 54177);
var setSpecies = __webpack_require__(/*! ./_set-species */ 82830);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 31393);
var fastKey = __webpack_require__(/*! ./_meta */ 94433).fastKey;
var validate = __webpack_require__(/*! ./_validate-collection */ 50593);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),

/***/ 95561:
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-weak.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(/*! ./_redefine-all */ 96399);
var getWeak = __webpack_require__(/*! ./_meta */ 94433).getWeak;
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var anInstance = __webpack_require__(/*! ./_an-instance */ 11516);
var forOf = __webpack_require__(/*! ./_for-of */ 99857);
var createArrayMethod = __webpack_require__(/*! ./_array-methods */ 36161);
var $has = __webpack_require__(/*! ./_has */ 92454);
var validate = __webpack_require__(/*! ./_validate-collection */ 50593);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),

/***/ 45824:
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_collection.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 41735);
var $export = __webpack_require__(/*! ./_export */ 14976);
var redefine = __webpack_require__(/*! ./_redefine */ 63733);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 96399);
var meta = __webpack_require__(/*! ./_meta */ 94433);
var forOf = __webpack_require__(/*! ./_for-of */ 99857);
var anInstance = __webpack_require__(/*! ./_an-instance */ 11516);
var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var fails = __webpack_require__(/*! ./_fails */ 44510);
var $iterDetect = __webpack_require__(/*! ./_iter-detect */ 86449);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 36409);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 3902);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),

/***/ 21207:
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/***/ (function(module) {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ 31993:
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_create-property.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ 19026);
var createDesc = __webpack_require__(/*! ./_property-desc */ 57229);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ 35532:
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ 41740);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 29134:
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-iso-string.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(/*! ./_fails */ 44510);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),

/***/ 22389:
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-primitive.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 10523);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),

/***/ 22665:
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/***/ (function(module) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ 31393:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ 44510)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 57967:
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var document = __webpack_require__(/*! ./_global */ 41735).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ 7199:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/***/ (function(module) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ 82694:
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ 46523);
var gOPS = __webpack_require__(/*! ./_object-gops */ 69194);
var pIE = __webpack_require__(/*! ./_object-pie */ 62239);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ 14976:
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 41735);
var core = __webpack_require__(/*! ./_core */ 21207);
var hide = __webpack_require__(/*! ./_hide */ 73933);
var redefine = __webpack_require__(/*! ./_redefine */ 63733);
var ctx = __webpack_require__(/*! ./_ctx */ 35532);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ 81766:
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_fails-is-regexp.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ 21906)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ 44510:
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ 36496:
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_fix-re-wks.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.exec */ 73072);
var redefine = __webpack_require__(/*! ./_redefine */ 63733);
var hide = __webpack_require__(/*! ./_hide */ 73933);
var fails = __webpack_require__(/*! ./_fails */ 44510);
var defined = __webpack_require__(/*! ./_defined */ 22665);
var wks = __webpack_require__(/*! ./_wks */ 21906);
var regexpExec = __webpack_require__(/*! ./_regexp-exec */ 31949);

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ 34231:
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_flags.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 99857:
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_for-of.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 35532);
var call = __webpack_require__(/*! ./_iter-call */ 86614);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 15277);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var toLength = __webpack_require__(/*! ./_to-length */ 64249);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 60618);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ 38731:
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_function-to-string.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_shared */ 12053)('native-function-to-string', Function.toString);


/***/ }),

/***/ 41735:
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/***/ (function(module) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ 92454:
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/***/ (function(module) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ 73933:
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 19026);
var createDesc = __webpack_require__(/*! ./_property-desc */ 57229);
module.exports = __webpack_require__(/*! ./_descriptors */ 31393) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 61686:
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ 41735).document;
module.exports = document && document.documentElement;


/***/ }),

/***/ 42588:
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ 31393) && !__webpack_require__(/*! ./_fails */ 44510)(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 57967)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 3902:
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_inherit-if-required.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ 31789).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ 33915:
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_invoke.js ***!
  \*************************************************/
/***/ (function(module) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ 36813:
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ 92377);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ 15277:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array-iter.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ 50457);
var ITERATOR = __webpack_require__(/*! ./_wks */ 21906)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ 78951:
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ 92377);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ 56305:
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-integer.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ 98378:
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/***/ (function(module) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ 80407:
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var cof = __webpack_require__(/*! ./_cof */ 92377);
var MATCH = __webpack_require__(/*! ./_wks */ 21906)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ 86614:
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-call.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ 5857:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ 10493);
var descriptor = __webpack_require__(/*! ./_property-desc */ 57229);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 36409);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ 73933)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 21906)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ 19136:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 58185);
var $export = __webpack_require__(/*! ./_export */ 14976);
var redefine = __webpack_require__(/*! ./_redefine */ 63733);
var hide = __webpack_require__(/*! ./_hide */ 73933);
var Iterators = __webpack_require__(/*! ./_iterators */ 50457);
var $iterCreate = __webpack_require__(/*! ./_iter-create */ 5857);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 36409);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 3141);
var ITERATOR = __webpack_require__(/*! ./_wks */ 21906)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ 86449:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-detect.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ 21906)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ 54177:
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/***/ (function(module) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ 50457:
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 58185:
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 28639:
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-expm1.js ***!
  \*****************************************************/
/***/ (function(module) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),

/***/ 33109:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_math-fround.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(/*! ./_math-sign */ 91205);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),

/***/ 5889:
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-log1p.js ***!
  \*****************************************************/
/***/ (function(module) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),

/***/ 91205:
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-sign.js ***!
  \****************************************************/
/***/ (function(module) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),

/***/ 94433:
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ 83837)('meta');
var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var has = __webpack_require__(/*! ./_has */ 92454);
var setDesc = __webpack_require__(/*! ./_object-dp */ 19026).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ 44510)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ 14238:
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_metadata.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Map = __webpack_require__(/*! ./es6.map */ 47672);
var $export = __webpack_require__(/*! ./_export */ 14976);
var shared = __webpack_require__(/*! ./_shared */ 12053)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ 73076))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),

/***/ 55269:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 31393);
var getKeys = __webpack_require__(/*! ./_object-keys */ 46523);
var gOPS = __webpack_require__(/*! ./_object-gops */ 69194);
var pIE = __webpack_require__(/*! ./_object-pie */ 62239);
var toObject = __webpack_require__(/*! ./_to-object */ 67533);
var IObject = __webpack_require__(/*! ./_iobject */ 36813);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ 44510)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ 10493:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var dPs = __webpack_require__(/*! ./_object-dps */ 21128);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 7199);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 72522)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ 57967)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ 61686).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ 19026:
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 42588);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 10523);
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ 31393) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 21128:
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 19026);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var getKeys = __webpack_require__(/*! ./_object-keys */ 46523);

module.exports = __webpack_require__(/*! ./_descriptors */ 31393) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ 59613:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ 62239);
var createDesc = __webpack_require__(/*! ./_property-desc */ 57229);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 91501);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 10523);
var has = __webpack_require__(/*! ./_has */ 92454);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 42588);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ 31393) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ 53085:
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ 91501);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 25401).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ 25401:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 89054);
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 7199).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ 69194:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 3141:
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ 92454);
var toObject = __webpack_require__(/*! ./_to-object */ 67533);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 72522)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ 89054:
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ 92454);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 91501);
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 56620)(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 72522)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ 46523:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 89054);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 7199);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ 62239:
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ 34273:
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-sap.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ 14976);
var core = __webpack_require__(/*! ./_core */ 21207);
var fails = __webpack_require__(/*! ./_fails */ 44510);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ 69089:
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_own-keys.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(/*! ./_object-gopn */ 25401);
var gOPS = __webpack_require__(/*! ./_object-gops */ 69194);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var Reflect = __webpack_require__(/*! ./_global */ 41735).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ 4698:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-float.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var $parseFloat = __webpack_require__(/*! ./_global */ 41735).parseFloat;
var $trim = __webpack_require__(/*! ./_string-trim */ 76477).trim;

module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ 10090) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),

/***/ 41442:
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-int.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ 41735).parseInt;
var $trim = __webpack_require__(/*! ./_string-trim */ 76477).trim;
var ws = __webpack_require__(/*! ./_string-ws */ 10090);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),

/***/ 57229:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 96399:
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine-all.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ 63733);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ 63733:
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 41735);
var hide = __webpack_require__(/*! ./_hide */ 73933);
var has = __webpack_require__(/*! ./_has */ 92454);
var SRC = __webpack_require__(/*! ./_uid */ 83837)('src');
var $toString = __webpack_require__(/*! ./_function-to-string */ 38731);
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ 21207).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ 94463:
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_regexp-exec-abstract.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(/*! ./_classof */ 61320);
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ 31949:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_regexp-exec.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__(/*! ./_flags */ 34231);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ 9693:
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_same-value.js ***!
  \*****************************************************/
/***/ (function(module) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ 31789:
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ 35532)(Function.call, __webpack_require__(/*! ./_object-gopd */ 59613).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ 82830:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_set-species.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 41735);
var dP = __webpack_require__(/*! ./_object-dp */ 19026);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 31393);
var SPECIES = __webpack_require__(/*! ./_wks */ 21906)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ 36409:
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ 19026).f;
var has = __webpack_require__(/*! ./_has */ 92454);
var TAG = __webpack_require__(/*! ./_wks */ 21906)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ 72522:
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ 12053)('keys');
var uid = __webpack_require__(/*! ./_uid */ 83837);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ 12053:
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ 21207);
var global = __webpack_require__(/*! ./_global */ 41735);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ 58185) ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 3393:
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_species-constructor.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var aFunction = __webpack_require__(/*! ./_a-function */ 41740);
var SPECIES = __webpack_require__(/*! ./_wks */ 21906)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ 31408:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_strict-method.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ./_fails */ 44510);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),

/***/ 39810:
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 65260);
var defined = __webpack_require__(/*! ./_defined */ 22665);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ 9675:
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-context.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 80407);
var defined = __webpack_require__(/*! ./_defined */ 22665);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ 59124:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-html.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 14976);
var fails = __webpack_require__(/*! ./_fails */ 44510);
var defined = __webpack_require__(/*! ./_defined */ 22665);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),

/***/ 93733:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-repeat.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ 65260);
var defined = __webpack_require__(/*! ./_defined */ 22665);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),

/***/ 76477:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-trim.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 14976);
var defined = __webpack_require__(/*! ./_defined */ 22665);
var fails = __webpack_require__(/*! ./_fails */ 44510);
var spaces = __webpack_require__(/*! ./_string-ws */ 10090);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ 10090:
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-ws.js ***!
  \****************************************************/
/***/ (function(module) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ 60757:
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 65260);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ 65260:
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/***/ (function(module) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ 91501:
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ 36813);
var defined = __webpack_require__(/*! ./_defined */ 22665);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ 64249:
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ 65260);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ 67533:
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ 22665);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ 10523:
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ 98378);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 83837:
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/***/ (function(module) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ 50593:
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_validate-collection.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 98378);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),

/***/ 41513:
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 41735);
var core = __webpack_require__(/*! ./_core */ 21207);
var LIBRARY = __webpack_require__(/*! ./_library */ 58185);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 2935);
var defineProperty = __webpack_require__(/*! ./_object-dp */ 19026).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ 2935:
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ 21906);


/***/ }),

/***/ 21906:
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ 12053)('wks');
var uid = __webpack_require__(/*! ./_uid */ 83837);
var Symbol = __webpack_require__(/*! ./_global */ 41735).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ 60618:
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/core.get-iterator-method.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ 61320);
var ITERATOR = __webpack_require__(/*! ./_wks */ 21906)('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ 50457);
module.exports = __webpack_require__(/*! ./_core */ 21207).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ 92782:
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.copy-within.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.P, 'Array', { copyWithin: __webpack_require__(/*! ./_array-copy-within */ 48434) });

__webpack_require__(/*! ./_add-to-unscopables */ 65067)('copyWithin');


/***/ }),

/***/ 61009:
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.every.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 14976);
var $every = __webpack_require__(/*! ./_array-methods */ 36161)(4);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 31408)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ 17454:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.fill.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.P, 'Array', { fill: __webpack_require__(/*! ./_array-fill */ 81359) });

__webpack_require__(/*! ./_add-to-unscopables */ 65067)('fill');


/***/ }),

/***/ 56846:
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.filter.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 14976);
var $filter = __webpack_require__(/*! ./_array-methods */ 36161)(2);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 31408)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ 24685:
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find-index.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 14976);
var $find = __webpack_require__(/*! ./_array-methods */ 36161)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 65067)(KEY);


/***/ }),

/***/ 28928:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 14976);
var $find = __webpack_require__(/*! ./_array-methods */ 36161)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 65067)(KEY);


/***/ }),

/***/ 75689:
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.for-each.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 14976);
var $forEach = __webpack_require__(/*! ./_array-methods */ 36161)(0);
var STRICT = __webpack_require__(/*! ./_strict-method */ 31408)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ 51261:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.from.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ 35532);
var $export = __webpack_require__(/*! ./_export */ 14976);
var toObject = __webpack_require__(/*! ./_to-object */ 67533);
var call = __webpack_require__(/*! ./_iter-call */ 86614);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 15277);
var toLength = __webpack_require__(/*! ./_to-length */ 64249);
var createProperty = __webpack_require__(/*! ./_create-property */ 31993);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 60618);

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ 86449)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ 71574:
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.index-of.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 14976);
var $indexOf = __webpack_require__(/*! ./_array-includes */ 56620)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 31408)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),

/***/ 84022:
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.is-array.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.S, 'Array', { isArray: __webpack_require__(/*! ./_is-array */ 78951) });


/***/ }),

/***/ 2291:
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 65067);
var step = __webpack_require__(/*! ./_iter-step */ 54177);
var Iterators = __webpack_require__(/*! ./_iterators */ 50457);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 91501);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ 19136)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ 79305:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.join.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(/*! ./_export */ 14976);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 91501);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ 36813) != Object || !__webpack_require__(/*! ./_strict-method */ 31408)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ 62322:
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.last-index-of.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 14976);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 91501);
var toInteger = __webpack_require__(/*! ./_to-integer */ 65260);
var toLength = __webpack_require__(/*! ./_to-length */ 64249);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 31408)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),

/***/ 28293:
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.map.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 14976);
var $map = __webpack_require__(/*! ./_array-methods */ 36161)(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 31408)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ 30989:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.of.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 14976);
var createProperty = __webpack_require__(/*! ./_create-property */ 31993);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 44510)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),

/***/ 3698:
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce-right.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 14976);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 60002);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 31408)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),

/***/ 81095:
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 14976);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 60002);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 31408)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),

/***/ 58003:
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.slice.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 14976);
var html = __webpack_require__(/*! ./_html */ 61686);
var cof = __webpack_require__(/*! ./_cof */ 92377);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 60757);
var toLength = __webpack_require__(/*! ./_to-length */ 64249);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 44510)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),

/***/ 78206:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.some.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 14976);
var $some = __webpack_require__(/*! ./_array-methods */ 36161)(3);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 31408)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ 9486:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.sort.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 14976);
var aFunction = __webpack_require__(/*! ./_a-function */ 41740);
var toObject = __webpack_require__(/*! ./_to-object */ 67533);
var fails = __webpack_require__(/*! ./_fails */ 44510);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ 31408)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ 42904:
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.species.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(/*! ./_set-species */ 82830)('Array');


/***/ }),

/***/ 44848:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.now.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),

/***/ 59654:
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-iso-string.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(/*! ./_export */ 14976);
var toISOString = __webpack_require__(/*! ./_date-to-iso-string */ 29134);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),

/***/ 7047:
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-json.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 14976);
var toObject = __webpack_require__(/*! ./_to-object */ 67533);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 10523);

$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 44510)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),

/***/ 41997:
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-primitive.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ 21906)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(/*! ./_hide */ 73933)(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ 22389));


/***/ }),

/***/ 59712:
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-string.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(/*! ./_redefine */ 63733)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),

/***/ 87028:
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.bind.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.P, 'Function', { bind: __webpack_require__(/*! ./_bind */ 29412) });


/***/ }),

/***/ 71306:
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.has-instance.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 3141);
var HAS_INSTANCE = __webpack_require__(/*! ./_wks */ 21906)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(/*! ./_object-dp */ 19026).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),

/***/ 9087:
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.name.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 19026).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(/*! ./_descriptors */ 31393) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ 47672:
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.map.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 39584);
var validate = __webpack_require__(/*! ./_validate-collection */ 50593);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ 45824)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),

/***/ 37960:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.acosh.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(/*! ./_export */ 14976);
var log1p = __webpack_require__(/*! ./_math-log1p */ 5889);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),

/***/ 26960:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.asinh.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(/*! ./_export */ 14976);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),

/***/ 51786:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.atanh.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(/*! ./_export */ 14976);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),

/***/ 6199:
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cbrt.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(/*! ./_export */ 14976);
var sign = __webpack_require__(/*! ./_math-sign */ 91205);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),

/***/ 63944:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.clz32.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),

/***/ 37990:
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cosh.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(/*! ./_export */ 14976);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),

/***/ 69768:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.expm1.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(/*! ./_export */ 14976);
var $expm1 = __webpack_require__(/*! ./_math-expm1 */ 28639);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),

/***/ 4572:
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.fround.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.S, 'Math', { fround: __webpack_require__(/*! ./_math-fround */ 33109) });


/***/ }),

/***/ 27409:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.hypot.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(/*! ./_export */ 14976);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),

/***/ 58063:
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.imul.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(/*! ./_export */ 14976);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 44510)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),

/***/ 50032:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log10.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),

/***/ 71481:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log1p.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.S, 'Math', { log1p: __webpack_require__(/*! ./_math-log1p */ 5889) });


/***/ }),

/***/ 78310:
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log2.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),

/***/ 83955:
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sign.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.S, 'Math', { sign: __webpack_require__(/*! ./_math-sign */ 91205) });


/***/ }),

/***/ 82347:
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sinh.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(/*! ./_export */ 14976);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 28639);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 44510)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),

/***/ 65335:
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.tanh.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(/*! ./_export */ 14976);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 28639);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),

/***/ 19657:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.trunc.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),

/***/ 63796:
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.constructor.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 41735);
var has = __webpack_require__(/*! ./_has */ 92454);
var cof = __webpack_require__(/*! ./_cof */ 92377);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 3902);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 10523);
var fails = __webpack_require__(/*! ./_fails */ 44510);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 25401).f;
var gOPD = __webpack_require__(/*! ./_object-gopd */ 59613).f;
var dP = __webpack_require__(/*! ./_object-dp */ 19026).f;
var $trim = __webpack_require__(/*! ./_string-trim */ 76477).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(/*! ./_object-create */ 10493)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(/*! ./_descriptors */ 31393) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(/*! ./_redefine */ 63733)(global, NUMBER, $Number);
}


/***/ }),

/***/ 35505:
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.epsilon.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),

/***/ 90513:
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-finite.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(/*! ./_export */ 14976);
var _isFinite = __webpack_require__(/*! ./_global */ 41735).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),

/***/ 87325:
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-integer.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.S, 'Number', { isInteger: __webpack_require__(/*! ./_is-integer */ 56305) });


/***/ }),

/***/ 31205:
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-nan.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),

/***/ 85095:
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-safe-integer.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(/*! ./_export */ 14976);
var isInteger = __webpack_require__(/*! ./_is-integer */ 56305);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),

/***/ 59881:
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.max-safe-integer.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),

/***/ 53347:
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.min-safe-integer.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),

/***/ 6329:
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-float.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 14976);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 4698);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),

/***/ 54115:
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-int.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 14976);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 41442);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),

/***/ 70572:
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-fixed.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 14976);
var toInteger = __webpack_require__(/*! ./_to-integer */ 65260);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 64995);
var repeat = __webpack_require__(/*! ./_string-repeat */ 93733);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(/*! ./_fails */ 44510)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),

/***/ 91153:
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-precision.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 14976);
var $fails = __webpack_require__(/*! ./_fails */ 44510);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 64995);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),

/***/ 36264:
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.assign.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ 55269) });


/***/ }),

/***/ 1648:
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.create.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 14976);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ 10493) });


/***/ }),

/***/ 38242:
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-properties.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 14976);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 31393), 'Object', { defineProperties: __webpack_require__(/*! ./_object-dps */ 21128) });


/***/ }),

/***/ 58514:
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-property.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 14976);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 31393), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ 19026).f });


/***/ }),

/***/ 19447:
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.freeze.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var meta = __webpack_require__(/*! ./_meta */ 94433).onFreeze;

__webpack_require__(/*! ./_object-sap */ 34273)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),

/***/ 66315:
/*!********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ 91501);
var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 59613).f;

__webpack_require__(/*! ./_object-sap */ 34273)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),

/***/ 3601:
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-names.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ 34273)('getOwnPropertyNames', function () {
  return __webpack_require__(/*! ./_object-gopn-ext */ 53085).f;
});


/***/ }),

/***/ 83237:
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-prototype-of.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ 67533);
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 3141);

__webpack_require__(/*! ./_object-sap */ 34273)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ 55808:
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-extensible.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(/*! ./_is-object */ 98378);

__webpack_require__(/*! ./_object-sap */ 34273)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),

/***/ 88548:
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-frozen.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(/*! ./_is-object */ 98378);

__webpack_require__(/*! ./_object-sap */ 34273)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),

/***/ 26064:
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-sealed.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(/*! ./_is-object */ 98378);

__webpack_require__(/*! ./_object-sap */ 34273)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),

/***/ 62795:
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ 14976);
$export($export.S, 'Object', { is: __webpack_require__(/*! ./_same-value */ 9693) });


/***/ }),

/***/ 4023:
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.keys.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ 67533);
var $keys = __webpack_require__(/*! ./_object-keys */ 46523);

__webpack_require__(/*! ./_object-sap */ 34273)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ 3617:
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.prevent-extensions.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var meta = __webpack_require__(/*! ./_meta */ 94433).onFreeze;

__webpack_require__(/*! ./_object-sap */ 34273)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),

/***/ 25338:
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.seal.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var meta = __webpack_require__(/*! ./_meta */ 94433).onFreeze;

__webpack_require__(/*! ./_object-sap */ 34273)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),

/***/ 73150:
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.set-prototype-of.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ 14976);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 31789).set });


/***/ }),

/***/ 60230:
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.to-string.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ 61320);
var test = {};
test[__webpack_require__(/*! ./_wks */ 21906)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ 63733)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),

/***/ 10039:
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-float.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 14976);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 4698);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),

/***/ 57012:
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-int.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 14976);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 41442);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),

/***/ 22537:
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.apply.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(/*! ./_export */ 14976);
var aFunction = __webpack_require__(/*! ./_a-function */ 41740);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var rApply = (__webpack_require__(/*! ./_global */ 41735).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(/*! ./_fails */ 44510)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),

/***/ 64879:
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.construct.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(/*! ./_export */ 14976);
var create = __webpack_require__(/*! ./_object-create */ 10493);
var aFunction = __webpack_require__(/*! ./_a-function */ 41740);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var fails = __webpack_require__(/*! ./_fails */ 44510);
var bind = __webpack_require__(/*! ./_bind */ 29412);
var rConstruct = (__webpack_require__(/*! ./_global */ 41735).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ 20344:
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.define-property.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(/*! ./_object-dp */ 19026);
var $export = __webpack_require__(/*! ./_export */ 14976);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 10523);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 44510)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ 45806:
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.delete-property.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 14976);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 59613).f;
var anObject = __webpack_require__(/*! ./_an-object */ 54539);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),

/***/ 63966:
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.enumerate.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(/*! ./_export */ 14976);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(/*! ./_iter-create */ 5857)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),

/***/ 64859:
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(/*! ./_object-gopd */ 59613);
var $export = __webpack_require__(/*! ./_export */ 14976);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),

/***/ 96039:
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(/*! ./_export */ 14976);
var getProto = __webpack_require__(/*! ./_object-gpo */ 3141);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),

/***/ 87890:
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(/*! ./_object-gopd */ 59613);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 3141);
var has = __webpack_require__(/*! ./_has */ 92454);
var $export = __webpack_require__(/*! ./_export */ 14976);
var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),

/***/ 16124:
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.has.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),

/***/ 92347:
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.is-extensible.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(/*! ./_export */ 14976);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),

/***/ 27254:
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.own-keys.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(/*! ./_own-keys */ 69089) });


/***/ }),

/***/ 69541:
/*!************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(/*! ./_export */ 14976);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ 90685:
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(/*! ./_export */ 14976);
var setProto = __webpack_require__(/*! ./_set-proto */ 31789);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),

/***/ 66651:
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(/*! ./_object-dp */ 19026);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 59613);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 3141);
var has = __webpack_require__(/*! ./_has */ 92454);
var $export = __webpack_require__(/*! ./_export */ 14976);
var createDesc = __webpack_require__(/*! ./_property-desc */ 57229);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var isObject = __webpack_require__(/*! ./_is-object */ 98378);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),

/***/ 41567:
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.constructor.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 41735);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 3902);
var dP = __webpack_require__(/*! ./_object-dp */ 19026).f;
var gOPN = __webpack_require__(/*! ./_object-gopn */ 25401).f;
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 80407);
var $flags = __webpack_require__(/*! ./_flags */ 34231);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(/*! ./_descriptors */ 31393) && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ 44510)(function () {
  re2[__webpack_require__(/*! ./_wks */ 21906)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(/*! ./_redefine */ 63733)(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ 82830)('RegExp');


/***/ }),

/***/ 73072:
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.exec.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__(/*! ./_regexp-exec */ 31949);
__webpack_require__(/*! ./_export */ 14976)({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ 55130:
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.flags.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(/*! ./_descriptors */ 31393) && /./g.flags != 'g') __webpack_require__(/*! ./_object-dp */ 19026).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(/*! ./_flags */ 34231)
});


/***/ }),

/***/ 46581:
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.match.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var toLength = __webpack_require__(/*! ./_to-length */ 64249);
var advanceStringIndex = __webpack_require__(/*! ./_advance-string-index */ 265);
var regExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ 94463);

// @@match logic
__webpack_require__(/*! ./_fix-re-wks */ 36496)('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ 79927:
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.replace.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var toObject = __webpack_require__(/*! ./_to-object */ 67533);
var toLength = __webpack_require__(/*! ./_to-length */ 64249);
var toInteger = __webpack_require__(/*! ./_to-integer */ 65260);
var advanceStringIndex = __webpack_require__(/*! ./_advance-string-index */ 265);
var regExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ 94463);
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ 36496)('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ 55514:
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.search.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var sameValue = __webpack_require__(/*! ./_same-value */ 9693);
var regExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ 94463);

// @@search logic
__webpack_require__(/*! ./_fix-re-wks */ 36496)('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),

/***/ 53360:
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.split.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__(/*! ./_is-regexp */ 80407);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 3393);
var advanceStringIndex = __webpack_require__(/*! ./_advance-string-index */ 265);
var toLength = __webpack_require__(/*! ./_to-length */ 64249);
var callRegExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ 94463);
var regexpExec = __webpack_require__(/*! ./_regexp-exec */ 31949);
var fails = __webpack_require__(/*! ./_fails */ 44510);
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__(/*! ./_fix-re-wks */ 36496)('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),

/***/ 30316:
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.to-string.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.flags */ 55130);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var $flags = __webpack_require__(/*! ./_flags */ 34231);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 31393);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(/*! ./_redefine */ 63733)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(/*! ./_fails */ 44510)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ 2057:
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.set.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 39584);
var validate = __webpack_require__(/*! ./_validate-collection */ 50593);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ 45824)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),

/***/ 33399:
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.anchor.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(/*! ./_string-html */ 59124)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),

/***/ 84610:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.big.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(/*! ./_string-html */ 59124)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),

/***/ 64946:
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.blink.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(/*! ./_string-html */ 59124)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),

/***/ 9662:
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.bold.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(/*! ./_string-html */ 59124)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),

/***/ 11848:
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.code-point-at.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 14976);
var $at = __webpack_require__(/*! ./_string-at */ 39810)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),

/***/ 29713:
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.ends-with.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(/*! ./_export */ 14976);
var toLength = __webpack_require__(/*! ./_to-length */ 64249);
var context = __webpack_require__(/*! ./_string-context */ 9675);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 81766)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),

/***/ 31129:
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fixed.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(/*! ./_string-html */ 59124)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),

/***/ 51355:
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontcolor.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(/*! ./_string-html */ 59124)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),

/***/ 91630:
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontsize.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(/*! ./_string-html */ 59124)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),

/***/ 12811:
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.from-code-point.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 14976);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 60757);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),

/***/ 65166:
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.includes.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(/*! ./_export */ 14976);
var context = __webpack_require__(/*! ./_string-context */ 9675);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 81766)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 19802:
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.italics.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(/*! ./_string-html */ 59124)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),

/***/ 46255:
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.iterator.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ 39810)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ 19136)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ 36788:
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.link.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(/*! ./_string-html */ 59124)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),

/***/ 37988:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.raw.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 14976);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 91501);
var toLength = __webpack_require__(/*! ./_to-length */ 64249);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),

/***/ 6060:
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.repeat.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 14976);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ 93733)
});


/***/ }),

/***/ 90905:
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.small.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(/*! ./_string-html */ 59124)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),

/***/ 32915:
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.starts-with.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(/*! ./_export */ 14976);
var toLength = __webpack_require__(/*! ./_to-length */ 64249);
var context = __webpack_require__(/*! ./_string-context */ 9675);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 81766)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ 22482:
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.strike.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(/*! ./_string-html */ 59124)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),

/***/ 72207:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sub.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(/*! ./_string-html */ 59124)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),

/***/ 31342:
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sup.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(/*! ./_string-html */ 59124)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),

/***/ 11064:
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.trim.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(/*! ./_string-trim */ 76477)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),

/***/ 3186:
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ 41735);
var has = __webpack_require__(/*! ./_has */ 92454);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 31393);
var $export = __webpack_require__(/*! ./_export */ 14976);
var redefine = __webpack_require__(/*! ./_redefine */ 63733);
var META = __webpack_require__(/*! ./_meta */ 94433).KEY;
var $fails = __webpack_require__(/*! ./_fails */ 44510);
var shared = __webpack_require__(/*! ./_shared */ 12053);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 36409);
var uid = __webpack_require__(/*! ./_uid */ 83837);
var wks = __webpack_require__(/*! ./_wks */ 21906);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 2935);
var wksDefine = __webpack_require__(/*! ./_wks-define */ 41513);
var enumKeys = __webpack_require__(/*! ./_enum-keys */ 82694);
var isArray = __webpack_require__(/*! ./_is-array */ 78951);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var toObject = __webpack_require__(/*! ./_to-object */ 67533);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 91501);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 10523);
var createDesc = __webpack_require__(/*! ./_property-desc */ 57229);
var _create = __webpack_require__(/*! ./_object-create */ 10493);
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ 53085);
var $GOPD = __webpack_require__(/*! ./_object-gopd */ 59613);
var $GOPS = __webpack_require__(/*! ./_object-gops */ 69194);
var $DP = __webpack_require__(/*! ./_object-dp */ 19026);
var $keys = __webpack_require__(/*! ./_object-keys */ 46523);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ 25401).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ 62239).f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ 58185)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 73933)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ 73076:
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-map.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 41735);
var each = __webpack_require__(/*! ./_array-methods */ 36161)(0);
var redefine = __webpack_require__(/*! ./_redefine */ 63733);
var meta = __webpack_require__(/*! ./_meta */ 94433);
var assign = __webpack_require__(/*! ./_object-assign */ 55269);
var weak = __webpack_require__(/*! ./_collection-weak */ 95561);
var isObject = __webpack_require__(/*! ./_is-object */ 98378);
var validate = __webpack_require__(/*! ./_validate-collection */ 50593);
var NATIVE_WEAK_MAP = __webpack_require__(/*! ./_validate-collection */ 50593);
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ 45824)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),

/***/ 55270:
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.define-metadata.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 14238);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),

/***/ 74848:
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.delete-metadata.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 14238);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),

/***/ 52275:
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var Set = __webpack_require__(/*! ./es6.set */ 2057);
var from = __webpack_require__(/*! ./_array-from-iterable */ 6409);
var metadata = __webpack_require__(/*! ./_metadata */ 14238);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 3141);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),

/***/ 13637:
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 14238);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 3141);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ 20580:
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 14238);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),

/***/ 42430:
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 14238);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ 76781:
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-metadata.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 14238);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 3141);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ 98701:
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 14238);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ 91993:
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.metadata.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $metadata = __webpack_require__(/*! ./_metadata */ 14238);
var anObject = __webpack_require__(/*! ./_an-object */ 54539);
var aFunction = __webpack_require__(/*! ./_a-function */ 41740);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),

/***/ 44515:
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ 2291);
var getKeys = __webpack_require__(/*! ./_object-keys */ 46523);
var redefine = __webpack_require__(/*! ./_redefine */ 63733);
var global = __webpack_require__(/*! ./_global */ 41735);
var hide = __webpack_require__(/*! ./_hide */ 73933);
var Iterators = __webpack_require__(/*! ./_iterators */ 50457);
var wks = __webpack_require__(/*! ./_wks */ 21906);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ 79099:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (function() {

/* (ignored) */

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__(42410));
/******/ }
]);