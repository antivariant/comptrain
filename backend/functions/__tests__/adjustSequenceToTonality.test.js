// File: __tests__/adjustSequenceToTonality.test.js

const adjustSequenceToTonality = require('../services/adjustSequenceToTonality');

describe('adjustSequenceToTonality', () => {
  test('throws if sequence is not an array', () => {
    expect(() => adjustSequenceToTonality(null)).toThrow('sequence must be an array');
  });

  test('returns empty array for empty sequence', () => {
    expect(adjustSequenceToTonality([], 'C')).toEqual([]);
  });

  test('throws if a sequence step is invalid', () => {
    expect(() => adjustSequenceToTonality([{ chordType:'', degree:'I' }], 'C'))
      .toThrow('Invalid sequence step at index 0');
  });

  test('infers tonality from degree "I" and applies flat-only mapping', () => {
    const seq = [
      { baseNote:'Bb', chordType:'', degree:'I' },
      { baseNote:'D',  chordType:'', degree:'III' }
    ];
    // inferred Bb → flat key → only #→b; D has no "#", stays D
    expect(adjustSequenceToTonality(seq)).toEqual([
      { baseNote:'Bb', chordType:'', degree:'I' },
      { baseNote:'D',  chordType:'', degree:'III' }
    ]);
  });

  test('throws if tonality wrong type when explicit', () => {
    expect(() => adjustSequenceToTonality([{ baseNote:'C', chordType:'', degree:'I'}], 5))
      .toThrow('tonality must be a string');
  });

  test('explicit tonality uses full enharmonic mapping', () => {
    const seq = [
      { baseNote:'C#', chordType:'', degree:'II' },
      { baseNote:'Eb', chordType:'', degree:'III' }
    ];
    // explicit 'C' → both C#→Db and Eb→D#
    expect(adjustSequenceToTonality(seq, 'C')).toEqual([
      { baseNote:'Db', chordType:'', degree:'II' },
      { baseNote:'D#', chordType:'', degree:'III' }
    ]);
    // explicit 'F' → both map: C#→Db, Eb→D#
    expect(adjustSequenceToTonality(seq, 'F')).toEqual([
      { baseNote:'Db', chordType:'', degree:'II' },
      { baseNote:'D#', chordType:'', degree:'III' }
    ]);
  });

  test('leaves naturals unchanged', () => {
    const seq = [
      { baseNote:'G', chordType:'', degree:'V' },
      { baseNote:'A', chordType:'m', degree:'VI' }
    ];
    expect(adjustSequenceToTonality(seq, 'Eb')).toEqual(seq);
    expect(adjustSequenceToTonality(seq, 'C')).toEqual(seq);
  });
});
