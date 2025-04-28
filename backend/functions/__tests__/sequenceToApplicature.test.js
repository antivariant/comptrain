const sequenceToApplicature = require('../services/sequenceToApplicature');

describe('sequenceToApplicature', () => {
  test('Generates markers for basic major progression', () => {
    const result = sequenceToApplicature(['C', 'F', 'G']);
    expect(result).toHaveLength(3);
    result.flat().forEach(marker => {
      expect(marker).toHaveProperty('noteCode');
      expect(marker).toHaveProperty('degree');
      expect(marker).toHaveProperty('isChanged');
    });
  });

  test('Handles flat key correctly (Bbm)', () => {
    const result = sequenceToApplicature(['Bbm']);
    const noteCodes = result[0].map(m => m.noteCode);
    expect(noteCodes).toContain('7b'); // Bb mapped to 7b key
  });

  test('Changes "C" to "8" in subsequent chords if required', () => {
    const result = sequenceToApplicature(['C', 'F']);
    const has8 = result[1].some(m => m.noteCode === '8');
    expect(has8).toBe(true);
  });

  test('Throws error on invalid chord', () => {
    expect(() => sequenceToApplicature(['Zz'])).toThrow('Invalid chord');
  });

  test('Throws error on unknown chord type', () => {
    expect(() => sequenceToApplicature(['Caugmented'])).toThrow('Unknown chord type');
  });
});
