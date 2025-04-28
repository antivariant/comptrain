const formatSequence = require('../services/components/formatSequence');

describe('formatSequence', () => {
  test('formats sequence as array (default)', () => {
    const sequence = [
      { baseNote: 'C', chordType: '' },
      { baseNote: 'G', chordType: '' },
      { baseNote: 'Am', chordType: '' },
      { baseNote: 'F', chordType: '' },
    ];
    expect(formatSequence(sequence)).toEqual(['C', 'G', 'Am', 'F']);
  });

  test('formats sequence with "-" joiner', () => {
    const sequence = [
      { baseNote: 'C', chordType: '' },
      { baseNote: 'G', chordType: '' },
      { baseNote: 'Am', chordType: '' },
      { baseNote: 'F', chordType: '' },
    ];
    expect(formatSequence(sequence, { joiner: '-' })).toBe('C-G-Am-F');
  });

  test('formats sequence with " " joiner', () => {
    const sequence = [
      { baseNote: 'C', chordType: '' },
      { baseNote: 'G', chordType: '' },
      { baseNote: 'Am', chordType: '' },
      { baseNote: 'F', chordType: '' },
    ];
    expect(formatSequence(sequence, { joiner: ' ' })).toBe('C G Am F');
  });

  test('formats empty sequence', () => {
    expect(formatSequence([])).toEqual([]);
  });

  test('formats empty sequence with joiner', () => {
    expect(formatSequence([], { joiner: '-' })).toBe('');
  });
});
