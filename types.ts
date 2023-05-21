import { Increment } from './util/number';
import { Split, Unique } from './util/string';

export type EnumKeys<Str extends string> = Unique<
  Str extends `${infer Left}\n${infer Right}` ? Split<Str, '\n'> : Split<Str, ' '>
>;

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
  | LowerCase
  | UpperCase
  | Prefix;
type SymbolValue<Type extends Modifier> = Type extends SymbolConstructor ? Symbol : never;
type NumberValue<Type extends Modifier, Index extends number> = Type extends NumberConstructor
  ? Increment<Index>
  : never;
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

export type EnumValues<Type extends Modifier, Key extends string, Index extends number = 0> =
  | SymbolValue<Type>
  | StringValue<Type, Key>
  | NumberValue<Type, Index>
  | FunctionValue<Type, Key>;

export type EnumType<Options extends string, Type extends Modifier = SymbolConstructor> = {
  [Key in EnumKeys<Options>]: EnumValues<Type, Key>;
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
