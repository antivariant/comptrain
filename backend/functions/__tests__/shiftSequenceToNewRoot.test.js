// File: __tests__/shiftSequenceToNewRoot.test.js

const shiftSequenceToNewRoot = require('../services/components/shiftSequenceToNewRoot');

describe('shiftSequenceToNewRoot', () => {
  test('throws if baseSequence is not an array or is empty', () => {
    expect(() => shiftSequenceToNewRoot(null, 'C')).toThrow('baseSequence must be a non-empty array');
    expect(() => shiftSequenceToNewRoot([], 'C')).toThrow('baseSequence must be a non-empty array');
  });

  test('throws if newRoot is not a string', () => {
    const seq = [{ baseNote: 'C', chordType: '', degree: 'I' }];
    expect(() => shiftSequenceToNewRoot(seq, 5)).toThrow('newRoot must be a string');
    expect(() => shiftSequenceToNewRoot(seq, null)).toThrow('newRoot must be a string');
  });

  test('throws if newRoot is invalid', () => {
    const seq = [{ baseNote: 'C', chordType: '', degree: 'I' }];
    expect(() => shiftSequenceToNewRoot(seq, 'H')).toThrow('Invalid newRoot: H');
  });

  test('throws if a step is missing required fields or wrong type', () => {
    const seq1 = [{ chordType: '', degree: 'I' }];
    expect(() => shiftSequenceToNewRoot(seq1, 'C')).toThrow('Each step must have string fields baseNote, chordType and degree');

    const seq2 = [{ baseNote: 'C', chordType: '', degree: 1 }];
    expect(() => shiftSequenceToNewRoot(seq2, 'C')).toThrow('Each step must have string fields baseNote, chordType and degree');
  });

  test('throws if a baseNote is invalid', () => {
    const seq = [
      { baseNote: 'C', chordType: '', degree: 'I' },
      { baseNote: 'H#', chordType: '', degree: 'II' }
    ];
    expect(() => shiftSequenceToNewRoot(seq, 'C')).toThrow('Invalid baseNote in sequence: H#');
  });

  test('transposes a simple C major I to D major I', () => {
    const seq = [{ baseNote: 'C', chordType: '', degree: 'I' }];
    expect(shiftSequenceToNewRoot(seq, 'D')).toEqual([{ chord: 'D', degree: 'I' }]);
  });

  test('shifts all steps by the same interval and keeps degree', () => {
    const seq = [
      { baseNote: 'C', chordType: 'maj7', degree: 'I' },
      { baseNote: 'E', chordType: 'm',    degree: 'III' },
      { baseNote: 'G', chordType: '7',    degree: 'V' }
    ];
    expect(shiftSequenceToNewRoot(seq, 'E')).toEqual([
      { chord: 'Emaj7', degree: 'I' },
      { chord: 'G#m',   degree: 'III' },
      { chord: 'B7',    degree: 'V' }
    ]);
  });

  test('uses flat chromatic output when baseNote is flat', () => {
    const seq = [
      { baseNote: 'Eb', chordType: 'm', degree: 'III' },
      { baseNote: 'Bb', chordType: '7', degree: 'V' }
    ];
    expect(shiftSequenceToNewRoot(seq, 'F#')).toEqual([
      { chord: 'Gbm', degree: 'III' },
      { chord: 'Db7', degree: 'V' }
    ]);
  });

  test('uses sharp chromatic output for natural baseNote', () => {
    const seq = [
      { baseNote: 'C', degree: 'I', chordType: '' },
      { baseNote: 'E', degree: 'III', chordType: 'm' }
    ];
    expect(shiftSequenceToNewRoot(seq, 'C#')).toEqual([
      { chord: 'C#', degree: 'I' },
      { chord: 'Fm', degree: 'III' }
    ]);
  });

  test('supports flat newRoot for root selection', () => {
    const seq = [{ baseNote: 'C', chordType: '', degree: 'I' }];
    expect(shiftSequenceToNewRoot(seq, 'Bb')).toEqual([
      { chord: 'Bb', degree: 'I' }
    ]);
  });

  test('correctly transposes when tonic is minor and not first in sequence', () => {
    const seq = [
      { baseNote: 'A', chordType: 'm', degree: 'VI' },
      { baseNote: 'B', chordType: 'm', degree: 'VII' },
      { baseNote: 'C', chordType: 'm', degree: 'i' },
      { baseNote: 'F', chordType: 'm', degree: 'iv' }
    ];
    const result = shiftSequenceToNewRoot(seq, 'D#');
    expect(result).toEqual([
      { chord: 'Cm', degree: 'VI' },
      { chord: 'Dm', degree: 'VII' },
      { chord: 'D#m', degree: 'i' },
      { chord: 'G#m', degree: 'iv' }
    ]);
  });
});
