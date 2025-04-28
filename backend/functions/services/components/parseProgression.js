const chordTypeMap = require('../../models/chordTypeMap');

/**
 * Разбирает строку прогрессии аккордов в массив структурированных объектов.
 *
 * @param {string} progression - Прогрессия аккордов в текстовом виде, например: "i-iv-VII"
 * @returns {Array.<{original: string, accidental: string, degree: string, chordType: string}>} Массив объектов аккордов
 *
 * @throws {Error} Если progression не строка, или некорректный формат аккорда, или неизвестный chordType
 */
function parseProgression(progression) {
  if (typeof progression !== 'string') {
    throw new Error('Progression must be a string');
  }

  const chords = progression.split('-');
  const result = [];

  chords.forEach((chordStr) => {
    // Проверка на двойные знаки (например, bIIIbmaj7)
    const doubleAccidental = chordStr.match(/^([b#]).*([b#])/);
    if (doubleAccidental) {
      throw new Error('Double accidental not allowed');
    }

    const match = chordStr.match(/^([b#]?)([ivIV]+)([b#]?)(.*)$/);
    if (!match) {
      throw new Error('Invalid chord format');
    }

    let [, accidental1, degree, accidental2, chordType] = match;

    // Объединить знаки: если есть второй знак после ступени, перенести его перед ступенью
    if (accidental2) {
      if (accidental1) {
        throw new Error('Double accidental not allowed');
      }
      accidental1 = accidental2;
    }

    // Если ступень в нижнем регистре и нет явно указанного chordType, это минор
    if (degree === degree.toLowerCase() && chordType === '') {
      chordType = 'm';
    }

    // Проверяем существование chordType в chordTypeMap
    if (!chordTypeMap.hasOwnProperty(chordType)) {
      throw new Error(`Unknown chord type: ${chordType}`);
    }

    result.push({
      original: chordStr,
      accidental: accidental1,
      degree: degree,
      chordType: chordType,
    });
  });

  return result;
}

module.exports = parseProgression;
