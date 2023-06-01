/* eslint-disable import/no-duplicates */
import type { Converter } from './types/converters';
import type * as Converters from './types/converters';
import type { EnumConstructor, SeparatorType } from './types/types';

type EnumKeyType = string | symbol;
type EnumValueType = string | symbol | number;

declare function Enumerate(list: TemplateStringsArray, ...names: unknown[]): { [key: EnumKeyType]: EnumValueType };
declare function Enumerate(
  type: Converter,
  separator?: SeparatorType
): (list: TemplateStringsArray) => { [key: EnumKeyType]: EnumValueType };
declare function Enumerate(
  separator?: SeparatorType
): (list: TemplateStringsArray) => { [key: EnumKeyType]: EnumValueType };

declare namespace Enumerate {
  export const ts: EnumConstructor;
  export const isEnum: (value: unknown) => boolean;
  export const LowerCase: Converters.LowerCase;
  export const UpperCase: Converters.UpperCase;
  export const Prefix: Converters.Prefix;
  export const Increment: Converters.Increment;
}

export = Enumerate;
