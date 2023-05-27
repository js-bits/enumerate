/* eslint-disable import/extensions, no-unused-expressions, camelcase */
import { EnumEntries, EnumKeys, EnumMap, EnumType, EnumValues } from './types';
import enumerate from './index';

type xx = EnumValues<'   a b c   '>;
type zzz = EnumEntries<EnumValues<' a b b c '>>;

type zzzz = EnumMap<['a', 0] | ['b', 1]>;

type SingleLineOptions = EnumKeys<EnumValues<'  OPTION1   OPTION2   OPTION3  '>>;
let sl_op: SingleLineOptions;
sl_op = 'OPTION1';
sl_op = 'OPTION2';
sl_op = 'OPTION3';
// @ts-expect-error Type '"OPTION4"' is not assignable to type 'SingleLineOptions'. Did you mean '"OPTION1"'?
sl_op = 'OPTION4';

type MultiLineOptions = EnumKeys<
  EnumValues<`
  Option1
       Option2
            Option3
`>
>;
let ml_op: MultiLineOptions;
ml_op = 'Option1';
ml_op = 'Option2';
ml_op = 'Option3';
// @ts-expect-error Type '"Option4"' is not assignable to type 'MultiLineOptions'. Did you mean '"Option1"'?
ml_op = 'Option4';

type x = EnumKeys<EnumValues<'   OPTION1  OPTION2  OPTION3   '>>;
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
typeof defaultEnum.a.description === 'string';
// @ts-expect-error Property 'replace' does not exist on type 'symbol'
typeof defaultEnum.a.replace === 'function';
typeof defaultEnum.b.description === 'string';

const symbolEnum = enumerate.ts('a b c', Symbol);
typeof symbolEnum.a.description === 'string';
// @ts-expect-error Property 'replace' does not exist on type 'symbol'
typeof symbolEnum.a.replace === 'function';
typeof symbolEnum.b.description === 'string';

const stringEnum = enumerate.ts('a b c', String);
stringEnum.a === 'a';
typeof stringEnum.a.charAt === 'function';
// @ts-expect-error Property 'description' does not exist on type '"a"'
typeof stringEnum.a.description === 'string';
stringEnum.b === 'b';
// @ts-expect-error This comparison appears to be unintentional because the types '"c"' and '"x"' have no overlap.
stringEnum.c === 'x';

const prefixEnum = enumerate.ts('a b c', 'prefix|');
prefixEnum.a === 'prefix|a';
prefixEnum.b === 'prefix|b';
// @ts-expect-error This comparison appears to be unintentional because the types '"prefix|c"' and '"prefix|x"' have no overlap.
prefixEnum.c === 'prefix|x';

const funcEnumLower = enumerate.ts('A B C', enumerate.LowerCase);
funcEnumLower.A === 'a';

const funcEnumUpper = enumerate.ts('a b c', enumerate.UpperCase);
funcEnumUpper.a === 'A';

const funcEnumPrefix = enumerate.ts('a b c', enumerate.Prefix('prefix:'));
funcEnumPrefix.a === 'prefix:a';

const numberEnum1 = enumerate.ts('a b c', Number);
numberEnum1.a === 0;
numberEnum1.b === 1;
numberEnum1.c === 2;
// @ts-expect-error Cannot assign to 'a' because it is a read-only property.
numberEnum1.a = 0;

const numberEnum2 = enumerate.ts('a b c', 9999);
numberEnum2.a === 9999;
numberEnum2.b === 19998;
numberEnum2.c === 29997;
