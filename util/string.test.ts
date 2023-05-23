/* eslint-disable @typescript-eslint/no-unused-vars, camelcase */
import { Trim, Split, Unique } from './string.ts';
import { MULTI_LINE_LIST, SINGLE_LINE_LIST, SINGLE_LINE_LONG_STRING } from './string.data.ts';

let test_trimEmpty: Trim<'     '> = '';
// @ts-expect-error Type '"abc"' is not assignable to type '""'
test_trimEmpty = 'abc';

const test_trimNone: Trim<'option_l0'> = 'option_l0';

const test_trimLeftSingle: Trim<' option_l1'> = 'option_l1';
let test_trimLeftMultiple: Trim<'         option_l2'> = 'option_l2';
// @ts-expect-error Type '"option_l3"' is not assignable to type '"option_l2"'
test_trimLeftMultiple = 'option_l3';

const test_trimRightSingle: Trim<'option_r1 '> = 'option_r1';
let test_trimRightMutliple: Trim<'option_r2         '> = 'option_r2';
// @ts-expect-error Type '"option_r3"' is not assignable to type '"option_r2"'
test_trimRightMutliple = 'option_r3';

const test_trimCenterSingle: Trim<' option_c1 '> = 'option_c1';
const test_trimCenterMultiplr: Trim<'        option_c2         '> = 'option_c2';

let test_trimSingleLineLimits: Trim<SINGLE_LINE_LONG_STRING> = 'string';
// @ts-expect-error Type '"abc"' is not assignable to type '"string"'
test_trimSingleLineLimits = 'abc';

const test_splitNoneSpace: Split<'a b c'> = ['a b c'];
const test_splitNoneNewLine: Split<'a\nb\nc', ' '> = ['a\nb\nc'];

const test_splitNewLine1: Split<'a\nb\nc'> = ['a', 'b', 'c'];
const test_splitNewLine2: Split<'a\nb\nc\n'> = ['a', 'b', 'c', ''];
const test_splitNewLine3: Split<`
  a
  b
  c
`> = ['', 'a', 'b', 'c', ''];

const test_splitSpace1: Split<'a b c', ' '> = ['a', 'b', 'c'];
const test_splitSpace2: Split<'   a b c  ', ' '> = ['', 'a', 'b', 'c'];

const test_splitNoEmpty1: Split<'\na\nb\nc\n', '\n', true> = ['a', 'b', 'c'];
const test_splitNoEmpty2: Split<'   a b c   ', ' ', true> = ['a', 'b', 'c'];

const test_SplitSingleLineLimits21: Split<SINGLE_LINE_LIST, ' '>[10] = 'OPTION011';
// @ts-expect-error Type '"OPTION010"' is not assignable to type '"OPTION011"'
const test_SplitSingleLineLimits22: Split<SINGLE_LINE_LIST, ' '>[10] = 'OPTION010';
const test_SplitSingleLineLimits3: Split<SINGLE_LINE_LIST, ' '>[99] = 'OPTION100';
const test_SplitSingleLineLimits4: Split<SINGLE_LINE_LIST, ' '>[998] = 'OPTION999';

const test_SplitMultiLineLimits1: Split<MULTI_LINE_LIST>[0] = '';
const test_SplitMultiLineLimits21: Split<MULTI_LINE_LIST>[10] = 'OPTION010';
// @ts-expect-error Type '"OPTION011"' is not assignable to type '"OPTION010"'
const test_SplitMultiLineLimits22: Split<MULTI_LINE_LIST>[10] = 'OPTION011';
const test_SplitMultiLineLimits3: Split<MULTI_LINE_LIST>[100] = 'OPTION100';
const test_SplitMultiLineLimits4: Split<MULTI_LINE_LIST>[997] = 'OPTION997';
const test_SplitMultiLineLimits5: Split<MULTI_LINE_LIST>[998] = '';

const test_SplitUnionLimits1: Unique<Split<MULTI_LINE_LIST>> = 'OPTION010';
const test_SplitUnionLimits2: Unique<Split<MULTI_LINE_LIST>> = 'OPTION997';
// @ts-expect-error Type '"OPTION999"' is not assignable to type 'Unique<["", "OPTION001", "OPTION002", ...
const test_SplitUnionLimits3: Unique<Split<MULTI_LINE_LIST>> = 'OPTION999';
// @ts-expect-error Type '""' is not assignable to type 'Unique<["", "OPTION001", "OPTION002", ...
const test_SplitUnionLimits4: Unique<Split<MULTI_LINE_LIST>> = '';
// @ts-expect-error Type '""' is not assignable to type 'Unique<["OPTION001", "OPTION002",
const test_SplitUnionLimits5: Unique<Split<SINGLE_LINE_LIST, ' '>> = '';
// @ts-expect-error Type '"OPTION000"' is not assignable to type 'Unique<["OPTION001", "OPTION002", ...
const test_SplitUnionLimits6: Unique<Split<SINGLE_LINE_LIST, ' '>> = 'OPTION000';
