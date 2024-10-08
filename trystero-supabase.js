class e extends Error {
  constructor(e, t = "FunctionsError", s) {
    super(e), (this.name = t), (this.context = s);
  }
}
class t extends e {
  constructor(e) {
    super("Failed to send a request to the Edge Function", "FunctionsFetchError", e);
  }
}
class s extends e {
  constructor(e) {
    super("Relay Error invoking the Edge Function", "FunctionsRelayError", e);
  }
}
class r extends e {
  constructor(e) {
    super("Edge Function returned a non-2xx status code", "FunctionsHttpError", e);
  }
}
var i;
((e) => {
  (e.Any = "any"),
    (e.ApNortheast1 = "ap-northeast-1"),
    (e.ApNortheast2 = "ap-northeast-2"),
    (e.ApSouth1 = "ap-south-1"),
    (e.ApSoutheast1 = "ap-southeast-1"),
    (e.ApSoutheast2 = "ap-southeast-2"),
    (e.CaCentral1 = "ca-central-1"),
    (e.EuCentral1 = "eu-central-1"),
    (e.EuWest1 = "eu-west-1"),
    (e.EuWest2 = "eu-west-2"),
    (e.EuWest3 = "eu-west-3"),
    (e.SaEast1 = "sa-east-1"),
    (e.UsEast1 = "us-east-1"),
    (e.UsWest1 = "us-west-1"),
    (e.UsWest2 = "us-west-2");
})(i || (i = {}));
var n = (e, t, s, r) =>
  new (s || (s = Promise))((i, n) => {
    function a(e) {
      try {
        h(r.next(e));
      } catch (e) {
        n(e);
      }
    }
    function o(e) {
      try {
        h(r.throw(e));
      } catch (e) {
        n(e);
      }
    }
    function h(e) {
      var t;
      e.done
        ? i(e.value)
        : ((t = e.value),
          t instanceof s
            ? t
            : new s((e) => {
                e(t);
              })).then(a, o);
    }
    h((r = r.apply(e, t || [])).next());
  });
class a {
  constructor(e, { headers: t = {}, customFetch: s, region: r = i.Any } = {}) {
    (this.url = e),
      (this.headers = t),
      (this.region = r),
      (this.fetch = ((e) => {
        let t;
        return (
          (t =
            e ||
            ("undefined" == typeof fetch
              ? (...e) =>
                  Promise.resolve()
                    .then(() => S)
                    .then(({ default: t }) => t(...e))
              : fetch)),
          (...e) => t(...e)
        );
      })(s));
  }
  setAuth(e) {
    this.headers.Authorization = "Bearer " + e;
  }
  invoke(e, i = {}) {
    var a;
    return n(this, void 0, void 0, function* () {
      try {
        const { headers: n, method: o, body: h } = i;
        let l,
          c = {},
          { region: d } = i;
        d || (d = this.region),
          d && "any" !== d && (c["x-region"] = d),
          h &&
            ((n && !{}.hasOwnProperty.call(n, "Content-Type")) || !n) &&
            (("undefined" != typeof Blob && h instanceof Blob) || h instanceof ArrayBuffer
              ? ((c["Content-Type"] = "application/octet-stream"), (l = h))
              : "string" == typeof h
              ? ((c["Content-Type"] = "text/plain"), (l = h))
              : "undefined" != typeof FormData && h instanceof FormData
              ? (l = h)
              : ((c["Content-Type"] = "application/json"), (l = JSON.stringify(h))));
        const u = yield this.fetch(`${this.url}/${e}`, { method: o || "POST", headers: Object.assign(Object.assign(Object.assign({}, c), this.headers), n), body: l }).catch((e) => {
            throw new t(e);
          }),
          p = u.headers.get("x-relay-error");
        if (p && "true" === p) throw new s(u);
        if (!u.ok) throw new r(u);
        let f,
          _ = (null !== (a = u.headers.get("Content-Type")) && void 0 !== a ? a : "text/plain").split(";")[0].trim();
        return (
          (f = "application/json" === _ ? yield u.json() : "application/octet-stream" === _ ? yield u.blob() : "text/event-stream" === _ ? u : "multipart/form-data" === _ ? yield u.formData() : yield u.text()), { data: f, error: null }
        );
      } catch (e) {
        return { data: null, error: e };
      }
    });
  }
}
var o = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
function h(e) {
  return e && e.__esModule && {}.hasOwnProperty.call(e, "default") ? e.default : e;
}
function l(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if ("function" == typeof t) {
    var s = function e() {
      return this instanceof e ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    s.prototype = t.prototype;
  } else s = {};
  return (
    Object.defineProperty(s, "__esModule", { value: !0 }),
    Object.keys(e).forEach((t) => {
      var r = Object.getOwnPropertyDescriptor(e, t);
      Object.defineProperty(
        s,
        t,
        r.get
          ? r
          : {
              enumerable: !0,
              get() {
                return e[t];
              },
            }
      );
    }),
    s
  );
}
var c = {},
  d = {},
  u = {},
  p = {},
  f = {},
  _ = {},
  g = (() => {
    if ("undefined" != typeof self) return self;
    if ("undefined" != typeof window) return window;
    if ("undefined" != typeof global) return global;
    throw Error("unable to locate global object");
  })();
const m = g.fetch;
var y = g.fetch.bind(g);
const v = g.Headers,
  b = g.Request,
  w = g.Response;
var S = Object.freeze({ __proto__: null, Headers: v, Request: b, Response: w, default: y, fetch: m }),
  k = l(S),
  T = {};
Object.defineProperty(T, "__esModule", { value: !0 });
T.default = class extends Error {
  constructor(e) {
    super(e.message), (this.name = "PostgrestError"), (this.details = e.details), (this.hint = e.hint), (this.code = e.code);
  }
};
var C = (o && o.__importDefault) || ((e) => (e && e.__esModule ? e : { default: e }));
Object.defineProperty(_, "__esModule", { value: !0 });
const E = C(k),
  x = C(T);
_.default = class {
  constructor(e) {
    (this.shouldThrowOnError = !1),
      (this.method = e.method),
      (this.url = e.url),
      (this.headers = e.headers),
      (this.schema = e.schema),
      (this.body = e.body),
      (this.shouldThrowOnError = e.shouldThrowOnError),
      (this.signal = e.signal),
      (this.isMaybeSingle = e.isMaybeSingle),
      e.fetch ? (this.fetch = e.fetch) : "undefined" == typeof fetch ? (this.fetch = E.default) : (this.fetch = fetch);
  }
  throwOnError() {
    return (this.shouldThrowOnError = !0), this;
  }
  then(e, t) {
    void 0 === this.schema || (["GET", "HEAD"].includes(this.method) ? (this.headers["Accept-Profile"] = this.schema) : (this.headers["Content-Profile"] = this.schema)),
      "GET" !== this.method && "HEAD" !== this.method && (this.headers["Content-Type"] = "application/json");
    let s = (0, this.fetch)(this.url.toString(), { method: this.method, headers: this.headers, body: JSON.stringify(this.body), signal: this.signal }).then(async (e) => {
      var t, s, r;
      let i = null,
        n = null,
        a = null,
        o = e.status,
        h = e.statusText;
      if (e.ok) {
        if ("HEAD" !== this.method) {
          const t = await e.text();
          "" === t || (n = "text/csv" === this.headers.Accept || (this.headers.Accept && this.headers.Accept.includes("application/vnd.pgrst.plan+text")) ? t : JSON.parse(t));
        }
        const r = null === (t = this.headers.Prefer) || void 0 === t ? void 0 : t.match(/count=(exact|planned|estimated)/),
          l = null === (s = e.headers.get("content-range")) || void 0 === s ? void 0 : s.split("/");
        r && l && l.length > 1 && (a = parseInt(l[1])),
          this.isMaybeSingle &&
            "GET" === this.method &&
            Array.isArray(n) &&
            (n.length > 1
              ? ((i = { code: "PGRST116", details: `Results contain ${n.length} rows, application/vnd.pgrst.object+json requires 1 row`, hint: null, message: "JSON object requested, multiple (or no) rows returned" }),
                (n = null),
                (a = null),
                (o = 406),
                (h = "Not Acceptable"))
              : (n = 1 === n.length ? n[0] : null));
      } else {
        const t = await e.text();
        try {
          (i = JSON.parse(t)), Array.isArray(i) && 404 === e.status && ((n = []), (i = null), (o = 200), (h = "OK"));
        } catch (s) {
          404 === e.status && "" === t ? ((o = 204), (h = "No Content")) : (i = { message: t });
        }
        if ((i && this.isMaybeSingle && (null === (r = null == i ? void 0 : i.details) || void 0 === r ? void 0 : r.includes("0 rows")) && ((i = null), (o = 200), (h = "OK")), i && this.shouldThrowOnError)) throw new x.default(i);
      }
      return { error: i, data: n, count: a, status: o, statusText: h };
    });
    return (
      this.shouldThrowOnError ||
        (s = s.catch((e) => {
          var t, s, r;
          return {
            error: {
              message: `${null !== (t = null == e ? void 0 : e.name) && void 0 !== t ? t : "FetchError"}: ${null == e ? void 0 : e.message}`,
              details: "" + (null !== (s = null == e ? void 0 : e.stack) && void 0 !== s ? s : ""),
              hint: "",
              code: "" + (null !== (r = null == e ? void 0 : e.code) && void 0 !== r ? r : ""),
            },
            data: null,
            count: null,
            status: 0,
            statusText: "",
          };
        })),
      s.then(e, t)
    );
  }
};
var R = (o && o.__importDefault) || ((e) => (e && e.__esModule ? e : { default: e }));
Object.defineProperty(f, "__esModule", { value: !0 });
const P = R(_);
let A = class extends P.default {
  select(e) {
    let t = !1;
    const s = (null != e ? e : "*")
      .split("")
      .map((e) => (/\s/.test(e) && !t ? "" : ('"' === e && (t = !t), e)))
      .join("");
    return this.url.searchParams.set("select", s), this.headers.Prefer && (this.headers.Prefer += ","), (this.headers.Prefer += "return=representation"), this;
  }
  order(e, { ascending: t = !0, nullsFirst: s, foreignTable: r, referencedTable: i = r } = {}) {
    const n = i ? i + ".order" : "order",
      a = this.url.searchParams.get(n);
    return this.url.searchParams.set(n, `${a ? a + "," : ""}${e}.${t ? "asc" : "desc"}${void 0 === s ? "" : s ? ".nullsfirst" : ".nullslast"}`), this;
  }
  limit(e, { foreignTable: t, referencedTable: s = t } = {}) {
    const r = void 0 === s ? "limit" : s + ".limit";
    return this.url.searchParams.set(r, "" + e), this;
  }
  range(e, t, { foreignTable: s, referencedTable: r = s } = {}) {
    const i = void 0 === r ? "offset" : r + ".offset",
      n = void 0 === r ? "limit" : r + ".limit";
    return this.url.searchParams.set(i, "" + e), this.url.searchParams.set(n, "" + (t - e + 1)), this;
  }
  abortSignal(e) {
    return (this.signal = e), this;
  }
  single() {
    return (this.headers.Accept = "application/vnd.pgrst.object+json"), this;
  }
  maybeSingle() {
    return "GET" === this.method ? (this.headers.Accept = "application/json") : (this.headers.Accept = "application/vnd.pgrst.object+json"), (this.isMaybeSingle = !0), this;
  }
  csv() {
    return (this.headers.Accept = "text/csv"), this;
  }
  geojson() {
    return (this.headers.Accept = "application/geo+json"), this;
  }
  explain({ analyze: e = !1, verbose: t = !1, settings: s = !1, buffers: r = !1, wal: i = !1, format: n = "text" } = {}) {
    var a;
    const o = [e ? "analyze" : null, t ? "verbose" : null, s ? "settings" : null, r ? "buffers" : null, i ? "wal" : null].filter(Boolean).join("|"),
      h = null !== (a = this.headers.Accept) && void 0 !== a ? a : "application/json";
    return (this.headers.Accept = `application/vnd.pgrst.plan+${n}; for="${h}"; options=${o};`), this;
  }
  rollback() {
    var e;
    return (null !== (e = this.headers.Prefer) && void 0 !== e ? e : "").trim().length > 0 ? (this.headers.Prefer += ",tx=rollback") : (this.headers.Prefer = "tx=rollback"), this;
  }
  returns() {
    return this;
  }
};
f.default = A;
var O = (o && o.__importDefault) || ((e) => (e && e.__esModule ? e : { default: e }));
Object.defineProperty(p, "__esModule", { value: !0 });
const j = O(f);
let I = class extends j.default {
  eq(e, t) {
    return this.url.searchParams.append(e, "eq." + t), this;
  }
  neq(e, t) {
    return this.url.searchParams.append(e, "neq." + t), this;
  }
  gt(e, t) {
    return this.url.searchParams.append(e, "gt." + t), this;
  }
  gte(e, t) {
    return this.url.searchParams.append(e, "gte." + t), this;
  }
  lt(e, t) {
    return this.url.searchParams.append(e, "lt." + t), this;
  }
  lte(e, t) {
    return this.url.searchParams.append(e, "lte." + t), this;
  }
  like(e, t) {
    return this.url.searchParams.append(e, "like." + t), this;
  }
  likeAllOf(e, t) {
    return this.url.searchParams.append(e, `like(all).{${t.join(",")}}`), this;
  }
  likeAnyOf(e, t) {
    return this.url.searchParams.append(e, `like(any).{${t.join(",")}}`), this;
  }
  ilike(e, t) {
    return this.url.searchParams.append(e, "ilike." + t), this;
  }
  ilikeAllOf(e, t) {
    return this.url.searchParams.append(e, `ilike(all).{${t.join(",")}}`), this;
  }
  ilikeAnyOf(e, t) {
    return this.url.searchParams.append(e, `ilike(any).{${t.join(",")}}`), this;
  }
  is(e, t) {
    return this.url.searchParams.append(e, "is." + t), this;
  }
  in(e, t) {
    const s = Array.from(new Set(t))
      .map((e) => ("string" == typeof e && RegExp("[,()]").test(e) ? `"${e}"` : "" + e))
      .join(",");
    return this.url.searchParams.append(e, `in.(${s})`), this;
  }
  contains(e, t) {
    return "string" == typeof t ? this.url.searchParams.append(e, "cs." + t) : Array.isArray(t) ? this.url.searchParams.append(e, `cs.{${t.join(",")}}`) : this.url.searchParams.append(e, "cs." + JSON.stringify(t)), this;
  }
  containedBy(e, t) {
    return "string" == typeof t ? this.url.searchParams.append(e, "cd." + t) : Array.isArray(t) ? this.url.searchParams.append(e, `cd.{${t.join(",")}}`) : this.url.searchParams.append(e, "cd." + JSON.stringify(t)), this;
  }
  rangeGt(e, t) {
    return this.url.searchParams.append(e, "sr." + t), this;
  }
  rangeGte(e, t) {
    return this.url.searchParams.append(e, "nxl." + t), this;
  }
  rangeLt(e, t) {
    return this.url.searchParams.append(e, "sl." + t), this;
  }
  rangeLte(e, t) {
    return this.url.searchParams.append(e, "nxr." + t), this;
  }
  rangeAdjacent(e, t) {
    return this.url.searchParams.append(e, "adj." + t), this;
  }
  overlaps(e, t) {
    return "string" == typeof t ? this.url.searchParams.append(e, "ov." + t) : this.url.searchParams.append(e, `ov.{${t.join(",")}}`), this;
  }
  textSearch(e, t, { config: s, type: r } = {}) {
    let i = "";
    "plain" === r ? (i = "pl") : "phrase" === r ? (i = "ph") : "websearch" === r && (i = "w");
    const n = void 0 === s ? "" : `(${s})`;
    return this.url.searchParams.append(e, `${i}fts${n}.${t}`), this;
  }
  match(e) {
    return (
      Object.entries(e).forEach(([e, t]) => {
        this.url.searchParams.append(e, "eq." + t);
      }),
      this
    );
  }
  not(e, t, s) {
    return this.url.searchParams.append(e, `not.${t}.${s}`), this;
  }
  or(e, { foreignTable: t, referencedTable: s = t } = {}) {
    const r = s ? s + ".or" : "or";
    return this.url.searchParams.append(r, `(${e})`), this;
  }
  filter(e, t, s) {
    return this.url.searchParams.append(e, `${t}.${s}`), this;
  }
};
p.default = I;
var L = (o && o.__importDefault) || ((e) => (e && e.__esModule ? e : { default: e }));
Object.defineProperty(u, "__esModule", { value: !0 });
const N = L(p);
u.default = class {
  constructor(e, { headers: t = {}, schema: s, fetch: r }) {
    (this.url = e), (this.headers = t), (this.schema = s), (this.fetch = r);
  }
  select(e, { head: t = !1, count: s } = {}) {
    const r = t ? "HEAD" : "GET";
    let i = !1;
    const n = (null != e ? e : "*")
      .split("")
      .map((e) => (/\s/.test(e) && !i ? "" : ('"' === e && (i = !i), e)))
      .join("");
    return this.url.searchParams.set("select", n), s && (this.headers.Prefer = "count=" + s), new N.default({ method: r, url: this.url, headers: this.headers, schema: this.schema, fetch: this.fetch, allowEmpty: !1 });
  }
  insert(e, { count: t, defaultToNull: s = !0 } = {}) {
    const r = [];
    if ((this.headers.Prefer && r.push(this.headers.Prefer), t && r.push("count=" + t), s || r.push("missing=default"), (this.headers.Prefer = r.join(",")), Array.isArray(e))) {
      const t = e.reduce((e, t) => e.concat(Object.keys(t)), []);
      if (t.length > 0) {
        const e = [...new Set(t)].map((e) => `"${e}"`);
        this.url.searchParams.set("columns", e.join(","));
      }
    }
    return new N.default({ method: "POST", url: this.url, headers: this.headers, schema: this.schema, body: e, fetch: this.fetch, allowEmpty: !1 });
  }
  upsert(e, { onConflict: t, ignoreDuplicates: s = !1, count: r, defaultToNull: i = !0 } = {}) {
    const n = [`resolution=${s ? "ignore" : "merge"}-duplicates`];
    if ((void 0 !== t && this.url.searchParams.set("on_conflict", t), this.headers.Prefer && n.push(this.headers.Prefer), r && n.push("count=" + r), i || n.push("missing=default"), (this.headers.Prefer = n.join(",")), Array.isArray(e))) {
      const t = e.reduce((e, t) => e.concat(Object.keys(t)), []);
      if (t.length > 0) {
        const e = [...new Set(t)].map((e) => `"${e}"`);
        this.url.searchParams.set("columns", e.join(","));
      }
    }
    return new N.default({ method: "POST", url: this.url, headers: this.headers, schema: this.schema, body: e, fetch: this.fetch, allowEmpty: !1 });
  }
  update(e, { count: t } = {}) {
    const s = [];
    return (
      this.headers.Prefer && s.push(this.headers.Prefer),
      t && s.push("count=" + t),
      (this.headers.Prefer = s.join(",")),
      new N.default({ method: "PATCH", url: this.url, headers: this.headers, schema: this.schema, body: e, fetch: this.fetch, allowEmpty: !1 })
    );
  }
  delete({ count: e } = {}) {
    const t = [];
    return (
      e && t.push("count=" + e),
      this.headers.Prefer && t.unshift(this.headers.Prefer),
      (this.headers.Prefer = t.join(",")),
      new N.default({ method: "DELETE", url: this.url, headers: this.headers, schema: this.schema, fetch: this.fetch, allowEmpty: !1 })
    );
  }
};
var D = {},
  U = {};
Object.defineProperty(U, "__esModule", { value: !0 }), (U.version = void 0), (U.version = "0.0.0-automated"), Object.defineProperty(D, "__esModule", { value: !0 }), (D.DEFAULT_HEADERS = void 0);
const F = U;
D.DEFAULT_HEADERS = { "X-Client-Info": "postgrest-js/" + F.version };
var $ = (o && o.__importDefault) || ((e) => (e && e.__esModule ? e : { default: e }));
Object.defineProperty(d, "__esModule", { value: !0 });
const M = $(u),
  q = $(p),
  B = D;
d.default = class e {
  constructor(e, { headers: t = {}, schema: s, fetch: r } = {}) {
    (this.url = e), (this.headers = Object.assign(Object.assign({}, B.DEFAULT_HEADERS), t)), (this.schemaName = s), (this.fetch = r);
  }
  from(e) {
    const t = new URL(`${this.url}/${e}`);
    return new M.default(t, { headers: Object.assign({}, this.headers), schema: this.schemaName, fetch: this.fetch });
  }
  schema(t) {
    return new e(this.url, { headers: this.headers, schema: t, fetch: this.fetch });
  }
  rpc(e, t = {}, { head: s = !1, get: r = !1, count: i } = {}) {
    let n;
    const a = new URL(`${this.url}/rpc/${e}`);
    let o;
    s || r
      ? ((n = s ? "HEAD" : "GET"),
        Object.entries(t)
          .filter(([e, t]) => void 0 !== t)
          .map(([e, t]) => [e, Array.isArray(t) ? `{${t.join(",")}}` : "" + t])
          .forEach(([e, t]) => {
            a.searchParams.append(e, t);
          }))
      : ((n = "POST"), (o = t));
    const h = Object.assign({}, this.headers);
    return i && (h.Prefer = "count=" + i), new q.default({ method: n, url: a, headers: h, schema: this.schemaName, body: o, fetch: this.fetch, allowEmpty: !1 });
  }
};
var z = (o && o.__importDefault) || ((e) => (e && e.__esModule ? e : { default: e }));
Object.defineProperty(c, "__esModule", { value: !0 }), (c.PostgrestBuilder = c.PostgrestTransformBuilder = c.PostgrestFilterBuilder = c.PostgrestQueryBuilder = c.PostgrestClient = void 0);
const J = z(d);
c.PostgrestClient = J.default;
const H = z(u);
c.PostgrestQueryBuilder = H.default;
const K = z(p);
c.PostgrestFilterBuilder = K.default;
const W = z(f);
c.PostgrestTransformBuilder = W.default;
const G = z(_);
c.PostgrestBuilder = G.default;
var V = (c.default = { PostgrestClient: J.default, PostgrestQueryBuilder: H.default, PostgrestFilterBuilder: K.default, PostgrestTransformBuilder: W.default, PostgrestBuilder: G.default });
const { PostgrestClient: Y, PostgrestQueryBuilder: Q, PostgrestFilterBuilder: X, PostgrestTransformBuilder: Z, PostgrestBuilder: ee } = V,
  te = { "X-Client-Info": "realtime-js/2.10.2" };
var se, re, ie, ne, ae, oe;
((e) => {
  (e[(e.connecting = 0)] = "connecting"), (e[(e.open = 1)] = "open"), (e[(e.closing = 2)] = "closing"), (e[(e.closed = 3)] = "closed");
})(se || (se = {})),
  ((e) => {
    (e.closed = "closed"), (e.errored = "errored"), (e.joined = "joined"), (e.joining = "joining"), (e.leaving = "leaving");
  })(re || (re = {})),
  ((e) => {
    (e.close = "phx_close"), (e.error = "phx_error"), (e.join = "phx_join"), (e.reply = "phx_reply"), (e.leave = "phx_leave"), (e.access_token = "access_token");
  })(ie || (ie = {})),
  ((e) => {
    e.websocket = "websocket";
  })(ne || (ne = {})),
  ((e) => {
    (e.Connecting = "connecting"), (e.Open = "open"), (e.Closing = "closing"), (e.Closed = "closed");
  })(ae || (ae = {}));
class he {
  constructor() {
    this.HEADER_LENGTH = 1;
  }
  decode(e, t) {
    return e.constructor === ArrayBuffer ? t(this._binaryDecode(e)) : t("string" == typeof e ? JSON.parse(e) : {});
  }
  _binaryDecode(e) {
    const t = new DataView(e),
      s = new TextDecoder();
    return this._decodeBroadcast(e, t, s);
  }
  _decodeBroadcast(e, t, s) {
    const r = t.getUint8(1),
      i = t.getUint8(2);
    let n = this.HEADER_LENGTH + 2;
    const a = s.decode(e.slice(n, n + r));
    n += r;
    const o = s.decode(e.slice(n, n + i));
    n += i;
    return { ref: null, topic: a, event: o, payload: JSON.parse(s.decode(e.slice(n, e.byteLength))) };
  }
}
class le {
  constructor(e, t) {
    (this.callback = e), (this.timerCalc = t), (this.timer = void 0), (this.tries = 0), (this.callback = e), (this.timerCalc = t);
  }
  reset() {
    (this.tries = 0), clearTimeout(this.timer);
  }
  scheduleTimeout() {
    clearTimeout(this.timer),
      (this.timer = setTimeout(() => {
        (this.tries = this.tries + 1), this.callback();
      }, this.timerCalc(this.tries + 1)));
  }
}
((e) => {
  (e.abstime = "abstime"),
    (e.bool = "bool"),
    (e.date = "date"),
    (e.daterange = "daterange"),
    (e.float4 = "float4"),
    (e.float8 = "float8"),
    (e.int2 = "int2"),
    (e.int4 = "int4"),
    (e.int4range = "int4range"),
    (e.int8 = "int8"),
    (e.int8range = "int8range"),
    (e.json = "json"),
    (e.jsonb = "jsonb"),
    (e.money = "money"),
    (e.numeric = "numeric"),
    (e.oid = "oid"),
    (e.reltime = "reltime"),
    (e.text = "text"),
    (e.time = "time"),
    (e.timestamp = "timestamp"),
    (e.timestamptz = "timestamptz"),
    (e.timetz = "timetz"),
    (e.tsrange = "tsrange"),
    (e.tstzrange = "tstzrange");
})(oe || (oe = {}));
const ce = (e, t, s = {}) => {
    var r;
    const i = null !== (r = s.skipTypes) && void 0 !== r ? r : [];
    return Object.keys(t).reduce((s, r) => ((s[r] = de(r, e, t, i)), s), {});
  },
  de = (e, t, s, r) => {
    const i = t.find((t) => t.name === e),
      n = null == i ? void 0 : i.type,
      a = s[e];
    return n && !r.includes(n) ? ue(n, a) : pe(a);
  },
  ue = (e, t) => {
    if ("_" === e.charAt(0)) {
      const s = e.slice(1, e.length);
      return me(t, s);
    }
    switch (e) {
      case oe.bool:
        return fe(t);
      case oe.float4:
      case oe.float8:
      case oe.int2:
      case oe.int4:
      case oe.int8:
      case oe.numeric:
      case oe.oid:
        return _e(t);
      case oe.json:
      case oe.jsonb:
        return ge(t);
      case oe.timestamp:
        return ye(t);
      case oe.abstime:
      case oe.date:
      case oe.daterange:
      case oe.int4range:
      case oe.int8range:
      case oe.money:
      case oe.reltime:
      case oe.text:
      case oe.time:
      case oe.timestamptz:
      case oe.timetz:
      case oe.tsrange:
      case oe.tstzrange:
      default:
        return pe(t);
    }
  },
  pe = (e) => e,
  fe = (e) => {
    switch (e) {
      case "t":
        return !0;
      case "f":
        return !1;
      default:
        return e;
    }
  },
  _e = (e) => {
    if ("string" == typeof e) {
      const t = parseFloat(e);
      if (!Number.isNaN(t)) return t;
    }
    return e;
  },
  ge = (e) => {
    if ("string" == typeof e)
      try {
        return JSON.parse(e);
      } catch (t) {
        return e;
      }
    return e;
  },
  me = (e, t) => {
    if ("string" != typeof e) return e;
    const s = e.length - 1,
      r = e[s];
    if ("{" === e[0] && "}" === r) {
      let r;
      const i = e.slice(1, s);
      try {
        r = JSON.parse("[" + i + "]");
      } catch (e) {
        r = i ? i.split(",") : [];
      }
      return r.map((e) => ue(t, e));
    }
    return e;
  },
  ye = (e) => ("string" == typeof e ? e.replace(" ", "T") : e),
  ve = (e) => {
    let t = e;
    return (t = t.replace(/^ws/i, "http")), (t = t.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i, "")), t.replace(/\/+$/, "");
  };
