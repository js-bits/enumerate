/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Converter, FunctionValue, NumberValue, StringValue, SymbolValue } from './ts4-converters';

export type SeparatorType = RegExp | string;

type EnumValues<Type extends Converter> =
  | SymbolValue<Type>
  | StringValue<Type>
  | NumberValue<Type>
  | FunctionValue<Type>;

export type EnumType<Type extends Converter = SymbolConstructor> = {
  readonly [key: string]: EnumValues<Type>;
} & { readonly [key: symbol]: boolean };

export type EnumConstructor = <Type extends Converter = SymbolConstructor>(
  list: string,
  type?: Type,
  separator?: RegExp | string
) => EnumType<Type>;
