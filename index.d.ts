/* eslint-disable import/no-duplicates */
import type * as Converters from './types/converters';
import type { EnumConstructor, SeparatorType } from './types/types';
import type { Converter } from './types/ts4-converters'; // TODO: replace with normal converters when #33304 issue is fixed
import type { EnumType } from './types/ts4-types'; // TODO: replace with normal types when #33304 issue is fixed

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
  export const isEnum: (value?: unknown) => boolean;

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
