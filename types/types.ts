/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="typedef-utils" />
import type { Converter, FunctionValue, NumberValue, StringValue, SymbolValue } from './converters';

import Split = StringUtils.Split;
import Unique = StringUtils.Unique;

export type SeparatorType = RegExp | string;

export type EnumKeys<Str extends string, NoEmpty extends boolean = true> = Str extends `${infer L}\n${infer R}`
  ? Split<Str, '\n', NoEmpty>
  : Str extends `${infer L},${infer R}`
  ? Split<Str, ',', NoEmpty>
  : Split<Str, ' ', NoEmpty>;

type EnumValues<Type extends Converter, Key extends string, Keys extends string[]> =
  | SymbolValue<Type>
  | StringValue<Type, Key>
  | NumberValue<Type, Key, Keys>
  | FunctionValue<Type, Key>;

export type EnumType<
  Options extends string,
  Type extends Converter = SymbolConstructor,
  Keys extends string[] = EnumKeys<Options>
> = {
  readonly [Key in Unique<Keys>]: EnumValues<Type, Key, Keys>;
};

export type EnumConstructor = <Options extends string, Type extends Converter = SymbolConstructor>(
  list: Options,
  type?: Type,
  separator?: RegExp | string
) => EnumType<Options, Type>;
