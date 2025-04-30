// File: services/components/buildBaseFromC.js

const degreeToNoteMap = {
  'I': 'C',
  'II': 'D',
  'III': 'E',
  'IV': 'F',
  'V': 'G',
  'VI': 'A',
  'VII': 'B',
};

/**
 * Исправляет крайние случаи нестандартных нот без альтерации.
 * @param {string} note
 * @returns {string}
 */
function correctEdgeNote(note) {
  switch (note) {
    case 'Cb': return 'B';
    case 'Fb': return 'E';
    case 'E#': return 'F';
    case 'B#': return 'C';
    default: return note;
  }
}

/**
 * Строит базовую прогрессию от ноты C.
 *
 * @param {Array.<{degree: string, accidental: string, chordType: string}>} parsedProgression
 * @returns {Array.<{baseNote: string, chordType: string, degree: string}>}
 */
function buildBaseFromC(parsedProgression) {
  if (!Array.isArray(parsedProgression) || parsedProgression.length === 0) {
    throw new Error('Input must be a non-empty array');
  }

  return parsedProgression.map((step) => {
    if (
      !step ||
      typeof step.degree !== 'string' ||
      typeof step.accidental !== 'string' ||
      typeof step.chordType !== 'string'
    ) {
      throw new Error('Parsed progression step is missing required fields');
    }

    const degreeKey = step.degree.toUpperCase();
    const pureNote = degreeToNoteMap[degreeKey];
    if (!pureNote) {
      throw new Error(`Unknown degree: ${step.degree}`);
    }

    // Добавляем accidental («b» или «#») к чистой ноте
    const noteWithAccident = pureNote + step.accidental;

    // Корректируем крайние случаи (Cb, Fb, E#, B#)
    const baseNote = correctEdgeNote(noteWithAccident);

    return {
      baseNote,
      chordType: step.chordType,
      degree: step.accidental + step.degree,
    };
  });
}

module.exports = buildBaseFromC;
