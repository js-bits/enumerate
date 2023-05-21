import { Trim, Split, Unique } from './string';
import { MULTI_LINE_LIST, SINGLE_LINE_LIST, SINGLE_LINE_LONG_STRING } from './string.data';

let test_trimEmpty: Trim<'     '> = '';
// @ts-expect-error
test_trimEmpty = 'abc';

const test_trimNone: Trim<'option_l0'> = 'option_l0';

const test_trimLeftSingle: Trim<' option_l1'> = 'option_l1';
let test_trimLeftMultiple: Trim<'         option_l2'> = 'option_l2';
// @ts-expect-error
test_trimLeftMultiple = 'option_l3'; // ERROR: Type '"option_l3"' is not assignable to type '"option_l2"'

const test_trimRightSingle: Trim<'option_r1 '> = 'option_r1';
let test_trimRightMutliple: Trim<'option_r2         '> = 'option_r2';
// @ts-expect-error
test_trimRightMutliple = 'option_r3'; // ERROR: Type '"option_r3"' is not assignable to type '"option_r2"'

const test_trimCenterSingle: Trim<' option_c1 '> = 'option_c1';
const test_trimCenterMultiplr: Trim<'        option_c2         '> = 'option_c2';

let test_trimSingleLineLimits: Trim<SINGLE_LINE_LONG_STRING> = 'string';
// @ts-expect-error
test_trimSingleLineLimits = 'abc'; // ERROR: Type '"abc"' is not assignable to type '"string"'

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
const test_splitSpace2: Split<' a b c ', ' '> = ['', 'a', 'b', 'c'];

const test_SplitSingleLineLimits21: Split<SINGLE_LINE_LIST, ' '>[10] = 'OPTION011';
// @ts-expect-error
const test_SplitSingleLineLimits22: Split<SINGLE_LINE_LIST, ' '>[10] = 'OPTION010'; // ERROR: Type '"OPTION010"' is not assignable to type '"OPTION011"'.ts(2322)
const test_SplitSingleLineLimits3: Split<SINGLE_LINE_LIST, ' '>[99] = 'OPTION100';
const test_SplitSingleLineLimits4: Split<SINGLE_LINE_LIST, ' '>[998] = 'OPTION999';

const test_SplitMultiLineLimits1: Split<MULTI_LINE_LIST>[0] = '';
const test_SplitMultiLineLimits21: Split<MULTI_LINE_LIST>[10] = 'OPTION010';
// @ts-expect-error
const test_SplitMultiLineLimits22: Split<MULTI_LINE_LIST>[10] = 'OPTION011'; // ERROR: Type '"OPTION011"' is not assignable to type '"OPTION010"'.ts(2322)
const test_SplitMultiLineLimits3: Split<MULTI_LINE_LIST>[100] = 'OPTION100';
const test_SplitMultiLineLimits4: Split<MULTI_LINE_LIST>[998] = 'OPTION998';
const test_SplitMultiLineLimits5: Split<MULTI_LINE_LIST>[999] = '';

const test_SplitUnionLimits1: Unique<Split<MULTI_LINE_LIST>> = 'OPTION010';
const test_SplitUnionLimits2: Unique<Split<MULTI_LINE_LIST>> = 'OPTION998';
// @ts-expect-error
const test_SplitUnionLimits3: Unique<Split<MULTI_LINE_LIST>> = 'OPTION999';
// @ts-expect-error
const test_SplitUnionLimits4: Unique<Split<MULTI_LINE_LIST>> = '';
// @ts-expect-error
const test_SplitUnionLimits5: Unique<Split<SINGLE_LINE_LIST, ' '>> = '';
// @ts-expect-error
const test_SplitUnionLimits6: Unique<Split<SINGLE_LINE_LIST, ' '>> = 'OPTION000';
