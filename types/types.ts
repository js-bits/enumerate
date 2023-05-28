/* eslint-disable @typescript-eslint/no-unused-vars */
import Split = StringUtils.Split;
import Unique = StringUtils.Unique;
import ParseInt = MathUtils.Parse;

type EnumValues<Str extends string, NoEmpty extends boolean = true> = Str extends `${infer Left}\n${infer Right}`
  ? StringUtils.Split<Str, '\n', NoEmpty>
  : Split<Str, ' ', NoEmpty>;

type EnumKeys<Values extends string[]> = Unique<Values>;

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
