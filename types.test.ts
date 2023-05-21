import { EnumKeys, EnumType } from './types';
import enumerate from './index';

type SingleLineOptions = EnumKeys<'  OPTION1   OPTION2   OPTION3  '>;
let sl_op: SingleLineOptions;
sl_op = 'OPTION1';
sl_op = 'OPTION2';
sl_op = 'OPTION3';
// @ts-expect-error
sl_op = 'OPTION4'; // ERROR: Type '"OPTION4"' is not assignable to type '"OPTION1" | "OPTION2" | "OPTION3"'. Did you mean '"OPTION1"'?

type MultiLineOptions = EnumKeys<`
  Option1
       Option2
            Option3
`>;
let ml_op: MultiLineOptions;
ml_op = 'Option1';
ml_op = 'Option2';
ml_op = 'Option3';
// @ts-expect-error
ml_op = 'Option4'; // ERROR: Type '"OPTION4"' is not assignable to type '"OPTION1" | "OPTION2" | "OPTION3"'. Did you mean '"OPTION1"'?

type x = EnumKeys<`   OPTION1  OPTION2  OPTION3   `>;
// type st = TrimLeft
type zz = EnumType<
  `
a
b
b
c
c
d
d
d
d
d
d
d
d
d
d
d
d
d
b
c
c
d
d
d
d
d
d
d

d
d
d
d
d
d
b
c
c
d
d
d
d
d
d
d
d
d
d
`,
  NumberConstructor
>;

(z: x) => {
  // z.OPTION1.to;
};



type GetString<Str> = Str extends string ? `${Str}` : never;
type F<T> = T extends string[] ? T[number] : never;
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
type Te = Flatten<[' a b c', 'd f sdf']>;
type YY<T extends string[]> = EnumType<Flatten<T>>;

type ZZ = YY<[' a b c', 'd f sdf']>;

export type Func = <X extends string>(list: readonly X[]) => EnumType<X>;
type Func1 = <X extends string[]>(list: X) => YY<X>;
type Func2 = <X extends TemplateStringsArray>(list: X) => EnumType<X[number]>;
type Func3 = <X extends TemplateStringsArray>(list: X) => GetString<X['raw'][0]>;
let func: Func;
let func1: Func1;
let func2: Func2;
let func3: Func3;

// let x1 = func([`
//   a b c
// `]);
// x1 = '234';
// x1.
// const x2 = func(['a b c', 'x y z']);
// const z1 = func`1 2 3`;
// z1.
// const z2 = func1(['a b c']);
// z2.

const defaultEnum = enumerate.ts('a b c');
defaultEnum.
typeof defaultEnum.a.description === 'string';
// @ts-expect-error
typeof defaultEnum.a.replace === 'function';
typeof defaultEnum.b.description === 'string';

const symbolEnum = enumerate.ts('a b c', Symbol);
typeof symbolEnum.a.description === 'string';
// @ts-expect-error
typeof symbolEnum.a.replace === 'function';
typeof symbolEnum.b.description === 'string';

const stringEnum = enumerate.ts('a b c', String);
stringEnum.a === 'a';
typeof stringEnum.a.charAt === 'function';
// @ts-expect-error
typeof stringEnum.a.description === 'string';
stringEnum.b === 'b';
// @ts-expect-error
stringEnum.c === 'x';

const prefixEnum = enumerate.ts('a b c', 'prefix|');
prefixEnum.a === 'prefix|a';
prefixEnum.b === 'prefix|b';
// @ts-expect-error
prefixEnum.c === 'prefix|x';

const funcEnumLower = enumerate.ts('A B C', enumerate.LowerCase);
funcEnumLower.A === 'a'

const funcEnumUpper = enumerate.ts('a b c', enumerate.UpperCase);
funcEnumUpper.a === 'A'

const funcEnumPrefix = enumerate.ts('a b c', enumerate.Prefix('prefix:'));
funcEnumPrefix.a === 'prefix:a'
