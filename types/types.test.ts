/* eslint-disable import/extensions, no-unused-expressions, camelcase, @typescript-eslint/no-unused-vars */
import type { EnumKeys, EnumType } from './types';
import enumerate from '../index';
import { Index, IndexMap } from './converters';
import UniqueSymbols from './unique-symbols';

const test_EnumKeys: EnumKeys<'   a b c   '> = ['a', 'b', 'c'];
const test_Index: Index<EnumKeys<' a b b c '>> = [
  ['a', 0],
  ['b', 1],
  ['b', 2],
  ['c', 3],
];
const test_IndexMap: IndexMap<['a', 0] | ['b', 1]> = { a: 0, b: 1 };

const test_EnumKeysSingleLineOptions: EnumKeys<'  OPTION1   OPTION2   OPTION3  '> = ['OPTION1', 'OPTION2', 'OPTION3'];
const test_EnumKeysMultiLineOptions: EnumKeys<`
  Option1
       Option2
            Option3
`> = ['Option1', 'Option2', 'Option3'];

const test_EnumKeysMultiLineIndex: EnumType<'a b b b a a a c c c b b b c c c d d d c', NumberConstructor> = {
  a: 0,
  b: 1,
  c: 7, // TODO: fix this known issue with duplicated keys
  d: 16, // TODO: fix this known issue with duplicated keys
};

const test_DefaultEnum = enumerate.ts('a b c');

typeof test_DefaultEnum.a.description === 'string';
// @ts-expect-error Property 'replace' does not exist on type 'symbol'
typeof test_DefaultEnum.a.replace === 'function';
typeof test_DefaultEnum.b.description === 'string';

const test_SymbolEnum = enumerate.ts('a b c', Symbol);
test_SymbolEnum.a === UniqueSymbols[0];
// @ts-expect-error This comparison appears to be unintentional because the types 'UniqueSymbols.0' and 'UniqueSymbols.1' have no overlap.
test_SymbolEnum.a === UniqueSymbols[1];
const test_ObjectProps = {
  [test_SymbolEnum.a]: 'it works',
  [test_SymbolEnum.b]: 123,
};
// @ts-expect-error Type 'string' is not assignable to type 'number'.
test_ObjectProps[test_SymbolEnum.b] = '';
typeof test_SymbolEnum.a === 'string';
typeof test_SymbolEnum.a.description === 'string';
// @ts-expect-error Property 'replace' does not exist on type 'symbol'
typeof test_SymbolEnum.a.replace === 'function';
typeof test_SymbolEnum.b.description === 'string';

const test_StringEnum = enumerate.ts('a b c', String);
test_StringEnum.a === 'a';
typeof test_StringEnum.a.charAt === 'function';
// @ts-expect-error Property 'description' does not exist on type '"a"'
typeof test_StringEnum.a.description === 'string';
test_StringEnum.b === 'b';
// @ts-expect-error This comparison appears to be unintentional because the types '"c"' and '"x"' have no overlap.
test_StringEnum.c === 'x';

const test_PrefixEnum = enumerate.ts('a b c', 'prefix|');
test_PrefixEnum.a === 'prefix|a';
test_PrefixEnum.b === 'prefix|b';
// @ts-expect-error This comparison appears to be unintentional because the types '"prefix|c"' and '"prefix|x"' have no overlap.
test_PrefixEnum.c === 'prefix|x';

const test_FuncEnumLower = enumerate.ts('A B C', enumerate.LowerCase);
test_FuncEnumLower.A === 'a';

const test_FuncEnumUpper = enumerate.ts('a b c', enumerate.UpperCase);
test_FuncEnumUpper.a === 'A';

const test_FuncEnumPrefix = enumerate.ts('a b c', enumerate.Prefix('prefix:'));
test_FuncEnumPrefix.a === 'prefix:a';

const test_NumberEnum1 = enumerate.ts('a b c', Number);
test_NumberEnum1.a === 0;
test_NumberEnum1.b === 1;
test_NumberEnum1.c === 2;
// @ts-expect-error Cannot assign to 'a' because it is a read-only property.
test_NumberEnum1.a = 0;

const test_NumberEnum2 = enumerate.ts('a b c', 9999);
test_NumberEnum2.a === 9999;
test_NumberEnum2.b === 19998;
test_NumberEnum2.c === 29997;

const test_NumberEnum3 = enumerate.ts('a b c', enumerate.Increment(10));
test_NumberEnum3.a === 10;
test_NumberEnum3.b === 20;
test_NumberEnum3.c === 30;

const test_NumberEnum4 = enumerate.ts('a b c', enumerate.Increment(10, 50));
test_NumberEnum4.a === 50;
test_NumberEnum4.b === 60;
test_NumberEnum4.c === 70;
