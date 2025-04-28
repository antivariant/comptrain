const normalizedRoot = require('../utils/normalizedRoot');

describe('normalizedRoot', () => {
  test('Converts flat to sharp if preference is sharp', () => {
    expect(normalizedRoot('Bb', 'maj7')).toBe('A#');
    expect(normalizedRoot('Eb', '')).toBe('D#');
  });

  test('Converts sharp to flat if preference is flat', () => {
    expect(normalizedRoot('A#', 'm')).toBe('Bb');
    expect(normalizedRoot('D#', 'dim')).toBe('Eb');
  });

  test('Leaves note as is if no matching conversion needed', () => {
    expect(normalizedRoot('A', '')).toBe('A');
    expect(normalizedRoot('F#', 'maj7')).toBe('F#'); // remains sharp
    expect(normalizedRoot('Bb', 'dim')).toBe('Bb'); // remains flat
  });

  test('Returns original if not in enharmonic map', () => {
    expect(normalizedRoot('C', '')).toBe('C');
    expect(normalizedRoot('G', 'm7')).toBe('G');
  });
});
