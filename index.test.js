import enumerate from './index.js';

const env = typeof window === 'undefined' ? 'node' : 'jsdom';

describe(`enumerate: \u001b[1;36m[${env}]`, () => {
  const Episode = enumerate`
    NEW_HOPE
    EMPIRE
    JEDI
    `;
  test('should return an object with specified properties', () => {
    expect(Episode).toHaveProperty('NEW_HOPE');
    expect(Episode).toHaveProperty('EMPIRE');
    expect(Episode).toHaveProperty('JEDI');
    expect(Object.keys(Episode).length).toEqual(3);
  });

  describe('return object properties', () => {
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

  describe('number converter', () => {
    describe('return object properties', () => {
      test('should have incrementing number values', () => {
        const Enum = enumerate(Number)`ZERO ONE TWO THREE`;
        expect(Enum).toEqual({
          ZERO: 0,
          ONE: 1,
          TWO: 2,
          THREE: 3,
        });
      });
    });
  });

  describe('string converter', () => {
    describe('return object properties', () => {
      test('should have corresponding string values', () => {
        const Enum = enumerate(String)`A B C D`;
        expect(Enum).toEqual({
          A: 'A',
          B: 'B',
          C: 'C',
          D: 'D',
        });
      });
    });
  });

  describe('custom converter', () => {
    describe('return object properties', () => {
      test('should have generated values', () => {
        const enumerateTens = enumerate((acc, item) => {
          acc[item] = Object.keys(acc).length * 10;
          return acc;
        });
        const Enum = enumerateTens`CODE1 CODE2 CODE3`;
        expect(Enum).toEqual({
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
      expect(Enum).toEqual({
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

  describe('when new property is assigned to the return object', () => {
    test('should throw an error', () => {
      const result = enumerate`A B C`;
      expect(() => {
        result.D = 'D';
      }).toThrow();
    });
  });
});
