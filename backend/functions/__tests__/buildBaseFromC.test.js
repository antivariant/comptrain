// File: __tests__/buildBaseFromC.test.js

const buildBaseFromC = require('../services/components/buildBaseFromC');

describe('buildBaseFromC', () => {
  test('throws if input is not an array or is empty', () => {
    expect(() => buildBaseFromC(null)).toThrow('Input must be a non-empty array');
    expect(() => buildBaseFromC([])).toThrow('Input must be a non-empty array');
  });

  test('throws if required fields are missing', () => {
    expect(() => buildBaseFromC([{ accidental: '', chordType: '' }]))
      .toThrow('Parsed progression step is missing required fields');
  });

  test('throws if degree is not recognized', () => {
    expect(() => buildBaseFromC([{ degree: 'IX', accidental: '', chordType: '' }]))
      .toThrow('Unknown degree: IX');
  });

  test('adds baseNote and retains degree', () => {
    const input = [{ degree: 'IV', accidental: '', chordType: '' }];
    const expected = [{ baseNote: 'F', chordType: '', degree: 'IV' }];
    expect(buildBaseFromC(input)).toEqual(expected);
  });

  test('adds sharp/flat to note (before or after degree)', () => {
    const input1 = [{ degree: 'III', accidental: 'b', chordType: '' }];
    const input2 = [{ degree: 'III', accidental: '#', chordType: '' }];
    expect(buildBaseFromC(input1)).toEqual([{ baseNote: 'Eb', chordType: '', degree: 'bIII' }]);
    expect(buildBaseFromC(input2)).toEqual([{ baseNote: 'F', chordType: '', degree: '#III' }]);
  });

  test('corrects edge notes (Cb, Fb, B#, E#)', () => {
    const input = [
      { degree: 'I',  accidental: 'b', chordType: '' }, // Cb -> B
      { degree: 'IV', accidental: 'b', chordType: '' }, // Fb -> E
      { degree: 'VII', accidental: '#', chordType: '' }, // B# -> C
      { degree: 'III', accidental: '#', chordType: '' }, // E# -> F
    ];
    const expected = [
      { baseNote: 'B', chordType: '', degree: 'bI' },
      { baseNote: 'E', chordType: '', degree: 'bIV' },
      { baseNote: 'C', chordType: '', degree: '#VII' },
      { baseNote: 'F', chordType: '', degree: '#III' },
    ];
    expect(buildBaseFromC(input)).toEqual(expected);
  });

  test('correctly assigns chordType (major/minor/etc.) and keeps baseNote', () => {
    const input = [
      { degree: 'VI', accidental: '', chordType: 'm' },
      { degree: 'V', accidental: '', chordType: '7' },
      { degree: 'IV', accidental: '', chordType: 'maj7' },
    ];
    const expected = [
      { baseNote: 'A', chordType: 'm', degree: 'VI' },
      { baseNote: 'G', chordType: '7', degree: 'V' },
      { baseNote: 'F', chordType: 'maj7', degree: 'IV' },
    ];
    expect(buildBaseFromC(input)).toEqual(expected);
  });
});
