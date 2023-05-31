/* eslint-disable @typescript-eslint/no-unused-vars */
import Split = StringUtils.Split;
import Unique = StringUtils.Unique;
import ParseInt = MathUtils.Parse;

type EnumKeys<Str extends string, NoEmpty extends boolean = true> = Str extends `${infer L}\n${infer R}`
  ? Split<Str, '\n', NoEmpty>
  : Str extends `${infer L},${infer R}`
  ? Split<Str, ',', NoEmpty>
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

type EnumerateFunction = {
  /**
   * Description
   */
  isEnum?: (value: unknown) => boolean;
  ts: EnumConstructor;
  <X extends string>(list: X[], type: Modifier, separator: RegExp | string): EnumType<X>;
  (type: Modifier, separator?: RegExp | string): <X extends string>(s: readonly X[]) => EnumType<X>; // EnumerateFunction<list: string, type: object, separator: RegExp | string>;
};
