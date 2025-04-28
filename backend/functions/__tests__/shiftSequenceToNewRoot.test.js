// __tests__/shiftSequenceToNewRoot.test.js

const shiftSequenceToNewRoot = require('../services/components/shiftSequenceToNewRoot');

describe('shiftSequenceToNewRoot', () => {
  test.each([
    [
      'simple C major triad to D',
      [
        { baseNote: 'C', chordType: '' },
        { baseNote: 'F', chordType: '' },
        { baseNote: 'G', chordType: '' },
      ],
      'D',
      ['D', 'G', 'A'],
    ],
    [
      'minor progression C minor to E',
      [
        { baseNote: 'C', chordType: 'm' },
        { baseNote: 'G', chordType: '' },
        { baseNote: 'A', chordType: 'm' },
        { baseNote: 'F', chordType: '' },
      ],
      'E',
      ['Em', 'B', 'C#m', 'A'], // 🛠 Исправлено C#m вместо Dm
    ],
    [
      'progression with accidentals: C - E - G# to D',
      [
        { baseNote: 'C', chordType: '' },
        { baseNote: 'E', chordType: '' },
        { baseNote: 'G#', chordType: '' },
      ],
      'D',
      ['D', 'F#', 'A#'],
    ],
  ])('%s', (_desc, input, newRoot, expected) => {
    expect(shiftSequenceToNewRoot(input, newRoot)).toEqual(expected);
  });

  test('throws error on invalid newRoot', () => {
    expect(() =>
      shiftSequenceToNewRoot([{ baseNote: 'C', chordType: '' }], 'H')
    ).toThrow('Invalid newRoot: H');
  });
});
