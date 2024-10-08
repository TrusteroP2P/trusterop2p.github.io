const e = "Trystero",
  t = (e, t) => Array(e).fill().map(t),
  i = "0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",
  r = (e) => t(e, () => i[Math.floor(62 * Math.random())]).join(""),
  n = r(20),
  s = Promise.all.bind(Promise),
  a = "undefined" != typeof window,
  { entries: o, fromEntries: h, keys: d } = Object,
  c = () => {},
  l = (t) => Error(`${e}: ${t}`),
  u = new TextEncoder(),
  p = new TextDecoder(),
  f = (e) => u.encode(e),
  _ = (e) => p.decode(e),
  m = (...e) => e.join("@"),
  g = JSON.stringify,
  y = JSON.parse,
  b = {},
  w = "AES-GCM",
  C = {},
  S = async (e) => {
    if (C[e]) return C[e];
    const t = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-1", f(e))))
      .map((e) => e.toString(36))
      .join("");
    return (C[e] = t), t;
  },
  v = async (e, t) => {
    const i = crypto.getRandomValues(new Uint8Array(16));
    return i.join(",") + "$" + ((r = await crypto.subtle.encrypt({ name: w, iv: i }, await e, f(t))), btoa(String.fromCharCode.apply(null, new Uint8Array(r))));
    var r;
  },
  E = async (e, t) => {
    const [i, r] = t.split("$");
    return _(
      await crypto.subtle.decrypt(
        { name: w, iv: new Uint8Array(i.split(",")) },
        await e,
        ((e) => {
          const t = atob(e);
          return new Uint8Array(t.length).map((e, i) => t.charCodeAt(i)).buffer;
        })(r)
      )
    );
  };
function x(e) {
  return e && e.__esModule && {}.hasOwnProperty.call(e, "default") ? e.default : e;
}
var T,
  k,
  R = { exports: {} };
