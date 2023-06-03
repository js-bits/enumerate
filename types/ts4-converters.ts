/* eslint-disable @typescript-eslint/no-unused-vars */

type ConverterType<Name extends string> = {
  readonly name: Name;
  (value: string): Name extends 'Prefix' ? string : void;
  (inc?: number, start?: number): Name extends 'Increment' ? number : void;
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

export type NumberValue<Type extends Converter> = Type extends NumberConstructor
  ? number
  : Type extends number
  ? number
  : Type extends IncrementArgs
  ? number
  : never;

export type StringValue<Type extends Converter> = Type extends StringConstructor
  ? string
  : Type extends string
  ? string
  : never;

export type FunctionValue<Type extends Converter> = Type extends FunctionConstructor
  ? // eslint-disable-next-line @typescript-eslint/ban-types
    Function
  : Type extends LowerCase
  ? string
  : Type extends UpperCase
  ? string
  : never;
