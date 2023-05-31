/* eslint-disable @typescript-eslint/no-unused-vars */
import Split = StringUtils.Split;
import Unique = StringUtils.Unique;
import ParseInt = MathUtils.Parse;

type EnumKeys<Str extends string, NoEmpty extends boolean = true> = Str extends `${infer L}\n${infer R}`
  ? Split<Str, '\n', NoEmpty>
  : Str extends `${infer L},${infer R}`
  ? Split<Str, ',', NoEmpty>
  : Split<Str, ' ', NoEmpty>;

type EnumValues<Type extends Converter, Key extends string, Keys extends string[]> =
  | SymbolValue<Type>
  | StringValue<Type, Key>
  | NumberValue<Type, Key, Keys>
  | FunctionValue<Type, Key>;

type EnumType<
  Options extends string,
  Type extends Converter = SymbolConstructor,
  Keys extends string[] = EnumKeys<Options>
> = {
  readonly [Key in Unique<Keys>]: EnumValues<Type, Key, Keys>;
};

type EnumConstructor = <Options extends string, Type extends Converter = SymbolConstructor>(
  list: Options,
  type?: Type,
  separator?: RegExp | string
) => EnumType<Options, Type>;

type EnumKeyType = string | symbol;
type EnumValueType = string | symbol | number;
type SeparatorType = RegExp | string;

type EnumerateFunction = {
  /**
   * Description
   */
  isEnum: (value: unknown) => boolean;
  ts: EnumConstructor;
  (list: TemplateStringsArray, ...names: unknown[]): { [key: EnumKeyType]: EnumValueType };
  (type: Converter, separator?: SeparatorType): (list: TemplateStringsArray) => { [key: EnumKeyType]: EnumValueType };
  (separator?: SeparatorType): (list: TemplateStringsArray) => { [key: EnumKeyType]: EnumValueType };
  LowerCase: LowerCase;
  UpperCase: UpperCase;
  Prefix: Prefix;
  Increment: Increment;
};
