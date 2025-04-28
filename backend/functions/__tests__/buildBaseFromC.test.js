const parseProgression = require('../services/components/parseProgression');
const buildBaseFromC = require('../services/components/buildBaseFromC');

describe('buildBaseFromC', () => {
  test.each([
    ['I-ii-iii-IV', [
      { original: 'I', accidental: '', degree: 'I', chordType: '', baseNote: 'C' },
      { original: 'ii', accidental: '', degree: 'ii', chordType: 'm', baseNote: 'D' },
      { original: 'iii', accidental: '', degree: 'iii', chordType: 'm', baseNote: 'E' },
      { original: 'IV', accidental: '', degree: 'IV', chordType: '', baseNote: 'F' },
    ]],
    ['#iv', [
      { original: '#iv', accidental: '#', degree: 'iv', chordType: 'm', baseNote: 'F#' },
    ]],
  ])('parses "%s"', (input, expected) => {
    const parsed = parseProgression(input);
    const result = buildBaseFromC(parsed);
    expect(result).toEqual(expected);
  });

  test('throws error on double accidentals', () => {
    expect(() => {
      const parsed = parseProgression('bIIIbmaj7');
      buildBaseFromC(parsed);
    }).toThrow('Double accidental not allowed');
  });
});
