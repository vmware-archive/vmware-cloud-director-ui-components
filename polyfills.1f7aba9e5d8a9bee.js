(self["webpackChunkexamples"] = self["webpackChunkexamples"] || []).push([[429],{

/***/ 42410:
/*!********************************************!*\
  !*** ./projects/examples/src/polyfills.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var zone_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zone.js */ 88583);
/* harmony import */ var zone_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zone_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var systemjs_dist_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! systemjs/dist/system */ 61370);
/* harmony import */ var systemjs_dist_system__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(systemjs_dist_system__WEBPACK_IMPORTED_MODULE_1__);
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
/**
 * Patches in SystemJs for use by the VCD Angular Client. This package is @vcd/angular-client.
 * This project requires that you use system JS to provide a module that gives injection tokens. We need
 * to mock this module.
 */

window.SystemJs = systemjs_dist_system__WEBPACK_IMPORTED_MODULE_1___default().registry.set('@vcd/common', systemjs_dist_system__WEBPACK_IMPORTED_MODULE_1___default().newModule({})); // >= 9.5


/***/ }),

/***/ 61370:
/*!**********************************************!*\
  !*** ./node_modules/systemjs/dist/system.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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

/***/ 88583:
/*!***********************************************!*\
  !*** ./node_modules/zone.js/fesm2015/zone.js ***!
  \***********************************************/
