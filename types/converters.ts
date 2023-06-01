/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="typedef-utils" />

import Add = MathUtils.Add;
import Multiply = MathUtils.Multiply;

type ToUnion<T extends unknown[]> = T[number];

type ConverterType<Key extends string> = {
  readonly name: Key;
  <Prefix extends string>(value: Prefix): Key extends 'Prefix' ? Prefix : void;
  <Inc extends number = 1>(inc?: Inc): Key extends 'Increment' ? Inc : void;
  <Inc extends number, Start extends number>(inc: Inc, start: Start): Key extends 'Increment'
    ? {
        start: Start;
        increment: Inc;
      }
    : void;
};

export type LowerCase = ConverterType<'LowerCase'>;
export type UpperCase = ConverterType<'UpperCase'>;
export type Prefix = ConverterType<'Prefix'>;
export type Increment = ConverterType<'Increment'>;

interface IncrementArgs {
  start: number;
  increment: number;
}

type CustomConverter = (acc: object, item: string) => object;

export type Converter =
  | CustomConverter
  | SymbolConstructor
  | SymbolConstructor['for']
  | StringConstructor
  | NumberConstructor
  | FunctionConstructor
  | string
  | number
  | LowerCase
  | UpperCase
  | Prefix
  | IncrementArgs;

export type SymbolValue<Type extends Converter> = Type extends SymbolConstructor
  ? symbol
  : Type extends SymbolConstructor['for']
  ? symbol
  : never;

export type Index<Keys extends string[], Multiplier extends number = 1> = {
  [I in keyof Keys]: [Keys[I], Multiply<I, Multiplier>];
};

export type IndexMap<Entries extends [string, number]> = {
  [Entry in Entries as Entry[0]]: Entry[1];
};

export type NumberValue<
  Type extends Converter,
  Key extends string,
  Keys extends string[],
  Inc extends number = Type extends NumberConstructor
    ? 1
    : Type extends number
    ? Type
    : Type extends IncrementArgs
    ? Type['increment']
    : never,
  // "Type instantiation is excessively deep and possibly infinite" error
  // Workaround https://www.angularfix.com/2022/01/why-am-i-getting-instantiation-is.html
  Map extends { [key: string]: number } = Inc extends number ? IndexMap<ToUnion<Index<Keys, Inc>>> : never
> = Type extends NumberConstructor
  ? Map[Key]
  : Type extends number
  ? Add<Type, Map[Key]>
  : Type extends IncrementArgs
  ? Add<Type['start'], Map[Key]>
  : never;

export type StringValue<Type extends Converter, Key extends string> = Type extends StringConstructor
  ? Key
  : Type extends string
  ? `${Type}${Key}`
  : never;

export type FunctionValue<Type extends Converter, Key extends string> = Type extends FunctionConstructor
  ? ConverterType<Key>
  : Type extends LowerCase
  ? Lowercase<Key>
  : Type extends UpperCase
  ? Uppercase<Key>
  : never;
