// File: __tests__/parseProgression.test.js

const parseProgression = require('../services/components/parseProgression');

describe('parseProgression', () => {
  test('parses simple major progression', () => {
    const result = parseProgression('I-IV-V');
    expect(result).toEqual([
      { original: 'I', accidental: '', degree: 'I', chordType: '' },
      { original: 'IV', accidental: '', degree: 'IV', chordType: '' },
      { original: 'V', accidental: '', degree: 'V', chordType: '' },
    ]);
  });

  test('parses lowercase degrees as minor chords', () => {
    const result = parseProgression('i-ii-iii');
    expect(result).toEqual([
      { original: 'i', accidental: '', degree: 'i', chordType: 'm' },
      { original: 'ii', accidental: '', degree: 'ii', chordType: 'm' },
      { original: 'iii', accidental: '', degree: 'iii', chordType: 'm' },
    ]);
  });

  test('parses alterations before and after degree', () => {
    const result = parseProgression('bIII-IIIb-#IV-IV#');
    expect(result).toEqual([
      { original: 'bIII', accidental: 'b', degree: 'III', chordType: '' },
      { original: 'IIIb', accidental: 'b', degree: 'III', chordType: '' },
      { original: '#IV', accidental: '#', degree: 'IV', chordType: '' },
      { original: 'IV#', accidental: '#', degree: 'IV', chordType: '' },
    ]);
  });

  test('parses chords with types', () => {
    const result = parseProgression('Imaj7-V7-i7');
    expect(result).toEqual([
      { original: 'Imaj7', accidental: '', degree: 'I', chordType: 'maj7' },
      { original: 'V7', accidental: '', degree: 'V', chordType: '7' },
      { original: 'i7', accidental: '', degree: 'i', chordType: '7' },
    ]);
  });

  test('parses complex mixed progression', () => {
    const result = parseProgression('i-bIImaj7-III#-IV-V7-VIb-#VII-IIIbmaj7');
    expect(result).toEqual([
      { original: 'i', accidental: '', degree: 'i', chordType: 'm' },
      { original: 'bIImaj7', accidental: 'b', degree: 'II', chordType: 'maj7' },
      { original: 'III#', accidental: '#', degree: 'III', chordType: '' },
      { original: 'IV', accidental: '', degree: 'IV', chordType: '' },
      { original: 'V7', accidental: '', degree: 'V', chordType: '7' },
      { original: 'VIb', accidental: 'b', degree: 'VI', chordType: '' },
      { original: '#VII', accidental: '#', degree: 'VII', chordType: '' },
      { original: 'IIIbmaj7', accidental: 'b', degree: 'III', chordType: 'maj7' },
    ]);
  });

  test('reconstructs progression with accidental before degree', () => {
    const parsed = parseProgression('bIImaj7');
    const { accidental, degree, chordType, original } = parsed[0];
    expect(`${accidental}${degree}${chordType}`).toBe(original);
  });

  test('reconstructs progression with accidental after degree', () => {
    const parsed = parseProgression('IIbmaj7');
    const { accidental, degree, chordType, original } = parsed[0];
    expect(`${degree}${accidental}${chordType}`).toBe(original);
  });
});
