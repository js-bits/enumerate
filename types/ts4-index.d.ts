/* eslint-disable import/no-duplicates */
import type { Converter } from './ts4-converters';
import type * as Converters from './ts4-converters';
import type { EnumConstructor, SeparatorType, EnumType } from './ts4-types';

/**
 * Accepts a string containing a list of keys and returns an object with corresponding enumerated properties
 */
declare function Enumerate(list: TemplateStringsArray, ...names: unknown[]): EnumType;
declare function Enumerate<Type extends Converter>(
  type: Type,
  separator?: SeparatorType
): (list: TemplateStringsArray) => EnumType<Type>;
declare function Enumerate(separator?: SeparatorType): (list: TemplateStringsArray) => EnumType;

declare namespace Enumerate {
  /**
   * Type-safe analog of {@link Enumerate | enumerate()} tag function
   */
  export const ts: EnumConstructor;

  /**
   * Check if the given object is a enum or not
   */
  export const isEnum: (value: unknown) => boolean;

  /**
   * Lower casing string converter
   */
  export const LowerCase: Converters.LowerCase;

  /**
   * Upper casing string converter
   */
  export const UpperCase: Converters.UpperCase;

  /**
   * Prefixing string converter
   */
  export const Prefix: Converters.Prefix;

  /**
   * Incremental number converter
   */
  export const Increment: Converters.Increment;
}

export default Enumerate;
