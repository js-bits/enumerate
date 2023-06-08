/* eslint-disable import/extensions */
import type { Add } from '@js-bits/typedef-utils/math';

type AlphaCodes = {
  a: 12;
  b: 24;
  c: 36;
  d: 48;
  e: 60;
  f: 72;
  g: 84;
  h: 96;
  i: 108;
  j: 120;
  k: 132;
  l: 144;
  m: 156;
  n: 168;
  o: 180;
  p: 192;
  q: 204;
  r: 216;
  s: 228;
  t: 240;
  u: 252;
  v: 264;
  w: 276;
  x: 288;
  y: 300;
  z: 312;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Dictionary<Str extends string> = Lowercase<Str> extends `${infer Char extends keyof AlphaCodes}${infer S}`
  ? AlphaCodes[Char]
  : 0;

export type Randomizer<Keys extends string[], Value extends number = 0, I extends number = 0> = Keys['length'] extends 0
  ? Value
  : I extends 3
  ? Value
  : Keys extends [infer Key extends string, ...infer Rest extends string[]]
  ? Randomizer<Rest, Add<Value, Dictionary<Key>>, Add<I, 1>>
  : never;
