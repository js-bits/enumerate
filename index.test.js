import { cyan } from '@js-bits/log-in-color';
import enumerate from './index.js';

const env = cyan(`[${typeof window === 'undefined' ? 'node' : 'jsdom'}]`);

describe(`enumerate: ${env}`, () => {
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
    });
  });

  describe('symbol converter', () => {
    describe('return object keys', () => {
      test('should have corresponding symbol values', () => {
        const Enum = enumerate(Symbol)`OPTION1 OPTION2 OPTION3`;
        expect(Object.keys(Enum).length).toEqual(3);
        expect(typeof Enum.OPTION1).toEqual('symbol');
        expect(Enum.OPTION1).not.toBe(Symbol.for('OPTION1'));
        expect(typeof Enum.OPTION2).toEqual('symbol');
        expect(Enum.OPTION2).not.toBe(Symbol.for('OPTION2'));
        expect(typeof Enum.OPTION3).toEqual('symbol');
        expect(Enum.OPTION3).not.toBe(Symbol.for('OPTION3'));
      });
    });
  });

  describe('symbol.for converter', () => {
    describe('return object keys', () => {
      test('should have corresponding symbol values', () => {
        const Enum = enumerate(Symbol.for)`OPTION1 OPTION2 OPTION3`;
        expect(Object.keys(Enum).length).toEqual(3);
        expect(typeof Enum.OPTION1).toEqual('symbol');
        expect(Enum.OPTION1).toBe(Symbol.for('OPTION1'));
        expect(typeof Enum.OPTION2).toEqual('symbol');
        expect(Enum.OPTION2).toBe(Symbol.for('OPTION2'));
        expect(typeof Enum.OPTION3).toEqual('symbol');
        expect(Enum.OPTION3).toBe(Symbol.for('OPTION3'));
      });
    });
  });

  describe('number converter', () => {
    describe('return object keys', () => {
      test('should have incrementing number values', () => {
        const Enum = enumerate(Number)`ZERO ONE TWO THREE`;
        expect({ ...Enum }).toEqual({
          ZERO: 0,
          ONE: 1,
          TWO: 2,
          THREE: 3,
        });
      });
    });
  });

  describe('string converter', () => {
    describe('return object keys', () => {
      test('should have corresponding string values', () => {
        const Enum = enumerate(String)`A B C D`;
        expect({ ...Enum }).toEqual({
          A: 'A',
          B: 'B',
          C: 'C',
          D: 'D',
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
      expect(() => enumerate(Boolean)`A B C`).toThrow('Invalid');
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
      }).toThrow();
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
});
