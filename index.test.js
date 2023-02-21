import enumerate from './index.js';

const { LowerCase, UpperCase, Prefix, Increment } = enumerate;

describe(`enumerate`, () => {
  const Episode = enumerate`
    NEW_HOPE
    EMPIRE
    JEDI
    `;
  test('should return an object with specified keys', () => {
    expect(Episode).toHaveProperty('NEW_HOPE');
    expect(Episode).toHaveProperty('EMPIRE');
    expect(Episode).toHaveProperty('JEDI');
    expect(Object.keys(Episode).length).toEqual(3);
    expect(Object.keys(Episode)).toContain('NEW_HOPE');
    expect(Object.keys(Episode)).toContain('EMPIRE');
    expect(Object.keys(Episode)).toContain('JEDI');
  });

  test('typeof', () => {
    expect(typeof Episode).toEqual('object');
  });

  test('toString', () => {
    expect(`${Episode}`).toEqual('[object Enum:NEW_HOPE,EMPIRE,JEDI]');
  });

  test('type names', () => {
    expect(LowerCase.name).toEqual('LowerCase');
    expect(UpperCase.name).toEqual('UpperCase');
    expect(Increment.name).toEqual('Increment');
  });

  test('enum type', () => {
    const enumType = Increment(10);
    expect(enumType).toHaveProperty('args', [10]);
    expect(enumType).toHaveProperty('type', Increment);
    expect(String(enumType)).toEqual('[object Increment]');
  });

  describe('return object keys', () => {
    test('should have unique values', () => {
      const { NEW_HOPE, EMPIRE, JEDI } = Episode;
      expect(NEW_HOPE).not.toBe(EMPIRE);
      expect(NEW_HOPE).not.toBe(JEDI);
      expect(EMPIRE).not.toBe(JEDI);

      expect(NEW_HOPE).not.toEqual(EMPIRE);
      expect(NEW_HOPE).not.toEqual(JEDI);
      expect(EMPIRE).not.toEqual(JEDI);
    });

    test('should have values unique globally', () => {
      const Unit1 = enumerate(Symbol)`FOOT, METER`;
      const Unit2 = enumerate`FOOT, METER`;
      expect(Unit1.FOOT).not.toBe(Unit2.FOOT);
      expect(Unit1.METER).not.toBe(Unit2.METER);

      expect(Unit1.FOOT).not.toEqual(Unit2.FOOT);
      expect(Unit1.METER).not.toEqual(Unit2.METER);

      expect(`${Unit1}`).toEqual('[object Enum:FOOT,METER]');
    });
  });

  describe('Symbol converter', () => {
    const Enum = enumerate(Symbol)`OPTION1 OPTION2 OPTION3`;

    describe('return object keys', () => {
      test('should have corresponding symbol values', () => {
        expect(Object.keys(Enum).length).toEqual(3);
        expect(typeof Enum.OPTION1).toEqual('symbol');
        expect(Enum.OPTION1).not.toBe(Symbol.for('OPTION1'));
        expect(typeof Enum.OPTION2).toEqual('symbol');
        expect(Enum.OPTION2).not.toBe(Symbol.for('OPTION2'));
        expect(typeof Enum.OPTION3).toEqual('symbol');
        expect(Enum.OPTION3).not.toBe(Symbol.for('OPTION3'));

        expect(`${Enum}`).toEqual('[object Enum:OPTION1,OPTION2,OPTION3]');
      });
    });

    test('toJSON', () => {
      expect(() => JSON.stringify(Enum)).toThrow('Cannot convert enum to JSON');
    });
  });

  describe('Symbol.for converter', () => {
    const Enum = enumerate(Symbol.for)`OPTION1 OPTION2 OPTION3`;

    describe('return object keys', () => {
      test('should have corresponding symbol values', () => {
        expect(Object.keys(Enum).length).toEqual(3);
        expect(typeof Enum.OPTION1).toEqual('symbol');
        expect(Enum.OPTION1).toBe(Symbol.for('OPTION1'));
        expect(typeof Enum.OPTION2).toEqual('symbol');
        expect(Enum.OPTION2).toBe(Symbol.for('OPTION2'));
        expect(typeof Enum.OPTION3).toEqual('symbol');
        expect(Enum.OPTION3).toBe(Symbol.for('OPTION3'));

        expect(`${Enum}`).toEqual('[object Enum:OPTION1,OPTION2,OPTION3]');
      });
    });

    test('toJSON', () => {
      expect(() => JSON.stringify(Enum)).toThrow('Cannot convert enum to JSON');
    });
  });

  describe('Number converter', () => {
    const Enum = enumerate(Number)`ZERO ONE TWO THREE`;

    describe('return object keys', () => {
      test('should have incrementing number values', () => {
        expect({ ...Enum }).toEqual({
          ZERO: 0,
          ONE: 1,
          TWO: 2,
          THREE: 3,
        });
        expect(`${Enum}`).toEqual('[object Enum:ZERO,ONE,TWO,THREE]');
      });
    });

    test('toJSON', () => {
      expect(JSON.stringify(Enum)).toEqual('{"ZERO":0,"ONE":1,"TWO":2,"THREE":3}');
    });
  });

  describe('String converter', () => {
    const Enum = enumerate(String)`A B C D`;

    describe('return object keys', () => {
      test('should have corresponding string values', () => {
        expect({ ...Enum }).toEqual({
          A: 'A',
          B: 'B',
          C: 'C',
          D: 'D',
        });
        expect(`${Enum}`).toEqual('[object Enum:A,B,C,D]');
      });
    });

    test('toJSON', () => {
      expect(JSON.stringify(Enum)).toEqual('{"A":"A","B":"B","C":"C","D":"D"}');
    });
  });

  describe('LowerCase converter', () => {
    describe('return object keys', () => {
      test('should have lower-cased string values', () => {
        const Enum = enumerate(LowerCase)`CODE_A CODE_B CODE_C CODE_D`;
        expect({ ...Enum }).toEqual({
          CODE_A: 'code_a',
          CODE_B: 'code_b',
          CODE_C: 'code_c',
          CODE_D: 'code_d',
        });
        expect(`${Enum}`).toEqual('[object Enum:CODE_A,CODE_B,CODE_C,CODE_D]');
      });
    });
  });

  describe('UpperCase converter', () => {
    describe('return object keys', () => {
      test('should have upper-cased string values', () => {
        const Enum = enumerate(UpperCase)`code_a code_b code_c code_d`;
        expect({ ...Enum }).toEqual({
          code_a: 'CODE_A',
          code_b: 'CODE_B',
          code_c: 'CODE_C',
          code_d: 'CODE_D',
        });
        expect(`${Enum}`).toEqual('[object Enum:code_a,code_b,code_c,code_d]');
      });
    });
  });

  describe('Prefix converter', () => {
    describe('return object keys', () => {
      describe('when no arguments passed', () => {
        test('should have corresponding string values', () => {
          const Enum = enumerate(Prefix)`A B C D`;
          expect({ ...Enum }).toEqual({
            A: 'A',
            B: 'B',
            C: 'C',
            D: 'D',
          });
          expect(`${Enum}`).toEqual('[object Enum:A,B,C,D]');
        });
      });

      describe('when arguments passed', () => {
        test('should have prefixed string values', () => {
          const Enum = enumerate(Prefix('value|'))`a b c d`;
          expect({ ...Enum }).toEqual({
            a: 'value|a',
            b: 'value|b',
            c: 'value|c',
            d: 'value|d',
          });
          expect(`${Enum}`).toEqual('[object Enum:a,b,c,d]');
        });
      });

      describe('when shortcut used', () => {
        test('should have prefixed string values', () => {
          const Enum = enumerate('value|')`a b c d`;
          expect({ ...Enum }).toEqual({
            a: 'value|a',
            b: 'value|b',
            c: 'value|c',
            d: 'value|d',
          });
          expect(`${Enum}`).toEqual('[object Enum:a,b,c,d]');
        });
      });
    });
  });

  describe('Increment converter', () => {
    describe('return object keys', () => {
      describe('when no arguments passed', () => {
        test('should have incremented by 1 values', () => {
          const Enum = enumerate(Increment())`A B C D`;
          expect({ ...Enum }).toEqual({
            A: 1,
            B: 2,
            C: 3,
            D: 4,
          });
          expect(`${Enum}`).toEqual('[object Enum:A,B,C,D]');
        });
      });

      describe('when one argument is passed', () => {
        test('should have incremented by specified number values', () => {
          const Enum = enumerate(Increment(10))`A B C D`;
          expect({ ...Enum }).toEqual({
            A: 10,
            B: 20,
            C: 30,
            D: 40,
          });
          expect(`${Enum}`).toEqual('[object Enum:A,B,C,D]');
        });
      });

      describe('when shortcut is used', () => {
        test('should have incremented by specified number values', () => {
          const Enum = enumerate(10)`A B C D`;
          expect({ ...Enum }).toEqual({
            A: 10,
            B: 20,
            C: 30,
            D: 40,
          });
          expect(`${Enum}`).toEqual('[object Enum:A,B,C,D]');
        });
      });

      describe('when two argument is passed', () => {
        test('should have incremented by a specified number values, starting from a specified number', () => {
          const Enum = enumerate(Increment(100, 199))`A B C D`;
          expect({ ...Enum }).toEqual({
            A: 199,
            B: 299,
            C: 399,
            D: 499,
          });
          expect(`${Enum}`).toEqual('[object Enum:A,B,C,D]');
        });
      });
    });
  });

  describe('custom converter', () => {
    describe('return object keys', () => {
      test('should have generated values', () => {
        const enumerateTens = enumerate((acc, item) => {
          acc[item] = Object.keys(acc).length * 10;
          return acc;
        });
        const Enum = enumerateTens`CODE1 CODE2 CODE3`;
        expect({ ...Enum }).toEqual({
          CODE1: 0,
          CODE2: 10,
          CODE3: 20,
        });
        expect(`${Enum}`).toEqual('[object Enum:CODE1,CODE2,CODE3]');
      });
    });

    test('should have generated values', () => {
      const enumerateUpperCase = enumerate((acc, item) => {
        acc[item.toUpperCase()] = item;
        return acc;
      });
      const Enum = enumerateUpperCase`red green blue`;
      expect({ ...Enum }).toEqual({
        RED: 'red',
        GREEN: 'green',
        BLUE: 'blue',
      });
      expect(`${Enum}`).toEqual('[object Enum:RED,GREEN,BLUE]');
    });
  });

  describe('when template string contains placeholders', () => {
    test('should throw an error', () => {
      expect(() => enumerate`XXX ${'YYY'} ZZZ`).toThrow('Invalid');
      expect(() => enumerate`1 ${'2'} 3 ${'4'}`).toThrow('Invalid');
    });
  });

  describe('when invalid type or converter passed', () => {
    test('should throw an error', () => {
      expect(() => enumerate(Date)`A B C`).toThrow('Invalid');
      expect(() => enumerate(Boolean)`A B C`).toThrow('Invalid');
      expect(() => enumerate({})`a b c`).toThrow('Invalid');
    });
  });

  describe('when invalid arguments passed', () => {
    test('should throw an error', () => {
      expect(() => enumerate(String, Number)).toThrow('Invalid');
    });
  });

  describe('when a new key is assigned to the return object', () => {
    test('should throw an error', () => {
      const result = enumerate`A B C`;
      expect(() => {
        result.D = 'D';
      }).toThrow('Cannot assign a value to enum key: D');
    });
  });

  describe('when an unknown key is accessed from the return object', () => {
    test('should throw an error', () => {
      const result = enumerate`A B C`;
      expect(() => {
        const { D } = result;
      }).toThrow('Invalid enum key: D');
    });
  });

  describe('.isEnum', () => {
    test('should not expose global symbol flag', () => {
      expect(Episode[Symbol.for('@js-bits/enumerate')]).toEqual(true);
      const symbols = Object.getOwnPropertySymbols(Episode);
      expect(symbols).toEqual(expect.any(Array));
      expect(symbols.length).toEqual(0);
    });

    test('should return true for an enum object', () => {
      expect(enumerate.isEnum(enumerate`A B C`)).toBe(true);
      expect(enumerate.isEnum(enumerate(String)`A B C`)).toBe(true);
      expect(enumerate.isEnum(enumerate(Number)`A B C`)).toBe(true);
    });

    test('should return false otherwise', () => {
      expect(enumerate.isEnum()).toBe(false);
      expect(enumerate.isEnum(null)).toBe(false);
      expect(enumerate.isEnum(123)).toBe(false);
      expect(enumerate.isEnum('str')).toBe(false);
      expect(enumerate.isEnum(true)).toBe(false);
      expect(enumerate.isEnum(Date)).toBe(false);
      expect(enumerate.isEnum({})).toBe(false);
    });

    test('should return false when accessing properties of the value throws an error', () => {
      const object = Object.defineProperty({}, Symbol.for('@js-bits/enumerate'), {
        enumerable: false,
        configurable: false,
        get() {
          throw new Error('Not accessible');
        },
      });
      expect(enumerate.isEnum(object)).toBe(false);
    });
  });

  describe('Custom separator', () => {
    describe('Symbol converter', () => {
      const Enum = enumerate(/\s*\n\s*/)`
        value one
        value two
        value three
      `;

      describe('return object keys', () => {
        test('should have corresponding symbol values', () => {
          expect(Object.keys(Enum).length).toEqual(3);
          expect(typeof Enum['value one']).toEqual('symbol');
          expect(Enum['value one']).not.toBe(Symbol.for('value one'));
          expect(typeof Enum['value two']).toEqual('symbol');
          expect(Enum['value two']).not.toBe(Symbol.for('value two'));
          expect(typeof Enum['value three']).toEqual('symbol');
          expect(Enum['value three']).not.toBe(Symbol.for('OPTION3'));

          expect(`${Enum}`).toEqual('[object Enum:value one,value two,value three]');
        });
      });

      test('toJSON', () => {
        expect(() => JSON.stringify(Enum)).toThrow('Cannot convert enum to JSON');
      });
    });

    describe('String converter', () => {
      const Enum = enumerate(String, /\s*\n\s*/)`
      value one
      value two
      value three
    `;

      describe('return object keys', () => {
        test('should have corresponding string values', () => {
          expect({ ...Enum }).toEqual({
            'value one': 'value one',
            'value two': 'value two',
            'value three': 'value three',
          });
          expect(`${Enum}`).toEqual('[object Enum:value one,value two,value three]');
        });
      });

      test('toJSON', () => {
        expect(JSON.stringify(Enum)).toEqual(
          '{"value one":"value one","value two":"value two","value three":"value three"}'
        );
      });
    });
  });
});