function A() {
  if (k) return T;
  k = 1;
  var e = 1e3,
    t = 60 * e,
    i = 60 * t,
    r = 24 * i,
    n = 7 * r,
    s = 365.25 * r;
  function a(e, t, i, r) {
    var n = t >= 1.5 * i;
    return Math.round(e / i) + " " + r + (n ? "s" : "");
  }
  return (T = (o, h) => {
    h = h || {};
    var d = typeof o;
    if ("string" === d && o.length > 0)
      return (function (a) {
        if ((a += "").length > 100) return;
        var o = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(a);
        if (!o) return;
        var h = parseFloat(o[1]);
        switch ((o[2] || "ms").toLowerCase()) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * s;
          case "weeks":
          case "week":
          case "w":
            return h * n;
          case "days":
          case "day":
          case "d":
            return h * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * i;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      })(o);
    if ("number" === d && isFinite(o))
      return h.long
        ? (function (n) {
            var s = Math.abs(n);
            if (s >= r) return a(n, s, r, "day");
            if (s >= i) return a(n, s, i, "hour");
            if (s >= t) return a(n, s, t, "minute");
            if (s >= e) return a(n, s, e, "second");
            return n + " ms";
          })(o)
        : (function (n) {
            var s = Math.abs(n);
            if (s >= r) return Math.round(n / r) + "d";
            if (s >= i) return Math.round(n / i) + "h";
            if (s >= t) return Math.round(n / t) + "m";
            if (s >= e) return Math.round(n / e) + "s";
            return n + "ms";
          })(o);
    throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(o));
  });
}
var N = function (e) {
  function t(e) {
    let r,
      n,
      s,
      a = null;
    function o(...e) {
      if (!o.enabled) return;
      const i = o,
        n = Number(new Date()),
        s = n - (r || n);
      (i.diff = s), (i.prev = r), (i.curr = n), (r = n), (e[0] = t.coerce(e[0])), "string" != typeof e[0] && e.unshift("%O");
      let a = 0;
      (e[0] = e[0].replace(/%([a-zA-Z%])/g, (r, n) => {
        if ("%%" === r) return "%";
        a++;
        const s = t.formatters[n];
        if ("function" == typeof s) {
          const t = e[a];
          (r = s.call(i, t)), e.splice(a, 1), a--;
        }
        return r;
      })),
        t.formatArgs.call(i, e);
      (i.log || t.log).apply(i, e);
    }
    return (
      (o.namespace = e),
      (o.useColors = t.useColors()),
      (o.color = t.selectColor(e)),
      (o.extend = i),
      (o.destroy = t.destroy),
      Object.defineProperty(o, "enabled", {
        enumerable: !0,
        configurable: !1,
        get() {
          return null !== a ? a : (n !== t.namespaces && ((n = t.namespaces), (s = t.enabled(e))), s);
        },
        set(e) {
          a = e;
        },
      }),
      "function" == typeof t.init && t.init(o),
      o
    );
  }
  function i(e, i) {
    const r = t(this.namespace + (void 0 === i ? ":" : i) + e);
    return (r.log = this.log), r;
  }
  function r(e) {
    return e
      .toString()
      .substring(2, e.toString().length - 2)
      .replace(/\.\*\?$/, "*");
  }
  return (
    (t.debug = t),
    (t.default = t),
    (t.coerce = function (e) {
      if (e instanceof Error) return e.stack || e.message;
      return e;
    }),
    (t.disable = function () {
      const e = [...t.names.map(r), ...t.skips.map(r).map((e) => "-" + e)].join(",");
      return t.enable(""), e;
    }),
    (t.enable = function (e) {
      let i;
      t.save(e), (t.namespaces = e), (t.names = []), (t.skips = []);
      const r = ("string" == typeof e ? e : "").split(/[\s,]+/),
        n = r.length;
      for (i = 0; i < n; i++) r[i] && ("-" === (e = r[i].replace(/\*/g, ".*?"))[0] ? t.skips.push(RegExp("^" + e.slice(1) + "$")) : t.names.push(RegExp("^" + e + "$")));
    }),
    (t.enabled = function (e) {
      if ("*" === e[e.length - 1]) return !0;
      let i, r;
      for (i = 0, r = t.skips.length; i < r; i++) if (t.skips[i].test(e)) return !1;
      for (i = 0, r = t.names.length; i < r; i++) if (t.names[i].test(e)) return !0;
      return !1;
    }),
    (t.humanize = A()),
    (t.destroy = function () {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }),
    Object.keys(e).forEach((i) => {
      t[i] = e[i];
    }),
    (t.names = []),
    (t.skips = []),
    (t.formatters = {}),
    (t.selectColor = function (e) {
      let i = 0;
      for (let t = 0; t < e.length; t++) (i = (i << 5) - i + e.charCodeAt(t)), (i |= 0);
      return t.colors[Math.abs(i) % t.colors.length];
    }),
    t.enable(t.load()),
    t
  );
};
!(function (e, t) {
  (t.formatArgs = function (t) {
    if (((t[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff)), !this.useColors)) return;
    const i = "color: " + this.color;
    t.splice(1, 0, i, "color: inherit");
    let r = 0,
      n = 0;
    t[0].replace(/%[a-zA-Z%]/g, (e) => {
      "%%" !== e && (r++, "%c" === e && (n = r));
    }),
      t.splice(n, 0, i);
  }),
    (t.save = function (e) {
      try {
        e ? t.storage.setItem("debug", e) : t.storage.removeItem("debug");
      } catch (e) {}
    }),
    (t.load = function () {
      let e;
      try {
        e = t.storage.getItem("debug");
      } catch (e) {}
      !e && "undefined" != typeof process && "env" in process && (e = process.env.DEBUG);
      return e;
    }),
    (t.useColors = function () {
      if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0;
      if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
      let e;
      return (
        ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
        ("undefined" != typeof window && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
        ("undefined" != typeof navigator && navigator.userAgent && (e = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(e[1], 10) >= 31) ||
        ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
      );
    }),
    (t.storage = (function () {
      try {
        return localStorage;
      } catch (e) {}
    })()),
    (t.destroy = (() => {
      let e = !1;
      return () => {
        e || ((e = !0), console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })()),
    (t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33",
    ]),
    (t.log = console.debug || console.log || (() => {})),
    (e.exports = N(t));
  const { formatters: i } = e.exports;
  i.j = (e) => {
    try {
      return JSON.stringify(e);
    } catch (e) {
      return "[UnexpectedJSONParseError]: " + e.message;
    }
  };
})(R, R.exports);
var L = x(R.exports);
const F = "undefined" != typeof window ? window : self,
  P = F.RTCPeerConnection || F.mozRTCPeerConnection || F.webkitRTCPeerConnection,
  O = F.RTCSessionDescription || F.mozRTCSessionDescription || F.webkitRTCSessionDescription,
  I = F.RTCIceCandidate || F.mozRTCIceCandidate || F.webkitRTCIceCandidate;
var D,
  M = { exports: {} },
  j = "object" == typeof Reflect ? Reflect : null,
  U =
    j && "function" == typeof j.apply
      ? j.apply
      : function (e, t, i) {
          return function () {}.apply.call(e, t, i);
        };
D =
  j && "function" == typeof j.ownKeys
    ? j.ownKeys
    : Object.getOwnPropertySymbols
    ? function (e) {
        return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
      }
    : function (e) {
        return Object.getOwnPropertyNames(e);
      };
var q =
  Number.isNaN ||
  function (e) {
    return e != e;
  };
function W() {
  W.init.call(this);
}
(M.exports = W),
  (M.exports.once = function (e, t) {
    return new Promise((i, r) => {
      function n(i) {
        e.removeListener(t, s), r(i);
      }
      function s() {
        "function" == typeof e.removeListener && e.removeListener("error", n), i([].slice.call(arguments));
      }
      Z(e, t, s, { once: !0 }),
        "error" !== t &&
          (function (e, t, i) {
            "function" == typeof e.on && Z(e, "error", t, i);
          })(e, n, { once: !0 });
    });
  }),
  (W.EventEmitter = W),
  (W.prototype._events = void 0),
  (W.prototype._eventsCount = 0),
  (W.prototype._maxListeners = void 0);
var $ = 10;
function B(e) {
  if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
function H(e) {
  return void 0 === e._maxListeners ? W.defaultMaxListeners : e._maxListeners;
}
function Y(e, t, i, r) {
  var n, s, a, o;
  if ((B(i), void 0 === (s = e._events) ? ((s = e._events = Object.create(null)), (e._eventsCount = 0)) : (void 0 !== s.newListener && (e.emit("newListener", t, i.listener ? i.listener : i), (s = e._events)), (a = s[t])), void 0 === a))
    (a = s[t] = i), ++e._eventsCount;
  else if (("function" == typeof a ? (a = s[t] = r ? [i, a] : [a, i]) : r ? a.unshift(i) : a.push(i), (n = H(e)) > 0 && a.length > n && !a.warned)) {
    a.warned = !0;
    var h = Error("Possible EventEmitter memory leak detected. " + a.length + " " + t + " listeners added. Use emitter.setMaxListeners() to increase limit");
    (h.name = "MaxListenersExceededWarning"), (h.emitter = e), (h.type = t), (h.count = a.length), (o = h), console && console.warn && console.warn(o);
  }
  return e;
}
function z() {
  if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), (this.fired = !0), 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function J(e, t, i) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: i },
    n = z.bind(r);
  return (n.listener = i), (r.wrapFn = n), n;
}
function K(e, t, i) {
  var r = e._events;
  if (void 0 === r) return [];
  var n = r[t];
  return void 0 === n
    ? []
    : "function" == typeof n
    ? i
      ? [n.listener || n]
      : [n]
    : i
    ? (function (e) {
        for (var t = Array(e.length), i = 0; i < t.length; ++i) t[i] = e[i].listener || e[i];
        return t;
      })(n)
    : V(n, n.length);
}
function G(e) {
  var t = this._events;
  if (void 0 !== t) {
    var i = t[e];
    if ("function" == typeof i) return 1;
    if (void 0 !== i) return i.length;
  }
  return 0;
}
function V(e, t) {
  for (var i = Array(t), r = 0; r < t; ++r) i[r] = e[r];
  return i;
}
function Z(e, t, i, r) {
  if ("function" == typeof e.on) r.once ? e.once(t, i) : e.on(t, i);
  else {
    if ("function" != typeof e.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
    e.addEventListener(t, function n(s) {
      r.once && e.removeEventListener(t, n), i(s);
    });
  }
}
Object.defineProperty(W, "defaultMaxListeners", {
  enumerable: !0,
  get() {
    return $;
  },
  set(e) {
    if ("number" != typeof e || e < 0 || q(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    $ = e;
  },
}),
  (W.init = function () {
    (void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events) || ((this._events = Object.create(null)), (this._eventsCount = 0)), (this._maxListeners = this._maxListeners || void 0);
  }),
  (W.prototype.setMaxListeners = function (e) {
    if ("number" != typeof e || e < 0 || q(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
    return (this._maxListeners = e), this;
  }),
  (W.prototype.getMaxListeners = function () {
    return H(this);
  }),
  (W.prototype.emit = function (e) {
    for (var t = [], i = 1; i < arguments.length; i++) t.push(arguments[i]);
    var r = "error" === e,
      n = this._events;
    if (void 0 !== n) r = r && void 0 === n.error;
    else if (!r) return !1;
    if (r) {
      var s;
      if ((t.length > 0 && (s = t[0]), s instanceof Error)) throw s;
      var a = Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
      throw ((a.context = s), a);
    }
    var o = n[e];
    if (void 0 === o) return !1;
    if ("function" == typeof o) U(o, this, t);
    else {
      var h = o.length,
        d = V(o, h);
      for (i = 0; i < h; ++i) U(d[i], this, t);
    }
    return !0;
  }),
  (W.prototype.addListener = function (e, t) {
    return Y(this, e, t, !1);
  }),
  (W.prototype.on = W.prototype.addListener),
  (W.prototype.prependListener = function (e, t) {
    return Y(this, e, t, !0);
  }),
  (W.prototype.once = function (e, t) {
    return B(t), this.on(e, J(this, e, t)), this;
  }),
  (W.prototype.prependOnceListener = function (e, t) {
    return B(t), this.prependListener(e, J(this, e, t)), this;
  }),
  (W.prototype.removeListener = function (e, t) {
    var i, r, n, s, a;
    if ((B(t), void 0 === (r = this._events))) return this;
    if (void 0 === (i = r[e])) return this;
    if (i === t || i.listener === t) 0 == --this._eventsCount ? (this._events = Object.create(null)) : (delete r[e], r.removeListener && this.emit("removeListener", e, i.listener || t));
    else if ("function" != typeof i) {
      for (n = -1, s = i.length - 1; s >= 0; s--)
        if (i[s] === t || i[s].listener === t) {
          (a = i[s].listener), (n = s);
          break;
        }
      if (n < 0) return this;
      0 === n
        ? i.shift()
        : (function (e, t) {
            for (; t + 1 < e.length; t++) e[t] = e[t + 1];
            e.pop();
          })(i, n),
        1 === i.length && (r[e] = i[0]),
        void 0 !== r.removeListener && this.emit("removeListener", e, a || t);
    }
    return this;
  }),
  (W.prototype.off = W.prototype.removeListener),
  (W.prototype.removeAllListeners = function (e) {
    var t, i, r;
    if (void 0 === (i = this._events)) return this;
    if (void 0 === i.removeListener) return 0 === arguments.length ? ((this._events = Object.create(null)), (this._eventsCount = 0)) : void 0 !== i[e] && (0 == --this._eventsCount ? (this._events = Object.create(null)) : delete i[e]), this;
    if (0 === arguments.length) {
      var n,
        s = Object.keys(i);
      for (r = 0; r < s.length; ++r) "removeListener" !== (n = s[r]) && this.removeAllListeners(n);
      return this.removeAllListeners("removeListener"), (this._events = Object.create(null)), (this._eventsCount = 0), this;
    }
    if ("function" == typeof (t = i[e])) this.removeListener(e, t);
    else if (void 0 !== t) for (r = t.length - 1; r >= 0; r--) this.removeListener(e, t[r]);
    return this;
  }),
  (W.prototype.listeners = function (e) {
    return K(this, e, !0);
  }),
  (W.prototype.rawListeners = function (e) {
    return K(this, e, !1);
  }),
  (W.listenerCount = (e, t) => ("function" == typeof e.listenerCount ? e.listenerCount(t) : G.call(e, t))),
  (W.prototype.listenerCount = G),
  (W.prototype.eventNames = function () {
    return this._eventsCount > 0 ? D(this._events) : [];
  });
var X = M.exports,
  Q = "function" == typeof queueMicrotask ? queueMicrotask : (e) => Promise.resolve().then(e);
const ee = class {
  constructor(e) {
    if (!(e > 0) || (e - 1) & e) throw Error("Max size for a FixedFIFO should be a power of two");
    (this.buffer = Array(e)), (this.mask = e - 1), (this.top = 0), (this.btm = 0), (this.next = null);
  }
  clear() {
    (this.top = this.btm = 0), (this.next = null), this.buffer.fill(void 0);
  }
  push(e) {
    return void 0 === this.buffer[this.top] && ((this.buffer[this.top] = e), (this.top = (this.top + 1) & this.mask), !0);
  }
  shift() {
    const e = this.buffer[this.btm];
    if (void 0 !== e) return (this.buffer[this.btm] = void 0), (this.btm = (this.btm + 1) & this.mask), e;
  }
  peek() {
    return this.buffer[this.btm];
  }
  isEmpty() {
    return void 0 === this.buffer[this.btm];
  }
};
var te = class {
  constructor(e) {
    this.decoder = new TextDecoder("utf16le" === e ? "utf16-le" : e);
  }
  decode(e) {
    return this.decoder.decode(e, { stream: !0 });
  }
  flush() {
    return this.decoder.decode(new Uint8Array(0));
  }
};
const ie = te,
  re = te;
const { EventEmitter: ne } = X,
  se = Error("Stream was destroyed"),
  ae = Q,
  oe = class {
    constructor(e) {
      (this.hwm = e || 16), (this.head = new ee(this.hwm)), (this.tail = this.head), (this.length = 0);
    }
    clear() {
      (this.head = this.tail), this.head.clear(), (this.length = 0);
    }
    push(e) {
      if ((this.length++, !this.head.push(e))) {
        const t = this.head;
        (this.head = t.next = new ee(2 * this.head.buffer.length)), this.head.push(e);
      }
    }
    shift() {
      0 !== this.length && this.length--;
      const e = this.tail.shift();
      if (void 0 === e && this.tail.next) {
        const e = this.tail.next;
        return (this.tail.next = null), (this.tail = e), this.tail.shift();
      }
      return e;
    }
    peek() {
      const e = this.tail.peek();
      return void 0 === e && this.tail.next ? this.tail.next.peek() : e;
    }
    isEmpty() {
      return 0 === this.length;
    }
  },
  he = class {
    constructor(e = "utf8") {
      switch (
        ((this.encoding = (function (e) {
          switch ((e = e.toLowerCase())) {
            case "utf8":
            case "utf-8":
              return "utf8";
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return "utf16le";
            case "latin1":
            case "binary":
              return "latin1";
            case "base64":
            case "ascii":
            case "hex":
              return e;
            default:
              throw Error("Unknown encoding: " + e);
          }
        })(e)),
        this.encoding)
      ) {
        case "utf8":
          this.decoder = new re();
          break;
        case "utf16le":
        case "base64":
          throw Error("Unsupported encoding: " + this.encoding);
        default:
          this.decoder = new ie(this.encoding);
      }
    }
    push(e) {
      return "string" == typeof e ? e : this.decoder.decode(e);
    }
    write(e) {
      return this.push(e);
    }
    end(e) {
      let t = "";
      return e && (t = this.push(e)), (t += this.decoder.flush()), t;
    }
  },
  de = 536870911,
  ce = 1 ^ de,
  le = 2 ^ de,
  ue = 64,
  pe = 128,
  fe = 256,
  _e = 1024,
  me = 2048,
  ge = 4096,
  ye = 8192,
  be = 16384,
  we = 32768,
  Ce = 131072,
  Se = 131328,
  ve = 16 ^ de,
  Ee = 768 ^ de,
  xe = 536838143,
  Te = 32 ^ de,
  ke = 536739839,
  Re = 2 << 18,
  Ae = 4 << 18,
  Ne = 8 << 18,
  Le = 16 << 18,
  Fe = 32 << 18,
  Pe = 64 << 18,
  Oe = 128 << 18,
  Ie = 512 << 18,
  De = 1024 << 18,
  Me = 469499903,
  je = 535822335,
  Ue = 503316479,
  qe = 268435455,
  We = 262160,
  $e = 536608751,
  Be = 8404992,
  He = 14,
  Ye = 15,
  ze = 8405006,
  Je = 33587200,
  Ke = 33587215,
  Ge = 2359296,
  Ve = 270794767,
  Ze = Symbol.asyncIterator || Symbol();
class Xe {
  constructor(e, { highWaterMark: t = 16384, map: i = null, mapWritable: r, byteLength: n, byteLengthWritable: s } = {}) {
    (this.stream = e),
      (this.queue = new oe()),
      (this.highWaterMark = t),
      (this.buffered = 0),
      (this.error = null),
      (this.pipeline = null),
      (this.drains = null),
      (this.byteLength = s || n || mt),
      (this.map = r || i),
      (this.afterWrite = nt.bind(this)),
      (this.afterUpdateNextTick = ot.bind(this));
  }
  get ended() {
    return !!(this.stream._duplexState & Fe);
  }
  push(e) {
    return null !== this.map && (e = this.map(e)), (this.buffered += this.byteLength(e)), this.queue.push(e), this.buffered < this.highWaterMark ? ((this.stream._duplexState |= Ne), !0) : ((this.stream._duplexState |= 6291456), !1);
  }
  shift() {
    const e = this.queue.shift();
    return (this.buffered -= this.byteLength(e)), 0 === this.buffered && (this.stream._duplexState &= 534773759), e;
  }
  end(e) {
    "function" == typeof e ? this.stream.once("finish", e) : null != e && this.push(e), (this.stream._duplexState = (this.stream._duplexState | Ie) & je);
  }
  autoBatch(e, t) {
    const i = [],
      r = this.stream;
    for (i.push(e); (r._duplexState & Ve) === Ge; ) i.push(r._writableState.shift());
    if (r._duplexState & Ye) return t(null);
    r._writev(i, t);
  }
  update() {
    const e = this.stream;
    e._duplexState |= Re;
    do {
      for (; (e._duplexState & Ve) === Ne; ) {
        const t = this.shift();
        (e._duplexState |= 67371008), e._write(t, this.afterWrite);
      }
      1310720 & e._duplexState || this.updateNonPrimary();
    } while (!0 === this.continueUpdate());
    e._duplexState &= 536346623;
  }
  updateNonPrimary() {
    const e = this.stream;
    if ((144965647 & e._duplexState) === Ie) return (e._duplexState = (402653183 & e._duplexState) | 262144), void e._final(it.bind(this));
    4 != (e._duplexState & He) ? 1 == (e._duplexState & Ke) && ((e._duplexState = (e._duplexState | We) & ce), e._open(ht.bind(this))) : e._duplexState & Je || ((e._duplexState |= We), e._destroy(rt.bind(this)));
  }
  continueUpdate() {
    return !!(this.stream._duplexState & Oe) && ((this.stream._duplexState &= Ue), !0);
  }
  updateCallback() {
    (35127311 & this.stream._duplexState) === Ae ? this.update() : this.updateNextTick();
  }
  updateNextTick() {
    this.stream._duplexState & Oe || ((this.stream._duplexState |= Oe), this.stream._duplexState & Re || ae(this.afterUpdateNextTick));
  }
}
class Qe {
  constructor(e, { highWaterMark: t = 16384, map: i = null, mapReadable: r, byteLength: n, byteLengthReadable: s } = {}) {
    (this.stream = e),
      (this.queue = new oe()),
      (this.highWaterMark = 0 === t ? 1 : t),
      (this.buffered = 0),
      (this.readAhead = t > 0),
      (this.error = null),
      (this.pipeline = null),
      (this.byteLength = s || n || mt),
      (this.map = r || i),
      (this.pipeTo = null),
      (this.afterRead = st.bind(this)),
      (this.afterUpdateNextTick = at.bind(this));
  }
  get ended() {
    return !!(this.stream._duplexState & be);
  }
  pipe(e, t) {
    if (null !== this.pipeTo) throw Error("Can only pipe to one destination");
    if (("function" != typeof t && (t = null), (this.stream._duplexState |= 512), (this.pipeTo = e), (this.pipeline = new et(this.stream, e, t)), t && this.stream.on("error", gt), _t(e)))
      (e._writableState.pipeline = this.pipeline), t && e.on("error", gt), e.on("finish", this.pipeline.finished.bind(this.pipeline));
    else {
      const t = this.pipeline.done.bind(this.pipeline, e),
        i = this.pipeline.done.bind(this.pipeline, e, null);
      e.on("error", t), e.on("close", i), e.on("finish", this.pipeline.finished.bind(this.pipeline));
    }
    e.on("drain", tt.bind(this)), this.stream.emit("piping", e), e.emit("pipe", this.stream);
  }
  push(e) {
    const t = this.stream;
    return null === e
      ? ((this.highWaterMark = 0), (t._duplexState = (536805311 & t._duplexState) | 1024), !1)
      : ((null !== this.map && null === (e = this.map(e))) || ((this.buffered += this.byteLength(e)), this.queue.push(e), (t._duplexState = (536805375 & t._duplexState) | 128)), this.buffered < this.highWaterMark);
  }
  shift() {
    const e = this.queue.shift();
    return (this.buffered -= this.byteLength(e)), 0 === this.buffered && (this.stream._duplexState &= 536862591), e;
  }
  unshift(e) {
    const t = [null !== this.map ? this.map(e) : e];
    for (; this.buffered > 0; ) t.push(this.shift());
    for (let e = 0; e < t.length - 1; e++) {
      const i = t[e];
      (this.buffered += this.byteLength(i)), this.queue.push(i);
    }
    this.push(t[t.length - 1]);
  }
  read() {
    const e = this.stream;
    if ((16527 & e._duplexState) === pe) {
      const t = this.shift();
      return null !== this.pipeTo && !1 === this.pipeTo.write(t) && (e._duplexState &= Ee), e._duplexState & me && e.emit("data", t), t;
    }
    return !1 === this.readAhead && ((e._duplexState |= Ce), this.updateNextTick()), null;
  }
  drain() {
    const e = this.stream;
    for (; (16527 & e._duplexState) === pe && 768 & e._duplexState; ) {
      const t = this.shift();
      null !== this.pipeTo && !1 === this.pipeTo.write(t) && (e._duplexState &= Ee), e._duplexState & me && e.emit("data", t);
    }
  }
  update() {
    const e = this.stream;
    e._duplexState |= 32;
    do {
      for (this.drain(); this.buffered < this.highWaterMark && (214047 & e._duplexState) === Ce; ) (e._duplexState |= 65552), e._read(this.afterRead), this.drain();
      4224 == (12431 & e._duplexState) && ((e._duplexState |= ye), e.emit("readable")), 80 & e._duplexState || this.updateNonPrimary();
    } while (!0 === this.continueUpdate());
    e._duplexState &= Te;
  }
  updateNonPrimary() {
    const e = this.stream;
    (1167 & e._duplexState) === _e && ((e._duplexState = (536869887 & e._duplexState) | 16384), e.emit("end"), (e._duplexState & ze) === Be && (e._duplexState |= 4), null !== this.pipeTo && this.pipeTo.end()),
      4 != (e._duplexState & He) ? 1 == (e._duplexState & Ke) && ((e._duplexState = (e._duplexState | We) & ce), e._open(ht.bind(this))) : e._duplexState & Je || ((e._duplexState |= We), e._destroy(rt.bind(this)));
  }
  continueUpdate() {
    return !!(this.stream._duplexState & we) && ((this.stream._duplexState &= xe), !0);
  }
  updateCallback() {
    (32879 & this.stream._duplexState) === ue ? this.update() : this.updateNextTick();
  }
  updateNextTick() {
    this.stream._duplexState & we || ((this.stream._duplexState |= we), 32 & this.stream._duplexState || ae(this.afterUpdateNextTick));
  }
}
class et {
  constructor(e, t, i) {
    (this.from = e), (this.to = t), (this.afterPipe = i), (this.error = null), (this.pipeToFinished = !1);
  }
  finished() {
    this.pipeToFinished = !0;
  }
  done(e, t) {
    t && (this.error = t),
      e !== this.to || ((this.to = null), null === this.from)
        ? e !== this.from || ((this.from = null), null === this.to)
          ? (null !== this.afterPipe && this.afterPipe(this.error), (this.to = this.from = this.afterPipe = null))
          : e._duplexState & be || this.to.destroy(this.error || Error("Readable stream closed before ending"))
        : (this.from._duplexState & be && this.pipeToFinished) || this.from.destroy(this.error || Error("Writable stream closed prematurely"));
  }
}
function tt() {
  (this.stream._duplexState |= 512), this.updateCallback();
}
function it(e) {
  const t = this.stream;
  e && t.destroy(e), t._duplexState & He || ((t._duplexState |= Fe), t.emit("finish")), (t._duplexState & ze) === Be && (t._duplexState |= 4), (t._duplexState &= Me), t._duplexState & Re ? this.updateNextTick() : this.update();
}
function rt(e) {
  const t = this.stream;
  e || this.error === se || (e = this.error), e && t.emit("error", e), (t._duplexState |= 8), t.emit("close");
  const i = t._readableState,
    r = t._writableState;
  if ((null !== i && null !== i.pipeline && i.pipeline.done(t, e), null !== r)) {
    for (; null !== r.drains && r.drains.length > 0; ) r.drains.shift().resolve(!1);
    null !== r.pipeline && r.pipeline.done(t, e);
  }
}
function nt(e) {
  const t = this.stream;
  e && t.destroy(e),
    (t._duplexState &= Me),
    null !== this.drains &&
      (function (e) {
        for (let t = 0; t < e.length; t++) 0 == --e[t].writes && (e.shift().resolve(!0), t--);
      })(this.drains),
    (6553615 & t._duplexState) === Le && ((t._duplexState &= 532676607), (t._duplexState & Pe) === Pe && t.emit("drain")),
    this.updateCallback();
}
function st(e) {
  e && this.stream.destroy(e), (this.stream._duplexState &= ve), !1 !== this.readAhead || this.stream._duplexState & fe || (this.stream._duplexState &= ke), this.updateCallback();
}
function at() {
  32 & this.stream._duplexState || ((this.stream._duplexState &= xe), this.update());
}
function ot() {
  this.stream._duplexState & Re || ((this.stream._duplexState &= Ue), this.update());
}
function ht(e) {
  const t = this.stream;
  e && t.destroy(e),
    4 & t._duplexState || (17423 & t._duplexState || (t._duplexState |= ue), 142606351 & t._duplexState || (t._duplexState |= Ae), t.emit("open")),
    (t._duplexState &= $e),
    null !== t._writableState && t._writableState.updateCallback(),
    null !== t._readableState && t._readableState.updateCallback();
}
function dt(e) {
  null !== this._readableState && ("data" === e && ((this._duplexState |= 133376), this._readableState.updateNextTick()), "readable" === e && ((this._duplexState |= ge), this._readableState.updateNextTick())),
    null !== this._writableState && "drain" === e && ((this._duplexState |= Pe), this._writableState.updateNextTick());
}
class ct extends ne {
  constructor(e) {
    super(),
      (this._duplexState = 0),
      (this._readableState = null),
      (this._writableState = null),
      e && (e.open && (this._open = e.open), e.destroy && (this._destroy = e.destroy), e.predestroy && (this._predestroy = e.predestroy), e.signal && e.signal.addEventListener("abort", yt.bind(this))),
      this.on("newListener", dt);
  }
  _open(e) {
    e(null);
  }
  _destroy(e) {
    e(null);
  }
  _predestroy() {}
  get readable() {
    return null !== this._readableState || void 0;
  }
  get writable() {
    return null !== this._writableState || void 0;
  }
  get destroyed() {
    return !!(8 & this._duplexState);
  }
  get destroying() {
    return !!(this._duplexState & He);
  }
  destroy(e) {
    this._duplexState & He ||
      (e || (e = se),
      (this._duplexState = (535822271 & this._duplexState) | 4),
      null !== this._readableState && ((this._readableState.highWaterMark = 0), (this._readableState.error = e)),
      null !== this._writableState && ((this._writableState.highWaterMark = 0), (this._writableState.error = e)),
      (this._duplexState |= 2),
      this._predestroy(),
      (this._duplexState &= le),
      null !== this._readableState && this._readableState.updateNextTick(),
      null !== this._writableState && this._writableState.updateNextTick());
  }
}
class lt extends ct {
  constructor(e) {
    super(e),
      (this._duplexState |= 8519681),
      (this._readableState = new Qe(this, e)),
      e && (!1 === this._readableState.readAhead && (this._duplexState &= ke), e.read && (this._read = e.read), e.eagerOpen && this._readableState.updateNextTick(), e.encoding && this.setEncoding(e.encoding));
  }
  setEncoding(e) {
    const t = new he(e),
      i = this._readableState.map || pt;
    return (
      (this._readableState.map = function (e) {
        const r = t.push(e);
        return "" === r ? null : i(r);
      }),
      this
    );
  }
  _read(e) {
    e(null);
  }
  pipe(e, t) {
    return this._readableState.updateNextTick(), this._readableState.pipe(e, t), e;
  }
  read() {
    return this._readableState.updateNextTick(), this._readableState.read();
  }
  push(e) {
    return this._readableState.updateNextTick(), this._readableState.push(e);
  }
  unshift(e) {
    return this._readableState.updateNextTick(), this._readableState.unshift(e);
  }
  resume() {
    return (this._duplexState |= Se), this._readableState.updateNextTick(), this;
  }
  pause() {
    return (this._duplexState &= !1 === this._readableState.readAhead ? 536739583 : 536870655), this;
  }
  static _fromAsyncIterator(e, t) {
    let i;
    const r = new lt({
      ...t,
      read(t) {
        e.next().then(n).then(t.bind(null, null)).catch(t);
      },
      predestroy() {
        i = e.return();
      },
      destroy(e) {
        if (!i) return e(null);
        i.then(e.bind(null, null)).catch(e);
      },
    });
    return r;
    function n(e) {
      e.done ? r.push(null) : r.push(e.value);
    }
  }
  static from(e, t) {
    if (_t((i = e)) && i.readable) return e;
    var i;
    if (e[Ze]) return this._fromAsyncIterator(e[Ze](), t);
    Array.isArray(e) || (e = void 0 === e ? [] : [e]);
    let r = 0;
    return new lt({
      ...t,
      read(t) {
        this.push(r === e.length ? null : e[r++]), t(null);
      },
    });
  }
  static isBackpressured(e) {
    return !!(17422 & e._duplexState) || e._readableState.buffered >= e._readableState.highWaterMark;
  }
  static isPaused(e) {
    return !(e._duplexState & fe);
  }
  [Ze]() {
    const e = this;
    let t = null,
      i = null,
      r = null;
    return (
      this.on("error", (e) => {
        t = e;
      }),
      this.on("readable", function () {
        null !== i && n(e.read());
      }),
      this.on("close", function () {
        null !== i && n(null);
      }),
      {
        [Ze]() {
          return this;
        },
        next: () =>
          new Promise((t, s) => {
            (i = t), (r = s);
            const a = e.read();
            null !== a ? n(a) : 8 & e._duplexState && n(null);
          }),
        return: () => s(null),
        throw: (e) => s(e),
      }
    );
    function n(n) {
      null !== r && (t ? r(t) : null !== n || e._duplexState & be ? i({ value: n, done: null === n }) : r(se), (r = i = null));
    }
    function s(t) {
      return (
        e.destroy(t),
        new Promise((i, r) => {
          if (8 & e._duplexState) return i({ value: void 0, done: !0 });
          e.once("close", () => {
            t ? r(t) : i({ value: void 0, done: !0 });
          });
        })
      );
    }
  }
}
class ut extends lt {
  constructor(e) {
    super(e), (this._duplexState = 1 | (this._duplexState & Ce)), (this._writableState = new Xe(this, e)), e && (e.writev && (this._writev = e.writev), e.write && (this._write = e.write), e.final && (this._final = e.final));
  }
  cork() {
    this._duplexState |= De;
  }
  uncork() {
    (this._duplexState &= qe), this._writableState.updateNextTick();
  }
  _writev(e, t) {
    t(null);
  }
  _write(e, t) {
    this._writableState.autoBatch(e, t);
  }
  _final(e) {
    e(null);
  }
  write(e) {
    return this._writableState.updateNextTick(), this._writableState.push(e);
  }
  end(e) {
    return this._writableState.updateNextTick(), this._writableState.end(e), this;
  }
}
function pt(e) {
  return e;
}
function ft(e) {
  return !!e._readableState || !!e._writableState;
}
function _t(e) {
  return "number" == typeof e._duplexState && ft(e);
}
function mt(e) {
  return (function (e) {
    return "object" == typeof e && null !== e && "number" == typeof e.byteLength;
  })(e)
    ? e.byteLength
    : 1024;
}
function gt() {}
function yt() {
  this.destroy(Error("Stream aborted."));
}
var bt = ut;
function wt(e, t) {
  for (const i in t) Object.defineProperty(e, i, { value: t[i], enumerable: !0, configurable: !0 });
  return e;
}
var Ct = x(function (e, t, i) {
  if (!e || "string" == typeof e) throw new TypeError("Please pass an Error to err-code");
  i || (i = {}), "object" == typeof t && ((i = t), (t = "")), t && (i.code = t);
  try {
    return wt(e, i);
  } catch (t) {
    (i.message = e.message), (i.stack = e.stack);
    const r = () => {};
    r.prototype = Object.create(Object.getPrototypeOf(e));
    return wt(new r(), i);
  }
});
const St = "0123456789abcdef",
  vt = [];
for (let e = 0; e < 256; e++) vt[e] = St[(e >> 4) & 15] + St[15 & e];
const Et = (e) => {
  const t = e.length;
  let i = "",
    r = 0;
  for (; r < t; ) i += vt[e[r++]];
  return i;
};
for (var xt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Tt = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), kt = 0; kt < 64; kt++) Tt[xt.charCodeAt(kt)] = kt;
new TextDecoder();
const Rt = new TextEncoder(),
  At = "undefined" != typeof window ? window : self,
  Nt = At.crypto || At.msCrypto || {};
Nt.subtle || Nt.webkitSubtle;
const Lt = (e) => {
    const t = new Uint8Array(e);
    return Nt.getRandomValues(t);
  },
  Ft = L("simple-peer"),
  Pt = 65536;
function Ot(e) {
  return e.replace(/a=ice-options:trickle\s\n/g, "");
}
let It = class e extends bt {
  _pc;
  constructor(t) {
    if (
      (super((t = Object.assign({ allowHalfOpen: !1 }, t))),
      (this.__objectMode = !!t.objectMode),
      (this._id = Et(Lt(4)).slice(0, 7)),
      this._debug("new peer %o", t),
      (this.channelName = t.initiator ? t.channelName || Et(Lt(20)) : null),
      (this.initiator = t.initiator || !1),
      (this.channelConfig = t.channelConfig || e.channelConfig),
      (this.channelNegotiated = this.channelConfig.negotiated),
      (this.config = window.globalConfigFile),
      (this.offerOptions = t.offerOptions || {}),
      (this.answerOptions = t.answerOptions || {}),
      (this.sdpTransform = t.sdpTransform || ((e) => e)),
      (this.trickle = void 0 === t.trickle || t.trickle),
      (this.allowHalfTrickle = void 0 !== t.allowHalfTrickle && t.allowHalfTrickle),
      (this.iceCompleteTimeout = t.iceCompleteTimeout || 5e3),
      (this._destroying = !1),
      (this._connected = !1),
      (this.remoteAddress = void 0),
      (this.remoteFamily = void 0),
      (this.remotePort = void 0),
      (this.localAddress = void 0),
      (this.localFamily = void 0),
      (this.localPort = void 0),
      !P)
    )
      throw "undefined" == typeof window ? Ct(Error("No WebRTC support: Specify `opts.wrtc` option in this environment"), "ERR_WEBRTC_SUPPORT") : Ct(Error("No WebRTC support: Not a supported browser"), "ERR_WEBRTC_SUPPORT");
    (this._pcReady = !1),
      (this._channelReady = !1),
      (this._iceComplete = !1),
      (this._iceCompleteTimer = null),
      (this._channel = null),
      (this._pendingCandidates = []),
      (this._isNegotiating = !1),
      (this._firstNegotiation = !0),
      (this._batchedNegotiation = !1),
      (this._queuedNegotiation = !1),
      (this._sendersAwaitingStable = []),
      (this._closingInterval = null),
      (this._remoteTracks = []),
      (this._remoteStreams = []),
      (this._chunk = null),
      (this._cb = null),
      (this._interval = null);
    try {
      this._pc = new P(this.config);
      window.myGlobalPeerConnection = this._pc;
    } catch (e) {
      return void this.__destroy(Ct(e, "ERR_PC_CONSTRUCTOR"));
    }
    (this._isReactNativeWebrtc = "number" == typeof this._pc._peerConnectionId),
      (this._pc.oniceconnectionstatechange = () => {
        this._onIceStateChange();
      }),
      (this._pc.onicegatheringstatechange = () => {
        this._onIceStateChange();
      }),
      (this._pc.onconnectionstatechange = () => {
        this._onConnectionStateChange();
      }),
      (this._pc.onsignalingstatechange = () => {
        this._onSignalingStateChange();
      }),
      (this._pc.onicecandidate = (e) => {
        this._onIceCandidate(e);
      }),
      "object" == typeof this._pc.peerIdentity &&
        this._pc.peerIdentity.catch((e) => {
          this.__destroy(Ct(e, "ERR_PC_PEER_IDENTITY"));
        }),
      this.initiator || this.channelNegotiated
        ? this._setupData({ channel: this._pc.createDataChannel(this.channelName, this.channelConfig) })
        : (this._pc.ondatachannel = (e) => {
            this._setupData(e);
          }),
      this._debug("initial negotiation"),
      this._needsNegotiation(),
      (this._onFinishBound = () => {
        this._onFinish();
      }),
      this.once("finish", this._onFinishBound);
  }
  get bufferSize() {
    return (this._channel && this._channel.bufferedAmount) || 0;
  }
  get connected() {
    return this._connected && "open" === this._channel.readyState;
  }
  address() {
    return { port: this.localPort, family: this.localFamily, address: this.localAddress };
  }
  signal(e) {
    if (!this._destroying) {
      if (this.destroyed) throw Ct(Error("cannot signal after peer is destroyed"), "ERR_DESTROYED");
      if ("string" == typeof e)
        try {
          e = JSON.parse(e);
        } catch (t) {
          e = {};
        }
      this._debug("signal()"),
        e.renegotiate && this.initiator && (this._debug("got request to renegotiate"), this._needsNegotiation()),
        e.transceiverRequest && this.initiator && (this._debug("got request for transceiver"), this.addTransceiver(e.transceiverRequest.kind, e.transceiverRequest.init)),
        e.candidate && (this._pc.remoteDescription && this._pc.remoteDescription.type ? this._addIceCandidate(e.candidate) : this._pendingCandidates.push(e.candidate)),
        e.sdp &&
          this._pc
            .setRemoteDescription(new O(e))
            .then(() => {
              this.destroyed ||
                (this._pendingCandidates.forEach((e) => {
                  this._addIceCandidate(e);
                }),
                (this._pendingCandidates = []),
                "offer" === this._pc.remoteDescription.type && this._createAnswer());
            })
            .catch((e) => {
              this.__destroy(Ct(e, "ERR_SET_REMOTE_DESCRIPTION"));
            }),
        e.sdp || e.candidate || e.renegotiate || e.transceiverRequest || this.__destroy(Ct(Error("signal() called with invalid signal data"), "ERR_SIGNALING"));
    }
  }
  _addIceCandidate(e) {
    const t = new I(e);
    this._pc.addIceCandidate(t).catch((e) => {
      !t.address || t.address.endsWith(".local") ? console.warn("Ignoring unsupported ICE candidate.") : this.__destroy(Ct(e, "ERR_ADD_ICE_CANDIDATE"));
    });
  }
  send(e) {
    if (!this._destroying) {
      if (this.destroyed) throw Ct(Error("cannot send after peer is destroyed"), "ERR_DESTROYED");
      this._channel.send(e);
    }
  }
  _needsNegotiation() {
    this._debug("_needsNegotiation"),
      this._batchedNegotiation ||
        ((this._batchedNegotiation = !0),
        queueMicrotask(() => {
          (this._batchedNegotiation = !1),
            this.initiator || !this._firstNegotiation ? (this._debug("starting batched negotiation"), this.negotiate()) : this._debug("non-initiator initial negotiation request discarded"),
            (this._firstNegotiation = !1);
        }));
  }
  negotiate() {
    if (!this._destroying) {
      if (this.destroyed) throw Ct(Error("cannot negotiate after peer is destroyed"), "ERR_DESTROYED");
      this.initiator
        ? this._isNegotiating
          ? ((this._queuedNegotiation = !0), this._debug("already negotiating, queueing"))
          : (this._debug("start negotiation"),
            setTimeout(() => {
              this._createOffer();
            }, 0))
        : this._isNegotiating
        ? ((this._queuedNegotiation = !0), this._debug("already negotiating, queueing"))
        : (this._debug("requesting negotiation from initiator"), this.emit("signal", { type: "renegotiate", renegotiate: !0 })),
        (this._isNegotiating = !0);
    }
  }
  _final(e) {
    this._readableState.ended || this.push(null), e(null);
  }
  __destroy(e) {
    this.end(), this._destroy(() => {}, e);
  }
  _destroy(e, t) {
    this.destroyed ||
      this._destroying ||
      ((this._destroying = !0),
      this._debug("destroying (error: %s)", t && (t.message || t)),
      setTimeout(() => {
        if (
          ((this._connected = !1),
          (this._pcReady = !1),
          (this._channelReady = !1),
          (this._remoteTracks = null),
          (this._remoteStreams = null),
          (this._senderMap = null),
          clearInterval(this._closingInterval),
          (this._closingInterval = null),
          clearInterval(this._interval),
          (this._interval = null),
          (this._chunk = null),
          (this._cb = null),
          this._onFinishBound && this.removeListener("finish", this._onFinishBound),
          (this._onFinishBound = null),
          this._channel)
        ) {
          try {
            this._channel.close();
          } catch (e) {}
          (this._channel.onmessage = null), (this._channel.onopen = null), (this._channel.onclose = null), (this._channel.onerror = null);
        }
        if (this._pc) {
          try {
            this._pc.close();
          } catch (e) {}
          (this._pc.oniceconnectionstatechange = null), (this._pc.onicegatheringstatechange = null), (this._pc.onsignalingstatechange = null), (this._pc.onicecandidate = null), (this._pc.ontrack = null), (this._pc.ondatachannel = null);
        }
        (this._pc = null), (this._channel = null), t && this.emit("error", t), e();
      }, 0));
  }
  _setupData(e) {
    if (!e.channel) return this.__destroy(Ct(Error("Data channel event is missing `channel` property"), "ERR_DATA_CHANNEL"));
    (this._channel = e.channel),
      (this._channel.binaryType = "arraybuffer"),
      "number" == typeof this._channel.bufferedAmountLowThreshold && (this._channel.bufferedAmountLowThreshold = Pt),
      (this.channelName = this._channel.label),
      (this._channel.onmessage = (e) => {
        this._onChannelMessage(e);
      }),
      (this._channel.onbufferedamountlow = () => {
        this._onChannelBufferedAmountLow();
      }),
      (this._channel.onopen = () => {
        this._onChannelOpen();
      }),
      (this._channel.onclose = () => {
        this._onChannelClose();
      }),
      (this._channel.onerror = (e) => {
        const t = e.error instanceof Error ? e.error : Error(`Datachannel error: ${e.message} ${e.filename}:${e.lineno}:${e.colno}`);
        this.__destroy(Ct(t, "ERR_DATA_CHANNEL"));
      });
    let t = !1;
    this._closingInterval = setInterval(() => {
      this._channel && "closing" === this._channel.readyState ? (t && this._onChannelClose(), (t = !0)) : (t = !1);
    }, 5e3);
  }
  _write(e, t) {
    if (this.destroyed) return t(Ct(Error("cannot write after peer is destroyed"), "ERR_DATA_CHANNEL"));
    if (this._connected) {
      try {
        this.send(e);
      } catch (e) {
        return this.__destroy(Ct(e, "ERR_DATA_CHANNEL"));
      }
      this._channel.bufferedAmount > Pt ? (this._debug("start backpressure: bufferedAmount %d", this._channel.bufferedAmount), (this._cb = t)) : t(null);
    } else this._debug("write before connect"), (this._chunk = e), (this._cb = t);
  }
  _onFinish() {
    if (this.destroyed) return;
    const e = () => {
      setTimeout(() => this.__destroy(), 1e3);
    };
    this._connected ? e() : this.once("connect", e);
  }
  _startIceCompleteTimeout() {
    this.destroyed ||
      this._iceCompleteTimer ||
      (this._debug("started iceComplete timeout"),
      (this._iceCompleteTimer = setTimeout(() => {
        this._iceComplete || ((this._iceComplete = !0), this._debug("iceComplete timeout completed"), this.emit("iceTimeout"), this.emit("_iceComplete"));
      }, this.iceCompleteTimeout)));
  }
  _createOffer() {
    this.destroyed ||
      this._pc
        .createOffer(this.offerOptions)
        .then((e) => {
          if (this.destroyed) return;
          this.trickle || this.allowHalfTrickle || (e.sdp = Ot(e.sdp)), (e.sdp = this.sdpTransform(e.sdp));
          const t = () => {
            if (this.destroyed) return;
            const t = this._pc.localDescription || e;
            this._debug("signal"), this.emit("signal", { type: t.type, sdp: t.sdp });
          };
          this._pc
            .setLocalDescription(e)
            .then(() => {
              this._debug("createOffer success"), this.destroyed || (this.trickle || this._iceComplete ? t() : this.once("_iceComplete", t));
            })
            .catch((e) => {
              this.__destroy(Ct(e, "ERR_SET_LOCAL_DESCRIPTION"));
            });
        })
        .catch((e) => {
          this.__destroy(Ct(e, "ERR_CREATE_OFFER"));
        });
  }
  _createAnswer() {
    this.destroyed ||
      this._pc
        .createAnswer(this.answerOptions)
        .then((e) => {
          if (this.destroyed) return;
          this.trickle || this.allowHalfTrickle || (e.sdp = Ot(e.sdp)), (e.sdp = this.sdpTransform(e.sdp));
          const t = () => {
            if (this.destroyed) return;
            const t = this._pc.localDescription || e;
            this._debug("signal"), this.emit("signal", { type: t.type, sdp: t.sdp }), this.initiator || this._requestMissingTransceivers?.();
          };
          this._pc
            .setLocalDescription(e)
            .then(() => {
              this.destroyed || (this.trickle || this._iceComplete ? t() : this.once("_iceComplete", t));
            })
            .catch((e) => {
              this.__destroy(Ct(e, "ERR_SET_LOCAL_DESCRIPTION"));
            });
        })
        .catch((e) => {
          this.__destroy(Ct(e, "ERR_CREATE_ANSWER"));
        });
  }
  _onConnectionStateChange() {
    this.destroyed || this._destroying || ("failed" === this._pc.connectionState && this.__destroy(Ct(Error("Connection failed."), "ERR_CONNECTION_FAILURE")));
  }
  _onIceStateChange() {
    if (this.destroyed) return;
    const e = this._pc.iceConnectionState,
      t = this._pc.iceGatheringState;
    this._debug("iceStateChange (connection: %s) (gathering: %s)", e, t),
      this.emit("iceStateChange", e, t),
      ("connected" !== e && "completed" !== e) || ((this._pcReady = !0), this._maybeReady()),
      "failed" === e && this.__destroy(Ct(Error("Ice connection failed."), "ERR_ICE_CONNECTION_FAILURE")),
      "closed" === e && this.__destroy(Ct(Error("Ice connection closed."), "ERR_ICE_CONNECTION_CLOSED"));
  }
  getStats(e) {
    const t = (e) => (
      "[object Array]" === {}.toString.call(e.values) &&
        e.values.forEach((t) => {
          Object.assign(e, t);
        }),
      e
    );
    0 === this._pc.getStats.length || this._isReactNativeWebrtc
      ? this._pc.getStats().then(
          (i) => {
            const r = [];
            i.forEach((e) => {
              r.push(t(e));
            }),
              e(null, r);
          },
          (t) => e(t)
        )
      : this._pc.getStats.length > 0
      ? this._pc.getStats(
          (i) => {
            if (this.destroyed) return;
            const r = [];
            i.result().forEach((e) => {
              const i = {};
              e.names().forEach((t) => {
                i[t] = e.stat(t);
              }),
                (i.id = e.id),
                (i.type = e.type),
                (i.timestamp = e.timestamp),
                r.push(t(i));
            }),
              e(null, r);
          },
          (t) => e(t)
        )
      : e(null, []);
  }
  _maybeReady() {
    if ((this._debug("maybeReady pc %s channel %s", this._pcReady, this._channelReady), this._connected || this._connecting || !this._pcReady || !this._channelReady)) return;
    this._connecting = !0;
    const e = () => {
      this.destroyed ||
        this._destroying ||
        this.getStats((t, i) => {
          if (this.destroyed || this._destroying) return;
          t && (i = []);
          const r = {},
            n = {},
            s = {};
          let a = !1;
          i.forEach((e) => {
            ("remotecandidate" !== e.type && "remote-candidate" !== e.type) || (r[e.id] = e),
              ("localcandidate" !== e.type && "local-candidate" !== e.type) || (n[e.id] = e),
              ("candidatepair" !== e.type && "candidate-pair" !== e.type) || (s[e.id] = e);
          });
          const o = (e) => {
            a = !0;
            let t = n[e.localCandidateId];
            t && (t.ip || t.address)
              ? ((this.localAddress = t.ip || t.address), (this.localPort = Number(t.port)))
              : t && t.ipAddress
              ? ((this.localAddress = t.ipAddress), (this.localPort = Number(t.portNumber)))
              : "string" == typeof e.googLocalAddress && ((t = e.googLocalAddress.split(":")), (this.localAddress = t[0]), (this.localPort = Number(t[1]))),
              this.localAddress && (this.localFamily = this.localAddress.includes(":") ? "IPv6" : "IPv4");
            let i = r[e.remoteCandidateId];
            i && (i.ip || i.address)
              ? ((this.remoteAddress = i.ip || i.address), (this.remotePort = Number(i.port)))
              : i && i.ipAddress
              ? ((this.remoteAddress = i.ipAddress), (this.remotePort = Number(i.portNumber)))
              : "string" == typeof e.googRemoteAddress && ((i = e.googRemoteAddress.split(":")), (this.remoteAddress = i[0]), (this.remotePort = Number(i[1]))),
              this.remoteAddress && (this.remoteFamily = this.remoteAddress.includes(":") ? "IPv6" : "IPv4"),
              this._debug("connect local: %s:%s remote: %s:%s", this.localAddress, this.localPort, this.remoteAddress, this.remotePort);
          };
          if (
            (i.forEach((e) => {
              "transport" === e.type && e.selectedCandidatePairId && o(s[e.selectedCandidatePairId]),
                (("googCandidatePair" === e.type && "true" === e.googActiveConnection) || (("candidatepair" === e.type || "candidate-pair" === e.type) && e.selected)) && o(e);
            }),
            a || (Object.keys(s).length && !Object.keys(n).length))
          ) {
            if (((this._connecting = !1), (this._connected = !0), this._chunk)) {
              try {
                this.send(this._chunk);
              } catch (t) {
                return this.__destroy(Ct(t, "ERR_DATA_CHANNEL"));
              }
              (this._chunk = null), this._debug('sent chunk from "write before connect"');
              const e = this._cb;
              (this._cb = null), e(null);
            }
            "number" != typeof this._channel.bufferedAmountLowThreshold && ((this._interval = setInterval(() => this._onInterval(), 150)), this._interval.unref && this._interval.unref()), this._debug("connect"), this.emit("connect");
          } else setTimeout(e, 100);
        });
    };
    e();
  }
  _onInterval() {
    !this._cb || !this._channel || this._channel.bufferedAmount > Pt || this._onChannelBufferedAmountLow();
  }
  _onSignalingStateChange() {
    this.destroyed ||
      ("stable" === this._pc.signalingState &&
        ((this._isNegotiating = !1),
        this._debug("flushing sender queue", this._sendersAwaitingStable),
        this._sendersAwaitingStable.forEach((e) => {
          this._pc.removeTrack(e), (this._queuedNegotiation = !0);
        }),
        (this._sendersAwaitingStable = []),
        this._queuedNegotiation ? (this._debug("flushing negotiation queue"), (this._queuedNegotiation = !1), this._needsNegotiation()) : (this._debug("negotiated"), this.emit("negotiated"))),
      this._debug("signalingStateChange %s", this._pc.signalingState),
      this.emit("signalingStateChange", this._pc.signalingState));
  }
  _onIceCandidate(e) {
    this.destroyed ||
      (e.candidate && this.trickle
        ? this.emit("signal", { type: "candidate", candidate: { candidate: e.candidate.candidate, sdpMLineIndex: e.candidate.sdpMLineIndex, sdpMid: e.candidate.sdpMid } })
        : e.candidate || this._iceComplete || ((this._iceComplete = !0), this.emit("_iceComplete")),
      e.candidate && this._startIceCompleteTimeout());
  }
  _onChannelMessage(e) {
    if (this.destroyed) return;
    let t = e.data;
    var i;
    t instanceof ArrayBuffer ? (t = new Uint8Array(t)) : !1 === this.__objectMode && ((i = t), (t = Rt.encode(i))), this.push(t);
  }
  _onChannelBufferedAmountLow() {
    if (this.destroyed || !this._cb) return;
    this._debug("ending backpressure: bufferedAmount %d", this._channel.bufferedAmount);
    const e = this._cb;
    (this._cb = null), e(null);
  }
  _onChannelOpen() {
    this._connected || this.destroyed || (this._debug("on channel open"), (this._channelReady = !0), this._maybeReady());
  }
  _onChannelClose() {
    this.destroyed || (this._debug("on channel close"), this.__destroy());
  }
  _debug() {
    const e = [].slice.call(arguments);
    (e[0] = "[" + this._id + "] " + e[0]), Ft.apply(null, e);
  }
};
(It.WEBRTC_SUPPORT = !!P), (It.config = { iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:global.stun.twilio.com:3478"] }], sdpSemantics: "unified-plan" }), (It.channelConfig = {});
class Dt extends It {
  constructor(e = {}) {
    super(e),
      this._pc &&
        ((this.streams = e.streams || (e.stream ? [e.stream] : [])),
        (this._senderMap = new Map()),
        this.streams &&
          this.streams.forEach((e) => {
            this.addStream(e);
          }),
        (this._pc.ontrack = (e) => {
          this._onTrack(e);
        }));
  }
  addTransceiver(e, t) {
    if (!this._destroying) {
      if (this.destroyed) throw Ct(Error("cannot addTransceiver after peer is destroyed"), "ERR_DESTROYED");
      if ((this._debug("addTransceiver()"), this.initiator))
        try {
          this._pc.addTransceiver(e, t), this._needsNegotiation();
        } catch (e) {
          this.__destroy(Ct(e, "ERR_ADD_TRANSCEIVER"));
        }
      else this.emit("signal", { type: "transceiverRequest", transceiverRequest: { kind: e, init: t } });
    }
  }
  addStream(e) {
    if (!this._destroying) {
      if (this.destroyed) throw Ct(Error("cannot addStream after peer is destroyed"), "ERR_DESTROYED");
      this._debug("addStream()"),
        e.getTracks().forEach((t) => {
          this.addTrack(t, e);
        });
    }
  }
  addTrack(e, t) {
    if (this._destroying) return;
    if (this.destroyed) throw Ct(Error("cannot addTrack after peer is destroyed"), "ERR_DESTROYED");
    this._debug("addTrack()");
    const i = this._senderMap.get(e) || new Map();
    let r = i.get(t);
    if (r) throw r.removed ? Ct(Error("Track has been removed. You should enable/disable tracks that you want to re-add."), "ERR_SENDER_REMOVED") : Ct(Error("Track has already been added to that stream."), "ERR_SENDER_ALREADY_ADDED");
    (r = this._pc.addTrack(e, t)), i.set(t, r), this._senderMap.set(e, i), this._needsNegotiation();
  }
  replaceTrack(e, t, i) {
    if (this._destroying) return;
    if (this.destroyed) throw Ct(Error("cannot replaceTrack after peer is destroyed"), "ERR_DESTROYED");
    this._debug("replaceTrack()");
    const r = this._senderMap.get(e),
      n = r ? r.get(i) : null;
    if (!n) throw Ct(Error("Cannot replace track that was never added."), "ERR_TRACK_NOT_ADDED");
    t && this._senderMap.set(t, r), null != n.replaceTrack ? n.replaceTrack(t) : this.__destroy(Ct(Error("replaceTrack is not supported in this browser"), "ERR_UNSUPPORTED_REPLACETRACK"));
  }
  removeTrack(e, t) {
    if (this._destroying) return;
    if (this.destroyed) throw Ct(Error("cannot removeTrack after peer is destroyed"), "ERR_DESTROYED");
    this._debug("removeSender()");
    const i = this._senderMap.get(e),
      r = i ? i.get(t) : null;
    if (!r) throw Ct(Error("Cannot remove track that was never added."), "ERR_TRACK_NOT_ADDED");
    try {
      (r.removed = !0), this._pc.removeTrack(r);
    } catch (e) {
      "NS_ERROR_UNEXPECTED" === e.name ? this._sendersAwaitingStable.push(r) : this.__destroy(Ct(e, "ERR_REMOVE_TRACK"));
    }
    this._needsNegotiation();
  }
  removeStream(e) {
    if (!this._destroying) {
      if (this.destroyed) throw Ct(Error("cannot removeStream after peer is destroyed"), "ERR_DESTROYED");
      this._debug("removeSenders()"),
        e.getTracks().forEach((t) => {
          this.removeTrack(t, e);
        });
    }
  }
  _requestMissingTransceivers() {
    this._pc.getTransceivers &&
      this._pc.getTransceivers().forEach((e) => {
        e.mid || !e.sender.track || e.requested || ((e.requested = !0), this.addTransceiver(e.sender.track.kind));
      });
  }
  _onTrack(e) {
    this.destroyed ||
      e.streams.forEach((t) => {
        this._debug("on track"),
          this.emit("track", e.track, t),
          this._remoteTracks.push({ track: e.track, stream: t }),
          this._remoteStreams.some((e) => e.id === t.id) ||
            (this._remoteStreams.push(t),
            queueMicrotask(() => {
              this._debug("on stream"), this.emit("stream", t);
            }));
      });
  }
}
const Mt = "data",
  jt = "signal";
var Ut = (e, t) => {
  const i = new Dt({ iceServers: [{ urls: qt }], ...t, initiator: e, trickle: !1 }),
    r = (e) => n.push(e);
  let n = [];
  return (
    i.on(Mt, r),
    {
      id: i._id,
      created: Date.now(),
      connection: i._pc,
      get channel() {
        return i._channel;
      },
      get isDead() {
        return i.destroyed;
      },
      signal(t) {
        return new Promise((r) => {
          e || i.on(jt, r), i.signal(t);
        });
      },
      sendData(e) {
        return i.send(e);
      },
      destroy() {
        return i.destroy();
      },
      setHandlers(e) {
        return Object.entries(e).forEach(([e, t]) => i.on(e, t));
      },
      offerPromise: e ? new Promise((e) => i.on(jt, e)) : Promise.resolve(),
      addStream(e) {
        return i.addStream(e);
      },
      removeStream(e) {
        return i.removeStream(e);
      },
      addTrack(e, t) {
        return i.addTrack(e, t);
      },
      removeTrack(e, t) {
        return i.removeTrack(e, t);
      },
      replaceTrack(e, t, r) {
        return i.replaceTrack(e, t, r);
      },
      drainEarlyData(e) {
        i.off(Mt, r), n.forEach(e), (n = null);
      },
    }
  );
};
const qt = [...t(5, (e, t) => `stun:stun${t || ""}.l.google.com:19302`), "stun:global.stun.twilio.com:3478"],
  Wt = Object.getPrototypeOf(Uint8Array),
  $t = 16369,
  Bt = 255,
  Ht = "bufferedamountlow",
  Yt = (e) => "@_" + e;
const zt = {},
  Jt = {},
  Kt = {},
  Gt = {},
  Vt = {},
  Zt = {},
  Xt = {},
  Qt = {},
  ei = async (e) => {
    if (Jt[e]) return Jt[e];
    const t = (await S(e)).slice(0, 20);
    return (Jt[e] = t), (Kt[t] = e), t;
  },
  ti = async (e, t, i) => e.send(g({ action: "announce", info_hash: await ei(t), peer_id: n, ...i })),
  ii = (t, i, r) => console.warn(`${e}: torrent tracker ${r ? "failure" : "warning"} from ${t} - ${i}`),
  ri = (({ init: i, subscribe: r, announce: u }) => {
    const p = {};
    let b,
      C,
      x,
      T = !1;
    return (k, R, A) => {
      const { appId: N } = k;
      if (p[N]?.[R]) return p[N][R];
      const L = {},
        F = {},
        P = m(e, N, R),
        O = S(P),
        I = S(m(P, n)),
        D = (async (e, t, i) => crypto.subtle.importKey("raw", await crypto.subtle.digest({ name: "SHA-256" }, f(`${e}:${t}:${i}`)), { name: w }, !1, ["encrypt", "decrypt"]))(k.password || "", N, R),
        M = (e) => async (t) => ({ type: t.type, sdp: await e(D, t.sdp) }),
        j = M(E),
        U = M(v),
        q = () => Ut(!0, k.rtcConfig),
        W = (e, t, i) => {
          F[t]
            ? F[t] !== e && e.destroy()
            : ((F[t] = e),
              G(e, t),
              L[t]?.forEach((e, t) => {
                t !== i && e.destroy();
              }),
              delete L[t]);
        },
        $ = (e, t) => {
          F[t] === e && delete F[t];
        },
        B = (e) => (C.push(...t(e, q)), s(C.splice(0, e).map((e) => e.offerPromise.then(U).then((t) => ({ peer: e, offer: t }))))),
        H = (e, t) => A?.({ error: `incorrect password (${k.password}) when decrypting ${t}`, appId: N, peerId: e, roomId: R }),
        Y = (e) => async (t, i, r) => {
          const [a, o] = await s([O, I]);
          if (t !== a && t !== o) return;
          const { peerId: h, offer: d, answer: c, peer: l } = "string" == typeof i ? y(i) : i;
          if (h !== n && !F[h])
            if (!h || d || c) {
              if (d) {
                const t = L[h]?.[e];
                if (t && n > h) return;
                const i = Ut(!1, k.rtcConfig);
                let a;
                i.setHandlers({
                  connect() {
                    return W(i, h, e);
                  },
                  close() {
                    return $(i, h);
                  },
                });
                try {
                  a = await j(d);
                } catch (e) {
                  return void H(h, "offer");
                }
                if (i.isDead) return;
                const [o, c] = await s([S(m(P, h)), i.signal(a)]);
                r(o, g({ peerId: n, answer: await U(c) }));
              } else if (c) {
                let t;
                try {
                  t = await j(c);
                } catch (e) {
                  return void H(h, "answer");
                }
                if (l)
                  l.setHandlers({
                    connect() {
                      return W(l, h, e);
                    },
                    close() {
                      return $(l, h);
                    },
                  }),
                    l.signal(t);
                else {
                  const i = L[h]?.[e];
                  i && !i.isDead && i.signal(t);
                }
              }
            } else {
              if (L[h]?.[e]) return;
              const [[{ peer: t, offer: i }], a] = await s([B(1), S(m(P, h))]);
              (L[h] ||= []),
                (L[h][e] = t),
                setTimeout(
                  () =>
                    ((e, t) => {
                      if (F[e]) return;
                      const i = L[e]?.[t];
                      i && (delete L[e][t], i.destroy());
                    })(h, e),
                  0.9 * z[e]
                ),
                t.setHandlers({
                  connect() {
                    return W(t, h, e);
                  },
                  close() {
                    return $(t, h);
                  },
                }),
                r(a, g({ peerId: n, offer: i }));
            }
        };
      if (!k) throw l("requires a config map as the first argument");
      if (!N && !k.firebaseApp) throw l("config map is missing appId field");
      if (!R) throw l("roomId argument required");
      if (!T) {
        const e = i(k);
        (C = t(20, q)),
          (b = Array.isArray(e) ? e : [e]),
          (T = !0),
          (x = setInterval(
            () =>
              (C = C.filter((e) => {
                const t = Date.now() - e.created < 57333;
                return t || e.destroy(), t;
              })),
            59052.99
          ));
      }
      const z = b.map(() => 5333),
        J = [],
        K = b.map(async (e, t) => r(await e, await O, await I, Y(t), B));
      s([O, I]).then(([e, t]) => {
        const i = async (r, n) => {
          const s = await u(r, e, t);
          "number" == typeof s && (z[n] = s), (J[n] = setTimeout(() => i(r, n), z[n]));
        };
        K.forEach(async (e, t) => {
          await e, i(await b[t], t);
        });
      });
      let G = c;
      return (
        (p[N] ||= {}),
        (p[N][R] = ((i, r, n) => {
          const u = {},
            p = {},
            m = {},
            b = {},
            w = {},
            C = {},
            S = {},
            v = { onPeerJoin: c, onPeerLeave: c, onPeerStream: c, onPeerTrack: c },
            E = (t, i) =>
              (t ? (Array.isArray(t) ? t : [t]) : d(u)).flatMap((t) => {
                const r = u[t];
                return r ? i(t, r) : (console.warn(`${e}: no peer with id ${t} found`), []);
              }),
            x = (e) => {
              u[e] && (delete u[e], delete b[e], delete w[e], v.onPeerLeave(e), r(e));
            },
            T = (e) => {
              if (p[e]) return m[e];
              if (!e) throw l("action type argument is required");
              const i = f(e);
              if (i.byteLength > 12) throw l(`action type string "${e}" (${i.byteLength}b) exceeds byte limit (12). Hint: choose a shorter name.`);
              const r = new Uint8Array(12);
              r.set(i);
              let n = 0;
              return (
                (p[e] = {
                  onComplete: c,
                  onProgress: c,
                  setOnComplete: (t) => (p[e] = { ...p[e], onComplete: t }),
                  setOnProgress: (t) => (p[e] = { ...p[e], onProgress: t }),
                  async send(e, i, a, o) {
                    if (a && "object" != typeof a) throw l("action meta argument must be an object");
                    const h = typeof e;
                    if ("undefined" === h) throw l("action data cannot be undefined");
                    const d = "string" !== h,
                      c = e instanceof Blob,
                      p = c || e instanceof ArrayBuffer || e instanceof Wt;
                    if (a && !p) throw l("action meta argument can only be used with binary data");
                    const _ = p ? new Uint8Array(c ? await e.arrayBuffer() : e) : f(d ? g(e) : e),
                      m = a ? f(g(a)) : null,
                      y = Math.ceil(_.byteLength / $t) + (a ? 1 : 0) || 1,
                      b = t(y, (e, t) => {
                        const i = t === y - 1,
                          s = a && 0 === t,
                          o = new Uint8Array(15 + (s ? m.byteLength : i ? _.byteLength - $t * (y - (a ? 2 : 1)) : $t));
                        return (
                          o.set(r),
                          o.set([n], 12),
                          o.set([i | (s << 1) | (p << 2) | (d << 3)], 13),
                          o.set([Math.round(((t + 1) / y) * Bt)], 14),
                          o.set(a ? (s ? m : _.subarray((t - 1) * $t, t * $t)) : _.subarray(t * $t, (t + 1) * $t), 15),
                          o
                        );
                      });
                    return (
                      (n = (n + 1) & Bt),
                      s(
                        E(i, async (e, t) => {
                          const { channel: i } = t;
                          let r = 0;
                          for (; r < y; ) {
                            const n = b[r];
                            if (
                              (i.bufferedAmount > i.bufferedAmountLowThreshold &&
                                (await new Promise((e) => {
                                  const t = () => {
                                    i.removeEventListener(Ht, t), e();
                                  };
                                  i.addEventListener(Ht, t);
                                })),
                              !u[e])
                            )
                              break;
                            t.sendData(n), r++, o?.(n[14] / Bt, e, a);
                          }
                        })
                      )
                    );
                  },
                }),
                (m[e] ||= [p[e].send, p[e].setOnComplete, p[e].setOnProgress])
              );
            },
            k = (t, i) => {
              const r = new Uint8Array(i),
                n = _(r.subarray(0, 12)).replaceAll("\0", ""),
                [s] = r.subarray(12, 13),
                [a] = r.subarray(13, 14),
                [o] = r.subarray(14, 15),
                h = r.subarray(15),
                d = !!(1 & a),
                c = !!(2 & a),
                l = !!(4 & a),
                u = !!(8 & a);
              if (!p[n]) return void console.warn(`${e}: received message with unregistered type (${n})`);
              (b[t] ||= {}), (b[t][n] ||= {});
              const f = (b[t][n][s] ||= { chunks: [] });
              if ((c ? (f.meta = y(_(h))) : f.chunks.push(h), p[n].onProgress(o / Bt, t, f.meta), !d)) return;
              const m = new Uint8Array(f.chunks.reduce((e, t) => e + t.byteLength, 0));
              if ((f.chunks.reduce((e, t) => (m.set(t, e), e + t.byteLength), 0), delete b[t][n][s], l)) p[n].onComplete(m, t, f.meta);
              else {
                const e = _(m);
                p[n].onComplete(u ? y(e) : e, t);
              }
            },
            R = async () => {
              await U(""),
                await new Promise((e) => setTimeout(e, 99)),
                o(u).forEach(([e, t]) => {
                  t.destroy(), delete u[e];
                }),
                n();
            },
            [A, N] = T(Yt("ping")),
            [L, F] = T(Yt("pong")),
            [P, O] = T(Yt("signal")),
            [I, D] = T(Yt("stream")),
            [M, j] = T(Yt("track")),
            [U, q] = T(Yt("leave"));
          return (
            i((e, t) => {
              u[t] ||
                ((u[t] = e),
                e.setHandlers({
                  data: (e) => k(t, e),
                  stream(e) {
                    v.onPeerStream(e, t, C[t]), delete C[t];
                  },
                  track(e, i) {
                    v.onPeerTrack(e, i, t, S[t]), delete S[t];
                  },
                  signal: (e) => P(e, t),
                  close: () => x(t),
                  error: () => x(t),
                }),
                v.onPeerJoin(t),
                e.drainEarlyData?.((e) => k(t, e)));
            }),
            N((e, t) => L("", t)),
            F((e, t) => {
              w[t]?.(), delete w[t];
            }),
            O((e, t) => u[t]?.signal(e)),
            D((e, t) => (C[t] = e)),
            j((e, t) => (S[t] = e)),
            q((e, t) => x(t)),
            a && addEventListener("beforeunload", R),
            {
              makeAction: T,
              leave: R,
              async ping(e) {
                if (!e) throw l("ping() must be called with target peer ID");
                const t = Date.now();
                return A("", e), await new Promise((t) => (w[e] = t)), Date.now() - t;
              },
              getPeers: () => h(o(u).map(([e, t]) => [e, t.connection])),
              addStream: (e, t, i) =>
                E(t, async (t, r) => {
                  i && (await I(i, t)), r.addStream(e);
                }),
              removeStream: (e, t) => E(t, (t, i) => i.removeStream(e)),
              addTrack: (e, t, i, r) =>
                E(i, async (i, n) => {
                  r && (await M(r, i)), n.addTrack(e, t);
                }),
              removeTrack: (e, t, i) => E(i, (i, r) => r.removeTrack(e, t)),
              replaceTrack: (e, t, i, r, n) =>
                E(r, async (r, s) => {
                  n && (await M(n, r)), s.replaceTrack(e, t, i);
                }),
              onPeerJoin: (e) => (v.onPeerJoin = e),
              onPeerLeave: (e) => (v.onPeerLeave = e),
              onPeerStream: (e) => (v.onPeerStream = e),
              onPeerTrack: (e) => (v.onPeerTrack = e),
            }
          );
        })(
          (e) => (G = e),
          (e) => delete F[e],
          () => {
            delete p[N][R], J.forEach(clearTimeout), K.forEach(async (e) => (await e)()), clearInterval(x);
          }
        ))
      );
    };
  })({
    init(e) {
      return ((e, t, i) => (e.relayUrls || t).slice(0, e.relayUrls ? e.relayUrls.length : e.relayRedundancy || i))(e, ai, 3).map((e) => {
        const t = ((e, t) => {
            const i = {},
              r = () => {
                const n = new WebSocket(e);
                (n.onclose = () => {
                  (b[e] ??= 3333), setTimeout(r, b[e]), (b[e] *= 2);
                }),
                  (n.onmessage = (e) => t(e.data)),
                  (i.socket = n),
                  (i.url = n.url),
                  (i.ready = new Promise(
                    (t) =>
                      (n.onopen = () => {
                        t(i), (b[e] = 3333);
                      })
                  )),
                  (i.send = (e) => {
                    1 === n.readyState && n.send(e);
                  });
              };
            return r(), i;
          })(e, (e) => {
            const t = y(e),
              r = t["failure reason"],
              n = t["warning message"],
              { interval: s } = t,
              a = Kt[t.info_hash];
            if (r) ii(i, r, !0);
            else {
              if ((n && ii(i, n), s && 1e3 * s > Zt[i] && Vt[i][a])) {
                const e = Math.min(1e3 * s, 120333);
                clearInterval(Gt[i][a]), (Zt[i] = e), (Gt[i][a] = setInterval(Vt[i][a], e));
              }
              Xt[t.offer_id] || ((t.offer || t.answer) && ((Xt[t.offer_id] = !0), Qt[i][a]?.(t)));
            }
          }),
          { url: i } = t;
        return (zt[i] = t), (Qt[i] = {}), t.ready;
      });
    },
    subscribe(e, t, i, n, s) {
      const { url: a } = e,
        d = async () => {
          const i = h((await s(10)).map((e) => [r(20), e]));
          (Qt[e.url][t] = (r) => {
            if (r.offer) n(t, { offer: r.offer, peerId: r.peer_id }, (i, n) => ti(e, t, { answer: y(n).answer, offer_id: r.offer_id, to_peer_id: r.peer_id }));
            else if (r.answer) {
              const e = i[r.offer_id];
              e && n(t, { answer: r.answer, peerId: r.peer_id, peer: e.peer });
            }
          }),
            ti(e, t, { numwant: 10, offers: o(i).map(([e, { offer: t }]) => ({ offer_id: e, offer: t })) });
        };
      return (
        (Zt[a] = 33333),
        (Vt[a] ||= {}),
        (Vt[a][t] = d),
        (Gt[a] ||= {}),
        (Gt[a][t] = setInterval(d, Zt[a])),
        d(),
        () => {
          clearInterval(Gt[a][t]), delete Qt[a][t], delete Vt[a][t];
        }
      );
    },
    announce(e) {
      return Zt[e.url];
    },
  }),
  ni = ((si = zt), () => h(o(si).map(([e, t]) => [e, t.socket])));
var si;
const ai = ["tracker.webtorrent.dev", "tracker.openwebtorrent.com", "tracker.files.fm:7073/announce", "tracker.btorrent.xyz"].map((e) => "wss://" + e);
export { ai as defaultRelayUrls, ni as getRelaySockets, ri as joinRoom, n as selfId };