const progressionAndRootToSequence = require('../services/progressionAndRootToSequence');

describe('progressionAndRootToSequence', () => {
  test('minor: i-iv-VII from A', () => {
    const result = progressionAndRootToSequence('i-iv-VII', 'A');
    expect(result).toEqual(['Am', 'Dm', 'Ab']);
  });

  test('major: I-IV-V from C', () => {
    const result = progressionAndRootToSequence('I-IV-V', 'C');
    expect(result).toEqual(['C', 'F', 'G']);
  });

  test('minor: i-bVII-V from A', () => {
    const result = progressionAndRootToSequence('i-bVII-V', 'A');
    expect(result).toEqual(['Am', 'G', 'E']);
  });

  test('major: I-III-V from A', () => {
    const result = progressionAndRootToSequence('I-III-V', 'A');
    expect(result).toEqual(['A', 'Db', 'E']);
  });

  test('major: I-IIIb-V from A', () => {
    const result = progressionAndRootToSequence('I-IIIb-V', 'A');
    expect(result).toEqual(['A', 'C', 'E']);
  });

  test('major: I-III#-V from A', () => {
    const result = progressionAndRootToSequence('I-III#-V', 'A');
    expect(result).toEqual(['A', 'D', 'E']);
  });

  test('Самый сложный тест на свете', () => {
    const result = progressionAndRootToSequence('I-II#7-bIIImaj7-IVm7-Vbdim-VIdim7-VIImMaj7-#Iaug', 'C');
    expect(result).toEqual(['C', 'Eb7', 'Ebmaj7', 'Fm7', 'Gbdim', 'Adim7', 'BmMaj7', 'Dbaug']);
  });

  test('invalid root throws error', () => {
    expect(() => progressionAndRootToSequence('I-IV-V', 'H')).toThrow('Invalid newRoot: H');
  });

  test('invalid degree throws error', () => {
    expect(() => progressionAndRootToSequence('I-XYZ-V', 'C')).toThrow('Invalid chord format');
  });
});

describe('progressionAndRootToSequence – транспонирование прогрессий', () => {
  test.each([
    ['C',  ['C', 'G', 'Am', 'F']],
    ['C#', ['Db', 'Ab', 'Bbm', 'Gb']],
    ['Db', ['Db', 'Ab', 'Bbm', 'Gb']],
    ['D', ['D', 'A', 'Bm', 'G']],
    ['D#', ['Eb', 'Bb', 'Cm', 'Ab']],
    ['Eb', ['Eb', 'Bb', 'Cm', 'Ab']],
    ['E', ['E', 'B', 'C#m', 'A']],
    ['F', ['F', 'C', 'Dm', 'Bb']],
    ['F#', ['Gb', 'Db', 'Ebm', 'B']],
    ['Gb', ['Gb', 'Db', 'Ebm', 'B']],
    ['G', ['G', 'D', 'Em', 'C']],
    ['G#', ['Ab', 'Eb', 'Fm', 'Db']],
    ['Ab', ['Ab', 'Eb', 'Fm', 'Db']],
    ['A', ['A', 'E', 'F#m', 'D']],
    ['A#', ['Bb', 'F', 'Gm', 'Eb']],
    ['Bb', ['Bb', 'F', 'Gm', 'Eb']],
    ['B', ['B', 'Gb', 'Abm', 'E']],
  ])('должен правильно транспонировать "%s" в аккорды %j', (root, expected) => {
    const degrees = 'I-V-vi-IV';
    const result = progressionAndRootToSequence(degrees, root);
    expect(result).toEqual(expected);
  });
});
