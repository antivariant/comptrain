const sequenceToApplicature = require('../services/sequenceToApplicature');

describe('sequenceToApplicature – базовые проверки', () => {
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
    expect(noteCodes).toContain('7b');
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

describe('sequenceToApplicature – логика выбора позиции C', () => {
  test('1️⃣ Первый аккорд: C всегда заменяется на 8', () => {
    const result = sequenceToApplicature(['C']);
    const noteCodes = result[0].map(m => m.noteCode);
    expect(noteCodes).toContain('8');
    expect(noteCodes).not.toContain('1');
  });

  test('2️⃣ C не было, но появилось, левая клавиша не изменилась → C = 8 (Em → C)', () => {
    const result = sequenceToApplicature(['Em', 'C']);
    const c = result[1].map(m => m.noteCode);
    const cNote = c.find(n => n === '8' || n === '1');
    expect(cNote).toBe('8');
  });

  test('3️⃣ C не было, но появилось, правая клавиша не изменилась → C = 8 (Dm → C)', () => {
    const result = sequenceToApplicature(['Dm', 'C']);
    const c = result[1].map(m => m.noteCode);
    const cNote = c.find(n => n === '8' || n === '1');
    expect(cNote).toBe('8');
  });

  test('4️⃣ C была и осталась → позиция C не изменяется (Am → F)', () => {
    const result = sequenceToApplicature(['Am', 'F']);
    const amC = result[0].find(m => m.noteCode === '8' || m.noteCode === '1');
    const fC = result[1].find(m => m.degree === 'I');
    expect(fC.noteCode).toBe('4');
  });
});

describe('sequenceToApplicature – классы эквивалентности', () => {
  test('1️⃣ Тоника на левой клавише (Em = 3-5-7)', () => {
    const result = sequenceToApplicature(['Em']);
    const noteCodes = result[0].map(m => m.noteCode);
    expect(noteCodes).toEqual(expect.arrayContaining(['3', '5', '7']));
  });

  test('2️⃣ Тоника на средней клавише (G = 2-5-7)', () => {
    const result = sequenceToApplicature(['G']);
    const noteCodes = result[0].map(m => m.noteCode);
    expect(noteCodes).toEqual(expect.arrayContaining(['2', '5', '7']));
  });

  test('3️⃣ Тоника на последней клавише (Bm = 2-4-8)', () => {
    const result = sequenceToApplicature(['Bm']);
    const noteCodes = result[0].map(m => m.noteCode);
    expect(noteCodes).toEqual(expect.arrayContaining(['2', '5b', '7']));
  });

  test('4️⃣.1 Одна черная клавиша под первым пальцем (F#)', () => {
    const result = sequenceToApplicature(['F#']);
    const noteCodes = result[0].map(m => m.noteCode);
    expect(noteCodes).toContain('1#');
  });

  test('4️⃣.2 Одна черная клавиша под вторым пальцем (A)', () => {
    const result = sequenceToApplicature(['A']);
    const noteCodes = result[0].map(m => m.noteCode);
    expect(noteCodes).toContain('3');
  });

  test('4️⃣.3 Одна черная клавиша под третьим пальцем (Ebm)', () => {
    const result = sequenceToApplicature(['Ebm']);
    const noteCodes = result[0].map(m => m.noteCode);
    expect(noteCodes).toContain('3b');
  });

  test('5️⃣.1 Две черные клавиши под первым и вторым пальцами (F#m)', () => {
    const result = sequenceToApplicature(['F#m']);
    const noteCodes = result[0].map(m => m.noteCode);
    expect(noteCodes).toEqual(expect.arrayContaining(['2b', '5b', '6']));
  });

  test('5️⃣.2 Под вторым и третьим (G#m)', () => {
    const result = sequenceToApplicature(['G#m']);
    const noteCodes = result[0].map(m => m.noteCode);
    expect(noteCodes).toEqual(expect.arrayContaining(['3b', '6b', '7']));
  });

  test('5️⃣.3 Под первым и третьим (C#m)', () => {
    const result = sequenceToApplicature(['C#m']);
    const noteCodes = result[0].map(m => m.noteCode);
    expect(noteCodes).toEqual(expect.arrayContaining(['2b', '3', '6b']));
  });

  test('6️⃣ Четыре клавиши: G7 = 2-4-5-7', () => {
    const result = sequenceToApplicature(['G7']);
    const noteCodes = result[0].map(m => m.noteCode);
    expect(noteCodes).toHaveLength(4);
    expect(noteCodes).toEqual(expect.arrayContaining(['2', '4', '5', '7']));
  });

  test('6️⃣ Maj7 (Cmaj7)', () => {
    const result = sequenceToApplicature(['Cmaj7']);
    const noteCodes = result[0].map(m => m.noteCode);
    expect(noteCodes).toEqual(expect.arrayContaining(['3', '5', '7', '8']));
  });

  test('6️⃣ m7 (Am7)', () => {
    const result = sequenceToApplicature(['Am7']);
    expect(result[0]).toHaveLength(4);
  });

  test('6️⃣ dim7 (Bdim7)', () => {
    const result = sequenceToApplicature(['Bdim7']);
    expect(result[0]).toHaveLength(4);
  });

  test('6️⃣ mMaj7 (CmMaj7)', () => {
    const result = sequenceToApplicature(['CmMaj7']);
    expect(result[0]).toHaveLength(4);
  });

  test('7️⃣ Минорный (Am)', () => {
    const result = sequenceToApplicature(['Am']);
    expect(result[0]).toHaveLength(3);
  });

  test('7️⃣ Уменьшенный (Bdim)', () => {
    const result = sequenceToApplicature(['Bdim']);
    expect(result[0]).toHaveLength(3);
  });

  test('7️⃣ Увеличенный (Caug)', () => {
    const result = sequenceToApplicature(['Caug']);
    expect(result[0]).toHaveLength(3);
    const noteCodes = result[0].map(m => m.noteCode);
    expect(noteCodes).toContain('5#');
  });

  test('8️⃣ Корректное разложение C как мажорного (C = 1-3-5)', () => {
    const result = sequenceToApplicature(['C']);
    const noteCodes = result[0].map(m => m.noteCode);
    expect(noteCodes).toEqual(expect.arrayContaining(['3', '5']));
  });
});