function t(t) {
  if (!Number.isSafeInteger(t) || t < 0) throw Error("positive integer expected, not " + t);
}
function e(t, ...e) {
  if (!((r = t) instanceof Uint8Array || (null != r && "object" == typeof r && "Uint8Array" === r.constructor.name))) throw Error("Uint8Array expected");
  var r;
  if (e.length > 0 && !e.includes(t.length)) throw Error(`Uint8Array expected of length ${e}, not of length=${t.length}`);
}
function r(t, e = !0) {
  if (t.destroyed) throw Error("Hash instance has been destroyed");
  if (e && t.finished) throw Error("Hash#digest() has already been called");
}
const n = "object" == typeof globalThis && "crypto" in globalThis ? globalThis.crypto : void 0,
  i = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength),
  s = (t, e) => (t << (32 - e)) | (t >>> e);
function o(t) {
  return (
    "string" == typeof t &&
      (t = (function (t) {
        if ("string" != typeof t) throw Error("utf8ToBytes expected string, got " + typeof t);
        return new Uint8Array(new TextEncoder().encode(t));
      })(t)),
    e(t),
    t
  );
}
new Uint8Array(new Uint32Array([287454020]).buffer)[0];
class a {
  clone() {
    return this._cloneInto();
  }
}
function h(t) {
  const e = (e) => t().update(o(e)).digest(),
    r = t();
  return (e.outputLen = r.outputLen), (e.blockLen = r.blockLen), (e.create = () => t()), e;
}
function c(t = 32) {
  if (n && "function" == typeof n.getRandomValues) return n.getRandomValues(new Uint8Array(t));
  throw Error("crypto.getRandomValues must be defined");
}
const d = (t, e, r) => (t & e) ^ (t & r) ^ (e & r);
class u extends a {
  constructor(t, e, r, n) {
    super(), (this.blockLen = t), (this.outputLen = e), (this.padOffset = r), (this.isLE = n), (this.finished = !1), (this.length = 0), (this.pos = 0), (this.destroyed = !1), (this.buffer = new Uint8Array(t)), (this.view = i(this.buffer));
  }
  update(t) {
    r(this);
    const { view: e, buffer: n, blockLen: s } = this,
      a = (t = o(t)).length;
    for (let r = 0; r < a; ) {
      const o = Math.min(s - this.pos, a - r);
      if (o !== s) n.set(t.subarray(r, r + o), this.pos), (this.pos += o), (r += o), this.pos === s && (this.process(e, 0), (this.pos = 0));
      else {
        const e = i(t);
        for (; s <= a - r; r += s) this.process(e, r);
      }
    }
    return (this.length += t.length), this.roundClean(), this;
  }
  digestInto(t) {
    r(this),
      (function (t, r) {
        e(t);
        const n = r.outputLen;
        if (t.length < n) throw Error("digestInto() expects output buffer of length at least " + n);
      })(t, this),
      (this.finished = !0);
    const { buffer: n, view: s, blockLen: o, isLE: a } = this;
    let { pos: h } = this;
    (n[h++] = 128), this.buffer.subarray(h).fill(0), this.padOffset > o - h && (this.process(s, 0), (h = 0));
    for (let t = h; t < o; t++) n[t] = 0;
    !(function (t, e, r, n) {
      if ("function" == typeof t.setBigUint64) return t.setBigUint64(e, r, n);
      const i = BigInt(32),
        s = BigInt(4294967295),
        o = Number((r >> i) & s),
        a = Number(r & s),
        h = n ? 4 : 0,
        c = n ? 0 : 4;
      t.setUint32(e + h, o, n), t.setUint32(e + c, a, n);
    })(s, o - 8, BigInt(8 * this.length), a),
      this.process(s, 0);
    const c = i(t),
      d = this.outputLen;
    if (d % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
    const u = d / 4,
      l = this.get();
    if (u > l.length) throw Error("_sha2: outputLen bigger than state");
    for (let t = 0; t < u; t++) c.setUint32(4 * t, l[t], a);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const r = t.slice(0, e);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: r, length: n, finished: i, destroyed: s, pos: o } = this;
    return (t.length = n), (t.pos = o), (t.finished = i), (t.destroyed = s), n % e && t.buffer.set(r), t;
  }
}
const l = new Uint32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298,
  ]),
  f = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]),
  p = new Uint32Array(64);
