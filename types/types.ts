/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Split } from '@js-bits/typedef-utils/string';
import type { Converter, FunctionValue, NumberValue, StringValue, SymbolValue } from './converters';

export type SeparatorType = RegExp | string;

export type EnumKeys<Str extends string, NoEmpty extends boolean = true> = Str extends `${infer L}\n${infer R}`
  ? Split<Str, '\n', NoEmpty>
  : Str extends `${infer L},${infer R}`
  ? Split<Str, ',', NoEmpty>
  : Split<Str, ' ', NoEmpty>;

type EnumValues<Type extends Converter, Key extends string, I extends number, Keys extends string[]> =
  | SymbolValue<Type, Key, I, Keys>
  | StringValue<Type, Key>
  | NumberValue<Type, I>
  | FunctionValue<Type, Key>;

export type EnumType<
  Options extends string,
  Type extends Converter = SymbolConstructor,
  Keys extends string[] = EnumKeys<Options>
> = {
  readonly [Key in keyof Keys as Key extends `${infer I extends number}`
    ? Keys[I]
    : never]: Key extends `${infer I extends number}` ? EnumValues<Type, Keys[Key], I, Keys> : never;
} & { readonly [key: symbol]: boolean };

export type EnumConstructor = <Options extends string, Type extends Converter = SymbolConstructor>(
  list: Options,
  type?: Type,
  separator?: RegExp | string
) => EnumType<Options, Type>;
