/* eslint-disable import/extensions, @typescript-eslint/no-unused-vars */
import type { Add, Multiply } from '@js-bits/typedef-utils/math';
import { Randomizer } from './disctionary';
import * as UniqueSymbols from './unique-symbols';

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
  | Increment
  | IncrementArgs;

export type Index<Keys extends string[], Multiplier extends number = 1> = {
  [I in keyof Keys]: [Keys[I], Multiply<I, Multiplier>];
};

export type IndexMap<Entries extends [string, number]> = {
  [Entry in Entries as Entry[0]]: Entry[1];
};

type GetSymbol<
  I extends number,
  Keys extends string[],
  RandomValue extends number = Randomizer<Keys>,
  Idx extends number = Add<I, RandomValue>,
  SymbolName extends string = `UNIQUE_SYMBOL${Idx}` extends keyof typeof UniqueSymbols
    ? `UNIQUE_SYMBOL${Idx}`
    : `UNIQUE_SYMBOL${I}`
> = (typeof UniqueSymbols)[SymbolName extends keyof typeof UniqueSymbols ? SymbolName : never];

export type SymbolValue<
  Type extends Converter,
  Key extends string,
  I extends number,
  Keys extends string[],
  RandomValue extends number = Randomizer<Keys>,
  SymbolName extends string = `UNIQUE_SYMBOL${Add<I, RandomValue>}`
> = Type extends SymbolConstructor
  ? GetSymbol<I, Keys>
  : Type extends SymbolConstructor['for']
  ? GetSymbol<I, Keys>
  : never;

export type NumberValue<
  Type extends Converter,
  I extends number,
  Inc extends number = Type extends NumberConstructor
    ? 1
    : Type extends Increment
    ? 1
    : Type extends number
    ? Type
    : Type extends IncrementArgs
    ? Type['increment']
    : never,
  // "Type instantiation is excessively deep and possibly infinite" error
  // Workaround https://www.angularfix.com/2022/01/why-am-i-getting-instantiation-is.html
  Value extends number = I extends number ? (Inc extends 1 ? I : Inc extends number ? Multiply<I, Inc> : never) : never //
> = Type extends NumberConstructor
  ? Value
  : Type extends Increment
  ? Add<1, Value>
  : Type extends number
  ? Add<Type, Value>
  : Type extends IncrementArgs
  ? Add<Type['start'], Value>
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
