import { Add, Multiply, ParseInt } from './util/number';
import { Split, Unique } from './util/string';

export type EnumValues<Str extends string, NoEmpty extends boolean = true> = Str extends `${infer Left}\n${infer Right}`
  ? Split<Str, '\n', NoEmpty>
  : Split<Str, ' ', NoEmpty>;

export type EnumKeys<Values extends string[]> = Unique<Values>;

type FunctionType<Key extends string> = {
  readonly name: Key;
  <Str>(value: Str): Key extends 'Prefix' ? (Str extends string ? Str : void) : void;
};
type LowerCase = FunctionType<'LowerCase'>;
type UpperCase = FunctionType<'UpperCase'>;
type Prefix = FunctionType<'Prefix'>;
type Modifier =
  | SymbolConstructor
  | StringConstructor
  | NumberConstructor
  | FunctionConstructor
  | string
  | number
  | LowerCase
  | UpperCase
  | Prefix;
type SymbolValue<Type extends Modifier> = Type extends SymbolConstructor ? Symbol : never;
type NumberValue<
  Type extends Modifier,
  Key extends string,
  Values extends string[],
  Map extends EnumMapable = EnumMap<ArrayToUnion<EnumEntries<Values>>>
> = Type extends NumberConstructor ? Map[Key] : Type extends number ? Add<Type, Multiply<Map[Key], Type>> : never;
type StringValue<Type extends Modifier, Key extends string> = Type extends StringConstructor
  ? Key
  : Type extends string
  ? `${Type}${Key}`
  : never;

type FunctionValue<Type extends Modifier, Key extends string> = Type extends FunctionConstructor
  ? FunctionType<Key>
  : Type extends LowerCase
  ? Lowercase<Key>
  : Type extends UpperCase
  ? Uppercase<Key>
  : never;

export type EnumValues2<Type extends Modifier, Key extends string, Values extends string[]> =
  | SymbolValue<Type>
  | StringValue<Type, Key>
  | NumberValue<Type, Key, Values>
  | FunctionValue<Type, Key>;

export type EnumEntries<Values> = {
  [Index in keyof Values]: [Values[Index], ParseInt<Index>];
};

export type EnumMap<Entries extends [string, number]> = {
  [Entry in Entries as Entry[0]]: Entry[1];
};

export type ArrayToUnion<T extends any[]> = T[number];

type n = ArrayToUnion<[['a', 0], ['b', 1]]>;
type z = EnumMap<ArrayToUnion<EnumEntries<EnumValues<' a b b c '>>>>;
type IndexOf<I extends keyof z> = z[I];
type yyy = IndexOf<'c'>;

type rrr = ['a', 'b'];
type R<N extends number> = rrr[N];

type rr = R<1 | 0>;

interface EnumMapable {
  [key: string]: number;
}

export type EnumType<
  Options extends string,
  Type extends Modifier = SymbolConstructor,
  Values extends string[] = EnumValues<Options>
> = {
  [Key in EnumKeys<Values>]: EnumValues2<Type, Key, Values>;
};

export type EnumConstructor = <Options extends string, Type extends Modifier = SymbolConstructor>(
  list: Options,
  type?: Type,
  separator?: RegExp | string
) => EnumType<Options, Type>;

export interface Enumable {
  new (list: String, type: unknown, separator: RegExp | String): boolean;
  toJSON: () => {};
}

class Enum implements Enumable {
  constructor(list: string, type = Symbol, separator: RegExp = /123/): boolean {
    //sdfs
  }
  toJSON: () => {};
}

export type EnumerateFunction = {
  /**
   * Description
   */
  isEnum?: (value: unknown) => boolean;
  ts: EnumConstructor;
  <X extends string>(list: X[], type: object, separator: RegExp | string): EnumType<X>;
  (type: object, separator?: RegExp | string): <X extends string>(s: readonly X[]) => EnumType<X>; // EnumerateFunction<list: string, type: object, separator: RegExp | string>;
};
