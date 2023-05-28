/* eslint-disable import/extensions */
import Split = StringUtils.Split;
import Unique = StringUtils.Unique;
import Add = MathUtils.Add;
import Multiply = MathUtils.Multiply;
import ParseInt = MathUtils.Parse;

type EnumValues<Str extends string, NoEmpty extends boolean = true> = Str extends `${infer Left}\n${infer Right}`
  ? Split<Str, '\n', NoEmpty>
  : Split<Str, ' ', NoEmpty>;

type EnumKeys<Values extends string[]> = Unique<Values>;

type ModifierType<Key extends string> = {
  readonly name: Key;
  <Prefix extends string>(value: Prefix): Key extends 'Prefix' ? Prefix : void;
  <Increment extends number>(inc: Increment): Key extends 'Increment' ? Increment : void;
  <Increment extends number, Start extends number>(inc: Increment, start: Start): Key extends 'Increment'
    ? Increment
    : void;
};
type LowerCase = ModifierType<'LowerCase'>;
type UpperCase = ModifierType<'UpperCase'>;
type Prefix = ModifierType<'Prefix'>;
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
type SymbolValue<Type extends Modifier> = Type extends SymbolConstructor ? symbol : never;
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
  ? ModifierType<Key>
  : Type extends LowerCase
  ? Lowercase<Key>
  : Type extends UpperCase
  ? Uppercase<Key>
  : never;

type EnumValues2<Type extends Modifier, Key extends string, Values extends string[]> =
  | SymbolValue<Type>
  | StringValue<Type, Key>
  | NumberValue<Type, Key, Values>
  | FunctionValue<Type, Key>;

type EnumEntries<Values extends string[]> = {
  [Index in keyof Values]: [Values[Index], ParseInt<Index>];
};

type EnumMap<Entries extends [string, number]> = {
  [Entry in Entries as Entry[0]]: Entry[1];
};

type ArrayToUnion<T extends any[]> = T[number];

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

type EnumType<
  Options extends string,
  Type extends Modifier = SymbolConstructor,
  Values extends string[] = EnumValues<Options>
> = {
  readonly [Key in EnumKeys<Values>]: EnumValues2<Type, Key, Values>;
};

type EnumConstructor = <Options extends string, Type extends Modifier = SymbolConstructor>(
  list: Options,
  type?: Type,
  separator?: RegExp | string
) => EnumType<Options, Type>;

interface Enumable {
  new (list: string, type: unknown, separator: RegExp | string): boolean;
  toJSON: () => object;
}

// class Enum implements Enumable {
//   constructor(list: string, type = Symbol, separator = /123/): boolean {
//     // sdfs
//   }

//   toJSON: () => {};
// }

type EnumerateFunction = {
  /**
   * Description
   */
  isEnum?: (value: unknown) => boolean;
  ts: EnumConstructor;
  <X extends string>(list: X[], type: object, separator: RegExp | string): EnumType<X>;
  (type: object, separator?: RegExp | string): <X extends string>(s: readonly X[]) => EnumType<X>; // EnumerateFunction<list: string, type: object, separator: RegExp | string>;
};
