const getNotesOfChord = require('../services/getNotesOfChord');

describe('getNotesOfChord', () => {
  test('Parses major chord correctly', () => {
    expect(getNotesOfChord('C')).toEqual(['C', 'E', 'G']);
  });

  test('Parses minor chord correctly', () => {
    expect(getNotesOfChord('Am')).toEqual(['A', 'C', 'E']);
  });

  test('Parses dominant 7th chord correctly', () => {
    expect(getNotesOfChord('G7')).toEqual(['G', 'B', 'D', 'F']);
  });

  test('Parses maj7 chord correctly', () => {
    expect(getNotesOfChord('Fmaj7')).toEqual(['F', 'A', 'C', 'E']);
  });

  test('Parses chord with flat root (Bbm)', () => {
    expect(getNotesOfChord('Bbm')).toEqual(['Bb', 'Db', 'F']);
  });

  test('Parses chord with sharp root (F#)', () => {
    expect(getNotesOfChord('F#')).toEqual(['F#', 'A#', 'C#']);
  });

  test('Throws error on unknown chord type', () => {
    expect(() => getNotesOfChord('Caugmented')).toThrow('Unknown chord type');
  });

  test('Throws error on unknown root note', () => {
    expect(() => getNotesOfChord('H7')).toThrow('Invalid chord symbol');
  });
});