class g extends u {
  constructor() {
    super(64, 32, 8, !1), (this.A = 0 | f[0]), (this.B = 0 | f[1]), (this.C = 0 | f[2]), (this.D = 0 | f[3]), (this.E = 0 | f[4]), (this.F = 0 | f[5]), (this.G = 0 | f[6]), (this.H = 0 | f[7]);
  }
  get() {
    const { A: t, B: e, C: r, D: n, E: i, F: s, G: o, H: a } = this;
    return [t, e, r, n, i, s, o, a];
  }
  set(t, e, r, n, i, s, o, a) {
    (this.A = 0 | t), (this.B = 0 | e), (this.C = 0 | r), (this.D = 0 | n), (this.E = 0 | i), (this.F = 0 | s), (this.G = 0 | o), (this.H = 0 | a);
  }
  process(t, e) {
    for (let r = 0; r < 16; r++, e += 4) p[r] = t.getUint32(e, !1);
    for (let t = 16; t < 64; t++) {
      const e = p[t - 15],
        r = p[t - 2],
        n = s(e, 7) ^ s(e, 18) ^ (e >>> 3),
        i = s(r, 17) ^ s(r, 19) ^ (r >>> 10);
      p[t] = (i + p[t - 7] + n + p[t - 16]) | 0;
    }
    let { A: r, B: n, C: i, D: o, E: a, F: h, G: c, H: u } = this;
    for (let t = 0; t < 64; t++) {
      const e = (u + (s(a, 6) ^ s(a, 11) ^ s(a, 25)) + (((f = a) & h) ^ (~f & c)) + l[t] + p[t]) | 0,
        g = ((s(r, 2) ^ s(r, 13) ^ s(r, 22)) + d(r, n, i)) | 0;
      (u = c), (c = h), (h = a), (a = (o + e) | 0), (o = i), (i = n), (n = r), (r = (e + g) | 0);
    }
    var f;
    (r = (r + this.A) | 0), (n = (n + this.B) | 0), (i = (i + this.C) | 0), (o = (o + this.D) | 0), (a = (a + this.E) | 0), (h = (h + this.F) | 0), (c = (c + this.G) | 0), (u = (u + this.H) | 0), this.set(r, n, i, o, a, h, c, u);
  }
  roundClean() {
    p.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const y = h(() => new g());
class m extends a {
  constructor(e, r) {
    super(),
      (this.finished = !1),
      (this.destroyed = !1),
      (function (e) {
        if ("function" != typeof e || "function" != typeof e.create) throw Error("Hash should be wrapped by utils.wrapConstructor");
        t(e.outputLen), t(e.blockLen);
      })(e);
    const n = o(r);
    if (((this.iHash = e.create()), "function" != typeof this.iHash.update)) throw Error("Expected instance of class which extends utils.Hash");
    (this.blockLen = this.iHash.blockLen), (this.outputLen = this.iHash.outputLen);
    const i = this.blockLen,
      s = new Uint8Array(i);
    s.set(n.length > i ? e.create().update(n).digest() : n);
    for (let t = 0; t < s.length; t++) s[t] ^= 54;
    this.iHash.update(s), (this.oHash = e.create());
    for (let t = 0; t < s.length; t++) s[t] ^= 106;
    this.oHash.update(s), s.fill(0);
  }
  update(t) {
    return r(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    r(this), e(t, this.outputLen), (this.finished = !0), this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: e, iHash: r, finished: n, destroyed: i, blockLen: s, outputLen: o } = this;
    return (t.finished = n), (t.destroyed = i), (t.blockLen = s), (t.outputLen = o), (t.oHash = e._cloneInto(t.oHash)), (t.iHash = r._cloneInto(t.iHash)), t;
  }
  destroy() {
    (this.destroyed = !0), this.oHash.destroy(), this.iHash.destroy();
  }
}
const _ = (t, e, r) => new m(t, e).update(r).digest();
_.create = (t, e) => new m(t, e);
const b = BigInt(0),
  w = BigInt(1),
  E = BigInt(2);
function v(t) {
  return t instanceof Uint8Array || (null != t && "object" == typeof t && "Uint8Array" === t.constructor.name);
}
function S(t) {
  if (!v(t)) throw Error("Uint8Array expected");
}
const C = Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
function x(t) {
  S(t);
  let e = "";
  for (let r = 0; r < t.length; r++) e += C[t[r]];
  return e;
}
function A(t) {
  const e = t.toString(16);
  return 1 & e.length ? "0" + e : e;
}
function T(t) {
  if ("string" != typeof t) throw Error("hex string expected, got " + typeof t);
  return BigInt("" === t ? "0" : "0x" + t);
}
const R = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function k(t) {
  return t >= R._0 && t <= R._9 ? t - R._0 : t >= R._A && t <= R._F ? t - (R._A - 10) : t >= R._a && t <= R._f ? t - (R._a - 10) : void 0;
}
function I(t) {
  if ("string" != typeof t) throw Error("hex string expected, got " + typeof t);
  const e = t.length,
    r = e / 2;
  if (e % 2) throw Error("padded hex string expected, got unpadded hex of length " + e);
  const n = new Uint8Array(r);
  for (let e = 0, i = 0; e < r; e++, i += 2) {
    const r = k(t.charCodeAt(i)),
      s = k(t.charCodeAt(i + 1));
    if (void 0 === r || void 0 === s) {
      const e = t[i] + t[i + 1];
      throw Error('hex string expected, got non-hex character "' + e + '" at index ' + i);
    }
    n[e] = 16 * r + s;
  }
  return n;
}
function B(t) {
  return T(x(t));
}
function N(t) {
  return S(t), T(x(Uint8Array.from(t).reverse()));
}
function O(t, e) {
  return I(t.toString(16).padStart(2 * e, "0"));
}
function L(t, e) {
  return O(t, e).reverse();
}
function P(t, e, r) {
  let n;
  if ("string" == typeof e)
    try {
      n = I(e);
    } catch (r) {
      throw Error(`${t} must be valid hex string, got "${e}". Cause: ${r}`);
    }
  else {
    if (!v(e)) throw Error(t + " must be hex string or Uint8Array");
    n = Uint8Array.from(e);
  }
  const i = n.length;
  if ("number" == typeof r && i !== r) throw Error(`${t} expected ${r} bytes, got ${i}`);
  return n;
}
function F(...t) {
  let e = 0;
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    S(n), (e += n.length);
  }
  const r = new Uint8Array(e);
  for (let e = 0, n = 0; e < t.length; e++) {
    const i = t[e];
    r.set(i, n), (n += i.length);
  }
  return r;
}
const D = (t) => (E << BigInt(t - 1)) - w,
  U = (t) => new Uint8Array(t),
  q = (t) => Uint8Array.from(t);
function M(t, e, r) {
  if ("number" != typeof t || t < 2) throw Error("hashLen must be a number");
  if ("number" != typeof e || e < 2) throw Error("qByteLen must be a number");
  if ("function" != typeof r) throw Error("hmacFn must be a function");
  let n = U(t),
    i = U(t),
    s = 0;
  const o = () => {
      n.fill(1), i.fill(0), (s = 0);
    },
    a = (...t) => r(i, n, ...t),
    h = (t = U()) => {
      (i = a(q([0]), t)), (n = a()), 0 !== t.length && ((i = a(q([1]), t)), (n = a()));
    },
    c = () => {
      if (s++ >= 1e3) throw Error("drbg: tried 1000 values");
      let t = 0;
      const r = [];
      for (; t < e; ) {
        n = a();
        const e = n.slice();
        r.push(e), (t += n.length);
      }
      return F(...r);
    };
  return (t, e) => {
    let r;
    for (o(), h(t); !(r = e(c())); ) h();
    return o(), r;
  };
}
const H = {
  bigint(t) {
    return "bigint" == typeof t;
  },
  function(t) {
    return "function" == typeof t;
  },
  boolean(t) {
    return "boolean" == typeof t;
  },
  string(t) {
    return "string" == typeof t;
  },
  stringOrUint8Array(t) {
    return "string" == typeof t || v(t);
  },
  isSafeInteger(t) {
    return Number.isSafeInteger(t);
  },
  array(t) {
    return Array.isArray(t);
  },
  field(t, e) {
    return e.Fp.isValid(t);
  },
  hash(t) {
    return "function" == typeof t && Number.isSafeInteger(t.outputLen);
  },
};
function j(t, e, r = {}) {
  const n = (e, r, n) => {
    const i = H[r];
    if ("function" != typeof i) throw Error(`Invalid validator "${r}", expected function`);
    const s = t[e];
    if (!((n && void 0 === s) || i(s, t))) throw Error(`Invalid param ${e + ""}=${s} (${typeof s}), expected ${r}`);
  };
  for (const [t, r] of Object.entries(e)) n(t, r, !1);
  for (const [t, e] of Object.entries(r)) n(t, e, !0);
  return t;
}
var $ = Object.freeze({
  __proto__: null,
  abytes: S,
  bitGet(t, e) {
    return (t >> BigInt(e)) & w;
  },
  bitLen(t) {
    let e;
    for (e = 0; t > b; t >>= w, e += 1);
    return e;
  },
  bitMask: D,
  bitSet(t, e, r) {
    return t | ((r ? w : b) << BigInt(e));
  },
  bytesToHex: x,
  bytesToNumberBE: B,
  bytesToNumberLE: N,
  concatBytes: F,
  createHmacDrbg: M,
  ensureBytes: P,
  equalBytes(t, e) {
    if (t.length !== e.length) return !1;
    let r = 0;
    for (let n = 0; n < t.length; n++) r |= t[n] ^ e[n];
    return 0 === r;
  },
  hexToBytes: I,
  hexToNumber: T,
  isBytes: v,
  numberToBytesBE: O,
  numberToBytesLE: L,
  numberToHexUnpadded: A,
  numberToVarBytesBE(t) {
    return I(A(t));
  },
  utf8ToBytes(t) {
    if ("string" != typeof t) throw Error("utf8ToBytes expected string, got " + typeof t);
    return new Uint8Array(new TextEncoder().encode(t));
  },
  validateObject: j,
});
const z = BigInt(0),
  W = BigInt(1),
  K = BigInt(2),
  V = BigInt(3),
  Z = BigInt(4),
  Y = BigInt(5),
  G = BigInt(8);
function J(t, e) {
  const r = t % e;
  return r >= z ? r : e + r;
}
function Q(t, e, r) {
  if (r <= z || e < z) throw Error("Expected power/modulo > 0");
  if (r === W) return z;
  let n = W;
  for (; e > z; ) e & W && (n = (n * t) % r), (t = (t * t) % r), (e >>= W);
  return n;
}
function X(t, e, r) {
  let n = t;
  for (; e-- > z; ) (n *= n), (n %= r);
  return n;
}
function tt(t, e) {
  if (t === z || e <= z) throw Error(`invert: expected positive integers, got n=${t} mod=${e}`);
  let r = J(t, e),
    n = e,
    i = z,
    s = W;
  for (; r !== z; ) {
    const t = n % r,
      e = i - s * (n / r);
    (n = r), (r = t), (i = s), (s = e);
  }
  if (n !== W) throw Error("invert: does not exist");
  return J(i, e);
}
function et(t) {
  if (t % Z === V) {
    const e = (t + W) / Z;
    return function (t, r) {
      const n = t.pow(r, e);
      if (!t.eql(t.sqr(n), r)) throw Error("Cannot find square root");
      return n;
    };
  }
  if (t % G === Y) {
    const e = (t - Y) / G;
    return function (t, r) {
      const n = t.mul(r, K),
        i = t.pow(n, e),
        s = t.mul(r, i),
        o = t.mul(t.mul(s, K), i),
        a = t.mul(s, t.sub(o, t.ONE));
      if (!t.eql(t.sqr(a), r)) throw Error("Cannot find square root");
      return a;
    };
  }
  return (function (t) {
    const e = (t - W) / K;
    let r, n, i;
    for (r = t - W, n = 0; r % K === z; r /= K, n++);
    for (i = K; i < t && Q(i, e, t) !== t - W; i++);
    if (1 === n) {
      const e = (t + W) / Z;
      return (t, r) => {
        const n = t.pow(r, e);
        if (!t.eql(t.sqr(n), r)) throw Error("Cannot find square root");
        return n;
      };
    }
    const s = (r + W) / K;
    return (t, o) => {
      if (t.pow(o, e) === t.neg(t.ONE)) throw Error("Cannot find square root");
      let a = n,
        h = t.pow(t.mul(t.ONE, i), r),
        c = t.pow(o, s),
        d = t.pow(o, r);
      for (; !t.eql(d, t.ONE); ) {
        if (t.eql(d, t.ZERO)) return t.ZERO;
        let e = 1;
        for (let r = t.sqr(d); e < a && !t.eql(r, t.ONE); e++) r = t.sqr(r);
        const r = t.pow(h, W << BigInt(a - e - 1));
        (h = t.sqr(r)), (c = t.mul(c, r)), (d = t.mul(d, h)), (a = e);
      }
      return c;
    };
  })(t);
}
BigInt(9), BigInt(16);
const rt = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function nt(t, e) {
  const r = void 0 !== e ? e : t.toString(2).length;
  return { nBitLength: r, nByteLength: Math.ceil(r / 8) };
}
function it(t) {
  if ("bigint" != typeof t) throw Error("field order must be bigint");
  const e = t.toString(2).length;
  return Math.ceil(e / 8);
}
function st(t) {
  const e = it(t);
  return e + Math.ceil(e / 2);
}
const ot = BigInt(0),
  at = BigInt(1);
function ht(t) {
  return (
    j(
      t.Fp,
      rt.reduce((t, e) => ((t[e] = "function"), t), { ORDER: "bigint", MASK: "bigint", BYTES: "isSafeInteger", BITS: "isSafeInteger" })
    ),
    j(t, { n: "bigint", h: "bigint", Gx: "field", Gy: "field" }, { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }),
    Object.freeze({ ...nt(t.n, t.nBitLength), ...t, p: t.Fp.ORDER })
  );
}
const { bytesToNumberBE: ct, hexToBytes: dt } = $,
  ut = {
    Err: class extends Error {
      constructor(t = "") {
        super(t);
      }
    },
    _parseInt(t) {
      const { Err: e } = ut;
      if (t.length < 2 || 2 !== t[0]) throw new e("Invalid signature integer tag");
      const r = t[1],
        n = t.subarray(2, r + 2);
      if (!r || n.length !== r) throw new e("Invalid signature integer: wrong length");
      if (128 & n[0]) throw new e("Invalid signature integer: negative");
      if (0 === n[0] && !(128 & n[1])) throw new e("Invalid signature integer: unnecessary leading zero");
      return { d: ct(n), l: t.subarray(r + 2) };
    },
    toSig(t) {
      const { Err: e } = ut,
        r = "string" == typeof t ? dt(t) : t;
      S(r);
      let n = r.length;
      if (n < 2 || 48 != r[0]) throw new e("Invalid signature tag");
      if (r[1] !== n - 2) throw new e("Invalid signature: incorrect length");
      const { d: i, l: s } = ut._parseInt(r.subarray(2)),
        { d: o, l: a } = ut._parseInt(s);
      if (a.length) throw new e("Invalid signature: left bytes after parsing");
      return { r: i, s: o };
    },
    hexFromSig(t) {
      const e = (t) => (8 & Number.parseInt(t[0], 16) ? "00" + t : t),
        r = (t) => {
          const e = t.toString(16);
          return 1 & e.length ? "0" + e : e;
        },
        n = e(r(t.s)),
        i = e(r(t.r)),
        s = n.length / 2,
        o = i.length / 2,
        a = r(s),
        h = r(o);
      return `30${r(o + s + 4)}02${h}${i}02${a}${n}`;
    },
  },
  lt = BigInt(0),
  ft = BigInt(1);
BigInt(2);
const pt = BigInt(3);
function gt(t) {
  const e = (function (t) {
      const e = ht(t);
      j(e, { a: "field", b: "field" }, { allowedPrivateKeyLengths: "array", wrapPrivateKey: "boolean", isTorsionFree: "function", clearCofactor: "function", allowInfinityPoint: "boolean", fromBytes: "function", toBytes: "function" });
      const { endo: r, Fp: n, a: i } = e;
      if (r) {
        if (!n.eql(i, n.ZERO)) throw Error("Endomorphism can only be defined for Koblitz curves that have a=0");
        if ("object" != typeof r || "bigint" != typeof r.beta || "function" != typeof r.splitScalar) throw Error("Expected endomorphism with beta: bigint and splitScalar: function");
      }
      return Object.freeze({ ...e });
    })(t),
    { Fp: r } = e,
    n =
      e.toBytes ||
      ((t, e) => {
        const n = e.toAffine();
        return F(Uint8Array.from([4]), r.toBytes(n.x), r.toBytes(n.y));
      }),
    i =
      e.fromBytes ||
      ((t) => {
        const e = t.subarray(1);
        return { x: r.fromBytes(e.subarray(0, r.BYTES)), y: r.fromBytes(e.subarray(r.BYTES, 2 * r.BYTES)) };
      });
  function s(t) {
    const { a: n, b: i } = e,
      s = r.sqr(t),
      o = r.mul(s, t);
    return r.add(r.add(o, r.mul(t, n)), i);
  }
  if (!r.eql(r.sqr(e.Gy), s(e.Gx))) throw Error("bad generator point: equation left != right");
  function o(t) {
    return "bigint" == typeof t && lt < t && t < e.n;
  }
  function a(t) {
    if (!o(t)) throw Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function h(t) {
    const { allowedPrivateKeyLengths: r, nByteLength: n, wrapPrivateKey: i, n: s } = e;
    if (r && "bigint" != typeof t) {
      if ((v(t) && (t = x(t)), "string" != typeof t || !r.includes(t.length))) throw Error("Invalid key");
      t = t.padStart(2 * n, "0");
    }
    let o;
    try {
      o = "bigint" == typeof t ? t : B(P("private key", t, n));
    } catch (e) {
      throw Error(`private key must be ${n} bytes, hex or bigint, not ${typeof t}`);
    }
    return i && (o = J(o, s)), a(o), o;
  }
  const c = new Map();
  function d(t) {
    if (!(t instanceof u)) throw Error("ProjectivePoint expected");
  }
  class u {
    constructor(t, e, n) {
      if (((this.px = t), (this.py = e), (this.pz = n), null == t || !r.isValid(t))) throw Error("x required");
      if (null == e || !r.isValid(e)) throw Error("y required");
      if (null == n || !r.isValid(n)) throw Error("z required");
    }
    static fromAffine(t) {
      const { x: e, y: n } = t || {};
      if (!t || !r.isValid(e) || !r.isValid(n)) throw Error("invalid affine point");
      if (t instanceof u) throw Error("projective point not allowed");
      const i = (t) => r.eql(t, r.ZERO);
      return i(e) && i(n) ? u.ZERO : new u(e, n, r.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static normalizeZ(t) {
      const e = r.invertBatch(t.map((t) => t.pz));
      return t.map((t, r) => t.toAffine(e[r])).map(u.fromAffine);
    }
    static fromHex(t) {
      const e = u.fromAffine(i(P("pointHex", t)));
      return e.assertValidity(), e;
    }
    static fromPrivateKey(t) {
      return u.BASE.multiply(h(t));
    }
    _setWindowSize(t) {
      (this._WINDOW_SIZE = t), c.delete(this);
    }
    assertValidity() {
      if (this.is0()) {
        if (e.allowInfinityPoint && !r.is0(this.py)) return;
        throw Error("bad point: ZERO");
      }
      const { x: t, y: n } = this.toAffine();
      if (!r.isValid(t) || !r.isValid(n)) throw Error("bad point: x or y not FE");
      const i = r.sqr(n),
        o = s(t);
      if (!r.eql(i, o)) throw Error("bad point: equation left != right");
      if (!this.isTorsionFree()) throw Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: t } = this.toAffine();
      if (r.isOdd) return !r.isOdd(t);
      throw Error("Field doesn't support isOdd");
    }
    equals(t) {
      d(t);
      const { px: e, py: n, pz: i } = this,
        { px: s, py: o, pz: a } = t,
        h = r.eql(r.mul(e, a), r.mul(s, i)),
        c = r.eql(r.mul(n, a), r.mul(o, i));
      return h && c;
    }
    negate() {
      return new u(this.px, r.neg(this.py), this.pz);
    }
    double() {
      const { a: t, b: n } = e,
        i = r.mul(n, pt),
        { px: s, py: o, pz: a } = this;
      let h = r.ZERO,
        c = r.ZERO,
        d = r.ZERO,
        l = r.mul(s, s),
        f = r.mul(o, o),
        p = r.mul(a, a),
        g = r.mul(s, o);
      return (
        (g = r.add(g, g)),
        (d = r.mul(s, a)),
        (d = r.add(d, d)),
        (h = r.mul(t, d)),
        (c = r.mul(i, p)),
        (c = r.add(h, c)),
        (h = r.sub(f, c)),
        (c = r.add(f, c)),
        (c = r.mul(h, c)),
        (h = r.mul(g, h)),
        (d = r.mul(i, d)),
        (p = r.mul(t, p)),
        (g = r.sub(l, p)),
        (g = r.mul(t, g)),
        (g = r.add(g, d)),
        (d = r.add(l, l)),
        (l = r.add(d, l)),
        (l = r.add(l, p)),
        (l = r.mul(l, g)),
        (c = r.add(c, l)),
        (p = r.mul(o, a)),
        (p = r.add(p, p)),
        (l = r.mul(p, g)),
        (h = r.sub(h, l)),
        (d = r.mul(p, f)),
        (d = r.add(d, d)),
        (d = r.add(d, d)),
        new u(h, c, d)
      );
    }
    add(t) {
      d(t);
      const { px: n, py: i, pz: s } = this,
        { px: o, py: a, pz: h } = t;
      let c = r.ZERO,
        l = r.ZERO,
        f = r.ZERO;
      const p = e.a,
        g = r.mul(e.b, pt);
      let y = r.mul(n, o),
        m = r.mul(i, a),
        _ = r.mul(s, h),
        b = r.add(n, i),
        w = r.add(o, a);
      (b = r.mul(b, w)), (w = r.add(y, m)), (b = r.sub(b, w)), (w = r.add(n, s));
      let E = r.add(o, h);
      return (
        (w = r.mul(w, E)),
        (E = r.add(y, _)),
        (w = r.sub(w, E)),
        (E = r.add(i, s)),
        (c = r.add(a, h)),
        (E = r.mul(E, c)),
        (c = r.add(m, _)),
        (E = r.sub(E, c)),
        (f = r.mul(p, w)),
        (c = r.mul(g, _)),
        (f = r.add(c, f)),
        (c = r.sub(m, f)),
        (f = r.add(m, f)),
        (l = r.mul(c, f)),
        (m = r.add(y, y)),
        (m = r.add(m, y)),
        (_ = r.mul(p, _)),
        (w = r.mul(g, w)),
        (m = r.add(m, _)),
        (_ = r.sub(y, _)),
        (_ = r.mul(p, _)),
        (w = r.add(w, _)),
        (y = r.mul(m, w)),
        (l = r.add(l, y)),
        (y = r.mul(E, w)),
        (c = r.mul(b, c)),
        (c = r.sub(c, y)),
        (y = r.mul(b, m)),
        (f = r.mul(E, f)),
        (f = r.add(f, y)),
        new u(c, l, f)
      );
    }
    subtract(t) {
      return this.add(t.negate());
    }
    is0() {
      return this.equals(u.ZERO);
    }
    wNAF(t) {
      return f.wNAFCached(this, c, t, (t) => {
        const e = r.invertBatch(t.map((t) => t.pz));
        return t.map((t, r) => t.toAffine(e[r])).map(u.fromAffine);
      });
    }
    multiplyUnsafe(t) {
      const n = u.ZERO;
      if (t === lt) return n;
      if ((a(t), t === ft)) return this;
      const { endo: i } = e;
      if (!i) return f.unsafeLadder(this, t);
      let { k1neg: s, k1: o, k2neg: h, k2: c } = i.splitScalar(t),
        d = n,
        l = n,
        p = this;
      for (; o > lt || c > lt; ) o & ft && (d = d.add(p)), c & ft && (l = l.add(p)), (p = p.double()), (o >>= ft), (c >>= ft);
      return s && (d = d.negate()), h && (l = l.negate()), (l = new u(r.mul(l.px, i.beta), l.py, l.pz)), d.add(l);
    }
    multiply(t) {
      a(t);
      let n,
        i,
        s = t;
      const { endo: o } = e;
      if (o) {
        const { k1neg: t, k1: e, k2neg: a, k2: h } = o.splitScalar(s);
        let { p: c, f: d } = this.wNAF(e),
          { p: l, f: p } = this.wNAF(h);
        (c = f.constTimeNegate(t, c)), (l = f.constTimeNegate(a, l)), (l = new u(r.mul(l.px, o.beta), l.py, l.pz)), (n = c.add(l)), (i = d.add(p));
      } else {
        const { p: t, f: e } = this.wNAF(s);
        (n = t), (i = e);
      }
      return u.normalizeZ([n, i])[0];
    }
    multiplyAndAddUnsafe(t, e, r) {
      const n = u.BASE,
        i = (t, e) => (e !== lt && e !== ft && t.equals(n) ? t.multiply(e) : t.multiplyUnsafe(e)),
        s = i(this, e).add(i(t, r));
      return s.is0() ? void 0 : s;
    }
    toAffine(t) {
      const { px: e, py: n, pz: i } = this,
        s = this.is0();
      null == t && (t = s ? r.ONE : r.inv(i));
      const o = r.mul(e, t),
        a = r.mul(n, t),
        h = r.mul(i, t);
      if (s) return { x: r.ZERO, y: r.ZERO };
      if (!r.eql(h, r.ONE)) throw Error("invZ was invalid");
      return { x: o, y: a };
    }
    isTorsionFree() {
      const { h: t, isTorsionFree: r } = e;
      if (t === ft) return !0;
      if (r) return r(u, this);
      throw Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: t, clearCofactor: r } = e;
      return t === ft ? this : r ? r(u, this) : this.multiplyUnsafe(e.h);
    }
    toRawBytes(t = !0) {
      return this.assertValidity(), n(u, this, t);
    }
    toHex(t = !0) {
      return x(this.toRawBytes(t));
    }
  }
  (u.BASE = new u(e.Gx, e.Gy, r.ONE)), (u.ZERO = new u(r.ZERO, r.ONE, r.ZERO));
  const l = e.nBitLength,
    f = (function (t, e) {
      const r = (t, e) => {
          const r = e.negate();
          return t ? r : e;
        },
        n = (t) => ({ windows: Math.ceil(e / t) + 1, windowSize: 2 ** (t - 1) });
      return {
        constTimeNegate: r,
        unsafeLadder(e, r) {
          let n = t.ZERO,
            i = e;
          for (; r > ot; ) r & at && (n = n.add(i)), (i = i.double()), (r >>= at);
          return n;
        },
        precomputeWindow(t, e) {
          const { windows: r, windowSize: i } = n(e),
            s = [];
          let o = t,
            a = o;
          for (let t = 0; t < r; t++) {
            (a = o), s.push(a);
            for (let t = 1; t < i; t++) (a = a.add(o)), s.push(a);
            o = a.double();
          }
          return s;
        },
        wNAF(e, i, s) {
          const { windows: o, windowSize: a } = n(e);
          let h = t.ZERO,
            c = t.BASE;
          const d = BigInt(2 ** e - 1),
            u = 2 ** e,
            l = BigInt(e);
          for (let t = 0; t < o; t++) {
            const e = t * a;
            let n = Number(s & d);
            (s >>= l), n > a && ((n -= u), (s += at));
            const o = e,
              f = e + Math.abs(n) - 1,
              p = t % 2 != 0,
              g = n < 0;
            0 === n ? (c = c.add(r(p, i[o]))) : (h = h.add(r(g, i[f])));
          }
          return { p: h, f: c };
        },
        wNAFCached(t, e, r, n) {
          const i = t._WINDOW_SIZE || 1;
          let s = e.get(t);
          return s || ((s = this.precomputeWindow(t, i)), 1 !== i && e.set(t, n(s))), this.wNAF(i, s, r);
        },
      };
    })(u, e.endo ? Math.ceil(l / 2) : l);
  return { CURVE: e, ProjectivePoint: u, normPrivateKeyToScalar: h, weierstrassEquation: s, isWithinCurveOrder: o };
}
function yt(t) {
  const e = (function (t) {
      const e = ht(t);
      return j(e, { hash: "hash", hmac: "function", randomBytes: "function" }, { bits2int: "function", bits2int_modN: "function", lowS: "boolean" }), Object.freeze({ lowS: !0, ...e });
    })(t),
    { Fp: r, n } = e,
    i = r.BYTES + 1,
    s = 2 * r.BYTES + 1;
  function o(t) {
    return J(t, n);
  }
  function a(t) {
    return tt(t, n);
  }
  const { ProjectivePoint: h, normPrivateKeyToScalar: c, weierstrassEquation: d, isWithinCurveOrder: u } = gt({
      ...e,
      toBytes(t, e, n) {
        const i = e.toAffine(),
          s = r.toBytes(i.x),
          o = F;
        return n ? o(Uint8Array.from([e.hasEvenY() ? 2 : 3]), s) : o(Uint8Array.from([4]), s, r.toBytes(i.y));
      },
      fromBytes(t) {
        const e = t.length,
          n = t[0],
          o = t.subarray(1);
        if (e !== i || (2 !== n && 3 !== n)) {
          if (e === s && 4 === n) {
            return { x: r.fromBytes(o.subarray(0, r.BYTES)), y: r.fromBytes(o.subarray(r.BYTES, 2 * r.BYTES)) };
          }
          throw Error(`Point of length ${e} was invalid. Expected ${i} compressed bytes or ${s} uncompressed bytes`);
        }
        {
          const t = B(o);
          if (!(lt < (a = t) && a < r.ORDER)) throw Error("Point is not on curve");
          const e = d(t);
          let i;
          try {
            i = r.sqrt(e);
          } catch (t) {
            const e = t instanceof Error ? ": " + t.message : "";
            throw Error("Point is not on curve" + e);
          }
          return !(1 & ~n) !== ((i & ft) === ft) && (i = r.neg(i)), { x: t, y: i };
        }
        var a;
      },
    }),
    l = (t) => x(O(t, e.nByteLength));
  function f(t) {
    return t > n >> ft;
  }
  const p = (t, e, r) => B(t.slice(e, r));
  class g {
    constructor(t, e, r) {
      (this.r = t), (this.s = e), (this.recovery = r), this.assertValidity();
    }
    static fromCompact(t) {
      const r = e.nByteLength;
      return (t = P("compactSignature", t, 2 * r)), new g(p(t, 0, r), p(t, r, 2 * r));
    }
    static fromDER(t) {
      const { r: e, s: r } = ut.toSig(P("DER", t));
      return new g(e, r);
    }
    assertValidity() {
      if (!u(this.r)) throw Error("r must be 0 < r < CURVE.n");
      if (!u(this.s)) throw Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(t) {
      return new g(this.r, this.s, t);
    }
    recoverPublicKey(t) {
      const { r: n, s: i, recovery: s } = this,
        c = b(P("msgHash", t));
      if (null == s || ![0, 1, 2, 3].includes(s)) throw Error("recovery id invalid");
      const d = 2 === s || 3 === s ? n + e.n : n;
      if (d >= r.ORDER) throw Error("recovery id 2 or 3 invalid");
      const u = 1 & s ? "03" : "02",
        f = h.fromHex(u + l(d)),
        p = a(d),
        g = o(-c * p),
        y = o(i * p),
        m = h.BASE.multiplyAndAddUnsafe(f, g, y);
      if (!m) throw Error("point at infinify");
      return m.assertValidity(), m;
    }
    hasHighS() {
      return f(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new g(this.r, o(-this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return I(this.toDERHex());
    }
    toDERHex() {
      return ut.hexFromSig({ r: this.r, s: this.s });
    }
    toCompactRawBytes() {
      return I(this.toCompactHex());
    }
    toCompactHex() {
      return l(this.r) + l(this.s);
    }
  }
  const y = {
    isValidPrivateKey(t) {
      try {
        return c(t), !0;
      } catch (t) {
        return !1;
      }
    },
    normPrivateKeyToScalar: c,
    randomPrivateKey() {
      const t = st(e.n);
      return (function (t, e, r = !1) {
        const n = t.length,
          i = it(e),
          s = st(e);
        if (n < 16 || n < s || n > 1024) throw Error(`expected ${s}-1024 bytes of input, got ${n}`);
        const o = J(r ? B(t) : N(t), e - W) + W;
        return r ? L(o, i) : O(o, i);
      })(e.randomBytes(t), e.n);
    },
    precompute: (t = 8, e = h.BASE) => (e._setWindowSize(t), e.multiply(BigInt(3)), e),
  };
  function m(t) {
    const e = v(t),
      r = "string" == typeof t,
      n = (e || r) && t.length;
    return e ? n === i || n === s : r ? n === 2 * i || n === 2 * s : t instanceof h;
  }
  const _ =
      e.bits2int ||
      ((t) => {
        const r = B(t),
          n = 8 * t.length - e.nBitLength;
        return n > 0 ? r >> BigInt(n) : r;
      }),
    b = e.bits2int_modN || ((t) => o(_(t))),
    w = D(e.nBitLength);
  function E(t) {
    if ("bigint" != typeof t) throw Error("bigint expected");
    if (!(lt <= t && t < w)) throw Error("bigint expected < 2^" + e.nBitLength);
    return O(t, e.nByteLength);
  }
  function S(t, n, i = C) {
    if (["recovered", "canonical"].some((t) => t in i)) throw Error("sign() legacy options not supported");
    const { hash: s, randomBytes: d } = e;
    let { lowS: l, prehash: p, extraEntropy: y } = i;
    null == l && (l = !0), (t = P("msgHash", t)), p && (t = P("prehashed msgHash", s(t)));
    const m = b(t),
      w = c(n),
      v = [E(w), E(m)];
    if (null != y && !1 !== y) {
      const t = !0 === y ? d(r.BYTES) : y;
      v.push(P("extraEntropy", t));
    }
    const S = F(...v),
      x = m;
    return {
      seed: S,
      k2sig(t) {
        const e = _(t);
        if (!u(e)) return;
        const r = a(e),
          n = h.BASE.multiply(e).toAffine(),
          i = o(n.x);
        if (i === lt) return;
        const s = o(r * o(x + i * w));
        if (s === lt) return;
        let c = (n.x === i ? 0 : 2) | Number(n.y & ft),
          d = s;
        return (
          l &&
            f(s) &&
            ((d = (function (t) {
              return f(t) ? o(-t) : t;
            })(s)),
            (c ^= 1)),
          new g(i, d, c)
        );
      },
    };
  }
  const C = { lowS: e.lowS, prehash: !1 },
    A = { lowS: e.lowS, prehash: !1 };
  return (
    h.BASE._setWindowSize(8),
    {
      CURVE: e,
      getPublicKey(t, e = !0) {
        return h.fromPrivateKey(t).toRawBytes(e);
      },
      getSharedSecret(t, e, r = !0) {
        if (m(t)) throw Error("first arg must be private key");
        if (!m(e)) throw Error("second arg must be public key");
        return h.fromHex(e).multiply(c(t)).toRawBytes(r);
      },
      sign(t, r, n = C) {
        const { seed: i, k2sig: s } = S(t, r, n),
          o = e;
        return M(o.hash.outputLen, o.nByteLength, o.hmac)(i, s);
      },
      verify(t, r, n, i = A) {
        const s = t;
        if (((r = P("msgHash", r)), (n = P("publicKey", n)), "strict" in i)) throw Error("options.strict was renamed to lowS");
        const { lowS: c, prehash: d } = i;
        let u, l;
        try {
          if ("string" == typeof s || v(s))
            try {
              u = g.fromDER(s);
            } catch (t) {
              if (!(t instanceof ut.Err)) throw t;
              u = g.fromCompact(s);
            }
          else {
            if ("object" != typeof s || "bigint" != typeof s.r || "bigint" != typeof s.s) throw Error("PARSE");
            {
              const { r: t, s: e } = s;
              u = new g(t, e);
            }
          }
          l = h.fromHex(n);
        } catch (t) {
          if ("PARSE" === t.message) throw Error("signature must be Signature instance, Uint8Array or hex string");
          return !1;
        }
        if (c && u.hasHighS()) return !1;
        d && (r = e.hash(r));
        const { r: f, s: p } = u,
          y = b(r),
          m = a(p),
          _ = o(y * m),
          w = o(f * m),
          E = h.BASE.multiplyAndAddUnsafe(l, _, w)?.toAffine();
        return !!E && o(E.x) === f;
      },
      ProjectivePoint: h,
      Signature: g,
      utils: y,
    }
  );
}
function mt(t) {
  return {
    hash: t,
    hmac(r, ...n) {
      return _(
        t,
        r,
        (function (...t) {
          let r = 0;
          for (let n = 0; n < t.length; n++) {
            const i = t[n];
            e(i), (r += i.length);
          }
          const n = new Uint8Array(r);
          for (let e = 0, r = 0; e < t.length; e++) {
            const i = t[e];
            n.set(i, r), (r += i.length);
          }
          return n;
        })(...n)
      );
    },
    randomBytes: c,
  };
}
BigInt(4);
const _t = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
  bt = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
  wt = BigInt(1),
  Et = BigInt(2),
  vt = (t, e) => (t + e / Et) / e;
function St(t) {
  const e = _t,
    r = BigInt(3),
    n = BigInt(6),
    i = BigInt(11),
    s = BigInt(22),
    o = BigInt(23),
    a = BigInt(44),
    h = BigInt(88),
    c = (t * t * t) % e,
    d = (c * c * t) % e,
    u = (X(d, r, e) * d) % e,
    l = (X(u, r, e) * d) % e,
    f = (X(l, Et, e) * c) % e,
    p = (X(f, i, e) * f) % e,
    g = (X(p, s, e) * p) % e,
    y = (X(g, a, e) * g) % e,
    m = (X(y, h, e) * y) % e,
    _ = (X(m, a, e) * g) % e,
    b = (X(_, r, e) * d) % e,
    w = (X(b, o, e) * p) % e,
    E = (X(w, n, e) * c) % e,
    v = X(E, Et, e);
  if (!Ct.eql(Ct.sqr(v), t)) throw Error("Cannot find square root");
  return v;
}
const Ct = (function (t, e, r = !1, n = {}) {
    if (t <= z) throw Error("Expected Field ORDER > 0, got " + t);
    const { nBitLength: i, nByteLength: s } = nt(t, e);
    if (s > 2048) throw Error("Field lengths over 2048 bytes are not supported");
    const o = et(t),
      a = Object.freeze({
        ORDER: t,
        BITS: i,
        BYTES: s,
        MASK: D(i),
        ZERO: z,
        ONE: W,
        create(e) {
          return J(e, t);
        },
        isValid(e) {
          if ("bigint" != typeof e) throw Error("Invalid field element: expected bigint, got " + typeof e);
          return z <= e && e < t;
        },
        is0(t) {
          return t === z;
        },
        isOdd(t) {
          return (t & W) === W;
        },
        neg(e) {
          return J(-e, t);
        },
        eql(t, e) {
          return t === e;
        },
        sqr(e) {
          return J(e * e, t);
        },
        add(e, r) {
          return J(e + r, t);
        },
        sub(e, r) {
          return J(e - r, t);
        },
        mul(e, r) {
          return J(e * r, t);
        },
        pow(t, e) {
          return (function (t, e, r) {
            if (r < z) throw Error("Expected power > 0");
            if (r === z) return t.ONE;
            if (r === W) return e;
            let n = t.ONE,
              i = e;
            for (; r > z; ) r & W && (n = t.mul(n, i)), (i = t.sqr(i)), (r >>= W);
            return n;
          })(a, t, e);
        },
        div(e, r) {
          return J(e * tt(r, t), t);
        },
        sqrN(t) {
          return t * t;
        },
        addN(t, e) {
          return t + e;
        },
        subN(t, e) {
          return t - e;
        },
        mulN(t, e) {
          return t * e;
        },
        inv(e) {
          return tt(e, t);
        },
        sqrt: n.sqrt || ((t) => o(a, t)),
        invertBatch(t) {
          return (function (t, e) {
            const r = Array(e.length),
              n = e.reduce((e, n, i) => (t.is0(n) ? e : ((r[i] = e), t.mul(e, n))), t.ONE),
              i = t.inv(n);
            return e.reduceRight((e, n, i) => (t.is0(n) ? e : ((r[i] = t.mul(e, r[i])), t.mul(e, n))), i), r;
          })(a, t);
        },
        cmov(t, e, r) {
          return r ? e : t;
        },
        toBytes(t) {
          return r ? L(t, s) : O(t, s);
        },
        fromBytes(t) {
          if (t.length !== s) throw Error(`Fp.fromBytes: expected ${s}, got ${t.length}`);
          return r ? N(t) : B(t);
        },
      });
    return Object.freeze(a);
  })(_t, void 0, void 0, { sqrt: St }),
  xt = (function (t, e) {
    const r = (e) => yt({ ...t, ...mt(e) });
    return Object.freeze({ ...r(e), create: r });
  })(
    {
      a: BigInt(0),
      b: BigInt(7),
      Fp: Ct,
      n: bt,
      Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
      Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
      h: BigInt(1),
      lowS: !0,
      endo: {
        beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
        splitScalar(t) {
          const e = bt,
            r = BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
            n = -wt * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),
            i = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),
            s = r,
            o = BigInt("0x100000000000000000000000000000000"),
            a = vt(s * t, e),
            h = vt(-n * t, e);
          let c = J(t - a * r - h * i, e),
            d = J(-a * n - h * s, e);
          const u = c > o,
            l = d > o;
          if ((u && (c = e - c), l && (d = e - d), c > o || d > o)) throw Error("splitScalar: Endomorphism failed, k=" + t);
          return { k1neg: u, k1: c, k2neg: l, k2: d };
        },
      },
    },
    y
  ),
  At = BigInt(0),
  Tt = (t) => "bigint" == typeof t && At < t && t < _t,
  Rt = (t) => "bigint" == typeof t && At < t && t < bt,
  kt = {};
function It(t, ...e) {
  let r = kt[t];
  if (void 0 === r) {
    const e = y(Uint8Array.from(t, (t) => t.charCodeAt(0)));
    (r = F(e, e)), (kt[t] = r);
  }
  return y(F(r, ...e));
}
const Bt = (t) => t.toRawBytes(!0).slice(1),
  Nt = (t) => O(t, 32),
  Ot = (t) => J(t, _t),
  Lt = (t) => J(t, bt),
  Pt = xt.ProjectivePoint,
  Ft = (t, e, r) => Pt.BASE.multiplyAndAddUnsafe(t, e, r);
function Dt(t) {
  let e = xt.utils.normPrivateKeyToScalar(t),
    r = Pt.fromPrivateKey(e);
  return { scalar: r.hasEvenY() ? e : Lt(-e), bytes: Bt(r) };
}
function Ut(t) {
  if (!Tt(t)) throw Error("bad x: need 0 < x < p");
  const e = Ot(t * t);
  let r = St(Ot(e * t + BigInt(7)));
  r % Et !== At && (r = Ot(-r));
  const n = new Pt(t, r, wt);
  return n.assertValidity(), n;
}
function qt(...t) {
  return Lt(B(It("BIP0340/challenge", ...t)));
}
function Mt(t) {
  return Dt(t).bytes;
}
function Ht(t, e, r = c(32)) {
  const n = P("message", t),
    { bytes: i, scalar: s } = Dt(e),
    o = P("auxRand", r, 32),
    a = Nt(s ^ B(It("BIP0340/aux", o))),
    h = It("BIP0340/nonce", a, i, n),
    d = Lt(B(h));
  if (d === At) throw Error("sign failed: k is zero");
  const { bytes: u, scalar: l } = Dt(d),
    f = qt(u, i, n),
    p = new Uint8Array(64);
  if ((p.set(u, 0), p.set(Nt(Lt(l + f * s)), 32), !jt(p, n, i))) throw Error("sign: Invalid signature produced");
  return p;
}
function jt(t, e, r) {
  const n = P("signature", t, 64),
    i = P("message", e),
    s = P("publicKey", r, 32);
  try {
    const t = Ut(B(s)),
      e = B(n.subarray(0, 32));
    if (!Tt(e)) return !1;
    const r = B(n.subarray(32, 64));
    if (!Rt(r)) return !1;
    const o = qt(Nt(e), Bt(t), i),
      a = Ft(t, r, Lt(-o));
    return !(!a || !a.hasEvenY() || a.toAffine().x !== e);
  } catch (t) {
    return !1;
  }
}
const $t = (() => ({ getPublicKey: Mt, sign: Ht, verify: jt, utils: { randomPrivateKey: xt.utils.randomPrivateKey, lift_x: Ut, pointToBytes: Bt, numberToBytesBE: O, bytesToNumberBE: B, taggedHash: It, mod: J } }))(),
  zt = "Trystero",
  Wt = (t, e) => Array(t).fill().map(e),
  Kt = "0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",
  Vt = (t) => Wt(t, () => Kt[Math.floor(62 * Math.random())]).join(""),
  Zt = Vt(20),
  Yt = Promise.all.bind(Promise),
  Gt = "undefined" != typeof window,
  { entries: Jt, fromEntries: Qt, keys: Xt } = Object,
  te = () => {},
  ee = (t) => Error(`${zt}: ${t}`),
  re = new TextEncoder(),
  ne = new TextDecoder(),
  ie = (t) => re.encode(t),
  se = (t) => ne.decode(t),
  oe = (t) => t.reduce((t, e) => t + e.toString(16).padStart(2, "0"), ""),
  ae = (...t) => t.join("@"),
  he = JSON.stringify,
  ce = JSON.parse,
  de = {},
  ue = "AES-GCM",
  le = {},
  fe = async (t) => {
    if (le[t]) return le[t];
    const e = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-1", ie(t))))
      .map((t) => t.toString(36))
      .join("");
    return (le[t] = e), e;
  },
  pe = async (t, e) => {
    const r = crypto.getRandomValues(new Uint8Array(16));
    return r.join(",") + "$" + ((n = await crypto.subtle.encrypt({ name: ue, iv: r }, await t, ie(e))), btoa(String.fromCharCode.apply(null, new Uint8Array(n))));
    var n;
  },
  ge = async (t, e) => {
    const [r, n] = e.split("$");
    return se(
      await crypto.subtle.decrypt(
        { name: ue, iv: new Uint8Array(r.split(",")) },
        await t,
        ((t) => {
          const e = atob(t);
          return new Uint8Array(e.length).map((t, r) => e.charCodeAt(r)).buffer;
        })(n)
      )
    );
  };
function ye(t) {
  return t && t.__esModule && {}.hasOwnProperty.call(t, "default") ? t.default : t;
}
var me,
  _e,
  be = { exports: {} };
function we() {
  if (_e) return me;
  _e = 1;
  var t = 1e3,
    e = 60 * t,
    r = 60 * e,
    n = 24 * r,
    i = 7 * n,
    s = 365.25 * n;
  function o(t, e, r, n) {
    var i = e >= 1.5 * r;
    return Math.round(t / r) + " " + n + (i ? "s" : "");
  }
  return (me = (a, h) => {
    h = h || {};
    var c = typeof a;
    if ("string" === c && a.length > 0)
      return (function (o) {
        if ((o += "").length > 100) return;
        var a = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(o);
        if (!a) return;
        var h = parseFloat(a[1]);
        switch ((a[2] || "ms").toLowerCase()) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * s;
          case "weeks":
          case "week":
          case "w":
            return h * i;
          case "days":
          case "day":
          case "d":
            return h * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * t;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      })(a);
    if ("number" === c && isFinite(a))
      return h.long
        ? (function (i) {
            var s = Math.abs(i);
            if (s >= n) return o(i, s, n, "day");
            if (s >= r) return o(i, s, r, "hour");
            if (s >= e) return o(i, s, e, "minute");
            if (s >= t) return o(i, s, t, "second");
            return i + " ms";
          })(a)
        : (function (i) {
            var s = Math.abs(i);
            if (s >= n) return Math.round(i / n) + "d";
            if (s >= r) return Math.round(i / r) + "h";
            if (s >= e) return Math.round(i / e) + "m";
            if (s >= t) return Math.round(i / t) + "s";
            return i + "ms";
          })(a);
    throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
  });
}
var Ee = function (t) {
  function e(t) {
    let n,
      i,
      s,
      o = null;
    function a(...t) {
      if (!a.enabled) return;
      const r = a,
        i = Number(new Date()),
        s = i - (n || i);
      (r.diff = s), (r.prev = n), (r.curr = i), (n = i), (t[0] = e.coerce(t[0])), "string" != typeof t[0] && t.unshift("%O");
      let o = 0;
      (t[0] = t[0].replace(/%([a-zA-Z%])/g, (n, i) => {
        if ("%%" === n) return "%";
        o++;
        const s = e.formatters[i];
        if ("function" == typeof s) {
          const e = t[o];
          (n = s.call(r, e)), t.splice(o, 1), o--;
        }
        return n;
      })),
        e.formatArgs.call(r, t);
      (r.log || e.log).apply(r, t);
    }
    return (
      (a.namespace = t),
      (a.useColors = e.useColors()),
      (a.color = e.selectColor(t)),
      (a.extend = r),
      (a.destroy = e.destroy),
      Object.defineProperty(a, "enabled", {
        enumerable: !0,
        configurable: !1,
        get() {
          return null !== o ? o : (i !== e.namespaces && ((i = e.namespaces), (s = e.enabled(t))), s);
        },
        set(t) {
          o = t;
        },
      }),
      "function" == typeof e.init && e.init(a),
      a
    );
  }
  function r(t, r) {
    const n = e(this.namespace + (void 0 === r ? ":" : r) + t);
    return (n.log = this.log), n;
  }
  function n(t) {
    return t
      .toString()
      .substring(2, t.toString().length - 2)
      .replace(/\.\*\?$/, "*");
  }
  return (
    (e.debug = e),
    (e.default = e),
    (e.coerce = function (t) {
      if (t instanceof Error) return t.stack || t.message;
      return t;
    }),
    (e.disable = function () {
      const t = [...e.names.map(n), ...e.skips.map(n).map((t) => "-" + t)].join(",");
      return e.enable(""), t;
    }),
    (e.enable = function (t) {
      let r;
      e.save(t), (e.namespaces = t), (e.names = []), (e.skips = []);
      const n = ("string" == typeof t ? t : "").split(/[\s,]+/),
        i = n.length;
      for (r = 0; r < i; r++) n[r] && ("-" === (t = n[r].replace(/\*/g, ".*?"))[0] ? e.skips.push(RegExp("^" + t.slice(1) + "$")) : e.names.push(RegExp("^" + t + "$")));
    }),
    (e.enabled = function (t) {
      if ("*" === t[t.length - 1]) return !0;
      let r, n;
      for (r = 0, n = e.skips.length; r < n; r++) if (e.skips[r].test(t)) return !1;
      for (r = 0, n = e.names.length; r < n; r++) if (e.names[r].test(t)) return !0;
      return !1;
    }),
    (e.humanize = we()),
    (e.destroy = function () {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }),
    Object.keys(t).forEach((r) => {
      e[r] = t[r];
    }),
    (e.names = []),
    (e.skips = []),
    (e.formatters = {}),
    (e.selectColor = function (t) {
      let r = 0;
      for (let e = 0; e < t.length; e++) (r = (r << 5) - r + t.charCodeAt(e)), (r |= 0);
      return e.colors[Math.abs(r) % e.colors.length];
    }),
    e.enable(e.load()),
    e
  );
};
!(function (t, e) {
  (e.formatArgs = function (e) {
    if (((e[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + e[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff)), !this.useColors)) return;
    const r = "color: " + this.color;
    e.splice(1, 0, r, "color: inherit");
    let n = 0,
      i = 0;
    e[0].replace(/%[a-zA-Z%]/g, (t) => {
      "%%" !== t && (n++, "%c" === t && (i = n));
    }),
      e.splice(i, 0, r);
  }),
    (e.save = function (t) {
      try {
        t ? e.storage.setItem("debug", t) : e.storage.removeItem("debug");
      } catch (t) {}
    }),
    (e.load = function () {
      let t;
      try {
        t = e.storage.getItem("debug");
      } catch (t) {}
      !t && "undefined" != typeof process && "env" in process && (t = process.env.DEBUG);
      return t;
    }),
    (e.useColors = function () {
      if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0;
      if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
      let t;
      return (
        ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
        ("undefined" != typeof window && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
        ("undefined" != typeof navigator && navigator.userAgent && (t = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(t[1], 10) >= 31) ||
        ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
      );
    }),
    (e.storage = (function () {
      try {
        return localStorage;
      } catch (t) {}
    })()),
    (e.destroy = (() => {
      let t = !1;
      return () => {
        t || ((t = !0), console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })()),
    (e.colors = [
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
    (e.log = console.debug || console.log || (() => {})),
    (t.exports = Ee(e));
  const { formatters: r } = t.exports;
  r.j = (t) => {
    try {
      return JSON.stringify(t);
    } catch (t) {
      return "[UnexpectedJSONParseError]: " + t.message;
    }
  };
})(be, be.exports);
var ve = ye(be.exports);
const Se = "undefined" != typeof window ? window : self,
  Ce = Se.RTCPeerConnection || Se.mozRTCPeerConnection || Se.webkitRTCPeerConnection,
  xe = Se.RTCSessionDescription || Se.mozRTCSessionDescription || Se.webkitRTCSessionDescription,
  Ae = Se.RTCIceCandidate || Se.mozRTCIceCandidate || Se.webkitRTCIceCandidate;
var Te,
  Re = { exports: {} },
  ke = "object" == typeof Reflect ? Reflect : null,
  Ie =
    ke && "function" == typeof ke.apply
      ? ke.apply
      : function (t, e, r) {
          return function () {}.apply.call(t, e, r);
        };
Te =
  ke && "function" == typeof ke.ownKeys
    ? ke.ownKeys
    : Object.getOwnPropertySymbols
    ? function (t) {
        return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
      }
    : function (t) {
        return Object.getOwnPropertyNames(t);
      };
var Be =
  Number.isNaN ||
  function (t) {
    return t != t;
  };
function Ne() {
  Ne.init.call(this);
}
(Re.exports = Ne),
  (Re.exports.once = function (t, e) {
    return new Promise((r, n) => {
      function i(r) {
        t.removeListener(e, s), n(r);
      }
      function s() {
        "function" == typeof t.removeListener && t.removeListener("error", i), r([].slice.call(arguments));
      }
      je(t, e, s, { once: !0 }),
        "error" !== e &&
          (function (t, e, r) {
            "function" == typeof t.on && je(t, "error", e, r);
          })(t, i, { once: !0 });
    });
  }),
  (Ne.EventEmitter = Ne),
  (Ne.prototype._events = void 0),
  (Ne.prototype._eventsCount = 0),
  (Ne.prototype._maxListeners = void 0);
var Oe = 10;
function Le(t) {
  if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
}
function Pe(t) {
  return void 0 === t._maxListeners ? Ne.defaultMaxListeners : t._maxListeners;
}
function Fe(t, e, r, n) {
  var i, s, o, a;
  if ((Le(r), void 0 === (s = t._events) ? ((s = t._events = Object.create(null)), (t._eventsCount = 0)) : (void 0 !== s.newListener && (t.emit("newListener", e, r.listener ? r.listener : r), (s = t._events)), (o = s[e])), void 0 === o))
    (o = s[e] = r), ++t._eventsCount;
  else if (("function" == typeof o ? (o = s[e] = n ? [r, o] : [o, r]) : n ? o.unshift(r) : o.push(r), (i = Pe(t)) > 0 && o.length > i && !o.warned)) {
    o.warned = !0;
    var h = Error("Possible EventEmitter memory leak detected. " + o.length + " " + e + " listeners added. Use emitter.setMaxListeners() to increase limit");
    (h.name = "MaxListenersExceededWarning"), (h.emitter = t), (h.type = e), (h.count = o.length), (a = h), console && console.warn && console.warn(a);
  }
  return t;
}
function De() {
  if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), (this.fired = !0), 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Ue(t, e, r) {
  var n = { fired: !1, wrapFn: void 0, target: t, type: e, listener: r },
    i = De.bind(n);
  return (i.listener = r), (n.wrapFn = i), i;
}
function qe(t, e, r) {
  var n = t._events;
  if (void 0 === n) return [];
  var i = n[e];
  return void 0 === i
    ? []
    : "function" == typeof i
    ? r
      ? [i.listener || i]
      : [i]
    : r
    ? (function (t) {
        for (var e = Array(t.length), r = 0; r < e.length; ++r) e[r] = t[r].listener || t[r];
        return e;
      })(i)
    : He(i, i.length);
}
function Me(t) {
  var e = this._events;
  if (void 0 !== e) {
    var r = e[t];
    if ("function" == typeof r) return 1;
    if (void 0 !== r) return r.length;
  }
  return 0;
}
function He(t, e) {
  for (var r = Array(e), n = 0; n < e; ++n) r[n] = t[n];
  return r;
}
function je(t, e, r, n) {
  if ("function" == typeof t.on) n.once ? t.once(e, r) : t.on(e, r);
  else {
    if ("function" != typeof t.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t);
    t.addEventListener(e, function i(s) {
      n.once && t.removeEventListener(e, i), r(s);
    });
  }
}
Object.defineProperty(Ne, "defaultMaxListeners", {
  enumerable: !0,
  get() {
    return Oe;
  },
  set(t) {
    if ("number" != typeof t || t < 0 || Be(t)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
    Oe = t;
  },
}),
  (Ne.init = function () {
    (void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events) || ((this._events = Object.create(null)), (this._eventsCount = 0)), (this._maxListeners = this._maxListeners || void 0);
  }),
  (Ne.prototype.setMaxListeners = function (t) {
    if ("number" != typeof t || t < 0 || Be(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
    return (this._maxListeners = t), this;
  }),
  (Ne.prototype.getMaxListeners = function () {
    return Pe(this);
  }),
  (Ne.prototype.emit = function (t) {
    for (var e = [], r = 1; r < arguments.length; r++) e.push(arguments[r]);
    var n = "error" === t,
      i = this._events;
    if (void 0 !== i) n = n && void 0 === i.error;
    else if (!n) return !1;
    if (n) {
      var s;
      if ((e.length > 0 && (s = e[0]), s instanceof Error)) throw s;
      var o = Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
      throw ((o.context = s), o);
    }
    var a = i[t];
    if (void 0 === a) return !1;
    if ("function" == typeof a) Ie(a, this, e);
    else {
      var h = a.length,
        c = He(a, h);
      for (r = 0; r < h; ++r) Ie(c[r], this, e);
    }
    return !0;
  }),
  (Ne.prototype.addListener = function (t, e) {
    return Fe(this, t, e, !1);
  }),
  (Ne.prototype.on = Ne.prototype.addListener),
  (Ne.prototype.prependListener = function (t, e) {
    return Fe(this, t, e, !0);
  }),
  (Ne.prototype.once = function (t, e) {
    return Le(e), this.on(t, Ue(this, t, e)), this;
  }),
  (Ne.prototype.prependOnceListener = function (t, e) {
    return Le(e), this.prependListener(t, Ue(this, t, e)), this;
  }),
  (Ne.prototype.removeListener = function (t, e) {
    var r, n, i, s, o;
    if ((Le(e), void 0 === (n = this._events))) return this;
    if (void 0 === (r = n[t])) return this;
    if (r === e || r.listener === e) 0 == --this._eventsCount ? (this._events = Object.create(null)) : (delete n[t], n.removeListener && this.emit("removeListener", t, r.listener || e));
    else if ("function" != typeof r) {
      for (i = -1, s = r.length - 1; s >= 0; s--)
        if (r[s] === e || r[s].listener === e) {
          (o = r[s].listener), (i = s);
          break;
        }
      if (i < 0) return this;
      0 === i
        ? r.shift()
        : (function (t, e) {
            for (; e + 1 < t.length; e++) t[e] = t[e + 1];
            t.pop();
          })(r, i),
        1 === r.length && (n[t] = r[0]),
        void 0 !== n.removeListener && this.emit("removeListener", t, o || e);
    }
    return this;
  }),
  (Ne.prototype.off = Ne.prototype.removeListener),
  (Ne.prototype.removeAllListeners = function (t) {
    var e, r, n;
    if (void 0 === (r = this._events)) return this;
    if (void 0 === r.removeListener) return 0 === arguments.length ? ((this._events = Object.create(null)), (this._eventsCount = 0)) : void 0 !== r[t] && (0 == --this._eventsCount ? (this._events = Object.create(null)) : delete r[t]), this;
    if (0 === arguments.length) {
      var i,
        s = Object.keys(r);
      for (n = 0; n < s.length; ++n) "removeListener" !== (i = s[n]) && this.removeAllListeners(i);
      return this.removeAllListeners("removeListener"), (this._events = Object.create(null)), (this._eventsCount = 0), this;
    }
    if ("function" == typeof (e = r[t])) this.removeListener(t, e);
    else if (void 0 !== e) for (n = e.length - 1; n >= 0; n--) this.removeListener(t, e[n]);
    return this;
  }),
  (Ne.prototype.listeners = function (t) {
    return qe(this, t, !0);
  }),
  (Ne.prototype.rawListeners = function (t) {
    return qe(this, t, !1);
  }),
  (Ne.listenerCount = (t, e) => ("function" == typeof t.listenerCount ? t.listenerCount(e) : Me.call(t, e))),
  (Ne.prototype.listenerCount = Me),
  (Ne.prototype.eventNames = function () {
    return this._eventsCount > 0 ? Te(this._events) : [];
  });
var $e = Re.exports,
  ze = "function" == typeof queueMicrotask ? queueMicrotask : (t) => Promise.resolve().then(t);
const We = class {
  constructor(t) {
    if (!(t > 0) || (t - 1) & t) throw Error("Max size for a FixedFIFO should be a power of two");
    (this.buffer = Array(t)), (this.mask = t - 1), (this.top = 0), (this.btm = 0), (this.next = null);
  }
  clear() {
    (this.top = this.btm = 0), (this.next = null), this.buffer.fill(void 0);
  }
  push(t) {
    return void 0 === this.buffer[this.top] && ((this.buffer[this.top] = t), (this.top = (this.top + 1) & this.mask), !0);
  }
  shift() {
    const t = this.buffer[this.btm];
    if (void 0 !== t) return (this.buffer[this.btm] = void 0), (this.btm = (this.btm + 1) & this.mask), t;
  }
  peek() {
    return this.buffer[this.btm];
  }
  isEmpty() {
    return void 0 === this.buffer[this.btm];
  }
};
var Ke = class {
  constructor(t) {
    this.decoder = new TextDecoder("utf16le" === t ? "utf16-le" : t);
  }
  decode(t) {
    return this.decoder.decode(t, { stream: !0 });
  }
  flush() {
    return this.decoder.decode(new Uint8Array(0));
  }
};
const Ve = Ke,
  Ze = Ke;
const { EventEmitter: Ye } = $e,
  Ge = Error("Stream was destroyed"),
  Je = ze,
  Qe = class {
    constructor(t) {
      (this.hwm = t || 16), (this.head = new We(this.hwm)), (this.tail = this.head), (this.length = 0);
    }
    clear() {
      (this.head = this.tail), this.head.clear(), (this.length = 0);
    }
    push(t) {
      if ((this.length++, !this.head.push(t))) {
        const e = this.head;
        (this.head = e.next = new We(2 * this.head.buffer.length)), this.head.push(t);
      }
    }
    shift() {
      0 !== this.length && this.length--;
      const t = this.tail.shift();
      if (void 0 === t && this.tail.next) {
        const t = this.tail.next;
        return (this.tail.next = null), (this.tail = t), this.tail.shift();
      }
      return t;
    }
    peek() {
      const t = this.tail.peek();
      return void 0 === t && this.tail.next ? this.tail.next.peek() : t;
    }
    isEmpty() {
      return 0 === this.length;
    }
  },
  Xe = class {
    constructor(t = "utf8") {
      switch (
        ((this.encoding = (function (t) {
          switch ((t = t.toLowerCase())) {
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
              return t;
            default:
              throw Error("Unknown encoding: " + t);
          }
        })(t)),
        this.encoding)
      ) {
        case "utf8":
          this.decoder = new Ze();
          break;
        case "utf16le":
        case "base64":
          throw Error("Unsupported encoding: " + this.encoding);
        default:
          this.decoder = new Ve(this.encoding);
      }
    }
    push(t) {
      return "string" == typeof t ? t : this.decoder.decode(t);
    }
    write(t) {
      return this.push(t);
    }
    end(t) {
      let e = "";
      return t && (e = this.push(t)), (e += this.decoder.flush()), e;
    }
  },
  tr = 536870911,
  er = 1 ^ tr,
  rr = 2 ^ tr,
  nr = 64,
  ir = 128,
  sr = 256,
  or = 1024,
  ar = 2048,
  hr = 4096,
  cr = 8192,
  dr = 16384,
  ur = 32768,
  lr = 131072,
  fr = 131328,
  pr = 16 ^ tr,
  gr = 768 ^ tr,
  yr = 536838143,
  mr = 32 ^ tr,
  _r = 536739839,
  br = 2 << 18,
  wr = 4 << 18,
  Er = 8 << 18,
  vr = 16 << 18,
  Sr = 32 << 18,
  Cr = 64 << 18,
  xr = 128 << 18,
  Ar = 512 << 18,
  Tr = 1024 << 18,
  Rr = 469499903,
  kr = 535822335,
  Ir = 503316479,
  Br = 268435455,
  Nr = 262160,
  Or = 536608751,
  Lr = 8404992,
  Pr = 14,
  Fr = 15,
  Dr = 8405006,
  Ur = 33587200,
  qr = 33587215,
  Mr = 2359296,
  Hr = 270794767,
  jr = Symbol.asyncIterator || Symbol();
class $r {
  constructor(t, { highWaterMark: e = 16384, map: r = null, mapWritable: n, byteLength: i, byteLengthWritable: s } = {}) {
    (this.stream = t),
      (this.queue = new Qe()),
      (this.highWaterMark = e),
      (this.buffered = 0),
      (this.error = null),
      (this.pipeline = null),
      (this.drains = null),
      (this.byteLength = s || i || hn),
      (this.map = n || r),
      (this.afterWrite = Yr.bind(this)),
      (this.afterUpdateNextTick = Qr.bind(this));
  }
  get ended() {
    return !!(this.stream._duplexState & Sr);
  }
  push(t) {
    return null !== this.map && (t = this.map(t)), (this.buffered += this.byteLength(t)), this.queue.push(t), this.buffered < this.highWaterMark ? ((this.stream._duplexState |= Er), !0) : ((this.stream._duplexState |= 6291456), !1);
  }
  shift() {
    const t = this.queue.shift();
    return (this.buffered -= this.byteLength(t)), 0 === this.buffered && (this.stream._duplexState &= 534773759), t;
  }
  end(t) {
    "function" == typeof t ? this.stream.once("finish", t) : null != t && this.push(t), (this.stream._duplexState = (this.stream._duplexState | Ar) & kr);
  }
  autoBatch(t, e) {
    const r = [],
      n = this.stream;
    for (r.push(t); (n._duplexState & Hr) === Mr; ) r.push(n._writableState.shift());
    if (n._duplexState & Fr) return e(null);
    n._writev(r, e);
  }
  update() {
    const t = this.stream;
    t._duplexState |= br;
    do {
      for (; (t._duplexState & Hr) === Er; ) {
        const e = this.shift();
        (t._duplexState |= 67371008), t._write(e, this.afterWrite);
      }
      1310720 & t._duplexState || this.updateNonPrimary();
    } while (!0 === this.continueUpdate());
    t._duplexState &= 536346623;
  }
  updateNonPrimary() {
    const t = this.stream;
    if ((144965647 & t._duplexState) === Ar) return (t._duplexState = (402653183 & t._duplexState) | 262144), void t._final(Vr.bind(this));
    4 != (t._duplexState & Pr) ? 1 == (t._duplexState & qr) && ((t._duplexState = (t._duplexState | Nr) & er), t._open(Xr.bind(this))) : t._duplexState & Ur || ((t._duplexState |= Nr), t._destroy(Zr.bind(this)));
  }
  continueUpdate() {
    return !!(this.stream._duplexState & xr) && ((this.stream._duplexState &= Ir), !0);
  }
  updateCallback() {
    (35127311 & this.stream._duplexState) === wr ? this.update() : this.updateNextTick();
  }
  updateNextTick() {
    this.stream._duplexState & xr || ((this.stream._duplexState |= xr), this.stream._duplexState & br || Je(this.afterUpdateNextTick));
  }
}
class zr {
  constructor(t, { highWaterMark: e = 16384, map: r = null, mapReadable: n, byteLength: i, byteLengthReadable: s } = {}) {
    (this.stream = t),
      (this.queue = new Qe()),
      (this.highWaterMark = 0 === e ? 1 : e),
      (this.buffered = 0),
      (this.readAhead = e > 0),
      (this.error = null),
      (this.pipeline = null),
      (this.byteLength = s || i || hn),
      (this.map = n || r),
      (this.pipeTo = null),
      (this.afterRead = Gr.bind(this)),
      (this.afterUpdateNextTick = Jr.bind(this));
  }
  get ended() {
    return !!(this.stream._duplexState & dr);
  }
  pipe(t, e) {
    if (null !== this.pipeTo) throw Error("Can only pipe to one destination");
    if (("function" != typeof e && (e = null), (this.stream._duplexState |= 512), (this.pipeTo = t), (this.pipeline = new Wr(this.stream, t, e)), e && this.stream.on("error", cn), an(t)))
      (t._writableState.pipeline = this.pipeline), e && t.on("error", cn), t.on("finish", this.pipeline.finished.bind(this.pipeline));
    else {
      const e = this.pipeline.done.bind(this.pipeline, t),
        r = this.pipeline.done.bind(this.pipeline, t, null);
      t.on("error", e), t.on("close", r), t.on("finish", this.pipeline.finished.bind(this.pipeline));
    }
    t.on("drain", Kr.bind(this)), this.stream.emit("piping", t), t.emit("pipe", this.stream);
  }
  push(t) {
    const e = this.stream;
    return null === t
      ? ((this.highWaterMark = 0), (e._duplexState = (536805311 & e._duplexState) | 1024), !1)
      : ((null !== this.map && null === (t = this.map(t))) || ((this.buffered += this.byteLength(t)), this.queue.push(t), (e._duplexState = (536805375 & e._duplexState) | 128)), this.buffered < this.highWaterMark);
  }
  shift() {
    const t = this.queue.shift();
    return (this.buffered -= this.byteLength(t)), 0 === this.buffered && (this.stream._duplexState &= 536862591), t;
  }
  unshift(t) {
    const e = [null !== this.map ? this.map(t) : t];
    for (; this.buffered > 0; ) e.push(this.shift());
    for (let t = 0; t < e.length - 1; t++) {
      const r = e[t];
      (this.buffered += this.byteLength(r)), this.queue.push(r);
    }
    this.push(e[e.length - 1]);
  }
  read() {
    const t = this.stream;
    if ((16527 & t._duplexState) === ir) {
      const e = this.shift();
      return null !== this.pipeTo && !1 === this.pipeTo.write(e) && (t._duplexState &= gr), t._duplexState & ar && t.emit("data", e), e;
    }
    return !1 === this.readAhead && ((t._duplexState |= lr), this.updateNextTick()), null;
  }
  drain() {
    const t = this.stream;
    for (; (16527 & t._duplexState) === ir && 768 & t._duplexState; ) {
      const e = this.shift();
      null !== this.pipeTo && !1 === this.pipeTo.write(e) && (t._duplexState &= gr), t._duplexState & ar && t.emit("data", e);
    }
  }
  update() {
    const t = this.stream;
    t._duplexState |= 32;
    do {
      for (this.drain(); this.buffered < this.highWaterMark && (214047 & t._duplexState) === lr; ) (t._duplexState |= 65552), t._read(this.afterRead), this.drain();
      4224 == (12431 & t._duplexState) && ((t._duplexState |= cr), t.emit("readable")), 80 & t._duplexState || this.updateNonPrimary();
    } while (!0 === this.continueUpdate());
    t._duplexState &= mr;
  }
  updateNonPrimary() {
    const t = this.stream;
    (1167 & t._duplexState) === or && ((t._duplexState = (536869887 & t._duplexState) | 16384), t.emit("end"), (t._duplexState & Dr) === Lr && (t._duplexState |= 4), null !== this.pipeTo && this.pipeTo.end()),
      4 != (t._duplexState & Pr) ? 1 == (t._duplexState & qr) && ((t._duplexState = (t._duplexState | Nr) & er), t._open(Xr.bind(this))) : t._duplexState & Ur || ((t._duplexState |= Nr), t._destroy(Zr.bind(this)));
  }
  continueUpdate() {
    return !!(this.stream._duplexState & ur) && ((this.stream._duplexState &= yr), !0);
  }
  updateCallback() {
    (32879 & this.stream._duplexState) === nr ? this.update() : this.updateNextTick();
  }
  updateNextTick() {
    this.stream._duplexState & ur || ((this.stream._duplexState |= ur), 32 & this.stream._duplexState || Je(this.afterUpdateNextTick));
  }
}
class Wr {
  constructor(t, e, r) {
    (this.from = t), (this.to = e), (this.afterPipe = r), (this.error = null), (this.pipeToFinished = !1);
  }
  finished() {
    this.pipeToFinished = !0;
  }
  done(t, e) {
    e && (this.error = e),
      t !== this.to || ((this.to = null), null === this.from)
        ? t !== this.from || ((this.from = null), null === this.to)
          ? (null !== this.afterPipe && this.afterPipe(this.error), (this.to = this.from = this.afterPipe = null))
          : t._duplexState & dr || this.to.destroy(this.error || Error("Readable stream closed before ending"))
        : (this.from._duplexState & dr && this.pipeToFinished) || this.from.destroy(this.error || Error("Writable stream closed prematurely"));
  }
}
function Kr() {
  (this.stream._duplexState |= 512), this.updateCallback();
}
function Vr(t) {
  const e = this.stream;
  t && e.destroy(t), e._duplexState & Pr || ((e._duplexState |= Sr), e.emit("finish")), (e._duplexState & Dr) === Lr && (e._duplexState |= 4), (e._duplexState &= Rr), e._duplexState & br ? this.updateNextTick() : this.update();
}
function Zr(t) {
  const e = this.stream;
  t || this.error === Ge || (t = this.error), t && e.emit("error", t), (e._duplexState |= 8), e.emit("close");
  const r = e._readableState,
    n = e._writableState;
  if ((null !== r && null !== r.pipeline && r.pipeline.done(e, t), null !== n)) {
    for (; null !== n.drains && n.drains.length > 0; ) n.drains.shift().resolve(!1);
    null !== n.pipeline && n.pipeline.done(e, t);
  }
}
function Yr(t) {
  const e = this.stream;
  t && e.destroy(t),
    (e._duplexState &= Rr),
    null !== this.drains &&
      (function (t) {
        for (let e = 0; e < t.length; e++) 0 == --t[e].writes && (t.shift().resolve(!0), e--);
      })(this.drains),
    (6553615 & e._duplexState) === vr && ((e._duplexState &= 532676607), (e._duplexState & Cr) === Cr && e.emit("drain")),
    this.updateCallback();
}
function Gr(t) {
  t && this.stream.destroy(t), (this.stream._duplexState &= pr), !1 !== this.readAhead || this.stream._duplexState & sr || (this.stream._duplexState &= _r), this.updateCallback();
}
function Jr() {
  32 & this.stream._duplexState || ((this.stream._duplexState &= yr), this.update());
}
function Qr() {
  this.stream._duplexState & br || ((this.stream._duplexState &= Ir), this.update());
}
function Xr(t) {
  const e = this.stream;
  t && e.destroy(t),
    4 & e._duplexState || (17423 & e._duplexState || (e._duplexState |= nr), 142606351 & e._duplexState || (e._duplexState |= wr), e.emit("open")),
    (e._duplexState &= Or),
    null !== e._writableState && e._writableState.updateCallback(),
    null !== e._readableState && e._readableState.updateCallback();
}
function tn(t) {
  null !== this._readableState && ("data" === t && ((this._duplexState |= 133376), this._readableState.updateNextTick()), "readable" === t && ((this._duplexState |= hr), this._readableState.updateNextTick())),
    null !== this._writableState && "drain" === t && ((this._duplexState |= Cr), this._writableState.updateNextTick());
}
class en extends Ye {
  constructor(t) {
    super(),
      (this._duplexState = 0),
      (this._readableState = null),
      (this._writableState = null),
      t && (t.open && (this._open = t.open), t.destroy && (this._destroy = t.destroy), t.predestroy && (this._predestroy = t.predestroy), t.signal && t.signal.addEventListener("abort", dn.bind(this))),
      this.on("newListener", tn);
  }
  _open(t) {
    t(null);
  }
  _destroy(t) {
    t(null);
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
    return !!(this._duplexState & Pr);
  }
  destroy(t) {
    this._duplexState & Pr ||
      (t || (t = Ge),
      (this._duplexState = (535822271 & this._duplexState) | 4),
      null !== this._readableState && ((this._readableState.highWaterMark = 0), (this._readableState.error = t)),
      null !== this._writableState && ((this._writableState.highWaterMark = 0), (this._writableState.error = t)),
      (this._duplexState |= 2),
      this._predestroy(),
      (this._duplexState &= rr),
      null !== this._readableState && this._readableState.updateNextTick(),
      null !== this._writableState && this._writableState.updateNextTick());
  }
}
class rn extends en {
  constructor(t) {
    super(t),
      (this._duplexState |= 8519681),
      (this._readableState = new zr(this, t)),
      t && (!1 === this._readableState.readAhead && (this._duplexState &= _r), t.read && (this._read = t.read), t.eagerOpen && this._readableState.updateNextTick(), t.encoding && this.setEncoding(t.encoding));
  }
  setEncoding(t) {
    const e = new Xe(t),
      r = this._readableState.map || sn;
    return (
      (this._readableState.map = function (t) {
        const n = e.push(t);
        return "" === n ? null : r(n);
      }),
      this
    );
  }
  _read(t) {
    t(null);
  }
  pipe(t, e) {
    return this._readableState.updateNextTick(), this._readableState.pipe(t, e), t;
  }
  read() {
    return this._readableState.updateNextTick(), this._readableState.read();
  }
  push(t) {
    return this._readableState.updateNextTick(), this._readableState.push(t);
  }
  unshift(t) {
    return this._readableState.updateNextTick(), this._readableState.unshift(t);
  }
  resume() {
    return (this._duplexState |= fr), this._readableState.updateNextTick(), this;
  }
  pause() {
    return (this._duplexState &= !1 === this._readableState.readAhead ? 536739583 : 536870655), this;
  }
  static _fromAsyncIterator(t, e) {
    let r;
    const n = new rn({
      ...e,
      read(e) {
        t.next().then(i).then(e.bind(null, null)).catch(e);
      },
      predestroy() {
        r = t.return();
      },
      destroy(t) {
        if (!r) return t(null);
        r.then(t.bind(null, null)).catch(t);
      },
    });
    return n;
    function i(t) {
      t.done ? n.push(null) : n.push(t.value);
    }
  }
  static from(t, e) {
    if (an((r = t)) && r.readable) return t;
    var r;
    if (t[jr]) return this._fromAsyncIterator(t[jr](), e);
    Array.isArray(t) || (t = void 0 === t ? [] : [t]);
    let n = 0;
    return new rn({
      ...e,
      read(e) {
        this.push(n === t.length ? null : t[n++]), e(null);
      },
    });
  }
  static isBackpressured(t) {
    return !!(17422 & t._duplexState) || t._readableState.buffered >= t._readableState.highWaterMark;
  }
  static isPaused(t) {
    return !(t._duplexState & sr);
  }
  [jr]() {
    const t = this;
    let e = null,
      r = null,
      n = null;
    return (
      this.on("error", (t) => {
        e = t;
      }),
      this.on("readable", function () {
        null !== r && i(t.read());
      }),
      this.on("close", function () {
        null !== r && i(null);
      }),
      {
        [jr]() {
          return this;
        },
        next: () =>
          new Promise((e, s) => {
            (r = e), (n = s);
            const o = t.read();
            null !== o ? i(o) : 8 & t._duplexState && i(null);
          }),
        return: () => s(null),
        throw: (t) => s(t),
      }
    );
    function i(i) {
      null !== n && (e ? n(e) : null !== i || t._duplexState & dr ? r({ value: i, done: null === i }) : n(Ge), (n = r = null));
    }
    function s(e) {
      return (
        t.destroy(e),
        new Promise((r, n) => {
          if (8 & t._duplexState) return r({ value: void 0, done: !0 });
          t.once("close", () => {
            e ? n(e) : r({ value: void 0, done: !0 });
          });
        })
      );
    }
  }
}
class nn extends rn {
  constructor(t) {
    super(t), (this._duplexState = 1 | (this._duplexState & lr)), (this._writableState = new $r(this, t)), t && (t.writev && (this._writev = t.writev), t.write && (this._write = t.write), t.final && (this._final = t.final));
  }
  cork() {
    this._duplexState |= Tr;
  }
  uncork() {
    (this._duplexState &= Br), this._writableState.updateNextTick();
  }
  _writev(t, e) {
    e(null);
  }
  _write(t, e) {
    this._writableState.autoBatch(t, e);
  }
  _final(t) {
    t(null);
  }
  write(t) {
    return this._writableState.updateNextTick(), this._writableState.push(t);
  }
  end(t) {
    return this._writableState.updateNextTick(), this._writableState.end(t), this;
  }
}
function sn(t) {
  return t;
}
function on(t) {
  return !!t._readableState || !!t._writableState;
}
function an(t) {
  return "number" == typeof t._duplexState && on(t);
}
function hn(t) {
  return (function (t) {
    return "object" == typeof t && null !== t && "number" == typeof t.byteLength;
  })(t)
    ? t.byteLength
    : 1024;
}
function cn() {}
function dn() {
  this.destroy(Error("Stream aborted."));
}
var un = nn;
function ln(t, e) {
  for (const r in e) Object.defineProperty(t, r, { value: e[r], enumerable: !0, configurable: !0 });
  return t;
}
var fn = ye(function (t, e, r) {
  if (!t || "string" == typeof t) throw new TypeError("Please pass an Error to err-code");
  r || (r = {}), "object" == typeof e && ((r = e), (e = "")), e && (r.code = e);
  try {
    return ln(t, r);
  } catch (e) {
    (r.message = t.message), (r.stack = t.stack);
    const n = () => {};
    n.prototype = Object.create(Object.getPrototypeOf(t));
    return ln(new n(), r);
  }
});
const pn = "0123456789abcdef",
  gn = [];
for (let t = 0; t < 256; t++) gn[t] = pn[(t >> 4) & 15] + pn[15 & t];
const yn = (t) => {
  const e = t.length;
  let r = "",
    n = 0;
  for (; n < e; ) r += gn[t[n++]];
  return r;
};
for (var mn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", _n = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), bn = 0; bn < 64; bn++) _n[mn.charCodeAt(bn)] = bn;
new TextDecoder();
const wn = new TextEncoder(),
  En = "undefined" != typeof window ? window : self,
  vn = En.crypto || En.msCrypto || {};
vn.subtle || vn.webkitSubtle;
const Sn = (t) => {
    const e = new Uint8Array(t);
    return vn.getRandomValues(e);
  },
  Cn = ve("simple-peer"),
  xn = 65536;
function An(t) {
  return t.replace(/a=ice-options:trickle\s\n/g, "");
}
let Tn = class t extends un {
  _pc;
  constructor(e) {
    if (
      (super((e = Object.assign({ allowHalfOpen: !1 }, e))),
      (this.__objectMode = !!e.objectMode),
      (this._id = yn(Sn(4)).slice(0, 7)),
      this._debug("new peer %o", e),
      (this.channelName = e.initiator ? e.channelName || yn(Sn(20)) : null),
      (this.initiator = e.initiator || !1),
      (this.channelConfig = e.channelConfig || t.channelConfig),
      (this.channelNegotiated = this.channelConfig.negotiated),
      (this.config = window.globalConfigFile),
      (this.offerOptions = e.offerOptions || {}),
      (this.answerOptions = e.answerOptions || {}),
      (this.sdpTransform = e.sdpTransform || ((t) => t)),
      (this.trickle = void 0 === e.trickle || e.trickle),
      (this.allowHalfTrickle = void 0 !== e.allowHalfTrickle && e.allowHalfTrickle),
      (this.iceCompleteTimeout = e.iceCompleteTimeout || 5e3),
      (this._destroying = !1),
      (this._connected = !1),
      (this.remoteAddress = void 0),
      (this.remoteFamily = void 0),
      (this.remotePort = void 0),
      (this.localAddress = void 0),
      (this.localFamily = void 0),
      (this.localPort = void 0),
      !Ce)
    )
      throw "undefined" == typeof window ? fn(Error("No WebRTC support: Specify `opts.wrtc` option in this environment"), "ERR_WEBRTC_SUPPORT") : fn(Error("No WebRTC support: Not a supported browser"), "ERR_WEBRTC_SUPPORT");
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
      this._pc = new Ce(this.config);
      window.myGlobalPeerConnection = this._pc;
    } catch (t) {
      return void this.__destroy(fn(t, "ERR_PC_CONSTRUCTOR"));
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
      (this._pc.onicecandidate = (t) => {
        this._onIceCandidate(t);
      }),
      "object" == typeof this._pc.peerIdentity &&
        this._pc.peerIdentity.catch((t) => {
          this.__destroy(fn(t, "ERR_PC_PEER_IDENTITY"));
        }),
      this.initiator || this.channelNegotiated
        ? this._setupData({ channel: this._pc.createDataChannel(this.channelName, this.channelConfig) })
        : (this._pc.ondatachannel = (t) => {
            this._setupData(t);
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
  signal(t) {
    if (!this._destroying) {
      if (this.destroyed) throw fn(Error("cannot signal after peer is destroyed"), "ERR_DESTROYED");
      if ("string" == typeof t)
        try {
          t = JSON.parse(t);
        } catch (e) {
          t = {};
        }
      this._debug("signal()"),
        t.renegotiate && this.initiator && (this._debug("got request to renegotiate"), this._needsNegotiation()),
        t.transceiverRequest && this.initiator && (this._debug("got request for transceiver"), this.addTransceiver(t.transceiverRequest.kind, t.transceiverRequest.init)),
        t.candidate && (this._pc.remoteDescription && this._pc.remoteDescription.type ? this._addIceCandidate(t.candidate) : this._pendingCandidates.push(t.candidate)),
        t.sdp &&
          this._pc
            .setRemoteDescription(new xe(t))
            .then(() => {
              this.destroyed ||
                (this._pendingCandidates.forEach((t) => {
                  this._addIceCandidate(t);
                }),
                (this._pendingCandidates = []),
                "offer" === this._pc.remoteDescription.type && this._createAnswer());
            })
            .catch((t) => {
              this.__destroy(fn(t, "ERR_SET_REMOTE_DESCRIPTION"));
            }),
        t.sdp || t.candidate || t.renegotiate || t.transceiverRequest || this.__destroy(fn(Error("signal() called with invalid signal data"), "ERR_SIGNALING"));
    }
  }
  _addIceCandidate(t) {
    const e = new Ae(t);
    this._pc.addIceCandidate(e).catch((t) => {
      !e.address || e.address.endsWith(".local") ? console.warn("Ignoring unsupported ICE candidate.") : this.__destroy(fn(t, "ERR_ADD_ICE_CANDIDATE"));
    });
  }
  send(t) {
    if (!this._destroying) {
      if (this.destroyed) throw fn(Error("cannot send after peer is destroyed"), "ERR_DESTROYED");
      this._channel.send(t);
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
      if (this.destroyed) throw fn(Error("cannot negotiate after peer is destroyed"), "ERR_DESTROYED");
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
  _final(t) {
    this._readableState.ended || this.push(null), t(null);
  }
  __destroy(t) {
    this.end(), this._destroy(() => {}, t);
  }
  _destroy(t, e) {
    this.destroyed ||
      this._destroying ||
      ((this._destroying = !0),
      this._debug("destroying (error: %s)", e && (e.message || e)),
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
          } catch (t) {}
          (this._channel.onmessage = null), (this._channel.onopen = null), (this._channel.onclose = null), (this._channel.onerror = null);
        }
        if (this._pc) {
          try {
            this._pc.close();
          } catch (t) {}
          (this._pc.oniceconnectionstatechange = null), (this._pc.onicegatheringstatechange = null), (this._pc.onsignalingstatechange = null), (this._pc.onicecandidate = null), (this._pc.ontrack = null), (this._pc.ondatachannel = null);
        }
        (this._pc = null), (this._channel = null), e && this.emit("error", e), t();
      }, 0));
  }
  _setupData(t) {
    if (!t.channel) return this.__destroy(fn(Error("Data channel event is missing `channel` property"), "ERR_DATA_CHANNEL"));
    (this._channel = t.channel),
      (this._channel.binaryType = "arraybuffer"),
      "number" == typeof this._channel.bufferedAmountLowThreshold && (this._channel.bufferedAmountLowThreshold = xn),
      (this.channelName = this._channel.label),
      (this._channel.onmessage = (t) => {
        this._onChannelMessage(t);
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
      (this._channel.onerror = (t) => {
        const e = t.error instanceof Error ? t.error : Error(`Datachannel error: ${t.message} ${t.filename}:${t.lineno}:${t.colno}`);
        this.__destroy(fn(e, "ERR_DATA_CHANNEL"));
      });
    let e = !1;
    this._closingInterval = setInterval(() => {
      this._channel && "closing" === this._channel.readyState ? (e && this._onChannelClose(), (e = !0)) : (e = !1);
    }, 5e3);
  }
  _write(t, e) {
    if (this.destroyed) return e(fn(Error("cannot write after peer is destroyed"), "ERR_DATA_CHANNEL"));
    if (this._connected) {
      try {
        this.send(t);
      } catch (t) {
        return this.__destroy(fn(t, "ERR_DATA_CHANNEL"));
      }
      this._channel.bufferedAmount > xn ? (this._debug("start backpressure: bufferedAmount %d", this._channel.bufferedAmount), (this._cb = e)) : e(null);
    } else this._debug("write before connect"), (this._chunk = t), (this._cb = e);
  }
  _onFinish() {
    if (this.destroyed) return;
    const t = () => {
      setTimeout(() => this.__destroy(), 1e3);
    };
    this._connected ? t() : this.once("connect", t);
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
        .then((t) => {
          if (this.destroyed) return;
          this.trickle || this.allowHalfTrickle || (t.sdp = An(t.sdp)), (t.sdp = this.sdpTransform(t.sdp));
          const e = () => {
            if (this.destroyed) return;
            const e = this._pc.localDescription || t;
            this._debug("signal"), this.emit("signal", { type: e.type, sdp: e.sdp });
          };
          this._pc
            .setLocalDescription(t)
            .then(() => {
              this._debug("createOffer success"), this.destroyed || (this.trickle || this._iceComplete ? e() : this.once("_iceComplete", e));
            })
            .catch((t) => {
              this.__destroy(fn(t, "ERR_SET_LOCAL_DESCRIPTION"));
            });
        })
        .catch((t) => {
          this.__destroy(fn(t, "ERR_CREATE_OFFER"));
        });
  }
  _createAnswer() {
    this.destroyed ||
      this._pc
        .createAnswer(this.answerOptions)
        .then((t) => {
          if (this.destroyed) return;
          this.trickle || this.allowHalfTrickle || (t.sdp = An(t.sdp)), (t.sdp = this.sdpTransform(t.sdp));
          const e = () => {
            if (this.destroyed) return;
            const e = this._pc.localDescription || t;
            this._debug("signal"), this.emit("signal", { type: e.type, sdp: e.sdp }), this.initiator || this._requestMissingTransceivers?.();
          };
          this._pc
            .setLocalDescription(t)
            .then(() => {
              this.destroyed || (this.trickle || this._iceComplete ? e() : this.once("_iceComplete", e));
            })
            .catch((t) => {
              this.__destroy(fn(t, "ERR_SET_LOCAL_DESCRIPTION"));
            });
        })
        .catch((t) => {
          this.__destroy(fn(t, "ERR_CREATE_ANSWER"));
        });
  }
  _onConnectionStateChange() {
    this.destroyed || this._destroying || ("failed" === this._pc.connectionState && this.__destroy(fn(Error("Connection failed."), "ERR_CONNECTION_FAILURE")));
  }
  _onIceStateChange() {
    if (this.destroyed) return;
    const t = this._pc.iceConnectionState,
      e = this._pc.iceGatheringState;
    this._debug("iceStateChange (connection: %s) (gathering: %s)", t, e),
      this.emit("iceStateChange", t, e),
      ("connected" !== t && "completed" !== t) || ((this._pcReady = !0), this._maybeReady()),
      "failed" === t && this.__destroy(fn(Error("Ice connection failed."), "ERR_ICE_CONNECTION_FAILURE")),
      "closed" === t && this.__destroy(fn(Error("Ice connection closed."), "ERR_ICE_CONNECTION_CLOSED"));
  }
  getStats(t) {
    const e = (t) => (
      "[object Array]" === {}.toString.call(t.values) &&
        t.values.forEach((e) => {
          Object.assign(t, e);
        }),
      t
    );
    0 === this._pc.getStats.length || this._isReactNativeWebrtc
      ? this._pc.getStats().then(
          (r) => {
            const n = [];
            r.forEach((t) => {
              n.push(e(t));
            }),
              t(null, n);
          },
          (e) => t(e)
        )
      : this._pc.getStats.length > 0
      ? this._pc.getStats(
          (r) => {
            if (this.destroyed) return;
            const n = [];
            r.result().forEach((t) => {
              const r = {};
              t.names().forEach((e) => {
                r[e] = t.stat(e);
              }),
                (r.id = t.id),
                (r.type = t.type),
                (r.timestamp = t.timestamp),
                n.push(e(r));
            }),
              t(null, n);
          },
          (e) => t(e)
        )
      : t(null, []);
  }
  _maybeReady() {
    if ((this._debug("maybeReady pc %s channel %s", this._pcReady, this._channelReady), this._connected || this._connecting || !this._pcReady || !this._channelReady)) return;
    this._connecting = !0;
    const t = () => {
      this.destroyed ||
        this._destroying ||
        this.getStats((e, r) => {
          if (this.destroyed || this._destroying) return;
          e && (r = []);
          const n = {},
            i = {},
            s = {};
          let o = !1;
          r.forEach((t) => {
            ("remotecandidate" !== t.type && "remote-candidate" !== t.type) || (n[t.id] = t),
              ("localcandidate" !== t.type && "local-candidate" !== t.type) || (i[t.id] = t),
              ("candidatepair" !== t.type && "candidate-pair" !== t.type) || (s[t.id] = t);
          });
          const a = (t) => {
            o = !0;
            let e = i[t.localCandidateId];
            e && (e.ip || e.address)
              ? ((this.localAddress = e.ip || e.address), (this.localPort = Number(e.port)))
              : e && e.ipAddress
              ? ((this.localAddress = e.ipAddress), (this.localPort = Number(e.portNumber)))
              : "string" == typeof t.googLocalAddress && ((e = t.googLocalAddress.split(":")), (this.localAddress = e[0]), (this.localPort = Number(e[1]))),
              this.localAddress && (this.localFamily = this.localAddress.includes(":") ? "IPv6" : "IPv4");
            let r = n[t.remoteCandidateId];
            r && (r.ip || r.address)
              ? ((this.remoteAddress = r.ip || r.address), (this.remotePort = Number(r.port)))
              : r && r.ipAddress
              ? ((this.remoteAddress = r.ipAddress), (this.remotePort = Number(r.portNumber)))
              : "string" == typeof t.googRemoteAddress && ((r = t.googRemoteAddress.split(":")), (this.remoteAddress = r[0]), (this.remotePort = Number(r[1]))),
              this.remoteAddress && (this.remoteFamily = this.remoteAddress.includes(":") ? "IPv6" : "IPv4"),
              this._debug("connect local: %s:%s remote: %s:%s", this.localAddress, this.localPort, this.remoteAddress, this.remotePort);
          };
          if (
            (r.forEach((t) => {
              "transport" === t.type && t.selectedCandidatePairId && a(s[t.selectedCandidatePairId]),
                (("googCandidatePair" === t.type && "true" === t.googActiveConnection) || (("candidatepair" === t.type || "candidate-pair" === t.type) && t.selected)) && a(t);
            }),
            o || (Object.keys(s).length && !Object.keys(i).length))
          ) {
            if (((this._connecting = !1), (this._connected = !0), this._chunk)) {
              try {
                this.send(this._chunk);
              } catch (e) {
                return this.__destroy(fn(e, "ERR_DATA_CHANNEL"));
              }
              (this._chunk = null), this._debug('sent chunk from "write before connect"');
              const t = this._cb;
              (this._cb = null), t(null);
            }
            "number" != typeof this._channel.bufferedAmountLowThreshold && ((this._interval = setInterval(() => this._onInterval(), 150)), this._interval.unref && this._interval.unref()), this._debug("connect"), this.emit("connect");
          } else setTimeout(t, 100);
        });
    };
    t();
  }
  _onInterval() {
    !this._cb || !this._channel || this._channel.bufferedAmount > xn || this._onChannelBufferedAmountLow();
  }
  _onSignalingStateChange() {
    this.destroyed ||
      ("stable" === this._pc.signalingState &&
        ((this._isNegotiating = !1),
        this._debug("flushing sender queue", this._sendersAwaitingStable),
        this._sendersAwaitingStable.forEach((t) => {
          this._pc.removeTrack(t), (this._queuedNegotiation = !0);
        }),
        (this._sendersAwaitingStable = []),
        this._queuedNegotiation ? (this._debug("flushing negotiation queue"), (this._queuedNegotiation = !1), this._needsNegotiation()) : (this._debug("negotiated"), this.emit("negotiated"))),
      this._debug("signalingStateChange %s", this._pc.signalingState),
      this.emit("signalingStateChange", this._pc.signalingState));
  }
  _onIceCandidate(t) {
    this.destroyed ||
      (t.candidate && this.trickle
        ? this.emit("signal", { type: "candidate", candidate: { candidate: t.candidate.candidate, sdpMLineIndex: t.candidate.sdpMLineIndex, sdpMid: t.candidate.sdpMid } })
        : t.candidate || this._iceComplete || ((this._iceComplete = !0), this.emit("_iceComplete")),
      t.candidate && this._startIceCompleteTimeout());
  }
  _onChannelMessage(t) {
    if (this.destroyed) return;
    let e = t.data;
    var r;
    e instanceof ArrayBuffer ? (e = new Uint8Array(e)) : !1 === this.__objectMode && ((r = e), (e = wn.encode(r))), this.push(e);
  }
  _onChannelBufferedAmountLow() {
    if (this.destroyed || !this._cb) return;
    this._debug("ending backpressure: bufferedAmount %d", this._channel.bufferedAmount);
    const t = this._cb;
    (this._cb = null), t(null);
  }
  _onChannelOpen() {
    this._connected || this.destroyed || (this._debug("on channel open"), (this._channelReady = !0), this._maybeReady());
  }
  _onChannelClose() {
    this.destroyed || (this._debug("on channel close"), this.__destroy());
  }
  _debug() {
    const t = [].slice.call(arguments);
    (t[0] = "[" + this._id + "] " + t[0]), Cn.apply(null, t);
  }
};
(Tn.WEBRTC_SUPPORT = !!Ce), (Tn.config = { iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:global.stun.twilio.com:3478"] }], sdpSemantics: "unified-plan" }), (Tn.channelConfig = {});
class Rn extends Tn {
  constructor(t = {}) {
    super(t),
      this._pc &&
        ((this.streams = t.streams || (t.stream ? [t.stream] : [])),
        (this._senderMap = new Map()),
        this.streams &&
          this.streams.forEach((t) => {
            this.addStream(t);
          }),
        (this._pc.ontrack = (t) => {
          this._onTrack(t);
        }));
  }
  addTransceiver(t, e) {
    if (!this._destroying) {
      if (this.destroyed) throw fn(Error("cannot addTransceiver after peer is destroyed"), "ERR_DESTROYED");
      if ((this._debug("addTransceiver()"), this.initiator))
        try {
          this._pc.addTransceiver(t, e), this._needsNegotiation();
        } catch (t) {
          this.__destroy(fn(t, "ERR_ADD_TRANSCEIVER"));
        }
      else this.emit("signal", { type: "transceiverRequest", transceiverRequest: { kind: t, init: e } });
    }
  }
  addStream(t) {
    if (!this._destroying) {
      if (this.destroyed) throw fn(Error("cannot addStream after peer is destroyed"), "ERR_DESTROYED");
      this._debug("addStream()"),
        t.getTracks().forEach((e) => {
          this.addTrack(e, t);
        });
    }
  }
  addTrack(t, e) {
    if (this._destroying) return;
    if (this.destroyed) throw fn(Error("cannot addTrack after peer is destroyed"), "ERR_DESTROYED");
    this._debug("addTrack()");
    const r = this._senderMap.get(t) || new Map();
    let n = r.get(e);
    if (n) throw n.removed ? fn(Error("Track has been removed. You should enable/disable tracks that you want to re-add."), "ERR_SENDER_REMOVED") : fn(Error("Track has already been added to that stream."), "ERR_SENDER_ALREADY_ADDED");
    (n = this._pc.addTrack(t, e)), r.set(e, n), this._senderMap.set(t, r), this._needsNegotiation();
  }
  replaceTrack(t, e, r) {
    if (this._destroying) return;
    if (this.destroyed) throw fn(Error("cannot replaceTrack after peer is destroyed"), "ERR_DESTROYED");
    this._debug("replaceTrack()");
    const n = this._senderMap.get(t),
      i = n ? n.get(r) : null;
    if (!i) throw fn(Error("Cannot replace track that was never added."), "ERR_TRACK_NOT_ADDED");
    e && this._senderMap.set(e, n), null != i.replaceTrack ? i.replaceTrack(e) : this.__destroy(fn(Error("replaceTrack is not supported in this browser"), "ERR_UNSUPPORTED_REPLACETRACK"));
  }
  removeTrack(t, e) {
    if (this._destroying) return;
    if (this.destroyed) throw fn(Error("cannot removeTrack after peer is destroyed"), "ERR_DESTROYED");
    this._debug("removeSender()");
    const r = this._senderMap.get(t),
      n = r ? r.get(e) : null;
    if (!n) throw fn(Error("Cannot remove track that was never added."), "ERR_TRACK_NOT_ADDED");
    try {
      (n.removed = !0), this._pc.removeTrack(n);
    } catch (t) {
      "NS_ERROR_UNEXPECTED" === t.name ? this._sendersAwaitingStable.push(n) : this.__destroy(fn(t, "ERR_REMOVE_TRACK"));
    }
    this._needsNegotiation();
  }
  removeStream(t) {
    if (!this._destroying) {
      if (this.destroyed) throw fn(Error("cannot removeStream after peer is destroyed"), "ERR_DESTROYED");
      this._debug("removeSenders()"),
        t.getTracks().forEach((e) => {
          this.removeTrack(e, t);
        });
    }
  }
  _requestMissingTransceivers() {
    this._pc.getTransceivers &&
      this._pc.getTransceivers().forEach((t) => {
        t.mid || !t.sender.track || t.requested || ((t.requested = !0), this.addTransceiver(t.sender.track.kind));
      });
  }
  _onTrack(t) {
    this.destroyed ||
      t.streams.forEach((e) => {
        this._debug("on track"),
          this.emit("track", t.track, e),
          this._remoteTracks.push({ track: t.track, stream: e }),
          this._remoteStreams.some((t) => t.id === e.id) ||
            (this._remoteStreams.push(e),
            queueMicrotask(() => {
              this._debug("on stream"), this.emit("stream", e);
            }));
      });
  }
}
const kn = "data",
  In = "signal";
var Bn = (t, e) => {
  const r = new Rn({ iceServers: [{ urls: Nn }], ...e, initiator: t, trickle: !1 }),
    n = (t) => i.push(t);
  let i = [];
  return (
    r.on(kn, n),
    {
      id: r._id,
      created: Date.now(),
      connection: r._pc,
      get channel() {
        return r._channel;
      },
      get isDead() {
        return r.destroyed;
      },
      signal(e) {
        return new Promise((n) => {
          t || r.on(In, n), r.signal(e);
        });
      },
      sendData(t) {
        return r.send(t);
      },
      destroy() {
        return r.destroy();
      },
      setHandlers(t) {
        return Object.entries(t).forEach(([t, e]) => r.on(t, e));
      },
      offerPromise: t ? new Promise((t) => r.on(In, t)) : Promise.resolve(),
      addStream(t) {
        return r.addStream(t);
      },
      removeStream(t) {
        return r.removeStream(t);
      },
      addTrack(t, e) {
        return r.addTrack(t, e);
      },
      removeTrack(t, e) {
        return r.removeTrack(t, e);
      },
      replaceTrack(t, e, n) {
        return r.replaceTrack(t, e, n);
      },
      drainEarlyData(t) {
        r.off(kn, n), i.forEach(t), (i = null);
      },
    }
  );
};
const Nn = [...Wt(5, (t, e) => `stun:stun${e || ""}.l.google.com:19302`), "stun:global.stun.twilio.com:3478"],
  On = Object.getPrototypeOf(Uint8Array),
  Ln = 16369,
  Pn = 255,
  Fn = "bufferedamountlow",
  Dn = (t) => "@_" + t;
const Un = {},
  qn = "EVENT",
  Mn = Gt && $t.utils.randomPrivateKey(),
  Hn = Gt && oe($t.getPublicKey(Mn)),
  jn = {},
  $n = {},
  zn = () => Math.floor(Date.now() / 1e3),
  Wn = async (t, e) => {
    const r = { kind: 29333, content: e, pubkey: Hn, created_at: zn(), tags: [["x", t]] },
      n = oe(new Uint8Array(await crypto.subtle.digest("SHA-256", ie(he([0, r.pubkey, r.created_at, r.kind, r.tags, r.content])))));
    return he([qn, { ...r, id: n, sig: oe(await $t.sign(n, Mn)) }]);
  },
  Kn = (t, e) => ((jn[t] = e), he(["REQ", t, { kinds: [29333], since: zn(), "#x": [e] }])),
  Vn = (t) => (delete jn[t], he(["CLOSE", t])),
  Zn = (({ init: t, subscribe: e, announce: r }) => {
    const n = {};
    let i,
      s,
      o,
      a = !1;
    return (h, c, d) => {
      const { appId: u } = h;
      if (n[u]?.[c]) return n[u][c];
      const l = {},
        f = {},
        p = ae(zt, u, c),
        g = fe(p),
        y = fe(ae(p, Zt)),
        m = (async (t, e, r) => crypto.subtle.importKey("raw", await crypto.subtle.digest({ name: "SHA-256" }, ie(`${t}:${e}:${r}`)), { name: ue }, !1, ["encrypt", "decrypt"]))(h.password || "", u, c),
        _ = (t) => async (e) => ({ type: e.type, sdp: await t(m, e.sdp) }),
        b = _(ge),
        w = _(pe),
        E = () => Bn(!0, h.rtcConfig),
        v = (t, e, r) => {
          f[e]
            ? f[e] !== t && t.destroy()
            : ((f[e] = t),
              I(t, e),
              l[e]?.forEach((t, e) => {
                e !== r && t.destroy();
              }),
              delete l[e]);
        },
        S = (t, e) => {
          f[e] === t && delete f[e];
        },
        C = (t) => (s.push(...Wt(t, E)), Yt(s.splice(0, t).map((t) => t.offerPromise.then(w).then((e) => ({ peer: t, offer: e }))))),
        x = (t, e) => d?.({ error: `incorrect password (${h.password}) when decrypting ${e}`, appId: u, peerId: t, roomId: c }),
        A = (t) => async (e, r, n) => {
          const [i, s] = await Yt([g, y]);
          if (e !== i && e !== s) return;
          const { peerId: o, offer: a, answer: c, peer: d } = "string" == typeof r ? ce(r) : r;
          if (o !== Zt && !f[o])
            if (!o || a || c) {
              if (a) {
                const e = l[o]?.[t];
                if (e && Zt > o) return;
                const r = Bn(!1, h.rtcConfig);
                let i;
                r.setHandlers({
                  connect() {
                    return v(r, o, t);
                  },
                  close() {
                    return S(r, o);
                  },
                });
                try {
                  i = await b(a);
                } catch (t) {
                  return void x(o, "offer");
                }
                if (r.isDead) return;
                const [s, c] = await Yt([fe(ae(p, o)), r.signal(i)]);
                n(s, he({ peerId: Zt, answer: await w(c) }));
              } else if (c) {
                let e;
                try {
                  e = await b(c);
                } catch (t) {
                  return void x(o, "answer");
                }
                if (d)
                  d.setHandlers({
                    connect() {
                      return v(d, o, t);
                    },
                    close() {
                      return S(d, o);
                    },
                  }),
                    d.signal(e);
                else {
                  const r = l[o]?.[t];
                  r && !r.isDead && r.signal(e);
                }
              }
            } else {
              if (l[o]?.[t]) return;
              const [[{ peer: e, offer: r }], i] = await Yt([C(1), fe(ae(p, o))]);
              (l[o] ||= []),
                (l[o][t] = e),
                setTimeout(
                  () =>
                    ((t, e) => {
                      if (f[t]) return;
                      const r = l[t]?.[e];
                      r && (delete l[t][e], r.destroy());
                    })(o, t),
                  0.9 * T[t]
                ),
                e.setHandlers({
                  connect() {
                    return v(e, o, t);
                  },
                  close() {
                    return S(e, o);
                  },
                }),
                n(i, he({ peerId: Zt, offer: r }));
            }
        };
      if (!h) throw ee("requires a config map as the first argument");
      if (!u && !h.firebaseApp) throw ee("config map is missing appId field");
      if (!c) throw ee("roomId argument required");
      if (!a) {
        const e = t(h);
        (s = Wt(20, E)),
          (i = Array.isArray(e) ? e : [e]),
          (a = !0),
          (o = setInterval(
            () =>
              (s = s.filter((t) => {
                const e = Date.now() - t.created < 57333;
                return e || t.destroy(), e;
              })),
            59052.99
          ));
      }
      const T = i.map(() => 5333),
        R = [],
        k = i.map(async (t, r) => e(await t, await g, await y, A(r), C));
      Yt([g, y]).then(([t, e]) => {
        const n = async (i, s) => {
          const o = await r(i, t, e);
          "number" == typeof o && (T[s] = o), (R[s] = setTimeout(() => n(i, s), T[s]));
        };
        k.forEach(async (t, e) => {
          await t, n(await i[e], e);
        });
      });
      let I = te;
      return (
        (n[u] ||= {}),
        (n[u][c] = ((t, e, r) => {
          const n = {},
            i = {},
            s = {},
            o = {},
            a = {},
            h = {},
            c = {},
            d = { onPeerJoin: te, onPeerLeave: te, onPeerStream: te, onPeerTrack: te },
            u = (t, e) =>
              (t ? (Array.isArray(t) ? t : [t]) : Xt(n)).flatMap((t) => {
                const r = n[t];
                return r ? e(t, r) : (console.warn(`${zt}: no peer with id ${t} found`), []);
              }),
            l = (t) => {
              n[t] && (delete n[t], delete o[t], delete a[t], d.onPeerLeave(t), e(t));
            },
            f = (t) => {
              if (i[t]) return s[t];
              if (!t) throw ee("action type argument is required");
              const e = ie(t);
              if (e.byteLength > 12) throw ee(`action type string "${t}" (${e.byteLength}b) exceeds byte limit (12). Hint: choose a shorter name.`);
              const r = new Uint8Array(12);
              r.set(e);
              let o = 0;
              return (
                (i[t] = {
                  onComplete: te,
                  onProgress: te,
                  setOnComplete: (e) => (i[t] = { ...i[t], onComplete: e }),
                  setOnProgress: (e) => (i[t] = { ...i[t], onProgress: e }),
                  async send(t, e, i, s) {
                    if (i && "object" != typeof i) throw ee("action meta argument must be an object");
                    const a = typeof t;
                    if ("undefined" === a) throw ee("action data cannot be undefined");
                    const h = "string" !== a,
                      c = t instanceof Blob,
                      d = c || t instanceof ArrayBuffer || t instanceof On;
                    if (i && !d) throw ee("action meta argument can only be used with binary data");
                    const l = d ? new Uint8Array(c ? await t.arrayBuffer() : t) : ie(h ? he(t) : t),
                      f = i ? ie(he(i)) : null,
                      p = Math.ceil(l.byteLength / Ln) + (i ? 1 : 0) || 1,
                      g = Wt(p, (t, e) => {
                        const n = e === p - 1,
                          s = i && 0 === e,
                          a = new Uint8Array(15 + (s ? f.byteLength : n ? l.byteLength - Ln * (p - (i ? 2 : 1)) : Ln));
                        return (
                          a.set(r),
                          a.set([o], 12),
                          a.set([n | (s << 1) | (d << 2) | (h << 3)], 13),
                          a.set([Math.round(((e + 1) / p) * Pn)], 14),
                          a.set(i ? (s ? f : l.subarray((e - 1) * Ln, e * Ln)) : l.subarray(e * Ln, (e + 1) * Ln), 15),
                          a
                        );
                      });
                    return (
                      (o = (o + 1) & Pn),
                      Yt(
                        u(e, async (t, e) => {
                          const { channel: r } = e;
                          let o = 0;
                          for (; o < p; ) {
                            const a = g[o];
                            if (
                              (r.bufferedAmount > r.bufferedAmountLowThreshold &&
                                (await new Promise((t) => {
                                  const e = () => {
                                    r.removeEventListener(Fn, e), t();
                                  };
                                  r.addEventListener(Fn, e);
                                })),
                              !n[t])
                            )
                              break;
                            e.sendData(a), o++, s?.(a[14] / Pn, t, i);
                          }
                        })
                      )
                    );
                  },
                }),
                (s[t] ||= [i[t].send, i[t].setOnComplete, i[t].setOnProgress])
              );
            },
            p = (t, e) => {
              const r = new Uint8Array(e),
                n = se(r.subarray(0, 12)).replaceAll("\0", ""),
                [s] = r.subarray(12, 13),
                [a] = r.subarray(13, 14),
                [h] = r.subarray(14, 15),
                c = r.subarray(15),
                d = !!(1 & a),
                u = !!(2 & a),
                l = !!(4 & a),
                f = !!(8 & a);
              if (!i[n]) return void console.warn(`${zt}: received message with unregistered type (${n})`);
              (o[t] ||= {}), (o[t][n] ||= {});
              const p = (o[t][n][s] ||= { chunks: [] });
              if ((u ? (p.meta = ce(se(c))) : p.chunks.push(c), i[n].onProgress(h / Pn, t, p.meta), !d)) return;
              const g = new Uint8Array(p.chunks.reduce((t, e) => t + e.byteLength, 0));
              if ((p.chunks.reduce((t, e) => (g.set(e, t), t + e.byteLength), 0), delete o[t][n][s], l)) i[n].onComplete(g, t, p.meta);
              else {
                const e = se(g);
                i[n].onComplete(f ? ce(e) : e, t);
              }
            },
            g = async () => {
              await A(""),
                await new Promise((t) => setTimeout(t, 99)),
                Jt(n).forEach(([t, e]) => {
                  e.destroy(), delete n[t];
                }),
                r();
            },
            [y, m] = f(Dn("ping")),
            [_, b] = f(Dn("pong")),
            [w, E] = f(Dn("signal")),
            [v, S] = f(Dn("stream")),
            [C, x] = f(Dn("track")),
            [A, T] = f(Dn("leave"));
          return (
            t((t, e) => {
              n[e] ||
                ((n[e] = t),
                t.setHandlers({
                  data: (t) => p(e, t),
                  stream(t) {
                    d.onPeerStream(t, e, h[e]), delete h[e];
                  },
                  track(t, r) {
                    d.onPeerTrack(t, r, e, c[e]), delete c[e];
                  },
                  signal: (t) => w(t, e),
                  close: () => l(e),
                  error: () => l(e),
                }),
                d.onPeerJoin(e),
                t.drainEarlyData?.((t) => p(e, t)));
            }),
            m((t, e) => _("", e)),
            b((t, e) => {
              a[e]?.(), delete a[e];
            }),
            E((t, e) => n[e]?.signal(t)),
            S((t, e) => (h[e] = t)),
            x((t, e) => (c[e] = t)),
            T((t, e) => l(e)),
            Gt && addEventListener("beforeunload", g),
            {
              makeAction: f,
              leave: g,
              async ping(t) {
                if (!t) throw ee("ping() must be called with target peer ID");
                const e = Date.now();
                return y("", t), await new Promise((e) => (a[t] = e)), Date.now() - e;
              },
              getPeers: () => Qt(Jt(n).map(([t, e]) => [t, e.connection])),
              addStream: (t, e, r) =>
                u(e, async (e, n) => {
                  r && (await v(r, e)), n.addStream(t);
                }),
              removeStream: (t, e) => u(e, (e, r) => r.removeStream(t)),
              addTrack: (t, e, r, n) =>
                u(r, async (r, i) => {
                  n && (await C(n, r)), i.addTrack(t, e);
                }),
              removeTrack: (t, e, r) => u(r, (r, n) => n.removeTrack(t, e)),
              replaceTrack: (t, e, r, n, i) =>
                u(n, async (n, s) => {
                  i && (await C(i, n)), s.replaceTrack(t, e, r);
                }),
              onPeerJoin: (t) => (d.onPeerJoin = t),
              onPeerLeave: (t) => (d.onPeerLeave = t),
              onPeerStream: (t) => (d.onPeerStream = t),
              onPeerTrack: (t) => (d.onPeerTrack = t),
            }
          );
        })(
          (t) => (I = t),
          (t) => delete f[t],
          () => {
            delete n[u][c], R.forEach(clearTimeout), k.forEach(async (t) => (await t)()), clearInterval(o);
          }
        ))
      );
    };
  })({
    init(t) {
      return ((t, e, r) => (t.relayUrls || e).slice(0, t.relayUrls ? t.relayUrls.length : t.relayRedundancy || r))(t, Jn, 5).map((t) => {
        const e = ((t, e) => {
          const r = {},
            n = () => {
              const i = new WebSocket(t);
              (i.onclose = () => {
                (de[t] ??= 3333), setTimeout(n, de[t]), (de[t] *= 2);
              }),
                (i.onmessage = (t) => e(t.data)),
                (r.socket = i),
                (r.url = i.url),
                (r.ready = new Promise(
                  (e) =>
                    (i.onopen = () => {
                      e(r), (de[t] = 3333);
                    })
                )),
                (r.send = (t) => {
                  1 === i.readyState && i.send(t);
                });
            };
          return n(), r;
        })(t, (t) => {
          const [r, n, i, s] = ce(t);
          if (r === qn) $n[n]?.(jn[n], i.content);
          else {
            const t = `${zt}: relay failure from ${e.url} - `;
            "NOTICE" === r ? console.warn(t + n) : "OK" !== r || i || console.warn(t + s);
          }
        });
        return (Un[t] = e), e.ready;
      });
    },
    subscribe(t, e, r, n) {
      const i = Vt(64),
        s = Vt(64);
      return (
        ($n[i] = $n[s] = (e, r) => n(e, r, async (e, r) => t.send(await Wn(e, r)))),
        t.send(Kn(i, e)),
        t.send(Kn(s, r)),
        () => {
          t.send(Vn(i)), t.send(Vn(s)), delete $n[i], delete $n[s];
        }
      );
    },
    async announce(t, e) {
      return t.send(await Wn(e, he({ peerId: Zt })));
    },
  }),
  Yn = ((Gn = Un), () => Qt(Jt(Gn).map(([t, e]) => [t, e.socket])));
var Gn;
const Jn = [
  "relay.nostr.net",
  "relay.snort.social",
  "relay.piazza.today",
  "relay.exit.pub",
  "nostr.lu.ke",
  "nostr.mom",
  "relay.urbanzap.space",
  "nostr.data.haus",
  "nostr.sathoarder.com",
  "relay.nostromo.social",
  "relay.nostr.bg",
  "nostr.stakey.net",
  "nostr.vulpem.com",
  "a.nos.lol",
  "eu.purplerelay.com",
  "nostr2.sanhauf.com",
  "e.nos.lol",
].map((t) => "wss://" + t);
export { Jn as defaultRelayUrls, Yn as getRelaySockets, Zn as joinRoom, Zt as selfId };