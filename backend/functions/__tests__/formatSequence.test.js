// File: __tests__/formatSequence.test.js

const formatSequence = require('../services/components/formatSequence');

describe('formatSequence', () => {
  test('formats a sequence into array of strings', () => {
    const sequence = [
      { baseNote: 'C', chordType: '' },
      { baseNote: 'D', chordType: 'm' },
      { baseNote: 'E', chordType: '7' },
    ];
    const result = formatSequence(sequence);
    expect(result).toEqual(['C', 'Dm', 'E7']);
  });

  test('formats a sequence into single string if joiner option is given', () => {
    const sequence = [
      { baseNote: 'C', chordType: '' },
      { baseNote: 'D', chordType: 'm' },
      { baseNote: 'E', chordType: '7' },
    ];
    const result = formatSequence(sequence, { joiner: '|' });
    expect(result).toBe('C|Dm|E7');
  });

  test('handles empty sequence gracefully', () => {
    const sequence = [];
    const result = formatSequence(sequence);
    expect(result).toEqual([]);
  });

  test('handles undefined baseNote and chordType', () => {
    const sequence = [
      { baseNote: undefined, chordType: undefined },
    ];
    const result = formatSequence(sequence);
    expect(result).toEqual(['undefinedundefined']);
  });
});
