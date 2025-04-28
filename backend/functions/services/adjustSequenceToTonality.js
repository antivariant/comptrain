// services/adjustSequenceToTonality.js

/**
 * Карта соответствия между диезами и бемолями для энгармонической замены
 * @type {Object.<string, string>}
 */
const enharmonicMap = {
  'C#': 'Db', 'Db': 'C#',
  'D#': 'Eb', 'Eb': 'D#',
  'F#': 'Gb', 'Gb': 'F#',
  'G#': 'Ab', 'Ab': 'G#',
  'A#': 'Bb', 'Bb': 'A#',
};

/**
 * Определяет, стоит ли в данной тональности использовать диезы.
 *
 * @param {string} tonality - Название тональности (например, "C", "F#", "Bb")
 * @returns {boolean} True, если предпочтительнее использовать диезы
 */
function shouldPreferSharps(tonality) {
  const flatTonalities = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];
  return !flatTonalities.includes(tonality);
}

/**
 * Корректирует запись нот в последовательности аккордов в зависимости от выбранной тональности (# или b).
 *
 * @param {Array.<{baseNote: string, chordType: string}>} sequence - Последовательность аккордов
 * @param {string} tonality - Тональность, относительно которой выполняется коррекция
 * @returns {Array.<{baseNote: string, chordType: string}>} Новая последовательность аккордов с откорректированной нотацией
 */
function adjustSequenceToTonality(sequence, tonality) {
  const preferSharp = shouldPreferSharps(tonality);

  return sequence.map(({ baseNote, chordType }) => {
    let note = baseNote;

    if (preferSharp) {
      if (note && note.includes('b') && enharmonicMap[note]) {
        note = enharmonicMap[note]; // Переводим бемоль в диез
      }
    } else {
      if (note && note.includes('#') && enharmonicMap[note]) {
        note = enharmonicMap[note]; // Переводим диез в бемоль
      }
    }

    return { baseNote: note, chordType };
  });
}

module.exports = adjustSequenceToTonality;
