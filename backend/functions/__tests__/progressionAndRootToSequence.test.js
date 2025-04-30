// File: __tests__/progressionAndRootToSequence.test.js

const progressionAndRootToSequence = require('../services/progressionAndRootToSequence');

describe('progressionAndRootToSequence (integration)', () => {
  test('throws if progression is not a string', () => {
    expect(() => progressionAndRootToSequence(123, 'C')).toThrow();
    expect(() => progressionAndRootToSequence(null, 'C')).toThrow();
  });

  test('throws on invalid progression format', () => {
    expect(() => progressionAndRootToSequence('1-2-3', 'C')).toThrow();
  });

  test('throws if progression contains unsupported degree', () => {
    // validateProgressionString выбрасывает "Invalid degree: IX"
    expect(() => progressionAndRootToSequence('IX-IV', 'C'))
      .toThrow('Invalid degree: IX');
  });

  test('throws if root is not a string', () => {
    expect(() => progressionAndRootToSequence('I-IV-V', 5))
      .toThrow('newRoot must be a string');
    expect(() => progressionAndRootToSequence('I-IV-V', null))
      .toThrow('newRoot must be a string');
  });

  test('throws if root is invalid', () => {
    expect(() => progressionAndRootToSequence('I-IV-V', 'H'))
      .toThrow('Invalid newRoot: H');
  });

  test('correctly processes a simple major progression', () => {
    const result = progressionAndRootToSequence('I-IV-V', 'C');
    expect(result).toEqual(['C', 'F', 'G']);
  });

  test('correctly handles chord types and joiner option', () => {
    // II7 → D7, V → G, Imaj7 → Cmaj7
    const out = progressionAndRootToSequence('II7-V-Imaj7', 'C', { joiner: '|' });
    expect(out).toBe('D7|G|Cmaj7');
  });

  test('single-chord progression returns single element', () => {
    // explicit enharmonic mapping: F# → Gb
    expect(progressionAndRootToSequence('I', 'F#')).toEqual(['Gb']);
  });
});
