// services/progressionAndRootToSequence.js

const parseProgression = require('./components/parseProgression');
const buildBaseFromC = require('./components/buildBaseFromC');
const shiftSequenceToNewRoot = require('./components/shiftSequenceToNewRoot');
const adjustSequenceToTonality = require('./adjustSequenceToTonality');
const formatSequence = require('./components/formatSequence');

/**
 * Преобразует текстовую прогрессию степеней и указанную тональность (root)
 * в список аккордов в текстовом формате.
 *
 * @param {string} progression - Прогрессия степеней, например "i-iv-VII"
 * @param {string} root - Новая тональность, например "A" или "F#"
 * @returns {Array.<string>} Список строк аккордов, например ["Am", "Dm", "G#"]
 *
 * @throws {Error} Если прогрессия или root заданы неверно
 */
function progressionAndRootToSequence(progression, root) {
  const parsedProgression = parseProgression(progression);      // 1. Парсим прогрессию в ступенях
  const builtBase = buildBaseFromC(parsedProgression);           // 2. Строим прогрессию от C

  const baseSequence = builtBase.map(({ baseNote, chordType }) => ({
    baseNote,
    chordType,
  }));

  const shifted = shiftSequenceToNewRoot(baseSequence, root);    // 3. Сдвигаем прогрессию в нужную тональность
  const adjusted = adjustSequenceToTonality(shifted, root);      // 4. Корректируем написание (#/b) в зависимости от тональности
  const formatted = formatSequence(adjusted);                    // 5. Формируем финальные строковые аккорды

  return formatted;
}

module.exports = progressionAndRootToSequence;
