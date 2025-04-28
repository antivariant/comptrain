/**
 * Хроматический ряд с диезами
 * @type {Array.<string>}
 */
const chromaticSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * Сопоставление степеней с полутонами в тональности C
 * @type {Object.<string, number>}
 */
const degreeMap = {
  'I': 0,
  'II': 2,
  'III': 4,
  'IV': 5,
  'V': 7,
  'VI': 9,
  'VII': 11,
  'i': 0,
  'ii': 2,
  'iii': 4,
  'iv': 5,
  'v': 7,
  'vi': 9,
  'vii': 11,
};

/**
 * Строит базовую секвенцию аккордов от ноты C на основе разобранной прогрессии
 *
 * @param {Array.<{degree: string, accidental: string}>} parsedProgression - Разобранная прогрессия аккордов
 * @returns {Array.<{degree: string, accidental: string, baseNote: string}>} - Базовая прогрессия с базовыми нотами
 * 
 * @throws {Error} Если степень аккорда неизвестна
 */
function buildBaseFromC(parsedProgression) {
  return parsedProgression.map(chord => {
    const baseSemitone = degreeMap[chord.degree];
    if (baseSemitone === undefined) {
      throw new Error(`Unknown degree: ${chord.degree}`);
    }

    let semitone = baseSemitone;

    for (const accidentalChar of chord.accidental) {
      if (accidentalChar === 'b') semitone = (semitone + 11) % 12;
      if (accidentalChar === '#') semitone = (semitone + 1) % 12;
    }

    const baseNote = chromaticSharp[semitone];

    return {
      ...chord,
      baseNote
    };
  });
}

module.exports = buildBaseFromC;
