const { generateApplicature } = require('../services/chordApplicatureService');

describe('generateApplicature', () => {
  test('Am → F → C → G раскладывается корректно', () => {
    const result = generateApplicature(['Am', 'F', 'C', 'G']);

    expect(result).toHaveLength(4);
    for (const chord of result) {
      expect(Array.isArray(chord)).toBe(true);
      for (const marker of chord) {
        expect(marker).toHaveProperty('noteCode');
        expect(marker).toHaveProperty('degree');
        expect(marker).toHaveProperty('isChanged');
      }
    }
  });

  test('Bb аккорд не вызывает ошибку', () => {
    expect(() => generateApplicature(['Bb'])).not.toThrow();
  });

  test('Gb аккорд не вызывает ошибку', () => {
    expect(() => generateApplicature(['Gb'])).not.toThrow();
  });

  test('Неверный аккорд вызывает ошибку', () => {
    expect(() => generateApplicature(['Z#'])).toThrow();
  });


  test('Bbm раскладывается в бемольные ноты', () => {
    const result = generateApplicature(['Bbm']);
    const markers = result[0].map(m => m.noteCode);
    expect(markers).toContain('7b');  // Bb
    expect(markers).toContain('2b');  // Db
    expect(markers).toContain('4');   // F
  });

  test('B в мажорной тональности не содержит бемолей', () => {
    const result = generateApplicature(['B']);
    const notes = result[0].map(m => m.noteCode);
    expect(notes.some(n => n.includes('b'))).toBe(false);
  });
  

});