class be {
  constructor(e, t, s = {}, r = 1e4) {
    (this.channel = e), (this.event = t), (this.payload = s), (this.timeout = r), (this.sent = !1), (this.timeoutTimer = void 0), (this.ref = ""), (this.receivedResp = null), (this.recHooks = []), (this.refEvent = null);
  }
  resend(e) {
    (this.timeout = e), this._cancelRefEvent(), (this.ref = ""), (this.refEvent = null), (this.receivedResp = null), (this.sent = !1), this.send();
  }
  send() {
    this._hasReceived("timeout") || (this.startTimeout(), (this.sent = !0), this.channel.socket.push({ topic: this.channel.topic, event: this.event, payload: this.payload, ref: this.ref, join_ref: this.channel._joinRef() }));
  }
  updatePayload(e) {
    this.payload = Object.assign(Object.assign({}, this.payload), e);
  }
  receive(e, t) {
    var s;
    return this._hasReceived(e) && t(null === (s = this.receivedResp) || void 0 === s ? void 0 : s.response), this.recHooks.push({ status: e, callback: t }), this;
  }
  startTimeout() {
    if (this.timeoutTimer) return;
    (this.ref = this.channel.socket._makeRef()), (this.refEvent = this.channel._replyEventName(this.ref));
    this.channel._on(this.refEvent, {}, (e) => {
      this._cancelRefEvent(), this._cancelTimeout(), (this.receivedResp = e), this._matchReceive(e);
    }),
      (this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout));
  }
  trigger(e, t) {
    this.refEvent && this.channel._trigger(this.refEvent, { status: e, response: t });
  }
  destroy() {
    this._cancelRefEvent(), this._cancelTimeout();
  }
  _cancelRefEvent() {
    this.refEvent && this.channel._off(this.refEvent, {});
  }
  _cancelTimeout() {
    clearTimeout(this.timeoutTimer), (this.timeoutTimer = void 0);
  }
  _matchReceive({ status: e, response: t }) {
    this.recHooks.filter((t) => t.status === e).forEach((e) => e.callback(t));
  }
  _hasReceived(e) {
    return this.receivedResp && this.receivedResp.status === e;
  }
}
var we, Se, ke, Te;
((e) => {
  (e.SYNC = "sync"), (e.JOIN = "join"), (e.LEAVE = "leave");
})(we || (we = {}));
class Ce {
  constructor(e, t) {
    (this.channel = e), (this.state = {}), (this.pendingDiffs = []), (this.joinRef = null), (this.caller = { onJoin() {}, onLeave() {}, onSync() {} });
    const s = (null == t ? void 0 : t.events) || { state: "presence_state", diff: "presence_diff" };
    this.channel._on(s.state, {}, (e) => {
      const { onJoin: t, onLeave: s, onSync: r } = this.caller;
      (this.joinRef = this.channel._joinRef()),
        (this.state = Ce.syncState(this.state, e, t, s)),
        this.pendingDiffs.forEach((e) => {
          this.state = Ce.syncDiff(this.state, e, t, s);
        }),
        (this.pendingDiffs = []),
        r();
    }),
      this.channel._on(s.diff, {}, (e) => {
        const { onJoin: t, onLeave: s, onSync: r } = this.caller;
        this.inPendingSyncState() ? this.pendingDiffs.push(e) : ((this.state = Ce.syncDiff(this.state, e, t, s)), r());
      }),
      this.onJoin((e, t, s) => {
        this.channel._trigger("presence", { event: "join", key: e, currentPresences: t, newPresences: s });
      }),
      this.onLeave((e, t, s) => {
        this.channel._trigger("presence", { event: "leave", key: e, currentPresences: t, leftPresences: s });
      }),
      this.onSync(() => {
        this.channel._trigger("presence", { event: "sync" });
      });
  }
  static syncState(e, t, s, r) {
    const i = this.cloneDeep(e),
      n = this.transformState(t),
      a = {},
      o = {};
    return (
      this.map(i, (e, t) => {
        n[e] || (o[e] = t);
      }),
      this.map(n, (e, t) => {
        const s = i[e];
        if (s) {
          const r = t.map((e) => e.presence_ref),
            i = s.map((e) => e.presence_ref),
            n = t.filter((e) => i.indexOf(e.presence_ref) < 0),
            h = s.filter((e) => r.indexOf(e.presence_ref) < 0);
          n.length > 0 && (a[e] = n), h.length > 0 && (o[e] = h);
        } else a[e] = t;
      }),
      this.syncDiff(i, { joins: a, leaves: o }, s, r)
    );
  }
  static syncDiff(e, t, s, r) {
    const { joins: i, leaves: n } = { joins: this.transformState(t.joins), leaves: this.transformState(t.leaves) };
    return (
      s || (s = () => {}),
      r || (r = () => {}),
      this.map(i, (t, r) => {
        var i;
        const n = null !== (i = e[t]) && void 0 !== i ? i : [];
        if (((e[t] = this.cloneDeep(r)), n.length > 0)) {
          const s = e[t].map((e) => e.presence_ref),
            r = n.filter((e) => s.indexOf(e.presence_ref) < 0);
          e[t].unshift(...r);
        }
        s(t, n, r);
      }),
      this.map(n, (t, s) => {
        let i = e[t];
        if (!i) return;
        const n = s.map((e) => e.presence_ref);
        (i = i.filter((e) => n.indexOf(e.presence_ref) < 0)), (e[t] = i), r(t, i, s), 0 === i.length && delete e[t];
      }),
      e
    );
  }
  static map(e, t) {
    return Object.getOwnPropertyNames(e).map((s) => t(s, e[s]));
  }
  static transformState(e) {
    return (
      (e = this.cloneDeep(e)),
      Object.getOwnPropertyNames(e).reduce((t, s) => {
        const r = e[s];
        return (t[s] = "metas" in r ? r.metas.map((e) => ((e.presence_ref = e.phx_ref), delete e.phx_ref, delete e.phx_ref_prev, e)) : r), t;
      }, {})
    );
  }
  static cloneDeep(e) {
    return JSON.parse(JSON.stringify(e));
  }
  onJoin(e) {
    this.caller.onJoin = e;
  }
  onLeave(e) {
    this.caller.onLeave = e;
  }
  onSync(e) {
    this.caller.onSync = e;
  }
  inPendingSyncState() {
    return !this.joinRef || this.joinRef !== this.channel._joinRef();
  }
}
((e) => {
  (e.ALL = "*"), (e.INSERT = "INSERT"), (e.UPDATE = "UPDATE"), (e.DELETE = "DELETE");
})(Se || (Se = {})),
  ((e) => {
    (e.BROADCAST = "broadcast"), (e.PRESENCE = "presence"), (e.POSTGRES_CHANGES = "postgres_changes");
  })(ke || (ke = {})),
  ((e) => {
    (e.SUBSCRIBED = "SUBSCRIBED"), (e.TIMED_OUT = "TIMED_OUT"), (e.CLOSED = "CLOSED"), (e.CHANNEL_ERROR = "CHANNEL_ERROR");
  })(Te || (Te = {}));
class Ee {
  constructor(e, t = { config: {} }, s) {
    (this.topic = e),
      (this.params = t),
      (this.socket = s),
      (this.bindings = {}),
      (this.state = re.closed),
      (this.joinedOnce = !1),
      (this.pushBuffer = []),
      (this.subTopic = e.replace(/^realtime:/i, "")),
      (this.params.config = Object.assign({ broadcast: { ack: !1, self: !1 }, presence: { key: "" }, private: !1 }, t.config)),
      (this.timeout = this.socket.timeout),
      (this.joinPush = new be(this, ie.join, this.params, this.timeout)),
      (this.rejoinTimer = new le(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs)),
      this.joinPush.receive("ok", () => {
        (this.state = re.joined), this.rejoinTimer.reset(), this.pushBuffer.forEach((e) => e.send()), (this.pushBuffer = []);
      }),
      this._onClose(() => {
        this.rejoinTimer.reset(), this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`), (this.state = re.closed), this.socket._remove(this);
      }),
      this._onError((e) => {
        this._isLeaving() || this._isClosed() || (this.socket.log("channel", "error " + this.topic, e), (this.state = re.errored), this.rejoinTimer.scheduleTimeout());
      }),
      this.joinPush.receive("timeout", () => {
        this._isJoining() && (this.socket.log("channel", "timeout " + this.topic, this.joinPush.timeout), (this.state = re.errored), this.rejoinTimer.scheduleTimeout());
      }),
      this._on(ie.reply, {}, (e, t) => {
        this._trigger(this._replyEventName(t), e);
      }),
      (this.presence = new Ce(this)),
      (this.broadcastEndpointURL = ve(this.socket.endPoint) + "/api/broadcast");
  }
  subscribe(e, t = this.timeout) {
    var s, r;
    if ((this.socket.isConnected() || this.socket.connect(), this.joinedOnce)) throw "tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance";
    {
      const {
        config: { broadcast: i, presence: n, private: a },
      } = this.params;
      this._onError((t) => e && e("CHANNEL_ERROR", t)), this._onClose(() => e && e("CLOSED"));
      const o = {},
        h = { broadcast: i, presence: n, postgres_changes: null !== (r = null === (s = this.bindings.postgres_changes) || void 0 === s ? void 0 : s.map((e) => e.filter)) && void 0 !== r ? r : [], private: a };
      this.socket.accessToken && (o.access_token = this.socket.accessToken),
        this.updateJoinPayload(Object.assign({ config: h }, o)),
        (this.joinedOnce = !0),
        this._rejoin(t),
        this.joinPush
          .receive("ok", ({ postgres_changes: t }) => {
            var s;
            if ((this.socket.accessToken && this.socket.setAuth(this.socket.accessToken), void 0 !== t)) {
              const r = this.bindings.postgres_changes,
                i = null !== (s = null == r ? void 0 : r.length) && void 0 !== s ? s : 0,
                n = [];
              for (let s = 0; s < i; s++) {
                const i = r[s],
                  {
                    filter: { event: a, schema: o, table: h, filter: l },
                  } = i,
                  c = t && t[s];
                if (!c || c.event !== a || c.schema !== o || c.table !== h || c.filter !== l) return this.unsubscribe(), void (e && e("CHANNEL_ERROR", Error("mismatch between server and client bindings for postgres changes")));
                n.push(Object.assign(Object.assign({}, i), { id: c.id }));
              }
              return (this.bindings.postgres_changes = n), void (e && e("SUBSCRIBED"));
            }
            e && e("SUBSCRIBED");
          })
          .receive("error", (t) => {
            e && e("CHANNEL_ERROR", Error(JSON.stringify(Object.values(t).join(", ") || "error")));
          })
          .receive("timeout", () => {
            e && e("TIMED_OUT");
          });
    }
    return this;
  }
  presenceState() {
    return this.presence.state;
  }
  async track(e, t = {}) {
    return await this.send({ type: "presence", event: "track", payload: e }, t.timeout || this.timeout);
  }
  async untrack(e = {}) {
    return await this.send({ type: "presence", event: "untrack" }, e);
  }
  on(e, t, s) {
    return this._on(e, t, s);
  }
  async send(e, t = {}) {
    var s, r;
    if (this._canPush() || "broadcast" !== e.type)
      return new Promise((s) => {
        var r, i, n;
        const a = this._push(e.type, e, t.timeout || this.timeout);
        "broadcast" !== e.type || (null === (n = null === (i = null === (r = this.params) || void 0 === r ? void 0 : r.config) || void 0 === i ? void 0 : i.broadcast) || void 0 === n ? void 0 : n.ack) || s("ok"),
          a.receive("ok", () => s("ok")),
          a.receive("error", () => s("error")),
          a.receive("timeout", () => s("timed out"));
      });
    {
      const { event: i, payload: n } = e,
        a = {
          method: "POST",
          headers: { Authorization: this.socket.accessToken ? "Bearer " + this.socket.accessToken : "", apikey: this.socket.apiKey ? this.socket.apiKey : "", "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [{ topic: this.subTopic, event: i, payload: n }] }),
        };
      try {
        const e = await this._fetchWithTimeout(this.broadcastEndpointURL, a, null !== (s = t.timeout) && void 0 !== s ? s : this.timeout);
        return await (null === (r = e.body) || void 0 === r ? void 0 : r.cancel()), e.ok ? "ok" : "error";
      } catch (e) {
        return "AbortError" === e.name ? "timed out" : "error";
      }
    }
  }
  updateJoinPayload(e) {
    this.joinPush.updatePayload(e);
  }
  unsubscribe(e = this.timeout) {
    this.state = re.leaving;
    const t = () => {
      this.socket.log("channel", "leave " + this.topic), this._trigger(ie.close, "leave", this._joinRef());
    };
    return (
      this.rejoinTimer.reset(),
      this.joinPush.destroy(),
      new Promise((s) => {
        const r = new be(this, ie.leave, {}, e);
        r
          .receive("ok", () => {
            t(), s("ok");
          })
          .receive("timeout", () => {
            t(), s("timed out");
          })
          .receive("error", () => {
            s("error");
          }),
          r.send(),
          this._canPush() || r.trigger("ok", {});
      })
    );
  }
  async _fetchWithTimeout(e, t, s) {
    const r = new AbortController(),
      i = setTimeout(() => r.abort(), s),
      n = await this.socket.fetch(e, Object.assign(Object.assign({}, t), { signal: r.signal }));
    return clearTimeout(i), n;
  }
  _push(e, t, s = this.timeout) {
    if (!this.joinedOnce) throw `tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    let r = new be(this, e, t, s);
    return this._canPush() ? r.send() : (r.startTimeout(), this.pushBuffer.push(r)), r;
  }
  _onMessage(e, t, s) {
    return t;
  }
  _isMember(e) {
    return this.topic === e;
  }
  _joinRef() {
    return this.joinPush.ref;
  }
  _trigger(e, t, s) {
    var r, i;
    const n = e.toLocaleLowerCase(),
      { close: a, error: o, leave: h, join: l } = ie;
    if (s && [a, o, h, l].indexOf(n) >= 0 && s !== this._joinRef()) return;
    let c = this._onMessage(n, t, s);
    if (t && !c) throw "channel onMessage callbacks must return the payload, modified or unmodified";
    ["insert", "update", "delete"].includes(n)
      ? null === (r = this.bindings.postgres_changes) ||
        void 0 === r ||
        r
          .filter((e) => {
            var t, s, r;
            return "*" === (null === (t = e.filter) || void 0 === t ? void 0 : t.event) || (null === (r = null === (s = e.filter) || void 0 === s ? void 0 : s.event) || void 0 === r ? void 0 : r.toLocaleLowerCase()) === n;
          })
          .map((e) => e.callback(c, s))
      : null === (i = this.bindings[n]) ||
        void 0 === i ||
        i
          .filter((e) => {
            var s, r, i, a, o, h;
            if (["broadcast", "presence", "postgres_changes"].includes(n)) {
              if ("id" in e) {
                const n = e.id,
                  a = null === (s = e.filter) || void 0 === s ? void 0 : s.event;
                return n && (null === (r = t.ids) || void 0 === r ? void 0 : r.includes(n)) && ("*" === a || (null == a ? void 0 : a.toLocaleLowerCase()) === (null === (i = t.data) || void 0 === i ? void 0 : i.type.toLocaleLowerCase()));
              }
              {
                const s = null === (o = null === (a = null == e ? void 0 : e.filter) || void 0 === a ? void 0 : a.event) || void 0 === o ? void 0 : o.toLocaleLowerCase();
                return "*" === s || s === (null === (h = null == t ? void 0 : t.event) || void 0 === h ? void 0 : h.toLocaleLowerCase());
              }
            }
            return e.type.toLocaleLowerCase() === n;
          })
          .map((e) => {
            if ("object" == typeof c && "ids" in c) {
              const e = c.data,
                { schema: t, table: s, commit_timestamp: r, type: i, errors: n } = e;
              c = Object.assign(Object.assign({}, { schema: t, table: s, commit_timestamp: r, eventType: i, new: {}, old: {}, errors: n }), this._getPayloadRecords(e));
            }
            e.callback(c, s);
          });
  }
  _isClosed() {
    return this.state === re.closed;
  }
  _isJoined() {
    return this.state === re.joined;
  }
  _isJoining() {
    return this.state === re.joining;
  }
  _isLeaving() {
    return this.state === re.leaving;
  }
  _replyEventName(e) {
    return "chan_reply_" + e;
  }
  _on(e, t, s) {
    const r = e.toLocaleLowerCase(),
      i = { type: r, filter: t, callback: s };
    return this.bindings[r] ? this.bindings[r].push(i) : (this.bindings[r] = [i]), this;
  }
  _off(e, t) {
    const s = e.toLocaleLowerCase();
    return (
      (this.bindings[s] = this.bindings[s].filter((e) => {
        var r;
        return !((null === (r = e.type) || void 0 === r ? void 0 : r.toLocaleLowerCase()) === s && Ee.isEqual(e.filter, t));
      })),
      this
    );
  }
  static isEqual(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const s in e) if (e[s] !== t[s]) return !1;
    return !0;
  }
  _rejoinUntilConnected() {
    this.rejoinTimer.scheduleTimeout(), this.socket.isConnected() && this._rejoin();
  }
  _onClose(e) {
    this._on(ie.close, {}, e);
  }
  _onError(e) {
    this._on(ie.error, {}, (t) => e(t));
  }
  _canPush() {
    return this.socket.isConnected() && this._isJoined();
  }
  _rejoin(e = this.timeout) {
    this._isLeaving() || (this.socket._leaveOpenTopic(this.topic), (this.state = re.joining), this.joinPush.resend(e));
  }
  _getPayloadRecords(e) {
    const t = { new: {}, old: {} };
    return ("INSERT" !== e.type && "UPDATE" !== e.type) || (t.new = ce(e.columns, e.record)), ("UPDATE" !== e.type && "DELETE" !== e.type) || (t.old = ce(e.columns, e.old_record)), t;
  }
}
const xe = () => {},
  Re = "undefined" != typeof WebSocket;
class Pe {
  constructor(e, t) {
    var s;
    (this.accessToken = null),
      (this.apiKey = null),
      (this.channels = []),
      (this.endPoint = ""),
      (this.httpEndpoint = ""),
      (this.headers = te),
      (this.params = {}),
      (this.timeout = 1e4),
      (this.heartbeatIntervalMs = 3e4),
      (this.heartbeatTimer = void 0),
      (this.pendingHeartbeatRef = null),
      (this.ref = 0),
      (this.logger = xe),
      (this.conn = null),
      (this.sendBuffer = []),
      (this.serializer = new he()),
      (this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }),
      (this._resolveFetch = (e) => {
        let t;
        return (
          (t =
            e ||
            ("undefined" == typeof fetch
              ? (...e) =>
                  Promise.resolve()
                    .then(() => S)
                    .then(({ default: t }) => t(...e))
              : fetch)),
          (...e) => t(...e)
        );
      }),
      (this.endPoint = `${e}/${ne.websocket}`),
      (this.httpEndpoint = ve(e)),
      (null == t ? void 0 : t.transport) ? (this.transport = t.transport) : (this.transport = null),
      (null == t ? void 0 : t.params) && (this.params = t.params),
      (null == t ? void 0 : t.headers) && (this.headers = Object.assign(Object.assign({}, this.headers), t.headers)),
      (null == t ? void 0 : t.timeout) && (this.timeout = t.timeout),
      (null == t ? void 0 : t.logger) && (this.logger = t.logger),
      (null == t ? void 0 : t.heartbeatIntervalMs) && (this.heartbeatIntervalMs = t.heartbeatIntervalMs);
    const r = null === (s = null == t ? void 0 : t.params) || void 0 === s ? void 0 : s.apikey;
    r && ((this.accessToken = r), (this.apiKey = r)),
      (this.reconnectAfterMs = (null == t ? void 0 : t.reconnectAfterMs) ? t.reconnectAfterMs : (e) => [1e3, 2e3, 5e3, 1e4][e - 1] || 1e4),
      (this.encode = (null == t ? void 0 : t.encode) ? t.encode : (e, t) => t(JSON.stringify(e))),
      (this.decode = (null == t ? void 0 : t.decode) ? t.decode : this.serializer.decode.bind(this.serializer)),
      (this.reconnectTimer = new le(async () => {
        this.disconnect(), this.connect();
      }, this.reconnectAfterMs)),
      (this.fetch = this._resolveFetch(null == t ? void 0 : t.fetch));
  }
  connect() {
    if (!this.conn)
      if (this.transport) this.conn = new this.transport(this._endPointURL(), void 0, { headers: this.headers });
      else {
        if (Re) return (this.conn = new WebSocket(this._endPointURL())), void this.setupConnection();
        (this.conn = new Ae(this._endPointURL(), void 0, {
          close: () => {
            this.conn = null;
          },
        })),
          Promise.resolve()
            .then(() => on)
            .then(({ default: e }) => {
              (this.conn = new e(this._endPointURL(), void 0, { headers: this.headers })), this.setupConnection();
            });
      }
  }
  disconnect(e, t) {
    this.conn && ((this.conn.onclose = () => {}), e ? this.conn.close(e, null != t ? t : "") : this.conn.close(), (this.conn = null), this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.reconnectTimer.reset());
  }
  getChannels() {
    return this.channels;
  }
  async removeChannel(e) {
    const t = await e.unsubscribe();
    return 0 === this.channels.length && this.disconnect(), t;
  }
  async removeAllChannels() {
    const e = await Promise.all(this.channels.map((e) => e.unsubscribe()));
    return this.disconnect(), e;
  }
  log(e, t, s) {
    this.logger(e, t, s);
  }
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case se.connecting:
        return ae.Connecting;
      case se.open:
        return ae.Open;
      case se.closing:
        return ae.Closing;
      default:
        return ae.Closed;
    }
  }
  isConnected() {
    return this.connectionState() === ae.Open;
  }
  channel(e, t = { config: {} }) {
    const s = new Ee("realtime:" + e, t, this);
    return this.channels.push(s), s;
  }
  push(e) {
    const { topic: t, event: s, payload: r, ref: i } = e,
      n = () => {
        this.encode(e, (e) => {
          var t;
          null === (t = this.conn) || void 0 === t || t.send(e);
        });
      };
    this.log("push", `${t} ${s} (${i})`, r), this.isConnected() ? n() : this.sendBuffer.push(n);
  }
  setAuth(e) {
    (this.accessToken = e),
      this.channels.forEach((t) => {
        e && t.updateJoinPayload({ access_token: e }), t.joinedOnce && t._isJoined() && t._push(ie.access_token, { access_token: e });
      });
  }
  _makeRef() {
    let e = this.ref + 1;
    return e === this.ref ? (this.ref = 0) : (this.ref = e), this.ref.toString();
  }
  _leaveOpenTopic(e) {
    let t = this.channels.find((t) => t.topic === e && (t._isJoined() || t._isJoining()));
    t && (this.log("transport", `leaving duplicate topic "${e}"`), t.unsubscribe());
  }
  _remove(e) {
    this.channels = this.channels.filter((t) => t._joinRef() !== e._joinRef());
  }
  setupConnection() {
    this.conn &&
      ((this.conn.binaryType = "arraybuffer"),
      (this.conn.onopen = () => this._onConnOpen()),
      (this.conn.onerror = (e) => this._onConnError(e)),
      (this.conn.onmessage = (e) => this._onConnMessage(e)),
      (this.conn.onclose = (e) => this._onConnClose(e)));
  }
  _endPointURL() {
    return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: "1.0.0" }));
  }
  _onConnMessage(e) {
    this.decode(e.data, (e) => {
      let { topic: t, event: s, payload: r, ref: i } = e;
      ((i && i === this.pendingHeartbeatRef) || s === (null == r ? void 0 : r.type)) && (this.pendingHeartbeatRef = null),
        this.log("receive", `${r.status || ""} ${t} ${s} ${(i && "(" + i + ")") || ""}`, r),
        this.channels.filter((e) => e._isMember(t)).forEach((e) => e._trigger(s, r, i)),
        this.stateChangeCallbacks.message.forEach((t) => t(e));
    });
  }
  _onConnOpen() {
    this.log("transport", "connected to " + this._endPointURL()),
      this._flushSendBuffer(),
      this.reconnectTimer.reset(),
      this.heartbeatTimer && clearInterval(this.heartbeatTimer),
      (this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs)),
      this.stateChangeCallbacks.open.forEach((e) => e());
  }
  _onConnClose(e) {
    this.log("transport", "close", e), this._triggerChanError(), this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.reconnectTimer.scheduleTimeout(), this.stateChangeCallbacks.close.forEach((t) => t(e));
  }
  _onConnError(e) {
    this.log("transport", e.message), this._triggerChanError(), this.stateChangeCallbacks.error.forEach((t) => t(e));
  }
  _triggerChanError() {
    this.channels.forEach((e) => e._trigger(ie.error));
  }
  _appendParams(e, t) {
    if (0 === Object.keys(t).length) return e;
    const s = e.match(/\?/) ? "&" : "?";
    return `${e}${s}${new URLSearchParams(t)}`;
  }
  _flushSendBuffer() {
    this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((e) => e()), (this.sendBuffer = []));
  }
  _sendHeartbeat() {
    var e;
    if (this.isConnected()) {
      if (this.pendingHeartbeatRef)
        return (this.pendingHeartbeatRef = null), this.log("transport", "heartbeat timeout. Attempting to re-establish connection"), void (null === (e = this.conn) || void 0 === e || e.close(1e3, "hearbeat timeout"));
      (this.pendingHeartbeatRef = this._makeRef()), this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef }), this.setAuth(this.accessToken);
    }
  }
}
class Ae {
  constructor(e, t, s) {
    (this.binaryType = "arraybuffer"),
      (this.onclose = () => {}),
      (this.onerror = () => {}),
      (this.onmessage = () => {}),
      (this.onopen = () => {}),
      (this.readyState = se.connecting),
      (this.send = () => {}),
      (this.url = null),
      (this.url = e),
      (this.close = s.close);
  }
}
class Oe extends Error {
  constructor(e) {
    super(e), (this.__isStorageError = !0), (this.name = "StorageError");
  }
}
function je(e) {
  return "object" == typeof e && null !== e && "__isStorageError" in e;
}
class Ie extends Oe {
  constructor(e, t) {
    super(e), (this.name = "StorageApiError"), (this.status = t);
  }
  toJSON() {
    return { name: this.name, message: this.message, status: this.status };
  }
}
class Le extends Oe {
  constructor(e, t) {
    super(e), (this.name = "StorageUnknownError"), (this.originalError = t);
  }
}
var Ne = (e, t, s, r) =>
  new (s || (s = Promise))((i, n) => {
    function a(e) {
      try {
        h(r.next(e));
      } catch (e) {
        n(e);
      }
    }
    function o(e) {
      try {
        h(r.throw(e));
      } catch (e) {
        n(e);
      }
    }
    function h(e) {
      var t;
      e.done
        ? i(e.value)
        : ((t = e.value),
          t instanceof s
            ? t
            : new s((e) => {
                e(t);
              })).then(a, o);
    }
    h((r = r.apply(e, t || [])).next());
  });
