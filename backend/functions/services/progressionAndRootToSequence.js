// File: services/progressionAndRootToSequence.js

const validateProgressionString = require('./components/validateProgressionString');
const parseProgression         = require('./components/parseProgression');
const buildBaseFromC           = require('./components/buildBaseFromC');
const shiftSequenceToNewRoot   = require('./components/shiftSequenceToNewRoot');
const adjustSequenceToTonality = require('./adjustSequenceToTonality');
const formatSequence           = require('./components/formatSequence');

/**
 * Преобразует текстовую прогрессию и root в готовую строковую
 * последовательность аккордов.
 *
 * @param {string} progression — строка прогрессии ("i-iv-VII")
 * @param {string} root        — новая тоника ("Eb", "F#" и т.п.)
 * @param {{joiner?: string}} [options]
 * @returns {string[]|string}
 *
 * @throws {Error} При некорректных входных данных
 */
function progressionAndRootToSequence(progression, root, options = {}) {
  // 1. Валидируем строку прогрессии
  validateProgressionString(progression);

  // 2. Парсим прогрессию
  const parsed = parseProgression(progression);

  // 3. Строим базу от C
  const built = buildBaseFromC(parsed);

  // 4. Транспонируем в заданный root
  const shifted = shiftSequenceToNewRoot(built, root);
  // shifted: Array<{ chord: string, degree: string }>

  // 5. Разбиваем chord → baseNote & chordType, сохраняем degree
  const sequenced = shifted.map(({ chord, degree }) => {
    const m = chord.match(/^([A-G][b#]?)(.*)$/);
    if (!m) {
      throw new Error(`Invalid chord format: ${chord}`);
    }
    return {
      baseNote: m[1],
      chordType: m[2],
      degree
    };
  });

  // 6. Корректируем accidentals по тональности
  const adjusted = adjustSequenceToTonality(sequenced, root);
  // adjusted: Array<{ baseNote, chordType, degree }>

  // 7. Форматируем в строки или одну строку
  return formatSequence(adjusted, options);
}

module.exports = progressionAndRootToSequence;
