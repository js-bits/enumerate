import enumerate from './index.js';

describe('enumerate', () => {
  const Episode = enumerate`NEW_HOPE EMPIRE JEDI`;
  test('should return an object with specified properties', () => {
    expect(Episode).toHaveProperty('NEW_HOPE');
    expect(Episode).toHaveProperty('EMPIRE');
    expect(Episode).toHaveProperty('JEDI');
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
      const Unit1 = enumerate`FOOT, METER`;
      const Unit2 = enumerate`FOOT, METER`;
      expect(Unit1.FOOT).not.toBe(Unit2.FOOT);
      expect(Unit1.METER).not.toBe(Unit2.METER);

      expect(Unit1.FOOT).not.toEqual(Unit2.FOOT);
      expect(Unit1.METER).not.toEqual(Unit2.METER);
    });
  });
});
