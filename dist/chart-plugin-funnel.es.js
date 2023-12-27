var Fo = Object.defineProperty;
var zo = (i, t, e) => t in i ? Fo(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var S = (i, t, e) => (zo(i, typeof t != "symbol" ? t + "" : t, e), e);
/*!
 * @kurkle/color v0.3.2
 * https://github.com/kurkle/color#readme
 * (c) 2023 Jukka Kurkela
 * Released under the MIT License
 */
function Ce(i) {
  return i + 0.5 | 0;
}
const _t = (i, t, e) => Math.max(Math.min(i, e), t);
function oe(i) {
  return _t(Ce(i * 2.55), 0, 255);
}
function kt(i) {
  return _t(Ce(i * 255), 0, 255);
}
function ft(i) {
  return _t(Ce(i / 2.55) / 100, 0, 1);
}
function ts(i) {
  return _t(Ce(i * 100), 0, 100);
}
const it = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, wi = [..."0123456789ABCDEF"], Wo = (i) => wi[i & 15], Bo = (i) => wi[(i & 240) >> 4] + wi[i & 15], Re = (i) => (i & 240) >> 4 === (i & 15), Vo = (i) => Re(i.r) && Re(i.g) && Re(i.b) && Re(i.a);
function No(i) {
  var t = i.length, e;
  return i[0] === "#" && (t === 4 || t === 5 ? e = {
    r: 255 & it[i[1]] * 17,
    g: 255 & it[i[2]] * 17,
    b: 255 & it[i[3]] * 17,
    a: t === 5 ? it[i[4]] * 17 : 255
  } : (t === 7 || t === 9) && (e = {
    r: it[i[1]] << 4 | it[i[2]],
    g: it[i[3]] << 4 | it[i[4]],
    b: it[i[5]] << 4 | it[i[6]],
    a: t === 9 ? it[i[7]] << 4 | it[i[8]] : 255
  })), e;
}
const Ho = (i, t) => i < 255 ? t(i) : "";
function jo(i) {
  var t = Vo(i) ? Wo : Bo;
  return i ? "#" + t(i.r) + t(i.g) + t(i.b) + Ho(i.a, t) : void 0;
}
const $o = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function wn(i, t, e) {
  const s = t * Math.min(e, 1 - e), n = (o, r = (o + i / 30) % 12) => e - s * Math.max(Math.min(r - 3, 9 - r, 1), -1);
  return [n(0), n(8), n(4)];
}
function Yo(i, t, e) {
  const s = (n, o = (n + i / 60) % 6) => e - e * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [s(5), s(3), s(1)];
}
function Uo(i, t, e) {
  const s = wn(i, 1, 0.5);
  let n;
  for (t + e > 1 && (n = 1 / (t + e), t *= n, e *= n), n = 0; n < 3; n++)
    s[n] *= 1 - t - e, s[n] += t;
  return s;
}
function Xo(i, t, e, s, n) {
  return i === n ? (t - e) / s + (t < e ? 6 : 0) : t === n ? (e - i) / s + 2 : (i - t) / s + 4;
}
function Ii(i) {
  const e = i.r / 255, s = i.g / 255, n = i.b / 255, o = Math.max(e, s, n), r = Math.min(e, s, n), a = (o + r) / 2;
  let l, c, h;
  return o !== r && (h = o - r, c = a > 0.5 ? h / (2 - o - r) : h / (o + r), l = Xo(e, s, n, h, o), l = l * 60 + 0.5), [l | 0, c || 0, a];
}
function Fi(i, t, e, s) {
  return (Array.isArray(t) ? i(t[0], t[1], t[2]) : i(t, e, s)).map(kt);
}
function zi(i, t, e) {
  return Fi(wn, i, t, e);
}
function Ko(i, t, e) {
  return Fi(Uo, i, t, e);
}
function qo(i, t, e) {
  return Fi(Yo, i, t, e);
}
function Sn(i) {
  return (i % 360 + 360) % 360;
}
function Go(i) {
  const t = $o.exec(i);
  let e = 255, s;
  if (!t)
    return;
  t[5] !== s && (e = t[6] ? oe(+t[5]) : kt(+t[5]));
  const n = Sn(+t[2]), o = +t[3] / 100, r = +t[4] / 100;
  return t[1] === "hwb" ? s = Ko(n, o, r) : t[1] === "hsv" ? s = qo(n, o, r) : s = zi(n, o, r), {
    r: s[0],
    g: s[1],
    b: s[2],
    a: e
  };
}
function Zo(i, t) {
  var e = Ii(i);
  e[0] = Sn(e[0] + t), e = zi(e), i.r = e[0], i.g = e[1], i.b = e[2];
}
function Jo(i) {
  if (!i)
    return;
  const t = Ii(i), e = t[0], s = ts(t[1]), n = ts(t[2]);
  return i.a < 255 ? `hsla(${e}, ${s}%, ${n}%, ${ft(i.a)})` : `hsl(${e}, ${s}%, ${n}%)`;
}
const es = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, is = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function Qo() {
  const i = {}, t = Object.keys(is), e = Object.keys(es);
  let s, n, o, r, a;
  for (s = 0; s < t.length; s++) {
    for (r = a = t[s], n = 0; n < e.length; n++)
      o = e[n], a = a.replace(o, es[o]);
    o = parseInt(is[r], 16), i[a] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return i;
}
let Ee;
function tr(i) {
  Ee || (Ee = Qo(), Ee.transparent = [0, 0, 0, 0]);
  const t = Ee[i.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const er = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function ir(i) {
  const t = er.exec(i);
  let e = 255, s, n, o;
  if (t) {
    if (t[7] !== s) {
      const r = +t[7];
      e = t[8] ? oe(r) : _t(r * 255, 0, 255);
    }
    return s = +t[1], n = +t[3], o = +t[5], s = 255 & (t[2] ? oe(s) : _t(s, 0, 255)), n = 255 & (t[4] ? oe(n) : _t(n, 0, 255)), o = 255 & (t[6] ? oe(o) : _t(o, 0, 255)), {
      r: s,
      g: n,
      b: o,
      a: e
    };
  }
}
function sr(i) {
  return i && (i.a < 255 ? `rgba(${i.r}, ${i.g}, ${i.b}, ${ft(i.a)})` : `rgb(${i.r}, ${i.g}, ${i.b})`);
}
const ui = (i) => i <= 31308e-7 ? i * 12.92 : Math.pow(i, 1 / 2.4) * 1.055 - 0.055, Ht = (i) => i <= 0.04045 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
function nr(i, t, e) {
  const s = Ht(ft(i.r)), n = Ht(ft(i.g)), o = Ht(ft(i.b));
  return {
    r: kt(ui(s + e * (Ht(ft(t.r)) - s))),
    g: kt(ui(n + e * (Ht(ft(t.g)) - n))),
    b: kt(ui(o + e * (Ht(ft(t.b)) - o))),
    a: i.a + e * (t.a - i.a)
  };
}
function Ie(i, t, e) {
  if (i) {
    let s = Ii(i);
    s[t] = Math.max(0, Math.min(s[t] + s[t] * e, t === 0 ? 360 : 1)), s = zi(s), i.r = s[0], i.g = s[1], i.b = s[2];
  }
}
function Pn(i, t) {
  return i && Object.assign(t || {}, i);
}
function ss(i) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(i) ? i.length >= 3 && (t = { r: i[0], g: i[1], b: i[2], a: 255 }, i.length > 3 && (t.a = kt(i[3]))) : (t = Pn(i, { r: 0, g: 0, b: 0, a: 1 }), t.a = kt(t.a)), t;
}
function or(i) {
  return i.charAt(0) === "r" ? ir(i) : Go(i);
}
class ye {
  constructor(t) {
    if (t instanceof ye)
      return t;
    const e = typeof t;
    let s;
    e === "object" ? s = ss(t) : e === "string" && (s = No(t) || tr(t) || or(t)), this._rgb = s, this._valid = !!s;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Pn(this._rgb);
    return t && (t.a = ft(t.a)), t;
  }
  set rgb(t) {
    this._rgb = ss(t);
  }
  rgbString() {
    return this._valid ? sr(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? jo(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Jo(this._rgb) : void 0;
  }
  mix(t, e) {
    if (t) {
      const s = this.rgb, n = t.rgb;
      let o;
      const r = e === o ? 0.5 : e, a = 2 * r - 1, l = s.a - n.a, c = ((a * l === -1 ? a : (a + l) / (1 + a * l)) + 1) / 2;
      o = 1 - c, s.r = 255 & c * s.r + o * n.r + 0.5, s.g = 255 & c * s.g + o * n.g + 0.5, s.b = 255 & c * s.b + o * n.b + 0.5, s.a = r * s.a + (1 - r) * n.a, this.rgb = s;
    }
    return this;
  }
  interpolate(t, e) {
    return t && (this._rgb = nr(this._rgb, t._rgb, e)), this;
  }
  clone() {
    return new ye(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = kt(t), this;
  }
  clearer(t) {
    const e = this._rgb;
    return e.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, e = Ce(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = e, this;
  }
  opaquer(t) {
    const e = this._rgb;
    return e.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return Ie(this._rgb, 2, t), this;
  }
  darken(t) {
    return Ie(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Ie(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Ie(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Zo(this._rgb, t), this;
  }
}
/*!
 * Chart.js v4.4.1
 * https://www.chartjs.org
 * (c) 2023 Chart.js Contributors
 * Released under the MIT License
 */
function dt() {
}
const rr = (() => {
  let i = 0;
  return () => i++;
})();
function L(i) {
  return i === null || typeof i > "u";
}
function F(i) {
  if (Array.isArray && Array.isArray(i))
    return !0;
  const t = Object.prototype.toString.call(i);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function T(i) {
  return i !== null && Object.prototype.toString.call(i) === "[object Object]";
}
function N(i) {
  return (typeof i == "number" || i instanceof Number) && isFinite(+i);
}
function tt(i, t) {
  return N(i) ? i : t;
}
function A(i, t) {
  return typeof i > "u" ? t : i;
}
const ar = (i, t) => typeof i == "string" && i.endsWith("%") ? parseFloat(i) / 100 : +i / t, Dn = (i, t) => typeof i == "string" && i.endsWith("%") ? parseFloat(i) / 100 * t : +i;
function I(i, t, e) {
  if (i && typeof i.call == "function")
    return i.apply(e, t);
}
function R(i, t, e, s) {
  let n, o, r;
  if (F(i))
    if (o = i.length, s)
      for (n = o - 1; n >= 0; n--)
        t.call(e, i[n], n);
    else
      for (n = 0; n < o; n++)
        t.call(e, i[n], n);
  else if (T(i))
    for (r = Object.keys(i), o = r.length, n = 0; n < o; n++)
      t.call(e, i[r[n]], r[n]);
}
function qe(i, t) {
  let e, s, n, o;
  if (!i || !t || i.length !== t.length)
    return !1;
  for (e = 0, s = i.length; e < s; ++e)
    if (n = i[e], o = t[e], n.datasetIndex !== o.datasetIndex || n.index !== o.index)
      return !1;
  return !0;
}
function Ge(i) {
  if (F(i))
    return i.map(Ge);
  if (T(i)) {
    const t = /* @__PURE__ */ Object.create(null), e = Object.keys(i), s = e.length;
    let n = 0;
    for (; n < s; ++n)
      t[e[n]] = Ge(i[e[n]]);
    return t;
  }
  return i;
}
function Cn(i) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(i) === -1;
}
function lr(i, t, e, s) {
  if (!Cn(i))
    return;
  const n = t[i], o = e[i];
  T(n) && T(o) ? ve(n, o, s) : t[i] = Ge(o);
}
function ve(i, t, e) {
  const s = F(t) ? t : [
    t
  ], n = s.length;
  if (!T(i))
    return i;
  e = e || {};
  const o = e.merger || lr;
  let r;
  for (let a = 0; a < n; ++a) {
    if (r = s[a], !T(r))
      continue;
    const l = Object.keys(r);
    for (let c = 0, h = l.length; c < h; ++c)
      o(l[c], i, r, e);
  }
  return i;
}
function ce(i, t) {
  return ve(i, t, {
    merger: cr
  });
}
function cr(i, t, e) {
  if (!Cn(i))
    return;
  const s = t[i], n = e[i];
  T(s) && T(n) ? ce(s, n) : Object.prototype.hasOwnProperty.call(t, i) || (t[i] = Ge(n));
}
const ns = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (i) => i,
  // default resolvers
  x: (i) => i.x,
  y: (i) => i.y
};
function hr(i) {
  const t = i.split("."), e = [];
  let s = "";
  for (const n of t)
    s += n, s.endsWith("\\") ? s = s.slice(0, -1) + "." : (e.push(s), s = "");
  return e;
}
function dr(i) {
  const t = hr(i);
  return (e) => {
    for (const s of t) {
      if (s === "")
        break;
      e = e && e[s];
    }
    return e;
  };
}
function wt(i, t) {
  return (ns[t] || (ns[t] = dr(t)))(i);
}
function Wi(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
const Me = (i) => typeof i < "u", St = (i) => typeof i == "function", os = (i, t) => {
  if (i.size !== t.size)
    return !1;
  for (const e of i)
    if (!t.has(e))
      return !1;
  return !0;
};
function ur(i) {
  return i.type === "mouseup" || i.type === "click" || i.type === "contextmenu";
}
const W = Math.PI, z = 2 * W, fr = z + W, Ze = Number.POSITIVE_INFINITY, gr = W / 180, j = W / 2, Ot = W / 4, rs = W * 2 / 3, yt = Math.log10, ht = Math.sign;
function he(i, t, e) {
  return Math.abs(i - t) < e;
}
function as(i) {
  const t = Math.round(i);
  i = he(i, t, i / 1e3) ? t : i;
  const e = Math.pow(10, Math.floor(yt(i))), s = i / e;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * e;
}
function pr(i) {
  const t = [], e = Math.sqrt(i);
  let s;
  for (s = 1; s < e; s++)
    i % s === 0 && (t.push(s), t.push(i / s));
  return e === (e | 0) && t.push(e), t.sort((n, o) => n - o).pop(), t;
}
function Kt(i) {
  return !isNaN(parseFloat(i)) && isFinite(i);
}
function mr(i, t) {
  const e = Math.round(i);
  return e - t <= i && e + t >= i;
}
function An(i, t, e) {
  let s, n, o;
  for (s = 0, n = i.length; s < n; s++)
    o = i[s][e], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function at(i) {
  return i * (W / 180);
}
function Bi(i) {
  return i * (180 / W);
}
function ls(i) {
  if (!N(i))
    return;
  let t = 1, e = 0;
  for (; Math.round(i * t) / t !== i; )
    t *= 10, e++;
  return e;
}
function On(i, t) {
  const e = t.x - i.x, s = t.y - i.y, n = Math.sqrt(e * e + s * s);
  let o = Math.atan2(s, e);
  return o < -0.5 * W && (o += z), {
    angle: o,
    distance: n
  };
}
function Si(i, t) {
  return Math.sqrt(Math.pow(t.x - i.x, 2) + Math.pow(t.y - i.y, 2));
}
function br(i, t) {
  return (i - t + fr) % z - W;
}
function et(i) {
  return (i % z + z) % z;
}
function ke(i, t, e, s) {
  const n = et(i), o = et(t), r = et(e), a = et(o - n), l = et(r - n), c = et(n - o), h = et(n - r);
  return n === o || n === r || s && o === r || a > l && c < h;
}
function Y(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function xr(i) {
  return Y(i, -32768, 32767);
}
function gt(i, t, e, s = 1e-6) {
  return i >= Math.min(t, e) - s && i <= Math.max(t, e) + s;
}
function Vi(i, t, e) {
  e = e || ((r) => i[r] < t);
  let s = i.length - 1, n = 0, o;
  for (; s - n > 1; )
    o = n + s >> 1, e(o) ? n = o : s = o;
  return {
    lo: n,
    hi: s
  };
}
const pt = (i, t, e, s) => Vi(i, e, s ? (n) => {
  const o = i[n][t];
  return o < e || o === e && i[n + 1][t] === e;
} : (n) => i[n][t] < e), _r = (i, t, e) => Vi(i, e, (s) => i[s][t] >= e);
function yr(i, t, e) {
  let s = 0, n = i.length;
  for (; s < n && i[s] < t; )
    s++;
  for (; n > s && i[n - 1] > e; )
    n--;
  return s > 0 || n < i.length ? i.slice(s, n) : i;
}
const Tn = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function vr(i, t) {
  if (i._chartjs) {
    i._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(i, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        t
      ]
    }
  }), Tn.forEach((e) => {
    const s = "_onData" + Wi(e), n = i[e];
    Object.defineProperty(i, e, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const r = n.apply(this, o);
        return i._chartjs.listeners.forEach((a) => {
          typeof a[s] == "function" && a[s](...o);
        }), r;
      }
    });
  });
}
function cs(i, t) {
  const e = i._chartjs;
  if (!e)
    return;
  const s = e.listeners, n = s.indexOf(t);
  n !== -1 && s.splice(n, 1), !(s.length > 0) && (Tn.forEach((o) => {
    delete i[o];
  }), delete i._chartjs);
}
function Ln(i) {
  const t = new Set(i);
  return t.size === i.length ? i : Array.from(t);
}
const Rn = function() {
  return typeof window > "u" ? function(i) {
    return i();
  } : window.requestAnimationFrame;
}();
function En(i, t) {
  let e = [], s = !1;
  return function(...n) {
    e = n, s || (s = !0, Rn.call(window, () => {
      s = !1, i.apply(t, e);
    }));
  };
}
function Mr(i, t) {
  let e;
  return function(...s) {
    return t ? (clearTimeout(e), e = setTimeout(i, t, s)) : i.apply(this, s), t;
  };
}
const Ni = (i) => i === "start" ? "left" : i === "end" ? "right" : "center", q = (i, t, e) => i === "start" ? t : i === "end" ? e : (t + e) / 2, kr = (i, t, e, s) => i === (s ? "left" : "right") ? e : i === "center" ? (t + e) / 2 : t;
function In(i, t, e) {
  const s = t.length;
  let n = 0, o = s;
  if (i._sorted) {
    const { iScale: r, _parsed: a } = i, l = r.axis, { min: c, max: h, minDefined: d, maxDefined: u } = r.getUserBounds();
    d && (n = Y(Math.min(
      // @ts-expect-error Need to type _parsed
      pt(a, l, c).lo,
      // @ts-expect-error Need to fix types on _lookupByKey
      e ? s : pt(t, l, r.getPixelForValue(c)).lo
    ), 0, s - 1)), u ? o = Y(Math.max(
      // @ts-expect-error Need to type _parsed
      pt(a, r.axis, h, !0).hi + 1,
      // @ts-expect-error Need to fix types on _lookupByKey
      e ? 0 : pt(t, l, r.getPixelForValue(h), !0).hi + 1
    ), n, s) - n : o = s - n;
  }
  return {
    start: n,
    count: o
  };
}
function Fn(i) {
  const { xScale: t, yScale: e, _scaleRanges: s } = i, n = {
    xmin: t.min,
    xmax: t.max,
    ymin: e.min,
    ymax: e.max
  };
  if (!s)
    return i._scaleRanges = n, !0;
  const o = s.xmin !== t.min || s.xmax !== t.max || s.ymin !== e.min || s.ymax !== e.max;
  return Object.assign(s, n), o;
}
const Fe = (i) => i === 0 || i === 1, hs = (i, t, e) => -(Math.pow(2, 10 * (i -= 1)) * Math.sin((i - t) * z / e)), ds = (i, t, e) => Math.pow(2, -10 * i) * Math.sin((i - t) * z / e) + 1, de = {
  linear: (i) => i,
  easeInQuad: (i) => i * i,
  easeOutQuad: (i) => -i * (i - 2),
  easeInOutQuad: (i) => (i /= 0.5) < 1 ? 0.5 * i * i : -0.5 * (--i * (i - 2) - 1),
  easeInCubic: (i) => i * i * i,
  easeOutCubic: (i) => (i -= 1) * i * i + 1,
  easeInOutCubic: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i : 0.5 * ((i -= 2) * i * i + 2),
  easeInQuart: (i) => i * i * i * i,
  easeOutQuart: (i) => -((i -= 1) * i * i * i - 1),
  easeInOutQuart: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i * i : -0.5 * ((i -= 2) * i * i * i - 2),
  easeInQuint: (i) => i * i * i * i * i,
  easeOutQuint: (i) => (i -= 1) * i * i * i * i + 1,
  easeInOutQuint: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i * i * i : 0.5 * ((i -= 2) * i * i * i * i + 2),
  easeInSine: (i) => -Math.cos(i * j) + 1,
  easeOutSine: (i) => Math.sin(i * j),
  easeInOutSine: (i) => -0.5 * (Math.cos(W * i) - 1),
  easeInExpo: (i) => i === 0 ? 0 : Math.pow(2, 10 * (i - 1)),
  easeOutExpo: (i) => i === 1 ? 1 : -Math.pow(2, -10 * i) + 1,
  easeInOutExpo: (i) => Fe(i) ? i : i < 0.5 ? 0.5 * Math.pow(2, 10 * (i * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (i * 2 - 1)) + 2),
  easeInCirc: (i) => i >= 1 ? i : -(Math.sqrt(1 - i * i) - 1),
  easeOutCirc: (i) => Math.sqrt(1 - (i -= 1) * i),
  easeInOutCirc: (i) => (i /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - i * i) - 1) : 0.5 * (Math.sqrt(1 - (i -= 2) * i) + 1),
  easeInElastic: (i) => Fe(i) ? i : hs(i, 0.075, 0.3),
  easeOutElastic: (i) => Fe(i) ? i : ds(i, 0.075, 0.3),
  easeInOutElastic(i) {
    return Fe(i) ? i : i < 0.5 ? 0.5 * hs(i * 2, 0.1125, 0.45) : 0.5 + 0.5 * ds(i * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(i) {
    return i * i * ((1.70158 + 1) * i - 1.70158);
  },
  easeOutBack(i) {
    return (i -= 1) * i * ((1.70158 + 1) * i + 1.70158) + 1;
  },
  easeInOutBack(i) {
    let t = 1.70158;
    return (i /= 0.5) < 1 ? 0.5 * (i * i * (((t *= 1.525) + 1) * i - t)) : 0.5 * ((i -= 2) * i * (((t *= 1.525) + 1) * i + t) + 2);
  },
  easeInBounce: (i) => 1 - de.easeOutBounce(1 - i),
  easeOutBounce(i) {
    return i < 1 / 2.75 ? 7.5625 * i * i : i < 2 / 2.75 ? 7.5625 * (i -= 1.5 / 2.75) * i + 0.75 : i < 2.5 / 2.75 ? 7.5625 * (i -= 2.25 / 2.75) * i + 0.9375 : 7.5625 * (i -= 2.625 / 2.75) * i + 0.984375;
  },
  easeInOutBounce: (i) => i < 0.5 ? de.easeInBounce(i * 2) * 0.5 : de.easeOutBounce(i * 2 - 1) * 0.5 + 0.5
};
function Hi(i) {
  if (i && typeof i == "object") {
    const t = i.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function us(i) {
  return Hi(i) ? i : new ye(i);
}
function fi(i) {
  return Hi(i) ? i : new ye(i).saturate(0.5).darken(0.1).hexString();
}
const wr = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Sr = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Pr(i) {
  i.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), i.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (t) => t !== "onProgress" && t !== "onComplete" && t !== "fn"
  }), i.set("animations", {
    colors: {
      type: "color",
      properties: Sr
    },
    numbers: {
      type: "number",
      properties: wr
    }
  }), i.describe("animations", {
    _fallback: "animation"
  }), i.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (t) => t | 0
        }
      }
    }
  });
}
function Dr(i) {
  i.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const fs = /* @__PURE__ */ new Map();
function Cr(i, t) {
  t = t || {};
  const e = i + JSON.stringify(t);
  let s = fs.get(e);
  return s || (s = new Intl.NumberFormat(i, t), fs.set(e, s)), s;
}
function Ae(i, t, e) {
  return Cr(t, e).format(i);
}
const zn = {
  values(i) {
    return F(i) ? i : "" + i;
  },
  numeric(i, t, e) {
    if (i === 0)
      return "0";
    const s = this.chart.options.locale;
    let n, o = i;
    if (e.length > 1) {
      const c = Math.max(Math.abs(e[0].value), Math.abs(e[e.length - 1].value));
      (c < 1e-4 || c > 1e15) && (n = "scientific"), o = Ar(i, e);
    }
    const r = yt(Math.abs(o)), a = isNaN(r) ? 1 : Math.max(Math.min(-1 * Math.floor(r), 20), 0), l = {
      notation: n,
      minimumFractionDigits: a,
      maximumFractionDigits: a
    };
    return Object.assign(l, this.options.ticks.format), Ae(i, s, l);
  },
  logarithmic(i, t, e) {
    if (i === 0)
      return "0";
    const s = e[t].significand || i / Math.pow(10, Math.floor(yt(i)));
    return [
      1,
      2,
      3,
      5,
      10,
      15
    ].includes(s) || t > 0.8 * e.length ? zn.numeric.call(this, i, t, e) : "";
  }
};
function Ar(i, t) {
  let e = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(e) >= 1 && i !== Math.floor(i) && (e = i - Math.floor(i)), e;
}
var Oe = {
  formatters: zn
};
function Or(i) {
  i.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (t, e) => e.lineWidth,
      tickColor: (t, e) => e.color,
      offset: !1
    },
    border: {
      display: !0,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Oe.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), i.route("scale.ticks", "color", "", "color"), i.route("scale.grid", "color", "", "borderColor"), i.route("scale.border", "color", "", "borderColor"), i.route("scale.title", "color", "", "color"), i.describe("scale", {
    _fallback: !1,
    _scriptable: (t) => !t.startsWith("before") && !t.startsWith("after") && t !== "callback" && t !== "parser",
    _indexable: (t) => t !== "borderDash" && t !== "tickBorderDash" && t !== "dash"
  }), i.describe("scales", {
    _fallback: "scale"
  }), i.describe("scale.ticks", {
    _scriptable: (t) => t !== "backdropPadding" && t !== "callback",
    _indexable: (t) => t !== "backdropPadding"
  });
}
const Wt = /* @__PURE__ */ Object.create(null), Pi = /* @__PURE__ */ Object.create(null);
function ue(i, t) {
  if (!t)
    return i;
  const e = t.split(".");
  for (let s = 0, n = e.length; s < n; ++s) {
    const o = e[s];
    i = i[o] || (i[o] = /* @__PURE__ */ Object.create(null));
  }
  return i;
}
function gi(i, t, e) {
  return typeof t == "string" ? ve(ue(i, t), e) : ve(ue(i, ""), t);
}
class Tr {
  constructor(t, e) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (s) => s.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (s, n) => fi(n.backgroundColor), this.hoverBorderColor = (s, n) => fi(n.borderColor), this.hoverColor = (s, n) => fi(n.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(e);
  }
  set(t, e) {
    return gi(this, t, e);
  }
  get(t) {
    return ue(this, t);
  }
  describe(t, e) {
    return gi(Pi, t, e);
  }
  override(t, e) {
    return gi(Wt, t, e);
  }
  route(t, e, s, n) {
    const o = ue(this, t), r = ue(this, s), a = "_" + e;
    Object.defineProperties(o, {
      [a]: {
        value: o[e],
        writable: !0
      },
      [e]: {
        enumerable: !0,
        get() {
          const l = this[a], c = r[n];
          return T(l) ? Object.assign({}, c, l) : A(l, c);
        },
        set(l) {
          this[a] = l;
        }
      }
    });
  }
  apply(t) {
    t.forEach((e) => e(this));
  }
}
var V = /* @__PURE__ */ new Tr({
  _scriptable: (i) => !i.startsWith("on"),
  _indexable: (i) => i !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  Pr,
  Dr,
  Or
]);
function Lr(i) {
  return !i || L(i.size) || L(i.family) ? null : (i.style ? i.style + " " : "") + (i.weight ? i.weight + " " : "") + i.size + "px " + i.family;
}
function Je(i, t, e, s, n) {
  let o = t[n];
  return o || (o = t[n] = i.measureText(n).width, e.push(n)), o > s && (s = o), s;
}
function Rr(i, t, e, s) {
  s = s || {};
  let n = s.data = s.data || {}, o = s.garbageCollect = s.garbageCollect || [];
  s.font !== t && (n = s.data = {}, o = s.garbageCollect = [], s.font = t), i.save(), i.font = t;
  let r = 0;
  const a = e.length;
  let l, c, h, d, u;
  for (l = 0; l < a; l++)
    if (d = e[l], d != null && !F(d))
      r = Je(i, n, o, r, d);
    else if (F(d))
      for (c = 0, h = d.length; c < h; c++)
        u = d[c], u != null && !F(u) && (r = Je(i, n, o, r, u));
  i.restore();
  const f = o.length / 2;
  if (f > e.length) {
    for (l = 0; l < f; l++)
      delete n[o[l]];
    o.splice(0, f);
  }
  return r;
}
function Tt(i, t, e) {
  const s = i.currentDevicePixelRatio, n = e !== 0 ? Math.max(e / 2, 0.5) : 0;
  return Math.round((t - n) * s) / s + n;
}
function gs(i, t) {
  t = t || i.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, i.width, i.height), t.restore();
}
function Di(i, t, e, s) {
  Wn(i, t, e, s, null);
}
function Wn(i, t, e, s, n) {
  let o, r, a, l, c, h, d, u;
  const f = t.pointStyle, g = t.rotation, p = t.radius;
  let m = (g || 0) * gr;
  if (f && typeof f == "object" && (o = f.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    i.save(), i.translate(e, s), i.rotate(m), i.drawImage(f, -f.width / 2, -f.height / 2, f.width, f.height), i.restore();
    return;
  }
  if (!(isNaN(p) || p <= 0)) {
    switch (i.beginPath(), f) {
      default:
        n ? i.ellipse(e, s, n / 2, p, 0, 0, z) : i.arc(e, s, p, 0, z), i.closePath();
        break;
      case "triangle":
        h = n ? n / 2 : p, i.moveTo(e + Math.sin(m) * h, s - Math.cos(m) * p), m += rs, i.lineTo(e + Math.sin(m) * h, s - Math.cos(m) * p), m += rs, i.lineTo(e + Math.sin(m) * h, s - Math.cos(m) * p), i.closePath();
        break;
      case "rectRounded":
        c = p * 0.516, l = p - c, r = Math.cos(m + Ot) * l, d = Math.cos(m + Ot) * (n ? n / 2 - c : l), a = Math.sin(m + Ot) * l, u = Math.sin(m + Ot) * (n ? n / 2 - c : l), i.arc(e - d, s - a, c, m - W, m - j), i.arc(e + u, s - r, c, m - j, m), i.arc(e + d, s + a, c, m, m + j), i.arc(e - u, s + r, c, m + j, m + W), i.closePath();
        break;
      case "rect":
        if (!g) {
          l = Math.SQRT1_2 * p, h = n ? n / 2 : l, i.rect(e - h, s - l, 2 * h, 2 * l);
          break;
        }
        m += Ot;
      case "rectRot":
        d = Math.cos(m) * (n ? n / 2 : p), r = Math.cos(m) * p, a = Math.sin(m) * p, u = Math.sin(m) * (n ? n / 2 : p), i.moveTo(e - d, s - a), i.lineTo(e + u, s - r), i.lineTo(e + d, s + a), i.lineTo(e - u, s + r), i.closePath();
        break;
      case "crossRot":
        m += Ot;
      case "cross":
        d = Math.cos(m) * (n ? n / 2 : p), r = Math.cos(m) * p, a = Math.sin(m) * p, u = Math.sin(m) * (n ? n / 2 : p), i.moveTo(e - d, s - a), i.lineTo(e + d, s + a), i.moveTo(e + u, s - r), i.lineTo(e - u, s + r);
        break;
      case "star":
        d = Math.cos(m) * (n ? n / 2 : p), r = Math.cos(m) * p, a = Math.sin(m) * p, u = Math.sin(m) * (n ? n / 2 : p), i.moveTo(e - d, s - a), i.lineTo(e + d, s + a), i.moveTo(e + u, s - r), i.lineTo(e - u, s + r), m += Ot, d = Math.cos(m) * (n ? n / 2 : p), r = Math.cos(m) * p, a = Math.sin(m) * p, u = Math.sin(m) * (n ? n / 2 : p), i.moveTo(e - d, s - a), i.lineTo(e + d, s + a), i.moveTo(e + u, s - r), i.lineTo(e - u, s + r);
        break;
      case "line":
        r = n ? n / 2 : Math.cos(m) * p, a = Math.sin(m) * p, i.moveTo(e - r, s - a), i.lineTo(e + r, s + a);
        break;
      case "dash":
        i.moveTo(e, s), i.lineTo(e + Math.cos(m) * (n ? n / 2 : p), s + Math.sin(m) * p);
        break;
      case !1:
        i.closePath();
        break;
    }
    i.fill(), t.borderWidth > 0 && i.stroke();
  }
}
function mt(i, t, e) {
  return e = e || 0.5, !t || i && i.x > t.left - e && i.x < t.right + e && i.y > t.top - e && i.y < t.bottom + e;
}
function li(i, t) {
  i.save(), i.beginPath(), i.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), i.clip();
}
function ci(i) {
  i.restore();
}
function Er(i, t, e, s, n) {
  if (!t)
    return i.lineTo(e.x, e.y);
  if (n === "middle") {
    const o = (t.x + e.x) / 2;
    i.lineTo(o, t.y), i.lineTo(o, e.y);
  } else
    n === "after" != !!s ? i.lineTo(t.x, e.y) : i.lineTo(e.x, t.y);
  i.lineTo(e.x, e.y);
}
function Ir(i, t, e, s) {
  if (!t)
    return i.lineTo(e.x, e.y);
  i.bezierCurveTo(s ? t.cp1x : t.cp2x, s ? t.cp1y : t.cp2y, s ? e.cp2x : e.cp1x, s ? e.cp2y : e.cp1y, e.x, e.y);
}
function Fr(i, t) {
  t.translation && i.translate(t.translation[0], t.translation[1]), L(t.rotation) || i.rotate(t.rotation), t.color && (i.fillStyle = t.color), t.textAlign && (i.textAlign = t.textAlign), t.textBaseline && (i.textBaseline = t.textBaseline);
}
function zr(i, t, e, s, n) {
  if (n.strikethrough || n.underline) {
    const o = i.measureText(s), r = t - o.actualBoundingBoxLeft, a = t + o.actualBoundingBoxRight, l = e - o.actualBoundingBoxAscent, c = e + o.actualBoundingBoxDescent, h = n.strikethrough ? (l + c) / 2 : c;
    i.strokeStyle = i.fillStyle, i.beginPath(), i.lineWidth = n.decorationWidth || 2, i.moveTo(r, h), i.lineTo(a, h), i.stroke();
  }
}
function Wr(i, t) {
  const e = i.fillStyle;
  i.fillStyle = t.color, i.fillRect(t.left, t.top, t.width, t.height), i.fillStyle = e;
}
function Bt(i, t, e, s, n, o = {}) {
  const r = F(t) ? t : [
    t
  ], a = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, c;
  for (i.save(), i.font = n.string, Fr(i, o), l = 0; l < r.length; ++l)
    c = r[l], o.backdrop && Wr(i, o.backdrop), a && (o.strokeColor && (i.strokeStyle = o.strokeColor), L(o.strokeWidth) || (i.lineWidth = o.strokeWidth), i.strokeText(c, e, s, o.maxWidth)), i.fillText(c, e, s, o.maxWidth), zr(i, e, s, c, o), s += Number(n.lineHeight);
  i.restore();
}
function we(i, t) {
  const { x: e, y: s, w: n, h: o, radius: r } = t;
  i.arc(e + r.topLeft, s + r.topLeft, r.topLeft, 1.5 * W, W, !0), i.lineTo(e, s + o - r.bottomLeft), i.arc(e + r.bottomLeft, s + o - r.bottomLeft, r.bottomLeft, W, j, !0), i.lineTo(e + n - r.bottomRight, s + o), i.arc(e + n - r.bottomRight, s + o - r.bottomRight, r.bottomRight, j, 0, !0), i.lineTo(e + n, s + r.topRight), i.arc(e + n - r.topRight, s + r.topRight, r.topRight, 0, -j, !0), i.lineTo(e + r.topLeft, s);
}
const Br = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Vr = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Nr(i, t) {
  const e = ("" + i).match(Br);
  if (!e || e[1] === "normal")
    return t * 1.2;
  switch (i = +e[2], e[3]) {
    case "px":
      return i;
    case "%":
      i /= 100;
      break;
  }
  return t * i;
}
const Hr = (i) => +i || 0;
function ji(i, t) {
  const e = {}, s = T(t), n = s ? Object.keys(t) : t, o = T(i) ? s ? (r) => A(i[r], i[t[r]]) : (r) => i[r] : () => i;
  for (const r of n)
    e[r] = Hr(o(r));
  return e;
}
function Bn(i) {
  return ji(i, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Ft(i) {
  return ji(i, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function G(i) {
  const t = Bn(i);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function $(i, t) {
  i = i || {}, t = t || V.font;
  let e = A(i.size, t.size);
  typeof e == "string" && (e = parseInt(e, 10));
  let s = A(i.style, t.style);
  s && !("" + s).match(Vr) && (console.warn('Invalid font style specified: "' + s + '"'), s = void 0);
  const n = {
    family: A(i.family, t.family),
    lineHeight: Nr(A(i.lineHeight, t.lineHeight), e),
    size: e,
    style: s,
    weight: A(i.weight, t.weight),
    string: ""
  };
  return n.string = Lr(n), n;
}
function re(i, t, e, s) {
  let n = !0, o, r, a;
  for (o = 0, r = i.length; o < r; ++o)
    if (a = i[o], a !== void 0 && (t !== void 0 && typeof a == "function" && (a = a(t), n = !1), e !== void 0 && F(a) && (a = a[e % a.length], n = !1), a !== void 0))
      return s && !n && (s.cacheable = !1), a;
}
function jr(i, t, e) {
  const { min: s, max: n } = i, o = Dn(t, (n - s) / 2), r = (a, l) => e && a === 0 ? 0 : a + l;
  return {
    min: r(s, -Math.abs(o)),
    max: r(n, o)
  };
}
function Pt(i, t) {
  return Object.assign(Object.create(i), t);
}
function $i(i, t = [
  ""
], e, s, n = () => i[0]) {
  const o = e || i;
  typeof s > "u" && (s = jn("_fallback", i));
  const r = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: i,
    _rootScopes: o,
    _fallback: s,
    _getTarget: n,
    override: (a) => $i([
      a,
      ...i
    ], t, o, s)
  };
  return new Proxy(r, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(a, l) {
      return delete a[l], delete a._keys, delete i[0][l], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(a, l) {
      return Nn(a, l, () => Zr(l, t, i, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(a, l) {
      return Reflect.getOwnPropertyDescriptor(a._scopes[0], l);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(a, l) {
      return ms(a).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(a) {
      return ms(a);
    },
    /**
    * A trap for setting property values.
    */
    set(a, l, c) {
      const h = a._storage || (a._storage = n());
      return a[l] = h[l] = c, delete a._keys, !0;
    }
  });
}
function qt(i, t, e, s) {
  const n = {
    _cacheable: !1,
    _proxy: i,
    _context: t,
    _subProxy: e,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Vn(i, s),
    setContext: (o) => qt(i, o, e, s),
    override: (o) => qt(i.override(o), t, e, s)
  };
  return new Proxy(n, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, r) {
      return delete o[r], delete i[r], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, r, a) {
      return Nn(o, r, () => Yr(o, r, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(o, r) {
      return o._descriptors.allKeys ? Reflect.has(i, r) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(i, r);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i);
    },
    /**
    * A trap for the in operator.
    */
    has(o, r) {
      return Reflect.has(i, r);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(i);
    },
    /**
    * A trap for setting property values.
    */
    set(o, r, a) {
      return i[r] = a, delete o[r], !0;
    }
  });
}
function Vn(i, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: e = t.scriptable, _indexable: s = t.indexable, _allKeys: n = t.allKeys } = i;
  return {
    allKeys: n,
    scriptable: e,
    indexable: s,
    isScriptable: St(e) ? e : () => e,
    isIndexable: St(s) ? s : () => s
  };
}
const $r = (i, t) => i ? i + Wi(t) : t, Yi = (i, t) => T(t) && i !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Nn(i, t, e) {
  if (Object.prototype.hasOwnProperty.call(i, t))
    return i[t];
  const s = e();
  return i[t] = s, s;
}
function Yr(i, t, e) {
  const { _proxy: s, _context: n, _subProxy: o, _descriptors: r } = i;
  let a = s[t];
  return St(a) && r.isScriptable(t) && (a = Ur(t, a, i, e)), F(a) && a.length && (a = Xr(t, a, i, r.isIndexable)), Yi(t, a) && (a = qt(a, n, o && o[t], r)), a;
}
function Ur(i, t, e, s) {
  const { _proxy: n, _context: o, _subProxy: r, _stack: a } = e;
  if (a.has(i))
    throw new Error("Recursion detected: " + Array.from(a).join("->") + "->" + i);
  a.add(i);
  let l = t(o, r || s);
  return a.delete(i), Yi(i, l) && (l = Ui(n._scopes, n, i, l)), l;
}
function Xr(i, t, e, s) {
  const { _proxy: n, _context: o, _subProxy: r, _descriptors: a } = e;
  if (typeof o.index < "u" && s(i))
    return t[o.index % t.length];
  if (T(t[0])) {
    const l = t, c = n._scopes.filter((h) => h !== l);
    t = [];
    for (const h of l) {
      const d = Ui(c, n, i, h);
      t.push(qt(d, o, r && r[i], a));
    }
  }
  return t;
}
function Hn(i, t, e) {
  return St(i) ? i(t, e) : i;
}
const Kr = (i, t) => i === !0 ? t : typeof i == "string" ? wt(t, i) : void 0;
function qr(i, t, e, s, n) {
  for (const o of t) {
    const r = Kr(e, o);
    if (r) {
      i.add(r);
      const a = Hn(r._fallback, e, n);
      if (typeof a < "u" && a !== e && a !== s)
        return a;
    } else if (r === !1 && typeof s < "u" && e !== s)
      return null;
  }
  return !1;
}
function Ui(i, t, e, s) {
  const n = t._rootScopes, o = Hn(t._fallback, e, s), r = [
    ...i,
    ...n
  ], a = /* @__PURE__ */ new Set();
  a.add(s);
  let l = ps(a, r, e, o || e, s);
  return l === null || typeof o < "u" && o !== e && (l = ps(a, r, o, l, s), l === null) ? !1 : $i(Array.from(a), [
    ""
  ], n, o, () => Gr(t, e, s));
}
function ps(i, t, e, s, n) {
  for (; e; )
    e = qr(i, t, e, s, n);
  return e;
}
function Gr(i, t, e) {
  const s = i._getTarget();
  t in s || (s[t] = {});
  const n = s[t];
  return F(n) && T(e) ? e : n || {};
}
function Zr(i, t, e, s) {
  let n;
  for (const o of t)
    if (n = jn($r(o, i), e), typeof n < "u")
      return Yi(i, n) ? Ui(e, s, i, n) : n;
}
function jn(i, t) {
  for (const e of t) {
    if (!e)
      continue;
    const s = e[i];
    if (typeof s < "u")
      return s;
  }
}
function ms(i) {
  let t = i._keys;
  return t || (t = i._keys = Jr(i._scopes)), t;
}
function Jr(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i)
    for (const s of Object.keys(e).filter((n) => !n.startsWith("_")))
      t.add(s);
  return Array.from(t);
}
function $n(i, t, e, s) {
  const { iScale: n } = i, { key: o = "r" } = this._parsing, r = new Array(s);
  let a, l, c, h;
  for (a = 0, l = s; a < l; ++a)
    c = a + e, h = t[c], r[a] = {
      r: n.parse(wt(h, o), c)
    };
  return r;
}
const Qr = Number.EPSILON || 1e-14, Gt = (i, t) => t < i.length && !i[t].skip && i[t], Yn = (i) => i === "x" ? "y" : "x";
function ta(i, t, e, s) {
  const n = i.skip ? t : i, o = t, r = e.skip ? t : e, a = Si(o, n), l = Si(r, o);
  let c = a / (a + l), h = l / (a + l);
  c = isNaN(c) ? 0 : c, h = isNaN(h) ? 0 : h;
  const d = s * c, u = s * h;
  return {
    previous: {
      x: o.x - d * (r.x - n.x),
      y: o.y - d * (r.y - n.y)
    },
    next: {
      x: o.x + u * (r.x - n.x),
      y: o.y + u * (r.y - n.y)
    }
  };
}
function ea(i, t, e) {
  const s = i.length;
  let n, o, r, a, l, c = Gt(i, 0);
  for (let h = 0; h < s - 1; ++h)
    if (l = c, c = Gt(i, h + 1), !(!l || !c)) {
      if (he(t[h], 0, Qr)) {
        e[h] = e[h + 1] = 0;
        continue;
      }
      n = e[h] / t[h], o = e[h + 1] / t[h], a = Math.pow(n, 2) + Math.pow(o, 2), !(a <= 9) && (r = 3 / Math.sqrt(a), e[h] = n * r * t[h], e[h + 1] = o * r * t[h]);
    }
}
function ia(i, t, e = "x") {
  const s = Yn(e), n = i.length;
  let o, r, a, l = Gt(i, 0);
  for (let c = 0; c < n; ++c) {
    if (r = a, a = l, l = Gt(i, c + 1), !a)
      continue;
    const h = a[e], d = a[s];
    r && (o = (h - r[e]) / 3, a[`cp1${e}`] = h - o, a[`cp1${s}`] = d - o * t[c]), l && (o = (l[e] - h) / 3, a[`cp2${e}`] = h + o, a[`cp2${s}`] = d + o * t[c]);
  }
}
function sa(i, t = "x") {
  const e = Yn(t), s = i.length, n = Array(s).fill(0), o = Array(s);
  let r, a, l, c = Gt(i, 0);
  for (r = 0; r < s; ++r)
    if (a = l, l = c, c = Gt(i, r + 1), !!l) {
      if (c) {
        const h = c[t] - l[t];
        n[r] = h !== 0 ? (c[e] - l[e]) / h : 0;
      }
      o[r] = a ? c ? ht(n[r - 1]) !== ht(n[r]) ? 0 : (n[r - 1] + n[r]) / 2 : n[r - 1] : n[r];
    }
  ea(i, n, o), ia(i, o, t);
}
function ze(i, t, e) {
  return Math.max(Math.min(i, e), t);
}
function na(i, t) {
  let e, s, n, o, r, a = mt(i[0], t);
  for (e = 0, s = i.length; e < s; ++e)
    r = o, o = a, a = e < s - 1 && mt(i[e + 1], t), o && (n = i[e], r && (n.cp1x = ze(n.cp1x, t.left, t.right), n.cp1y = ze(n.cp1y, t.top, t.bottom)), a && (n.cp2x = ze(n.cp2x, t.left, t.right), n.cp2y = ze(n.cp2y, t.top, t.bottom)));
}
function oa(i, t, e, s, n) {
  let o, r, a, l;
  if (t.spanGaps && (i = i.filter((c) => !c.skip)), t.cubicInterpolationMode === "monotone")
    sa(i, n);
  else {
    let c = s ? i[i.length - 1] : i[0];
    for (o = 0, r = i.length; o < r; ++o)
      a = i[o], l = ta(c, a, i[Math.min(o + 1, r - (s ? 0 : 1)) % r], t.tension), a.cp1x = l.previous.x, a.cp1y = l.previous.y, a.cp2x = l.next.x, a.cp2y = l.next.y, c = a;
  }
  t.capBezierPoints && na(i, e);
}
function Xi() {
  return typeof window < "u" && typeof document < "u";
}
function Ki(i) {
  let t = i.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function Qe(i, t, e) {
  let s;
  return typeof i == "string" ? (s = parseInt(i, 10), i.indexOf("%") !== -1 && (s = s / 100 * t.parentNode[e])) : s = i, s;
}
const hi = (i) => i.ownerDocument.defaultView.getComputedStyle(i, null);
function ra(i, t) {
  return hi(i).getPropertyValue(t);
}
const aa = [
  "top",
  "right",
  "bottom",
  "left"
];
function zt(i, t, e) {
  const s = {};
  e = e ? "-" + e : "";
  for (let n = 0; n < 4; n++) {
    const o = aa[n];
    s[o] = parseFloat(i[t + "-" + o + e]) || 0;
  }
  return s.width = s.left + s.right, s.height = s.top + s.bottom, s;
}
const la = (i, t, e) => (i > 0 || t > 0) && (!e || !e.shadowRoot);
function ca(i, t) {
  const e = i.touches, s = e && e.length ? e[0] : i, { offsetX: n, offsetY: o } = s;
  let r = !1, a, l;
  if (la(n, o, i.target))
    a = n, l = o;
  else {
    const c = t.getBoundingClientRect();
    a = s.clientX - c.left, l = s.clientY - c.top, r = !0;
  }
  return {
    x: a,
    y: l,
    box: r
  };
}
function Et(i, t) {
  if ("native" in i)
    return i;
  const { canvas: e, currentDevicePixelRatio: s } = t, n = hi(e), o = n.boxSizing === "border-box", r = zt(n, "padding"), a = zt(n, "border", "width"), { x: l, y: c, box: h } = ca(i, e), d = r.left + (h && a.left), u = r.top + (h && a.top);
  let { width: f, height: g } = t;
  return o && (f -= r.width + a.width, g -= r.height + a.height), {
    x: Math.round((l - d) / f * e.width / s),
    y: Math.round((c - u) / g * e.height / s)
  };
}
function ha(i, t, e) {
  let s, n;
  if (t === void 0 || e === void 0) {
    const o = Ki(i);
    if (!o)
      t = i.clientWidth, e = i.clientHeight;
    else {
      const r = o.getBoundingClientRect(), a = hi(o), l = zt(a, "border", "width"), c = zt(a, "padding");
      t = r.width - c.width - l.width, e = r.height - c.height - l.height, s = Qe(a.maxWidth, o, "clientWidth"), n = Qe(a.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: e,
    maxWidth: s || Ze,
    maxHeight: n || Ze
  };
}
const We = (i) => Math.round(i * 10) / 10;
function da(i, t, e, s) {
  const n = hi(i), o = zt(n, "margin"), r = Qe(n.maxWidth, i, "clientWidth") || Ze, a = Qe(n.maxHeight, i, "clientHeight") || Ze, l = ha(i, t, e);
  let { width: c, height: h } = l;
  if (n.boxSizing === "content-box") {
    const u = zt(n, "border", "width"), f = zt(n, "padding");
    c -= f.width + u.width, h -= f.height + u.height;
  }
  return c = Math.max(0, c - o.width), h = Math.max(0, s ? c / s : h - o.height), c = We(Math.min(c, r, l.maxWidth)), h = We(Math.min(h, a, l.maxHeight)), c && !h && (h = We(c / 2)), (t !== void 0 || e !== void 0) && s && l.height && h > l.height && (h = l.height, c = We(Math.floor(h * s))), {
    width: c,
    height: h
  };
}
function bs(i, t, e) {
  const s = t || 1, n = Math.floor(i.height * s), o = Math.floor(i.width * s);
  i.height = Math.floor(i.height), i.width = Math.floor(i.width);
  const r = i.canvas;
  return r.style && (e || !r.style.height && !r.style.width) && (r.style.height = `${i.height}px`, r.style.width = `${i.width}px`), i.currentDevicePixelRatio !== s || r.height !== n || r.width !== o ? (i.currentDevicePixelRatio = s, r.height = n, r.width = o, i.ctx.setTransform(s, 0, 0, s, 0, 0), !0) : !1;
}
const ua = function() {
  let i = !1;
  try {
    const t = {
      get passive() {
        return i = !0, !1;
      }
    };
    Xi() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return i;
}();
function xs(i, t) {
  const e = ra(i, t), s = e && e.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
}
function It(i, t, e, s) {
  return {
    x: i.x + e * (t.x - i.x),
    y: i.y + e * (t.y - i.y)
  };
}
function fa(i, t, e, s) {
  return {
    x: i.x + e * (t.x - i.x),
    y: s === "middle" ? e < 0.5 ? i.y : t.y : s === "after" ? e < 1 ? i.y : t.y : e > 0 ? t.y : i.y
  };
}
function ga(i, t, e, s) {
  const n = {
    x: i.cp2x,
    y: i.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, r = It(i, n, e), a = It(n, o, e), l = It(o, t, e), c = It(r, a, e), h = It(a, l, e);
  return It(c, h, e);
}
const pa = function(i, t) {
  return {
    x(e) {
      return i + i + t - e;
    },
    setWidth(e) {
      t = e;
    },
    textAlign(e) {
      return e === "center" ? e : e === "right" ? "left" : "right";
    },
    xPlus(e, s) {
      return e - s;
    },
    leftForLtr(e, s) {
      return e - s;
    }
  };
}, ma = function() {
  return {
    x(i) {
      return i;
    },
    setWidth(i) {
    },
    textAlign(i) {
      return i;
    },
    xPlus(i, t) {
      return i + t;
    },
    leftForLtr(i, t) {
      return i;
    }
  };
};
function Ut(i, t, e) {
  return i ? pa(t, e) : ma();
}
function Un(i, t) {
  let e, s;
  (t === "ltr" || t === "rtl") && (e = i.canvas.style, s = [
    e.getPropertyValue("direction"),
    e.getPropertyPriority("direction")
  ], e.setProperty("direction", t, "important"), i.prevTextDirection = s);
}
function Xn(i, t) {
  t !== void 0 && (delete i.prevTextDirection, i.canvas.style.setProperty("direction", t[0], t[1]));
}
function Kn(i) {
  return i === "angle" ? {
    between: ke,
    compare: br,
    normalize: et
  } : {
    between: gt,
    compare: (t, e) => t - e,
    normalize: (t) => t
  };
}
function _s({ start: i, end: t, count: e, loop: s, style: n }) {
  return {
    start: i % e,
    end: t % e,
    loop: s && (t - i + 1) % e === 0,
    style: n
  };
}
function ba(i, t, e) {
  const { property: s, start: n, end: o } = e, { between: r, normalize: a } = Kn(s), l = t.length;
  let { start: c, end: h, loop: d } = i, u, f;
  if (d) {
    for (c += l, h += l, u = 0, f = l; u < f && r(a(t[c % l][s]), n, o); ++u)
      c--, h--;
    c %= l, h %= l;
  }
  return h < c && (h += l), {
    start: c,
    end: h,
    loop: d,
    style: i.style
  };
}
function qn(i, t, e) {
  if (!e)
    return [
      i
    ];
  const { property: s, start: n, end: o } = e, r = t.length, { compare: a, between: l, normalize: c } = Kn(s), { start: h, end: d, loop: u, style: f } = ba(i, t, e), g = [];
  let p = !1, m = null, b, x, v;
  const y = () => l(n, v, b) && a(n, v) !== 0, _ = () => a(o, b) === 0 || l(o, v, b), w = () => p || y(), k = () => !p || _();
  for (let M = h, P = h; M <= d; ++M)
    x = t[M % r], !x.skip && (b = c(x[s]), b !== v && (p = l(b, n, o), m === null && w() && (m = a(b, n) === 0 ? M : P), m !== null && k() && (g.push(_s({
      start: m,
      end: M,
      loop: u,
      count: r,
      style: f
    })), m = null), P = M, v = b));
  return m !== null && g.push(_s({
    start: m,
    end: d,
    loop: u,
    count: r,
    style: f
  })), g;
}
function Gn(i, t) {
  const e = [], s = i.segments;
  for (let n = 0; n < s.length; n++) {
    const o = qn(s[n], i.points, t);
    o.length && e.push(...o);
  }
  return e;
}
function xa(i, t, e, s) {
  let n = 0, o = t - 1;
  if (e && !s)
    for (; n < t && !i[n].skip; )
      n++;
  for (; n < t && i[n].skip; )
    n++;
  for (n %= t, e && (o += n); o > n && i[o % t].skip; )
    o--;
  return o %= t, {
    start: n,
    end: o
  };
}
function _a(i, t, e, s) {
  const n = i.length, o = [];
  let r = t, a = i[t], l;
  for (l = t + 1; l <= e; ++l) {
    const c = i[l % n];
    c.skip || c.stop ? a.skip || (s = !1, o.push({
      start: t % n,
      end: (l - 1) % n,
      loop: s
    }), t = r = c.stop ? l : null) : (r = l, a.skip && (t = l)), a = c;
  }
  return r !== null && o.push({
    start: t % n,
    end: r % n,
    loop: s
  }), o;
}
function ya(i, t) {
  const e = i.points, s = i.options.spanGaps, n = e.length;
  if (!n)
    return [];
  const o = !!i._loop, { start: r, end: a } = xa(e, n, o, s);
  if (s === !0)
    return ys(i, [
      {
        start: r,
        end: a,
        loop: o
      }
    ], e, t);
  const l = a < r ? a + n : a, c = !!i._fullLoop && r === 0 && a === n - 1;
  return ys(i, _a(e, r, l, c), e, t);
}
function ys(i, t, e, s) {
  return !s || !s.setContext || !e ? t : va(i, t, e, s);
}
function va(i, t, e, s) {
  const n = i._chart.getContext(), o = vs(i.options), { _datasetIndex: r, options: { spanGaps: a } } = i, l = e.length, c = [];
  let h = o, d = t[0].start, u = d;
  function f(g, p, m, b) {
    const x = a ? -1 : 1;
    if (g !== p) {
      for (g += l; e[g % l].skip; )
        g -= x;
      for (; e[p % l].skip; )
        p += x;
      g % l !== p % l && (c.push({
        start: g % l,
        end: p % l,
        loop: m,
        style: b
      }), h = b, d = p % l);
    }
  }
  for (const g of t) {
    d = a ? d : g.start;
    let p = e[d % l], m;
    for (u = d + 1; u <= g.end; u++) {
      const b = e[u % l];
      m = vs(s.setContext(Pt(n, {
        type: "segment",
        p0: p,
        p1: b,
        p0DataIndex: (u - 1) % l,
        p1DataIndex: u % l,
        datasetIndex: r
      }))), Ma(m, h) && f(d, u - 1, g.loop, h), p = b, h = m;
    }
    d < u - 1 && f(d, u - 1, g.loop, h);
  }
  return c;
}
function vs(i) {
  return {
    backgroundColor: i.backgroundColor,
    borderCapStyle: i.borderCapStyle,
    borderDash: i.borderDash,
    borderDashOffset: i.borderDashOffset,
    borderJoinStyle: i.borderJoinStyle,
    borderWidth: i.borderWidth,
    borderColor: i.borderColor
  };
}
function Ma(i, t) {
  if (!t)
    return !1;
  const e = [], s = function(n, o) {
    return Hi(o) ? (e.includes(o) || e.push(o), e.indexOf(o)) : o;
  };
  return JSON.stringify(i, s) !== JSON.stringify(t, s);
}
/*!
 * Chart.js v4.4.1
 * https://www.chartjs.org
 * (c) 2023 Chart.js Contributors
 * Released under the MIT License
 */
class ka {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, e, s, n) {
    const o = e.listeners[n], r = e.duration;
    o.forEach((a) => a({
      chart: t,
      initial: e.initial,
      numSteps: r,
      currentStep: Math.min(s - e.start, r)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Rn.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let e = 0;
    this._charts.forEach((s, n) => {
      if (!s.running || !s.items.length)
        return;
      const o = s.items;
      let r = o.length - 1, a = !1, l;
      for (; r >= 0; --r)
        l = o[r], l._active ? (l._total > s.duration && (s.duration = l._total), l.tick(t), a = !0) : (o[r] = o[o.length - 1], o.pop());
      a && (n.draw(), this._notify(n, s, t, "progress")), o.length || (s.running = !1, this._notify(n, s, t, "complete"), s.initial = !1), e += o.length;
    }), this._lastDate = t, e === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const e = this._charts;
    let s = e.get(t);
    return s || (s = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, e.set(t, s)), s;
  }
  listen(t, e, s) {
    this._getAnims(t).listeners[e].push(s);
  }
  add(t, e) {
    !e || !e.length || this._getAnims(t).items.push(...e);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const e = this._charts.get(t);
    e && (e.running = !0, e.start = Date.now(), e.duration = e.items.reduce((s, n) => Math.max(s, n._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const e = this._charts.get(t);
    return !(!e || !e.running || !e.items.length);
  }
  stop(t) {
    const e = this._charts.get(t);
    if (!e || !e.items.length)
      return;
    const s = e.items;
    let n = s.length - 1;
    for (; n >= 0; --n)
      s[n].cancel();
    e.items = [], this._notify(t, e, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var ct = /* @__PURE__ */ new ka();
const Ms = "transparent", wa = {
  boolean(i, t, e) {
    return e > 0.5 ? t : i;
  },
  color(i, t, e) {
    const s = us(i || Ms), n = s.valid && us(t || Ms);
    return n && n.valid ? n.mix(s, e).hexString() : t;
  },
  number(i, t, e) {
    return i + (t - i) * e;
  }
};
class Zn {
  constructor(t, e, s, n) {
    const o = e[s];
    n = re([
      t.to,
      n,
      o,
      t.from
    ]);
    const r = re([
      t.from,
      o,
      n
    ]);
    this._active = !0, this._fn = t.fn || wa[t.type || typeof r], this._easing = de[t.easing] || de.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = e, this._prop = s, this._from = r, this._to = n, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, e, s) {
    if (this._active) {
      this._notify(!1);
      const n = this._target[this._prop], o = s - this._start, r = this._duration - o;
      this._start = s, this._duration = Math.floor(Math.max(r, t.duration)), this._total += o, this._loop = !!t.loop, this._to = re([
        t.to,
        e,
        n,
        t.from
      ]), this._from = re([
        t.from,
        n,
        e
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const e = t - this._start, s = this._duration, n = this._prop, o = this._from, r = this._loop, a = this._to;
    let l;
    if (this._active = o !== a && (r || e < s), !this._active) {
      this._target[n] = a, this._notify(!0);
      return;
    }
    if (e < 0) {
      this._target[n] = o;
      return;
    }
    l = e / s % 2, l = r && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[n] = this._fn(o, a, l);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((e, s) => {
      t.push({
        res: e,
        rej: s
      });
    });
  }
  _notify(t) {
    const e = t ? "res" : "rej", s = this._promises || [];
    for (let n = 0; n < s.length; n++)
      s[n][e]();
  }
}
class qi {
  constructor(t, e) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(e);
  }
  configure(t) {
    if (!T(t))
      return;
    const e = Object.keys(V.animation), s = this._properties;
    Object.getOwnPropertyNames(t).forEach((n) => {
      const o = t[n];
      if (!T(o))
        return;
      const r = {};
      for (const a of e)
        r[a] = o[a];
      (F(o.properties) && o.properties || [
        n
      ]).forEach((a) => {
        (a === n || !s.has(a)) && s.set(a, r);
      });
    });
  }
  _animateOptions(t, e) {
    const s = e.options, n = Pa(t, s);
    if (!n)
      return [];
    const o = this._createAnimations(n, s);
    return s.$shared && Sa(t.options.$animations, s).then(() => {
      t.options = s;
    }, () => {
    }), o;
  }
  _createAnimations(t, e) {
    const s = this._properties, n = [], o = t.$animations || (t.$animations = {}), r = Object.keys(e), a = Date.now();
    let l;
    for (l = r.length - 1; l >= 0; --l) {
      const c = r[l];
      if (c.charAt(0) === "$")
        continue;
      if (c === "options") {
        n.push(...this._animateOptions(t, e));
        continue;
      }
      const h = e[c];
      let d = o[c];
      const u = s.get(c);
      if (d)
        if (u && d.active()) {
          d.update(u, h, a);
          continue;
        } else
          d.cancel();
      if (!u || !u.duration) {
        t[c] = h;
        continue;
      }
      o[c] = d = new Zn(u, t, c, h), n.push(d);
    }
    return n;
  }
  update(t, e) {
    if (this._properties.size === 0) {
      Object.assign(t, e);
      return;
    }
    const s = this._createAnimations(t, e);
    if (s.length)
      return ct.add(this._chart, s), !0;
  }
}
function Sa(i, t) {
  const e = [], s = Object.keys(t);
  for (let n = 0; n < s.length; n++) {
    const o = i[s[n]];
    o && o.active() && e.push(o.wait());
  }
  return Promise.all(e);
}
function Pa(i, t) {
  if (!t)
    return;
  let e = i.options;
  if (!e) {
    i.options = t;
    return;
  }
  return e.$shared && (i.options = e = Object.assign({}, e, {
    $shared: !1,
    $animations: {}
  })), e;
}
function ks(i, t) {
  const e = i && i.options || {}, s = e.reverse, n = e.min === void 0 ? t : 0, o = e.max === void 0 ? t : 0;
  return {
    start: s ? o : n,
    end: s ? n : o
  };
}
function Da(i, t, e) {
  if (e === !1)
    return !1;
  const s = ks(i, e), n = ks(t, e);
  return {
    top: n.end,
    right: s.end,
    bottom: n.start,
    left: s.start
  };
}
function Ca(i) {
  let t, e, s, n;
  return T(i) ? (t = i.top, e = i.right, s = i.bottom, n = i.left) : t = e = s = n = i, {
    top: t,
    right: e,
    bottom: s,
    left: n,
    disabled: i === !1
  };
}
function Jn(i, t) {
  const e = [], s = i._getSortedDatasetMetas(t);
  let n, o;
  for (n = 0, o = s.length; n < o; ++n)
    e.push(s[n].index);
  return e;
}
function ws(i, t, e, s = {}) {
  const n = i.keys, o = s.mode === "single";
  let r, a, l, c;
  if (t !== null) {
    for (r = 0, a = n.length; r < a; ++r) {
      if (l = +n[r], l === e) {
        if (s.all)
          continue;
        break;
      }
      c = i.values[l], N(c) && (o || t === 0 || ht(t) === ht(c)) && (t += c);
    }
    return t;
  }
}
function Aa(i) {
  const t = Object.keys(i), e = new Array(t.length);
  let s, n, o;
  for (s = 0, n = t.length; s < n; ++s)
    o = t[s], e[s] = {
      x: o,
      y: i[o]
    };
  return e;
}
function Ss(i, t) {
  const e = i && i.options.stacked;
  return e || e === void 0 && t.stack !== void 0;
}
function Oa(i, t, e) {
  return `${i.id}.${t.id}.${e.stack || e.type}`;
}
function Ta(i) {
  const { min: t, max: e, minDefined: s, maxDefined: n } = i.getUserBounds();
  return {
    min: s ? t : Number.NEGATIVE_INFINITY,
    max: n ? e : Number.POSITIVE_INFINITY
  };
}
function La(i, t, e) {
  const s = i[t] || (i[t] = {});
  return s[e] || (s[e] = {});
}
function Ps(i, t, e, s) {
  for (const n of t.getMatchingVisibleMetas(s).reverse()) {
    const o = i[n.index];
    if (e && o > 0 || !e && o < 0)
      return n.index;
  }
  return null;
}
function Ds(i, t) {
  const { chart: e, _cachedMeta: s } = i, n = e._stacks || (e._stacks = {}), { iScale: o, vScale: r, index: a } = s, l = o.axis, c = r.axis, h = Oa(o, r, s), d = t.length;
  let u;
  for (let f = 0; f < d; ++f) {
    const g = t[f], { [l]: p, [c]: m } = g, b = g._stacks || (g._stacks = {});
    u = b[c] = La(n, h, p), u[a] = m, u._top = Ps(u, r, !0, s.type), u._bottom = Ps(u, r, !1, s.type);
    const x = u._visualValues || (u._visualValues = {});
    x[a] = m;
  }
}
function pi(i, t) {
  const e = i.scales;
  return Object.keys(e).filter((s) => e[s].axis === t).shift();
}
function Ra(i, t) {
  return Pt(i, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Ea(i, t, e) {
  return Pt(i, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: e,
    index: t,
    mode: "default",
    type: "data"
  });
}
function te(i, t) {
  const e = i.controller.index, s = i.vScale && i.vScale.axis;
  if (s) {
    t = t || i._parsed;
    for (const n of t) {
      const o = n._stacks;
      if (!o || o[s] === void 0 || o[s][e] === void 0)
        return;
      delete o[s][e], o[s]._visualValues !== void 0 && o[s]._visualValues[e] !== void 0 && delete o[s]._visualValues[e];
    }
  }
}
const mi = (i) => i === "reset" || i === "none", Cs = (i, t) => t ? i : Object.assign({}, i), Ia = (i, t, e) => i && !t.hidden && t._stacked && {
  keys: Jn(e, !0),
  values: null
};
class st {
  constructor(t, e) {
    this.chart = t, this._ctx = t.ctx, this.index = e, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Ss(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && te(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, e = this._cachedMeta, s = this.getDataset(), n = (d, u, f, g) => d === "x" ? u : d === "r" ? g : f, o = e.xAxisID = A(s.xAxisID, pi(t, "x")), r = e.yAxisID = A(s.yAxisID, pi(t, "y")), a = e.rAxisID = A(s.rAxisID, pi(t, "r")), l = e.indexAxis, c = e.iAxisID = n(l, o, r, a), h = e.vAxisID = n(l, r, o, a);
    e.xScale = this.getScaleForId(o), e.yScale = this.getScaleForId(r), e.rScale = this.getScaleForId(a), e.iScale = this.getScaleForId(c), e.vScale = this.getScaleForId(h);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const e = this._cachedMeta;
    return t === e.iScale ? e.vScale : e.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && cs(this._data, this), t._stacked && te(t);
  }
  _dataCheck() {
    const t = this.getDataset(), e = t.data || (t.data = []), s = this._data;
    if (T(e))
      this._data = Aa(e);
    else if (s !== e) {
      if (s) {
        cs(s, this);
        const n = this._cachedMeta;
        te(n), n._parsed = [];
      }
      e && Object.isExtensible(e) && vr(e, this), this._syncList = [], this._data = e;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const e = this._cachedMeta, s = this.getDataset();
    let n = !1;
    this._dataCheck();
    const o = e._stacked;
    e._stacked = Ss(e.vScale, e), e.stack !== s.stack && (n = !0, te(e), e.stack = s.stack), this._resyncElements(t), (n || o !== e._stacked) && Ds(this, e._parsed);
  }
  configure() {
    const t = this.chart.config, e = t.datasetScopeKeys(this._type), s = t.getOptionScopes(this.getDataset(), e, !0);
    this.options = t.createResolver(s, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, e) {
    const { _cachedMeta: s, _data: n } = this, { iScale: o, _stacked: r } = s, a = o.axis;
    let l = t === 0 && e === n.length ? !0 : s._sorted, c = t > 0 && s._parsed[t - 1], h, d, u;
    if (this._parsing === !1)
      s._parsed = n, s._sorted = !0, u = n;
    else {
      F(n[t]) ? u = this.parseArrayData(s, n, t, e) : T(n[t]) ? u = this.parseObjectData(s, n, t, e) : u = this.parsePrimitiveData(s, n, t, e);
      const f = () => d[a] === null || c && d[a] < c[a];
      for (h = 0; h < e; ++h)
        s._parsed[h + t] = d = u[h], l && (f() && (l = !1), c = d);
      s._sorted = l;
    }
    r && Ds(this, u);
  }
  parsePrimitiveData(t, e, s, n) {
    const { iScale: o, vScale: r } = t, a = o.axis, l = r.axis, c = o.getLabels(), h = o === r, d = new Array(n);
    let u, f, g;
    for (u = 0, f = n; u < f; ++u)
      g = u + s, d[u] = {
        [a]: h || o.parse(c[g], g),
        [l]: r.parse(e[g], g)
      };
    return d;
  }
  parseArrayData(t, e, s, n) {
    const { xScale: o, yScale: r } = t, a = new Array(n);
    let l, c, h, d;
    for (l = 0, c = n; l < c; ++l)
      h = l + s, d = e[h], a[l] = {
        x: o.parse(d[0], h),
        y: r.parse(d[1], h)
      };
    return a;
  }
  parseObjectData(t, e, s, n) {
    const { xScale: o, yScale: r } = t, { xAxisKey: a = "x", yAxisKey: l = "y" } = this._parsing, c = new Array(n);
    let h, d, u, f;
    for (h = 0, d = n; h < d; ++h)
      u = h + s, f = e[u], c[h] = {
        x: o.parse(wt(f, a), u),
        y: r.parse(wt(f, l), u)
      };
    return c;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, e, s) {
    const n = this.chart, o = this._cachedMeta, r = e[t.axis], a = {
      keys: Jn(n, !0),
      values: e._stacks[t.axis]._visualValues
    };
    return ws(a, r, o.index, {
      mode: s
    });
  }
  updateRangeFromParsed(t, e, s, n) {
    const o = s[e.axis];
    let r = o === null ? NaN : o;
    const a = n && s._stacks[e.axis];
    n && a && (n.values = a, r = ws(n, o, this._cachedMeta.index)), t.min = Math.min(t.min, r), t.max = Math.max(t.max, r);
  }
  getMinMax(t, e) {
    const s = this._cachedMeta, n = s._parsed, o = s._sorted && t === s.iScale, r = n.length, a = this._getOtherScale(t), l = Ia(e, s, this.chart), c = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: h, max: d } = Ta(a);
    let u, f;
    function g() {
      f = n[u];
      const p = f[a.axis];
      return !N(f[t.axis]) || h > p || d < p;
    }
    for (u = 0; u < r && !(!g() && (this.updateRangeFromParsed(c, t, f, l), o)); ++u)
      ;
    if (o) {
      for (u = r - 1; u >= 0; --u)
        if (!g()) {
          this.updateRangeFromParsed(c, t, f, l);
          break;
        }
    }
    return c;
  }
  getAllParsedValues(t) {
    const e = this._cachedMeta._parsed, s = [];
    let n, o, r;
    for (n = 0, o = e.length; n < o; ++n)
      r = e[n][t.axis], N(r) && s.push(r);
    return s;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = e.iScale, n = e.vScale, o = this.getParsed(t);
    return {
      label: s ? "" + s.getLabelForValue(o[s.axis]) : "",
      value: n ? "" + n.getLabelForValue(o[n.axis]) : ""
    };
  }
  _update(t) {
    const e = this._cachedMeta;
    this.update(t || "default"), e._clip = Ca(A(this.options.clip, Da(e.xScale, e.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, e = this.chart, s = this._cachedMeta, n = s.data || [], o = e.chartArea, r = [], a = this._drawStart || 0, l = this._drawCount || n.length - a, c = this.options.drawActiveElementsOnTop;
    let h;
    for (s.dataset && s.dataset.draw(t, o, a, l), h = a; h < a + l; ++h) {
      const d = n[h];
      d.hidden || (d.active && c ? r.push(d) : d.draw(t, o));
    }
    for (h = 0; h < r.length; ++h)
      r[h].draw(t, o);
  }
  getStyle(t, e) {
    const s = e ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(s) : this.resolveDataElementOptions(t || 0, s);
  }
  getContext(t, e, s) {
    const n = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const r = this._cachedMeta.data[t];
      o = r.$context || (r.$context = Ea(this.getContext(), t, r)), o.parsed = this.getParsed(t), o.raw = n.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = Ra(this.chart.getContext(), this.index)), o.dataset = n, o.index = o.datasetIndex = this.index;
    return o.active = !!e, o.mode = s, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, e) {
    return this._resolveElementOptions(this.dataElementType.id, e, t);
  }
  _resolveElementOptions(t, e = "default", s) {
    const n = e === "active", o = this._cachedDataOpts, r = t + "-" + e, a = o[r], l = this.enableOptionSharing && Me(s);
    if (a)
      return Cs(a, l);
    const c = this.chart.config, h = c.datasetElementScopeKeys(this._type, t), d = n ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], u = c.getOptionScopes(this.getDataset(), h), f = Object.keys(V.elements[t]), g = () => this.getContext(s, n, e), p = c.resolveNamedOptions(u, f, g, d);
    return p.$shared && (p.$shared = l, o[r] = Object.freeze(Cs(p, l))), p;
  }
  _resolveAnimations(t, e, s) {
    const n = this.chart, o = this._cachedDataOpts, r = `animation-${e}`, a = o[r];
    if (a)
      return a;
    let l;
    if (n.options.animation !== !1) {
      const h = this.chart.config, d = h.datasetAnimationScopeKeys(this._type, e), u = h.getOptionScopes(this.getDataset(), d);
      l = h.createResolver(u, this.getContext(t, s, e));
    }
    const c = new qi(n, l && l.animations);
    return l && l._cacheable && (o[r] = Object.freeze(c)), c;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, e) {
    return !e || mi(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, e) {
    const s = this.resolveDataElementOptions(t, e), n = this._sharedOptions, o = this.getSharedOptions(s), r = this.includeOptions(e, o) || o !== n;
    return this.updateSharedOptions(o, e, s), {
      sharedOptions: o,
      includeOptions: r
    };
  }
  updateElement(t, e, s, n) {
    mi(n) ? Object.assign(t, s) : this._resolveAnimations(e, n).update(t, s);
  }
  updateSharedOptions(t, e, s) {
    t && !mi(e) && this._resolveAnimations(void 0, e).update(t, s);
  }
  _setStyle(t, e, s, n) {
    t.active = n;
    const o = this.getStyle(e, n);
    this._resolveAnimations(e, s, n).update(t, {
      options: !n && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(t, e, s) {
    this._setStyle(t, s, "active", !1);
  }
  setHoverStyle(t, e, s) {
    this._setStyle(t, s, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const e = this._data, s = this._cachedMeta.data;
    for (const [a, l, c] of this._syncList)
      this[a](l, c);
    this._syncList = [];
    const n = s.length, o = e.length, r = Math.min(o, n);
    r && this.parse(0, r), o > n ? this._insertElements(n, o - n, t) : o < n && this._removeElements(o, n - o);
  }
  _insertElements(t, e, s = !0) {
    const n = this._cachedMeta, o = n.data, r = t + e;
    let a;
    const l = (c) => {
      for (c.length += e, a = c.length - 1; a >= r; a--)
        c[a] = c[a - e];
    };
    for (l(o), a = t; a < r; ++a)
      o[a] = new this.dataElementType();
    this._parsing && l(n._parsed), this.parse(t, e), s && this.updateElements(o, t, e, "reset");
  }
  updateElements(t, e, s, n) {
  }
  _removeElements(t, e) {
    const s = this._cachedMeta;
    if (this._parsing) {
      const n = s._parsed.splice(t, e);
      s._stacked && te(s, n);
    }
    s.data.splice(t, e);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [e, s, n] = t;
      this[e](s, n);
    }
    this.chart._dataChanges.push([
      this.index,
      ...t
    ]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - t,
      t
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(t, e) {
    e && this._sync([
      "_removeElements",
      t,
      e
    ]);
    const s = arguments.length - 2;
    s && this._sync([
      "_insertElements",
      t,
      s
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
S(st, "defaults", {}), S(st, "datasetElementType", null), S(st, "dataElementType", null);
function Fa(i, t) {
  if (!i._cache.$bar) {
    const e = i.getMatchingVisibleMetas(t);
    let s = [];
    for (let n = 0, o = e.length; n < o; n++)
      s = s.concat(e[n].controller.getAllParsedValues(i));
    i._cache.$bar = Ln(s.sort((n, o) => n - o));
  }
  return i._cache.$bar;
}
function za(i) {
  const t = i.iScale, e = Fa(t, i.type);
  let s = t._length, n, o, r, a;
  const l = () => {
    r === 32767 || r === -32768 || (Me(a) && (s = Math.min(s, Math.abs(r - a) || s)), a = r);
  };
  for (n = 0, o = e.length; n < o; ++n)
    r = t.getPixelForValue(e[n]), l();
  for (a = void 0, n = 0, o = t.ticks.length; n < o; ++n)
    r = t.getPixelForTick(n), l();
  return s;
}
function Wa(i, t, e, s) {
  const n = e.barThickness;
  let o, r;
  return L(n) ? (o = t.min * e.categoryPercentage, r = e.barPercentage) : (o = n * s, r = 1), {
    chunk: o / s,
    ratio: r,
    start: t.pixels[i] - o / 2
  };
}
function Ba(i, t, e, s) {
  const n = t.pixels, o = n[i];
  let r = i > 0 ? n[i - 1] : null, a = i < n.length - 1 ? n[i + 1] : null;
  const l = e.categoryPercentage;
  r === null && (r = o - (a === null ? t.end - t.start : a - o)), a === null && (a = o + o - r);
  const c = o - (o - Math.min(r, a)) / 2 * l;
  return {
    chunk: Math.abs(a - r) / 2 * l / s,
    ratio: e.barPercentage,
    start: c
  };
}
function Va(i, t, e, s) {
  const n = e.parse(i[0], s), o = e.parse(i[1], s), r = Math.min(n, o), a = Math.max(n, o);
  let l = r, c = a;
  Math.abs(r) > Math.abs(a) && (l = a, c = r), t[e.axis] = c, t._custom = {
    barStart: l,
    barEnd: c,
    start: n,
    end: o,
    min: r,
    max: a
  };
}
function Qn(i, t, e, s) {
  return F(i) ? Va(i, t, e, s) : t[e.axis] = e.parse(i, s), t;
}
function As(i, t, e, s) {
  const n = i.iScale, o = i.vScale, r = n.getLabels(), a = n === o, l = [];
  let c, h, d, u;
  for (c = e, h = e + s; c < h; ++c)
    u = t[c], d = {}, d[n.axis] = a || n.parse(r[c], c), l.push(Qn(u, d, o, c));
  return l;
}
function bi(i) {
  return i && i.barStart !== void 0 && i.barEnd !== void 0;
}
function Na(i, t, e) {
  return i !== 0 ? ht(i) : (t.isHorizontal() ? 1 : -1) * (t.min >= e ? 1 : -1);
}
function Ha(i) {
  let t, e, s, n, o;
  return i.horizontal ? (t = i.base > i.x, e = "left", s = "right") : (t = i.base < i.y, e = "bottom", s = "top"), t ? (n = "end", o = "start") : (n = "start", o = "end"), {
    start: e,
    end: s,
    reverse: t,
    top: n,
    bottom: o
  };
}
function ja(i, t, e, s) {
  let n = t.borderSkipped;
  const o = {};
  if (!n) {
    i.borderSkipped = o;
    return;
  }
  if (n === !0) {
    i.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: r, end: a, reverse: l, top: c, bottom: h } = Ha(i);
  n === "middle" && e && (i.enableBorderRadius = !0, (e._top || 0) === s ? n = c : (e._bottom || 0) === s ? n = h : (o[Os(h, r, a, l)] = !0, n = c)), o[Os(n, r, a, l)] = !0, i.borderSkipped = o;
}
function Os(i, t, e, s) {
  return s ? (i = $a(i, t, e), i = Ts(i, e, t)) : i = Ts(i, t, e), i;
}
function $a(i, t, e) {
  return i === t ? e : i === e ? t : i;
}
function Ts(i, t, e) {
  return i === "start" ? t : i === "end" ? e : i;
}
function Ya(i, { inflateAmount: t }, e) {
  i.inflateAmount = t === "auto" ? e === 1 ? 0.33 : 0 : t;
}
class fe extends st {
  parsePrimitiveData(t, e, s, n) {
    return As(t, e, s, n);
  }
  parseArrayData(t, e, s, n) {
    return As(t, e, s, n);
  }
  parseObjectData(t, e, s, n) {
    const { iScale: o, vScale: r } = t, { xAxisKey: a = "x", yAxisKey: l = "y" } = this._parsing, c = o.axis === "x" ? a : l, h = r.axis === "x" ? a : l, d = [];
    let u, f, g, p;
    for (u = s, f = s + n; u < f; ++u)
      p = e[u], g = {}, g[o.axis] = o.parse(wt(p, c), u), d.push(Qn(wt(p, h), g, r, u));
    return d;
  }
  updateRangeFromParsed(t, e, s, n) {
    super.updateRangeFromParsed(t, e, s, n);
    const o = s._custom;
    o && e === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, { iScale: s, vScale: n } = e, o = this.getParsed(t), r = o._custom, a = bi(r) ? "[" + r.start + ", " + r.end + "]" : "" + n.getLabelForValue(o[n.axis]);
    return {
      label: "" + s.getLabelForValue(o[s.axis]),
      value: a
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const e = this._cachedMeta;
    this.updateElements(e.data, 0, e.data.length, t);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", { index: r, _cachedMeta: { vScale: a } } = this, l = a.getBasePixel(), c = a.isHorizontal(), h = this._getRuler(), { sharedOptions: d, includeOptions: u } = this._getSharedOptions(e, n);
    for (let f = e; f < e + s; f++) {
      const g = this.getParsed(f), p = o || L(g[a.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(f), m = this._calculateBarIndexPixels(f, h), b = (g._stacks || {})[a.axis], x = {
        horizontal: c,
        base: p.base,
        enableBorderRadius: !b || bi(g._custom) || r === b._top || r === b._bottom,
        x: c ? p.head : m.center,
        y: c ? m.center : p.head,
        height: c ? m.size : Math.abs(p.size),
        width: c ? Math.abs(p.size) : m.size
      };
      u && (x.options = d || this.resolveDataElementOptions(f, t[f].active ? "active" : n));
      const v = x.options || t[f].options;
      ja(x, v, b, r), Ya(x, v, h.ratio), this.updateElement(t[f], f, x, n);
    }
  }
  _getStacks(t, e) {
    const { iScale: s } = this._cachedMeta, n = s.getMatchingVisibleMetas(this._type).filter((l) => l.controller.options.grouped), o = s.options.stacked, r = [], a = (l) => {
      const c = l.controller.getParsed(e), h = c && c[l.vScale.axis];
      if (L(h) || isNaN(h))
        return !0;
    };
    for (const l of n)
      if (!(e !== void 0 && a(l)) && ((o === !1 || r.indexOf(l.stack) === -1 || o === void 0 && l.stack === void 0) && r.push(l.stack), l.index === t))
        break;
    return r.length || r.push(void 0), r;
  }
  _getStackCount(t) {
    return this._getStacks(void 0, t).length;
  }
  _getStackIndex(t, e, s) {
    const n = this._getStacks(t, s), o = e !== void 0 ? n.indexOf(e) : -1;
    return o === -1 ? n.length - 1 : o;
  }
  _getRuler() {
    const t = this.options, e = this._cachedMeta, s = e.iScale, n = [];
    let o, r;
    for (o = 0, r = e.data.length; o < r; ++o)
      n.push(s.getPixelForValue(this.getParsed(o)[s.axis], o));
    const a = t.barThickness;
    return {
      min: a || za(e),
      pixels: n,
      start: s._startPixel,
      end: s._endPixel,
      stackCount: this._getStackCount(),
      scale: s,
      grouped: t.grouped,
      ratio: a ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: e, _stacked: s, index: n }, options: { base: o, minBarLength: r } } = this, a = o || 0, l = this.getParsed(t), c = l._custom, h = bi(c);
    let d = l[e.axis], u = 0, f = s ? this.applyStack(e, l, s) : d, g, p;
    f !== d && (u = f - d, f = d), h && (d = c.barStart, f = c.barEnd - c.barStart, d !== 0 && ht(d) !== ht(c.barEnd) && (u = 0), u += d);
    const m = !L(o) && !h ? o : u;
    let b = e.getPixelForValue(m);
    if (this.chart.getDataVisibility(t) ? g = e.getPixelForValue(u + f) : g = b, p = g - b, Math.abs(p) < r) {
      p = Na(p, e, a) * r, d === a && (b -= p / 2);
      const x = e.getPixelForDecimal(0), v = e.getPixelForDecimal(1), y = Math.min(x, v), _ = Math.max(x, v);
      b = Math.max(Math.min(b, _), y), g = b + p, s && !h && (l._stacks[e.axis]._visualValues[n] = e.getValueForPixel(g) - e.getValueForPixel(b));
    }
    if (b === e.getPixelForValue(a)) {
      const x = ht(p) * e.getLineWidthForValue(a) / 2;
      b += x, p -= x;
    }
    return {
      size: p,
      base: b,
      head: g,
      center: g + p / 2
    };
  }
  _calculateBarIndexPixels(t, e) {
    const s = e.scale, n = this.options, o = n.skipNull, r = A(n.maxBarThickness, 1 / 0);
    let a, l;
    if (e.grouped) {
      const c = o ? this._getStackCount(t) : e.stackCount, h = n.barThickness === "flex" ? Ba(t, e, n, c) : Wa(t, e, n, c), d = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0);
      a = h.start + h.chunk * d + h.chunk / 2, l = Math.min(r, h.chunk * h.ratio);
    } else
      a = s.getPixelForValue(this.getParsed(t)[s.axis], t), l = Math.min(r, e.min * e.ratio);
    return {
      base: a - l / 2,
      head: a + l / 2,
      center: a,
      size: l
    };
  }
  draw() {
    const t = this._cachedMeta, e = t.vScale, s = t.data, n = s.length;
    let o = 0;
    for (; o < n; ++o)
      this.getParsed(o)[e.axis] !== null && s[o].draw(this._ctx);
  }
}
S(fe, "id", "bar"), S(fe, "defaults", {
  datasetElementType: !1,
  dataElementType: "bar",
  categoryPercentage: 0.8,
  barPercentage: 0.9,
  grouped: !0,
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "base",
        "width",
        "height"
      ]
    }
  }
}), S(fe, "overrides", {
  scales: {
    _index_: {
      type: "category",
      offset: !0,
      grid: {
        offset: !0
      }
    },
    _value_: {
      type: "linear",
      beginAtZero: !0
    }
  }
});
class ge extends st {
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
  }
  parsePrimitiveData(t, e, s, n) {
    const o = super.parsePrimitiveData(t, e, s, n);
    for (let r = 0; r < o.length; r++)
      o[r]._custom = this.resolveDataElementOptions(r + s).radius;
    return o;
  }
  parseArrayData(t, e, s, n) {
    const o = super.parseArrayData(t, e, s, n);
    for (let r = 0; r < o.length; r++) {
      const a = e[s + r];
      o[r]._custom = A(a[2], this.resolveDataElementOptions(r + s).radius);
    }
    return o;
  }
  parseObjectData(t, e, s, n) {
    const o = super.parseObjectData(t, e, s, n);
    for (let r = 0; r < o.length; r++) {
      const a = e[s + r];
      o[r]._custom = A(a && a.r && +a.r, this.resolveDataElementOptions(r + s).radius);
    }
    return o;
  }
  getMaxOverflow() {
    const t = this._cachedMeta.data;
    let e = 0;
    for (let s = t.length - 1; s >= 0; --s)
      e = Math.max(e, t[s].size(this.resolveDataElementOptions(s)) / 2);
    return e > 0 && e;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart.data.labels || [], { xScale: n, yScale: o } = e, r = this.getParsed(t), a = n.getLabelForValue(r.x), l = o.getLabelForValue(r.y), c = r._custom;
    return {
      label: s[t] || "",
      value: "(" + a + ", " + l + (c ? ", " + c : "") + ")"
    };
  }
  update(t) {
    const e = this._cachedMeta.data;
    this.updateElements(e, 0, e.length, t);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", { iScale: r, vScale: a } = this._cachedMeta, { sharedOptions: l, includeOptions: c } = this._getSharedOptions(e, n), h = r.axis, d = a.axis;
    for (let u = e; u < e + s; u++) {
      const f = t[u], g = !o && this.getParsed(u), p = {}, m = p[h] = o ? r.getPixelForDecimal(0.5) : r.getPixelForValue(g[h]), b = p[d] = o ? a.getBasePixel() : a.getPixelForValue(g[d]);
      p.skip = isNaN(m) || isNaN(b), c && (p.options = l || this.resolveDataElementOptions(u, f.active ? "active" : n), o && (p.options.radius = 0)), this.updateElement(f, u, p, n);
    }
  }
  resolveDataElementOptions(t, e) {
    const s = this.getParsed(t);
    let n = super.resolveDataElementOptions(t, e);
    n.$shared && (n = Object.assign({}, n, {
      $shared: !1
    }));
    const o = n.radius;
    return e !== "active" && (n.radius = 0), n.radius += A(s && s._custom, o), n;
  }
}
S(ge, "id", "bubble"), S(ge, "defaults", {
  datasetElementType: !1,
  dataElementType: "point",
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "borderWidth",
        "radius"
      ]
    }
  }
}), S(ge, "overrides", {
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
function Ua(i, t, e) {
  let s = 1, n = 1, o = 0, r = 0;
  if (t < z) {
    const a = i, l = a + t, c = Math.cos(a), h = Math.sin(a), d = Math.cos(l), u = Math.sin(l), f = (v, y, _) => ke(v, a, l, !0) ? 1 : Math.max(y, y * e, _, _ * e), g = (v, y, _) => ke(v, a, l, !0) ? -1 : Math.min(y, y * e, _, _ * e), p = f(0, c, d), m = f(j, h, u), b = g(W, c, d), x = g(W + j, h, u);
    s = (p - b) / 2, n = (m - x) / 2, o = -(p + b) / 2, r = -(m + x) / 2;
  }
  return {
    ratioX: s,
    ratioY: n,
    offsetX: o,
    offsetY: r
  };
}
class vt extends st {
  constructor(t, e) {
    super(t, e), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, e) {
    const s = this.getDataset().data, n = this._cachedMeta;
    if (this._parsing === !1)
      n._parsed = s;
    else {
      let o = (l) => +s[l];
      if (T(s[t])) {
        const { key: l = "value" } = this._parsing;
        o = (c) => +wt(s[c], l);
      }
      let r, a;
      for (r = t, a = t + e; r < a; ++r)
        n._parsed[r] = o(r);
    }
  }
  _getRotation() {
    return at(this.options.rotation - 90);
  }
  _getCircumference() {
    return at(this.options.circumference);
  }
  _getRotationExtents() {
    let t = z, e = -z;
    for (let s = 0; s < this.chart.data.datasets.length; ++s)
      if (this.chart.isDatasetVisible(s) && this.chart.getDatasetMeta(s).type === this._type) {
        const n = this.chart.getDatasetMeta(s).controller, o = n._getRotation(), r = n._getCircumference();
        t = Math.min(t, o), e = Math.max(e, o + r);
      }
    return {
      rotation: t,
      circumference: e - t
    };
  }
  update(t) {
    const e = this.chart, { chartArea: s } = e, n = this._cachedMeta, o = n.data, r = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, a = Math.max((Math.min(s.width, s.height) - r) / 2, 0), l = Math.min(ar(this.options.cutout, a), 1), c = this._getRingWeight(this.index), { circumference: h, rotation: d } = this._getRotationExtents(), { ratioX: u, ratioY: f, offsetX: g, offsetY: p } = Ua(d, h, l), m = (s.width - r) / u, b = (s.height - r) / f, x = Math.max(Math.min(m, b) / 2, 0), v = Dn(this.options.radius, x), y = Math.max(v * l, 0), _ = (v - y) / this._getVisibleDatasetWeightTotal();
    this.offsetX = g * v, this.offsetY = p * v, n.total = this.calculateTotal(), this.outerRadius = v - _ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - _ * c, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, e) {
    const s = this.options, n = this._cachedMeta, o = this._getCircumference();
    return e && s.animation.animateRotate || !this.chart.getDataVisibility(t) || n._parsed[t] === null || n.data[t].hidden ? 0 : this.calculateCircumference(n._parsed[t] * o / z);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", r = this.chart, a = r.chartArea, c = r.options.animation, h = (a.left + a.right) / 2, d = (a.top + a.bottom) / 2, u = o && c.animateScale, f = u ? 0 : this.innerRadius, g = u ? 0 : this.outerRadius, { sharedOptions: p, includeOptions: m } = this._getSharedOptions(e, n);
    let b = this._getRotation(), x;
    for (x = 0; x < e; ++x)
      b += this._circumference(x, o);
    for (x = e; x < e + s; ++x) {
      const v = this._circumference(x, o), y = t[x], _ = {
        x: h + this.offsetX,
        y: d + this.offsetY,
        startAngle: b,
        endAngle: b + v,
        circumference: v,
        outerRadius: g,
        innerRadius: f
      };
      m && (_.options = p || this.resolveDataElementOptions(x, y.active ? "active" : n)), b += v, this.updateElement(y, x, _, n);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, e = t.data;
    let s = 0, n;
    for (n = 0; n < e.length; n++) {
      const o = t._parsed[n];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(n) && !e[n].hidden && (s += Math.abs(o));
    }
    return s;
  }
  calculateCircumference(t) {
    const e = this._cachedMeta.total;
    return e > 0 && !isNaN(t) ? z * (Math.abs(t) / e) : 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart, n = s.data.labels || [], o = Ae(e._parsed[t], s.options.locale);
    return {
      label: n[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let e = 0;
    const s = this.chart;
    let n, o, r, a, l;
    if (!t) {
      for (n = 0, o = s.data.datasets.length; n < o; ++n)
        if (s.isDatasetVisible(n)) {
          r = s.getDatasetMeta(n), t = r.data, a = r.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (n = 0, o = t.length; n < o; ++n)
      l = a.resolveDataElementOptions(n), l.borderAlign !== "inner" && (e = Math.max(e, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return e;
  }
  getMaxOffset(t) {
    let e = 0;
    for (let s = 0, n = t.length; s < n; ++s) {
      const o = this.resolveDataElementOptions(s);
      e = Math.max(e, o.offset || 0, o.hoverOffset || 0);
    }
    return e;
  }
  _getRingWeightOffset(t) {
    let e = 0;
    for (let s = 0; s < t; ++s)
      this.chart.isDatasetVisible(s) && (e += this._getRingWeight(s));
    return e;
  }
  _getRingWeight(t) {
    return Math.max(A(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
S(vt, "id", "doughnut"), S(vt, "defaults", {
  datasetElementType: !1,
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !1
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "circumference",
        "endAngle",
        "innerRadius",
        "outerRadius",
        "startAngle",
        "x",
        "y",
        "offset",
        "borderWidth",
        "spacing"
      ]
    }
  },
  cutout: "50%",
  rotation: 0,
  circumference: 360,
  radius: "100%",
  spacing: 0,
  indexAxis: "r"
}), S(vt, "descriptors", {
  _scriptable: (t) => t !== "spacing",
  _indexable: (t) => t !== "spacing" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
}), S(vt, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(t) {
          const e = t.data;
          if (e.labels.length && e.datasets.length) {
            const { labels: { pointStyle: s, color: n } } = t.legend.options;
            return e.labels.map((o, r) => {
              const l = t.getDatasetMeta(0).controller.getStyle(r);
              return {
                text: o,
                fillStyle: l.backgroundColor,
                strokeStyle: l.borderColor,
                fontColor: n,
                lineWidth: l.borderWidth,
                pointStyle: s,
                hidden: !t.getDataVisibility(r),
                index: r
              };
            });
          }
          return [];
        }
      },
      onClick(t, e, s) {
        s.chart.toggleDataVisibility(e.index), s.chart.update();
      }
    }
  }
});
class pe extends st {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const e = this._cachedMeta, { dataset: s, data: n = [], _dataset: o } = e, r = this.chart._animationsDisabled;
    let { start: a, count: l } = In(e, n, r);
    this._drawStart = a, this._drawCount = l, Fn(e) && (a = 0, l = n.length), s._chart = this.chart, s._datasetIndex = this.index, s._decimated = !!o._decimated, s.points = n;
    const c = this.resolveDatasetElementOptions(t);
    this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(s, void 0, {
      animated: !r,
      options: c
    }, t), this.updateElements(n, a, l, t);
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", { iScale: r, vScale: a, _stacked: l, _dataset: c } = this._cachedMeta, { sharedOptions: h, includeOptions: d } = this._getSharedOptions(e, n), u = r.axis, f = a.axis, { spanGaps: g, segment: p } = this.options, m = Kt(g) ? g : Number.POSITIVE_INFINITY, b = this.chart._animationsDisabled || o || n === "none", x = e + s, v = t.length;
    let y = e > 0 && this.getParsed(e - 1);
    for (let _ = 0; _ < v; ++_) {
      const w = t[_], k = b ? w : {};
      if (_ < e || _ >= x) {
        k.skip = !0;
        continue;
      }
      const M = this.getParsed(_), P = L(M[f]), D = k[u] = r.getPixelForValue(M[u], _), C = k[f] = o || P ? a.getBasePixel() : a.getPixelForValue(l ? this.applyStack(a, M, l) : M[f], _);
      k.skip = isNaN(D) || isNaN(C) || P, k.stop = _ > 0 && Math.abs(M[u] - y[u]) > m, p && (k.parsed = M, k.raw = c.data[_]), d && (k.options = h || this.resolveDataElementOptions(_, w.active ? "active" : n)), b || this.updateElement(w, _, k, n), y = M;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, e = t.dataset, s = e.options && e.options.borderWidth || 0, n = t.data || [];
    if (!n.length)
      return s;
    const o = n[0].size(this.resolveDataElementOptions(0)), r = n[n.length - 1].size(this.resolveDataElementOptions(n.length - 1));
    return Math.max(s, o, r) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
S(pe, "id", "line"), S(pe, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), S(pe, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
class Xt extends st {
  constructor(t, e) {
    super(t, e), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart, n = s.data.labels || [], o = Ae(e._parsed[t].r, s.options.locale);
    return {
      label: n[t] || "",
      value: o
    };
  }
  parseObjectData(t, e, s, n) {
    return $n.bind(this)(t, e, s, n);
  }
  update(t) {
    const e = this._cachedMeta.data;
    this._updateRadius(), this.updateElements(e, 0, e.length, t);
  }
  getMinMax() {
    const t = this._cachedMeta, e = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    };
    return t.data.forEach((s, n) => {
      const o = this.getParsed(n).r;
      !isNaN(o) && this.chart.getDataVisibility(n) && (o < e.min && (e.min = o), o > e.max && (e.max = o));
    }), e;
  }
  _updateRadius() {
    const t = this.chart, e = t.chartArea, s = t.options, n = Math.min(e.right - e.left, e.bottom - e.top), o = Math.max(n / 2, 0), r = Math.max(s.cutoutPercentage ? o / 100 * s.cutoutPercentage : 1, 0), a = (o - r) / t.getVisibleDatasetCount();
    this.outerRadius = o - a * this.index, this.innerRadius = this.outerRadius - a;
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", r = this.chart, l = r.options.animation, c = this._cachedMeta.rScale, h = c.xCenter, d = c.yCenter, u = c.getIndexAngle(0) - 0.5 * W;
    let f = u, g;
    const p = 360 / this.countVisibleElements();
    for (g = 0; g < e; ++g)
      f += this._computeAngle(g, n, p);
    for (g = e; g < e + s; g++) {
      const m = t[g];
      let b = f, x = f + this._computeAngle(g, n, p), v = r.getDataVisibility(g) ? c.getDistanceFromCenterForValue(this.getParsed(g).r) : 0;
      f = x, o && (l.animateScale && (v = 0), l.animateRotate && (b = x = u));
      const y = {
        x: h,
        y: d,
        innerRadius: 0,
        outerRadius: v,
        startAngle: b,
        endAngle: x,
        options: this.resolveDataElementOptions(g, m.active ? "active" : n)
      };
      this.updateElement(m, g, y, n);
    }
  }
  countVisibleElements() {
    const t = this._cachedMeta;
    let e = 0;
    return t.data.forEach((s, n) => {
      !isNaN(this.getParsed(n).r) && this.chart.getDataVisibility(n) && e++;
    }), e;
  }
  _computeAngle(t, e, s) {
    return this.chart.getDataVisibility(t) ? at(this.resolveDataElementOptions(t, e).angle || s) : 0;
  }
}
S(Xt, "id", "polarArea"), S(Xt, "defaults", {
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !0
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "startAngle",
        "endAngle",
        "innerRadius",
        "outerRadius"
      ]
    }
  },
  indexAxis: "r",
  startAngle: 0
}), S(Xt, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(t) {
          const e = t.data;
          if (e.labels.length && e.datasets.length) {
            const { labels: { pointStyle: s, color: n } } = t.legend.options;
            return e.labels.map((o, r) => {
              const l = t.getDatasetMeta(0).controller.getStyle(r);
              return {
                text: o,
                fillStyle: l.backgroundColor,
                strokeStyle: l.borderColor,
                fontColor: n,
                lineWidth: l.borderWidth,
                pointStyle: s,
                hidden: !t.getDataVisibility(r),
                index: r
              };
            });
          }
          return [];
        }
      },
      onClick(t, e, s) {
        s.chart.toggleDataVisibility(e.index), s.chart.update();
      }
    }
  },
  scales: {
    r: {
      type: "radialLinear",
      angleLines: {
        display: !1
      },
      beginAtZero: !0,
      grid: {
        circular: !0
      },
      pointLabels: {
        display: !1
      },
      startAngle: 0
    }
  }
});
class ti extends vt {
}
S(ti, "id", "pie"), S(ti, "defaults", {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
});
class me extends st {
  getLabelAndValue(t) {
    const e = this._cachedMeta.vScale, s = this.getParsed(t);
    return {
      label: e.getLabels()[t],
      value: "" + e.getLabelForValue(s[e.axis])
    };
  }
  parseObjectData(t, e, s, n) {
    return $n.bind(this)(t, e, s, n);
  }
  update(t) {
    const e = this._cachedMeta, s = e.dataset, n = e.data || [], o = e.iScale.getLabels();
    if (s.points = n, t !== "resize") {
      const r = this.resolveDatasetElementOptions(t);
      this.options.showLine || (r.borderWidth = 0);
      const a = {
        _loop: !0,
        _fullLoop: o.length === n.length,
        options: r
      };
      this.updateElement(s, void 0, a, t);
    }
    this.updateElements(n, 0, n.length, t);
  }
  updateElements(t, e, s, n) {
    const o = this._cachedMeta.rScale, r = n === "reset";
    for (let a = e; a < e + s; a++) {
      const l = t[a], c = this.resolveDataElementOptions(a, l.active ? "active" : n), h = o.getPointPositionForValue(a, this.getParsed(a).r), d = r ? o.xCenter : h.x, u = r ? o.yCenter : h.y, f = {
        x: d,
        y: u,
        angle: h.angle,
        skip: isNaN(d) || isNaN(u),
        options: c
      };
      this.updateElement(l, a, f, n);
    }
  }
}
S(me, "id", "radar"), S(me, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  indexAxis: "r",
  showLine: !0,
  elements: {
    line: {
      fill: "start"
    }
  }
}), S(me, "overrides", {
  aspectRatio: 1,
  scales: {
    r: {
      type: "radialLinear"
    }
  }
});
class be extends st {
  getLabelAndValue(t) {
    const e = this._cachedMeta, s = this.chart.data.labels || [], { xScale: n, yScale: o } = e, r = this.getParsed(t), a = n.getLabelForValue(r.x), l = o.getLabelForValue(r.y);
    return {
      label: s[t] || "",
      value: "(" + a + ", " + l + ")"
    };
  }
  update(t) {
    const e = this._cachedMeta, { data: s = [] } = e, n = this.chart._animationsDisabled;
    let { start: o, count: r } = In(e, s, n);
    if (this._drawStart = o, this._drawCount = r, Fn(e) && (o = 0, r = s.length), this.options.showLine) {
      this.datasetElementType || this.addElements();
      const { dataset: a, _dataset: l } = e;
      a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!l._decimated, a.points = s;
      const c = this.resolveDatasetElementOptions(t);
      c.segment = this.options.segment, this.updateElement(a, void 0, {
        animated: !n,
        options: c
      }, t);
    } else
      this.datasetElementType && (delete e.dataset, this.datasetElementType = !1);
    this.updateElements(s, o, r, t);
  }
  addElements() {
    const { showLine: t } = this.options;
    !this.datasetElementType && t && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
  }
  updateElements(t, e, s, n) {
    const o = n === "reset", { iScale: r, vScale: a, _stacked: l, _dataset: c } = this._cachedMeta, h = this.resolveDataElementOptions(e, n), d = this.getSharedOptions(h), u = this.includeOptions(n, d), f = r.axis, g = a.axis, { spanGaps: p, segment: m } = this.options, b = Kt(p) ? p : Number.POSITIVE_INFINITY, x = this.chart._animationsDisabled || o || n === "none";
    let v = e > 0 && this.getParsed(e - 1);
    for (let y = e; y < e + s; ++y) {
      const _ = t[y], w = this.getParsed(y), k = x ? _ : {}, M = L(w[g]), P = k[f] = r.getPixelForValue(w[f], y), D = k[g] = o || M ? a.getBasePixel() : a.getPixelForValue(l ? this.applyStack(a, w, l) : w[g], y);
      k.skip = isNaN(P) || isNaN(D) || M, k.stop = y > 0 && Math.abs(w[f] - v[f]) > b, m && (k.parsed = w, k.raw = c.data[y]), u && (k.options = d || this.resolveDataElementOptions(y, _.active ? "active" : n)), x || this.updateElement(_, y, k, n), v = w;
    }
    this.updateSharedOptions(d, n, h);
  }
  getMaxOverflow() {
    const t = this._cachedMeta, e = t.data || [];
    if (!this.options.showLine) {
      let a = 0;
      for (let l = e.length - 1; l >= 0; --l)
        a = Math.max(a, e[l].size(this.resolveDataElementOptions(l)) / 2);
      return a > 0 && a;
    }
    const s = t.dataset, n = s.options && s.options.borderWidth || 0;
    if (!e.length)
      return n;
    const o = e[0].size(this.resolveDataElementOptions(0)), r = e[e.length - 1].size(this.resolveDataElementOptions(e.length - 1));
    return Math.max(n, o, r) / 2;
  }
}
S(be, "id", "scatter"), S(be, "defaults", {
  datasetElementType: !1,
  dataElementType: "point",
  showLine: !1,
  fill: !1
}), S(be, "overrides", {
  interaction: {
    mode: "point"
  },
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
var to = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BarController: fe,
  BubbleController: ge,
  DoughnutController: vt,
  LineController: pe,
  PieController: ti,
  PolarAreaController: Xt,
  RadarController: me,
  ScatterController: be
});
function Lt() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Gi {
  constructor(t) {
    S(this, "options");
    this.options = t || {};
  }
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(t) {
    Object.assign(Gi.prototype, t);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Lt();
  }
  parse() {
    return Lt();
  }
  format() {
    return Lt();
  }
  add() {
    return Lt();
  }
  diff() {
    return Lt();
  }
  startOf() {
    return Lt();
  }
  endOf() {
    return Lt();
  }
}
var eo = {
  _date: Gi
};
function Xa(i, t, e, s) {
  const { controller: n, data: o, _sorted: r } = i, a = n._cachedMeta.iScale;
  if (a && t === a.axis && t !== "r" && r && o.length) {
    const l = a._reversePixels ? _r : pt;
    if (s) {
      if (n._sharedOptions) {
        const c = o[0], h = typeof c.getRange == "function" && c.getRange(t);
        if (h) {
          const d = l(o, t, e - h), u = l(o, t, e + h);
          return {
            lo: d.lo,
            hi: u.hi
          };
        }
      }
    } else
      return l(o, t, e);
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function Te(i, t, e, s, n) {
  const o = i.getSortedVisibleDatasetMetas(), r = e[t];
  for (let a = 0, l = o.length; a < l; ++a) {
    const { index: c, data: h } = o[a], { lo: d, hi: u } = Xa(o[a], t, r, n);
    for (let f = d; f <= u; ++f) {
      const g = h[f];
      g.skip || s(g, c, f);
    }
  }
}
function Ka(i) {
  const t = i.indexOf("x") !== -1, e = i.indexOf("y") !== -1;
  return function(s, n) {
    const o = t ? Math.abs(s.x - n.x) : 0, r = e ? Math.abs(s.y - n.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(r, 2));
  };
}
function xi(i, t, e, s, n) {
  const o = [];
  return !n && !i.isPointInArea(t) || Te(i, e, t, function(a, l, c) {
    !n && !mt(a, i.chartArea, 0) || a.inRange(t.x, t.y, s) && o.push({
      element: a,
      datasetIndex: l,
      index: c
    });
  }, !0), o;
}
function qa(i, t, e, s) {
  let n = [];
  function o(r, a, l) {
    const { startAngle: c, endAngle: h } = r.getProps([
      "startAngle",
      "endAngle"
    ], s), { angle: d } = On(r, {
      x: t.x,
      y: t.y
    });
    ke(d, c, h) && n.push({
      element: r,
      datasetIndex: a,
      index: l
    });
  }
  return Te(i, e, t, o), n;
}
function Ga(i, t, e, s, n, o) {
  let r = [];
  const a = Ka(e);
  let l = Number.POSITIVE_INFINITY;
  function c(h, d, u) {
    const f = h.inRange(t.x, t.y, n);
    if (s && !f)
      return;
    const g = h.getCenterPoint(n);
    if (!(!!o || i.isPointInArea(g)) && !f)
      return;
    const m = a(t, g);
    m < l ? (r = [
      {
        element: h,
        datasetIndex: d,
        index: u
      }
    ], l = m) : m === l && r.push({
      element: h,
      datasetIndex: d,
      index: u
    });
  }
  return Te(i, e, t, c), r;
}
function _i(i, t, e, s, n, o) {
  return !o && !i.isPointInArea(t) ? [] : e === "r" && !s ? qa(i, t, e, n) : Ga(i, t, e, s, n, o);
}
function Ls(i, t, e, s, n) {
  const o = [], r = e === "x" ? "inXRange" : "inYRange";
  let a = !1;
  return Te(i, e, t, (l, c, h) => {
    l[r](t[e], n) && (o.push({
      element: l,
      datasetIndex: c,
      index: h
    }), a = a || l.inRange(t.x, t.y, n));
  }), s && !a ? [] : o;
}
var io = {
  evaluateInteractionItems: Te,
  modes: {
    index(i, t, e, s) {
      const n = Et(t, i), o = e.axis || "x", r = e.includeInvisible || !1, a = e.intersect ? xi(i, n, o, s, r) : _i(i, n, o, !1, s, r), l = [];
      return a.length ? (i.getSortedVisibleDatasetMetas().forEach((c) => {
        const h = a[0].index, d = c.data[h];
        d && !d.skip && l.push({
          element: d,
          datasetIndex: c.index,
          index: h
        });
      }), l) : [];
    },
    dataset(i, t, e, s) {
      const n = Et(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      let a = e.intersect ? xi(i, n, o, s, r) : _i(i, n, o, !1, s, r);
      if (a.length > 0) {
        const l = a[0].datasetIndex, c = i.getDatasetMeta(l).data;
        a = [];
        for (let h = 0; h < c.length; ++h)
          a.push({
            element: c[h],
            datasetIndex: l,
            index: h
          });
      }
      return a;
    },
    point(i, t, e, s) {
      const n = Et(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      return xi(i, n, o, s, r);
    },
    nearest(i, t, e, s) {
      const n = Et(t, i), o = e.axis || "xy", r = e.includeInvisible || !1;
      return _i(i, n, o, e.intersect, s, r);
    },
    x(i, t, e, s) {
      const n = Et(t, i);
      return Ls(i, n, "x", e.intersect, s);
    },
    y(i, t, e, s) {
      const n = Et(t, i);
      return Ls(i, n, "y", e.intersect, s);
    }
  }
};
const so = [
  "left",
  "top",
  "right",
  "bottom"
];
function ee(i, t) {
  return i.filter((e) => e.pos === t);
}
function Rs(i, t) {
  return i.filter((e) => so.indexOf(e.pos) === -1 && e.box.axis === t);
}
function ie(i, t) {
  return i.sort((e, s) => {
    const n = t ? s : e, o = t ? e : s;
    return n.weight === o.weight ? n.index - o.index : n.weight - o.weight;
  });
}
function Za(i) {
  const t = [];
  let e, s, n, o, r, a;
  for (e = 0, s = (i || []).length; e < s; ++e)
    n = i[e], { position: o, options: { stack: r, stackWeight: a = 1 } } = n, t.push({
      index: e,
      box: n,
      pos: o,
      horizontal: n.isHorizontal(),
      weight: n.weight,
      stack: r && o + r,
      stackWeight: a
    });
  return t;
}
function Ja(i) {
  const t = {};
  for (const e of i) {
    const { stack: s, pos: n, stackWeight: o } = e;
    if (!s || !so.includes(n))
      continue;
    const r = t[s] || (t[s] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    r.count++, r.weight += o;
  }
  return t;
}
function Qa(i, t) {
  const e = Ja(i), { vBoxMaxWidth: s, hBoxMaxHeight: n } = t;
  let o, r, a;
  for (o = 0, r = i.length; o < r; ++o) {
    a = i[o];
    const { fullSize: l } = a.box, c = e[a.stack], h = c && a.stackWeight / c.weight;
    a.horizontal ? (a.width = h ? h * s : l && t.availableWidth, a.height = n) : (a.width = s, a.height = h ? h * n : l && t.availableHeight);
  }
  return e;
}
function tl(i) {
  const t = Za(i), e = ie(t.filter((c) => c.box.fullSize), !0), s = ie(ee(t, "left"), !0), n = ie(ee(t, "right")), o = ie(ee(t, "top"), !0), r = ie(ee(t, "bottom")), a = Rs(t, "x"), l = Rs(t, "y");
  return {
    fullSize: e,
    leftAndTop: s.concat(o),
    rightAndBottom: n.concat(l).concat(r).concat(a),
    chartArea: ee(t, "chartArea"),
    vertical: s.concat(n).concat(l),
    horizontal: o.concat(r).concat(a)
  };
}
function Es(i, t, e, s) {
  return Math.max(i[e], t[e]) + Math.max(i[s], t[s]);
}
function no(i, t) {
  i.top = Math.max(i.top, t.top), i.left = Math.max(i.left, t.left), i.bottom = Math.max(i.bottom, t.bottom), i.right = Math.max(i.right, t.right);
}
function el(i, t, e, s) {
  const { pos: n, box: o } = e, r = i.maxPadding;
  if (!T(n)) {
    e.size && (i[n] -= e.size);
    const d = s[e.stack] || {
      size: 0,
      count: 1
    };
    d.size = Math.max(d.size, e.horizontal ? o.height : o.width), e.size = d.size / d.count, i[n] += e.size;
  }
  o.getPadding && no(r, o.getPadding());
  const a = Math.max(0, t.outerWidth - Es(r, i, "left", "right")), l = Math.max(0, t.outerHeight - Es(r, i, "top", "bottom")), c = a !== i.w, h = l !== i.h;
  return i.w = a, i.h = l, e.horizontal ? {
    same: c,
    other: h
  } : {
    same: h,
    other: c
  };
}
function il(i) {
  const t = i.maxPadding;
  function e(s) {
    const n = Math.max(t[s] - i[s], 0);
    return i[s] += n, n;
  }
  i.y += e("top"), i.x += e("left"), e("right"), e("bottom");
}
function sl(i, t) {
  const e = t.maxPadding;
  function s(n) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return n.forEach((r) => {
      o[r] = Math.max(t[r], e[r]);
    }), o;
  }
  return s(i ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function ae(i, t, e, s) {
  const n = [];
  let o, r, a, l, c, h;
  for (o = 0, r = i.length, c = 0; o < r; ++o) {
    a = i[o], l = a.box, l.update(a.width || t.w, a.height || t.h, sl(a.horizontal, t));
    const { same: d, other: u } = el(t, e, a, s);
    c |= d && n.length, h = h || u, l.fullSize || n.push(a);
  }
  return c && ae(n, t, e, s) || h;
}
function Be(i, t, e, s, n) {
  i.top = e, i.left = t, i.right = t + s, i.bottom = e + n, i.width = s, i.height = n;
}
function Is(i, t, e, s) {
  const n = e.padding;
  let { x: o, y: r } = t;
  for (const a of i) {
    const l = a.box, c = s[a.stack] || {
      count: 1,
      placed: 0,
      weight: 1
    }, h = a.stackWeight / c.weight || 1;
    if (a.horizontal) {
      const d = t.w * h, u = c.size || l.height;
      Me(c.start) && (r = c.start), l.fullSize ? Be(l, n.left, r, e.outerWidth - n.right - n.left, u) : Be(l, t.left + c.placed, r, d, u), c.start = r, c.placed += d, r = l.bottom;
    } else {
      const d = t.h * h, u = c.size || l.width;
      Me(c.start) && (o = c.start), l.fullSize ? Be(l, o, n.top, u, e.outerHeight - n.bottom - n.top) : Be(l, o, t.top + c.placed, u, d), c.start = o, c.placed += d, o = l.right;
    }
  }
  t.x = o, t.y = r;
}
var X = {
  addBox(i, t) {
    i.boxes || (i.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(e) {
            t.draw(e);
          }
        }
      ];
    }, i.boxes.push(t);
  },
  removeBox(i, t) {
    const e = i.boxes ? i.boxes.indexOf(t) : -1;
    e !== -1 && i.boxes.splice(e, 1);
  },
  configure(i, t, e) {
    t.fullSize = e.fullSize, t.position = e.position, t.weight = e.weight;
  },
  update(i, t, e, s) {
    if (!i)
      return;
    const n = G(i.options.layout.padding), o = Math.max(t - n.width, 0), r = Math.max(e - n.height, 0), a = tl(i.boxes), l = a.vertical, c = a.horizontal;
    R(i.boxes, (p) => {
      typeof p.beforeLayout == "function" && p.beforeLayout();
    });
    const h = l.reduce((p, m) => m.box.options && m.box.options.display === !1 ? p : p + 1, 0) || 1, d = Object.freeze({
      outerWidth: t,
      outerHeight: e,
      padding: n,
      availableWidth: o,
      availableHeight: r,
      vBoxMaxWidth: o / 2 / h,
      hBoxMaxHeight: r / 2
    }), u = Object.assign({}, n);
    no(u, G(s));
    const f = Object.assign({
      maxPadding: u,
      w: o,
      h: r,
      x: n.left,
      y: n.top
    }, n), g = Qa(l.concat(c), d);
    ae(a.fullSize, f, d, g), ae(l, f, d, g), ae(c, f, d, g) && ae(l, f, d, g), il(f), Is(a.leftAndTop, f, d, g), f.x += f.w, f.y += f.h, Is(a.rightAndBottom, f, d, g), i.chartArea = {
      left: f.left,
      top: f.top,
      right: f.left + f.w,
      bottom: f.top + f.h,
      height: f.h,
      width: f.w
    }, R(a.chartArea, (p) => {
      const m = p.box;
      Object.assign(m, i.chartArea), m.update(f.w, f.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Zi {
  acquireContext(t, e) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, e, s) {
  }
  removeEventListener(t, e, s) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, e, s, n) {
    return e = Math.max(0, e || t.width), s = s || t.height, {
      width: e,
      height: Math.max(0, n ? Math.floor(e / n) : s)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class oo extends Zi {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Xe = "$chartjs", nl = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Fs = (i) => i === null || i === "";
function ol(i, t) {
  const e = i.style, s = i.getAttribute("height"), n = i.getAttribute("width");
  if (i[Xe] = {
    initial: {
      height: s,
      width: n,
      style: {
        display: e.display,
        height: e.height,
        width: e.width
      }
    }
  }, e.display = e.display || "block", e.boxSizing = e.boxSizing || "border-box", Fs(n)) {
    const o = xs(i, "width");
    o !== void 0 && (i.width = o);
  }
  if (Fs(s))
    if (i.style.height === "")
      i.height = i.width / (t || 2);
    else {
      const o = xs(i, "height");
      o !== void 0 && (i.height = o);
    }
  return i;
}
const ro = ua ? {
  passive: !0
} : !1;
function rl(i, t, e) {
  i.addEventListener(t, e, ro);
}
function al(i, t, e) {
  i.canvas.removeEventListener(t, e, ro);
}
function ll(i, t) {
  const e = nl[i.type] || i.type, { x: s, y: n } = Et(i, t);
  return {
    type: e,
    chart: t,
    native: i,
    x: s !== void 0 ? s : null,
    y: n !== void 0 ? n : null
  };
}
function ei(i, t) {
  for (const e of i)
    if (e === t || e.contains(t))
      return !0;
}
function cl(i, t, e) {
  const s = i.canvas, n = new MutationObserver((o) => {
    let r = !1;
    for (const a of o)
      r = r || ei(a.addedNodes, s), r = r && !ei(a.removedNodes, s);
    r && e();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
function hl(i, t, e) {
  const s = i.canvas, n = new MutationObserver((o) => {
    let r = !1;
    for (const a of o)
      r = r || ei(a.removedNodes, s), r = r && !ei(a.addedNodes, s);
    r && e();
  });
  return n.observe(document, {
    childList: !0,
    subtree: !0
  }), n;
}
const Se = /* @__PURE__ */ new Map();
let zs = 0;
function ao() {
  const i = window.devicePixelRatio;
  i !== zs && (zs = i, Se.forEach((t, e) => {
    e.currentDevicePixelRatio !== i && t();
  }));
}
function dl(i, t) {
  Se.size || window.addEventListener("resize", ao), Se.set(i, t);
}
function ul(i) {
  Se.delete(i), Se.size || window.removeEventListener("resize", ao);
}
function fl(i, t, e) {
  const s = i.canvas, n = s && Ki(s);
  if (!n)
    return;
  const o = En((a, l) => {
    const c = n.clientWidth;
    e(a, l), c < n.clientWidth && e();
  }, window), r = new ResizeObserver((a) => {
    const l = a[0], c = l.contentRect.width, h = l.contentRect.height;
    c === 0 && h === 0 || o(c, h);
  });
  return r.observe(n), dl(i, o), r;
}
function yi(i, t, e) {
  e && e.disconnect(), t === "resize" && ul(i);
}
function gl(i, t, e) {
  const s = i.canvas, n = En((o) => {
    i.ctx !== null && e(ll(o, i));
  }, i);
  return rl(s, t, n), n;
}
class lo extends Zi {
  acquireContext(t, e) {
    const s = t && t.getContext && t.getContext("2d");
    return s && s.canvas === t ? (ol(t, e), s) : null;
  }
  releaseContext(t) {
    const e = t.canvas;
    if (!e[Xe])
      return !1;
    const s = e[Xe].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const r = s[o];
      L(r) ? e.removeAttribute(o) : e.setAttribute(o, r);
    });
    const n = s.style || {};
    return Object.keys(n).forEach((o) => {
      e.style[o] = n[o];
    }), e.width = e.width, delete e[Xe], !0;
  }
  addEventListener(t, e, s) {
    this.removeEventListener(t, e);
    const n = t.$proxies || (t.$proxies = {}), r = {
      attach: cl,
      detach: hl,
      resize: fl
    }[e] || gl;
    n[e] = r(t, e, s);
  }
  removeEventListener(t, e) {
    const s = t.$proxies || (t.$proxies = {}), n = s[e];
    if (!n)
      return;
    ({
      attach: yi,
      detach: yi,
      resize: yi
    }[e] || al)(t, e, n), s[e] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, e, s, n) {
    return da(t, e, s, n);
  }
  isAttached(t) {
    const e = Ki(t);
    return !!(e && e.isConnected);
  }
}
function co(i) {
  return !Xi() || typeof OffscreenCanvas < "u" && i instanceof OffscreenCanvas ? oo : lo;
}
class nt {
  constructor() {
    S(this, "x");
    S(this, "y");
    S(this, "active", !1);
    S(this, "options");
    S(this, "$animations");
  }
  tooltipPosition(t) {
    const { x: e, y: s } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: e,
      y: s
    };
  }
  hasValue() {
    return Kt(this.x) && Kt(this.y);
  }
  getProps(t, e) {
    const s = this.$animations;
    if (!e || !s)
      return this;
    const n = {};
    return t.forEach((o) => {
      n[o] = s[o] && s[o].active() ? s[o]._to : this[o];
    }), n;
  }
}
S(nt, "defaults", {}), S(nt, "defaultRoutes");
function pl(i, t) {
  const e = i.options.ticks, s = ml(i), n = Math.min(e.maxTicksLimit || s, s), o = e.major.enabled ? xl(t) : [], r = o.length, a = o[0], l = o[r - 1], c = [];
  if (r > n)
    return _l(t, c, o, r / n), c;
  const h = bl(o, t, n);
  if (r > 0) {
    let d, u;
    const f = r > 1 ? Math.round((l - a) / (r - 1)) : null;
    for (Ve(t, c, h, L(f) ? 0 : a - f, a), d = 0, u = r - 1; d < u; d++)
      Ve(t, c, h, o[d], o[d + 1]);
    return Ve(t, c, h, l, L(f) ? t.length : l + f), c;
  }
  return Ve(t, c, h), c;
}
function ml(i) {
  const t = i.options.offset, e = i._tickSize(), s = i._length / e + (t ? 0 : 1), n = i._maxLength / e;
  return Math.floor(Math.min(s, n));
}
function bl(i, t, e) {
  const s = yl(i), n = t.length / e;
  if (!s)
    return Math.max(n, 1);
  const o = pr(s);
  for (let r = 0, a = o.length - 1; r < a; r++) {
    const l = o[r];
    if (l > n)
      return l;
  }
  return Math.max(n, 1);
}
function xl(i) {
  const t = [];
  let e, s;
  for (e = 0, s = i.length; e < s; e++)
    i[e].major && t.push(e);
  return t;
}
function _l(i, t, e, s) {
  let n = 0, o = e[0], r;
  for (s = Math.ceil(s), r = 0; r < i.length; r++)
    r === o && (t.push(i[r]), n++, o = e[n * s]);
}
function Ve(i, t, e, s, n) {
  const o = A(s, 0), r = Math.min(A(n, i.length), i.length);
  let a = 0, l, c, h;
  for (e = Math.ceil(e), n && (l = n - s, e = l / Math.floor(l / e)), h = o; h < 0; )
    a++, h = Math.round(o + a * e);
  for (c = Math.max(o, 0); c < r; c++)
    c === h && (t.push(i[c]), a++, h = Math.round(o + a * e));
}
function yl(i) {
  const t = i.length;
  let e, s;
  if (t < 2)
    return !1;
  for (s = i[0], e = 1; e < t; ++e)
    if (i[e] - i[e - 1] !== s)
      return !1;
  return s;
}
const vl = (i) => i === "left" ? "right" : i === "right" ? "left" : i, Ws = (i, t, e) => t === "top" || t === "left" ? i[t] + e : i[t] - e, Bs = (i, t) => Math.min(t || i, i);
function Vs(i, t) {
  const e = [], s = i.length / t, n = i.length;
  let o = 0;
  for (; o < n; o += s)
    e.push(i[Math.floor(o)]);
  return e;
}
function Ml(i, t, e) {
  const s = i.ticks.length, n = Math.min(t, s - 1), o = i._startPixel, r = i._endPixel, a = 1e-6;
  let l = i.getPixelForTick(n), c;
  if (!(e && (s === 1 ? c = Math.max(l - o, r - l) : t === 0 ? c = (i.getPixelForTick(1) - l) / 2 : c = (l - i.getPixelForTick(n - 1)) / 2, l += n < t ? c : -c, l < o - a || l > r + a)))
    return l;
}
function kl(i, t) {
  R(i, (e) => {
    const s = e.gc, n = s.length / 2;
    let o;
    if (n > t) {
      for (o = 0; o < n; ++o)
        delete e.data[s[o]];
      s.splice(0, n);
    }
  });
}
function se(i) {
  return i.drawTicks ? i.tickLength : 0;
}
function Ns(i, t) {
  if (!i.display)
    return 0;
  const e = $(i.font, t), s = G(i.padding);
  return (F(i.text) ? i.text.length : 1) * e.lineHeight + s.height;
}
function wl(i, t) {
  return Pt(i, {
    scale: t,
    type: "scale"
  });
}
function Sl(i, t, e) {
  return Pt(i, {
    tick: e,
    index: t,
    type: "tick"
  });
}
function Pl(i, t, e) {
  let s = Ni(i);
  return (e && t !== "right" || !e && t === "right") && (s = vl(s)), s;
}
function Dl(i, t, e, s) {
  const { top: n, left: o, bottom: r, right: a, chart: l } = i, { chartArea: c, scales: h } = l;
  let d = 0, u, f, g;
  const p = r - n, m = a - o;
  if (i.isHorizontal()) {
    if (f = q(s, o, a), T(e)) {
      const b = Object.keys(e)[0], x = e[b];
      g = h[b].getPixelForValue(x) + p - t;
    } else
      e === "center" ? g = (c.bottom + c.top) / 2 + p - t : g = Ws(i, e, t);
    u = a - o;
  } else {
    if (T(e)) {
      const b = Object.keys(e)[0], x = e[b];
      f = h[b].getPixelForValue(x) - m + t;
    } else
      e === "center" ? f = (c.left + c.right) / 2 - m + t : f = Ws(i, e, t);
    g = q(s, r, n), d = e === "left" ? -j : j;
  }
  return {
    titleX: f,
    titleY: g,
    maxWidth: u,
    rotation: d
  };
}
class Dt extends nt {
  constructor(t) {
    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(t) {
    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
  }
  parse(t, e) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: e, _suggestedMin: s, _suggestedMax: n } = this;
    return t = tt(t, Number.POSITIVE_INFINITY), e = tt(e, Number.NEGATIVE_INFINITY), s = tt(s, Number.POSITIVE_INFINITY), n = tt(n, Number.NEGATIVE_INFINITY), {
      min: tt(t, s),
      max: tt(e, n),
      minDefined: N(t),
      maxDefined: N(e)
    };
  }
  getMinMax(t) {
    let { min: e, max: s, minDefined: n, maxDefined: o } = this.getUserBounds(), r;
    if (n && o)
      return {
        min: e,
        max: s
      };
    const a = this.getMatchingVisibleMetas();
    for (let l = 0, c = a.length; l < c; ++l)
      r = a[l].controller.getMinMax(this, t), n || (e = Math.min(e, r.min)), o || (s = Math.max(s, r.max));
    return e = o && e > s ? s : e, s = n && e > s ? e : s, {
      min: tt(e, tt(s, e)),
      max: tt(s, tt(e, s))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
  }
  getLabelItems(t = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(t));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    I(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, e, s) {
    const { beginAtZero: n, grace: o, ticks: r } = this.options, a = r.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this._margins = s = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, s), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + s.left + s.right : this.height + s.top + s.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = jr(this, o, n), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = a < this.ticks.length;
    this._convertTicksToLabels(l ? Vs(this.ticks, a) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), r.display && (r.autoSkip || r.source === "auto") && (this.ticks = pl(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, e, s;
    this.isHorizontal() ? (e = this.left, s = this.right) : (e = this.top, s = this.bottom, t = !t), this._startPixel = e, this._endPixel = s, this._reversePixels = t, this._length = s - e, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    I(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    I(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    I(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), I(this.options[t], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    I(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const e = this.options.ticks;
    let s, n, o;
    for (s = 0, n = t.length; s < n; s++)
      o = t[s], o.label = I(e.callback, [
        o.value,
        s,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    I(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    I(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, e = t.ticks, s = Bs(this.ticks.length, t.ticks.maxTicksLimit), n = e.minRotation || 0, o = e.maxRotation;
    let r = n, a, l, c;
    if (!this._isVisible() || !e.display || n >= o || s <= 1 || !this.isHorizontal()) {
      this.labelRotation = n;
      return;
    }
    const h = this._getLabelSizes(), d = h.widest.width, u = h.highest.height, f = Y(this.chart.width - d, 0, this.maxWidth);
    a = t.offset ? this.maxWidth / s : f / (s - 1), d + 6 > a && (a = f / (s - (t.offset ? 0.5 : 1)), l = this.maxHeight - se(t.grid) - e.padding - Ns(t.title, this.chart.options.font), c = Math.sqrt(d * d + u * u), r = Bi(Math.min(Math.asin(Y((h.highest.height + 6) / a, -1, 1)), Math.asin(Y(l / c, -1, 1)) - Math.asin(Y(u / c, -1, 1)))), r = Math.max(n, Math.min(o, r))), this.labelRotation = r;
  }
  afterCalculateLabelRotation() {
    I(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    I(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: e, options: { ticks: s, title: n, grid: o } } = this, r = this._isVisible(), a = this.isHorizontal();
    if (r) {
      const l = Ns(n, e.options.font);
      if (a ? (t.width = this.maxWidth, t.height = se(o) + l) : (t.height = this.maxHeight, t.width = se(o) + l), s.display && this.ticks.length) {
        const { first: c, last: h, widest: d, highest: u } = this._getLabelSizes(), f = s.padding * 2, g = at(this.labelRotation), p = Math.cos(g), m = Math.sin(g);
        if (a) {
          const b = s.mirror ? 0 : m * d.width + p * u.height;
          t.height = Math.min(this.maxHeight, t.height + b + f);
        } else {
          const b = s.mirror ? 0 : p * d.width + m * u.height;
          t.width = Math.min(this.maxWidth, t.width + b + f);
        }
        this._calculatePadding(c, h, m, p);
      }
    }
    this._handleMargins(), a ? (this.width = this._length = e.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = e.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, e, s, n) {
    const { ticks: { align: o, padding: r }, position: a } = this.options, l = this.labelRotation !== 0, c = a !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const h = this.getPixelForTick(0) - this.left, d = this.right - this.getPixelForTick(this.ticks.length - 1);
      let u = 0, f = 0;
      l ? c ? (u = n * t.width, f = s * e.height) : (u = s * t.height, f = n * e.width) : o === "start" ? f = e.width : o === "end" ? u = t.width : o !== "inner" && (u = t.width / 2, f = e.width / 2), this.paddingLeft = Math.max((u - h + r) * this.width / (this.width - h), 0), this.paddingRight = Math.max((f - d + r) * this.width / (this.width - d), 0);
    } else {
      let h = e.height / 2, d = t.height / 2;
      o === "start" ? (h = 0, d = t.height) : o === "end" && (h = e.height, d = 0), this.paddingTop = h + r, this.paddingBottom = d + r;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    I(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: e } = this.options;
    return e === "top" || e === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let e, s;
    for (e = 0, s = t.length; e < s; e++)
      L(t[e].label) && (t.splice(e, 1), s--, e--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const e = this.options.ticks.sampleSize;
      let s = this.ticks;
      e < s.length && (s = Vs(s, e)), this._labelSizes = t = this._computeLabelSizes(s, s.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, e, s) {
    const { ctx: n, _longestTextCache: o } = this, r = [], a = [], l = Math.floor(e / Bs(e, s));
    let c = 0, h = 0, d, u, f, g, p, m, b, x, v, y, _;
    for (d = 0; d < e; d += l) {
      if (g = t[d].label, p = this._resolveTickFontOptions(d), n.font = m = p.string, b = o[m] = o[m] || {
        data: {},
        gc: []
      }, x = p.lineHeight, v = y = 0, !L(g) && !F(g))
        v = Je(n, b.data, b.gc, v, g), y = x;
      else if (F(g))
        for (u = 0, f = g.length; u < f; ++u)
          _ = g[u], !L(_) && !F(_) && (v = Je(n, b.data, b.gc, v, _), y += x);
      r.push(v), a.push(y), c = Math.max(v, c), h = Math.max(y, h);
    }
    kl(o, e);
    const w = r.indexOf(c), k = a.indexOf(h), M = (P) => ({
      width: r[P] || 0,
      height: a[P] || 0
    });
    return {
      first: M(0),
      last: M(e - 1),
      widest: M(w),
      highest: M(k),
      widths: r,
      heights: a
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, e) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const e = this._startPixel + t * this._length;
    return xr(this._alignToPixels ? Tt(this.chart, e, 0) : e);
  }
  getDecimalForPixel(t) {
    const e = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - e : e;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: e } = this;
    return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
  }
  getContext(t) {
    const e = this.ticks || [];
    if (t >= 0 && t < e.length) {
      const s = e[t];
      return s.$context || (s.$context = Sl(this.getContext(), t, s));
    }
    return this.$context || (this.$context = wl(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, e = at(this.labelRotation), s = Math.abs(Math.cos(e)), n = Math.abs(Math.sin(e)), o = this._getLabelSizes(), r = t.autoSkipPadding || 0, a = o ? o.widest.width + r : 0, l = o ? o.highest.height + r : 0;
    return this.isHorizontal() ? l * s > a * n ? a / s : l / n : l * n < a * s ? l / s : a / n;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const e = this.axis, s = this.chart, n = this.options, { grid: o, position: r, border: a } = n, l = o.offset, c = this.isHorizontal(), d = this.ticks.length + (l ? 1 : 0), u = se(o), f = [], g = a.setContext(this.getContext()), p = g.display ? g.width : 0, m = p / 2, b = function(B) {
      return Tt(s, B, p);
    };
    let x, v, y, _, w, k, M, P, D, C, O, U;
    if (r === "top")
      x = b(this.bottom), k = this.bottom - u, P = x - m, C = b(t.top) + m, U = t.bottom;
    else if (r === "bottom")
      x = b(this.top), C = t.top, U = b(t.bottom) - m, k = x + m, P = this.top + u;
    else if (r === "left")
      x = b(this.right), w = this.right - u, M = x - m, D = b(t.left) + m, O = t.right;
    else if (r === "right")
      x = b(this.left), D = t.left, O = b(t.right) - m, w = x + m, M = this.left + u;
    else if (e === "x") {
      if (r === "center")
        x = b((t.top + t.bottom) / 2 + 0.5);
      else if (T(r)) {
        const B = Object.keys(r)[0], H = r[B];
        x = b(this.chart.scales[B].getPixelForValue(H));
      }
      C = t.top, U = t.bottom, k = x + m, P = k + u;
    } else if (e === "y") {
      if (r === "center")
        x = b((t.left + t.right) / 2);
      else if (T(r)) {
        const B = Object.keys(r)[0], H = r[B];
        x = b(this.chart.scales[B].getPixelForValue(H));
      }
      w = x - m, M = w - u, D = t.left, O = t.right;
    }
    const Q = A(n.ticks.maxTicksLimit, d), E = Math.max(1, Math.ceil(d / Q));
    for (v = 0; v < d; v += E) {
      const B = this.getContext(v), H = o.setContext(B), ot = a.setContext(B), K = H.lineWidth, Vt = H.color, Le = ot.dash || [], Nt = ot.dashOffset, Jt = H.tickWidth, Ct = H.tickColor, Qt = H.tickBorderDash || [], At = H.tickBorderDashOffset;
      y = Ml(this, v, l), y !== void 0 && (_ = Tt(s, y, K), c ? w = M = D = O = _ : k = P = C = U = _, f.push({
        tx1: w,
        ty1: k,
        tx2: M,
        ty2: P,
        x1: D,
        y1: C,
        x2: O,
        y2: U,
        width: K,
        color: Vt,
        borderDash: Le,
        borderDashOffset: Nt,
        tickWidth: Jt,
        tickColor: Ct,
        tickBorderDash: Qt,
        tickBorderDashOffset: At
      }));
    }
    return this._ticksLength = d, this._borderValue = x, f;
  }
  _computeLabelItems(t) {
    const e = this.axis, s = this.options, { position: n, ticks: o } = s, r = this.isHorizontal(), a = this.ticks, { align: l, crossAlign: c, padding: h, mirror: d } = o, u = se(s.grid), f = u + h, g = d ? -h : f, p = -at(this.labelRotation), m = [];
    let b, x, v, y, _, w, k, M, P, D, C, O, U = "middle";
    if (n === "top")
      w = this.bottom - g, k = this._getXAxisLabelAlignment();
    else if (n === "bottom")
      w = this.top + g, k = this._getXAxisLabelAlignment();
    else if (n === "left") {
      const E = this._getYAxisLabelAlignment(u);
      k = E.textAlign, _ = E.x;
    } else if (n === "right") {
      const E = this._getYAxisLabelAlignment(u);
      k = E.textAlign, _ = E.x;
    } else if (e === "x") {
      if (n === "center")
        w = (t.top + t.bottom) / 2 + f;
      else if (T(n)) {
        const E = Object.keys(n)[0], B = n[E];
        w = this.chart.scales[E].getPixelForValue(B) + f;
      }
      k = this._getXAxisLabelAlignment();
    } else if (e === "y") {
      if (n === "center")
        _ = (t.left + t.right) / 2 - f;
      else if (T(n)) {
        const E = Object.keys(n)[0], B = n[E];
        _ = this.chart.scales[E].getPixelForValue(B);
      }
      k = this._getYAxisLabelAlignment(u).textAlign;
    }
    e === "y" && (l === "start" ? U = "top" : l === "end" && (U = "bottom"));
    const Q = this._getLabelSizes();
    for (b = 0, x = a.length; b < x; ++b) {
      v = a[b], y = v.label;
      const E = o.setContext(this.getContext(b));
      M = this.getPixelForTick(b) + o.labelOffset, P = this._resolveTickFontOptions(b), D = P.lineHeight, C = F(y) ? y.length : 1;
      const B = C / 2, H = E.color, ot = E.textStrokeColor, K = E.textStrokeWidth;
      let Vt = k;
      r ? (_ = M, k === "inner" && (b === x - 1 ? Vt = this.options.reverse ? "left" : "right" : b === 0 ? Vt = this.options.reverse ? "right" : "left" : Vt = "center"), n === "top" ? c === "near" || p !== 0 ? O = -C * D + D / 2 : c === "center" ? O = -Q.highest.height / 2 - B * D + D : O = -Q.highest.height + D / 2 : c === "near" || p !== 0 ? O = D / 2 : c === "center" ? O = Q.highest.height / 2 - B * D : O = Q.highest.height - C * D, d && (O *= -1), p !== 0 && !E.showLabelBackdrop && (_ += D / 2 * Math.sin(p))) : (w = M, O = (1 - C) * D / 2);
      let Le;
      if (E.showLabelBackdrop) {
        const Nt = G(E.backdropPadding), Jt = Q.heights[b], Ct = Q.widths[b];
        let Qt = O - Nt.top, At = 0 - Nt.left;
        switch (U) {
          case "middle":
            Qt -= Jt / 2;
            break;
          case "bottom":
            Qt -= Jt;
            break;
        }
        switch (k) {
          case "center":
            At -= Ct / 2;
            break;
          case "right":
            At -= Ct;
            break;
          case "inner":
            b === x - 1 ? At -= Ct : b > 0 && (At -= Ct / 2);
            break;
        }
        Le = {
          left: At,
          top: Qt,
          width: Ct + Nt.width,
          height: Jt + Nt.height,
          color: E.backdropColor
        };
      }
      m.push({
        label: y,
        font: P,
        textOffset: O,
        options: {
          rotation: p,
          color: H,
          strokeColor: ot,
          strokeWidth: K,
          textAlign: Vt,
          textBaseline: U,
          translation: [
            _,
            w
          ],
          backdrop: Le
        }
      });
    }
    return m;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: e } = this.options;
    if (-at(this.labelRotation))
      return t === "top" ? "left" : "right";
    let n = "center";
    return e.align === "start" ? n = "left" : e.align === "end" ? n = "right" : e.align === "inner" && (n = "inner"), n;
  }
  _getYAxisLabelAlignment(t) {
    const { position: e, ticks: { crossAlign: s, mirror: n, padding: o } } = this.options, r = this._getLabelSizes(), a = t + o, l = r.widest.width;
    let c, h;
    return e === "left" ? n ? (h = this.right + o, s === "near" ? c = "left" : s === "center" ? (c = "center", h += l / 2) : (c = "right", h += l)) : (h = this.right - a, s === "near" ? c = "right" : s === "center" ? (c = "center", h -= l / 2) : (c = "left", h = this.left)) : e === "right" ? n ? (h = this.left + o, s === "near" ? c = "right" : s === "center" ? (c = "center", h -= l / 2) : (c = "left", h -= l)) : (h = this.left + a, s === "near" ? c = "left" : s === "center" ? (c = "center", h += l / 2) : (c = "right", h = this.right)) : c = "right", {
      textAlign: c,
      x: h
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, e = this.options.position;
    if (e === "left" || e === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (e === "top" || e === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: e }, left: s, top: n, width: o, height: r } = this;
    e && (t.save(), t.fillStyle = e, t.fillRect(s, n, o, r), t.restore());
  }
  getLineWidthForValue(t) {
    const e = this.options.grid;
    if (!this._isVisible() || !e.display)
      return 0;
    const n = this.ticks.findIndex((o) => o.value === t);
    return n >= 0 ? e.setContext(this.getContext(n)).lineWidth : 0;
  }
  drawGrid(t) {
    const e = this.options.grid, s = this.ctx, n = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, r;
    const a = (l, c, h) => {
      !h.width || !h.color || (s.save(), s.lineWidth = h.width, s.strokeStyle = h.color, s.setLineDash(h.borderDash || []), s.lineDashOffset = h.borderDashOffset, s.beginPath(), s.moveTo(l.x, l.y), s.lineTo(c.x, c.y), s.stroke(), s.restore());
    };
    if (e.display)
      for (o = 0, r = n.length; o < r; ++o) {
        const l = n[o];
        e.drawOnChartArea && a({
          x: l.x1,
          y: l.y1
        }, {
          x: l.x2,
          y: l.y2
        }, l), e.drawTicks && a({
          x: l.tx1,
          y: l.ty1
        }, {
          x: l.tx2,
          y: l.ty2
        }, {
          color: l.tickColor,
          width: l.tickWidth,
          borderDash: l.tickBorderDash,
          borderDashOffset: l.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: e, options: { border: s, grid: n } } = this, o = s.setContext(this.getContext()), r = s.display ? o.width : 0;
    if (!r)
      return;
    const a = n.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let c, h, d, u;
    this.isHorizontal() ? (c = Tt(t, this.left, r) - r / 2, h = Tt(t, this.right, a) + a / 2, d = u = l) : (d = Tt(t, this.top, r) - r / 2, u = Tt(t, this.bottom, a) + a / 2, c = h = l), e.save(), e.lineWidth = o.width, e.strokeStyle = o.color, e.beginPath(), e.moveTo(c, d), e.lineTo(h, u), e.stroke(), e.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const s = this.ctx, n = this._computeLabelArea();
    n && li(s, n);
    const o = this.getLabelItems(t);
    for (const r of o) {
      const a = r.options, l = r.font, c = r.label, h = r.textOffset;
      Bt(s, c, 0, h, l, a);
    }
    n && ci(s);
  }
  drawTitle() {
    const { ctx: t, options: { position: e, title: s, reverse: n } } = this;
    if (!s.display)
      return;
    const o = $(s.font), r = G(s.padding), a = s.align;
    let l = o.lineHeight / 2;
    e === "bottom" || e === "center" || T(e) ? (l += r.bottom, F(s.text) && (l += o.lineHeight * (s.text.length - 1))) : l += r.top;
    const { titleX: c, titleY: h, maxWidth: d, rotation: u } = Dl(this, l, e, a);
    Bt(t, s.text, 0, 0, o, {
      color: s.color,
      maxWidth: d,
      rotation: u,
      textAlign: Pl(a, e, n),
      textBaseline: "middle",
      translation: [
        c,
        h
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, e = t.ticks && t.ticks.z || 0, s = A(t.grid && t.grid.z, -1), n = A(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Dt.prototype.draw ? [
      {
        z: e,
        draw: (o) => {
          this.draw(o);
        }
      }
    ] : [
      {
        z: s,
        draw: (o) => {
          this.drawBackground(), this.drawGrid(o), this.drawTitle();
        }
      },
      {
        z: n,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: e,
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const e = this.chart.getSortedVisibleDatasetMetas(), s = this.axis + "AxisID", n = [];
    let o, r;
    for (o = 0, r = e.length; o < r; ++o) {
      const a = e[o];
      a[s] === this.id && (!t || a.type === t) && n.push(a);
    }
    return n;
  }
  _resolveTickFontOptions(t) {
    const e = this.options.ticks.setContext(this.getContext(t));
    return $(e.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class Ne {
  constructor(t, e, s) {
    this.type = t, this.scope = e, this.override = s, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const e = Object.getPrototypeOf(t);
    let s;
    Ol(e) && (s = this.register(e));
    const n = this.items, o = t.id, r = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in n || (n[o] = t, Cl(t, r, s), this.override && V.override(t.id, t.overrides)), r;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const e = this.items, s = t.id, n = this.scope;
    s in e && delete e[s], n && s in V[n] && (delete V[n][s], this.override && delete Wt[s]);
  }
}
function Cl(i, t, e) {
  const s = ve(/* @__PURE__ */ Object.create(null), [
    e ? V.get(e) : {},
    V.get(t),
    i.defaults
  ]);
  V.set(t, s), i.defaultRoutes && Al(t, i.defaultRoutes), i.descriptors && V.describe(t, i.descriptors);
}
function Al(i, t) {
  Object.keys(t).forEach((e) => {
    const s = e.split("."), n = s.pop(), o = [
      i
    ].concat(s).join("."), r = t[e].split("."), a = r.pop(), l = r.join(".");
    V.route(o, n, l, a);
  });
}
function Ol(i) {
  return "id" in i && "defaults" in i;
}
class Tl {
  constructor() {
    this.controllers = new Ne(st, "datasets", !0), this.elements = new Ne(nt, "elements"), this.plugins = new Ne(Object, "plugins"), this.scales = new Ne(Dt, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, e, s) {
    [
      ...e
    ].forEach((n) => {
      const o = s || this._getRegistryForType(n);
      s || o.isForType(n) || o === this.plugins && n.id ? this._exec(t, o, n) : R(n, (r) => {
        const a = s || this._getRegistryForType(r);
        this._exec(t, a, r);
      });
    });
  }
  _exec(t, e, s) {
    const n = Wi(t);
    I(s["before" + n], [], s), e[t](s), I(s["after" + n], [], s);
  }
  _getRegistryForType(t) {
    for (let e = 0; e < this._typedRegistries.length; e++) {
      const s = this._typedRegistries[e];
      if (s.isForType(t))
        return s;
    }
    return this.plugins;
  }
  _get(t, e, s) {
    const n = e.get(t);
    if (n === void 0)
      throw new Error('"' + t + '" is not a registered ' + s + ".");
    return n;
  }
}
var rt = /* @__PURE__ */ new Tl();
class Ll {
  constructor() {
    this._init = [];
  }
  notify(t, e, s, n) {
    e === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install"));
    const o = n ? this._descriptors(t).filter(n) : this._descriptors(t), r = this._notify(o, t, e, s);
    return e === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall")), r;
  }
  _notify(t, e, s, n) {
    n = n || {};
    for (const o of t) {
      const r = o.plugin, a = r[s], l = [
        e,
        n,
        o.options
      ];
      if (I(a, l, r) === !1 && n.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    L(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const e = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), e;
  }
  _createDescriptors(t, e) {
    const s = t && t.config, n = A(s.options && s.options.plugins, {}), o = Rl(s);
    return n === !1 && !e ? [] : Il(t, o, n, e);
  }
  _notifyStateChanges(t) {
    const e = this._oldCache || [], s = this._cache, n = (o, r) => o.filter((a) => !r.some((l) => a.plugin.id === l.plugin.id));
    this._notify(n(e, s), t, "stop"), this._notify(n(s, e), t, "start");
  }
}
function Rl(i) {
  const t = {}, e = [], s = Object.keys(rt.plugins.items);
  for (let o = 0; o < s.length; o++)
    e.push(rt.getPlugin(s[o]));
  const n = i.plugins || [];
  for (let o = 0; o < n.length; o++) {
    const r = n[o];
    e.indexOf(r) === -1 && (e.push(r), t[r.id] = !0);
  }
  return {
    plugins: e,
    localIds: t
  };
}
function El(i, t) {
  return !t && i === !1 ? null : i === !0 ? {} : i;
}
function Il(i, { plugins: t, localIds: e }, s, n) {
  const o = [], r = i.getContext();
  for (const a of t) {
    const l = a.id, c = El(s[l], n);
    c !== null && o.push({
      plugin: a,
      options: Fl(i.config, {
        plugin: a,
        local: e[l]
      }, c, r)
    });
  }
  return o;
}
function Fl(i, { plugin: t, local: e }, s, n) {
  const o = i.pluginScopeKeys(t), r = i.getOptionScopes(s, o);
  return e && t.defaults && r.push(t.defaults), i.createResolver(r, n, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Ci(i, t) {
  const e = V.datasets[i] || {};
  return ((t.datasets || {})[i] || {}).indexAxis || t.indexAxis || e.indexAxis || "x";
}
function zl(i, t) {
  let e = i;
  return i === "_index_" ? e = t : i === "_value_" && (e = t === "x" ? "y" : "x"), e;
}
function Wl(i, t) {
  return i === t ? "_index_" : "_value_";
}
function Hs(i) {
  if (i === "x" || i === "y" || i === "r")
    return i;
}
function Bl(i) {
  if (i === "top" || i === "bottom")
    return "x";
  if (i === "left" || i === "right")
    return "y";
}
function Ai(i, ...t) {
  if (Hs(i))
    return i;
  for (const e of t) {
    const s = e.axis || Bl(e.position) || i.length > 1 && Hs(i[0].toLowerCase());
    if (s)
      return s;
  }
  throw new Error(`Cannot determine type of '${i}' axis. Please provide 'axis' or 'position' option.`);
}
function js(i, t, e) {
  if (e[t + "AxisID"] === i)
    return {
      axis: t
    };
}
function Vl(i, t) {
  if (t.data && t.data.datasets) {
    const e = t.data.datasets.filter((s) => s.xAxisID === i || s.yAxisID === i);
    if (e.length)
      return js(i, "x", e[0]) || js(i, "y", e[0]);
  }
  return {};
}
function Nl(i, t) {
  const e = Wt[i.type] || {
    scales: {}
  }, s = t.scales || {}, n = Ci(i.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(s).forEach((r) => {
    const a = s[r];
    if (!T(a))
      return console.error(`Invalid scale configuration for scale: ${r}`);
    if (a._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${r}`);
    const l = Ai(r, a, Vl(r, i), V.scales[a.type]), c = Wl(l, n), h = e.scales || {};
    o[r] = ce(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      a,
      h[l],
      h[c]
    ]);
  }), i.data.datasets.forEach((r) => {
    const a = r.type || i.type, l = r.indexAxis || Ci(a, t), h = (Wt[a] || {}).scales || {};
    Object.keys(h).forEach((d) => {
      const u = zl(d, l), f = r[u + "AxisID"] || u;
      o[f] = o[f] || /* @__PURE__ */ Object.create(null), ce(o[f], [
        {
          axis: u
        },
        s[f],
        h[d]
      ]);
    });
  }), Object.keys(o).forEach((r) => {
    const a = o[r];
    ce(a, [
      V.scales[a.type],
      V.scale
    ]);
  }), o;
}
function ho(i) {
  const t = i.options || (i.options = {});
  t.plugins = A(t.plugins, {}), t.scales = Nl(i, t);
}
function uo(i) {
  return i = i || {}, i.datasets = i.datasets || [], i.labels = i.labels || [], i;
}
function Hl(i) {
  return i = i || {}, i.data = uo(i.data), ho(i), i;
}
const $s = /* @__PURE__ */ new Map(), fo = /* @__PURE__ */ new Set();
function He(i, t) {
  let e = $s.get(i);
  return e || (e = t(), $s.set(i, e), fo.add(e)), e;
}
const ne = (i, t, e) => {
  const s = wt(t, e);
  s !== void 0 && i.add(s);
};
class jl {
  constructor(t) {
    this._config = Hl(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = uo(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), ho(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return He(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, e) {
    return He(`${t}.transition.${e}`, () => [
      [
        `datasets.${t}.transitions.${e}`,
        `transitions.${e}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, e) {
    return He(`${t}-${e}`, () => [
      [
        `datasets.${t}.elements.${e}`,
        `datasets.${t}`,
        `elements.${e}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const e = t.id, s = this.type;
    return He(`${s}-plugin-${e}`, () => [
      [
        `plugins.${e}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, e) {
    const s = this._scopeCache;
    let n = s.get(t);
    return (!n || e) && (n = /* @__PURE__ */ new Map(), s.set(t, n)), n;
  }
  getOptionScopes(t, e, s) {
    const { options: n, type: o } = this, r = this._cachedScopes(t, s), a = r.get(e);
    if (a)
      return a;
    const l = /* @__PURE__ */ new Set();
    e.forEach((h) => {
      t && (l.add(t), h.forEach((d) => ne(l, t, d))), h.forEach((d) => ne(l, n, d)), h.forEach((d) => ne(l, Wt[o] || {}, d)), h.forEach((d) => ne(l, V, d)), h.forEach((d) => ne(l, Pi, d));
    });
    const c = Array.from(l);
    return c.length === 0 && c.push(/* @__PURE__ */ Object.create(null)), fo.has(e) && r.set(e, c), c;
  }
  chartOptionScopes() {
    const { options: t, type: e } = this;
    return [
      t,
      Wt[e] || {},
      V.datasets[e] || {},
      {
        type: e
      },
      V,
      Pi
    ];
  }
  resolveNamedOptions(t, e, s, n = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: r, subPrefixes: a } = Ys(this._resolverCache, t, n);
    let l = r;
    if (Yl(r, e)) {
      o.$shared = !1, s = St(s) ? s() : s;
      const c = this.createResolver(t, s, a);
      l = qt(r, s, c);
    }
    for (const c of e)
      o[c] = l[c];
    return o;
  }
  createResolver(t, e, s = [
    ""
  ], n) {
    const { resolver: o } = Ys(this._resolverCache, t, s);
    return T(e) ? qt(o, e, void 0, n) : o;
  }
}
function Ys(i, t, e) {
  let s = i.get(t);
  s || (s = /* @__PURE__ */ new Map(), i.set(t, s));
  const n = e.join();
  let o = s.get(n);
  return o || (o = {
    resolver: $i(t, e),
    subPrefixes: e.filter((a) => !a.toLowerCase().includes("hover"))
  }, s.set(n, o)), o;
}
const $l = (i) => T(i) && Object.getOwnPropertyNames(i).some((t) => St(i[t]));
function Yl(i, t) {
  const { isScriptable: e, isIndexable: s } = Vn(i);
  for (const n of t) {
    const o = e(n), r = s(n), a = (r || o) && i[n];
    if (o && (St(a) || $l(a)) || r && F(a))
      return !0;
  }
  return !1;
}
var Ul = "4.4.1";
const Xl = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Us(i, t) {
  return i === "top" || i === "bottom" || Xl.indexOf(i) === -1 && t === "x";
}
function Xs(i, t) {
  return function(e, s) {
    return e[i] === s[i] ? e[t] - s[t] : e[i] - s[i];
  };
}
function Ks(i) {
  const t = i.chart, e = t.options.animation;
  t.notifyPlugins("afterRender"), I(e && e.onComplete, [
    i
  ], t);
}
function Kl(i) {
  const t = i.chart, e = t.options.animation;
  I(e && e.onProgress, [
    i
  ], t);
}
function go(i) {
  return Xi() && typeof i == "string" ? i = document.getElementById(i) : i && i.length && (i = i[0]), i && i.canvas && (i = i.canvas), i;
}
const Ke = {}, qs = (i) => {
  const t = go(i);
  return Object.values(Ke).filter((e) => e.canvas === t).pop();
};
function ql(i, t, e) {
  const s = Object.keys(i);
  for (const n of s) {
    const o = +n;
    if (o >= t) {
      const r = i[n];
      delete i[n], (e > 0 || o > t) && (i[o + e] = r);
    }
  }
}
function Gl(i, t, e, s) {
  return !e || i.type === "mouseout" ? null : s ? t : i;
}
function je(i, t, e) {
  return i.options.clip ? i[e] : t[e];
}
function Zl(i, t) {
  const { xScale: e, yScale: s } = i;
  return e && s ? {
    left: je(e, t, "left"),
    right: je(e, t, "right"),
    top: je(s, t, "top"),
    bottom: je(s, t, "bottom")
  } : t;
}
class xt {
  static register(...t) {
    rt.add(...t), Gs();
  }
  static unregister(...t) {
    rt.remove(...t), Gs();
  }
  constructor(t, e) {
    const s = this.config = new jl(e), n = go(t), o = qs(n);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const r = s.createResolver(s.chartOptionScopes(), this.getContext());
    this.platform = new (s.platform || co(n))(), this.platform.updateConfig(s);
    const a = this.platform.acquireContext(n, r.aspectRatio), l = a && a.canvas, c = l && l.height, h = l && l.width;
    if (this.id = rr(), this.ctx = a, this.canvas = l, this.width = h, this.height = c, this._options = r, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Ll(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Mr((d) => this.update(d), r.resizeDelay || 0), this._dataChanges = [], Ke[this.id] = this, !a || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    ct.listen(this, "complete", Ks), ct.listen(this, "progress", Kl), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: e }, width: s, height: n, _aspectRatio: o } = this;
    return L(t) ? e && o ? o : n ? s / n : null : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  get registry() {
    return rt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : bs(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return gs(this.canvas, this.ctx), this;
  }
  stop() {
    return ct.stop(this), this;
  }
  resize(t, e) {
    ct.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: e
    } : this._resize(t, e);
  }
  _resize(t, e) {
    const s = this.options, n = this.canvas, o = s.maintainAspectRatio && this.aspectRatio, r = this.platform.getMaximumSize(n, t, e, o), a = s.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = r.width, this.height = r.height, this._aspectRatio = this.aspectRatio, bs(this, a, !0) && (this.notifyPlugins("resize", {
      size: r
    }), I(s.onResize, [
      this,
      r
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const e = this.options.scales || {};
    R(e, (s, n) => {
      s.id = n;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, e = t.scales, s = this.scales, n = Object.keys(s).reduce((r, a) => (r[a] = !1, r), {});
    let o = [];
    e && (o = o.concat(Object.keys(e).map((r) => {
      const a = e[r], l = Ai(r, a), c = l === "r", h = l === "x";
      return {
        options: a,
        dposition: c ? "chartArea" : h ? "bottom" : "left",
        dtype: c ? "radialLinear" : h ? "category" : "linear"
      };
    }))), R(o, (r) => {
      const a = r.options, l = a.id, c = Ai(l, a), h = A(a.type, r.dtype);
      (a.position === void 0 || Us(a.position, c) !== Us(r.dposition)) && (a.position = r.dposition), n[l] = !0;
      let d = null;
      if (l in s && s[l].type === h)
        d = s[l];
      else {
        const u = rt.getScale(h);
        d = new u({
          id: l,
          type: h,
          ctx: this.ctx,
          chart: this
        }), s[d.id] = d;
      }
      d.init(a, t);
    }), R(n, (r, a) => {
      r || delete s[a];
    }), R(s, (r) => {
      X.configure(this, r, r.options), X.addBox(this, r);
    });
  }
  _updateMetasets() {
    const t = this._metasets, e = this.data.datasets.length, s = t.length;
    if (t.sort((n, o) => n.index - o.index), s > e) {
      for (let n = e; n < s; ++n)
        this._destroyDatasetMeta(n);
      t.splice(e, s - e);
    }
    this._sortedMetasets = t.slice(0).sort(Xs("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: e } } = this;
    t.length > e.length && delete this._stacks, t.forEach((s, n) => {
      e.filter((o) => o === s._dataset).length === 0 && this._destroyDatasetMeta(n);
    });
  }
  buildOrUpdateControllers() {
    const t = [], e = this.data.datasets;
    let s, n;
    for (this._removeUnreferencedMetasets(), s = 0, n = e.length; s < n; s++) {
      const o = e[s];
      let r = this.getDatasetMeta(s);
      const a = o.type || this.config.type;
      if (r.type && r.type !== a && (this._destroyDatasetMeta(s), r = this.getDatasetMeta(s)), r.type = a, r.indexAxis = o.indexAxis || Ci(a, this.options), r.order = o.order || 0, r.index = s, r.label = "" + o.label, r.visible = this.isDatasetVisible(s), r.controller)
        r.controller.updateIndex(s), r.controller.linkScales();
      else {
        const l = rt.getController(a), { datasetElementType: c, dataElementType: h } = V.datasets[a];
        Object.assign(l, {
          dataElementType: rt.getElement(h),
          datasetElementType: c && rt.getElement(c)
        }), r.controller = new l(this, s), t.push(r.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    R(this.data.datasets, (t, e) => {
      this.getDatasetMeta(e).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const e = this.config;
    e.update();
    const s = this._options = e.createResolver(e.chartOptionScopes(), this.getContext()), n = this._animationsDisabled = !s.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let r = 0;
    for (let c = 0, h = this.data.datasets.length; c < h; c++) {
      const { controller: d } = this.getDatasetMeta(c), u = !n && o.indexOf(d) === -1;
      d.buildOrUpdateElements(u), r = Math.max(+d.getMaxOverflow(), r);
    }
    r = this._minPadding = s.layout.autoPadding ? r : 0, this._updateLayout(r), n || R(o, (c) => {
      c.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Xs("z", "_idx"));
    const { _active: a, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : a.length && this._updateHoverStyles(a, a, !0), this.render();
  }
  _updateScales() {
    R(this.scales, (t) => {
      X.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, e = new Set(Object.keys(this._listeners)), s = new Set(t.events);
    (!os(e, s) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, e = this._getUniformDataChanges() || [];
    for (const { method: s, start: n, count: o } of e) {
      const r = s === "_removeElements" ? -o : o;
      ql(t, n, r);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const e = this.data.datasets.length, s = (o) => new Set(t.filter((r) => r[0] === o).map((r, a) => a + "," + r.splice(1).join(","))), n = s(0);
    for (let o = 1; o < e; o++)
      if (!os(n, s(o)))
        return;
    return Array.from(n).map((o) => o.split(",")).map((o) => ({
      method: o[1],
      start: +o[2],
      count: +o[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    X.update(this, this.width, this.height, t);
    const e = this.chartArea, s = e.width <= 0 || e.height <= 0;
    this._layers = [], R(this.boxes, (n) => {
      s && n.position === "chartArea" || (n.configure && n.configure(), this._layers.push(...n._layers()));
    }, this), this._layers.forEach((n, o) => {
      n._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let e = 0, s = this.data.datasets.length; e < s; ++e)
        this.getDatasetMeta(e).controller.configure();
      for (let e = 0, s = this.data.datasets.length; e < s; ++e)
        this._updateDataset(e, St(t) ? t({
          datasetIndex: e
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, e) {
    const s = this.getDatasetMeta(t), n = {
      meta: s,
      index: t,
      mode: e,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", n) !== !1 && (s.controller._update(e), n.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", n));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (ct.has(this) ? this.attached && !ct.running(this) && ct.start(this) : (this.draw(), Ks({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: s, height: n } = this._resizeBeforeDraw;
      this._resize(s, n), this._resizeBeforeDraw = null;
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const e = this._layers;
    for (t = 0; t < e.length && e[t].z <= 0; ++t)
      e[t].draw(this.chartArea);
    for (this._drawDatasets(); t < e.length; ++t)
      e[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const e = this._sortedMetasets, s = [];
    let n, o;
    for (n = 0, o = e.length; n < o; ++n) {
      const r = e[n];
      (!t || r.visible) && s.push(r);
    }
    return s;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let e = t.length - 1; e >= 0; --e)
      this._drawDataset(t[e]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const e = this.ctx, s = t._clip, n = !s.disabled, o = Zl(t, this.chartArea), r = {
      meta: t,
      index: t.index,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetDraw", r) !== !1 && (n && li(e, {
      left: s.left === !1 ? 0 : o.left - s.left,
      right: s.right === !1 ? this.width : o.right + s.right,
      top: s.top === !1 ? 0 : o.top - s.top,
      bottom: s.bottom === !1 ? this.height : o.bottom + s.bottom
    }), t.controller.draw(), n && ci(e), r.cancelable = !1, this.notifyPlugins("afterDatasetDraw", r));
  }
  isPointInArea(t) {
    return mt(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, e, s, n) {
    const o = io.modes[e];
    return typeof o == "function" ? o(this, t, s, n) : [];
  }
  getDatasetMeta(t) {
    const e = this.data.datasets[t], s = this._metasets;
    let n = s.filter((o) => o && o._dataset === e).pop();
    return n || (n = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: e && e.order || 0,
      index: t,
      _dataset: e,
      _parsed: [],
      _sorted: !1
    }, s.push(n)), n;
  }
  getContext() {
    return this.$context || (this.$context = Pt(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const e = this.data.datasets[t];
    if (!e)
      return !1;
    const s = this.getDatasetMeta(t);
    return typeof s.hidden == "boolean" ? !s.hidden : !e.hidden;
  }
  setDatasetVisibility(t, e) {
    const s = this.getDatasetMeta(t);
    s.hidden = !e;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, e, s) {
    const n = s ? "show" : "hide", o = this.getDatasetMeta(t), r = o.controller._resolveAnimations(void 0, n);
    Me(e) ? (o.data[e].hidden = !s, this.update()) : (this.setDatasetVisibility(t, s), r.update(o, {
      visible: s
    }), this.update((a) => a.datasetIndex === t ? n : void 0));
  }
  hide(t, e) {
    this._updateVisibility(t, e, !1);
  }
  show(t, e) {
    this._updateVisibility(t, e, !0);
  }
  _destroyDatasetMeta(t) {
    const e = this._metasets[t];
    e && e.controller && e.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, e;
    for (this.stop(), ct.remove(this), t = 0, e = this.data.datasets.length; t < e; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: e } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), gs(t, e), this.platform.releaseContext(e), this.canvas = null, this.ctx = null), delete Ke[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, e = this.platform, s = (o, r) => {
      e.addEventListener(this, o, r), t[o] = r;
    }, n = (o, r, a) => {
      o.offsetX = r, o.offsetY = a, this._eventHandler(o);
    };
    R(this.options.events, (o) => s(o, n));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, e = this.platform, s = (l, c) => {
      e.addEventListener(this, l, c), t[l] = c;
    }, n = (l, c) => {
      t[l] && (e.removeEventListener(this, l, c), delete t[l]);
    }, o = (l, c) => {
      this.canvas && this.resize(l, c);
    };
    let r;
    const a = () => {
      n("attach", a), this.attached = !0, this.resize(), s("resize", o), s("detach", r);
    };
    r = () => {
      this.attached = !1, n("resize", o), this._stop(), this._resize(0, 0), s("attach", a);
    }, e.isAttached(this.canvas) ? a() : r();
  }
  unbindEvents() {
    R(this._listeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._listeners = {}, R(this._responsiveListeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, e, s) {
    const n = s ? "set" : "remove";
    let o, r, a, l;
    for (e === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + n + "DatasetHoverStyle"]()), a = 0, l = t.length; a < l; ++a) {
      r = t[a];
      const c = r && this.getDatasetMeta(r.datasetIndex).controller;
      c && c[n + "HoverStyle"](r.element, r.datasetIndex, r.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const e = this._active || [], s = t.map(({ datasetIndex: o, index: r }) => {
      const a = this.getDatasetMeta(o);
      if (!a)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: a.data[r],
        index: r
      };
    });
    !qe(s, e) && (this._active = s, this._lastEvent = null, this._updateHoverStyles(s, e));
  }
  notifyPlugins(t, e, s) {
    return this._plugins.notify(this, t, e, s);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((e) => e.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, e, s) {
    const n = this.options.hover, o = (l, c) => l.filter((h) => !c.some((d) => h.datasetIndex === d.datasetIndex && h.index === d.index)), r = o(e, t), a = s ? t : o(t, e);
    r.length && this.updateHoverStyle(r, n.mode, !1), a.length && n.mode && this.updateHoverStyle(a, n.mode, !0);
  }
  _eventHandler(t, e) {
    const s = {
      event: t,
      replay: e,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, n = (r) => (r.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", s, n) === !1)
      return;
    const o = this._handleEvent(t, e, s.inChartArea);
    return s.cancelable = !1, this.notifyPlugins("afterEvent", s, n), (o || s.changed) && this.render(), this;
  }
  _handleEvent(t, e, s) {
    const { _active: n = [], options: o } = this, r = e, a = this._getActiveElements(t, n, s, r), l = ur(t), c = Gl(t, this._lastEvent, s, l);
    s && (this._lastEvent = null, I(o.onHover, [
      t,
      a,
      this
    ], this), l && I(o.onClick, [
      t,
      a,
      this
    ], this));
    const h = !qe(a, n);
    return (h || e) && (this._active = a, this._updateHoverStyles(a, n, e)), this._lastEvent = c, h;
  }
  _getActiveElements(t, e, s, n) {
    if (t.type === "mouseout")
      return [];
    if (!s)
      return e;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, n);
  }
}
S(xt, "defaults", V), S(xt, "instances", Ke), S(xt, "overrides", Wt), S(xt, "registry", rt), S(xt, "version", Ul), S(xt, "getChart", qs);
function Gs() {
  return R(xt.instances, (i) => i._plugins.invalidate());
}
function Jl(i, t, e) {
  const { startAngle: s, pixelMargin: n, x: o, y: r, outerRadius: a, innerRadius: l } = t;
  let c = n / a;
  i.beginPath(), i.arc(o, r, a, s - c, e + c), l > n ? (c = n / l, i.arc(o, r, l, e + c, s - c, !0)) : i.arc(o, r, n, e + j, s - j), i.closePath(), i.clip();
}
function Ql(i) {
  return ji(i, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function tc(i, t, e, s) {
  const n = Ql(i.options.borderRadius), o = (e - t) / 2, r = Math.min(o, s * t / 2), a = (l) => {
    const c = (e - Math.min(o, l)) * s / 2;
    return Y(l, 0, Math.min(o, c));
  };
  return {
    outerStart: a(n.outerStart),
    outerEnd: a(n.outerEnd),
    innerStart: Y(n.innerStart, 0, r),
    innerEnd: Y(n.innerEnd, 0, r)
  };
}
function jt(i, t, e, s) {
  return {
    x: e + i * Math.cos(t),
    y: s + i * Math.sin(t)
  };
}
function ii(i, t, e, s, n, o) {
  const { x: r, y: a, startAngle: l, pixelMargin: c, innerRadius: h } = t, d = Math.max(t.outerRadius + s + e - c, 0), u = h > 0 ? h + s + e + c : 0;
  let f = 0;
  const g = n - l;
  if (s) {
    const E = h > 0 ? h - s : 0, B = d > 0 ? d - s : 0, H = (E + B) / 2, ot = H !== 0 ? g * H / (H + s) : g;
    f = (g - ot) / 2;
  }
  const p = Math.max(1e-3, g * d - e / W) / d, m = (g - p) / 2, b = l + m + f, x = n - m - f, { outerStart: v, outerEnd: y, innerStart: _, innerEnd: w } = tc(t, u, d, x - b), k = d - v, M = d - y, P = b + v / k, D = x - y / M, C = u + _, O = u + w, U = b + _ / C, Q = x - w / O;
  if (i.beginPath(), o) {
    const E = (P + D) / 2;
    if (i.arc(r, a, d, P, E), i.arc(r, a, d, E, D), y > 0) {
      const K = jt(M, D, r, a);
      i.arc(K.x, K.y, y, D, x + j);
    }
    const B = jt(O, x, r, a);
    if (i.lineTo(B.x, B.y), w > 0) {
      const K = jt(O, Q, r, a);
      i.arc(K.x, K.y, w, x + j, Q + Math.PI);
    }
    const H = (x - w / u + (b + _ / u)) / 2;
    if (i.arc(r, a, u, x - w / u, H, !0), i.arc(r, a, u, H, b + _ / u, !0), _ > 0) {
      const K = jt(C, U, r, a);
      i.arc(K.x, K.y, _, U + Math.PI, b - j);
    }
    const ot = jt(k, b, r, a);
    if (i.lineTo(ot.x, ot.y), v > 0) {
      const K = jt(k, P, r, a);
      i.arc(K.x, K.y, v, b - j, P);
    }
  } else {
    i.moveTo(r, a);
    const E = Math.cos(P) * d + r, B = Math.sin(P) * d + a;
    i.lineTo(E, B);
    const H = Math.cos(D) * d + r, ot = Math.sin(D) * d + a;
    i.lineTo(H, ot);
  }
  i.closePath();
}
function ec(i, t, e, s, n) {
  const { fullCircles: o, startAngle: r, circumference: a } = t;
  let l = t.endAngle;
  if (o) {
    ii(i, t, e, s, l, n);
    for (let c = 0; c < o; ++c)
      i.fill();
    isNaN(a) || (l = r + (a % z || z));
  }
  return ii(i, t, e, s, l, n), i.fill(), l;
}
function ic(i, t, e, s, n) {
  const { fullCircles: o, startAngle: r, circumference: a, options: l } = t, { borderWidth: c, borderJoinStyle: h, borderDash: d, borderDashOffset: u } = l, f = l.borderAlign === "inner";
  if (!c)
    return;
  i.setLineDash(d || []), i.lineDashOffset = u, f ? (i.lineWidth = c * 2, i.lineJoin = h || "round") : (i.lineWidth = c, i.lineJoin = h || "bevel");
  let g = t.endAngle;
  if (o) {
    ii(i, t, e, s, g, n);
    for (let p = 0; p < o; ++p)
      i.stroke();
    isNaN(a) || (g = r + (a % z || z));
  }
  f && Jl(i, t, g), o || (ii(i, t, e, s, g, n), i.stroke());
}
class $t extends nt {
  constructor(e) {
    super();
    S(this, "circumference");
    S(this, "endAngle");
    S(this, "fullCircles");
    S(this, "innerRadius");
    S(this, "outerRadius");
    S(this, "pixelMargin");
    S(this, "startAngle");
    this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, e && Object.assign(this, e);
  }
  inRange(e, s, n) {
    const o = this.getProps([
      "x",
      "y"
    ], n), { angle: r, distance: a } = On(o, {
      x: e,
      y: s
    }), { startAngle: l, endAngle: c, innerRadius: h, outerRadius: d, circumference: u } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], n), f = (this.options.spacing + this.options.borderWidth) / 2, p = A(u, c - l) >= z || ke(r, l, c), m = gt(a, h + f, d + f);
    return p && m;
  }
  getCenterPoint(e) {
    const { x: s, y: n, startAngle: o, endAngle: r, innerRadius: a, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], e), { offset: c, spacing: h } = this.options, d = (o + r) / 2, u = (a + l + h + c) / 2;
    return {
      x: s + Math.cos(d) * u,
      y: n + Math.sin(d) * u
    };
  }
  tooltipPosition(e) {
    return this.getCenterPoint(e);
  }
  draw(e) {
    const { options: s, circumference: n } = this, o = (s.offset || 0) / 4, r = (s.spacing || 0) / 2, a = s.circular;
    if (this.pixelMargin = s.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = n > z ? Math.floor(n / z) : 0, n === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    e.save();
    const l = (this.startAngle + this.endAngle) / 2;
    e.translate(Math.cos(l) * o, Math.sin(l) * o);
    const c = 1 - Math.sin(Math.min(W, n || 0)), h = o * c;
    e.fillStyle = s.backgroundColor, e.strokeStyle = s.borderColor, ec(e, this, h, r, a), ic(e, this, h, r, a), e.restore();
  }
}
S($t, "id", "arc"), S($t, "defaults", {
  borderAlign: "center",
  borderColor: "#fff",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: void 0,
  borderRadius: 0,
  borderWidth: 2,
  offset: 0,
  spacing: 0,
  angle: void 0,
  circular: !0
}), S($t, "defaultRoutes", {
  backgroundColor: "backgroundColor"
}), S($t, "descriptors", {
  _scriptable: !0,
  _indexable: (e) => e !== "borderDash"
});
function po(i, t, e = t) {
  i.lineCap = A(e.borderCapStyle, t.borderCapStyle), i.setLineDash(A(e.borderDash, t.borderDash)), i.lineDashOffset = A(e.borderDashOffset, t.borderDashOffset), i.lineJoin = A(e.borderJoinStyle, t.borderJoinStyle), i.lineWidth = A(e.borderWidth, t.borderWidth), i.strokeStyle = A(e.borderColor, t.borderColor);
}
function sc(i, t, e) {
  i.lineTo(e.x, e.y);
}
function nc(i) {
  return i.stepped ? Er : i.tension || i.cubicInterpolationMode === "monotone" ? Ir : sc;
}
function mo(i, t, e = {}) {
  const s = i.length, { start: n = 0, end: o = s - 1 } = e, { start: r, end: a } = t, l = Math.max(n, r), c = Math.min(o, a), h = n < r && o < r || n > a && o > a;
  return {
    count: s,
    start: l,
    loop: t.loop,
    ilen: c < l && !h ? s + c - l : c - l
  };
}
function oc(i, t, e, s) {
  const { points: n, options: o } = t, { count: r, start: a, loop: l, ilen: c } = mo(n, e, s), h = nc(o);
  let { move: d = !0, reverse: u } = s || {}, f, g, p;
  for (f = 0; f <= c; ++f)
    g = n[(a + (u ? c - f : f)) % r], !g.skip && (d ? (i.moveTo(g.x, g.y), d = !1) : h(i, p, g, u, o.stepped), p = g);
  return l && (g = n[(a + (u ? c : 0)) % r], h(i, p, g, u, o.stepped)), !!l;
}
function rc(i, t, e, s) {
  const n = t.points, { count: o, start: r, ilen: a } = mo(n, e, s), { move: l = !0, reverse: c } = s || {};
  let h = 0, d = 0, u, f, g, p, m, b;
  const x = (y) => (r + (c ? a - y : y)) % o, v = () => {
    p !== m && (i.lineTo(h, m), i.lineTo(h, p), i.lineTo(h, b));
  };
  for (l && (f = n[x(0)], i.moveTo(f.x, f.y)), u = 0; u <= a; ++u) {
    if (f = n[x(u)], f.skip)
      continue;
    const y = f.x, _ = f.y, w = y | 0;
    w === g ? (_ < p ? p = _ : _ > m && (m = _), h = (d * h + y) / ++d) : (v(), i.lineTo(y, _), g = w, d = 0, p = m = _), b = _;
  }
  v();
}
function Oi(i) {
  const t = i.options, e = t.borderDash && t.borderDash.length;
  return !i._decimated && !i._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !e ? rc : oc;
}
function ac(i) {
  return i.stepped ? fa : i.tension || i.cubicInterpolationMode === "monotone" ? ga : It;
}
function lc(i, t, e, s) {
  let n = t._path;
  n || (n = t._path = new Path2D(), t.path(n, e, s) && n.closePath()), po(i, t.options), i.stroke(n);
}
function cc(i, t, e, s) {
  const { segments: n, options: o } = t, r = Oi(t);
  for (const a of n)
    po(i, o, a.style), i.beginPath(), r(i, t, a, {
      start: e,
      end: e + s - 1
    }) && i.closePath(), i.stroke();
}
const hc = typeof Path2D == "function";
function dc(i, t, e, s) {
  hc && !t.options.segment ? lc(i, t, e, s) : cc(i, t, e, s);
}
class bt extends nt {
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, e) {
    const s = this.options;
    if ((s.tension || s.cubicInterpolationMode === "monotone") && !s.stepped && !this._pointsUpdated) {
      const n = s.spanGaps ? this._loop : this._fullLoop;
      oa(this._points, s, t, n, e), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = ya(this, this.options.segment));
  }
  first() {
    const t = this.segments, e = this.points;
    return t.length && e[t[0].start];
  }
  last() {
    const t = this.segments, e = this.points, s = t.length;
    return s && e[t[s - 1].end];
  }
  interpolate(t, e) {
    const s = this.options, n = t[e], o = this.points, r = Gn(this, {
      property: e,
      start: n,
      end: n
    });
    if (!r.length)
      return;
    const a = [], l = ac(s);
    let c, h;
    for (c = 0, h = r.length; c < h; ++c) {
      const { start: d, end: u } = r[c], f = o[d], g = o[u];
      if (f === g) {
        a.push(f);
        continue;
      }
      const p = Math.abs((n - f[e]) / (g[e] - f[e])), m = l(f, g, p, s.stepped);
      m[e] = t[e], a.push(m);
    }
    return a.length === 1 ? a[0] : a;
  }
  pathSegment(t, e, s) {
    return Oi(this)(t, this, e, s);
  }
  path(t, e, s) {
    const n = this.segments, o = Oi(this);
    let r = this._loop;
    e = e || 0, s = s || this.points.length - e;
    for (const a of n)
      r &= o(t, this, a, {
        start: e,
        end: e + s - 1
      });
    return !!r;
  }
  draw(t, e, s, n) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), dc(t, this, s, n), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
S(bt, "id", "line"), S(bt, "defaults", {
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: "miter",
  borderWidth: 3,
  capBezierPoints: !0,
  cubicInterpolationMode: "default",
  fill: !1,
  spanGaps: !1,
  stepped: !1,
  tension: 0
}), S(bt, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), S(bt, "descriptors", {
  _scriptable: !0,
  _indexable: (t) => t !== "borderDash" && t !== "fill"
});
function Zs(i, t, e, s) {
  const n = i.options, { [e]: o } = i.getProps([
    e
  ], s);
  return Math.abs(t - o) < n.radius + n.hitRadius;
}
class xe extends nt {
  constructor(e) {
    super();
    S(this, "parsed");
    S(this, "skip");
    S(this, "stop");
    this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, e && Object.assign(this, e);
  }
  inRange(e, s, n) {
    const o = this.options, { x: r, y: a } = this.getProps([
      "x",
      "y"
    ], n);
    return Math.pow(e - r, 2) + Math.pow(s - a, 2) < Math.pow(o.hitRadius + o.radius, 2);
  }
  inXRange(e, s) {
    return Zs(this, e, "x", s);
  }
  inYRange(e, s) {
    return Zs(this, e, "y", s);
  }
  getCenterPoint(e) {
    const { x: s, y: n } = this.getProps([
      "x",
      "y"
    ], e);
    return {
      x: s,
      y: n
    };
  }
  size(e) {
    e = e || this.options || {};
    let s = e.radius || 0;
    s = Math.max(s, s && e.hoverRadius || 0);
    const n = s && e.borderWidth || 0;
    return (s + n) * 2;
  }
  draw(e, s) {
    const n = this.options;
    this.skip || n.radius < 0.1 || !mt(this, s, this.size(n) / 2) || (e.strokeStyle = n.borderColor, e.lineWidth = n.borderWidth, e.fillStyle = n.backgroundColor, Di(e, n, this.x, this.y));
  }
  getRange() {
    const e = this.options || {};
    return e.radius + e.hitRadius;
  }
}
S(xe, "id", "point"), /**
* @type {any}
*/
S(xe, "defaults", {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: "circle",
  radius: 3,
  rotation: 0
}), /**
* @type {any}
*/
S(xe, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function bo(i, t) {
  const { x: e, y: s, base: n, width: o, height: r } = i.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let a, l, c, h, d;
  return i.horizontal ? (d = r / 2, a = Math.min(e, n), l = Math.max(e, n), c = s - d, h = s + d) : (d = o / 2, a = e - d, l = e + d, c = Math.min(s, n), h = Math.max(s, n)), {
    left: a,
    top: c,
    right: l,
    bottom: h
  };
}
function Mt(i, t, e, s) {
  return i ? 0 : Y(t, e, s);
}
function uc(i, t, e) {
  const s = i.options.borderWidth, n = i.borderSkipped, o = Bn(s);
  return {
    t: Mt(n.top, o.top, 0, e),
    r: Mt(n.right, o.right, 0, t),
    b: Mt(n.bottom, o.bottom, 0, e),
    l: Mt(n.left, o.left, 0, t)
  };
}
function fc(i, t, e) {
  const { enableBorderRadius: s } = i.getProps([
    "enableBorderRadius"
  ]), n = i.options.borderRadius, o = Ft(n), r = Math.min(t, e), a = i.borderSkipped, l = s || T(n);
  return {
    topLeft: Mt(!l || a.top || a.left, o.topLeft, 0, r),
    topRight: Mt(!l || a.top || a.right, o.topRight, 0, r),
    bottomLeft: Mt(!l || a.bottom || a.left, o.bottomLeft, 0, r),
    bottomRight: Mt(!l || a.bottom || a.right, o.bottomRight, 0, r)
  };
}
function gc(i) {
  const t = bo(i), e = t.right - t.left, s = t.bottom - t.top, n = uc(i, e / 2, s / 2), o = fc(i, e / 2, s / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: e,
      h: s,
      radius: o
    },
    inner: {
      x: t.left + n.l,
      y: t.top + n.t,
      w: e - n.l - n.r,
      h: s - n.t - n.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(n.t, n.l)),
        topRight: Math.max(0, o.topRight - Math.max(n.t, n.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(n.b, n.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(n.b, n.r))
      }
    }
  };
}
function vi(i, t, e, s) {
  const n = t === null, o = e === null, a = i && !(n && o) && bo(i, s);
  return a && (n || gt(t, a.left, a.right)) && (o || gt(e, a.top, a.bottom));
}
function pc(i) {
  return i.topLeft || i.topRight || i.bottomLeft || i.bottomRight;
}
function mc(i, t) {
  i.rect(t.x, t.y, t.w, t.h);
}
function Mi(i, t, e = {}) {
  const s = i.x !== e.x ? -t : 0, n = i.y !== e.y ? -t : 0, o = (i.x + i.w !== e.x + e.w ? t : 0) - s, r = (i.y + i.h !== e.y + e.h ? t : 0) - n;
  return {
    x: i.x + s,
    y: i.y + n,
    w: i.w + o,
    h: i.h + r,
    radius: i.radius
  };
}
class _e extends nt {
  constructor(t) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
  }
  draw(t) {
    const { inflateAmount: e, options: { borderColor: s, backgroundColor: n } } = this, { inner: o, outer: r } = gc(this), a = pc(r.radius) ? we : mc;
    t.save(), (r.w !== o.w || r.h !== o.h) && (t.beginPath(), a(t, Mi(r, e, o)), t.clip(), a(t, Mi(o, -e, r)), t.fillStyle = s, t.fill("evenodd")), t.beginPath(), a(t, Mi(o, e)), t.fillStyle = n, t.fill(), t.restore();
  }
  inRange(t, e, s) {
    return vi(this, t, e, s);
  }
  inXRange(t, e) {
    return vi(this, t, null, e);
  }
  inYRange(t, e) {
    return vi(this, null, t, e);
  }
  getCenterPoint(t) {
    const { x: e, y: s, base: n, horizontal: o } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: o ? (e + n) / 2 : e,
      y: o ? s : (s + n) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
S(_e, "id", "bar"), S(_e, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), S(_e, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
var xo = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcElement: $t,
  BarElement: _e,
  LineElement: bt,
  PointElement: xe
});
const Ti = [
  "rgb(54, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
  // grey
], Js = /* @__PURE__ */ Ti.map((i) => i.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function _o(i) {
  return Ti[i % Ti.length];
}
function yo(i) {
  return Js[i % Js.length];
}
function bc(i, t) {
  return i.borderColor = _o(t), i.backgroundColor = yo(t), ++t;
}
function xc(i, t) {
  return i.backgroundColor = i.data.map(() => _o(t++)), t;
}
function _c(i, t) {
  return i.backgroundColor = i.data.map(() => yo(t++)), t;
}
function yc(i) {
  let t = 0;
  return (e, s) => {
    const n = i.getDatasetMeta(s).controller;
    n instanceof vt ? t = xc(e, t) : n instanceof Xt ? t = _c(e, t) : n && (t = bc(e, t));
  };
}
function Qs(i) {
  let t;
  for (t in i)
    if (i[t].borderColor || i[t].backgroundColor)
      return !0;
  return !1;
}
function vc(i) {
  return i && (i.borderColor || i.backgroundColor);
}
var vo = {
  id: "colors",
  defaults: {
    enabled: !0,
    forceOverride: !1
  },
  beforeLayout(i, t, e) {
    if (!e.enabled)
      return;
    const { data: { datasets: s }, options: n } = i.config, { elements: o } = n;
    if (!e.forceOverride && (Qs(s) || vc(n) || o && Qs(o)))
      return;
    const r = yc(i);
    s.forEach(r);
  }
};
function Mc(i, t, e, s, n) {
  const o = n.samples || s;
  if (o >= e)
    return i.slice(t, t + e);
  const r = [], a = (e - 2) / (o - 2);
  let l = 0;
  const c = t + e - 1;
  let h = t, d, u, f, g, p;
  for (r[l++] = i[h], d = 0; d < o - 2; d++) {
    let m = 0, b = 0, x;
    const v = Math.floor((d + 1) * a) + 1 + t, y = Math.min(Math.floor((d + 2) * a) + 1, e) + t, _ = y - v;
    for (x = v; x < y; x++)
      m += i[x].x, b += i[x].y;
    m /= _, b /= _;
    const w = Math.floor(d * a) + 1 + t, k = Math.min(Math.floor((d + 1) * a) + 1, e) + t, { x: M, y: P } = i[h];
    for (f = g = -1, x = w; x < k; x++)
      g = 0.5 * Math.abs((M - m) * (i[x].y - P) - (M - i[x].x) * (b - P)), g > f && (f = g, u = i[x], p = x);
    r[l++] = u, h = p;
  }
  return r[l++] = i[c], r;
}
function kc(i, t, e, s) {
  let n = 0, o = 0, r, a, l, c, h, d, u, f, g, p;
  const m = [], b = t + e - 1, x = i[t].x, y = i[b].x - x;
  for (r = t; r < t + e; ++r) {
    a = i[r], l = (a.x - x) / y * s, c = a.y;
    const _ = l | 0;
    if (_ === h)
      c < g ? (g = c, d = r) : c > p && (p = c, u = r), n = (o * n + a.x) / ++o;
    else {
      const w = r - 1;
      if (!L(d) && !L(u)) {
        const k = Math.min(d, u), M = Math.max(d, u);
        k !== f && k !== w && m.push({
          ...i[k],
          x: n
        }), M !== f && M !== w && m.push({
          ...i[M],
          x: n
        });
      }
      r > 0 && w !== f && m.push(i[w]), m.push(a), h = _, o = 0, g = p = c, d = u = f = r;
    }
  }
  return m;
}
function Mo(i) {
  if (i._decimated) {
    const t = i._data;
    delete i._decimated, delete i._data, Object.defineProperty(i, "data", {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: t
    });
  }
}
function tn(i) {
  i.data.datasets.forEach((t) => {
    Mo(t);
  });
}
function wc(i, t) {
  const e = t.length;
  let s = 0, n;
  const { iScale: o } = i, { min: r, max: a, minDefined: l, maxDefined: c } = o.getUserBounds();
  return l && (s = Y(pt(t, o.axis, r).lo, 0, e - 1)), c ? n = Y(pt(t, o.axis, a).hi + 1, s, e) - s : n = e - s, {
    start: s,
    count: n
  };
}
var ko = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: !1
  },
  beforeElementsUpdate: (i, t, e) => {
    if (!e.enabled) {
      tn(i);
      return;
    }
    const s = i.width;
    i.data.datasets.forEach((n, o) => {
      const { _data: r, indexAxis: a } = n, l = i.getDatasetMeta(o), c = r || n.data;
      if (re([
        a,
        i.options.indexAxis
      ]) === "y" || !l.controller.supportsDecimation)
        return;
      const h = i.scales[l.xAxisID];
      if (h.type !== "linear" && h.type !== "time" || i.options.parsing)
        return;
      let { start: d, count: u } = wc(l, c);
      const f = e.threshold || 4 * s;
      if (u <= f) {
        Mo(n);
        return;
      }
      L(r) && (n._data = c, delete n.data, Object.defineProperty(n, "data", {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return this._decimated;
        },
        set: function(p) {
          this._data = p;
        }
      }));
      let g;
      switch (e.algorithm) {
        case "lttb":
          g = Mc(c, d, u, s, e);
          break;
        case "min-max":
          g = kc(c, d, u, s);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`);
      }
      n._decimated = g;
    });
  },
  destroy(i) {
    tn(i);
  }
};
function Sc(i, t, e) {
  const s = i.segments, n = i.points, o = t.points, r = [];
  for (const a of s) {
    let { start: l, end: c } = a;
    c = Ji(l, c, n);
    const h = Li(e, n[l], n[c], a.loop);
    if (!t.segments) {
      r.push({
        source: a,
        target: h,
        start: n[l],
        end: n[c]
      });
      continue;
    }
    const d = Gn(t, h);
    for (const u of d) {
      const f = Li(e, o[u.start], o[u.end], u.loop), g = qn(a, n, f);
      for (const p of g)
        r.push({
          source: p,
          target: u,
          start: {
            [e]: en(h, f, "start", Math.max)
          },
          end: {
            [e]: en(h, f, "end", Math.min)
          }
        });
    }
  }
  return r;
}
function Li(i, t, e, s) {
  if (s)
    return;
  let n = t[i], o = e[i];
  return i === "angle" && (n = et(n), o = et(o)), {
    property: i,
    start: n,
    end: o
  };
}
function Pc(i, t) {
  const { x: e = null, y: s = null } = i || {}, n = t.points, o = [];
  return t.segments.forEach(({ start: r, end: a }) => {
    a = Ji(r, a, n);
    const l = n[r], c = n[a];
    s !== null ? (o.push({
      x: l.x,
      y: s
    }), o.push({
      x: c.x,
      y: s
    })) : e !== null && (o.push({
      x: e,
      y: l.y
    }), o.push({
      x: e,
      y: c.y
    }));
  }), o;
}
function Ji(i, t, e) {
  for (; t > i; t--) {
    const s = e[t];
    if (!isNaN(s.x) && !isNaN(s.y))
      break;
  }
  return t;
}
function en(i, t, e, s) {
  return i && t ? s(i[e], t[e]) : i ? i[e] : t ? t[e] : 0;
}
function wo(i, t) {
  let e = [], s = !1;
  return F(i) ? (s = !0, e = i) : e = Pc(i, t), e.length ? new bt({
    points: e,
    options: {
      tension: 0
    },
    _loop: s,
    _fullLoop: s
  }) : null;
}
function sn(i) {
  return i && i.fill !== !1;
}
function Dc(i, t, e) {
  let n = i[t].fill;
  const o = [
    t
  ];
  let r;
  if (!e)
    return n;
  for (; n !== !1 && o.indexOf(n) === -1; ) {
    if (!N(n))
      return n;
    if (r = i[n], !r)
      return !1;
    if (r.visible)
      return n;
    o.push(n), n = r.fill;
  }
  return !1;
}
function Cc(i, t, e) {
  const s = Lc(i);
  if (T(s))
    return isNaN(s.value) ? !1 : s;
  let n = parseFloat(s);
  return N(n) && Math.floor(n) === n ? Ac(s[0], t, n, e) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(s) >= 0 && s;
}
function Ac(i, t, e, s) {
  return (i === "-" || i === "+") && (e = t + e), e === t || e < 0 || e >= s ? !1 : e;
}
function Oc(i, t) {
  let e = null;
  return i === "start" ? e = t.bottom : i === "end" ? e = t.top : T(i) ? e = t.getPixelForValue(i.value) : t.getBasePixel && (e = t.getBasePixel()), e;
}
function Tc(i, t, e) {
  let s;
  return i === "start" ? s = e : i === "end" ? s = t.options.reverse ? t.min : t.max : T(i) ? s = i.value : s = t.getBaseValue(), s;
}
function Lc(i) {
  const t = i.options, e = t.fill;
  let s = A(e && e.target, e);
  return s === void 0 && (s = !!t.backgroundColor), s === !1 || s === null ? !1 : s === !0 ? "origin" : s;
}
function Rc(i) {
  const { scale: t, index: e, line: s } = i, n = [], o = s.segments, r = s.points, a = Ec(t, e);
  a.push(wo({
    x: null,
    y: t.bottom
  }, s));
  for (let l = 0; l < o.length; l++) {
    const c = o[l];
    for (let h = c.start; h <= c.end; h++)
      Ic(n, r[h], a);
  }
  return new bt({
    points: n,
    options: {}
  });
}
function Ec(i, t) {
  const e = [], s = i.getMatchingVisibleMetas("line");
  for (let n = 0; n < s.length; n++) {
    const o = s[n];
    if (o.index === t)
      break;
    o.hidden || e.unshift(o.dataset);
  }
  return e;
}
function Ic(i, t, e) {
  const s = [];
  for (let n = 0; n < e.length; n++) {
    const o = e[n], { first: r, last: a, point: l } = Fc(o, t, "x");
    if (!(!l || r && a)) {
      if (r)
        s.unshift(l);
      else if (i.push(l), !a)
        break;
    }
  }
  i.push(...s);
}
function Fc(i, t, e) {
  const s = i.interpolate(t, e);
  if (!s)
    return {};
  const n = s[e], o = i.segments, r = i.points;
  let a = !1, l = !1;
  for (let c = 0; c < o.length; c++) {
    const h = o[c], d = r[h.start][e], u = r[h.end][e];
    if (gt(n, d, u)) {
      a = n === d, l = n === u;
      break;
    }
  }
  return {
    first: a,
    last: l,
    point: s
  };
}
class So {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, e, s) {
    const { x: n, y: o, radius: r } = this;
    return e = e || {
      start: 0,
      end: z
    }, t.arc(n, o, r, e.end, e.start, !0), !s.bounds;
  }
  interpolate(t) {
    const { x: e, y: s, radius: n } = this, o = t.angle;
    return {
      x: e + Math.cos(o) * n,
      y: s + Math.sin(o) * n,
      angle: o
    };
  }
}
function zc(i) {
  const { chart: t, fill: e, line: s } = i;
  if (N(e))
    return Wc(t, e);
  if (e === "stack")
    return Rc(i);
  if (e === "shape")
    return !0;
  const n = Bc(i);
  return n instanceof So ? n : wo(n, s);
}
function Wc(i, t) {
  const e = i.getDatasetMeta(t);
  return e && i.isDatasetVisible(t) ? e.dataset : null;
}
function Bc(i) {
  return (i.scale || {}).getPointPositionForValue ? Nc(i) : Vc(i);
}
function Vc(i) {
  const { scale: t = {}, fill: e } = i, s = Oc(e, t);
  if (N(s)) {
    const n = t.isHorizontal();
    return {
      x: n ? s : null,
      y: n ? null : s
    };
  }
  return null;
}
function Nc(i) {
  const { scale: t, fill: e } = i, s = t.options, n = t.getLabels().length, o = s.reverse ? t.max : t.min, r = Tc(e, t, o), a = [];
  if (s.grid.circular) {
    const l = t.getPointPositionForValue(0, o);
    return new So({
      x: l.x,
      y: l.y,
      radius: t.getDistanceFromCenterForValue(r)
    });
  }
  for (let l = 0; l < n; ++l)
    a.push(t.getPointPositionForValue(l, r));
  return a;
}
function ki(i, t, e) {
  const s = zc(t), { line: n, scale: o, axis: r } = t, a = n.options, l = a.fill, c = a.backgroundColor, { above: h = c, below: d = c } = l || {};
  s && n.points.length && (li(i, e), Hc(i, {
    line: n,
    target: s,
    above: h,
    below: d,
    area: e,
    scale: o,
    axis: r
  }), ci(i));
}
function Hc(i, t) {
  const { line: e, target: s, above: n, below: o, area: r, scale: a } = t, l = e._loop ? "angle" : t.axis;
  i.save(), l === "x" && o !== n && (nn(i, s, r.top), on(i, {
    line: e,
    target: s,
    color: n,
    scale: a,
    property: l
  }), i.restore(), i.save(), nn(i, s, r.bottom)), on(i, {
    line: e,
    target: s,
    color: o,
    scale: a,
    property: l
  }), i.restore();
}
function nn(i, t, e) {
  const { segments: s, points: n } = t;
  let o = !0, r = !1;
  i.beginPath();
  for (const a of s) {
    const { start: l, end: c } = a, h = n[l], d = n[Ji(l, c, n)];
    o ? (i.moveTo(h.x, h.y), o = !1) : (i.lineTo(h.x, e), i.lineTo(h.x, h.y)), r = !!t.pathSegment(i, a, {
      move: r
    }), r ? i.closePath() : i.lineTo(d.x, e);
  }
  i.lineTo(t.first().x, e), i.closePath(), i.clip();
}
function on(i, t) {
  const { line: e, target: s, property: n, color: o, scale: r } = t, a = Sc(e, s, n);
  for (const { source: l, target: c, start: h, end: d } of a) {
    const { style: { backgroundColor: u = o } = {} } = l, f = s !== !0;
    i.save(), i.fillStyle = u, jc(i, r, f && Li(n, h, d)), i.beginPath();
    const g = !!e.pathSegment(i, l);
    let p;
    if (f) {
      g ? i.closePath() : rn(i, s, d, n);
      const m = !!s.pathSegment(i, c, {
        move: g,
        reverse: !0
      });
      p = g && m, p || rn(i, s, h, n);
    }
    i.closePath(), i.fill(p ? "evenodd" : "nonzero"), i.restore();
  }
}
function jc(i, t, e) {
  const { top: s, bottom: n } = t.chart.chartArea, { property: o, start: r, end: a } = e || {};
  o === "x" && (i.beginPath(), i.rect(r, s, a - r, n - s), i.clip());
}
function rn(i, t, e, s) {
  const n = t.interpolate(e, s);
  n && i.lineTo(n.x, n.y);
}
var Po = {
  id: "filler",
  afterDatasetsUpdate(i, t, e) {
    const s = (i.data.datasets || []).length, n = [];
    let o, r, a, l;
    for (r = 0; r < s; ++r)
      o = i.getDatasetMeta(r), a = o.dataset, l = null, a && a.options && a instanceof bt && (l = {
        visible: i.isDatasetVisible(r),
        index: r,
        fill: Cc(a, r, s),
        chart: i,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: a
      }), o.$filler = l, n.push(l);
    for (r = 0; r < s; ++r)
      l = n[r], !(!l || l.fill === !1) && (l.fill = Dc(n, r, e.propagate));
  },
  beforeDraw(i, t, e) {
    const s = e.drawTime === "beforeDraw", n = i.getSortedVisibleDatasetMetas(), o = i.chartArea;
    for (let r = n.length - 1; r >= 0; --r) {
      const a = n[r].$filler;
      a && (a.line.updateControlPoints(o, a.axis), s && a.fill && ki(i.ctx, a, o));
    }
  },
  beforeDatasetsDraw(i, t, e) {
    if (e.drawTime !== "beforeDatasetsDraw")
      return;
    const s = i.getSortedVisibleDatasetMetas();
    for (let n = s.length - 1; n >= 0; --n) {
      const o = s[n].$filler;
      sn(o) && ki(i.ctx, o, i.chartArea);
    }
  },
  beforeDatasetDraw(i, t, e) {
    const s = t.meta.$filler;
    !sn(s) || e.drawTime !== "beforeDatasetDraw" || ki(i.ctx, s, i.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const an = (i, t) => {
  let { boxHeight: e = t, boxWidth: s = t } = i;
  return i.usePointStyle && (e = Math.min(e, t), s = i.pointStyleWidth || Math.min(s, t)), {
    boxWidth: s,
    boxHeight: e,
    itemHeight: Math.max(t, e)
  };
}, $c = (i, t) => i !== null && t !== null && i.datasetIndex === t.datasetIndex && i.index === t.index;
class ln extends nt {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, e, s) {
    this.maxWidth = t, this.maxHeight = e, this._margins = s, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let e = I(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (e = e.filter((s) => t.filter(s, this.chart.data))), t.sort && (e = e.sort((s, n) => t.sort(s, n, this.chart.data))), this.options.reverse && e.reverse(), this.legendItems = e;
  }
  fit() {
    const { options: t, ctx: e } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const s = t.labels, n = $(s.font), o = n.size, r = this._computeTitleHeight(), { boxWidth: a, itemHeight: l } = an(s, o);
    let c, h;
    e.font = n.string, this.isHorizontal() ? (c = this.maxWidth, h = this._fitRows(r, o, a, l) + 10) : (h = this.maxHeight, c = this._fitCols(r, n, a, l) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(h, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, e, s, n) {
    const { ctx: o, maxWidth: r, options: { labels: { padding: a } } } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [
      0
    ], h = n + a;
    let d = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let u = -1, f = -h;
    return this.legendItems.forEach((g, p) => {
      const m = s + e / 2 + o.measureText(g.text).width;
      (p === 0 || c[c.length - 1] + m + 2 * a > r) && (d += h, c[c.length - (p > 0 ? 0 : 1)] = 0, f += h, u++), l[p] = {
        left: 0,
        top: f,
        row: u,
        width: m,
        height: n
      }, c[c.length - 1] += m + a;
    }), d;
  }
  _fitCols(t, e, s, n) {
    const { ctx: o, maxHeight: r, options: { labels: { padding: a } } } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], h = r - t;
    let d = a, u = 0, f = 0, g = 0, p = 0;
    return this.legendItems.forEach((m, b) => {
      const { itemWidth: x, itemHeight: v } = Yc(s, e, o, m, n);
      b > 0 && f + v + 2 * a > h && (d += u + a, c.push({
        width: u,
        height: f
      }), g += u + a, p++, u = f = 0), l[b] = {
        left: g,
        top: f,
        col: p,
        width: x,
        height: v
      }, u = Math.max(u, x), f += v + a;
    }), d += u, c.push({
      width: u,
      height: f
    }), d;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: e, options: { align: s, labels: { padding: n }, rtl: o } } = this, r = Ut(o, this.left, this.width);
    if (this.isHorizontal()) {
      let a = 0, l = q(s, this.left + n, this.right - this.lineWidths[a]);
      for (const c of e)
        a !== c.row && (a = c.row, l = q(s, this.left + n, this.right - this.lineWidths[a])), c.top += this.top + t + n, c.left = r.leftForLtr(r.x(l), c.width), l += c.width + n;
    } else {
      let a = 0, l = q(s, this.top + t + n, this.bottom - this.columnSizes[a].height);
      for (const c of e)
        c.col !== a && (a = c.col, l = q(s, this.top + t + n, this.bottom - this.columnSizes[a].height)), c.top = l, c.left += this.left + n, c.left = r.leftForLtr(r.x(c.left), c.width), l += c.height + n;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      li(t, this), this._draw(), ci(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: e, lineWidths: s, ctx: n } = this, { align: o, labels: r } = t, a = V.color, l = Ut(t.rtl, this.left, this.width), c = $(r.font), { padding: h } = r, d = c.size, u = d / 2;
    let f;
    this.drawTitle(), n.textAlign = l.textAlign("left"), n.textBaseline = "middle", n.lineWidth = 0.5, n.font = c.string;
    const { boxWidth: g, boxHeight: p, itemHeight: m } = an(r, d), b = function(w, k, M) {
      if (isNaN(g) || g <= 0 || isNaN(p) || p < 0)
        return;
      n.save();
      const P = A(M.lineWidth, 1);
      if (n.fillStyle = A(M.fillStyle, a), n.lineCap = A(M.lineCap, "butt"), n.lineDashOffset = A(M.lineDashOffset, 0), n.lineJoin = A(M.lineJoin, "miter"), n.lineWidth = P, n.strokeStyle = A(M.strokeStyle, a), n.setLineDash(A(M.lineDash, [])), r.usePointStyle) {
        const D = {
          radius: p * Math.SQRT2 / 2,
          pointStyle: M.pointStyle,
          rotation: M.rotation,
          borderWidth: P
        }, C = l.xPlus(w, g / 2), O = k + u;
        Wn(n, D, C, O, r.pointStyleWidth && g);
      } else {
        const D = k + Math.max((d - p) / 2, 0), C = l.leftForLtr(w, g), O = Ft(M.borderRadius);
        n.beginPath(), Object.values(O).some((U) => U !== 0) ? we(n, {
          x: C,
          y: D,
          w: g,
          h: p,
          radius: O
        }) : n.rect(C, D, g, p), n.fill(), P !== 0 && n.stroke();
      }
      n.restore();
    }, x = function(w, k, M) {
      Bt(n, M.text, w, k + m / 2, c, {
        strikethrough: M.hidden,
        textAlign: l.textAlign(M.textAlign)
      });
    }, v = this.isHorizontal(), y = this._computeTitleHeight();
    v ? f = {
      x: q(o, this.left + h, this.right - s[0]),
      y: this.top + h + y,
      line: 0
    } : f = {
      x: this.left + h,
      y: q(o, this.top + y + h, this.bottom - e[0].height),
      line: 0
    }, Un(this.ctx, t.textDirection);
    const _ = m + h;
    this.legendItems.forEach((w, k) => {
      n.strokeStyle = w.fontColor, n.fillStyle = w.fontColor;
      const M = n.measureText(w.text).width, P = l.textAlign(w.textAlign || (w.textAlign = r.textAlign)), D = g + u + M;
      let C = f.x, O = f.y;
      l.setWidth(this.width), v ? k > 0 && C + D + h > this.right && (O = f.y += _, f.line++, C = f.x = q(o, this.left + h, this.right - s[f.line])) : k > 0 && O + _ > this.bottom && (C = f.x = C + e[f.line].width + h, f.line++, O = f.y = q(o, this.top + y + h, this.bottom - e[f.line].height));
      const U = l.x(C);
      if (b(U, O, w), C = kr(P, C + g + u, v ? C + D : this.right, t.rtl), x(l.x(C), O, w), v)
        f.x += D + h;
      else if (typeof w.text != "string") {
        const Q = c.lineHeight;
        f.y += Do(w, Q) + h;
      } else
        f.y += _;
    }), Xn(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, e = t.title, s = $(e.font), n = G(e.padding);
    if (!e.display)
      return;
    const o = Ut(t.rtl, this.left, this.width), r = this.ctx, a = e.position, l = s.size / 2, c = n.top + l;
    let h, d = this.left, u = this.width;
    if (this.isHorizontal())
      u = Math.max(...this.lineWidths), h = this.top + c, d = q(t.align, d, this.right - u);
    else {
      const g = this.columnSizes.reduce((p, m) => Math.max(p, m.height), 0);
      h = c + q(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
    }
    const f = q(a, d, d + u);
    r.textAlign = o.textAlign(Ni(a)), r.textBaseline = "middle", r.strokeStyle = e.color, r.fillStyle = e.color, r.font = s.string, Bt(r, e.text, f, h, s);
  }
  _computeTitleHeight() {
    const t = this.options.title, e = $(t.font), s = G(t.padding);
    return t.display ? e.lineHeight + s.height : 0;
  }
  _getLegendItemAt(t, e) {
    let s, n, o;
    if (gt(t, this.left, this.right) && gt(e, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, s = 0; s < o.length; ++s)
        if (n = o[s], gt(t, n.left, n.left + n.width) && gt(e, n.top, n.top + n.height))
          return this.legendItems[s];
    }
    return null;
  }
  handleEvent(t) {
    const e = this.options;
    if (!Kc(t.type, e))
      return;
    const s = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const n = this._hoveredItem, o = $c(n, s);
      n && !o && I(e.onLeave, [
        t,
        n,
        this
      ], this), this._hoveredItem = s, s && !o && I(e.onHover, [
        t,
        s,
        this
      ], this);
    } else
      s && I(e.onClick, [
        t,
        s,
        this
      ], this);
  }
}
function Yc(i, t, e, s, n) {
  const o = Uc(s, i, t, e), r = Xc(n, s, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: r
  };
}
function Uc(i, t, e, s) {
  let n = i.text;
  return n && typeof n != "string" && (n = n.reduce((o, r) => o.length > r.length ? o : r)), t + e.size / 2 + s.measureText(n).width;
}
function Xc(i, t, e) {
  let s = i;
  return typeof t.text != "string" && (s = Do(t, e)), s;
}
function Do(i, t) {
  const e = i.text ? i.text.length : 0;
  return t * e;
}
function Kc(i, t) {
  return !!((i === "mousemove" || i === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (i === "click" || i === "mouseup"));
}
var Co = {
  id: "legend",
  _element: ln,
  start(i, t, e) {
    const s = i.legend = new ln({
      ctx: i.ctx,
      options: e,
      chart: i
    });
    X.configure(i, s, e), X.addBox(i, s);
  },
  stop(i) {
    X.removeBox(i, i.legend), delete i.legend;
  },
  beforeUpdate(i, t, e) {
    const s = i.legend;
    X.configure(i, s, e), s.options = e;
  },
  afterUpdate(i) {
    const t = i.legend;
    t.buildLabels(), t.adjustHitBoxes();
  },
  afterEvent(i, t) {
    t.replay || i.legend.handleEvent(t.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(i, t, e) {
      const s = t.datasetIndex, n = e.chart;
      n.isDatasetVisible(s) ? (n.hide(s), t.hidden = !0) : (n.show(s), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (i) => i.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(i) {
        const t = i.data.datasets, { labels: { usePointStyle: e, pointStyle: s, textAlign: n, color: o, useBorderRadius: r, borderRadius: a } } = i.legend.options;
        return i._getSortedDatasetMetas().map((l) => {
          const c = l.controller.getStyle(e ? 0 : void 0), h = G(c.borderWidth);
          return {
            text: t[l.index].label,
            fillStyle: c.backgroundColor,
            fontColor: o,
            hidden: !l.visible,
            lineCap: c.borderCapStyle,
            lineDash: c.borderDash,
            lineDashOffset: c.borderDashOffset,
            lineJoin: c.borderJoinStyle,
            lineWidth: (h.width + h.height) / 4,
            strokeStyle: c.borderColor,
            pointStyle: s || c.pointStyle,
            rotation: c.rotation,
            textAlign: n || c.textAlign,
            borderRadius: r && (a || c.borderRadius),
            datasetIndex: l.index
          };
        }, this);
      }
    },
    title: {
      color: (i) => i.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (i) => !i.startsWith("on"),
    labels: {
      _scriptable: (i) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(i)
    }
  }
};
class Qi extends nt {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, e) {
    const s = this.options;
    if (this.left = 0, this.top = 0, !s.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = e;
    const n = F(s.text) ? s.text.length : 1;
    this._padding = G(s.padding);
    const o = n * $(s.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: e, left: s, bottom: n, right: o, options: r } = this, a = r.align;
    let l = 0, c, h, d;
    return this.isHorizontal() ? (h = q(a, s, o), d = e + t, c = o - s) : (r.position === "left" ? (h = s + t, d = q(a, n, e), l = W * -0.5) : (h = o - t, d = q(a, e, n), l = W * 0.5), c = n - e), {
      titleX: h,
      titleY: d,
      maxWidth: c,
      rotation: l
    };
  }
  draw() {
    const t = this.ctx, e = this.options;
    if (!e.display)
      return;
    const s = $(e.font), o = s.lineHeight / 2 + this._padding.top, { titleX: r, titleY: a, maxWidth: l, rotation: c } = this._drawArgs(o);
    Bt(t, e.text, 0, 0, s, {
      color: e.color,
      maxWidth: l,
      rotation: c,
      textAlign: Ni(e.align),
      textBaseline: "middle",
      translation: [
        r,
        a
      ]
    });
  }
}
function qc(i, t) {
  const e = new Qi({
    ctx: i.ctx,
    options: t,
    chart: i
  });
  X.configure(i, e, t), X.addBox(i, e), i.titleBlock = e;
}
var Ao = {
  id: "title",
  _element: Qi,
  start(i, t, e) {
    qc(i, e);
  },
  stop(i) {
    const t = i.titleBlock;
    X.removeBox(i, t), delete i.titleBlock;
  },
  beforeUpdate(i, t, e) {
    const s = i.titleBlock;
    X.configure(i, s, e), s.options = e;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "bold"
    },
    fullSize: !0,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const $e = /* @__PURE__ */ new WeakMap();
var Oo = {
  id: "subtitle",
  start(i, t, e) {
    const s = new Qi({
      ctx: i.ctx,
      options: e,
      chart: i
    });
    X.configure(i, s, e), X.addBox(i, s), $e.set(i, s);
  },
  stop(i) {
    X.removeBox(i, $e.get(i)), $e.delete(i);
  },
  beforeUpdate(i, t, e) {
    const s = $e.get(i);
    X.configure(i, s, e), s.options = e;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "normal"
    },
    fullSize: !0,
    padding: 0,
    position: "top",
    text: "",
    weight: 1500
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const le = {
  average(i) {
    if (!i.length)
      return !1;
    let t, e, s = 0, n = 0, o = 0;
    for (t = 0, e = i.length; t < e; ++t) {
      const r = i[t].element;
      if (r && r.hasValue()) {
        const a = r.tooltipPosition();
        s += a.x, n += a.y, ++o;
      }
    }
    return {
      x: s / o,
      y: n / o
    };
  },
  nearest(i, t) {
    if (!i.length)
      return !1;
    let e = t.x, s = t.y, n = Number.POSITIVE_INFINITY, o, r, a;
    for (o = 0, r = i.length; o < r; ++o) {
      const l = i[o].element;
      if (l && l.hasValue()) {
        const c = l.getCenterPoint(), h = Si(t, c);
        h < n && (n = h, a = l);
      }
    }
    if (a) {
      const l = a.tooltipPosition();
      e = l.x, s = l.y;
    }
    return {
      x: e,
      y: s
    };
  }
};
function lt(i, t) {
  return t && (F(t) ? Array.prototype.push.apply(i, t) : i.push(t)), i;
}
function ut(i) {
  return (typeof i == "string" || i instanceof String) && i.indexOf(`
`) > -1 ? i.split(`
`) : i;
}
function Gc(i, t) {
  const { element: e, datasetIndex: s, index: n } = t, o = i.getDatasetMeta(s).controller, { label: r, value: a } = o.getLabelAndValue(n);
  return {
    chart: i,
    label: r,
    parsed: o.getParsed(n),
    raw: i.data.datasets[s].data[n],
    formattedValue: a,
    dataset: o.getDataset(),
    dataIndex: n,
    datasetIndex: s,
    element: e
  };
}
function cn(i, t) {
  const e = i.chart.ctx, { body: s, footer: n, title: o } = i, { boxWidth: r, boxHeight: a } = t, l = $(t.bodyFont), c = $(t.titleFont), h = $(t.footerFont), d = o.length, u = n.length, f = s.length, g = G(t.padding);
  let p = g.height, m = 0, b = s.reduce((y, _) => y + _.before.length + _.lines.length + _.after.length, 0);
  if (b += i.beforeBody.length + i.afterBody.length, d && (p += d * c.lineHeight + (d - 1) * t.titleSpacing + t.titleMarginBottom), b) {
    const y = t.displayColors ? Math.max(a, l.lineHeight) : l.lineHeight;
    p += f * y + (b - f) * l.lineHeight + (b - 1) * t.bodySpacing;
  }
  u && (p += t.footerMarginTop + u * h.lineHeight + (u - 1) * t.footerSpacing);
  let x = 0;
  const v = function(y) {
    m = Math.max(m, e.measureText(y).width + x);
  };
  return e.save(), e.font = c.string, R(i.title, v), e.font = l.string, R(i.beforeBody.concat(i.afterBody), v), x = t.displayColors ? r + 2 + t.boxPadding : 0, R(s, (y) => {
    R(y.before, v), R(y.lines, v), R(y.after, v);
  }), x = 0, e.font = h.string, R(i.footer, v), e.restore(), m += g.width, {
    width: m,
    height: p
  };
}
function Zc(i, t) {
  const { y: e, height: s } = t;
  return e < s / 2 ? "top" : e > i.height - s / 2 ? "bottom" : "center";
}
function Jc(i, t, e, s) {
  const { x: n, width: o } = s, r = e.caretSize + e.caretPadding;
  if (i === "left" && n + o + r > t.width || i === "right" && n - o - r < 0)
    return !0;
}
function Qc(i, t, e, s) {
  const { x: n, width: o } = e, { width: r, chartArea: { left: a, right: l } } = i;
  let c = "center";
  return s === "center" ? c = n <= (a + l) / 2 ? "left" : "right" : n <= o / 2 ? c = "left" : n >= r - o / 2 && (c = "right"), Jc(c, i, t, e) && (c = "center"), c;
}
function hn(i, t, e) {
  const s = e.yAlign || t.yAlign || Zc(i, e);
  return {
    xAlign: e.xAlign || t.xAlign || Qc(i, t, e, s),
    yAlign: s
  };
}
function th(i, t) {
  let { x: e, width: s } = i;
  return t === "right" ? e -= s : t === "center" && (e -= s / 2), e;
}
function eh(i, t, e) {
  let { y: s, height: n } = i;
  return t === "top" ? s += e : t === "bottom" ? s -= n + e : s -= n / 2, s;
}
function dn(i, t, e, s) {
  const { caretSize: n, caretPadding: o, cornerRadius: r } = i, { xAlign: a, yAlign: l } = e, c = n + o, { topLeft: h, topRight: d, bottomLeft: u, bottomRight: f } = Ft(r);
  let g = th(t, a);
  const p = eh(t, l, c);
  return l === "center" ? a === "left" ? g += c : a === "right" && (g -= c) : a === "left" ? g -= Math.max(h, u) + n : a === "right" && (g += Math.max(d, f) + n), {
    x: Y(g, 0, s.width - t.width),
    y: Y(p, 0, s.height - t.height)
  };
}
function Ye(i, t, e) {
  const s = G(e.padding);
  return t === "center" ? i.x + i.width / 2 : t === "right" ? i.x + i.width - s.right : i.x + s.left;
}
function un(i) {
  return lt([], ut(i));
}
function ih(i, t, e) {
  return Pt(i, {
    tooltip: t,
    tooltipItems: e,
    type: "tooltip"
  });
}
function fn(i, t) {
  const e = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return e ? i.override(e) : i;
}
const To = {
  beforeTitle: dt,
  title(i) {
    if (i.length > 0) {
      const t = i[0], e = t.chart.data.labels, s = e ? e.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (s > 0 && t.dataIndex < s)
        return e[t.dataIndex];
    }
    return "";
  },
  afterTitle: dt,
  beforeBody: dt,
  beforeLabel: dt,
  label(i) {
    if (this && this.options && this.options.mode === "dataset")
      return i.label + ": " + i.formattedValue || i.formattedValue;
    let t = i.dataset.label || "";
    t && (t += ": ");
    const e = i.formattedValue;
    return L(e) || (t += e), t;
  },
  labelColor(i) {
    const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
    return {
      borderColor: e.borderColor,
      backgroundColor: e.backgroundColor,
      borderWidth: e.borderWidth,
      borderDash: e.borderDash,
      borderDashOffset: e.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(i) {
    const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
    return {
      pointStyle: e.pointStyle,
      rotation: e.rotation
    };
  },
  afterLabel: dt,
  afterBody: dt,
  beforeFooter: dt,
  footer: dt,
  afterFooter: dt
};
function Z(i, t, e, s) {
  const n = i[t].call(e, s);
  return typeof n > "u" ? To[t].call(e, s) : n;
}
class Ri extends nt {
  constructor(t) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(t) {
    this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t)
      return t;
    const e = this.chart, s = this.options.setContext(this.getContext()), n = s.enabled && e.options.animation && s.animations, o = new qi(this.chart, n);
    return n._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = ih(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, e) {
    const { callbacks: s } = e, n = Z(s, "beforeTitle", this, t), o = Z(s, "title", this, t), r = Z(s, "afterTitle", this, t);
    let a = [];
    return a = lt(a, ut(n)), a = lt(a, ut(o)), a = lt(a, ut(r)), a;
  }
  getBeforeBody(t, e) {
    return un(Z(e.callbacks, "beforeBody", this, t));
  }
  getBody(t, e) {
    const { callbacks: s } = e, n = [];
    return R(t, (o) => {
      const r = {
        before: [],
        lines: [],
        after: []
      }, a = fn(s, o);
      lt(r.before, ut(Z(a, "beforeLabel", this, o))), lt(r.lines, Z(a, "label", this, o)), lt(r.after, ut(Z(a, "afterLabel", this, o))), n.push(r);
    }), n;
  }
  getAfterBody(t, e) {
    return un(Z(e.callbacks, "afterBody", this, t));
  }
  getFooter(t, e) {
    const { callbacks: s } = e, n = Z(s, "beforeFooter", this, t), o = Z(s, "footer", this, t), r = Z(s, "afterFooter", this, t);
    let a = [];
    return a = lt(a, ut(n)), a = lt(a, ut(o)), a = lt(a, ut(r)), a;
  }
  _createItems(t) {
    const e = this._active, s = this.chart.data, n = [], o = [], r = [];
    let a = [], l, c;
    for (l = 0, c = e.length; l < c; ++l)
      a.push(Gc(this.chart, e[l]));
    return t.filter && (a = a.filter((h, d, u) => t.filter(h, d, u, s))), t.itemSort && (a = a.sort((h, d) => t.itemSort(h, d, s))), R(a, (h) => {
      const d = fn(t.callbacks, h);
      n.push(Z(d, "labelColor", this, h)), o.push(Z(d, "labelPointStyle", this, h)), r.push(Z(d, "labelTextColor", this, h));
    }), this.labelColors = n, this.labelPointStyles = o, this.labelTextColors = r, this.dataPoints = a, a;
  }
  update(t, e) {
    const s = this.options.setContext(this.getContext()), n = this._active;
    let o, r = [];
    if (!n.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const a = le[s.position].call(this, n, this._eventPosition);
      r = this._createItems(s), this.title = this.getTitle(r, s), this.beforeBody = this.getBeforeBody(r, s), this.body = this.getBody(r, s), this.afterBody = this.getAfterBody(r, s), this.footer = this.getFooter(r, s);
      const l = this._size = cn(this, s), c = Object.assign({}, a, l), h = hn(this.chart, s, c), d = dn(s, c, h, this.chart);
      this.xAlign = h.xAlign, this.yAlign = h.yAlign, o = {
        opacity: 1,
        x: d.x,
        y: d.y,
        width: l.width,
        height: l.height,
        caretX: a.x,
        caretY: a.y
      };
    }
    this._tooltipItems = r, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && s.external && s.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: e
    });
  }
  drawCaret(t, e, s, n) {
    const o = this.getCaretPosition(t, s, n);
    e.lineTo(o.x1, o.y1), e.lineTo(o.x2, o.y2), e.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, e, s) {
    const { xAlign: n, yAlign: o } = this, { caretSize: r, cornerRadius: a } = s, { topLeft: l, topRight: c, bottomLeft: h, bottomRight: d } = Ft(a), { x: u, y: f } = t, { width: g, height: p } = e;
    let m, b, x, v, y, _;
    return o === "center" ? (y = f + p / 2, n === "left" ? (m = u, b = m - r, v = y + r, _ = y - r) : (m = u + g, b = m + r, v = y - r, _ = y + r), x = m) : (n === "left" ? b = u + Math.max(l, h) + r : n === "right" ? b = u + g - Math.max(c, d) - r : b = this.caretX, o === "top" ? (v = f, y = v - r, m = b - r, x = b + r) : (v = f + p, y = v + r, m = b + r, x = b - r), _ = v), {
      x1: m,
      x2: b,
      x3: x,
      y1: v,
      y2: y,
      y3: _
    };
  }
  drawTitle(t, e, s) {
    const n = this.title, o = n.length;
    let r, a, l;
    if (o) {
      const c = Ut(s.rtl, this.x, this.width);
      for (t.x = Ye(this, s.titleAlign, s), e.textAlign = c.textAlign(s.titleAlign), e.textBaseline = "middle", r = $(s.titleFont), a = s.titleSpacing, e.fillStyle = s.titleColor, e.font = r.string, l = 0; l < o; ++l)
        e.fillText(n[l], c.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + a, l + 1 === o && (t.y += s.titleMarginBottom - a);
    }
  }
  _drawColorBox(t, e, s, n, o) {
    const r = this.labelColors[s], a = this.labelPointStyles[s], { boxHeight: l, boxWidth: c } = o, h = $(o.bodyFont), d = Ye(this, "left", o), u = n.x(d), f = l < h.lineHeight ? (h.lineHeight - l) / 2 : 0, g = e.y + f;
    if (o.usePointStyle) {
      const p = {
        radius: Math.min(c, l) / 2,
        pointStyle: a.pointStyle,
        rotation: a.rotation,
        borderWidth: 1
      }, m = n.leftForLtr(u, c) + c / 2, b = g + l / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Di(t, p, m, b), t.strokeStyle = r.borderColor, t.fillStyle = r.backgroundColor, Di(t, p, m, b);
    } else {
      t.lineWidth = T(r.borderWidth) ? Math.max(...Object.values(r.borderWidth)) : r.borderWidth || 1, t.strokeStyle = r.borderColor, t.setLineDash(r.borderDash || []), t.lineDashOffset = r.borderDashOffset || 0;
      const p = n.leftForLtr(u, c), m = n.leftForLtr(n.xPlus(u, 1), c - 2), b = Ft(r.borderRadius);
      Object.values(b).some((x) => x !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, we(t, {
        x: p,
        y: g,
        w: c,
        h: l,
        radius: b
      }), t.fill(), t.stroke(), t.fillStyle = r.backgroundColor, t.beginPath(), we(t, {
        x: m,
        y: g + 1,
        w: c - 2,
        h: l - 2,
        radius: b
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(p, g, c, l), t.strokeRect(p, g, c, l), t.fillStyle = r.backgroundColor, t.fillRect(m, g + 1, c - 2, l - 2));
    }
    t.fillStyle = this.labelTextColors[s];
  }
  drawBody(t, e, s) {
    const { body: n } = this, { bodySpacing: o, bodyAlign: r, displayColors: a, boxHeight: l, boxWidth: c, boxPadding: h } = s, d = $(s.bodyFont);
    let u = d.lineHeight, f = 0;
    const g = Ut(s.rtl, this.x, this.width), p = function(M) {
      e.fillText(M, g.x(t.x + f), t.y + u / 2), t.y += u + o;
    }, m = g.textAlign(r);
    let b, x, v, y, _, w, k;
    for (e.textAlign = r, e.textBaseline = "middle", e.font = d.string, t.x = Ye(this, m, s), e.fillStyle = s.bodyColor, R(this.beforeBody, p), f = a && m !== "right" ? r === "center" ? c / 2 + h : c + 2 + h : 0, y = 0, w = n.length; y < w; ++y) {
      for (b = n[y], x = this.labelTextColors[y], e.fillStyle = x, R(b.before, p), v = b.lines, a && v.length && (this._drawColorBox(e, t, y, g, s), u = Math.max(d.lineHeight, l)), _ = 0, k = v.length; _ < k; ++_)
        p(v[_]), u = d.lineHeight;
      R(b.after, p);
    }
    f = 0, u = d.lineHeight, R(this.afterBody, p), t.y -= o;
  }
  drawFooter(t, e, s) {
    const n = this.footer, o = n.length;
    let r, a;
    if (o) {
      const l = Ut(s.rtl, this.x, this.width);
      for (t.x = Ye(this, s.footerAlign, s), t.y += s.footerMarginTop, e.textAlign = l.textAlign(s.footerAlign), e.textBaseline = "middle", r = $(s.footerFont), e.fillStyle = s.footerColor, e.font = r.string, a = 0; a < o; ++a)
        e.fillText(n[a], l.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + s.footerSpacing;
    }
  }
  drawBackground(t, e, s, n) {
    const { xAlign: o, yAlign: r } = this, { x: a, y: l } = t, { width: c, height: h } = s, { topLeft: d, topRight: u, bottomLeft: f, bottomRight: g } = Ft(n.cornerRadius);
    e.fillStyle = n.backgroundColor, e.strokeStyle = n.borderColor, e.lineWidth = n.borderWidth, e.beginPath(), e.moveTo(a + d, l), r === "top" && this.drawCaret(t, e, s, n), e.lineTo(a + c - u, l), e.quadraticCurveTo(a + c, l, a + c, l + u), r === "center" && o === "right" && this.drawCaret(t, e, s, n), e.lineTo(a + c, l + h - g), e.quadraticCurveTo(a + c, l + h, a + c - g, l + h), r === "bottom" && this.drawCaret(t, e, s, n), e.lineTo(a + f, l + h), e.quadraticCurveTo(a, l + h, a, l + h - f), r === "center" && o === "left" && this.drawCaret(t, e, s, n), e.lineTo(a, l + d), e.quadraticCurveTo(a, l, a + d, l), e.closePath(), e.fill(), n.borderWidth > 0 && e.stroke();
  }
  _updateAnimationTarget(t) {
    const e = this.chart, s = this.$animations, n = s && s.x, o = s && s.y;
    if (n || o) {
      const r = le[t.position].call(this, this._active, this._eventPosition);
      if (!r)
        return;
      const a = this._size = cn(this, t), l = Object.assign({}, r, this._size), c = hn(e, t, l), h = dn(t, l, c, e);
      (n._to !== h.x || o._to !== h.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = a.width, this.height = a.height, this.caretX = r.x, this.caretY = r.y, this._resolveAnimations().update(this, h));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const e = this.options.setContext(this.getContext());
    let s = this.opacity;
    if (!s)
      return;
    this._updateAnimationTarget(e);
    const n = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    s = Math.abs(s) < 1e-3 ? 0 : s;
    const r = G(e.padding), a = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    e.enabled && a && (t.save(), t.globalAlpha = s, this.drawBackground(o, t, n, e), Un(t, e.textDirection), o.y += r.top, this.drawTitle(o, t, e), this.drawBody(o, t, e), this.drawFooter(o, t, e), Xn(t, e.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, e) {
    const s = this._active, n = t.map(({ datasetIndex: a, index: l }) => {
      const c = this.chart.getDatasetMeta(a);
      if (!c)
        throw new Error("Cannot find a dataset at index " + a);
      return {
        datasetIndex: a,
        element: c.data[l],
        index: l
      };
    }), o = !qe(s, n), r = this._positionChanged(n, e);
    (o || r) && (this._active = n, this._eventPosition = e, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, e, s = !0) {
    if (e && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const n = this.options, o = this._active || [], r = this._getActiveElements(t, o, e, s), a = this._positionChanged(r, t), l = e || !qe(r, o) || a;
    return l && (this._active = r, (n.enabled || n.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, e))), l;
  }
  _getActiveElements(t, e, s, n) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!n)
      return e.filter((a) => this.chart.data.datasets[a.datasetIndex] && this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index) !== void 0);
    const r = this.chart.getElementsAtEventForMode(t, o.mode, o, s);
    return o.reverse && r.reverse(), r;
  }
  _positionChanged(t, e) {
    const { caretX: s, caretY: n, options: o } = this, r = le[o.position].call(this, t, e);
    return r !== !1 && (s !== r.x || n !== r.y);
  }
}
S(Ri, "positioners", le);
var Lo = {
  id: "tooltip",
  _element: Ri,
  positioners: le,
  afterInit(i, t, e) {
    e && (i.tooltip = new Ri({
      chart: i,
      options: e
    }));
  },
  beforeUpdate(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  reset(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  afterDraw(i) {
    const t = i.tooltip;
    if (t && t._willRender()) {
      const e = {
        tooltip: t
      };
      if (i.notifyPlugins("beforeTooltipDraw", {
        ...e,
        cancelable: !0
      }) === !1)
        return;
      t.draw(i.ctx), i.notifyPlugins("afterTooltipDraw", e);
    }
  },
  afterEvent(i, t) {
    if (i.tooltip) {
      const e = t.replay;
      i.tooltip.handleEvent(t.event, e, t.inChartArea) && (t.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (i, t) => t.bodyFont.size,
    boxWidth: (i, t) => t.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: To
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (i) => i !== "filter" && i !== "itemSort" && i !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
}, Ro = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Colors: vo,
  Decimation: ko,
  Filler: Po,
  Legend: Co,
  SubTitle: Oo,
  Title: Ao,
  Tooltip: Lo
});
const sh = (i, t, e, s) => (typeof t == "string" ? (e = i.push(t) - 1, s.unshift({
  index: e,
  label: t
})) : isNaN(t) && (e = null), e);
function nh(i, t, e, s) {
  const n = i.indexOf(t);
  if (n === -1)
    return sh(i, t, e, s);
  const o = i.lastIndexOf(t);
  return n !== o ? e : n;
}
const oh = (i, t) => i === null ? null : Y(Math.round(i), 0, t);
function gn(i) {
  const t = this.getLabels();
  return i >= 0 && i < t.length ? t[i] : i;
}
class si extends Dt {
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const e = this._addedLabels;
    if (e.length) {
      const s = this.getLabels();
      for (const { index: n, label: o } of e)
        s[n] === o && s.splice(n, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, e) {
    if (L(t))
      return null;
    const s = this.getLabels();
    return e = isFinite(e) && s[e] === t ? e : nh(s, t, A(e, t), this._addedLabels), oh(e, s.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: e } = this.getUserBounds();
    let { min: s, max: n } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (s = 0), e || (n = this.getLabels().length - 1)), this.min = s, this.max = n;
  }
  buildTicks() {
    const t = this.min, e = this.max, s = this.options.offset, n = [];
    let o = this.getLabels();
    o = t === 0 && e === o.length - 1 ? o : o.slice(t, e + 1), this._valueRange = Math.max(o.length - (s ? 0 : 1), 1), this._startValue = this.min - (s ? 0.5 : 0);
    for (let r = t; r <= e; r++)
      n.push({
        value: r
      });
    return n;
  }
  getLabelForValue(t) {
    return gn.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
S(si, "id", "category"), S(si, "defaults", {
  ticks: {
    callback: gn
  }
});
function rh(i, t) {
  const e = [], { bounds: n, step: o, min: r, max: a, precision: l, count: c, maxTicks: h, maxDigits: d, includeBounds: u } = i, f = o || 1, g = h - 1, { min: p, max: m } = t, b = !L(r), x = !L(a), v = !L(c), y = (m - p) / (d + 1);
  let _ = as((m - p) / g / f) * f, w, k, M, P;
  if (_ < 1e-14 && !b && !x)
    return [
      {
        value: p
      },
      {
        value: m
      }
    ];
  P = Math.ceil(m / _) - Math.floor(p / _), P > g && (_ = as(P * _ / g / f) * f), L(l) || (w = Math.pow(10, l), _ = Math.ceil(_ * w) / w), n === "ticks" ? (k = Math.floor(p / _) * _, M = Math.ceil(m / _) * _) : (k = p, M = m), b && x && o && mr((a - r) / o, _ / 1e3) ? (P = Math.round(Math.min((a - r) / _, h)), _ = (a - r) / P, k = r, M = a) : v ? (k = b ? r : k, M = x ? a : M, P = c - 1, _ = (M - k) / P) : (P = (M - k) / _, he(P, Math.round(P), _ / 1e3) ? P = Math.round(P) : P = Math.ceil(P));
  const D = Math.max(ls(_), ls(k));
  w = Math.pow(10, L(l) ? D : l), k = Math.round(k * w) / w, M = Math.round(M * w) / w;
  let C = 0;
  for (b && (u && k !== r ? (e.push({
    value: r
  }), k < r && C++, he(Math.round((k + C * _) * w) / w, r, pn(r, y, i)) && C++) : k < r && C++); C < P; ++C) {
    const O = Math.round((k + C * _) * w) / w;
    if (x && O > a)
      break;
    e.push({
      value: O
    });
  }
  return x && u && M !== a ? e.length && he(e[e.length - 1].value, a, pn(a, y, i)) ? e[e.length - 1].value = a : e.push({
    value: a
  }) : (!x || M === a) && e.push({
    value: M
  }), e;
}
function pn(i, t, { horizontal: e, minRotation: s }) {
  const n = at(s), o = (e ? Math.sin(n) : Math.cos(n)) || 1e-3, r = 0.75 * t * ("" + i).length;
  return Math.min(t / o, r);
}
class ni extends Dt {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    return L(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: e, maxDefined: s } = this.getUserBounds();
    let { min: n, max: o } = this;
    const r = (l) => n = e ? n : l, a = (l) => o = s ? o : l;
    if (t) {
      const l = ht(n), c = ht(o);
      l < 0 && c < 0 ? a(0) : l > 0 && c > 0 && r(0);
    }
    if (n === o) {
      let l = o === 0 ? 1 : Math.abs(o * 0.05);
      a(o + l), t || r(n - l);
    }
    this.min = n, this.max = o;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: e, stepSize: s } = t, n;
    return s ? (n = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1, n > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${n} ticks. Limiting to 1000.`), n = 1e3)) : (n = this.computeTickLimit(), e = e || 11), e && (n = Math.min(e, n)), n;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, e = t.ticks;
    let s = this.getTickLimit();
    s = Math.max(2, s);
    const n = {
      maxTicks: s,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: e.precision,
      step: e.stepSize,
      count: e.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: e.minRotation || 0,
      includeBounds: e.includeBounds !== !1
    }, o = this._range || this, r = rh(n, o);
    return t.bounds === "ticks" && An(r, this, "value"), t.reverse ? (r.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), r;
  }
  configure() {
    const t = this.ticks;
    let e = this.min, s = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const n = (s - e) / Math.max(t.length - 1, 1) / 2;
      e -= n, s += n;
    }
    this._startValue = e, this._endValue = s, this._valueRange = s - e;
  }
  getLabelForValue(t) {
    return Ae(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class oi extends ni {
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = N(t) ? t : 0, this.max = N(e) ? e : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), e = t ? this.width : this.height, s = at(this.options.ticks.minRotation), n = (t ? Math.sin(s) : Math.cos(s)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(e / Math.min(40, o.lineHeight / n));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
S(oi, "id", "linear"), S(oi, "defaults", {
  ticks: {
    callback: Oe.formatters.numeric
  }
});
const Pe = (i) => Math.floor(yt(i)), Rt = (i, t) => Math.pow(10, Pe(i) + t);
function mn(i) {
  return i / Math.pow(10, Pe(i)) === 1;
}
function bn(i, t, e) {
  const s = Math.pow(10, e), n = Math.floor(i / s);
  return Math.ceil(t / s) - n;
}
function ah(i, t) {
  const e = t - i;
  let s = Pe(e);
  for (; bn(i, t, s) > 10; )
    s++;
  for (; bn(i, t, s) < 10; )
    s--;
  return Math.min(s, Pe(i));
}
function lh(i, { min: t, max: e }) {
  t = tt(i.min, t);
  const s = [], n = Pe(t);
  let o = ah(t, e), r = o < 0 ? Math.pow(10, Math.abs(o)) : 1;
  const a = Math.pow(10, o), l = n > o ? Math.pow(10, n) : 0, c = Math.round((t - l) * r) / r, h = Math.floor((t - l) / a / 10) * a * 10;
  let d = Math.floor((c - h) / Math.pow(10, o)), u = tt(i.min, Math.round((l + h + d * Math.pow(10, o)) * r) / r);
  for (; u < e; )
    s.push({
      value: u,
      major: mn(u),
      significand: d
    }), d >= 10 ? d = d < 15 ? 15 : 20 : d++, d >= 20 && (o++, d = 2, r = o >= 0 ? 1 : r), u = Math.round((l + h + d * Math.pow(10, o)) * r) / r;
  const f = tt(i.max, u);
  return s.push({
    value: f,
    major: mn(f),
    significand: d
  }), s;
}
class ri extends Dt {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    const s = ni.prototype.parse.apply(this, [
      t,
      e
    ]);
    if (s === 0) {
      this._zero = !0;
      return;
    }
    return N(s) && s > 0 ? s : null;
  }
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = N(t) ? Math.max(0, t) : null, this.max = N(e) ? Math.max(0, e) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !N(this._userMin) && (this.min = t === Rt(this.min, 0) ? Rt(this.min, -1) : Rt(this.min, 0)), this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: t, maxDefined: e } = this.getUserBounds();
    let s = this.min, n = this.max;
    const o = (a) => s = t ? s : a, r = (a) => n = e ? n : a;
    s === n && (s <= 0 ? (o(1), r(10)) : (o(Rt(s, -1)), r(Rt(n, 1)))), s <= 0 && o(Rt(n, -1)), n <= 0 && r(Rt(s, 1)), this.min = s, this.max = n;
  }
  buildTicks() {
    const t = this.options, e = {
      min: this._userMin,
      max: this._userMax
    }, s = lh(e, this);
    return t.bounds === "ticks" && An(s, this, "value"), t.reverse ? (s.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), s;
  }
  getLabelForValue(t) {
    return t === void 0 ? "0" : Ae(t, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const t = this.min;
    super.configure(), this._startValue = yt(t), this._valueRange = yt(this.max) - yt(t);
  }
  getPixelForValue(t) {
    return (t === void 0 || t === 0) && (t = this.min), t === null || isNaN(t) ? NaN : this.getPixelForDecimal(t === this.min ? 0 : (yt(t) - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    const e = this.getDecimalForPixel(t);
    return Math.pow(10, this._startValue + e * this._valueRange);
  }
}
S(ri, "id", "logarithmic"), S(ri, "defaults", {
  ticks: {
    callback: Oe.formatters.logarithmic,
    major: {
      enabled: !0
    }
  }
});
function Ei(i) {
  const t = i.ticks;
  if (t.display && i.display) {
    const e = G(t.backdropPadding);
    return A(t.font && t.font.size, V.font.size) + e.height;
  }
  return 0;
}
function ch(i, t, e) {
  return e = F(e) ? e : [
    e
  ], {
    w: Rr(i, t.string, e),
    h: e.length * t.lineHeight
  };
}
function xn(i, t, e, s, n) {
  return i === s || i === n ? {
    start: t - e / 2,
    end: t + e / 2
  } : i < s || i > n ? {
    start: t - e,
    end: t
  } : {
    start: t,
    end: t + e
  };
}
function hh(i) {
  const t = {
    l: i.left + i._padding.left,
    r: i.right - i._padding.right,
    t: i.top + i._padding.top,
    b: i.bottom - i._padding.bottom
  }, e = Object.assign({}, t), s = [], n = [], o = i._pointLabels.length, r = i.options.pointLabels, a = r.centerPointLabels ? W / o : 0;
  for (let l = 0; l < o; l++) {
    const c = r.setContext(i.getPointLabelContext(l));
    n[l] = c.padding;
    const h = i.getPointPosition(l, i.drawingArea + n[l], a), d = $(c.font), u = ch(i.ctx, d, i._pointLabels[l]);
    s[l] = u;
    const f = et(i.getIndexAngle(l) + a), g = Math.round(Bi(f)), p = xn(g, h.x, u.w, 0, 180), m = xn(g, h.y, u.h, 90, 270);
    dh(e, t, f, p, m);
  }
  i.setCenterPoint(t.l - e.l, e.r - t.r, t.t - e.t, e.b - t.b), i._pointLabelItems = gh(i, s, n);
}
function dh(i, t, e, s, n) {
  const o = Math.abs(Math.sin(e)), r = Math.abs(Math.cos(e));
  let a = 0, l = 0;
  s.start < t.l ? (a = (t.l - s.start) / o, i.l = Math.min(i.l, t.l - a)) : s.end > t.r && (a = (s.end - t.r) / o, i.r = Math.max(i.r, t.r + a)), n.start < t.t ? (l = (t.t - n.start) / r, i.t = Math.min(i.t, t.t - l)) : n.end > t.b && (l = (n.end - t.b) / r, i.b = Math.max(i.b, t.b + l));
}
function uh(i, t, e) {
  const s = i.drawingArea, { extra: n, additionalAngle: o, padding: r, size: a } = e, l = i.getPointPosition(t, s + n + r, o), c = Math.round(Bi(et(l.angle + j))), h = bh(l.y, a.h, c), d = ph(c), u = mh(l.x, a.w, d);
  return {
    visible: !0,
    x: l.x,
    y: h,
    textAlign: d,
    left: u,
    top: h,
    right: u + a.w,
    bottom: h + a.h
  };
}
function fh(i, t) {
  if (!t)
    return !0;
  const { left: e, top: s, right: n, bottom: o } = i;
  return !(mt({
    x: e,
    y: s
  }, t) || mt({
    x: e,
    y: o
  }, t) || mt({
    x: n,
    y: s
  }, t) || mt({
    x: n,
    y: o
  }, t));
}
function gh(i, t, e) {
  const s = [], n = i._pointLabels.length, o = i.options, { centerPointLabels: r, display: a } = o.pointLabels, l = {
    extra: Ei(o) / 2,
    additionalAngle: r ? W / n : 0
  };
  let c;
  for (let h = 0; h < n; h++) {
    l.padding = e[h], l.size = t[h];
    const d = uh(i, h, l);
    s.push(d), a === "auto" && (d.visible = fh(d, c), d.visible && (c = d));
  }
  return s;
}
function ph(i) {
  return i === 0 || i === 180 ? "center" : i < 180 ? "left" : "right";
}
function mh(i, t, e) {
  return e === "right" ? i -= t : e === "center" && (i -= t / 2), i;
}
function bh(i, t, e) {
  return e === 90 || e === 270 ? i -= t / 2 : (e > 270 || e < 90) && (i -= t), i;
}
function xh(i, t, e) {
  const { left: s, top: n, right: o, bottom: r } = e, { backdropColor: a } = t;
  if (!L(a)) {
    const l = Ft(t.borderRadius), c = G(t.backdropPadding);
    i.fillStyle = a;
    const h = s - c.left, d = n - c.top, u = o - s + c.width, f = r - n + c.height;
    Object.values(l).some((g) => g !== 0) ? (i.beginPath(), we(i, {
      x: h,
      y: d,
      w: u,
      h: f,
      radius: l
    }), i.fill()) : i.fillRect(h, d, u, f);
  }
}
function _h(i, t) {
  const { ctx: e, options: { pointLabels: s } } = i;
  for (let n = t - 1; n >= 0; n--) {
    const o = i._pointLabelItems[n];
    if (!o.visible)
      continue;
    const r = s.setContext(i.getPointLabelContext(n));
    xh(e, r, o);
    const a = $(r.font), { x: l, y: c, textAlign: h } = o;
    Bt(e, i._pointLabels[n], l, c + a.lineHeight / 2, a, {
      color: r.color,
      textAlign: h,
      textBaseline: "middle"
    });
  }
}
function Eo(i, t, e, s) {
  const { ctx: n } = i;
  if (e)
    n.arc(i.xCenter, i.yCenter, t, 0, z);
  else {
    let o = i.getPointPosition(0, t);
    n.moveTo(o.x, o.y);
    for (let r = 1; r < s; r++)
      o = i.getPointPosition(r, t), n.lineTo(o.x, o.y);
  }
}
function yh(i, t, e, s, n) {
  const o = i.ctx, r = t.circular, { color: a, lineWidth: l } = t;
  !r && !s || !a || !l || e < 0 || (o.save(), o.strokeStyle = a, o.lineWidth = l, o.setLineDash(n.dash), o.lineDashOffset = n.dashOffset, o.beginPath(), Eo(i, e, r, s), o.closePath(), o.stroke(), o.restore());
}
function vh(i, t, e) {
  return Pt(i, {
    label: e,
    index: t,
    type: "pointLabel"
  });
}
class Yt extends ni {
  constructor(t) {
    super(t), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
  }
  setDimensions() {
    const t = this._padding = G(Ei(this.options) / 2), e = this.width = this.maxWidth - t.width, s = this.height = this.maxHeight - t.height;
    this.xCenter = Math.floor(this.left + e / 2 + t.left), this.yCenter = Math.floor(this.top + s / 2 + t.top), this.drawingArea = Math.floor(Math.min(e, s) / 2);
  }
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!1);
    this.min = N(t) && !isNaN(t) ? t : 0, this.max = N(e) && !isNaN(e) ? e : 0, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / Ei(this.options));
  }
  generateTickLabels(t) {
    ni.prototype.generateTickLabels.call(this, t), this._pointLabels = this.getLabels().map((e, s) => {
      const n = I(this.options.pointLabels.callback, [
        e,
        s
      ], this);
      return n || n === 0 ? n : "";
    }).filter((e, s) => this.chart.getDataVisibility(s));
  }
  fit() {
    const t = this.options;
    t.display && t.pointLabels.display ? hh(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(t, e, s, n) {
    this.xCenter += Math.floor((t - e) / 2), this.yCenter += Math.floor((s - n) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(t, e, s, n));
  }
  getIndexAngle(t) {
    const e = z / (this._pointLabels.length || 1), s = this.options.startAngle || 0;
    return et(t * e + at(s));
  }
  getDistanceFromCenterForValue(t) {
    if (L(t))
      return NaN;
    const e = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - t) * e : (t - this.min) * e;
  }
  getValueForDistanceFromCenter(t) {
    if (L(t))
      return NaN;
    const e = t / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - e : this.min + e;
  }
  getPointLabelContext(t) {
    const e = this._pointLabels || [];
    if (t >= 0 && t < e.length) {
      const s = e[t];
      return vh(this.getContext(), t, s);
    }
  }
  getPointPosition(t, e, s = 0) {
    const n = this.getIndexAngle(t) - j + s;
    return {
      x: Math.cos(n) * e + this.xCenter,
      y: Math.sin(n) * e + this.yCenter,
      angle: n
    };
  }
  getPointPositionForValue(t, e) {
    return this.getPointPosition(t, this.getDistanceFromCenterForValue(e));
  }
  getBasePosition(t) {
    return this.getPointPositionForValue(t || 0, this.getBaseValue());
  }
  getPointLabelPosition(t) {
    const { left: e, top: s, right: n, bottom: o } = this._pointLabelItems[t];
    return {
      left: e,
      top: s,
      right: n,
      bottom: o
    };
  }
  drawBackground() {
    const { backgroundColor: t, grid: { circular: e } } = this.options;
    if (t) {
      const s = this.ctx;
      s.save(), s.beginPath(), Eo(this, this.getDistanceFromCenterForValue(this._endValue), e, this._pointLabels.length), s.closePath(), s.fillStyle = t, s.fill(), s.restore();
    }
  }
  drawGrid() {
    const t = this.ctx, e = this.options, { angleLines: s, grid: n, border: o } = e, r = this._pointLabels.length;
    let a, l, c;
    if (e.pointLabels.display && _h(this, r), n.display && this.ticks.forEach((h, d) => {
      if (d !== 0) {
        l = this.getDistanceFromCenterForValue(h.value);
        const u = this.getContext(d), f = n.setContext(u), g = o.setContext(u);
        yh(this, f, l, r, g);
      }
    }), s.display) {
      for (t.save(), a = r - 1; a >= 0; a--) {
        const h = s.setContext(this.getPointLabelContext(a)), { color: d, lineWidth: u } = h;
        !u || !d || (t.lineWidth = u, t.strokeStyle = d, t.setLineDash(h.borderDash), t.lineDashOffset = h.borderDashOffset, l = this.getDistanceFromCenterForValue(e.ticks.reverse ? this.min : this.max), c = this.getPointPosition(a, l), t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(c.x, c.y), t.stroke());
      }
      t.restore();
    }
  }
  drawBorder() {
  }
  drawLabels() {
    const t = this.ctx, e = this.options, s = e.ticks;
    if (!s.display)
      return;
    const n = this.getIndexAngle(0);
    let o, r;
    t.save(), t.translate(this.xCenter, this.yCenter), t.rotate(n), t.textAlign = "center", t.textBaseline = "middle", this.ticks.forEach((a, l) => {
      if (l === 0 && !e.reverse)
        return;
      const c = s.setContext(this.getContext(l)), h = $(c.font);
      if (o = this.getDistanceFromCenterForValue(this.ticks[l].value), c.showLabelBackdrop) {
        t.font = h.string, r = t.measureText(a.label).width, t.fillStyle = c.backdropColor;
        const d = G(c.backdropPadding);
        t.fillRect(-r / 2 - d.left, -o - h.size / 2 - d.top, r + d.width, h.size + d.height);
      }
      Bt(t, a.label, 0, -o, h, {
        color: c.color,
        strokeColor: c.textStrokeColor,
        strokeWidth: c.textStrokeWidth
      });
    }), t.restore();
  }
  drawTitle() {
  }
}
S(Yt, "id", "radialLinear"), S(Yt, "defaults", {
  display: !0,
  animate: !0,
  position: "chartArea",
  angleLines: {
    display: !0,
    lineWidth: 1,
    borderDash: [],
    borderDashOffset: 0
  },
  grid: {
    circular: !1
  },
  startAngle: 0,
  ticks: {
    showLabelBackdrop: !0,
    callback: Oe.formatters.numeric
  },
  pointLabels: {
    backdropColor: void 0,
    backdropPadding: 2,
    display: !0,
    font: {
      size: 10
    },
    callback(t) {
      return t;
    },
    padding: 5,
    centerPointLabels: !1
  }
}), S(Yt, "defaultRoutes", {
  "angleLines.color": "borderColor",
  "pointLabels.color": "color",
  "ticks.color": "color"
}), S(Yt, "descriptors", {
  angleLines: {
    _fallback: "grid"
  }
});
const di = {
  millisecond: {
    common: !0,
    size: 1,
    steps: 1e3
  },
  second: {
    common: !0,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: !0,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: !0,
    size: 36e5,
    steps: 24
  },
  day: {
    common: !0,
    size: 864e5,
    steps: 30
  },
  week: {
    common: !1,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: !0,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: !1,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: !0,
    size: 3154e7
  }
}, J = /* @__PURE__ */ Object.keys(di);
function _n(i, t) {
  return i - t;
}
function yn(i, t) {
  if (L(t))
    return null;
  const e = i._adapter, { parser: s, round: n, isoWeekday: o } = i._parseOpts;
  let r = t;
  return typeof s == "function" && (r = s(r)), N(r) || (r = typeof s == "string" ? e.parse(r, s) : e.parse(r)), r === null ? null : (n && (r = n === "week" && (Kt(o) || o === !0) ? e.startOf(r, "isoWeek", o) : e.startOf(r, n)), +r);
}
function vn(i, t, e, s) {
  const n = J.length;
  for (let o = J.indexOf(i); o < n - 1; ++o) {
    const r = di[J[o]], a = r.steps ? r.steps : Number.MAX_SAFE_INTEGER;
    if (r.common && Math.ceil((e - t) / (a * r.size)) <= s)
      return J[o];
  }
  return J[n - 1];
}
function Mh(i, t, e, s, n) {
  for (let o = J.length - 1; o >= J.indexOf(e); o--) {
    const r = J[o];
    if (di[r].common && i._adapter.diff(n, s, r) >= t - 1)
      return r;
  }
  return J[e ? J.indexOf(e) : 0];
}
function kh(i) {
  for (let t = J.indexOf(i) + 1, e = J.length; t < e; ++t)
    if (di[J[t]].common)
      return J[t];
}
function Mn(i, t, e) {
  if (!e)
    i[t] = !0;
  else if (e.length) {
    const { lo: s, hi: n } = Vi(e, t), o = e[s] >= t ? e[s] : e[n];
    i[o] = !0;
  }
}
function wh(i, t, e, s) {
  const n = i._adapter, o = +n.startOf(t[0].value, s), r = t[t.length - 1].value;
  let a, l;
  for (a = o; a <= r; a = +n.add(a, 1, s))
    l = e[a], l >= 0 && (t[l].major = !0);
  return t;
}
function kn(i, t, e) {
  const s = [], n = {}, o = t.length;
  let r, a;
  for (r = 0; r < o; ++r)
    a = t[r], n[a] = r, s.push({
      value: a,
      major: !1
    });
  return o === 0 || !e ? s : wh(i, s, n, e);
}
class Zt extends Dt {
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, e = {}) {
    const s = t.time || (t.time = {}), n = this._adapter = new eo._date(t.adapters.date);
    n.init(e), ce(s.displayFormats, n.formats()), this._parseOpts = {
      parser: s.parser,
      round: s.round,
      isoWeekday: s.isoWeekday
    }, super.init(t), this._normalized = e.normalized;
  }
  parse(t, e) {
    return t === void 0 ? null : yn(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, e = this._adapter, s = t.time.unit || "day";
    let { min: n, max: o, minDefined: r, maxDefined: a } = this.getUserBounds();
    function l(c) {
      !r && !isNaN(c.min) && (n = Math.min(n, c.min)), !a && !isNaN(c.max) && (o = Math.max(o, c.max));
    }
    (!r || !a) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), n = N(n) && !isNaN(n) ? n : +e.startOf(Date.now(), s), o = N(o) && !isNaN(o) ? o : +e.endOf(Date.now(), s) + 1, this.min = Math.min(n, o - 1), this.max = Math.max(n + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let e = Number.POSITIVE_INFINITY, s = Number.NEGATIVE_INFINITY;
    return t.length && (e = t[0], s = t[t.length - 1]), {
      min: e,
      max: s
    };
  }
  buildTicks() {
    const t = this.options, e = t.time, s = t.ticks, n = s.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && n.length && (this.min = this._userMin || n[0], this.max = this._userMax || n[n.length - 1]);
    const o = this.min, r = this.max, a = yr(n, o, r);
    return this._unit = e.unit || (s.autoSkip ? vn(e.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Mh(this, a.length, e.minUnit, this.min, this.max)), this._majorUnit = !s.major.enabled || this._unit === "year" ? void 0 : kh(this._unit), this.initOffsets(n), t.reverse && a.reverse(), kn(this, a, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let e = 0, s = 0, n, o;
    this.options.offset && t.length && (n = this.getDecimalForValue(t[0]), t.length === 1 ? e = 1 - n : e = (this.getDecimalForValue(t[1]) - n) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? s = o : s = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const r = t.length < 3 ? 0.5 : 0.25;
    e = Y(e, 0, r), s = Y(s, 0, r), this._offsets = {
      start: e,
      end: s,
      factor: 1 / (e + 1 + s)
    };
  }
  _generate() {
    const t = this._adapter, e = this.min, s = this.max, n = this.options, o = n.time, r = o.unit || vn(o.minUnit, e, s, this._getLabelCapacity(e)), a = A(n.ticks.stepSize, 1), l = r === "week" ? o.isoWeekday : !1, c = Kt(l) || l === !0, h = {};
    let d = e, u, f;
    if (c && (d = +t.startOf(d, "isoWeek", l)), d = +t.startOf(d, c ? "day" : r), t.diff(s, e, r) > 1e5 * a)
      throw new Error(e + " and " + s + " are too far apart with stepSize of " + a + " " + r);
    const g = n.ticks.source === "data" && this.getDataTimestamps();
    for (u = d, f = 0; u < s; u = +t.add(u, a, r), f++)
      Mn(h, u, g);
    return (u === s || n.bounds === "ticks" || f === 1) && Mn(h, u, g), Object.keys(h).sort(_n).map((p) => +p);
  }
  getLabelForValue(t) {
    const e = this._adapter, s = this.options.time;
    return s.tooltipFormat ? e.format(t, s.tooltipFormat) : e.format(t, s.displayFormats.datetime);
  }
  format(t, e) {
    const n = this.options.time.displayFormats, o = this._unit, r = e || n[o];
    return this._adapter.format(t, r);
  }
  _tickFormatFunction(t, e, s, n) {
    const o = this.options, r = o.ticks.callback;
    if (r)
      return I(r, [
        t,
        e,
        s
      ], this);
    const a = o.time.displayFormats, l = this._unit, c = this._majorUnit, h = l && a[l], d = c && a[c], u = s[e], f = c && d && u && u.major;
    return this._adapter.format(t, n || (f ? d : h));
  }
  generateTickLabels(t) {
    let e, s, n;
    for (e = 0, s = t.length; e < s; ++e)
      n = t[e], n.label = this._tickFormatFunction(n.value, e, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const e = this._offsets, s = this.getDecimalForValue(t);
    return this.getPixelForDecimal((e.start + s) * e.factor);
  }
  getValueForPixel(t) {
    const e = this._offsets, s = this.getDecimalForPixel(t) / e.factor - e.end;
    return this.min + s * (this.max - this.min);
  }
  _getLabelSize(t) {
    const e = this.options.ticks, s = this.ctx.measureText(t).width, n = at(this.isHorizontal() ? e.maxRotation : e.minRotation), o = Math.cos(n), r = Math.sin(n), a = this._resolveTickFontOptions(0).size;
    return {
      w: s * o + a * r,
      h: s * r + a * o
    };
  }
  _getLabelCapacity(t) {
    const e = this.options.time, s = e.displayFormats, n = s[e.unit] || s.millisecond, o = this._tickFormatFunction(t, 0, kn(this, [
      t
    ], this._majorUnit), n), r = this._getLabelSize(o), a = Math.floor(this.isHorizontal() ? this.width / r.w : this.height / r.h) - 1;
    return a > 0 ? a : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], e, s;
    if (t.length)
      return t;
    const n = this.getMatchingVisibleMetas();
    if (this._normalized && n.length)
      return this._cache.data = n[0].controller.getAllParsedValues(this);
    for (e = 0, s = n.length; e < s; ++e)
      t = t.concat(n[e].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let e, s;
    if (t.length)
      return t;
    const n = this.getLabels();
    for (e = 0, s = n.length; e < s; ++e)
      t.push(yn(this, n[e]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Ln(t.sort(_n));
  }
}
S(Zt, "id", "time"), S(Zt, "defaults", {
  bounds: "data",
  adapters: {},
  time: {
    parser: !1,
    unit: !1,
    round: !1,
    isoWeekday: !1,
    minUnit: "millisecond",
    displayFormats: {}
  },
  ticks: {
    source: "auto",
    callback: !1,
    major: {
      enabled: !1
    }
  }
});
function Ue(i, t, e) {
  let s = 0, n = i.length - 1, o, r, a, l;
  e ? (t >= i[s].pos && t <= i[n].pos && ({ lo: s, hi: n } = pt(i, "pos", t)), { pos: o, time: a } = i[s], { pos: r, time: l } = i[n]) : (t >= i[s].time && t <= i[n].time && ({ lo: s, hi: n } = pt(i, "time", t)), { time: o, pos: a } = i[s], { time: r, pos: l } = i[n]);
  const c = r - o;
  return c ? a + (l - a) * (t - o) / c : a;
}
class ai extends Zt {
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), e = this._table = this.buildLookupTable(t);
    this._minPos = Ue(e, this.min), this._tableRange = Ue(e, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: e, max: s } = this, n = [], o = [];
    let r, a, l, c, h;
    for (r = 0, a = t.length; r < a; ++r)
      c = t[r], c >= e && c <= s && n.push(c);
    if (n.length < 2)
      return [
        {
          time: e,
          pos: 0
        },
        {
          time: s,
          pos: 1
        }
      ];
    for (r = 0, a = n.length; r < a; ++r)
      h = n[r + 1], l = n[r - 1], c = n[r], Math.round((h + l) / 2) !== c && o.push({
        time: c,
        pos: r / (a - 1)
      });
    return o;
  }
  _generate() {
    const t = this.min, e = this.max;
    let s = super.getDataTimestamps();
    return (!s.includes(t) || !s.length) && s.splice(0, 0, t), (!s.includes(e) || s.length === 1) && s.push(e), s.sort((n, o) => n - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const e = this.getDataTimestamps(), s = this.getLabelTimestamps();
    return e.length && s.length ? t = this.normalize(e.concat(s)) : t = e.length ? e : s, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (Ue(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const e = this._offsets, s = this.getDecimalForPixel(t) / e.factor - e.end;
    return Ue(this._table, s * this._tableRange + this._minPos, !0);
  }
}
S(ai, "id", "timeseries"), S(ai, "defaults", Zt.defaults);
var Io = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CategoryScale: si,
  LinearScale: oi,
  LogarithmicScale: ri,
  RadialLinearScale: Yt,
  TimeScale: Zt,
  TimeSeriesScale: ai
});
const Sh = [
  to,
  xo,
  Ro,
  Io
], Ph = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Animation: Zn,
  Animations: qi,
  ArcElement: $t,
  BarController: fe,
  BarElement: _e,
  BasePlatform: Zi,
  BasicPlatform: oo,
  BubbleController: ge,
  CategoryScale: si,
  Chart: xt,
  Colors: vo,
  DatasetController: st,
  Decimation: ko,
  DomPlatform: lo,
  DoughnutController: vt,
  Element: nt,
  Filler: Po,
  Interaction: io,
  Legend: Co,
  LineController: pe,
  LineElement: bt,
  LinearScale: oi,
  LogarithmicScale: ri,
  PieController: ti,
  PointElement: xe,
  PolarAreaController: Xt,
  RadarController: me,
  RadialLinearScale: Yt,
  Scale: Dt,
  ScatterController: be,
  SubTitle: Oo,
  Ticks: Oe,
  TimeScale: Zt,
  TimeSeriesScale: ai,
  Title: Ao,
  Tooltip: Lo,
  _adapters: eo,
  _detectPlatform: co,
  animator: ct,
  controllers: to,
  defaults: V,
  elements: xo,
  layouts: X,
  plugins: Ro,
  registerables: Sh,
  registry: rt,
  scales: Io
}, Symbol.toStringTag, { value: "Module" }));
function Dh(i) {
  i.helpers;
  var t = i.defaults.global;
  t.elements.trapezium = {
    backgroundColor: t.defaultColor,
    borderWidth: 0,
    borderColor: t.defaultColor,
    borderSkipped: "bottom",
    type: "isosceles"
    // isosceles, scalene
  };
  var e = function(s, n) {
    for (var o = s[0], r = s[1], a = !1, l = 0, c = n.length - 1; l < n.length; c = l++) {
      var h = n[l][0], d = n[l][1], u = n[c][0], f = n[c][1], g = d > r != f > r && o < (u - h) * (r - d) / (f - d) + h;
      g && (a = !a);
    }
    return a;
  };
  i.elements.Trapezium = i.elements.Rectangle.extend({
    getCorners: function() {
      var s = this._view, n = t.elements.trapezium, o = [], r = s.type || n.type, a = s.y, l = s.borderWidth || n.borderWidth, c = s.upperWidth / 2, h = s.bottomWidth / 2, d = l / 2;
      if (d = d < 0 ? 0 : d, r == "isosceles") {
        var u = s.x;
        o = [
          [u - h + d, s.base],
          [u - c + d, a + d],
          [u + c - d, a + d],
          [u + h - d, s.base]
        ];
      } else if (r == "scalene") {
        var f = s.x1, g = s.x2;
        o = [
          [g - h + d, s.base],
          [f - c + d, a + d],
          [f + c - d, a + d],
          [g + h - d, s.base]
        ];
      }
      return o;
    },
    draw: function() {
      var s = this._chart.ctx, n = this._view, o = t.elements.trapezium, r = this.getCorners();
      this._cornersCache = r, s.beginPath(), s.fillStyle = n.backgroundColor || o.backgroundColor, s.strokeStyle = n.borderColor || o.borderColor, s.lineWidth = n.borderWidth || o.borderWidth;
      var a = ["bottom", "left", "top", "right"], l = a.indexOf(
        n.borderSkipped || o.borderSkipped,
        0
      );
      l === -1 && (l = 0);
      function c(d) {
        return r[(l + d) % 4];
      }
      s.moveTo.apply(s, c(0));
      for (var h = 1; h < 4; h++)
        s.lineTo.apply(s, c(h));
      s.fill(), n.borderWidth && s.stroke();
    },
    height: function() {
      var s = this._view;
      return s ? s.base - s.y : 0;
    },
    inRange: function(s, n) {
      var o = this._view;
      if (!o)
        return !1;
      var r = this._cornersCache ? this._cornersCache : this.getCorners();
      return e([s, n], r);
    },
    inLabelRange: function(s) {
      var n = this._view;
      if (!n)
        return !1;
      if (n.type == "scalene")
        return n.x1 > n.x2 ? s >= n.x2 - n.bottomWidth / 2 && s <= n.x1 + n.upperWidth / 2 : s <= n.x2 + n.bottomWidth / 2 && s >= n.x1 - n.upperWidth / 2;
      var o = Math.max(n.upperWidth, n.bottomWidth);
      return s >= n.x - o / 2 && s <= n.x + o / 2;
    },
    tooltipPosition: function() {
      var s = this._view;
      return {
        x: s.x || s.x2,
        y: s.base - (s.base - s.y) / 2
      };
    },
    getArea: function() {
      this._view;
      for (var s = 0, n = this._cornersCache ? this._cornersCache : this.getCorners(), o = 0, r = n.length; o < r; o++) {
        var a = n[o][0], l = n[o == n.length - 1 ? 0 : o + 1][1], c = n[o == n.length - 1 ? 0 : o + 1][0], h = n[o][1];
        s += a * l * 0.5, s -= c * h * 0.5;
      }
      return Math.abs(s);
    },
    getCenterPoint: function() {
      var s = this._cornersCache ? this._cornersCache : this.getCorners();
      this._view;
      var n = 0, o = 0, r, a, l, c, h;
      for (r = 0, a = s.length - 1; r < s.length; a = r, r++)
        c = s[r], h = s[a], l = c[0] * h[1] - h[0] * c[1], n += (c[0] + h[0]) * l, o += (c[1] + h[1]) * l;
      return l = this.getArea() * 6, { x: n / l, y: o / l };
    }
  });
}
function Ch(i) {
  var t = i.helpers;
  i.defaults.funnel = {
    hover: {
      mode: "label"
    },
    sort: "asc",
    // sort options: 'asc', 'desc'
    gap: 0,
    bottomWidth: null,
    // the bottom width of funnel
    topWidth: 0,
    // the top width of funnel
    keep: "auto",
    // Keep left or right
    elements: {
      borderWidth: 0
    },
    tooltips: {
      callbacks: {
        title: function(e, s) {
          return "";
        },
        label: function(e, s) {
          return s.labels[e.index] + ": " + s.datasets[e.datasetIndex].data[e.index];
        }
      }
    },
    legendCallback: function(e) {
      var s = [];
      s.push('<ul class="' + e.id + '-legend">');
      var n = e.data, o = n.datasets, r = n.labels;
      if (o.length)
        for (var a = 0; a < o[0].data.length; ++a)
          s.push('<li><span style="background-color:' + o[0].backgroundColor[a] + '"></span>'), r[a] && s.push(r[a]), s.push("</li>");
      return s.push("</ul>"), s.join("");
    },
    legend: {
      labels: {
        generateLabels: function(e) {
          var s = e.data;
          return s.labels.length && s.datasets.length ? s.labels.map(function(n, o) {
            var r = e.getDatasetMeta(0), a = s.datasets[0], l = r.data[o], c = l.custom || {}, h = t.getValueAtIndexOrDefault, d = e.options.elements.trapezium, u = c.backgroundColor ? c.backgroundColor : h(a.backgroundColor, o, d.backgroundColor), f = c.borderColor ? c.borderColor : h(a.borderColor, o, d.borderColor), g = c.borderWidth ? c.borderWidth : h(a.borderWidth, o, d.borderWidth);
            return {
              text: n,
              fillStyle: u,
              strokeStyle: f,
              lineWidth: g,
              hidden: isNaN(a.data[o]) || r.data[o].hidden,
              // Extra data used for toggling the correct item
              index: o,
              // Original Index
              _index: l._index
            };
          }) : [];
        }
      },
      onClick: function(e, s) {
        var n = s.index, o = this.chart, r, a, l;
        for (r = 0, a = (o.data.datasets || []).length; r < a; ++r)
          l = o.getDatasetMeta(r), l.data[n].hidden = !l.data[n].hidden;
        o.update();
      }
    },
    scales: {
      xAxes: [{
        position: "left",
        type: "category",
        display: !1,
        // Specific to Horizontal Bar Controller
        categoryPercentage: 0.8,
        barPercentage: 0.9,
        // offset settings
        offset: !0,
        // grid line settings
        gridLines: {
          offsetGridLines: !0
        }
      }],
      yAxes: [{
        position: "left",
        type: "category",
        display: !1,
        // Specific to Horizontal Bar Controller
        categoryPercentage: 0.8,
        barPercentage: 0.9,
        // offset settings
        offset: !0,
        // grid line settings
        gridLines: {
          offsetGridLines: !0
        }
      }]
    }
  }, i.controllers.funnel = i.DatasetController.extend({
    dataElementType: i.elements.Trapezium,
    initialize: function(e, s) {
      if (i.controllers.bar.prototype.initialize.call(this, e, s), typeof e.options < "u" && typeof e.options.sort < "u" && e.options.sort.substr(0, 4) !== "data") {
        var n = e.data.datasets[s], o = [];
        n.data.slice(), t.each(n.data, function(f, g) {
          o.push({ index: g, value: f });
        }), o.sort(function(f, g) {
          return e.options.sort === "asc" ? f.value - g.value : g.value - f.value;
        });
        var r = e.data.labels.map((f, g) => e.data.labels[o[g].index]);
        e.data.labels = r;
        for (var a = Object.keys(n), l = 0, c = a.length; l < c; l++) {
          var h = a[l], d = n[h];
          if (n.hasOwnProperty(h) && Array.isArray(d)) {
            var u = d.map((f, g) => d[o[g].index]);
            n[h] = u;
          }
        }
      }
    },
    linkScales: function() {
      var e = this, s = e.getMeta(), n = e.getDataset();
      (s.yAxisID === null || !(s.yAxisID in e.chart.scales)) && (s.yAxisID = n.yAxisID || e.chart.options.scales.yAxes[0].id), (s.xAxisID === null || !(s.xAxisID in e.chart.scales)) && (s.xAxisID = n.xAxisID || e.chart.options.scales.xAxes[0].id);
    },
    update: function(s) {
      var n = this, o = n.chart, r = o.chartArea, a = o.options, l = n.getMeta(), c = l.data, h = a.elements.borderWidth || 0, d = r.right - r.left - h * 2, u = r.bottom - r.top - h * 2, f = d, g = (a.topWidth < d ? a.topWidth : d) || 0;
      a.bottomWidth && (f = a.bottomWidth < d ? a.bottomWidth : d);
      var p = n.getDataset(), m = [], b = 0, x = 0;
      t.each(p.data, function(k, M) {
        var P = t.getValueAtIndexOrDefault(p.backgroundColor, M), D = c[M].hidden;
        m.push({
          hidden: D,
          orgIndex: M,
          val: k,
          backgroundColor: P,
          borderColor: t.getValueAtIndexOrDefault(p.borderColor, M, P),
          label: t.getValueAtIndexOrDefault(p.label, M, o.data.labels[M])
        }), c[M].hidden || (b++, x = k > x ? k : x);
      });
      var v = f / x, y = 0;
      t.each(m, function(k, M) {
        k._viewIndex = k.hidden ? -1 : y++;
      });
      var _ = a.gap || 0, w = (u - (b - 1) * _) / b;
      n.topWidth = g, n.dwRatio = v, n.elHeight = w, n.valAndLabels = m, t.each(c, function(k, M) {
        n.updateElement(k, M, s);
      }, n);
    },
    // update elements
    updateElement: function(s, n, o) {
      var r = this, a = r.chart, l = a.chartArea, c = a.options, h = c.sort, d = r.dwRatio, u = r.elHeight, f = c.gap || 0, g = c.elements.borderWidth || 0, p, m, b, x, v = "isosceles", y = r.valAndLabels[n], _, w, k = y._viewIndex < 0 ? n : y._viewIndex, M = l.top + (k + 1) * (u + f) - f, P = r.getMeta();
      if (s._xScale = r.getScaleForId(P.xAxisID), h === "asc" || h === "data-asc" || !h) {
        var D = t.findPreviousWhere(
          r.valAndLabels,
          function(O) {
            return !O.hidden;
          },
          n
        );
        _ = D ? D.val * d : y.val * 0.7 * d, w = y.val * d;
      } else if (h === "desc" || h === "data-desc") {
        var C = t.findNextWhere(
          r.valAndLabels,
          function(O) {
            return !O.hidden;
          },
          n
        );
        _ = y.val * d, w = C ? C.val * d : y.val * 0.7 * d;
      }
      m = l.top + y.orgIndex * (u + f), c.keep === "left" ? (v = "scalene", b = l.left + _ / 2, x = l.left + w / 2, p = b) : c.keep === "right" ? (v = "scalene", b = l.right - _ / 2, x = l.right - w / 2, p = b) : p = (l.left + l.right) / 2, t.extend(s, {
        // Utility
        _datasetIndex: r.index,
        _index: y.orgIndex,
        // Desired view properties
        _model: {
          type: v,
          y: m,
          base: M > l.bottom ? l.bottom : M,
          x: p,
          x1: b,
          x2: x,
          upperWidth: o || y.hidden ? 0 : _,
          bottomWidth: o || y.hidden ? 0 : w,
          borderWidth: g,
          backgroundColor: y && y.backgroundColor,
          borderColor: y && y.borderColor,
          label: y && y.label
        }
      }), s.pivot();
    },
    removeHoverStyle: function(e) {
      i.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.trapezium);
    }
  });
}
let De = Ph;
De = Dh(De);
De = Ch(De);
const Oh = De;
export {
  Oh as default
};
