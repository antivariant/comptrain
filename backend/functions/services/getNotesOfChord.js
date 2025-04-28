const chromaticScaleSharp = require('../models/chromaticScaleSharp');
const chromaticScaleFlat = require('../models/chromaticScaleFlat');
const chordTypeMap = require('../models/chordTypeMap');
const intervalMap = require('../models/intervalMap');
const accidentalPreferenceMap = require('../models/accidentalPreferenceMap');
const parseChordSymbol = require('../utils/parseChordSymbol');
const normalizedRoot = require('../utils/normalizedRoot');

/**
 * Возвращает список нот аккорда по его обозначению.
 *
 * @param {string} chord - Обозначение аккорда, например "Am" или "F#7"
 * @returns {Array.<string>} Массив нот аккорда, например ["A", "C", "E"]
 *
 * @throws {Error} Если тип аккорда неизвестен
 * @throws {Error} Если корневая нота неизвестна
 * @throws {Error} Если интервал неизвестен
 */
function getNotesOfChord(chord) {
  const { root, type } = parseChordSymbol(chord);
  const intervals = chordTypeMap[type];
  if (!intervals) throw new Error(`Unknown chord type: ${type}`);

  const prefersFlat = accidentalPreferenceMap[type] === 'flat';
  const chromaticScale = prefersFlat ? chromaticScaleFlat : chromaticScaleSharp;
  const rootNorm = normalizedRoot(root, type);

  const rootIndex = chromaticScale.indexOf(rootNorm);
  if (rootIndex === -1) {
    throw new Error(`Unknown root note: ${rootNorm}`);
  }

  return intervals.map(interval => {
    const semitones = intervalMap[interval];
    if (semitones === undefined) throw new Error(`Unknown interval: ${interval}`);
    const index = (rootIndex + semitones) % chromaticScale.length;
    return chromaticScale[index];
  });
}

module.exports = getNotesOfChord;
