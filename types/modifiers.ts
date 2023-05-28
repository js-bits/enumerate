/* eslint-disable @typescript-eslint/no-unused-vars */
import Add = MathUtils.Add;
import Multiply = MathUtils.Multiply;

type ArrayToUnion<T extends unknown[]> = T[number];

type ModifierType<Key extends string> = {
  readonly name: Key;
  <Prefix extends string>(value: Prefix): Key extends 'Prefix' ? Prefix : void;
  <Inc extends number>(inc: Inc): Key extends 'Increment' ? Inc : void;
  <Inc extends number, Start extends number>(inc: Inc, start: Start): Key extends 'Increment'
    ? {
        start: Start;
        increment: Inc;
      }
    : void;
};

type LowerCase = ModifierType<'LowerCase'>;
type UpperCase = ModifierType<'UpperCase'>;
type Prefix = ModifierType<'Prefix'>;

interface Increment {
  start: number;
  increment: number;
}

type Modifier =
  | SymbolConstructor
  | StringConstructor
  | NumberConstructor
  | FunctionConstructor
  | string
  | number
  | LowerCase
  | UpperCase
  | Prefix
  | Increment;

type SymbolValue<Type extends Modifier> = Type extends SymbolConstructor ? symbol : never;

type NumberValue<
  Type extends Modifier,
  Key extends string,
  Values extends string[],
  Map extends EnumMapable = EnumMap<ArrayToUnion<EnumEntries<Values>>>
> = Type extends NumberConstructor
  ? Map[Key]
  : Type extends number
  ? Add<Type, Multiply<Map[Key], Type>>
  : Type extends Increment
  ? Add<Type['start'], Multiply<Map[Key], Type['increment']>>
  : never;

type StringValue<Type extends Modifier, Key extends string> = Type extends StringConstructor
  ? Key
  : Type extends string
  ? `${Type}${Key}`
  : never;

type FunctionValue<Type extends Modifier, Key extends string> = Type extends FunctionConstructor
  ? ModifierType<Key>
  : Type extends LowerCase
  ? Lowercase<Key>
  : Type extends UpperCase
  ? Uppercase<Key>
  : never;
