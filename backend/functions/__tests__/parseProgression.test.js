const parseProgression = require('../services/components/parseProgression');

describe('parseProgression', () => {
  test.each([
    ['I', [{ accidental: '', degree: 'I', chordType: '', original: 'I' }]],
    ['i', [{ accidental: '', degree: 'i', chordType: 'm', original: 'i' }]],
    ['bIII', [{ accidental: 'b', degree: 'III', chordType: '', original: 'bIII' }]],
    ['#IV', [{ accidental: '#', degree: 'IV', chordType: '', original: '#IV' }]],
    ['V7', [{ accidental: '', degree: 'V', chordType: '7', original: 'V7' }]],
    ['ivm7', [{ accidental: '', degree: 'iv', chordType: 'm7', original: 'ivm7' }]],
    ['bVdim', [{ accidental: 'b', degree: 'V', chordType: 'dim', original: 'bVdim' }]],
    ['#i', [{ accidental: '#', degree: 'i', chordType: 'm', original: '#i' }]],
    ['i-bVI-iv', [
      { accidental: '', degree: 'i', chordType: 'm', original: 'i' },
      { accidental: 'b', degree: 'VI', chordType: '', original: 'bVI' },
      { accidental: '', degree: 'iv', chordType: 'm', original: 'iv' },
    ]],
    ['biiim7-V7-vi', [
      { accidental: 'b', degree: 'iii', chordType: 'm7', original: 'biiim7' },
      { accidental: '', degree: 'V', chordType: '7', original: 'V7' },
      { accidental: '', degree: 'vi', chordType: 'm', original: 'vi' },
    ]],
    ['#IVmaj7-vi', [
      { accidental: '#', degree: 'IV', chordType: 'maj7', original: '#IVmaj7' },
      { accidental: '', degree: 'vi', chordType: 'm', original: 'vi' },
    ]],
  ])('parses "%s"', (input, expected) => {
    expect(parseProgression(input)).toEqual(expected);
  });

  test('throws error on invalid format', () => {
    expect(() => parseProgression('XYZ')).toThrow('Invalid chord format');
  });

  test('throws error on double accidentals', () => {
    expect(() => parseProgression('bIIIbmaj7')).toThrow('Double accidental not allowed');
  });

  test('throws error on unknown chord type', () => {
    expect(() => parseProgression('IVsus4')).toThrow('Unknown chord type');
  });
});
