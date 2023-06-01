/// <reference types="typedef-utils" />

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
  export const LowerCase: LowerCase;
  export const UpperCase: UpperCase;
  export const Prefix: Prefix;
  export const Increment: Increment;
}

export = Enumerate;
