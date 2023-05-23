// INSPIRATION: https://itnext.io/implementing-arithmetic-within-typescripts-type-system-a1ef140a6f6f
type Length<T extends any[]> = T extends { length: infer L } ? L : never;

type BuildTuple<L extends number, T extends any[] = []> = T extends { length: L } ? T : BuildTuple<L, [...T, any]>;

export type Increment<Start extends number = 0, Inc extends number = 1> = Length<
  [...BuildTuple<Inc>, ...BuildTuple<Start>]
>;

// https://github.com/microsoft/TypeScript/pull/48094
// requires TypeScript 4.8+
export type ParseInt<T> = T extends `${infer N extends number}` ? N : never

type x = Increment<5>;

type s = '123';
// type n = <>Length<
// [...BuildTuple<Inc>;

// type EnumType<Options extends string[]> = {
//   [Key in keyof Options]: Key;
// };

// type z = EnumType<['1', '2']>;
// z
