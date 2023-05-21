// INSPIRATION: https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/

export type NotEmptyString<Str> = Str extends '' ? never : Str;

export type TrimLeft<Str, Spacer extends string = ' '> = Str extends `${Spacer}${infer Part}`
  ? TrimLeft<Part, Spacer>
  : Str;

export type TrimRight<Str, Spacer extends string = ' '> = Str extends `${infer Part}${Spacer}`
  ? TrimRight<Part, Spacer>
  : Str;

export type Trim<Str> = TrimLeft<TrimRight<Str>>;

export type Split<
  Str,
  Spacer extends string = '\n',
  A extends string[] = []
> = Str extends `${infer PartA}${Spacer}${infer PartB}`
  ? Split<Trim<PartB>, Spacer, [...A, Trim<PartA>]>
  : [...A, Trim<Str>];

export type Unique<T extends string[]> = NotEmptyString<T[number]>;

// type notEmpty<A extends unknown[]> = A['length'] extends 0 ? false : true;
// type arr = notEmpty<[]>;
