// INSPIRATION: https://itnext.io/implementing-arithmetic-within-typescripts-type-system-a1ef140a6f6f

/**
 * Required Typescript 4.8+
 */

// https://github.com/microsoft/TypeScript/pull/48094
// requires TypeScript 4.8+
export type ParseInt<T> = T extends `${infer N extends number}` ? N : never;

type Length<T extends any[]> = T extends { length: infer L } ? L : never;

type Digits = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type Carryings = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
type Units = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
type DigitSums = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  [4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
];
type SplitDigits<Num extends string, A extends Digits[] = []> = Num extends `${infer D extends Digits}${infer X}`
  ? SplitDigits<X, [D, ...A]>
  : A;
type Pad<Num extends string> = `000000000000000000000000${Num}`;
type AddString<
  A extends string,
  B extends string,
  NumA extends Digits[] = SplitDigits<Pad<A>>,
  NumB extends Digits[] = SplitDigits<Pad<B>>
> = {
  [Index in keyof NumA]: SumDigits<NumA[Index], NumB[Index]>;
};

type ToNumber<A extends number[], Result extends string = '', Carrying extends number = 0> = A extends [
  infer D extends number,
  ...infer Rest extends number[]
]
  ? ToNumber<Rest, `${Units[DigitSums[Units[D]][Carrying]]}${Result}`, D extends 9 ? Carrying : Carryings[D]>
  : Result;

type Normalize<Str extends string> = Str extends `0${infer Num}` ? Normalize<Num> : Str;

type Increment<A extends number | string> = ParseInt<
  ToNumber<AddString<`0${A}`, '1', SplitDigits<`${A}`>, ['1', '0', '0', '0', '0', '0', '0']>>
>;

export type Add<A extends string | number, B extends string | number> = ParseInt<
  Normalize<ToNumber<AddString<`${A}`, `${B}`>>>
>;

type III = Increment<1999>;
const II: Add<1999, 1> = 10;

// 4 X 5 = 5 + 5 + 5 + 5
export type Multiply2<
  A extends string | number,
  B extends string | number,
  Result extends string = Pad<'0'>,
  I extends number = 0,
  NumA extends string[] = SplitDigits<Pad<`${A}`>>,
  NumB extends string[] = SplitDigits<Pad<`${B}`>>
> = I extends A
  ? ParseInt<Normalize<Result>>
  : Multiply2<
      A,
      B,
      ToNumber<AddString<Result, `${B}`, SplitDigits<Result>, NumB>>,
      /* Add<I, 1> */ Increment<I>,
      NumA,
      NumB
    >;

export type Multiply<
  A extends string | number,
  B extends string | number,
  Result extends number = 0,
  I extends number = 0,
  X extends number = Add<Result, B>,
  Inc extends number = Add<I, 1>
> = I extends A ? Result : Multiply<A, B, X, Inc>;

type YY = ParseInt<Normalize<ToNumber<AddString<'10', '1', SplitDigits<'19'>, ['1']>>>>;

const tn1: Add<9, 1> = 10;
const tn2: Add<99, 1> = 100;
const tn3: Add<999, 1> = 1000;
const tn4: Add<999, 999> = 1998;
const add: AddString<'99', '1'> = '';
const tnu: ToNumber<AddString<'99', '1'>> = '';
const add1: Add<9, 99999999999> = 100000000008;
const add2: Add<99999999999, 9> = 100000000008;

// A is limited to 999, B is "limitless"
const mu: Multiply<999, 99999999> = 99899999001;
const mu2: Multiply<199, 3> = 597;

// const xxx =199 * 3
// const xx: mu =xxx

type d = SplitDigits<Pad<'012'>>;
// AA extends Digits = A extends unknown ? 0 : A, BB extends Digits = B extends unknown ? 0 : B
type SumDigits<A extends Digits = '0', B extends Digits = '0'> = DigitSums[A extends undefined
  ? '0'
  : A][B extends undefined ? '0' : B];

type ss = SumDigits<'9', '9'>;