/***/ (() => {

"use strict";

/**
 * @license Angular v14.1.0-next.0
 * (c) 2010-2022 Google LLC. https://angular.io/
 * License: MIT
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
((function (global) {
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
                new _ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
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
    class _ZoneDelegate {
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
    function nativeScheduleMicroTask(func) {
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
            nativeThen.call(nativeMicroTaskQueuePromise, func);
        }
        else {
            global[symbolSetTimeout](func, 0);
        }
    }
    function scheduleMicroTask(task) {
        // if we are not running in any task, and there has not been anything scheduled
        // we must bootstrap the initial task creation by manually scheduling the drain
        if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
            // We are not running in Task, so we need to kickstart the microtask queue.
            nativeScheduleMicroTask(drainMicroTaskQueue);
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
        patchCallbacks: () => noop,
        nativeScheduleMicroTask: nativeScheduleMicroTask
    };
    let _currentZoneFrame = { parent: null, zone: new Zone(null, null) };
    let _currentTask = null;
    let _numberOfNestedTaskFrames = 0;
    function noop() { }
    performanceMeasure('Zone', 'Zone');
    return global['Zone'] = Zone;
}))(typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global);

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
const zoneSymbolEventNames$1 = {};
const wrapFn = function (event) {
    // https://github.com/angular/zone.js/issues/911, in IE, sometimes
    // event will be undefined, so we need to use window.event
    event = event || _global.event;
    if (!event) {
        return;
    }
    let eventNameSymbol = zoneSymbolEventNames$1[event.type];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames$1[event.type] = zoneSymbol('ON_PROPERTY' + event.type);
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
    // slice(2) cuz 'onclick' -> 'click', etc
    const eventName = prop.slice(2);
    let eventNameSymbol = zoneSymbolEventNames$1[eventName];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames$1[eventName] = zoneSymbol('ON_PROPERTY' + eventName);
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
        const previousValue = target[eventNameSymbol];
        if (typeof previousValue === 'function') {
            target.removeEventListener(eventName, wrapFn);
        }
        // issue #978, when onload handler was added before loading zone.js
        // we should remove it with originalDescSet
        originalDescSet && originalDescSet.call(target, null);
        target[eventNameSymbol] = newValue;
        if (typeof newValue === 'function') {
            target.addEventListener(eventName, wrapFn, false);
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
            let value = originalDescGet.call(this);
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
            if (prop.slice(0, 2) == 'on') {
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
            (typeof onRejected === 'function') ? onRejected :
                forwardRejection;
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
    const AggregateError = global.AggregateError;
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
        static any(values) {
            if (!values || typeof values[Symbol.iterator] !== 'function') {
                return Promise.reject(new AggregateError([], 'All promises were rejected'));
            }
            const promises = [];
            let count = 0;
            try {
                for (let v of values) {
                    count++;
                    promises.push(ZoneAwarePromise.resolve(v));
                }
            }
            catch (err) {
                return Promise.reject(new AggregateError([], 'All promises were rejected'));
            }
            if (count === 0) {
                return Promise.reject(new AggregateError([], 'All promises were rejected'));
            }
            let finished = false;
            const errors = [];
            return new ZoneAwarePromise((resolve, reject) => {
                for (let i = 0; i < promises.length; i++) {
                    promises[i].then(v => {
                        if (finished) {
                            return;
                        }
                        finished = true;
                        resolve(v);
                    }, err => {
                        errors.push(err);
                        count--;
                        if (count === 0) {
                            finished = true;
                            reject(new AggregateError(errors, 'All promises were rejected'));
                        }
                    });
                }
            });
        }
        ;
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
                const onceWrapper = once();
                executor &&
                    executor(onceWrapper(makeResolver(promise, RESOLVED)), onceWrapper(makeResolver(promise, REJECTED)));
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
            var _a;
            // We must read `Symbol.species` safely because `this` may be anything. For instance, `this`
            // may be an object without a prototype (created through `Object.create(null)`); thus
            // `this.constructor` will be undefined. One of the use cases is SystemJS creating
            // prototype-less objects (modules) via `Object.create(null)`. The SystemJS creates an empty
            // object and copies promise properties into that object (within the `getOrCreateLoad`
            // function). The zone.js then checks if the resolved value has the `then` method and invokes
            // it with the `value` context. Otherwise, this will throw an error: `TypeError: Cannot read
            // properties of undefined (reading 'Symbol(Symbol.species)')`.
            let C = (_a = this.constructor) === null || _a === void 0 ? void 0 : _a[Symbol.species];
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
            var _a;
            // See comment on the call to `then` about why thee `Symbol.species` is safely accessed.
            let C = (_a = this.constructor) === null || _a === void 0 ? void 0 : _a[Symbol.species];
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
        // Note: We pass the `options` object as the event handler too. This is not compatible with the
        // signature of `addEventListener` or `removeEventListener` but enables us to remove the handler
        // without an actual handler.
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
const zoneSymbolEventNames = {};
const globalSources = {};
const EVENT_NAME_SYMBOL_REGX = new RegExp('^' + ZONE_SYMBOL_PREFIX + '(\\w+)(true|false)$');
const IMMEDIATE_PROPAGATION_SYMBOL = zoneSymbol('propagationStopped');
function prepareEventNames(eventName, eventNameToString) {
    const falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
    const trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
    const symbol = ZONE_SYMBOL_PREFIX + falseEventName;
    const symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
    zoneSymbolEventNames[eventName] = {};
    zoneSymbolEventNames[eventName][FALSE_STR] = symbol;
    zoneSymbolEventNames[eventName][TRUE_STR] = symbolCapture;
}
function patchEventTarget(_global, api, apis, patchOptions) {
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
        // need to try/catch error here, otherwise, the error in one event listener
        // will break the executions of the other event listeners. Also error will
        // not remove the event listener when `once` options is true.
        let error;
        try {
            task.invoke(task, target, [event]);
        }
        catch (err) {
            error = err;
        }
        const options = task.options;
        if (options && typeof options === 'object' && options.once) {
            // if options.once is true, after invoke once remove listener here
            // only browser need to do this, nodejs eventEmitter will cal removeListener
            // inside EventEmitter.once
            const delegate = task.originalDelegate ? task.originalDelegate : task.callback;
            target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate, options);
        }
        return error;
    };
    function globalCallback(context, event, isCapture) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        const target = context || event.target || _global;
        const tasks = target[zoneSymbolEventNames[event.type][isCapture ? TRUE_STR : FALSE_STR]];
        if (tasks) {
            const errors = [];
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                const err = invokeTask(tasks[0], target, event);
                err && errors.push(err);
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
                    const err = invokeTask(copyTasks[i], target, event);
                    err && errors.push(err);
                }
            }
            // Since there is only one error, we don't need to schedule microTask
            // to throw the error.
            if (errors.length === 1) {
                throw errors[0];
            }
            else {
                for (let i = 0; i < errors.length; i++) {
                    const err = errors[i];
                    api.nativeScheduleMicroTask(() => {
                        throw err;
                    });
                }
            }
        }
    }
    // global shared zoneAwareCallback to handle all event callback with capture = false
    const globalZoneAwareCallback = function (event) {
        return globalCallback(this, event, false);
    };
    // global shared zoneAwareCallback to handle all event callback with capture = true
    const globalZoneAwareCaptureCallback = function (event) {
        return globalCallback(this, event, true);
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
                const symbolEventNames = zoneSymbolEventNames[task.eventName];
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
                let symbolEventNames = zoneSymbolEventNames[eventName];
                if (!symbolEventNames) {
                    prepareEventNames(eventName, eventNameToString);
                    symbolEventNames = zoneSymbolEventNames[eventName];
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
            const symbolEventNames = zoneSymbolEventNames[eventName];
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
                const symbolEventNames = zoneSymbolEventNames[eventName];
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
    let symbolEventName = zoneSymbolEventNames[eventName];
    if (!symbolEventName) {
        prepareEventNames(eventName);
        symbolEventName = zoneSymbolEventNames[eventName];
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
                // Note: the `patchCallbacks` is used for patching the `document.registerElement` and
                // `customElements.define`. We explicitly wrap the patching code into try-catch since
                // callbacks may be already patched by other web components frameworks (e.g. LWC), and they
                // make those properties non-writable. This means that patching callback will throw an error
                // `cannot assign to read-only property`. See this code as an example:
                // https://github.com/salesforce/lwc/blob/master/packages/@lwc/engine-core/src/framework/base-bridge-element.ts#L180-L186
                // We don't want to stop the application rendering if we couldn't patch some
                // callback, e.g. `attributeChangedCallback`.
                try {
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
                }
                catch (_a) {
                    // Note: we leave the catch block empty since there's no way to handle the error related
                    // to non-writable property.
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
/**
 * Get all event name properties which the event name startsWith `on`
 * from the target object itself, inherited properties are not considered.
 */
function getOnEventNames(target) {
    return Object.getOwnPropertyNames(target)
        .filter(name => name.startsWith('on') && name.length > 2)
        .map(name => name.substring(2));
}
function propertyDescriptorPatch(api, _global) {
    if (isNode && !isMix) {
        return;
    }
    if (Zone[api.symbol('patchEvents')]) {
        // events are already been patched by legacy patch.
        return;
    }
    const ignoreProperties = _global['__Zone_ignore_on_properties'];
    // for browsers that we can patch the descriptor:  Chrome & Firefox
    let patchTargets = [];
    if (isBrowser) {
        const internalWindow = window;
        patchTargets = patchTargets.concat([
            'Document', 'SVGElement', 'Element', 'HTMLElement', 'HTMLBodyElement', 'HTMLMediaElement',
            'HTMLFrameSetElement', 'HTMLFrameElement', 'HTMLIFrameElement', 'HTMLMarqueeElement', 'Worker'
        ]);
        const ignoreErrorProperties = isIE() ? [{ target: internalWindow, ignoreProperties: ['error'] }] : [];
        // in IE/Edge, onProp not exist in window object, but in WindowPrototype
        // so we need to pass WindowPrototype to check onProp exist or not
        patchFilteredProperties(internalWindow, getOnEventNames(internalWindow), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, ObjectGetPrototypeOf(internalWindow));
    }
    patchTargets = patchTargets.concat([
        'XMLHttpRequest', 'XMLHttpRequestEventTarget', 'IDBIndex', 'IDBRequest', 'IDBOpenDBRequest',
        'IDBDatabase', 'IDBTransaction', 'IDBCursor', 'WebSocket'
    ]);
    for (let i = 0; i < patchTargets.length; i++) {
        const target = _global[patchTargets[i]];
        target && target.prototype &&
            patchFilteredProperties(target.prototype, getOnEventNames(target.prototype), ignoreProperties);
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
    // Collect native event names by looking at properties
    // on the global namespace, e.g. 'onclick'.
    const eventNames = getOnEventNames(global);
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
        zoneSymbolEventNames,
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
    api.patchEventTarget(_global, api, [EVENT_TARGET && EVENT_TARGET.prototype]);
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
        api.patchEventTarget(global, api, [XMLHttpRequestEventTarget.prototype]);
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

/***/ 79099:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(42410));
/******/ }
]);