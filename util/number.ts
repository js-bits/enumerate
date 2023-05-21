// INSPIRATION: https://itnext.io/implementing-arithmetic-within-typescripts-type-system-a1ef140a6f6f
type Length<T extends any[]> = T extends { length: infer L } ? L : never;

type BuildTuple<L extends number, T extends any[] = []> = T extends { length: L } ? T : BuildTuple<L, [...T, any]>;

export type Increment<Start extends number = 0, Inc extends number = 1> = Length<
  [...BuildTuple<Inc>, ...BuildTuple<Start>]
>;

type x = Increment<5>;

type s = '123';
// type n = <>Length<
// [...BuildTuple<Inc>;

// type EnumType<Options extends string[]> = {
//   [Key in keyof Options]: Key;
// };

// type z = EnumType<['1', '2']>;
// z