const De = (e) => {
  let t;
  return (
    (t =
      e ||
      ("undefined" == typeof fetch
        ? (...e) =>
            Promise.resolve()
              .then(() => S)
              .then(({ default: t }) => t(...e))
        : fetch)),
    (...e) => t(...e)
  );
};
var Ue = (e, t, s, r) =>
  new (s || (s = Promise))((i, n) => {
    function a(e) {
      try {
        h(r.next(e));
      } catch (e) {
        n(e);
      }
    }
    function o(e) {
      try {
        h(r.throw(e));
      } catch (e) {
        n(e);
      }
    }
    function h(e) {
      var t;
      e.done
        ? i(e.value)
        : ((t = e.value),
          t instanceof s
            ? t
            : new s((e) => {
                e(t);
              })).then(a, o);
    }
    h((r = r.apply(e, t || [])).next());
  });
const Fe = (e) => e.msg || e.message || e.error_description || e.error || JSON.stringify(e),
  $e = (e, t) =>
    Ue(void 0, void 0, void 0, function* () {
      const s = yield Ne(void 0, void 0, void 0, function* () {
        return "undefined" == typeof Response ? (yield Promise.resolve().then(() => S)).Response : Response;
      });
      e instanceof s
        ? e
            .json()
            .then((s) => {
              t(new Ie(Fe(s), e.status || 500));
            })
            .catch((e) => {
              t(new Le(Fe(e), e));
            })
        : t(new Le(Fe(e), e));
    }),
  Me = (e, t, s, r) => {
    const i = { method: e, headers: (null == t ? void 0 : t.headers) || {} };
    return "GET" === e ? i : ((i.headers = Object.assign({ "Content-Type": "application/json" }, null == t ? void 0 : t.headers)), (i.body = JSON.stringify(r)), Object.assign(Object.assign({}, i), s));
  };
function qe(e, t, s, r, i, n) {
  return Ue(this, void 0, void 0, function* () {
    return new Promise((a, o) => {
      e(s, Me(t, r, i, n))
        .then((e) => {
          if (!e.ok) throw e;
          return (null == r ? void 0 : r.noResolveJson) ? e : e.json();
        })
        .then((e) => a(e))
        .catch((e) => $e(e, o));
    });
  });
}
function Be(e, t, s, r) {
  return Ue(this, void 0, void 0, function* () {
    return qe(e, "GET", t, s, r);
  });
}
function ze(e, t, s, r, i) {
  return Ue(this, void 0, void 0, function* () {
    return qe(e, "POST", t, r, i, s);
  });
}
function Je(e, t, s, r, i) {
  return Ue(this, void 0, void 0, function* () {
    return qe(e, "DELETE", t, r, i, s);
  });
}
var He = (e, t, s, r) =>
  new (s || (s = Promise))((i, n) => {
    function a(e) {
      try {
        h(r.next(e));
      } catch (e) {
        n(e);
      }
    }
    function o(e) {
      try {
        h(r.throw(e));
      } catch (e) {
        n(e);
      }
    }
    function h(e) {
      var t;
      e.done
        ? i(e.value)
        : ((t = e.value),
          t instanceof s
            ? t
            : new s((e) => {
                e(t);
              })).then(a, o);
    }
    h((r = r.apply(e, t || [])).next());
  });
const Ke = { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } },
  We = { cacheControl: "3600", contentType: "text/plain;charset=UTF-8", upsert: !1 };
