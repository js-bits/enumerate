/* eslint-disable @typescript-eslint/no-unused-vars */
import Split = StringUtils.Split;
import Unique = StringUtils.Unique;
import ParseInt = MathUtils.Parse;

type EnumKeys<Str extends string, NoEmpty extends boolean = true> = Str extends `${infer L}\n${infer R}`
  ? Split<Str, '\n', NoEmpty>
  : Split<Str, ' ', NoEmpty>;

type EnumValues<Type extends Modifier, Key extends string, Keys extends string[]> =
  | SymbolValue<Type>
  | StringValue<Type, Key>
  | NumberValue<Type, Key, Keys>
  | FunctionValue<Type, Key>;

type EnumType<
  Options extends string,
  Type extends Modifier = SymbolConstructor,
  Keys extends string[] = EnumKeys<Options>
> = {
  readonly [Key in Unique<Keys>]: EnumValues<Type, Key, Keys>;
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
