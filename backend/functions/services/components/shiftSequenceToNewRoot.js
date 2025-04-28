// services/shiftSequenceToNewRoot.js

const chromaticSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const chromaticFlat  = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

/**
 * Транспонирует базовую последовательность аккордов на новую тонику.
 *
 * @param {Array.<{baseNote: string, chordType: string}>} baseSequence - Базовая последовательность аккордов
 * @param {string} newRoot - Новая тоника (например, "A", "F#", "Bb")
 * @returns {Array.<string>} Массив транспонированных аккордов в виде строк
 *
 * @throws {Error} Если newRoot некорректен или baseNote отсутствует в хроматической шкале
 */
function shiftSequenceToNewRoot(baseSequence, newRoot) {
  if (typeof newRoot !== 'string') {
    throw new Error('newRoot must be a string');
  }

  let useFlat = false;
  let rootIndex = chromaticSharp.indexOf(newRoot);

  if (rootIndex === -1) {
    rootIndex = chromaticFlat.indexOf(newRoot);
    useFlat = true;
  }

  if (rootIndex === -1) {
    throw new Error(`Invalid newRoot: ${newRoot}`);
  }

  const rootChromatic = useFlat ? chromaticFlat : chromaticSharp;

  return baseSequence.map(({ baseNote, chordType }) => {
    let chromatic;

    if (chromaticSharp.includes(baseNote)) {
      chromatic = chromaticSharp;
    } else if (chromaticFlat.includes(baseNote)) {
      chromatic = chromaticFlat;
    } else {
      throw new Error(`Invalid baseNote in sequence: ${baseNote}`);
    }

    const baseIndex = chromatic.indexOf(baseNote);
    if (baseIndex === -1) {
      throw new Error(`Invalid baseNote in chromatic: ${baseNote}`);
    }

    const newIndex = (baseIndex + rootIndex) % 12;
    const newNote = rootChromatic[newIndex];

    return `${newNote}${chordType}`;
  });
}

module.exports = shiftSequenceToNewRoot;