class Ge {
  constructor(e, t = {}, s, r) {
    (this.url = e), (this.headers = t), (this.bucketId = s), (this.fetch = De(r));
  }
  uploadOrUpdate(e, t, s, r) {
    return He(this, void 0, void 0, function* () {
      try {
        let i;
        const n = Object.assign(Object.assign({}, We), r),
          a = Object.assign(Object.assign({}, this.headers), "POST" === e && { "x-upsert": n.upsert + "" });
        "undefined" != typeof Blob && s instanceof Blob
          ? ((i = new FormData()), i.append("cacheControl", n.cacheControl), i.append("", s))
          : "undefined" != typeof FormData && s instanceof FormData
          ? ((i = s), i.append("cacheControl", n.cacheControl))
          : ((i = s), (a["cache-control"] = "max-age=" + n.cacheControl), (a["content-type"] = n.contentType));
        const o = this._removeEmptyFolders(t),
          h = this._getFinalPath(o),
          l = yield this.fetch(`${this.url}/object/${h}`, Object.assign({ method: e, body: i, headers: a }, (null == n ? void 0 : n.duplex) ? { duplex: n.duplex } : {})),
          c = yield l.json();
        if (l.ok) return { data: { path: o, id: c.Id, fullPath: c.Key }, error: null };
        return { data: null, error: c };
      } catch (e) {
        if (je(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  upload(e, t, s) {
    return He(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("POST", e, t, s);
    });
  }
  uploadToSignedUrl(e, t, s, r) {
    return He(this, void 0, void 0, function* () {
      const i = this._removeEmptyFolders(e),
        n = this._getFinalPath(i),
        a = new URL(this.url + "/object/upload/sign/" + n);
      a.searchParams.set("token", t);
      try {
        let e;
        const t = Object.assign({ upsert: We.upsert }, r),
          n = Object.assign(Object.assign({}, this.headers), { "x-upsert": t.upsert + "" });
        "undefined" != typeof Blob && s instanceof Blob
          ? ((e = new FormData()), e.append("cacheControl", t.cacheControl), e.append("", s))
          : "undefined" != typeof FormData && s instanceof FormData
          ? ((e = s), e.append("cacheControl", t.cacheControl))
          : ((e = s), (n["cache-control"] = "max-age=" + t.cacheControl), (n["content-type"] = t.contentType));
        const o = yield this.fetch(a.toString(), { method: "PUT", body: e, headers: n }),
          h = yield o.json();
        if (o.ok) return { data: { path: i, fullPath: h.Key }, error: null };
        return { data: null, error: h };
      } catch (e) {
        if (je(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  createSignedUploadUrl(e, t) {
    return He(this, void 0, void 0, function* () {
      try {
        let s = this._getFinalPath(e);
        const r = Object.assign({}, this.headers);
        (null == t ? void 0 : t.upsert) && (r["x-upsert"] = "true");
        const i = yield ze(this.fetch, `${this.url}/object/upload/sign/${s}`, {}, { headers: r }),
          n = new URL(this.url + i.url),
          a = n.searchParams.get("token");
        if (!a) throw new Oe("No token returned by API");
        return { data: { signedUrl: n.toString(), path: e, token: a }, error: null };
      } catch (e) {
        if (je(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  update(e, t, s) {
    return He(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("PUT", e, t, s);
    });
  }
  move(e, t, s) {
    return He(this, void 0, void 0, function* () {
      try {
        return { data: yield ze(this.fetch, this.url + "/object/move", { bucketId: this.bucketId, sourceKey: e, destinationKey: t, destinationBucket: null == s ? void 0 : s.destinationBucket }, { headers: this.headers }), error: null };
      } catch (e) {
        if (je(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  copy(e, t, s) {
    return He(this, void 0, void 0, function* () {
      try {
        return {
          data: { path: (yield ze(this.fetch, this.url + "/object/copy", { bucketId: this.bucketId, sourceKey: e, destinationKey: t, destinationBucket: null == s ? void 0 : s.destinationBucket }, { headers: this.headers })).Key },
          error: null,
        };
      } catch (e) {
        if (je(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  createSignedUrl(e, t, s) {
    return He(this, void 0, void 0, function* () {
      try {
        let r = this._getFinalPath(e),
          i = yield ze(this.fetch, `${this.url}/object/sign/${r}`, Object.assign({ expiresIn: t }, (null == s ? void 0 : s.transform) ? { transform: s.transform } : {}), { headers: this.headers });
        const n = (null == s ? void 0 : s.download) ? "&download=" + (!0 === s.download ? "" : s.download) : "";
        return (i = { signedUrl: encodeURI(`${this.url}${i.signedURL}${n}`) }), { data: i, error: null };
      } catch (e) {
        if (je(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  createSignedUrls(e, t, s) {
    return He(this, void 0, void 0, function* () {
      try {
        const r = yield ze(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn: t, paths: e }, { headers: this.headers }),
          i = (null == s ? void 0 : s.download) ? "&download=" + (!0 === s.download ? "" : s.download) : "";
        return { data: r.map((e) => Object.assign(Object.assign({}, e), { signedUrl: e.signedURL ? encodeURI(`${this.url}${e.signedURL}${i}`) : null })), error: null };
      } catch (e) {
        if (je(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  download(e, t) {
    return He(this, void 0, void 0, function* () {
      const s = void 0 !== (null == t ? void 0 : t.transform) ? "render/image/authenticated" : "object",
        r = this.transformOptsToQueryString((null == t ? void 0 : t.transform) || {}),
        i = r ? "?" + r : "";
      try {
        const t = this._getFinalPath(e),
          r = yield Be(this.fetch, `${this.url}/${s}/${t}${i}`, { headers: this.headers, noResolveJson: !0 });
        return { data: yield r.blob(), error: null };
      } catch (e) {
        if (je(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  getPublicUrl(e, t) {
    const s = this._getFinalPath(e),
      r = [],
      i = (null == t ? void 0 : t.download) ? "download=" + (!0 === t.download ? "" : t.download) : "";
    "" !== i && r.push(i);
    const n = void 0 !== (null == t ? void 0 : t.transform) ? "render/image" : "object",
      a = this.transformOptsToQueryString((null == t ? void 0 : t.transform) || {});
    "" !== a && r.push(a);
    let o = r.join("&");
    return "" !== o && (o = "?" + o), { data: { publicUrl: encodeURI(`${this.url}/${n}/public/${s}${o}`) } };
  }
  remove(e) {
    return He(this, void 0, void 0, function* () {
      try {
        return { data: yield Je(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: e }, { headers: this.headers }), error: null };
      } catch (e) {
        if (je(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  list(e, t, s) {
    return He(this, void 0, void 0, function* () {
      try {
        const r = Object.assign(Object.assign(Object.assign({}, Ke), t), { prefix: e || "" });
        return { data: yield ze(this.fetch, `${this.url}/object/list/${this.bucketId}`, r, { headers: this.headers }, s), error: null };
      } catch (e) {
        if (je(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  _getFinalPath(e) {
    return `${this.bucketId}/${e}`;
  }
  _removeEmptyFolders(e) {
    return e.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
  }
  transformOptsToQueryString(e) {
    const t = [];
    return e.width && t.push("width=" + e.width), e.height && t.push("height=" + e.height), e.resize && t.push("resize=" + e.resize), e.format && t.push("format=" + e.format), e.quality && t.push("quality=" + e.quality), t.join("&");
  }
}
const Ve = { "X-Client-Info": "storage-js/2.6.0" };
var Ye = (e, t, s, r) =>
  new (s || (s = Promise))((i, n) => {
    function a(e) {
      try {
        h(r.next(e));
      } catch (e) {
        n(e);
      }
    }
    function o(e) {
      try {
        h(r.throw(e));
      } catch (e) {
        n(e);
      }
    }
    function h(e) {
      var t;
      e.done
        ? i(e.value)
        : ((t = e.value),
          t instanceof s
            ? t
            : new s((e) => {
                e(t);
              })).then(a, o);
    }
    h((r = r.apply(e, t || [])).next());
  });
class Qe {
  constructor(e, t = {}, s) {
    (this.url = e), (this.headers = Object.assign(Object.assign({}, Ve), t)), (this.fetch = De(s));
  }
  listBuckets() {
    return Ye(this, void 0, void 0, function* () {
      try {
        return { data: yield Be(this.fetch, this.url + "/bucket", { headers: this.headers }), error: null };
      } catch (e) {
        if (je(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  getBucket(e) {
    return Ye(this, void 0, void 0, function* () {
      try {
        return { data: yield Be(this.fetch, `${this.url}/bucket/${e}`, { headers: this.headers }), error: null };
      } catch (e) {
        if (je(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  createBucket(e, t = { public: !1 }) {
    return Ye(this, void 0, void 0, function* () {
      try {
        return { data: yield ze(this.fetch, this.url + "/bucket", { id: e, name: e, public: t.public, file_size_limit: t.fileSizeLimit, allowed_mime_types: t.allowedMimeTypes }, { headers: this.headers }), error: null };
      } catch (e) {
        if (je(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  updateBucket(e, t) {
    return Ye(this, void 0, void 0, function* () {
      try {
        const s = yield (function (e, t, s, r, i) {
          return Ue(this, void 0, void 0, function* () {
            return qe(e, "PUT", t, r, i, s);
          });
        })(this.fetch, `${this.url}/bucket/${e}`, { id: e, name: e, public: t.public, file_size_limit: t.fileSizeLimit, allowed_mime_types: t.allowedMimeTypes }, { headers: this.headers });
        return { data: s, error: null };
      } catch (e) {
        if (je(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  emptyBucket(e) {
    return Ye(this, void 0, void 0, function* () {
      try {
        return { data: yield ze(this.fetch, `${this.url}/bucket/${e}/empty`, {}, { headers: this.headers }), error: null };
      } catch (e) {
        if (je(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  deleteBucket(e) {
    return Ye(this, void 0, void 0, function* () {
      try {
        return { data: yield Je(this.fetch, `${this.url}/bucket/${e}`, {}, { headers: this.headers }), error: null };
      } catch (e) {
        if (je(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
}
class Xe extends Qe {
  constructor(e, t = {}, s) {
    super(e, t, s);
  }
  from(e) {
    return new Ge(this.url, this.headers, e, this.fetch);
  }
}
let Ze = "";
Ze = "undefined" != typeof Deno ? "deno" : "undefined" != typeof document ? "web" : "undefined" != typeof navigator && "ReactNative" === navigator.product ? "react-native" : "node";
const et = { headers: { "X-Client-Info": `supabase-js-${Ze}/2.44.4` } },
  tt = { schema: "public" },
  st = { autoRefreshToken: !0, persistSession: !0, detectSessionInUrl: !0, flowType: "implicit" },
  rt = {};
var it = (e, t, s, r) =>
  new (s || (s = Promise))((i, n) => {
    function a(e) {
      try {
        h(r.next(e));
      } catch (e) {
        n(e);
      }
    }
    function o(e) {
      try {
        h(r.throw(e));
      } catch (e) {
        n(e);
      }
    }
    function h(e) {
      var t;
      e.done
        ? i(e.value)
        : ((t = e.value),
          t instanceof s
            ? t
            : new s((e) => {
                e(t);
              })).then(a, o);
    }
    h((r = r.apply(e, t || [])).next());
  });
const nt = (e) => {
    let t;
    return (t = e || ("undefined" == typeof fetch ? y : fetch)), (...e) => t(...e);
  },
  at = (e, t, s) => {
    const r = nt(s),
      i = "undefined" == typeof Headers ? v : Headers;
    return (s, n) =>
      it(void 0, void 0, void 0, function* () {
        var a;
        const o = null !== (a = yield t()) && void 0 !== a ? a : e;
        let h = new i(null == n ? void 0 : n.headers);
        return h.has("apikey") || h.set("apikey", e), h.has("Authorization") || h.set("Authorization", "Bearer " + o), r(s, Object.assign(Object.assign({}, n), { headers: h }));
      });
  };
const ot = "2.64.4",
  ht = { "X-Client-Info": "gotrue-js/" + ot },
  lt = "X-Supabase-Api-Version",
  ct = { "2024-01-01": { timestamp: Date.parse("2024-01-01T00:00:00.0Z"), name: "2024-01-01" } };
const dt = () => "undefined" != typeof document,
  ut = { tested: !1, writable: !1 },
  pt = () => {
    if (!dt()) return !1;
    try {
      if ("object" != typeof globalThis.localStorage) return !1;
    } catch (e) {
      return !1;
    }
    if (ut.tested) return ut.writable;
    const e = `lswt-${Math.random()}${Math.random()}`;
    try {
      globalThis.localStorage.setItem(e, e), globalThis.localStorage.removeItem(e), (ut.tested = !0), (ut.writable = !0);
    } catch (e) {
      (ut.tested = !0), (ut.writable = !1);
    }
    return ut.writable;
  };
function ft(e) {
  const t = {},
    s = new URL(e);
  if (s.hash && "#" === s.hash[0])
    try {
      new URLSearchParams(s.hash.substring(1)).forEach((e, s) => {
        t[s] = e;
      });
    } catch (e) {}
  return (
    s.searchParams.forEach((e, s) => {
      t[s] = e;
    }),
    t
  );
}
const _t = (e) => {
    let t;
    return (
      (t =
        e ||
        ("undefined" == typeof fetch
          ? (...e) =>
              Promise.resolve()
                .then(() => S)
                .then(({ default: t }) => t(...e))
          : fetch)),
      (...e) => t(...e)
    );
  },
  gt = (e) => "object" == typeof e && null !== e && "status" in e && "ok" in e && "json" in e && "function" == typeof e.json,
  mt = async (e, t, s) => {
    await e.setItem(t, JSON.stringify(s));
  },
  yt = async (e, t) => {
    const s = await e.getItem(t);
    if (!s) return null;
    try {
      return JSON.parse(s);
    } catch (e) {
      return s;
    }
  },
  vt = async (e, t) => {
    await e.removeItem(t);
  };
class bt {
  constructor() {
    this.promise = new bt.promiseConstructor((e, t) => {
      (this.resolve = e), (this.reject = t);
    });
  }
}
function wt(e) {
  const t = e.split(".");
  if (3 !== t.length) throw Error("JWT is not valid: not a JWT structure");
  if (!/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i.test(t[1])) throw Error("JWT is not valid: payload is not in base64url format");
  const s = t[1];
  return JSON.parse(
    (function (e) {
      const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      let s,
        r,
        i,
        n,
        a,
        o,
        h,
        l = "",
        c = 0;
      for (e = e.replace("-", "+").replace("_", "/"); c < e.length; )
        (n = t.indexOf(e.charAt(c++))),
          (a = t.indexOf(e.charAt(c++))),
          (o = t.indexOf(e.charAt(c++))),
          (h = t.indexOf(e.charAt(c++))),
          (s = (n << 2) | (a >> 4)),
          (r = ((15 & a) << 4) | (o >> 2)),
          (i = ((3 & o) << 6) | h),
          (l += String.fromCharCode(s)),
          64 != o && 0 != r && (l += String.fromCharCode(r)),
          64 != h && 0 != i && (l += String.fromCharCode(i));
      return l;
    })(s)
  );
}
function St(e) {
  return ("0" + e.toString(16)).substr(-2);
}
async function kt(e) {
  if (!("undefined" != typeof crypto && void 0 !== crypto.subtle && "undefined" != typeof TextEncoder)) return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), e;
  const t = await (async function (e) {
    const t = new TextEncoder().encode(e),
      s = await crypto.subtle.digest("SHA-256", t),
      r = new Uint8Array(s);
    return Array.from(r)
      .map((e) => String.fromCharCode(e))
      .join("");
  })(e);
  return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function Tt(e, t, s = !1) {
  const r = (function () {
    const e = new Uint32Array(56);
    if ("undefined" == typeof crypto) {
      const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",
        t = e.length;
      let s = "";
      for (let r = 0; r < 56; r++) s += e.charAt(Math.floor(Math.random() * t));
      return s;
    }
    return crypto.getRandomValues(e), Array.from(e, St).join("");
  })();
  let i = r;
  s && (i += "/PASSWORD_RECOVERY"), await mt(e, t + "-code-verifier", i);
  const n = await kt(r);
  return [n, r === n ? "plain" : "s256"];
}
bt.promiseConstructor = Promise;
const Ct = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
class Et extends Error {
  constructor(e, t, s) {
    super(e), (this.__isAuthError = !0), (this.name = "AuthError"), (this.status = t), (this.code = s);
  }
}
function xt(e) {
  return "object" == typeof e && null !== e && "__isAuthError" in e;
}
class Rt extends Et {
  constructor(e, t, s) {
    super(e, t, s), (this.name = "AuthApiError"), (this.status = t), (this.code = s);
  }
}
class Pt extends Et {
  constructor(e, t) {
    super(e), (this.name = "AuthUnknownError"), (this.originalError = t);
  }
}
class At extends Et {
  constructor(e, t, s, r) {
    super(e, s, r), (this.name = t), (this.status = s);
  }
}
class Ot extends At {
  constructor() {
    super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
  }
}
class jt extends At {
  constructor() {
    super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
  }
}
class It extends At {
  constructor(e) {
    super(e, "AuthInvalidCredentialsError", 400, void 0);
  }
}
class Lt extends At {
  constructor(e, t = null) {
    super(e, "AuthImplicitGrantRedirectError", 500, void 0), (this.details = null), (this.details = t);
  }
  toJSON() {
    return { name: this.name, message: this.message, status: this.status, details: this.details };
  }
}
class Nt extends At {
  constructor(e, t = null) {
    super(e, "AuthPKCEGrantCodeExchangeError", 500, void 0), (this.details = null), (this.details = t);
  }
  toJSON() {
    return { name: this.name, message: this.message, status: this.status, details: this.details };
  }
}
class Dt extends At {
  constructor(e, t) {
    super(e, "AuthRetryableFetchError", t, void 0);
  }
}
function Ut(e) {
  return xt(e) && "AuthRetryableFetchError" === e.name;
}
class Ft extends At {
  constructor(e, t, s) {
    super(e, "AuthWeakPasswordError", t, "weak_password"), (this.reasons = s);
  }
}
var $t = (e, t) => {
  var s = {};
  for (var r in e) ({}.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (s[r] = e[r]));
  if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
    var i = 0;
    for (r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && {}.propertyIsEnumerable.call(e, r[i]) && (s[r[i]] = e[r[i]]);
  }
  return s;
};
const Mt = (e) => e.msg || e.message || e.error_description || e.error || JSON.stringify(e),
  qt = [502, 503, 504];
async function Bt(e) {
  var t;
  if (!gt(e)) throw new Dt(Mt(e), 0);
  if (qt.includes(e.status)) throw new Dt(Mt(e), e.status);
  let s, r;
  try {
    s = await e.json();
  } catch (e) {
    throw new Pt(Mt(e), e);
  }
  const i = (function (e) {
    const t = e.headers.get(lt);
    if (!t) return null;
    if (!t.match(Ct)) return null;
    try {
      return new Date(t + "T00:00:00.0Z");
    } catch (e) {
      return null;
    }
  })(e);
  if ((i && i.getTime() >= ct["2024-01-01"].timestamp && "object" == typeof s && s && "string" == typeof s.code ? (r = s.code) : "object" == typeof s && s && "string" == typeof s.error_code && (r = s.error_code), r)) {
    if ("weak_password" === r) throw new Ft(Mt(s), e.status, (null === (t = s.weak_password) || void 0 === t ? void 0 : t.reasons) || []);
  } else if (
    "object" == typeof s &&
    s &&
    "object" == typeof s.weak_password &&
    s.weak_password &&
    Array.isArray(s.weak_password.reasons) &&
    s.weak_password.reasons.length &&
    s.weak_password.reasons.reduce((e, t) => e && "string" == typeof t, !0)
  )
    throw new Ft(Mt(s), e.status, s.weak_password.reasons);
  throw new Rt(Mt(s), e.status || 500, r);
}
const zt = (e, t, s, r) => {
  const i = { method: e, headers: (null == t ? void 0 : t.headers) || {} };
  return "GET" === e ? i : ((i.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, null == t ? void 0 : t.headers)), (i.body = JSON.stringify(r)), Object.assign(Object.assign({}, i), s));
};
async function Jt(e, t, s, r) {
  var i;
  const n = Object.assign({}, null == r ? void 0 : r.headers);
  n[lt] || (n[lt] = ct["2024-01-01"].name), (null == r ? void 0 : r.jwt) && (n.Authorization = "Bearer " + r.jwt);
  const a = null !== (i = null == r ? void 0 : r.query) && void 0 !== i ? i : {};
  (null == r ? void 0 : r.redirectTo) && (a.redirect_to = r.redirectTo);
  const o = Object.keys(a).length ? "?" + new URLSearchParams(a).toString() : "",
    h = await (async function (e, t, s, r, i, n) {
      const a = zt(t, r, i, n);
      let o;
      try {
        o = await e(s, Object.assign({}, a));
      } catch (e) {
        throw (console.error(e), new Dt(Mt(e), 0));
      }
      o.ok || (await Bt(o));
      if (null == r ? void 0 : r.noResolveJson) return o;
      try {
        return await o.json();
      } catch (e) {
        await Bt(e);
      }
    })(e, t, s + o, { headers: n, noResolveJson: null == r ? void 0 : r.noResolveJson }, {}, null == r ? void 0 : r.body);
  return (null == r ? void 0 : r.xform) ? (null == r ? void 0 : r.xform(h)) : { data: Object.assign({}, h), error: null };
}
function Ht(e) {
  var t;
  let s = null;
  var r;
  (function (e) {
    return e.access_token && e.refresh_token && e.expires_in;
  })(e) && ((s = Object.assign({}, e)), e.expires_at || (s.expires_at = ((r = e.expires_in), Math.round(Date.now() / 1e3) + r)));
  return { data: { session: s, user: null !== (t = e.user) && void 0 !== t ? t : e }, error: null };
}
function Kt(e) {
  const t = Ht(e);
  return (
    !t.error &&
      e.weak_password &&
      "object" == typeof e.weak_password &&
      Array.isArray(e.weak_password.reasons) &&
      e.weak_password.reasons.length &&
      e.weak_password.message &&
      "string" == typeof e.weak_password.message &&
      e.weak_password.reasons.reduce((e, t) => e && "string" == typeof t, !0) &&
      (t.data.weak_password = e.weak_password),
    t
  );
}
function Wt(e) {
  var t;
  return { data: { user: null !== (t = e.user) && void 0 !== t ? t : e }, error: null };
}
function Gt(e) {
  return { data: e, error: null };
}
function Vt(e) {
  const { action_link: t, email_otp: s, hashed_token: r, redirect_to: i, verification_type: n } = e,
    a = $t(e, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]);
  return { data: { properties: { action_link: t, email_otp: s, hashed_token: r, redirect_to: i, verification_type: n }, user: Object.assign({}, a) }, error: null };
}
function Yt(e) {
  return e;
}
var Qt = (e, t) => {
  var s = {};
  for (var r in e) ({}.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (s[r] = e[r]));
  if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
    var i = 0;
    for (r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && {}.propertyIsEnumerable.call(e, r[i]) && (s[r[i]] = e[r[i]]);
  }
  return s;
};
class Xt {
  constructor({ url: e = "", headers: t = {}, fetch: s }) {
    (this.url = e), (this.headers = t), (this.fetch = _t(s)), (this.mfa = { listFactors: this._listFactors.bind(this), deleteFactor: this._deleteFactor.bind(this) });
  }
  async signOut(e, t = "global") {
    try {
      return await Jt(this.fetch, "POST", `${this.url}/logout?scope=${t}`, { headers: this.headers, jwt: e, noResolveJson: !0 }), { data: null, error: null };
    } catch (e) {
      if (xt(e)) return { data: null, error: e };
      throw e;
    }
  }
  async inviteUserByEmail(e, t = {}) {
    try {
      return await Jt(this.fetch, "POST", this.url + "/invite", { body: { email: e, data: t.data }, headers: this.headers, redirectTo: t.redirectTo, xform: Wt });
    } catch (e) {
      if (xt(e)) return { data: { user: null }, error: e };
      throw e;
    }
  }
  async generateLink(e) {
    try {
      const { options: t } = e,
        s = Qt(e, ["options"]),
        r = Object.assign(Object.assign({}, s), t);
      return (
        "newEmail" in s && ((r.new_email = null == s ? void 0 : s.newEmail), delete r.newEmail),
        await Jt(this.fetch, "POST", this.url + "/admin/generate_link", { body: r, headers: this.headers, xform: Vt, redirectTo: null == t ? void 0 : t.redirectTo })
      );
    } catch (e) {
      if (xt(e)) return { data: { properties: null, user: null }, error: e };
      throw e;
    }
  }
  async createUser(e) {
    try {
      return await Jt(this.fetch, "POST", this.url + "/admin/users", { body: e, headers: this.headers, xform: Wt });
    } catch (e) {
      if (xt(e)) return { data: { user: null }, error: e };
      throw e;
    }
  }
  async listUsers(e) {
    var t, s, r, i, n, a, o;
    try {
      const h = { nextPage: null, lastPage: 0, total: 0 },
        l = await Jt(this.fetch, "GET", this.url + "/admin/users", {
          headers: this.headers,
          noResolveJson: !0,
          query: {
            page: null !== (s = null === (t = null == e ? void 0 : e.page) || void 0 === t ? void 0 : t.toString()) && void 0 !== s ? s : "",
            per_page: null !== (i = null === (r = null == e ? void 0 : e.perPage) || void 0 === r ? void 0 : r.toString()) && void 0 !== i ? i : "",
          },
          xform: Yt,
        });
      if (l.error) throw l.error;
      const c = await l.json(),
        d = null !== (n = l.headers.get("x-total-count")) && void 0 !== n ? n : 0,
        u = null !== (o = null === (a = l.headers.get("link")) || void 0 === a ? void 0 : a.split(",")) && void 0 !== o ? o : [];
      return (
        u.length > 0 &&
          (u.forEach((e) => {
            const t = parseInt(e.split(";")[0].split("=")[1].substring(0, 1)),
              s = JSON.parse(e.split(";")[1].split("=")[1]);
            h[s + "Page"] = t;
          }),
          (h.total = parseInt(d))),
        { data: Object.assign(Object.assign({}, c), h), error: null }
      );
    } catch (e) {
      if (xt(e)) return { data: { users: [] }, error: e };
      throw e;
    }
  }
  async getUserById(e) {
    try {
      return await Jt(this.fetch, "GET", `${this.url}/admin/users/${e}`, { headers: this.headers, xform: Wt });
    } catch (e) {
      if (xt(e)) return { data: { user: null }, error: e };
      throw e;
    }
  }
  async updateUserById(e, t) {
    try {
      return await Jt(this.fetch, "PUT", `${this.url}/admin/users/${e}`, { body: t, headers: this.headers, xform: Wt });
    } catch (e) {
      if (xt(e)) return { data: { user: null }, error: e };
      throw e;
    }
  }
  async deleteUser(e, t = !1) {
    try {
      return await Jt(this.fetch, "DELETE", `${this.url}/admin/users/${e}`, { headers: this.headers, body: { should_soft_delete: t }, xform: Wt });
    } catch (e) {
      if (xt(e)) return { data: { user: null }, error: e };
      throw e;
    }
  }
  async _listFactors(e) {
    try {
      const { data: t, error: s } = await Jt(this.fetch, "GET", `${this.url}/admin/users/${e.userId}/factors`, {
        headers: this.headers,
        xform(e) {
          return { data: { factors: e }, error: null };
        },
      });
      return { data: t, error: s };
    } catch (e) {
      if (xt(e)) return { data: null, error: e };
      throw e;
    }
  }
  async _deleteFactor(e) {
    try {
      return { data: await Jt(this.fetch, "DELETE", `${this.url}/admin/users/${e.userId}/factors/${e.id}`, { headers: this.headers }), error: null };
    } catch (e) {
      if (xt(e)) return { data: null, error: e };
      throw e;
    }
  }
}
const Zt = {
  getItem(e) {
    return pt() ? globalThis.localStorage.getItem(e) : null;
  },
  setItem(e, t) {
    pt() && globalThis.localStorage.setItem(e, t);
  },
  removeItem(e) {
    pt() && globalThis.localStorage.removeItem(e);
  },
};
function es(e = {}) {
  return {
    getItem(t) {
      return e[t] || null;
    },
    setItem(t, s) {
      e[t] = s;
    },
    removeItem(t) {
      delete e[t];
    },
  };
}
const ts = !!(globalThis && pt() && globalThis.localStorage && "true" === globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug"));
class ss extends Error {
  constructor(e) {
    super(e), (this.isAcquireTimeout = !0);
  }
}
class rs extends ss {}
async function is(e, t, s) {
  const r = new globalThis.AbortController();
  return (
    t > 0 &&
      setTimeout(() => {
        r.abort();
      }, t),
    await globalThis.navigator.locks.request(e, 0 === t ? { mode: "exclusive", ifAvailable: !0 } : { mode: "exclusive", signal: r.signal }, async (r) => {
      if (!r) {
        if (0 === t) throw new rs(`Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`);
        if (ts)
          try {
            await globalThis.navigator.locks.query();
          } catch (e) {
            console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", e);
          }
        return (
          console.warn(
            "@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"
          ),
          await s()
        );
      }
      try {
        return await s();
      } finally {
      }
    })
  );
}
!(function () {
  if ("object" != typeof globalThis)
    try {
      Object.defineProperty(Object.prototype, "__magic__", {
        get() {
          return this;
        },
        configurable: !0,
      }),
        (__magic__.globalThis = __magic__),
        delete Object.prototype.__magic__;
    } catch (e) {
      "undefined" != typeof self && (self.globalThis = self);
    }
})();
const ns = { url: "http://localhost:9999", storageKey: "supabase.auth.token", autoRefreshToken: !0, persistSession: !0, detectSessionInUrl: !0, headers: ht, flowType: "implicit", debug: !1, hasCustomAuthorizationHeader: !1 },
  as = 3e4;
async function os(e, t, s) {
  return await s();
}
class hs {
  constructor(e) {
    var t, s;
    (this.memoryStorage = null),
      (this.stateChangeEmitters = new Map()),
      (this.autoRefreshTicker = null),
      (this.visibilityChangedCallback = null),
      (this.refreshingDeferred = null),
      (this.initializePromise = null),
      (this.detectSessionInUrl = !0),
      (this.hasCustomAuthorizationHeader = !1),
      (this.suppressGetSessionWarning = !1),
      (this.lockAcquired = !1),
      (this.pendingInLock = []),
      (this.broadcastChannel = null),
      (this.logger = console.log),
      (this.instanceID = hs.nextInstanceID),
      (hs.nextInstanceID += 1),
      this.instanceID > 0 &&
        dt() &&
        console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");
    const r = Object.assign(Object.assign({}, ns), e);
    if (
      ((this.logDebugMessages = !!r.debug),
      "function" == typeof r.debug && (this.logger = r.debug),
      (this.persistSession = r.persistSession),
      (this.storageKey = r.storageKey),
      (this.autoRefreshToken = r.autoRefreshToken),
      (this.admin = new Xt({ url: r.url, headers: r.headers, fetch: r.fetch })),
      (this.url = r.url),
      (this.headers = r.headers),
      (this.fetch = _t(r.fetch)),
      (this.lock = r.lock || os),
      (this.detectSessionInUrl = r.detectSessionInUrl),
      (this.flowType = r.flowType),
      (this.hasCustomAuthorizationHeader = r.hasCustomAuthorizationHeader),
      r.lock ? (this.lock = r.lock) : dt() && (null === (t = null === globalThis || void 0 === globalThis ? void 0 : globalThis.navigator) || void 0 === t ? void 0 : t.locks) ? (this.lock = is) : (this.lock = os),
      (this.mfa = {
        verify: this._verify.bind(this),
        enroll: this._enroll.bind(this),
        unenroll: this._unenroll.bind(this),
        challenge: this._challenge.bind(this),
        listFactors: this._listFactors.bind(this),
        challengeAndVerify: this._challengeAndVerify.bind(this),
        getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this),
      }),
      this.persistSession ? (r.storage ? (this.storage = r.storage) : pt() ? (this.storage = Zt) : ((this.memoryStorage = {}), (this.storage = es(this.memoryStorage)))) : ((this.memoryStorage = {}), (this.storage = es(this.memoryStorage))),
      dt() && globalThis.BroadcastChannel && this.persistSession && this.storageKey)
    ) {
      try {
        this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
      } catch (e) {
        console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e);
      }
      null === (s = this.broadcastChannel) ||
        void 0 === s ||
        s.addEventListener("message", async (e) => {
          this._debug("received broadcast notification from other tab or client", e), await this._notifyAllSubscribers(e.data.event, e.data.session, !1);
        });
    }
    this.initialize();
  }
  _debug(...e) {
    return this.logDebugMessages && this.logger(`GoTrueClient@${this.instanceID} (${ot}) ${new Date().toISOString()}`, ...e), this;
  }
  async initialize() {
    return this.initializePromise || (this.initializePromise = (async () => await this._acquireLock(-1, async () => await this._initialize()))()), await this.initializePromise;
  }
  async _initialize() {
    try {
      const e = !!dt() && (await this._isPKCEFlow());
      if ((this._debug("#_initialize()", "begin", "is PKCE flow", e), e || (this.detectSessionInUrl && this._isImplicitGrantFlow()))) {
        const { data: t, error: s } = await this._getSessionFromURL(e);
        if (s)
          return (
            this._debug("#_initialize()", "error detecting session from URL", s),
            "Identity is already linked" === (null == s ? void 0 : s.message) || "Identity is already linked to another user" === (null == s ? void 0 : s.message) || (await this._removeSession()),
            { error: s }
          );
        const { session: r, redirectType: i } = t;
        return (
          this._debug("#_initialize()", "detected session in URL", r, "redirect type", i),
          await this._saveSession(r),
          setTimeout(async () => {
            "recovery" === i ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", r) : await this._notifyAllSubscribers("SIGNED_IN", r);
          }, 0),
          { error: null }
        );
      }
      return await this._recoverAndRefresh(), { error: null };
    } catch (e) {
      return xt(e) ? { error: e } : { error: new Pt("Unexpected error during initialization", e) };
    } finally {
      await this._handleVisibilityChange(), this._debug("#_initialize()", "end");
    }
  }
  async signInAnonymously(e) {
    var t, s, r;
    try {
      const i = await Jt(this.fetch, "POST", this.url + "/signup", {
          headers: this.headers,
          body: {
            data: null !== (s = null === (t = null == e ? void 0 : e.options) || void 0 === t ? void 0 : t.data) && void 0 !== s ? s : {},
            gotrue_meta_security: { captcha_token: null === (r = null == e ? void 0 : e.options) || void 0 === r ? void 0 : r.captchaToken },
          },
          xform: Ht,
        }),
        { data: n, error: a } = i;
      if (a || !n) return { data: { user: null, session: null }, error: a };
      const o = n.session,
        h = n.user;
      return n.session && (await this._saveSession(n.session), await this._notifyAllSubscribers("SIGNED_IN", o)), { data: { user: h, session: o }, error: null };
    } catch (e) {
      if (xt(e)) return { data: { user: null, session: null }, error: e };
      throw e;
    }
  }
  async signUp(e) {
    var t, s, r;
    try {
      let i;
      if ("email" in e) {
        const { email: s, password: r, options: n } = e;
        let a = null,
          o = null;
        "pkce" === this.flowType && ([a, o] = await Tt(this.storage, this.storageKey)),
          (i = await Jt(this.fetch, "POST", this.url + "/signup", {
            headers: this.headers,
            redirectTo: null == n ? void 0 : n.emailRedirectTo,
            body: {
              email: s,
              password: r,
              data: null !== (t = null == n ? void 0 : n.data) && void 0 !== t ? t : {},
              gotrue_meta_security: { captcha_token: null == n ? void 0 : n.captchaToken },
              code_challenge: a,
              code_challenge_method: o,
            },
            xform: Ht,
          }));
      } else {
        if (!("phone" in e)) throw new It("You must provide either an email or phone number and a password");
        {
          const { phone: t, password: n, options: a } = e;
          i = await Jt(this.fetch, "POST", this.url + "/signup", {
            headers: this.headers,
            body: {
              phone: t,
              password: n,
              data: null !== (s = null == a ? void 0 : a.data) && void 0 !== s ? s : {},
              channel: null !== (r = null == a ? void 0 : a.channel) && void 0 !== r ? r : "sms",
              gotrue_meta_security: { captcha_token: null == a ? void 0 : a.captchaToken },
            },
            xform: Ht,
          });
        }
      }
      const { data: n, error: a } = i;
      if (a || !n) return { data: { user: null, session: null }, error: a };
      const o = n.session,
        h = n.user;
      return n.session && (await this._saveSession(n.session), await this._notifyAllSubscribers("SIGNED_IN", o)), { data: { user: h, session: o }, error: null };
    } catch (e) {
      if (xt(e)) return { data: { user: null, session: null }, error: e };
      throw e;
    }
  }
  async signInWithPassword(e) {
    try {
      let t;
      if ("email" in e) {
        const { email: s, password: r, options: i } = e;
        t = await Jt(this.fetch, "POST", this.url + "/token?grant_type=password", { headers: this.headers, body: { email: s, password: r, gotrue_meta_security: { captcha_token: null == i ? void 0 : i.captchaToken } }, xform: Kt });
      } else {
        if (!("phone" in e)) throw new It("You must provide either an email or phone number and a password");
        {
          const { phone: s, password: r, options: i } = e;
          t = await Jt(this.fetch, "POST", this.url + "/token?grant_type=password", { headers: this.headers, body: { phone: s, password: r, gotrue_meta_security: { captcha_token: null == i ? void 0 : i.captchaToken } }, xform: Kt });
        }
      }
      const { data: s, error: r } = t;
      return r
        ? { data: { user: null, session: null }, error: r }
        : s && s.session && s.user
        ? (s.session && (await this._saveSession(s.session), await this._notifyAllSubscribers("SIGNED_IN", s.session)),
          { data: Object.assign({ user: s.user, session: s.session }, s.weak_password ? { weakPassword: s.weak_password } : null), error: r })
        : { data: { user: null, session: null }, error: new jt() };
    } catch (e) {
      if (xt(e)) return { data: { user: null, session: null }, error: e };
      throw e;
    }
  }
  async signInWithOAuth(e) {
    var t, s, r, i;
    return await this._handleProviderSignIn(e.provider, {
      redirectTo: null === (t = e.options) || void 0 === t ? void 0 : t.redirectTo,
      scopes: null === (s = e.options) || void 0 === s ? void 0 : s.scopes,
      queryParams: null === (r = e.options) || void 0 === r ? void 0 : r.queryParams,
      skipBrowserRedirect: null === (i = e.options) || void 0 === i ? void 0 : i.skipBrowserRedirect,
    });
  }
  async exchangeCodeForSession(e) {
    return await this.initializePromise, this._acquireLock(-1, async () => this._exchangeCodeForSession(e));
  }
  async _exchangeCodeForSession(e) {
    const t = await yt(this.storage, this.storageKey + "-code-verifier"),
      [s, r] = (null != t ? t : "").split("/"),
      { data: i, error: n } = await Jt(this.fetch, "POST", this.url + "/token?grant_type=pkce", { headers: this.headers, body: { auth_code: e, code_verifier: s }, xform: Ht });
    return (
      await vt(this.storage, this.storageKey + "-code-verifier"),
      n
        ? { data: { user: null, session: null, redirectType: null }, error: n }
        : i && i.session && i.user
        ? (i.session && (await this._saveSession(i.session), await this._notifyAllSubscribers("SIGNED_IN", i.session)), { data: Object.assign(Object.assign({}, i), { redirectType: null != r ? r : null }), error: n })
        : { data: { user: null, session: null, redirectType: null }, error: new jt() }
    );
  }
  async signInWithIdToken(e) {
    try {
      const { options: t, provider: s, token: r, access_token: i, nonce: n } = e,
        a = await Jt(this.fetch, "POST", this.url + "/token?grant_type=id_token", {
          headers: this.headers,
          body: { provider: s, id_token: r, access_token: i, nonce: n, gotrue_meta_security: { captcha_token: null == t ? void 0 : t.captchaToken } },
          xform: Ht,
        }),
        { data: o, error: h } = a;
      return h
        ? { data: { user: null, session: null }, error: h }
        : o && o.session && o.user
        ? (o.session && (await this._saveSession(o.session), await this._notifyAllSubscribers("SIGNED_IN", o.session)), { data: o, error: h })
        : { data: { user: null, session: null }, error: new jt() };
    } catch (e) {
      if (xt(e)) return { data: { user: null, session: null }, error: e };
      throw e;
    }
  }
  async signInWithOtp(e) {
    var t, s, r, i, n;
    try {
      if ("email" in e) {
        const { email: r, options: i } = e;
        let n = null,
          a = null;
        "pkce" === this.flowType && ([n, a] = await Tt(this.storage, this.storageKey));
        const { error: o } = await Jt(this.fetch, "POST", this.url + "/otp", {
          headers: this.headers,
          body: {
            email: r,
            data: null !== (t = null == i ? void 0 : i.data) && void 0 !== t ? t : {},
            create_user: null === (s = null == i ? void 0 : i.shouldCreateUser) || void 0 === s || s,
            gotrue_meta_security: { captcha_token: null == i ? void 0 : i.captchaToken },
            code_challenge: n,
            code_challenge_method: a,
          },
          redirectTo: null == i ? void 0 : i.emailRedirectTo,
        });
        return { data: { user: null, session: null }, error: o };
      }
      if ("phone" in e) {
        const { phone: t, options: s } = e,
          { data: a, error: o } = await Jt(this.fetch, "POST", this.url + "/otp", {
            headers: this.headers,
            body: {
              phone: t,
              data: null !== (r = null == s ? void 0 : s.data) && void 0 !== r ? r : {},
              create_user: null === (i = null == s ? void 0 : s.shouldCreateUser) || void 0 === i || i,
              gotrue_meta_security: { captcha_token: null == s ? void 0 : s.captchaToken },
              channel: null !== (n = null == s ? void 0 : s.channel) && void 0 !== n ? n : "sms",
            },
          });
        return { data: { user: null, session: null, messageId: null == a ? void 0 : a.message_id }, error: o };
      }
      throw new It("You must provide either an email or phone number.");
    } catch (e) {
      if (xt(e)) return { data: { user: null, session: null }, error: e };
      throw e;
    }
  }
  async verifyOtp(e) {
    var t, s;
    try {
      let r, i;
      "options" in e && ((r = null === (t = e.options) || void 0 === t ? void 0 : t.redirectTo), (i = null === (s = e.options) || void 0 === s ? void 0 : s.captchaToken));
      const { data: n, error: a } = await Jt(this.fetch, "POST", this.url + "/verify", { headers: this.headers, body: Object.assign(Object.assign({}, e), { gotrue_meta_security: { captcha_token: i } }), redirectTo: r, xform: Ht });
      if (a) throw a;
      if (!n) throw Error("An error occurred on token verification.");
      const o = n.session,
        h = n.user;
      return (null == o ? void 0 : o.access_token) && (await this._saveSession(o), await this._notifyAllSubscribers("recovery" == e.type ? "PASSWORD_RECOVERY" : "SIGNED_IN", o)), { data: { user: h, session: o }, error: null };
    } catch (e) {
      if (xt(e)) return { data: { user: null, session: null }, error: e };
      throw e;
    }
  }
  async signInWithSSO(e) {
    var t, s, r;
    try {
      let i = null,
        n = null;
      return (
        "pkce" === this.flowType && ([i, n] = await Tt(this.storage, this.storageKey)),
        await Jt(this.fetch, "POST", this.url + "/sso", {
          body: Object.assign(
            Object.assign(
              Object.assign(Object.assign(Object.assign({}, "providerId" in e ? { provider_id: e.providerId } : null), "domain" in e ? { domain: e.domain } : null), {
                redirect_to: null !== (s = null === (t = e.options) || void 0 === t ? void 0 : t.redirectTo) && void 0 !== s ? s : void 0,
              }),
              (null === (r = null == e ? void 0 : e.options) || void 0 === r ? void 0 : r.captchaToken) ? { gotrue_meta_security: { captcha_token: e.options.captchaToken } } : null
            ),
            { skip_http_redirect: !0, code_challenge: i, code_challenge_method: n }
          ),
          headers: this.headers,
          xform: Gt,
        })
      );
    } catch (e) {
      if (xt(e)) return { data: null, error: e };
      throw e;
    }
  }
  async reauthenticate() {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._reauthenticate());
  }
  async _reauthenticate() {
    try {
      return await this._useSession(async (e) => {
        const {
          data: { session: t },
          error: s,
        } = e;
        if (s) throw s;
        if (!t) throw new Ot();
        const { error: r } = await Jt(this.fetch, "GET", this.url + "/reauthenticate", { headers: this.headers, jwt: t.access_token });
        return { data: { user: null, session: null }, error: r };
      });
    } catch (e) {
      if (xt(e)) return { data: { user: null, session: null }, error: e };
      throw e;
    }
  }
  async resend(e) {
    try {
      const t = this.url + "/resend";
      if ("email" in e) {
        const { email: s, type: r, options: i } = e,
          { error: n } = await Jt(this.fetch, "POST", t, {
            headers: this.headers,
            body: { email: s, type: r, gotrue_meta_security: { captcha_token: null == i ? void 0 : i.captchaToken } },
            redirectTo: null == i ? void 0 : i.emailRedirectTo,
          });
        return { data: { user: null, session: null }, error: n };
      }
      if ("phone" in e) {
        const { phone: s, type: r, options: i } = e,
          { data: n, error: a } = await Jt(this.fetch, "POST", t, { headers: this.headers, body: { phone: s, type: r, gotrue_meta_security: { captcha_token: null == i ? void 0 : i.captchaToken } } });
        return { data: { user: null, session: null, messageId: null == n ? void 0 : n.message_id }, error: a };
      }
      throw new It("You must provide either an email or phone number and a type");
    } catch (e) {
      if (xt(e)) return { data: { user: null, session: null }, error: e };
      throw e;
    }
  }
  async getSession() {
    await this.initializePromise;
    return await this._acquireLock(-1, async () => this._useSession(async (e) => e));
  }
  async _acquireLock(e, t) {
    this._debug("#_acquireLock", "begin", e);
    try {
      if (this.lockAcquired) {
        const e = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(),
          s = (async () => (await e, await t()))();
        return (
          this.pendingInLock.push(
            (async () => {
              try {
                await s;
              } catch (e) {}
            })()
          ),
          s
        );
      }
      return await this.lock("lock:" + this.storageKey, e, async () => {
        this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
        try {
          this.lockAcquired = !0;
          const e = t();
          for (
            this.pendingInLock.push(
              (async () => {
                try {
                  await e;
                } catch (e) {}
              })()
            ),
              await e;
            this.pendingInLock.length;

          ) {
            const e = [...this.pendingInLock];
            await Promise.all(e), this.pendingInLock.splice(0, e.length);
          }
          return await e;
        } finally {
          this._debug("#_acquireLock", "lock released for storage key", this.storageKey), (this.lockAcquired = !1);
        }
      });
    } finally {
      this._debug("#_acquireLock", "end");
    }
  }
  async _useSession(e) {
    this._debug("#_useSession", "begin");
    try {
      const t = await this.__loadSession();
      return await e(t);
    } finally {
      this._debug("#_useSession", "end");
    }
  }
  async __loadSession() {
    this._debug("#__loadSession()", "begin"), this.lockAcquired || this._debug("#__loadSession()", "used outside of an acquired lock!", Error().stack);
    try {
      let e = null;
      const t = await yt(this.storage, this.storageKey);
      if ((this._debug("#getSession()", "session from storage", t), null !== t && (this._isValidSession(t) ? (e = t) : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !e))
        return { data: { session: null }, error: null };
      const s = !!e.expires_at && e.expires_at <= Date.now() / 1e3;
      if ((this._debug("#__loadSession()", `session has${s ? "" : " not"} expired`, "expires_at", e.expires_at), !s)) {
        if (this.storage.isServer) {
          let t = this.suppressGetSessionWarning;
          e = new Proxy(e, {
            get: (e, s, r) => (
              t ||
                "user" !== s ||
                (console.warn(
                  "Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and many not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."
                ),
                (t = !0),
                (this.suppressGetSessionWarning = !0)),
              Reflect.get(e, s, r)
            ),
          });
        }
        return { data: { session: e }, error: null };
      }
      const { session: r, error: i } = await this._callRefreshToken(e.refresh_token);
      return i ? { data: { session: null }, error: i } : { data: { session: r }, error: null };
    } finally {
      this._debug("#__loadSession()", "end");
    }
  }
  async getUser(e) {
    if (e) return await this._getUser(e);
    await this.initializePromise;
    return await this._acquireLock(-1, async () => await this._getUser());
  }
  async _getUser(e) {
    try {
      return e
        ? await Jt(this.fetch, "GET", this.url + "/user", { headers: this.headers, jwt: e, xform: Wt })
        : await this._useSession(async (e) => {
            var t, s, r;
            const { data: i, error: n } = e;
            if (n) throw n;
            return (null === (t = i.session) || void 0 === t ? void 0 : t.access_token) || this.hasCustomAuthorizationHeader
              ? await Jt(this.fetch, "GET", this.url + "/user", { headers: this.headers, jwt: null !== (r = null === (s = i.session) || void 0 === s ? void 0 : s.access_token) && void 0 !== r ? r : void 0, xform: Wt })
              : { data: { user: null }, error: new Ot() };
          });
    } catch (e) {
      if (xt(e)) return { data: { user: null }, error: e };
      throw e;
    }
  }
  async updateUser(e, t = {}) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._updateUser(e, t));
  }
  async _updateUser(e, t = {}) {
    try {
      return await this._useSession(async (s) => {
        const { data: r, error: i } = s;
        if (i) throw i;
        if (!r.session) throw new Ot();
        const n = r.session;
        let a = null,
          o = null;
        "pkce" === this.flowType && null != e.email && ([a, o] = await Tt(this.storage, this.storageKey));
        const { data: h, error: l } = await Jt(this.fetch, "PUT", this.url + "/user", {
          headers: this.headers,
          redirectTo: null == t ? void 0 : t.emailRedirectTo,
          body: Object.assign(Object.assign({}, e), { code_challenge: a, code_challenge_method: o }),
          jwt: n.access_token,
          xform: Wt,
        });
        if (l) throw l;
        return (n.user = h.user), await this._saveSession(n), await this._notifyAllSubscribers("USER_UPDATED", n), { data: { user: n.user }, error: null };
      });
    } catch (e) {
      if (xt(e)) return { data: { user: null }, error: e };
      throw e;
    }
  }
  _decodeJWT(e) {
    return wt(e);
  }
  async setSession(e) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._setSession(e));
  }
  async _setSession(e) {
    try {
      if (!e.access_token || !e.refresh_token) throw new Ot();
      const t = Date.now() / 1e3;
      let s = t,
        r = !0,
        i = null;
      const n = wt(e.access_token);
      if ((n.exp && ((s = n.exp), (r = s <= t)), r)) {
        const { session: t, error: s } = await this._callRefreshToken(e.refresh_token);
        if (s) return { data: { user: null, session: null }, error: s };
        if (!t) return { data: { user: null, session: null }, error: null };
        i = t;
      } else {
        const { data: r, error: n } = await this._getUser(e.access_token);
        if (n) throw n;
        (i = { access_token: e.access_token, refresh_token: e.refresh_token, user: r.user, token_type: "bearer", expires_in: s - t, expires_at: s }), await this._saveSession(i), await this._notifyAllSubscribers("SIGNED_IN", i);
      }
      return { data: { user: i.user, session: i }, error: null };
    } catch (e) {
      if (xt(e)) return { data: { session: null, user: null }, error: e };
      throw e;
    }
  }
  async refreshSession(e) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._refreshSession(e));
  }
  async _refreshSession(e) {
    try {
      return await this._useSession(async (t) => {
        var s;
        if (!e) {
          const { data: r, error: i } = t;
          if (i) throw i;
          e = null !== (s = r.session) && void 0 !== s ? s : void 0;
        }
        if (!(null == e ? void 0 : e.refresh_token)) throw new Ot();
        const { session: r, error: i } = await this._callRefreshToken(e.refresh_token);
        return i ? { data: { user: null, session: null }, error: i } : r ? { data: { user: r.user, session: r }, error: null } : { data: { user: null, session: null }, error: null };
      });
    } catch (e) {
      if (xt(e)) return { data: { user: null, session: null }, error: e };
      throw e;
    }
  }
  async _getSessionFromURL(e) {
    try {
      if (!dt()) throw new Lt("No browser detected.");
      if ("implicit" === this.flowType && !this._isImplicitGrantFlow()) throw new Lt("Not a valid implicit grant flow url.");
      if ("pkce" == this.flowType && !e) throw new Nt("Not a valid PKCE flow url.");
      const t = ft(window.location.href);
      if (e) {
        if (!t.code) throw new Nt("No code detected.");
        const { data: e, error: s } = await this._exchangeCodeForSession(t.code);
        if (s) throw s;
        const r = new URL(window.location.href);
        return r.searchParams.delete("code"), window.history.replaceState(window.history.state, "", r.toString()), { data: { session: e.session, redirectType: null }, error: null };
      }
      if (t.error || t.error_description || t.error_code) throw new Lt(t.error_description || "Error in URL with unspecified error_description", { error: t.error || "unspecified_error", code: t.error_code || "unspecified_code" });
      const { provider_token: s, provider_refresh_token: r, access_token: i, refresh_token: n, expires_in: a, expires_at: o, token_type: h } = t;
      if (!(i && a && n && h)) throw new Lt("No session defined in URL");
      const l = Math.round(Date.now() / 1e3),
        c = parseInt(a);
      let d = l + c;
      o && (d = parseInt(o));
      const u = d - l;
      1e3 * u <= as && console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${u}s, should have been closer to ${c}s`);
      const p = d - c;
      l - p >= 120
        ? console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", p, d, l)
        : l - p < 0 && console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clok for skew", p, d, l);
      const { data: f, error: _ } = await this._getUser(i);
      if (_) throw _;
      const g = { provider_token: s, provider_refresh_token: r, access_token: i, expires_in: c, expires_at: d, refresh_token: n, token_type: h, user: f.user };
      return (window.location.hash = ""), this._debug("#_getSessionFromURL()", "clearing window.location.hash"), { data: { session: g, redirectType: t.type }, error: null };
    } catch (e) {
      if (xt(e)) return { data: { session: null, redirectType: null }, error: e };
      throw e;
    }
  }
  _isImplicitGrantFlow() {
    const e = ft(window.location.href);
    return !(!dt() || (!e.access_token && !e.error_description));
  }
  async _isPKCEFlow() {
    const e = ft(window.location.href),
      t = await yt(this.storage, this.storageKey + "-code-verifier");
    return !(!e.code || !t);
  }
  async signOut(e = { scope: "global" }) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._signOut(e));
  }
  async _signOut({ scope: e } = { scope: "global" }) {
    return await this._useSession(async (t) => {
      var s;
      const { data: r, error: i } = t;
      if (i) return { error: i };
      const n = null === (s = r.session) || void 0 === s ? void 0 : s.access_token;
      if (n) {
        const { error: t } = await this.admin.signOut(n, e);
        if (
          t &&
          (!(function (e) {
            return xt(e) && "AuthApiError" === e.name;
          })(t) ||
            (404 !== t.status && 401 !== t.status && 403 !== t.status))
        )
          return { error: t };
      }
      return "others" !== e && (await this._removeSession(), await vt(this.storage, this.storageKey + "-code-verifier"), await this._notifyAllSubscribers("SIGNED_OUT", null)), { error: null };
    });
  }
  onAuthStateChange(e) {
    const t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
        const t = (16 * Math.random()) | 0;
        return ("x" == e ? t : (3 & t) | 8).toString(16);
      }),
      s = {
        id: t,
        callback: e,
        unsubscribe: () => {
          this._debug("#unsubscribe()", "state change callback with id removed", t), this.stateChangeEmitters.delete(t);
        },
      };
    return (
      this._debug("#onAuthStateChange()", "registered callback with id", t),
      this.stateChangeEmitters.set(t, s),
      (async () => {
        await this.initializePromise,
          await this._acquireLock(-1, async () => {
            this._emitInitialSession(t);
          });
      })(),
      { data: { subscription: s } }
    );
  }
  async _emitInitialSession(e) {
    return await this._useSession(async (t) => {
      var s, r;
      try {
        const {
          data: { session: r },
          error: i,
        } = t;
        if (i) throw i;
        await (null === (s = this.stateChangeEmitters.get(e)) || void 0 === s ? void 0 : s.callback("INITIAL_SESSION", r)), this._debug("INITIAL_SESSION", "callback id", e, "session", r);
      } catch (t) {
        await (null === (r = this.stateChangeEmitters.get(e)) || void 0 === r ? void 0 : r.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e, "error", t), console.error(t);
      }
    });
  }
  async resetPasswordForEmail(e, t = {}) {
    let s = null,
      r = null;
    "pkce" === this.flowType && ([s, r] = await Tt(this.storage, this.storageKey, !0));
    try {
      return await Jt(this.fetch, "POST", this.url + "/recover", { body: { email: e, code_challenge: s, code_challenge_method: r, gotrue_meta_security: { captcha_token: t.captchaToken } }, headers: this.headers, redirectTo: t.redirectTo });
    } catch (e) {
      if (xt(e)) return { data: null, error: e };
      throw e;
    }
  }
  async getUserIdentities() {
    var e;
    try {
      const { data: t, error: s } = await this.getUser();
      if (s) throw s;
      return { data: { identities: null !== (e = t.user.identities) && void 0 !== e ? e : [] }, error: null };
    } catch (e) {
      if (xt(e)) return { data: null, error: e };
      throw e;
    }
  }
  async linkIdentity(e) {
    var t;
    try {
      const { data: s, error: r } = await this._useSession(async (t) => {
        var s, r, i, n, a;
        const { data: o, error: h } = t;
        if (h) throw h;
        const l = await this._getUrlForProvider(this.url + "/user/identities/authorize", e.provider, {
          redirectTo: null === (s = e.options) || void 0 === s ? void 0 : s.redirectTo,
          scopes: null === (r = e.options) || void 0 === r ? void 0 : r.scopes,
          queryParams: null === (i = e.options) || void 0 === i ? void 0 : i.queryParams,
          skipBrowserRedirect: !0,
        });
        return await Jt(this.fetch, "GET", l, { headers: this.headers, jwt: null !== (a = null === (n = o.session) || void 0 === n ? void 0 : n.access_token) && void 0 !== a ? a : void 0 });
      });
      if (r) throw r;
      return dt() && !(null === (t = e.options) || void 0 === t ? void 0 : t.skipBrowserRedirect) && window.location.assign(null == s ? void 0 : s.url), { data: { provider: e.provider, url: null == s ? void 0 : s.url }, error: null };
    } catch (t) {
      if (xt(t)) return { data: { provider: e.provider, url: null }, error: t };
      throw t;
    }
  }
  async unlinkIdentity(e) {
    try {
      return await this._useSession(async (t) => {
        var s, r;
        const { data: i, error: n } = t;
        if (n) throw n;
        return await Jt(this.fetch, "DELETE", `${this.url}/user/identities/${e.identity_id}`, { headers: this.headers, jwt: null !== (r = null === (s = i.session) || void 0 === s ? void 0 : s.access_token) && void 0 !== r ? r : void 0 });
      });
    } catch (e) {
      if (xt(e)) return { data: null, error: e };
      throw e;
    }
  }
  async _refreshAccessToken(e) {
    const t = `#_refreshAccessToken(${e.substring(0, 5)}...)`;
    this._debug(t, "begin");
    try {
      const i = Date.now();
      return await ((s = async (s) => (
        s > 0 &&
          (await (async (e) =>
            await new Promise((t) => {
              setTimeout(() => t(null), e);
            }))(200 * Math.pow(2, s - 1))),
        this._debug(t, "refreshing attempt", s),
        await Jt(this.fetch, "POST", this.url + "/token?grant_type=refresh_token", { body: { refresh_token: e }, headers: this.headers, xform: Ht })
      )),
      (r = (e, t) => {
        const s = 200 * Math.pow(2, e);
        return t && Ut(t) && Date.now() + s - i < as;
      }),
      new Promise((e, t) => {
        (async () => {
          for (let i = 0; i < 1 / 0; i++)
            try {
              const t = await s(i);
              if (!r(i, null, t)) return void e(t);
            } catch (e) {
              if (!r(i, e)) return void t(e);
            }
        })();
      }));
    } catch (e) {
      if ((this._debug(t, "error", e), xt(e))) return { data: { session: null, user: null }, error: e };
      throw e;
    } finally {
      this._debug(t, "end");
    }
    var s, r;
  }
  _isValidSession(e) {
    return "object" == typeof e && null !== e && "access_token" in e && "refresh_token" in e && "expires_at" in e;
  }
  async _handleProviderSignIn(e, t) {
    const s = await this._getUrlForProvider(this.url + "/authorize", e, { redirectTo: t.redirectTo, scopes: t.scopes, queryParams: t.queryParams });
    return this._debug("#_handleProviderSignIn()", "provider", e, "options", t, "url", s), dt() && !t.skipBrowserRedirect && window.location.assign(s), { data: { provider: e, url: s }, error: null };
  }
  async _recoverAndRefresh() {
    var e;
    const t = "#_recoverAndRefresh()";
    this._debug(t, "begin");
    try {
      const s = await yt(this.storage, this.storageKey);
      if ((this._debug(t, "session from storage", s), !this._isValidSession(s))) return this._debug(t, "session is not valid"), void (null !== s && (await this._removeSession()));
      const r = Math.round(Date.now() / 1e3),
        i = (null !== (e = s.expires_at) && void 0 !== e ? e : 1 / 0) < r + 10;
      if ((this._debug(t, `session has${i ? "" : " not"} expired with margin of 10s`), i)) {
        if (this.autoRefreshToken && s.refresh_token) {
          const { error: e } = await this._callRefreshToken(s.refresh_token);
          e && (console.error(e), Ut(e) || (this._debug(t, "refresh failed with a non-retryable error, removing the session", e), await this._removeSession()));
        }
      } else await this._notifyAllSubscribers("SIGNED_IN", s);
    } catch (e) {
      return this._debug(t, "error", e), void console.error(e);
    } finally {
      this._debug(t, "end");
    }
  }
  async _callRefreshToken(e) {
    var t, s;
    if (!e) throw new Ot();
    if (this.refreshingDeferred) return this.refreshingDeferred.promise;
    const r = `#_callRefreshToken(${e.substring(0, 5)}...)`;
    this._debug(r, "begin");
    try {
      this.refreshingDeferred = new bt();
      const { data: t, error: s } = await this._refreshAccessToken(e);
      if (s) throw s;
      if (!t.session) throw new Ot();
      await this._saveSession(t.session), await this._notifyAllSubscribers("TOKEN_REFRESHED", t.session);
      const r = { session: t.session, error: null };
      return this.refreshingDeferred.resolve(r), r;
    } catch (e) {
      if ((this._debug(r, "error", e), xt(e))) {
        const s = { session: null, error: e };
        return Ut(e) || (await this._removeSession(), await this._notifyAllSubscribers("SIGNED_OUT", null)), null === (t = this.refreshingDeferred) || void 0 === t || t.resolve(s), s;
      }
      throw (null === (s = this.refreshingDeferred) || void 0 === s || s.reject(e), e);
    } finally {
      (this.refreshingDeferred = null), this._debug(r, "end");
    }
  }
  async _notifyAllSubscribers(e, t, s = !0) {
    const r = `#_notifyAllSubscribers(${e})`;
    this._debug(r, "begin", t, "broadcast = " + s);
    try {
      this.broadcastChannel && s && this.broadcastChannel.postMessage({ event: e, session: t });
      const r = [],
        i = Array.from(this.stateChangeEmitters.values()).map(async (s) => {
          try {
            await s.callback(e, t);
          } catch (e) {
            r.push(e);
          }
        });
      if ((await Promise.all(i), r.length > 0)) {
        for (let e = 0; e < r.length; e += 1) console.error(r[e]);
        throw r[0];
      }
    } finally {
      this._debug(r, "end");
    }
  }
  async _saveSession(e) {
    this._debug("#_saveSession()", e), (this.suppressGetSessionWarning = !0), await mt(this.storage, this.storageKey, e);
  }
  async _removeSession() {
    this._debug("#_removeSession()"), await vt(this.storage, this.storageKey);
  }
  _removeVisibilityChangedCallback() {
    this._debug("#_removeVisibilityChangedCallback()");
    const e = this.visibilityChangedCallback;
    this.visibilityChangedCallback = null;
    try {
      e && dt() && (null === window || void 0 === window ? void 0 : window.removeEventListener) && window.removeEventListener("visibilitychange", e);
    } catch (e) {
      console.error("removing visibilitychange callback failed", e);
    }
  }
  async _startAutoRefresh() {
    await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
    const e = setInterval(() => this._autoRefreshTokenTick(), as);
    (this.autoRefreshTicker = e),
      e && "object" == typeof e && "function" == typeof e.unref ? e.unref() : "undefined" != typeof Deno && "function" == typeof Deno.unrefTimer && Deno.unrefTimer(e),
      setTimeout(async () => {
        await this.initializePromise, await this._autoRefreshTokenTick();
      }, 0);
  }
  async _stopAutoRefresh() {
    this._debug("#_stopAutoRefresh()");
    const e = this.autoRefreshTicker;
    (this.autoRefreshTicker = null), e && clearInterval(e);
  }
  async startAutoRefresh() {
    this._removeVisibilityChangedCallback(), await this._startAutoRefresh();
  }
  async stopAutoRefresh() {
    this._removeVisibilityChangedCallback(), await this._stopAutoRefresh();
  }
  async _autoRefreshTokenTick() {
    this._debug("#_autoRefreshTokenTick()", "begin");
    try {
      await this._acquireLock(0, async () => {
        try {
          const e = Date.now();
          try {
            return await this._useSession(async (t) => {
              const {
                data: { session: s },
              } = t;
              if (!s || !s.refresh_token || !s.expires_at) return void this._debug("#_autoRefreshTokenTick()", "no session");
              const r = Math.floor((1e3 * s.expires_at - e) / as);
              this._debug("#_autoRefreshTokenTick()", `access token expires in ${r} ticks, a tick lasts 30000ms, refresh threshold is 3 ticks`), r <= 3 && (await this._callRefreshToken(s.refresh_token));
            });
          } catch (e) {
            console.error("Auto refresh tick failed with error. This is likely a transient error.", e);
          }
        } finally {
          this._debug("#_autoRefreshTokenTick()", "end");
        }
      });
    } catch (e) {
      if (!(e.isAcquireTimeout || e instanceof ss)) throw e;
      this._debug("auto refresh token tick lock not available");
    }
  }
  async _handleVisibilityChange() {
    if ((this._debug("#_handleVisibilityChange()"), !dt() || !(null === window || void 0 === window ? void 0 : window.addEventListener))) return this.autoRefreshToken && this.startAutoRefresh(), !1;
    try {
      (this.visibilityChangedCallback = async () => await this._onVisibilityChanged(!1)),
        null === window || void 0 === window || window.addEventListener("visibilitychange", this.visibilityChangedCallback),
        await this._onVisibilityChanged(!0);
    } catch (e) {
      console.error("_handleVisibilityChange", e);
    }
  }
  async _onVisibilityChanged(e) {
    const t = `#_onVisibilityChanged(${e})`;
    this._debug(t, "visibilityState", document.visibilityState),
      "visible" === document.visibilityState
        ? (this.autoRefreshToken && this._startAutoRefresh(),
          e ||
            (await this.initializePromise,
            await this._acquireLock(-1, async () => {
              "visible" === document.visibilityState ? await this._recoverAndRefresh() : this._debug(t, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
            })))
        : "hidden" === document.visibilityState && this.autoRefreshToken && this._stopAutoRefresh();
  }
  async _getUrlForProvider(e, t, s) {
    const r = ["provider=" + encodeURIComponent(t)];
    if (((null == s ? void 0 : s.redirectTo) && r.push("redirect_to=" + encodeURIComponent(s.redirectTo)), (null == s ? void 0 : s.scopes) && r.push("scopes=" + encodeURIComponent(s.scopes)), "pkce" === this.flowType)) {
      const [e, t] = await Tt(this.storage, this.storageKey),
        s = new URLSearchParams({ code_challenge: "" + encodeURIComponent(e), code_challenge_method: "" + encodeURIComponent(t) });
      r.push(s.toString());
    }
    if (null == s ? void 0 : s.queryParams) {
      const e = new URLSearchParams(s.queryParams);
      r.push(e.toString());
    }
    return (null == s ? void 0 : s.skipBrowserRedirect) && r.push("skip_http_redirect=" + s.skipBrowserRedirect), `${e}?${r.join("&")}`;
  }
  async _unenroll(e) {
    try {
      return await this._useSession(async (t) => {
        var s;
        const { data: r, error: i } = t;
        return i ? { data: null, error: i } : await Jt(this.fetch, "DELETE", `${this.url}/factors/${e.factorId}`, { headers: this.headers, jwt: null === (s = null == r ? void 0 : r.session) || void 0 === s ? void 0 : s.access_token });
      });
    } catch (e) {
      if (xt(e)) return { data: null, error: e };
      throw e;
    }
  }
  async _enroll(e) {
    try {
      return await this._useSession(async (t) => {
        var s, r;
        const { data: i, error: n } = t;
        if (n) return { data: null, error: n };
        const { data: a, error: o } = await Jt(this.fetch, "POST", this.url + "/factors", {
          body: { friendly_name: e.friendlyName, factor_type: e.factorType, issuer: e.issuer },
          headers: this.headers,
          jwt: null === (s = null == i ? void 0 : i.session) || void 0 === s ? void 0 : s.access_token,
        });
        return o ? { data: null, error: o } : ((null === (r = null == a ? void 0 : a.totp) || void 0 === r ? void 0 : r.qr_code) && (a.totp.qr_code = "data:image/svg+xml;utf-8," + a.totp.qr_code), { data: a, error: null });
      });
    } catch (e) {
      if (xt(e)) return { data: null, error: e };
      throw e;
    }
  }
  async _verify(e) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (t) => {
          var s;
          const { data: r, error: i } = t;
          if (i) return { data: null, error: i };
          const { data: n, error: a } = await Jt(this.fetch, "POST", `${this.url}/factors/${e.factorId}/verify`, {
            body: { code: e.code, challenge_id: e.challengeId },
            headers: this.headers,
            jwt: null === (s = null == r ? void 0 : r.session) || void 0 === s ? void 0 : s.access_token,
          });
          return a ? { data: null, error: a } : (await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + n.expires_in }, n)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", n), { data: n, error: a });
        });
      } catch (e) {
        if (xt(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  async _challenge(e) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (t) => {
          var s;
          const { data: r, error: i } = t;
          return i
            ? { data: null, error: i }
            : await Jt(this.fetch, "POST", `${this.url}/factors/${e.factorId}/challenge`, { headers: this.headers, jwt: null === (s = null == r ? void 0 : r.session) || void 0 === s ? void 0 : s.access_token });
        });
      } catch (e) {
        if (xt(e)) return { data: null, error: e };
        throw e;
      }
    });
  }
  async _challengeAndVerify(e) {
    const { data: t, error: s } = await this._challenge({ factorId: e.factorId });
    return s ? { data: null, error: s } : await this._verify({ factorId: e.factorId, challengeId: t.id, code: e.code });
  }
  async _listFactors() {
    const {
      data: { user: e },
      error: t,
    } = await this.getUser();
    if (t) return { data: null, error: t };
    const s = (null == e ? void 0 : e.factors) || [],
      r = s.filter((e) => "totp" === e.factor_type && "verified" === e.status);
    return { data: { all: s, totp: r }, error: null };
  }
  async _getAuthenticatorAssuranceLevel() {
    return this._acquireLock(
      -1,
      async () =>
        await this._useSession(async (e) => {
          var t, s;
          const {
            data: { session: r },
            error: i,
          } = e;
          if (i) return { data: null, error: i };
          if (!r) return { data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] }, error: null };
          const n = this._decodeJWT(r.access_token);
          let a = null;
          n.aal && (a = n.aal);
          let o = a;
          (null !== (s = null === (t = r.user.factors) || void 0 === t ? void 0 : t.filter((e) => "verified" === e.status)) && void 0 !== s ? s : []).length > 0 && (o = "aal2");
          return { data: { currentLevel: a, nextLevel: o, currentAuthenticationMethods: n.amr || [] }, error: null };
        })
    );
  }
}
hs.nextInstanceID = 0;
const ls = hs;
class cs extends ls {
  constructor(e) {
    super(e);
  }
}
var ds = (e, t, s, r) =>
  new (s || (s = Promise))((i, n) => {
    function a(e) {
      try {
        h(r.next(e));
      } catch (e) {
        n(e);
      }
    }
    function o(e) {
      try {
        h(r.throw(e));
      } catch (e) {
        n(e);
      }
    }
    function h(e) {
      var t;
      e.done
        ? i(e.value)
        : ((t = e.value),
          t instanceof s
            ? t
            : new s((e) => {
                e(t);
              })).then(a, o);
    }
    h((r = r.apply(e, t || [])).next());
  });
class us {
  constructor(e, t, s) {
    var r, i, n;
    if (((this.supabaseUrl = e), (this.supabaseKey = t), !e)) throw Error("supabaseUrl is required.");
    if (!t) throw Error("supabaseKey is required.");
    const a = e.replace(/\/$/, "");
    (this.realtimeUrl = (a + "/realtime/v1").replace(/^http/i, "ws")), (this.authUrl = a + "/auth/v1"), (this.storageUrl = a + "/storage/v1"), (this.functionsUrl = a + "/functions/v1");
    const o = `sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`,
      h = (function (e, t) {
        const { db: s, auth: r, realtime: i, global: n } = e,
          { db: a, auth: o, realtime: h, global: l } = t;
        return { db: Object.assign(Object.assign({}, a), s), auth: Object.assign(Object.assign({}, o), r), realtime: Object.assign(Object.assign({}, h), i), global: Object.assign(Object.assign({}, l), n) };
      })(null != s ? s : {}, { db: tt, realtime: rt, auth: Object.assign(Object.assign({}, st), { storageKey: o }), global: et });
    (this.storageKey = null !== (r = h.auth.storageKey) && void 0 !== r ? r : ""),
      (this.headers = null !== (i = h.global.headers) && void 0 !== i ? i : {}),
      (this.auth = this._initSupabaseAuthClient(null !== (n = h.auth) && void 0 !== n ? n : {}, this.headers, h.global.fetch)),
      (this.fetch = at(t, this._getAccessToken.bind(this), h.global.fetch)),
      (this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers }, h.realtime))),
      (this.rest = new Y(a + "/rest/v1", { headers: this.headers, schema: h.db.schema, fetch: this.fetch })),
      this._listenForAuthEvents();
  }
  get functions() {
    return new a(this.functionsUrl, { headers: this.headers, customFetch: this.fetch });
  }
  get storage() {
    return new Xe(this.storageUrl, this.headers, this.fetch);
  }
  from(e) {
    return this.rest.from(e);
  }
  schema(e) {
    return this.rest.schema(e);
  }
  rpc(e, t = {}, s = {}) {
    return this.rest.rpc(e, t, s);
  }
  channel(e, t = { config: {} }) {
    return this.realtime.channel(e, t);
  }
  getChannels() {
    return this.realtime.getChannels();
  }
  removeChannel(e) {
    return this.realtime.removeChannel(e);
  }
  removeAllChannels() {
    return this.realtime.removeAllChannels();
  }
  _getAccessToken() {
    var e, t;
    return ds(this, void 0, void 0, function* () {
      const { data: s } = yield this.auth.getSession();
      return null !== (t = null === (e = s.session) || void 0 === e ? void 0 : e.access_token) && void 0 !== t ? t : null;
    });
  }
  _initSupabaseAuthClient({ autoRefreshToken: e, persistSession: t, detectSessionInUrl: s, storage: r, storageKey: i, flowType: n, debug: a }, o, h) {
    var l;
    const c = { Authorization: "Bearer " + this.supabaseKey, apikey: "" + this.supabaseKey };
    return new cs({
      url: this.authUrl,
      headers: Object.assign(Object.assign({}, c), o),
      storageKey: i,
      autoRefreshToken: e,
      persistSession: t,
      detectSessionInUrl: s,
      storage: r,
      flowType: n,
      debug: a,
      fetch: h,
      hasCustomAuthorizationHeader: null !== (l = "Authorization" in this.headers) && void 0 !== l && l,
    });
  }
  _initRealtimeClient(e) {
    return new Pe(this.realtimeUrl, Object.assign(Object.assign({}, e), { params: Object.assign({ apikey: this.supabaseKey }, null == e ? void 0 : e.params) }));
  }
  _listenForAuthEvents() {
    return this.auth.onAuthStateChange((e, t) => {
      this._handleTokenChanged(e, "CLIENT", null == t ? void 0 : t.access_token);
    });
  }
  _handleTokenChanged(e, t, s) {
    ("TOKEN_REFRESHED" !== e && "SIGNED_IN" !== e) || this.changedAccessToken === s
      ? "SIGNED_OUT" === e && (this.realtime.setAuth(this.supabaseKey), "STORAGE" == t && this.auth.signOut(), (this.changedAccessToken = void 0))
      : (this.realtime.setAuth(null != s ? s : null), (this.changedAccessToken = s));
  }
}
const ps = "Trystero",
  fs = (e, t) => Array(e).fill().map(t),
  _s = "0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",
  gs = fs(20, () => _s[Math.floor(62 * Math.random())]).join("");
const ms = Promise.all.bind(Promise),
  ys = "undefined" != typeof window,
  { entries: vs, fromEntries: bs, keys: ws } = Object,
  Ss = () => {},
  ks = (e) => Error(`${ps}: ${e}`),
  Ts = new TextEncoder(),
  Cs = new TextDecoder(),
  Es = (e) => Ts.encode(e),
  xs = (e) => Cs.decode(e),
  Rs = (...e) => e.join("@"),
  Ps = JSON.stringify,
  As = JSON.parse,
  Os = "AES-GCM",
  js = {},
  Is = async (e) => {
    if (js[e]) return js[e];
    const t = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-1", Es(e))))
      .map((e) => e.toString(36))
      .join("");
    return (js[e] = t), t;
  },
  Ls = async (e, t) => {
    const s = crypto.getRandomValues(new Uint8Array(16));
    return s.join(",") + "$" + ((r = await crypto.subtle.encrypt({ name: Os, iv: s }, await e, Es(t))), btoa(String.fromCharCode.apply(null, new Uint8Array(r))));
    var r;
  },
  Ns = async (e, t) => {
    const [s, r] = t.split("$");
    return xs(
      await crypto.subtle.decrypt(
        { name: Os, iv: new Uint8Array(s.split(",")) },
        await e,
        ((e) => {
          const t = atob(e);
          return new Uint8Array(t.length).map((e, s) => t.charCodeAt(s)).buffer;
        })(r)
      )
    );
  };
var Ds,
  Us,
  Fs = { exports: {} };
function $s() {
  if (Us) return Ds;
  Us = 1;
  var e = 1e3,
    t = 60 * e,
    s = 60 * t,
    r = 24 * s,
    i = 7 * r,
    n = 365.25 * r;
  function a(e, t, s, r) {
    var i = t >= 1.5 * s;
    return Math.round(e / s) + " " + r + (i ? "s" : "");
  }
  return (
    (Ds = (o, h) => {
      h = h || {};
      var l = typeof o;
      if ("string" === l && o.length > 0)
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
              return h * n;
            case "weeks":
            case "week":
            case "w":
              return h * i;
            case "days":
            case "day":
            case "d":
              return h * r;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return h * s;
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
      if ("number" === l && isFinite(o))
        return h.long
          ? (function (i) {
              var n = Math.abs(i);
              if (n >= r) return a(i, n, r, "day");
              if (n >= s) return a(i, n, s, "hour");
              if (n >= t) return a(i, n, t, "minute");
              if (n >= e) return a(i, n, e, "second");
              return i + " ms";
            })(o)
          : (function (i) {
              var n = Math.abs(i);
              if (n >= r) return Math.round(i / r) + "d";
              if (n >= s) return Math.round(i / s) + "h";
              if (n >= t) return Math.round(i / t) + "m";
              if (n >= e) return Math.round(i / e) + "s";
              return i + "ms";
            })(o);
      throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(o));
    }),
    Ds
  );
}
var Ms = function (e) {
  function t(e) {
    let r,
      i,
      n,
      a = null;
    function o(...e) {
      if (!o.enabled) return;
      const s = o,
        i = Number(new Date()),
        n = i - (r || i);
      (s.diff = n), (s.prev = r), (s.curr = i), (r = i), (e[0] = t.coerce(e[0])), "string" != typeof e[0] && e.unshift("%O");
      let a = 0;
      (e[0] = e[0].replace(/%([a-zA-Z%])/g, (r, i) => {
        if ("%%" === r) return "%";
        a++;
        const n = t.formatters[i];
        if ("function" == typeof n) {
          const t = e[a];
          (r = n.call(s, t)), e.splice(a, 1), a--;
        }
        return r;
      })),
        t.formatArgs.call(s, e);
      (s.log || t.log).apply(s, e);
    }
    return (
      (o.namespace = e),
      (o.useColors = t.useColors()),
      (o.color = t.selectColor(e)),
      (o.extend = s),
      (o.destroy = t.destroy),
      Object.defineProperty(o, "enabled", {
        enumerable: !0,
        configurable: !1,
        get() {
          return null !== a ? a : (i !== t.namespaces && ((i = t.namespaces), (n = t.enabled(e))), n);
        },
        set(e) {
          a = e;
        },
      }),
      "function" == typeof t.init && t.init(o),
      o
    );
  }
  function s(e, s) {
    const r = t(this.namespace + (void 0 === s ? ":" : s) + e);
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
      let s;
      t.save(e), (t.namespaces = e), (t.names = []), (t.skips = []);
      const r = ("string" == typeof e ? e : "").split(/[\s,]+/),
        i = r.length;
      for (s = 0; s < i; s++) r[s] && ("-" === (e = r[s].replace(/\*/g, ".*?"))[0] ? t.skips.push(RegExp("^" + e.slice(1) + "$")) : t.names.push(RegExp("^" + e + "$")));
    }),
    (t.enabled = function (e) {
      if ("*" === e[e.length - 1]) return !0;
      let s, r;
      for (s = 0, r = t.skips.length; s < r; s++) if (t.skips[s].test(e)) return !1;
      for (s = 0, r = t.names.length; s < r; s++) if (t.names[s].test(e)) return !0;
      return !1;
    }),
    (t.humanize = $s()),
    (t.destroy = function () {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }),
    Object.keys(e).forEach((s) => {
      t[s] = e[s];
    }),
    (t.names = []),
    (t.skips = []),
    (t.formatters = {}),
    (t.selectColor = function (e) {
      let s = 0;
      for (let t = 0; t < e.length; t++) (s = (s << 5) - s + e.charCodeAt(t)), (s |= 0);
      return t.colors[Math.abs(s) % t.colors.length];
    }),
    t.enable(t.load()),
    t
  );
};
!(function (e, t) {
  (t.formatArgs = function (t) {
    if (((t[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff)), !this.useColors)) return;
    const s = "color: " + this.color;
    t.splice(1, 0, s, "color: inherit");
    let r = 0,
      i = 0;
    t[0].replace(/%[a-zA-Z%]/g, (e) => {
      "%%" !== e && (r++, "%c" === e && (i = r));
    }),
      t.splice(i, 0, s);
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
    (e.exports = Ms(t));
  const { formatters: s } = e.exports;
  s.j = (e) => {
    try {
      return JSON.stringify(e);
    } catch (e) {
      return "[UnexpectedJSONParseError]: " + e.message;
    }
  };
})(Fs, Fs.exports);
var qs = h(Fs.exports);
const Bs = "undefined" != typeof window ? window : self,
  zs = Bs.RTCPeerConnection || Bs.mozRTCPeerConnection || Bs.webkitRTCPeerConnection,
  Js = Bs.RTCSessionDescription || Bs.mozRTCSessionDescription || Bs.webkitRTCSessionDescription,
  Hs = Bs.RTCIceCandidate || Bs.mozRTCIceCandidate || Bs.webkitRTCIceCandidate;
var Ks,
  Ws = { exports: {} },
  Gs = "object" == typeof Reflect ? Reflect : null,
  Vs =
    Gs && "function" == typeof Gs.apply
      ? Gs.apply
      : function (e, t, s) {
          return function () {}.apply.call(e, t, s);
        };
Ks =
  Gs && "function" == typeof Gs.ownKeys
    ? Gs.ownKeys
    : Object.getOwnPropertySymbols
    ? function (e) {
        return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
      }
    : function (e) {
        return Object.getOwnPropertyNames(e);
      };
var Ys =
  Number.isNaN ||
  function (e) {
    return e != e;
  };
function Qs() {
  Qs.init.call(this);
}
(Ws.exports = Qs),
  (Ws.exports.once = function (e, t) {
    return new Promise((s, r) => {
      function i(s) {
        e.removeListener(t, n), r(s);
      }
      function n() {
        "function" == typeof e.removeListener && e.removeListener("error", i), s([].slice.call(arguments));
      }
      or(e, t, n, { once: !0 }),
        "error" !== t &&
          (function (e, t, s) {
            "function" == typeof e.on && or(e, "error", t, s);
          })(e, i, { once: !0 });
    });
  }),
  (Qs.EventEmitter = Qs),
  (Qs.prototype._events = void 0),
  (Qs.prototype._eventsCount = 0),
  (Qs.prototype._maxListeners = void 0);
var Xs = 10;
function Zs(e) {
  if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
function er(e) {
  return void 0 === e._maxListeners ? Qs.defaultMaxListeners : e._maxListeners;
}
function tr(e, t, s, r) {
  var i, n, a, o;
  if ((Zs(s), void 0 === (n = e._events) ? ((n = e._events = Object.create(null)), (e._eventsCount = 0)) : (void 0 !== n.newListener && (e.emit("newListener", t, s.listener ? s.listener : s), (n = e._events)), (a = n[t])), void 0 === a))
    (a = n[t] = s), ++e._eventsCount;
  else if (("function" == typeof a ? (a = n[t] = r ? [s, a] : [a, s]) : r ? a.unshift(s) : a.push(s), (i = er(e)) > 0 && a.length > i && !a.warned)) {
    a.warned = !0;
    var h = Error("Possible EventEmitter memory leak detected. " + a.length + " " + t + " listeners added. Use emitter.setMaxListeners() to increase limit");
    (h.name = "MaxListenersExceededWarning"), (h.emitter = e), (h.type = t), (h.count = a.length), (o = h), console && console.warn && console.warn(o);
  }
  return e;
}
function sr() {
  if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), (this.fired = !0), 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function rr(e, t, s) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: s },
    i = sr.bind(r);
  return (i.listener = s), (r.wrapFn = i), i;
}
function ir(e, t, s) {
  var r = e._events;
  if (void 0 === r) return [];
  var i = r[t];
  return void 0 === i
    ? []
    : "function" == typeof i
    ? s
      ? [i.listener || i]
      : [i]
    : s
    ? (function (e) {
        for (var t = Array(e.length), s = 0; s < t.length; ++s) t[s] = e[s].listener || e[s];
        return t;
      })(i)
    : ar(i, i.length);
}
function nr(e) {
  var t = this._events;
  if (void 0 !== t) {
    var s = t[e];
    if ("function" == typeof s) return 1;
    if (void 0 !== s) return s.length;
  }
  return 0;
}
function ar(e, t) {
  for (var s = Array(t), r = 0; r < t; ++r) s[r] = e[r];
  return s;
}
function or(e, t, s, r) {
  if ("function" == typeof e.on) r.once ? e.once(t, s) : e.on(t, s);
  else {
    if ("function" != typeof e.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
    e.addEventListener(t, function i(n) {
      r.once && e.removeEventListener(t, i), s(n);
    });
  }
}
Object.defineProperty(Qs, "defaultMaxListeners", {
  enumerable: !0,
  get() {
    return Xs;
  },
  set(e) {
    if ("number" != typeof e || e < 0 || Ys(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    Xs = e;
  },
}),
  (Qs.init = function () {
    (void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events) || ((this._events = Object.create(null)), (this._eventsCount = 0)), (this._maxListeners = this._maxListeners || void 0);
  }),
  (Qs.prototype.setMaxListeners = function (e) {
    if ("number" != typeof e || e < 0 || Ys(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
    return (this._maxListeners = e), this;
  }),
  (Qs.prototype.getMaxListeners = function () {
    return er(this);
  }),
  (Qs.prototype.emit = function (e) {
    for (var t = [], s = 1; s < arguments.length; s++) t.push(arguments[s]);
    var r = "error" === e,
      i = this._events;
    if (void 0 !== i) r = r && void 0 === i.error;
    else if (!r) return !1;
    if (r) {
      var n;
      if ((t.length > 0 && (n = t[0]), n instanceof Error)) throw n;
      var a = Error("Unhandled error." + (n ? " (" + n.message + ")" : ""));
      throw ((a.context = n), a);
    }
    var o = i[e];
    if (void 0 === o) return !1;
    if ("function" == typeof o) Vs(o, this, t);
    else {
      var h = o.length,
        l = ar(o, h);
      for (s = 0; s < h; ++s) Vs(l[s], this, t);
    }
    return !0;
  }),
  (Qs.prototype.addListener = function (e, t) {
    return tr(this, e, t, !1);
  }),
  (Qs.prototype.on = Qs.prototype.addListener),
  (Qs.prototype.prependListener = function (e, t) {
    return tr(this, e, t, !0);
  }),
  (Qs.prototype.once = function (e, t) {
    return Zs(t), this.on(e, rr(this, e, t)), this;
  }),
  (Qs.prototype.prependOnceListener = function (e, t) {
    return Zs(t), this.prependListener(e, rr(this, e, t)), this;
  }),
  (Qs.prototype.removeListener = function (e, t) {
    var s, r, i, n, a;
    if ((Zs(t), void 0 === (r = this._events))) return this;
    if (void 0 === (s = r[e])) return this;
    if (s === t || s.listener === t) 0 == --this._eventsCount ? (this._events = Object.create(null)) : (delete r[e], r.removeListener && this.emit("removeListener", e, s.listener || t));
    else if ("function" != typeof s) {
      for (i = -1, n = s.length - 1; n >= 0; n--)
        if (s[n] === t || s[n].listener === t) {
          (a = s[n].listener), (i = n);
          break;
        }
      if (i < 0) return this;
      0 === i
        ? s.shift()
        : (function (e, t) {
            for (; t + 1 < e.length; t++) e[t] = e[t + 1];
            e.pop();
          })(s, i),
        1 === s.length && (r[e] = s[0]),
        void 0 !== r.removeListener && this.emit("removeListener", e, a || t);
    }
    return this;
  }),
  (Qs.prototype.off = Qs.prototype.removeListener),
  (Qs.prototype.removeAllListeners = function (e) {
    var t, s, r;
    if (void 0 === (s = this._events)) return this;
    if (void 0 === s.removeListener) return 0 === arguments.length ? ((this._events = Object.create(null)), (this._eventsCount = 0)) : void 0 !== s[e] && (0 == --this._eventsCount ? (this._events = Object.create(null)) : delete s[e]), this;
    if (0 === arguments.length) {
      var i,
        n = Object.keys(s);
      for (r = 0; r < n.length; ++r) "removeListener" !== (i = n[r]) && this.removeAllListeners(i);
      return this.removeAllListeners("removeListener"), (this._events = Object.create(null)), (this._eventsCount = 0), this;
    }
    if ("function" == typeof (t = s[e])) this.removeListener(e, t);
    else if (void 0 !== t) for (r = t.length - 1; r >= 0; r--) this.removeListener(e, t[r]);
    return this;
  }),
  (Qs.prototype.listeners = function (e) {
    return ir(this, e, !0);
  }),
  (Qs.prototype.rawListeners = function (e) {
    return ir(this, e, !1);
  }),
  (Qs.listenerCount = (e, t) => ("function" == typeof e.listenerCount ? e.listenerCount(t) : nr.call(e, t))),
  (Qs.prototype.listenerCount = nr),
  (Qs.prototype.eventNames = function () {
    return this._eventsCount > 0 ? Ks(this._events) : [];
  });
var hr = Ws.exports,
  lr = "function" == typeof queueMicrotask ? queueMicrotask : (e) => Promise.resolve().then(e);
const cr = class {
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
var dr = class {
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
const ur = dr,
  pr = dr;
const { EventEmitter: fr } = hr,
  _r = Error("Stream was destroyed"),
  gr = lr,
  mr = class {
    constructor(e) {
      (this.hwm = e || 16), (this.head = new cr(this.hwm)), (this.tail = this.head), (this.length = 0);
    }
    clear() {
      (this.head = this.tail), this.head.clear(), (this.length = 0);
    }
    push(e) {
      if ((this.length++, !this.head.push(e))) {
        const t = this.head;
        (this.head = t.next = new cr(2 * this.head.buffer.length)), this.head.push(e);
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
  yr = class {
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
          this.decoder = new pr();
          break;
        case "utf16le":
        case "base64":
          throw Error("Unsupported encoding: " + this.encoding);
        default:
          this.decoder = new ur(this.encoding);
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
  vr = 536870911,
  br = 1 ^ vr,
  wr = 2 ^ vr,
  Sr = 64,
  kr = 128,
  Tr = 256,
  Cr = 1024,
  Er = 2048,
  xr = 4096,
  Rr = 8192,
  Pr = 16384,
  Ar = 32768,
  Or = 131072,
  jr = 131328,
  Ir = 16 ^ vr,
  Lr = 768 ^ vr,
  Nr = 536838143,
  Dr = 32 ^ vr,
  Ur = 536739839,
  Fr = 2 << 18,
  $r = 4 << 18,
  Mr = 8 << 18,
  qr = 16 << 18,
  Br = 32 << 18,
  zr = 64 << 18,
  Jr = 128 << 18,
  Hr = 512 << 18,
  Kr = 1024 << 18,
  Wr = 469499903,
  Gr = 535822335,
  Vr = 503316479,
  Yr = 268435455,
  Qr = 262160,
  Xr = 536608751,
  Zr = 8404992,
  ei = 14,
  ti = 15,
  si = 8405006,
  ri = 33587200,
  ii = 33587215,
  ni = 2359296,
  ai = 270794767,
  oi = Symbol.asyncIterator || Symbol();
class hi {
  constructor(e, { highWaterMark: t = 16384, map: s = null, mapWritable: r, byteLength: i, byteLengthWritable: n } = {}) {
    (this.stream = e),
      (this.queue = new mr()),
      (this.highWaterMark = t),
      (this.buffered = 0),
      (this.error = null),
      (this.pipeline = null),
      (this.drains = null),
      (this.byteLength = n || i || Ei),
      (this.map = r || s),
      (this.afterWrite = fi.bind(this)),
      (this.afterUpdateNextTick = mi.bind(this));
  }
  get ended() {
    return !!(this.stream._duplexState & Br);
  }
  push(e) {
    return null !== this.map && (e = this.map(e)), (this.buffered += this.byteLength(e)), this.queue.push(e), this.buffered < this.highWaterMark ? ((this.stream._duplexState |= Mr), !0) : ((this.stream._duplexState |= 6291456), !1);
  }
  shift() {
    const e = this.queue.shift();
    return (this.buffered -= this.byteLength(e)), 0 === this.buffered && (this.stream._duplexState &= 534773759), e;
  }
  end(e) {
    "function" == typeof e ? this.stream.once("finish", e) : null != e && this.push(e), (this.stream._duplexState = (this.stream._duplexState | Hr) & Gr);
  }
  autoBatch(e, t) {
    const s = [],
      r = this.stream;
    for (s.push(e); (r._duplexState & ai) === ni; ) s.push(r._writableState.shift());
    if (r._duplexState & ti) return t(null);
    r._writev(s, t);
  }
  update() {
    const e = this.stream;
    e._duplexState |= Fr;
    do {
      for (; (e._duplexState & ai) === Mr; ) {
        const t = this.shift();
        (e._duplexState |= 67371008), e._write(t, this.afterWrite);
      }
      1310720 & e._duplexState || this.updateNonPrimary();
    } while (!0 === this.continueUpdate());
    e._duplexState &= 536346623;
  }
  updateNonPrimary() {
    const e = this.stream;
    if ((144965647 & e._duplexState) === Hr) return (e._duplexState = (402653183 & e._duplexState) | 262144), void e._final(ui.bind(this));
    4 != (e._duplexState & ei) ? 1 == (e._duplexState & ii) && ((e._duplexState = (e._duplexState | Qr) & br), e._open(yi.bind(this))) : e._duplexState & ri || ((e._duplexState |= Qr), e._destroy(pi.bind(this)));
  }
  continueUpdate() {
    return !!(this.stream._duplexState & Jr) && ((this.stream._duplexState &= Vr), !0);
  }
  updateCallback() {
    (35127311 & this.stream._duplexState) === $r ? this.update() : this.updateNextTick();
  }
  updateNextTick() {
    this.stream._duplexState & Jr || ((this.stream._duplexState |= Jr), this.stream._duplexState & Fr || gr(this.afterUpdateNextTick));
  }
}
class li {
  constructor(e, { highWaterMark: t = 16384, map: s = null, mapReadable: r, byteLength: i, byteLengthReadable: n } = {}) {
    (this.stream = e),
      (this.queue = new mr()),
      (this.highWaterMark = 0 === t ? 1 : t),
      (this.buffered = 0),
      (this.readAhead = t > 0),
      (this.error = null),
      (this.pipeline = null),
      (this.byteLength = n || i || Ei),
      (this.map = r || s),
      (this.pipeTo = null),
      (this.afterRead = _i.bind(this)),
      (this.afterUpdateNextTick = gi.bind(this));
  }
  get ended() {
    return !!(this.stream._duplexState & Pr);
  }
  pipe(e, t) {
    if (null !== this.pipeTo) throw Error("Can only pipe to one destination");
    if (("function" != typeof t && (t = null), (this.stream._duplexState |= 512), (this.pipeTo = e), (this.pipeline = new ci(this.stream, e, t)), t && this.stream.on("error", xi), Ci(e)))
      (e._writableState.pipeline = this.pipeline), t && e.on("error", xi), e.on("finish", this.pipeline.finished.bind(this.pipeline));
    else {
      const t = this.pipeline.done.bind(this.pipeline, e),
        s = this.pipeline.done.bind(this.pipeline, e, null);
      e.on("error", t), e.on("close", s), e.on("finish", this.pipeline.finished.bind(this.pipeline));
    }
    e.on("drain", di.bind(this)), this.stream.emit("piping", e), e.emit("pipe", this.stream);
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
      const s = t[e];
      (this.buffered += this.byteLength(s)), this.queue.push(s);
    }
    this.push(t[t.length - 1]);
  }
  read() {
    const e = this.stream;
    if ((16527 & e._duplexState) === kr) {
      const t = this.shift();
      return null !== this.pipeTo && !1 === this.pipeTo.write(t) && (e._duplexState &= Lr), e._duplexState & Er && e.emit("data", t), t;
    }
    return !1 === this.readAhead && ((e._duplexState |= Or), this.updateNextTick()), null;
  }
  drain() {
    const e = this.stream;
    for (; (16527 & e._duplexState) === kr && 768 & e._duplexState; ) {
      const t = this.shift();
      null !== this.pipeTo && !1 === this.pipeTo.write(t) && (e._duplexState &= Lr), e._duplexState & Er && e.emit("data", t);
    }
  }
  update() {
    const e = this.stream;
    e._duplexState |= 32;
    do {
      for (this.drain(); this.buffered < this.highWaterMark && (214047 & e._duplexState) === Or; ) (e._duplexState |= 65552), e._read(this.afterRead), this.drain();
      4224 == (12431 & e._duplexState) && ((e._duplexState |= Rr), e.emit("readable")), 80 & e._duplexState || this.updateNonPrimary();
    } while (!0 === this.continueUpdate());
    e._duplexState &= Dr;
  }
  updateNonPrimary() {
    const e = this.stream;
    (1167 & e._duplexState) === Cr && ((e._duplexState = (536869887 & e._duplexState) | 16384), e.emit("end"), (e._duplexState & si) === Zr && (e._duplexState |= 4), null !== this.pipeTo && this.pipeTo.end()),
      4 != (e._duplexState & ei) ? 1 == (e._duplexState & ii) && ((e._duplexState = (e._duplexState | Qr) & br), e._open(yi.bind(this))) : e._duplexState & ri || ((e._duplexState |= Qr), e._destroy(pi.bind(this)));
  }
  continueUpdate() {
    return !!(this.stream._duplexState & Ar) && ((this.stream._duplexState &= Nr), !0);
  }
  updateCallback() {
    (32879 & this.stream._duplexState) === Sr ? this.update() : this.updateNextTick();
  }
  updateNextTick() {
    this.stream._duplexState & Ar || ((this.stream._duplexState |= Ar), 32 & this.stream._duplexState || gr(this.afterUpdateNextTick));
  }
}
class ci {
  constructor(e, t, s) {
    (this.from = e), (this.to = t), (this.afterPipe = s), (this.error = null), (this.pipeToFinished = !1);
  }
  finished() {
    this.pipeToFinished = !0;
  }
  done(e, t) {
    t && (this.error = t),
      e !== this.to || ((this.to = null), null === this.from)
        ? e !== this.from || ((this.from = null), null === this.to)
          ? (null !== this.afterPipe && this.afterPipe(this.error), (this.to = this.from = this.afterPipe = null))
          : e._duplexState & Pr || this.to.destroy(this.error || Error("Readable stream closed before ending"))
        : (this.from._duplexState & Pr && this.pipeToFinished) || this.from.destroy(this.error || Error("Writable stream closed prematurely"));
  }
}
function di() {
  (this.stream._duplexState |= 512), this.updateCallback();
}
function ui(e) {
  const t = this.stream;
  e && t.destroy(e), t._duplexState & ei || ((t._duplexState |= Br), t.emit("finish")), (t._duplexState & si) === Zr && (t._duplexState |= 4), (t._duplexState &= Wr), t._duplexState & Fr ? this.updateNextTick() : this.update();
}
function pi(e) {
  const t = this.stream;
  e || this.error === _r || (e = this.error), e && t.emit("error", e), (t._duplexState |= 8), t.emit("close");
  const s = t._readableState,
    r = t._writableState;
  if ((null !== s && null !== s.pipeline && s.pipeline.done(t, e), null !== r)) {
    for (; null !== r.drains && r.drains.length > 0; ) r.drains.shift().resolve(!1);
    null !== r.pipeline && r.pipeline.done(t, e);
  }
}
function fi(e) {
  const t = this.stream;
  e && t.destroy(e),
    (t._duplexState &= Wr),
    null !== this.drains &&
      (function (e) {
        for (let t = 0; t < e.length; t++) 0 == --e[t].writes && (e.shift().resolve(!0), t--);
      })(this.drains),
    (6553615 & t._duplexState) === qr && ((t._duplexState &= 532676607), (t._duplexState & zr) === zr && t.emit("drain")),
    this.updateCallback();
}
function _i(e) {
  e && this.stream.destroy(e), (this.stream._duplexState &= Ir), !1 !== this.readAhead || this.stream._duplexState & Tr || (this.stream._duplexState &= Ur), this.updateCallback();
}
function gi() {
  32 & this.stream._duplexState || ((this.stream._duplexState &= Nr), this.update());
}
function mi() {
  this.stream._duplexState & Fr || ((this.stream._duplexState &= Vr), this.update());
}
function yi(e) {
  const t = this.stream;
  e && t.destroy(e),
    4 & t._duplexState || (17423 & t._duplexState || (t._duplexState |= Sr), 142606351 & t._duplexState || (t._duplexState |= $r), t.emit("open")),
    (t._duplexState &= Xr),
    null !== t._writableState && t._writableState.updateCallback(),
    null !== t._readableState && t._readableState.updateCallback();
}
function vi(e) {
  null !== this._readableState && ("data" === e && ((this._duplexState |= 133376), this._readableState.updateNextTick()), "readable" === e && ((this._duplexState |= xr), this._readableState.updateNextTick())),
    null !== this._writableState && "drain" === e && ((this._duplexState |= zr), this._writableState.updateNextTick());
}
class bi extends fr {
  constructor(e) {
    super(),
      (this._duplexState = 0),
      (this._readableState = null),
      (this._writableState = null),
      e && (e.open && (this._open = e.open), e.destroy && (this._destroy = e.destroy), e.predestroy && (this._predestroy = e.predestroy), e.signal && e.signal.addEventListener("abort", Ri.bind(this))),
      this.on("newListener", vi);
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
    return !!(this._duplexState & ei);
  }
  destroy(e) {
    this._duplexState & ei ||
      (e || (e = _r),
      (this._duplexState = (535822271 & this._duplexState) | 4),
      null !== this._readableState && ((this._readableState.highWaterMark = 0), (this._readableState.error = e)),
      null !== this._writableState && ((this._writableState.highWaterMark = 0), (this._writableState.error = e)),
      (this._duplexState |= 2),
      this._predestroy(),
      (this._duplexState &= wr),
      null !== this._readableState && this._readableState.updateNextTick(),
      null !== this._writableState && this._writableState.updateNextTick());
  }
}
class wi extends bi {
  constructor(e) {
    super(e),
      (this._duplexState |= 8519681),
      (this._readableState = new li(this, e)),
      e && (!1 === this._readableState.readAhead && (this._duplexState &= Ur), e.read && (this._read = e.read), e.eagerOpen && this._readableState.updateNextTick(), e.encoding && this.setEncoding(e.encoding));
  }
  setEncoding(e) {
    const t = new yr(e),
      s = this._readableState.map || ki;
    return (
      (this._readableState.map = function (e) {
        const r = t.push(e);
        return "" === r ? null : s(r);
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
    return (this._duplexState |= jr), this._readableState.updateNextTick(), this;
  }
  pause() {
    return (this._duplexState &= !1 === this._readableState.readAhead ? 536739583 : 536870655), this;
  }
  static _fromAsyncIterator(e, t) {
    let s;
    const r = new wi({
      ...t,
      read(t) {
        e.next().then(i).then(t.bind(null, null)).catch(t);
      },
      predestroy() {
        s = e.return();
      },
      destroy(e) {
        if (!s) return e(null);
        s.then(e.bind(null, null)).catch(e);
      },
    });
    return r;
    function i(e) {
      e.done ? r.push(null) : r.push(e.value);
    }
  }
  static from(e, t) {
    if (Ci((s = e)) && s.readable) return e;
    var s;
    if (e[oi]) return this._fromAsyncIterator(e[oi](), t);
    Array.isArray(e) || (e = void 0 === e ? [] : [e]);
    let r = 0;
    return new wi({
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
    return !(e._duplexState & Tr);
  }
  [oi]() {
    const e = this;
    let t = null,
      s = null,
      r = null;
    return (
      this.on("error", (e) => {
        t = e;
      }),
      this.on("readable", function () {
        null !== s && i(e.read());
      }),
      this.on("close", function () {
        null !== s && i(null);
      }),
      {
        [oi]() {
          return this;
        },
        next: () =>
          new Promise((t, n) => {
            (s = t), (r = n);
            const a = e.read();
            null !== a ? i(a) : 8 & e._duplexState && i(null);
          }),
        return: () => n(null),
        throw: (e) => n(e),
      }
    );
    function i(i) {
      null !== r && (t ? r(t) : null !== i || e._duplexState & Pr ? s({ value: i, done: null === i }) : r(_r), (r = s = null));
    }
    function n(t) {
      return (
        e.destroy(t),
        new Promise((s, r) => {
          if (8 & e._duplexState) return s({ value: void 0, done: !0 });
          e.once("close", () => {
            t ? r(t) : s({ value: void 0, done: !0 });
          });
        })
      );
    }
  }
}
class Si extends wi {
  constructor(e) {
    super(e), (this._duplexState = 1 | (this._duplexState & Or)), (this._writableState = new hi(this, e)), e && (e.writev && (this._writev = e.writev), e.write && (this._write = e.write), e.final && (this._final = e.final));
  }
  cork() {
    this._duplexState |= Kr;
  }
  uncork() {
    (this._duplexState &= Yr), this._writableState.updateNextTick();
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
function ki(e) {
  return e;
}
function Ti(e) {
  return !!e._readableState || !!e._writableState;
}
function Ci(e) {
  return "number" == typeof e._duplexState && Ti(e);
}
function Ei(e) {
  return (function (e) {
    return "object" == typeof e && null !== e && "number" == typeof e.byteLength;
  })(e)
    ? e.byteLength
    : 1024;
}
function xi() {}
function Ri() {
  this.destroy(Error("Stream aborted."));
}
var Pi = Si;
function Ai(e, t) {
  for (const s in t) Object.defineProperty(e, s, { value: t[s], enumerable: !0, configurable: !0 });
  return e;
}
var Oi = h(function (e, t, s) {
  if (!e || "string" == typeof e) throw new TypeError("Please pass an Error to err-code");
  s || (s = {}), "object" == typeof t && ((s = t), (t = "")), t && (s.code = t);
  try {
    return Ai(e, s);
  } catch (t) {
    (s.message = e.message), (s.stack = e.stack);
    const r = () => {};
    r.prototype = Object.create(Object.getPrototypeOf(e));
    return Ai(new r(), s);
  }
});
const ji = "0123456789abcdef",
  Ii = [];
for (let e = 0; e < 256; e++) Ii[e] = ji[(e >> 4) & 15] + ji[15 & e];
const Li = (e) => {
  const t = e.length;
  let s = "",
    r = 0;
  for (; r < t; ) s += Ii[e[r++]];
  return s;
};
for (var Ni = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Di = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), Ui = 0; Ui < 64; Ui++) Di[Ni.charCodeAt(Ui)] = Ui;
new TextDecoder();
const Fi = new TextEncoder(),
  $i = "undefined" != typeof window ? window : self,
  Mi = $i.crypto || $i.msCrypto || {};
Mi.subtle || Mi.webkitSubtle;
const qi = (e) => {
    const t = new Uint8Array(e);
    return Mi.getRandomValues(t);
  },
  Bi = qs("simple-peer"),
  zi = 65536;
function Ji(e) {
  return e.replace(/a=ice-options:trickle\s\n/g, "");
}
let Hi = class e extends Pi {
  _pc;
  constructor(t) {
    if (
      (super((t = Object.assign({ allowHalfOpen: !1 }, t))),
      (this.__objectMode = !!t.objectMode),
      (this._id = Li(qi(4)).slice(0, 7)),
      this._debug("new peer %o", t),
      (this.channelName = t.initiator ? t.channelName || Li(qi(20)) : null),
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
      !zs)
    )
      throw "undefined" == typeof window ? Oi(Error("No WebRTC support: Specify `opts.wrtc` option in this environment"), "ERR_WEBRTC_SUPPORT") : Oi(Error("No WebRTC support: Not a supported browser"), "ERR_WEBRTC_SUPPORT");
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
      this._pc = new zs(this.config);
      window.myGlobalPeerConnection = this._pc;
    } catch (e) {
      return void this.__destroy(Oi(e, "ERR_PC_CONSTRUCTOR"));
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
          this.__destroy(Oi(e, "ERR_PC_PEER_IDENTITY"));
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
      if (this.destroyed) throw Oi(Error("cannot signal after peer is destroyed"), "ERR_DESTROYED");
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
            .setRemoteDescription(new Js(e))
            .then(() => {
              this.destroyed ||
                (this._pendingCandidates.forEach((e) => {
                  this._addIceCandidate(e);
                }),
                (this._pendingCandidates = []),
                "offer" === this._pc.remoteDescription.type && this._createAnswer());
            })
            .catch((e) => {
              this.__destroy(Oi(e, "ERR_SET_REMOTE_DESCRIPTION"));
            }),
        e.sdp || e.candidate || e.renegotiate || e.transceiverRequest || this.__destroy(Oi(Error("signal() called with invalid signal data"), "ERR_SIGNALING"));
    }
  }
  _addIceCandidate(e) {
    const t = new Hs(e);
    this._pc.addIceCandidate(t).catch((e) => {
      !t.address || t.address.endsWith(".local") ? console.warn("Ignoring unsupported ICE candidate.") : this.__destroy(Oi(e, "ERR_ADD_ICE_CANDIDATE"));
    });
  }
  send(e) {
    if (!this._destroying) {
      if (this.destroyed) throw Oi(Error("cannot send after peer is destroyed"), "ERR_DESTROYED");
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
      if (this.destroyed) throw Oi(Error("cannot negotiate after peer is destroyed"), "ERR_DESTROYED");
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
    if (!e.channel) return this.__destroy(Oi(Error("Data channel event is missing `channel` property"), "ERR_DATA_CHANNEL"));
    (this._channel = e.channel),
      (this._channel.binaryType = "arraybuffer"),
      "number" == typeof this._channel.bufferedAmountLowThreshold && (this._channel.bufferedAmountLowThreshold = zi),
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
        this.__destroy(Oi(t, "ERR_DATA_CHANNEL"));
      });
    let t = !1;
    this._closingInterval = setInterval(() => {
      this._channel && "closing" === this._channel.readyState ? (t && this._onChannelClose(), (t = !0)) : (t = !1);
    }, 5e3);
  }
  _write(e, t) {
    if (this.destroyed) return t(Oi(Error("cannot write after peer is destroyed"), "ERR_DATA_CHANNEL"));
    if (this._connected) {
      try {
        this.send(e);
      } catch (e) {
        return this.__destroy(Oi(e, "ERR_DATA_CHANNEL"));
      }
      this._channel.bufferedAmount > zi ? (this._debug("start backpressure: bufferedAmount %d", this._channel.bufferedAmount), (this._cb = t)) : t(null);
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
          this.trickle || this.allowHalfTrickle || (e.sdp = Ji(e.sdp)), (e.sdp = this.sdpTransform(e.sdp));
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
              this.__destroy(Oi(e, "ERR_SET_LOCAL_DESCRIPTION"));
            });
        })
        .catch((e) => {
          this.__destroy(Oi(e, "ERR_CREATE_OFFER"));
        });
  }
  _createAnswer() {
    this.destroyed ||
      this._pc
        .createAnswer(this.answerOptions)
        .then((e) => {
          if (this.destroyed) return;
          this.trickle || this.allowHalfTrickle || (e.sdp = Ji(e.sdp)), (e.sdp = this.sdpTransform(e.sdp));
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
              this.__destroy(Oi(e, "ERR_SET_LOCAL_DESCRIPTION"));
            });
        })
        .catch((e) => {
          this.__destroy(Oi(e, "ERR_CREATE_ANSWER"));
        });
  }
  _onConnectionStateChange() {
    this.destroyed || this._destroying || ("failed" === this._pc.connectionState && this.__destroy(Oi(Error("Connection failed."), "ERR_CONNECTION_FAILURE")));
  }
  _onIceStateChange() {
    if (this.destroyed) return;
    const e = this._pc.iceConnectionState,
      t = this._pc.iceGatheringState;
    this._debug("iceStateChange (connection: %s) (gathering: %s)", e, t),
      this.emit("iceStateChange", e, t),
      ("connected" !== e && "completed" !== e) || ((this._pcReady = !0), this._maybeReady()),
      "failed" === e && this.__destroy(Oi(Error("Ice connection failed."), "ERR_ICE_CONNECTION_FAILURE")),
      "closed" === e && this.__destroy(Oi(Error("Ice connection closed."), "ERR_ICE_CONNECTION_CLOSED"));
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
          (s) => {
            const r = [];
            s.forEach((e) => {
              r.push(t(e));
            }),
              e(null, r);
          },
          (t) => e(t)
        )
      : this._pc.getStats.length > 0
      ? this._pc.getStats(
          (s) => {
            if (this.destroyed) return;
            const r = [];
            s.result().forEach((e) => {
              const s = {};
              e.names().forEach((t) => {
                s[t] = e.stat(t);
              }),
                (s.id = e.id),
                (s.type = e.type),
                (s.timestamp = e.timestamp),
                r.push(t(s));
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
        this.getStats((t, s) => {
          if (this.destroyed || this._destroying) return;
          t && (s = []);
          const r = {},
            i = {},
            n = {};
          let a = !1;
          s.forEach((e) => {
            ("remotecandidate" !== e.type && "remote-candidate" !== e.type) || (r[e.id] = e),
              ("localcandidate" !== e.type && "local-candidate" !== e.type) || (i[e.id] = e),
              ("candidatepair" !== e.type && "candidate-pair" !== e.type) || (n[e.id] = e);
          });
          const o = (e) => {
            a = !0;
            let t = i[e.localCandidateId];
            t && (t.ip || t.address)
              ? ((this.localAddress = t.ip || t.address), (this.localPort = Number(t.port)))
              : t && t.ipAddress
              ? ((this.localAddress = t.ipAddress), (this.localPort = Number(t.portNumber)))
              : "string" == typeof e.googLocalAddress && ((t = e.googLocalAddress.split(":")), (this.localAddress = t[0]), (this.localPort = Number(t[1]))),
              this.localAddress && (this.localFamily = this.localAddress.includes(":") ? "IPv6" : "IPv4");
            let s = r[e.remoteCandidateId];
            s && (s.ip || s.address)
              ? ((this.remoteAddress = s.ip || s.address), (this.remotePort = Number(s.port)))
              : s && s.ipAddress
              ? ((this.remoteAddress = s.ipAddress), (this.remotePort = Number(s.portNumber)))
              : "string" == typeof e.googRemoteAddress && ((s = e.googRemoteAddress.split(":")), (this.remoteAddress = s[0]), (this.remotePort = Number(s[1]))),
              this.remoteAddress && (this.remoteFamily = this.remoteAddress.includes(":") ? "IPv6" : "IPv4"),
              this._debug("connect local: %s:%s remote: %s:%s", this.localAddress, this.localPort, this.remoteAddress, this.remotePort);
          };
          if (
            (s.forEach((e) => {
              "transport" === e.type && e.selectedCandidatePairId && o(n[e.selectedCandidatePairId]),
                (("googCandidatePair" === e.type && "true" === e.googActiveConnection) || (("candidatepair" === e.type || "candidate-pair" === e.type) && e.selected)) && o(e);
            }),
            a || (Object.keys(n).length && !Object.keys(i).length))
          ) {
            if (((this._connecting = !1), (this._connected = !0), this._chunk)) {
              try {
                this.send(this._chunk);
              } catch (t) {
                return this.__destroy(Oi(t, "ERR_DATA_CHANNEL"));
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
    !this._cb || !this._channel || this._channel.bufferedAmount > zi || this._onChannelBufferedAmountLow();
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
    var s;
    t instanceof ArrayBuffer ? (t = new Uint8Array(t)) : !1 === this.__objectMode && ((s = t), (t = Fi.encode(s))), this.push(t);
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
    (e[0] = "[" + this._id + "] " + e[0]), Bi.apply(null, e);
  }
};
(Hi.WEBRTC_SUPPORT = !!zs), (Hi.config = { iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:global.stun.twilio.com:3478"] }], sdpSemantics: "unified-plan" }), (Hi.channelConfig = {});
class Ki extends Hi {
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
      if (this.destroyed) throw Oi(Error("cannot addTransceiver after peer is destroyed"), "ERR_DESTROYED");
      if ((this._debug("addTransceiver()"), this.initiator))
        try {
          this._pc.addTransceiver(e, t), this._needsNegotiation();
        } catch (e) {
          this.__destroy(Oi(e, "ERR_ADD_TRANSCEIVER"));
        }
      else this.emit("signal", { type: "transceiverRequest", transceiverRequest: { kind: e, init: t } });
    }
  }
  addStream(e) {
    if (!this._destroying) {
      if (this.destroyed) throw Oi(Error("cannot addStream after peer is destroyed"), "ERR_DESTROYED");
      this._debug("addStream()"),
        e.getTracks().forEach((t) => {
          this.addTrack(t, e);
        });
    }
  }
  addTrack(e, t) {
    if (this._destroying) return;
    if (this.destroyed) throw Oi(Error("cannot addTrack after peer is destroyed"), "ERR_DESTROYED");
    this._debug("addTrack()");
    const s = this._senderMap.get(e) || new Map();
    let r = s.get(t);
    if (r) throw r.removed ? Oi(Error("Track has been removed. You should enable/disable tracks that you want to re-add."), "ERR_SENDER_REMOVED") : Oi(Error("Track has already been added to that stream."), "ERR_SENDER_ALREADY_ADDED");
    (r = this._pc.addTrack(e, t)), s.set(t, r), this._senderMap.set(e, s), this._needsNegotiation();
  }
  replaceTrack(e, t, s) {
    if (this._destroying) return;
    if (this.destroyed) throw Oi(Error("cannot replaceTrack after peer is destroyed"), "ERR_DESTROYED");
    this._debug("replaceTrack()");
    const r = this._senderMap.get(e),
      i = r ? r.get(s) : null;
    if (!i) throw Oi(Error("Cannot replace track that was never added."), "ERR_TRACK_NOT_ADDED");
    t && this._senderMap.set(t, r), null != i.replaceTrack ? i.replaceTrack(t) : this.__destroy(Oi(Error("replaceTrack is not supported in this browser"), "ERR_UNSUPPORTED_REPLACETRACK"));
  }
  removeTrack(e, t) {
    if (this._destroying) return;
    if (this.destroyed) throw Oi(Error("cannot removeTrack after peer is destroyed"), "ERR_DESTROYED");
    this._debug("removeSender()");
    const s = this._senderMap.get(e),
      r = s ? s.get(t) : null;
    if (!r) throw Oi(Error("Cannot remove track that was never added."), "ERR_TRACK_NOT_ADDED");
    try {
      (r.removed = !0), this._pc.removeTrack(r);
    } catch (e) {
      "NS_ERROR_UNEXPECTED" === e.name ? this._sendersAwaitingStable.push(r) : this.__destroy(Oi(e, "ERR_REMOVE_TRACK"));
    }
    this._needsNegotiation();
  }
  removeStream(e) {
    if (!this._destroying) {
      if (this.destroyed) throw Oi(Error("cannot removeStream after peer is destroyed"), "ERR_DESTROYED");
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
const Wi = "data",
  Gi = "signal";
var Vi = (e, t) => {
  const s = new Ki({ iceServers: [{ urls: Yi }], ...t, initiator: e, trickle: !1 }),
    r = (e) => i.push(e);
  let i = [];
  return (
    s.on(Wi, r),
    {
      id: s._id,
      created: Date.now(),
      connection: s._pc,
      get channel() {
        return s._channel;
      },
      get isDead() {
        return s.destroyed;
      },
      signal(t) {
        return new Promise((r) => {
          e || s.on(Gi, r), s.signal(t);
        });
      },
      sendData(e) {
        return s.send(e);
      },
      destroy() {
        return s.destroy();
      },
      setHandlers(e) {
        return Object.entries(e).forEach(([e, t]) => s.on(e, t));
      },
      offerPromise: e ? new Promise((e) => s.on(Gi, e)) : Promise.resolve(),
      addStream(e) {
        return s.addStream(e);
      },
      removeStream(e) {
        return s.removeStream(e);
      },
      addTrack(e, t) {
        return s.addTrack(e, t);
      },
      removeTrack(e, t) {
        return s.removeTrack(e, t);
      },
      replaceTrack(e, t, r) {
        return s.replaceTrack(e, t, r);
      },
      drainEarlyData(e) {
        s.off(Wi, r), i.forEach(e), (i = null);
      },
    }
  );
};
const Yi = [...fs(5, (e, t) => `stun:stun${t || ""}.l.google.com:19302`), "stun:global.stun.twilio.com:3478"],
  Qi = Object.getPrototypeOf(Uint8Array),
  Xi = 16369,
  Zi = 255,
  en = "bufferedamountlow",
  tn = (e) => "@_" + e;
const sn = "broadcast",
  rn = "join",
  nn = "sdp",
  an = (({ init: e, subscribe: t, announce: s }) => {
    const r = {};
    let i,
      n,
      a,
      o = !1;
    return (h, l, c) => {
      const { appId: d } = h;
      if (r[d]?.[l]) return r[d][l];
      const u = {},
        p = {},
        f = Rs(ps, d, l),
        _ = Is(f),
        g = Is(Rs(f, gs)),
        m = (async (e, t, s) => crypto.subtle.importKey("raw", await crypto.subtle.digest({ name: "SHA-256" }, Es(`${e}:${t}:${s}`)), { name: Os }, !1, ["encrypt", "decrypt"]))(h.password || "", d, l),
        y = (e) => async (t) => ({ type: t.type, sdp: await e(m, t.sdp) }),
        v = y(Ns),
        b = y(Ls),
        w = () => Vi(!0, h.rtcConfig),
        S = (e, t, s) => {
          p[t]
            ? p[t] !== e && e.destroy()
            : ((p[t] = e),
              A(e, t),
              u[t]?.forEach((e, t) => {
                t !== s && e.destroy();
              }),
              delete u[t]);
        },
        k = (e, t) => {
          p[t] === e && delete p[t];
        },
        T = (e) => (n.push(...fs(e, w)), ms(n.splice(0, e).map((e) => e.offerPromise.then(b).then((t) => ({ peer: e, offer: t }))))),
        C = (e, t) => c?.({ error: `incorrect password (${h.password}) when decrypting ${t}`, appId: d, peerId: e, roomId: l }),
        E = (e) => async (t, s, r) => {
          const [i, n] = await ms([_, g]);
          if (t !== i && t !== n) return;
          const { peerId: a, offer: o, answer: l, peer: c } = "string" == typeof s ? As(s) : s;
          if (a !== gs && !p[a])
            if (!a || o || l) {
              if (o) {
                const t = u[a]?.[e];
                if (t && gs > a) return;
                const s = Vi(!1, h.rtcConfig);
                let i;
                s.setHandlers({
                  connect() {
                    return S(s, a, e);
                  },
                  close() {
                    return k(s, a);
                  },
                });
                try {
                  i = await v(o);
                } catch (e) {
                  return void C(a, "offer");
                }
                if (s.isDead) return;
                const [n, l] = await ms([Is(Rs(f, a)), s.signal(i)]);
                r(n, Ps({ peerId: gs, answer: await b(l) }));
              } else if (l) {
                let t;
                try {
                  t = await v(l);
                } catch (e) {
                  return void C(a, "answer");
                }
                if (c)
                  c.setHandlers({
                    connect() {
                      return S(c, a, e);
                    },
                    close() {
                      return k(c, a);
                    },
                  }),
                    c.signal(t);
                else {
                  const s = u[a]?.[e];
                  s && !s.isDead && s.signal(t);
                }
              }
            } else {
              if (u[a]?.[e]) return;
              const [[{ peer: t, offer: s }], i] = await ms([T(1), Is(Rs(f, a))]);
              (u[a] ||= []),
                (u[a][e] = t),
                setTimeout(
                  () =>
                    ((e, t) => {
                      if (p[e]) return;
                      const s = u[e]?.[t];
                      s && (delete u[e][t], s.destroy());
                    })(a, e),
                  0.9 * x[e]
                ),
                t.setHandlers({
                  connect() {
                    return S(t, a, e);
                  },
                  close() {
                    return k(t, a);
                  },
                }),
                r(i, Ps({ peerId: gs, offer: s }));
            }
        };
      if (!h) throw ks("requires a config map as the first argument");
      if (!d && !h.firebaseApp) throw ks("config map is missing appId field");
      if (!l) throw ks("roomId argument required");
      if (!o) {
        const t = e(h);
        (n = fs(20, w)),
          (i = Array.isArray(t) ? t : [t]),
          (o = !0),
          (a = setInterval(
            () =>
              (n = n.filter((e) => {
                const t = Date.now() - e.created < 57333;
                return t || e.destroy(), t;
              })),
            59052.99
          ));
      }
      const x = i.map(() => 5333),
        R = [],
        P = i.map(async (e, s) => t(await e, await _, await g, E(s), T));
      ms([_, g]).then(([e, t]) => {
        const r = async (i, n) => {
          const a = await s(i, e, t);
          "number" == typeof a && (x[n] = a), (R[n] = setTimeout(() => r(i, n), x[n]));
        };
        P.forEach(async (e, t) => {
          await e, r(await i[t], t);
        });
      });
      let A = Ss;
      return (
        (r[d] ||= {}),
        (r[d][l] = ((e, t, s) => {
          const r = {},
            i = {},
            n = {},
            a = {},
            o = {},
            h = {},
            l = {},
            c = { onPeerJoin: Ss, onPeerLeave: Ss, onPeerStream: Ss, onPeerTrack: Ss },
            d = (e, t) =>
              (e ? (Array.isArray(e) ? e : [e]) : ws(r)).flatMap((e) => {
                const s = r[e];
                return s ? t(e, s) : (console.warn(`${ps}: no peer with id ${e} found`), []);
              }),
            u = (e) => {
              r[e] && (delete r[e], delete a[e], delete o[e], c.onPeerLeave(e), t(e));
            },
            p = (e) => {
              if (i[e]) return n[e];
              if (!e) throw ks("action type argument is required");
              const t = Es(e);
              if (t.byteLength > 12) throw ks(`action type string "${e}" (${t.byteLength}b) exceeds byte limit (12). Hint: choose a shorter name.`);
              const s = new Uint8Array(12);
              s.set(t);
              let a = 0;
              return (
                (i[e] = {
                  onComplete: Ss,
                  onProgress: Ss,
                  setOnComplete: (t) => (i[e] = { ...i[e], onComplete: t }),
                  setOnProgress: (t) => (i[e] = { ...i[e], onProgress: t }),
                  async send(e, t, i, n) {
                    if (i && "object" != typeof i) throw ks("action meta argument must be an object");
                    const o = typeof e;
                    if ("undefined" === o) throw ks("action data cannot be undefined");
                    const h = "string" !== o,
                      l = e instanceof Blob,
                      c = l || e instanceof ArrayBuffer || e instanceof Qi;
                    if (i && !c) throw ks("action meta argument can only be used with binary data");
                    const u = c ? new Uint8Array(l ? await e.arrayBuffer() : e) : Es(h ? Ps(e) : e),
                      p = i ? Es(Ps(i)) : null,
                      f = Math.ceil(u.byteLength / Xi) + (i ? 1 : 0) || 1,
                      _ = fs(f, (e, t) => {
                        const r = t === f - 1,
                          n = i && 0 === t,
                          o = new Uint8Array(15 + (n ? p.byteLength : r ? u.byteLength - Xi * (f - (i ? 2 : 1)) : Xi));
                        return (
                          o.set(s),
                          o.set([a], 12),
                          o.set([r | (n << 1) | (c << 2) | (h << 3)], 13),
                          o.set([Math.round(((t + 1) / f) * Zi)], 14),
                          o.set(i ? (n ? p : u.subarray((t - 1) * Xi, t * Xi)) : u.subarray(t * Xi, (t + 1) * Xi), 15),
                          o
                        );
                      });
                    return (
                      (a = (a + 1) & Zi),
                      ms(
                        d(t, async (e, t) => {
                          const { channel: s } = t;
                          let a = 0;
                          for (; a < f; ) {
                            const o = _[a];
                            if (
                              (s.bufferedAmount > s.bufferedAmountLowThreshold &&
                                (await new Promise((e) => {
                                  const t = () => {
                                    s.removeEventListener(en, t), e();
                                  };
                                  s.addEventListener(en, t);
                                })),
                              !r[e])
                            )
                              break;
                            t.sendData(o), a++, n?.(o[14] / Zi, e, i);
                          }
                        })
                      )
                    );
                  },
                }),
                (n[e] ||= [i[e].send, i[e].setOnComplete, i[e].setOnProgress])
              );
            },
            f = (e, t) => {
              const s = new Uint8Array(t),
                r = xs(s.subarray(0, 12)).replaceAll("\0", ""),
                [n] = s.subarray(12, 13),
                [o] = s.subarray(13, 14),
                [h] = s.subarray(14, 15),
                l = s.subarray(15),
                c = !!(1 & o),
                d = !!(2 & o),
                u = !!(4 & o),
                p = !!(8 & o);
              if (!i[r]) return void console.warn(`${ps}: received message with unregistered type (${r})`);
              (a[e] ||= {}), (a[e][r] ||= {});
              const f = (a[e][r][n] ||= { chunks: [] });
              if ((d ? (f.meta = As(xs(l))) : f.chunks.push(l), i[r].onProgress(h / Zi, e, f.meta), !c)) return;
              const _ = new Uint8Array(f.chunks.reduce((e, t) => e + t.byteLength, 0));
              if ((f.chunks.reduce((e, t) => (_.set(t, e), e + t.byteLength), 0), delete a[e][r][n], u)) i[r].onComplete(_, e, f.meta);
              else {
                const t = xs(_);
                i[r].onComplete(p ? As(t) : t, e);
              }
            },
            _ = async () => {
              await E(""),
                await new Promise((e) => setTimeout(e, 99)),
                vs(r).forEach(([e, t]) => {
                  t.destroy(), delete r[e];
                }),
                s();
            },
            [g, m] = p(tn("ping")),
            [y, v] = p(tn("pong")),
            [b, w] = p(tn("signal")),
            [S, k] = p(tn("stream")),
            [T, C] = p(tn("track")),
            [E, x] = p(tn("leave"));
          return (
            e((e, t) => {
              r[t] ||
                ((r[t] = e),
                e.setHandlers({
                  data: (e) => f(t, e),
                  stream(e) {
                    c.onPeerStream(e, t, h[t]), delete h[t];
                  },
                  track(e, s) {
                    c.onPeerTrack(e, s, t, l[t]), delete l[t];
                  },
                  signal: (e) => b(e, t),
                  close: () => u(t),
                  error: () => u(t),
                }),
                c.onPeerJoin(t),
                e.drainEarlyData?.((e) => f(t, e)));
            }),
            m((e, t) => y("", t)),
            v((e, t) => {
              o[t]?.(), delete o[t];
            }),
            w((e, t) => r[t]?.signal(e)),
            k((e, t) => (h[t] = e)),
            C((e, t) => (l[t] = e)),
            x((e, t) => u(t)),
            ys && addEventListener("beforeunload", _),
            {
              makeAction: p,
              leave: _,
              async ping(e) {
                if (!e) throw ks("ping() must be called with target peer ID");
                const t = Date.now();
                return g("", e), await new Promise((t) => (o[e] = t)), Date.now() - t;
              },
              getPeers: () => bs(vs(r).map(([e, t]) => [e, t.connection])),
              addStream: (e, t, s) =>
                d(t, async (t, r) => {
                  s && (await S(s, t)), r.addStream(e);
                }),
              removeStream: (e, t) => d(t, (t, s) => s.removeStream(e)),
              addTrack: (e, t, s, r) =>
                d(s, async (s, i) => {
                  r && (await T(r, s)), i.addTrack(e, t);
                }),
              removeTrack: (e, t, s) => d(s, (s, r) => r.removeTrack(e, t)),
              replaceTrack: (e, t, s, r, i) =>
                d(r, async (r, n) => {
                  i && (await T(i, r)), n.replaceTrack(e, t, s);
                }),
              onPeerJoin: (e) => (c.onPeerJoin = e),
              onPeerLeave: (e) => (c.onPeerLeave = e),
              onPeerStream: (e) => (c.onPeerStream = e),
              onPeerTrack: (e) => (c.onPeerTrack = e),
            }
          );
        })(
          (e) => (A = e),
          (e) => delete p[e],
          () => {
            delete r[d][l], R.forEach(clearTimeout), P.forEach(async (e) => (await e)()), clearInterval(a);
          }
        ))
      );
    };
  })({
    init(e) {
      return (t = e.appId), (s = e.supabaseKey), new us(t, s, r);
      var t, s, r;
    },
    subscribe(e, t, s, r) {
      const i = [],
        n = (t, s) => {
          const r = e.channel(t);
          r.subscribe(async (a) => {
            if ("SUBSCRIBED" === a) return o ? void e.removeChannel(r) : (i.push(r), s(r));
            "CLOSED" !== a && (await e.removeChannel(r), setTimeout(() => n(t, s), 999));
          });
        },
        a = (e, t) => n(e, (e) => e.send({ type: sn, event: nn, payload: t }));
      n(s, (e) => e.on(sn, { event: nn }, ({ payload: e }) => r(s, e, a))), n(t, (e) => e.on(sn, { event: rn }, ({ payload: e }) => r(t, e, a)));
      let o = !1;
      return () => {
        i.forEach((t) => e.removeChannel(t)), (o = !0);
      };
    },
    announce(e, t) {
      return e.channel(t).send({ type: sn, event: rn, payload: { peerId: gs } });
    },
  });
var on = Object.freeze({
  __proto__: null,
  default: h(() => {
    throw Error("ws does not work in the browser. Browser clients must use the native WebSocket object");
  }),
});
export { an as joinRoom, gs as selfId };