// File: services/components/shiftSequenceToNewRoot.js

const chromaticSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const chromaticFlat  = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

/**
 * Транспонирует базовую последовательность аккордов на новую тонику.
 *
 * @param {Array.<{baseNote: string, chordType: string, degree: string}>} baseSequence
 * @param {string} newRoot — новый root (например, "A", "F#", "Bb")
 * @returns {Array.<{chord: string, degree: string}>}
 *
 * @throws {Error} При некорректных входных данных
 */
function shiftSequenceToNewRoot(baseSequence, newRoot) {
  if (!Array.isArray(baseSequence) || baseSequence.length === 0) {
    throw new Error('baseSequence must be a non-empty array');
  }

  if (typeof newRoot !== 'string') {
    throw new Error('newRoot must be a string');
  }

  baseSequence.forEach(step => {
    if (
      !step ||
      typeof step.baseNote !== 'string' ||
      typeof step.chordType !== 'string' ||
      typeof step.degree !== 'string'
    ) {
      throw new Error('Each step must have string fields baseNote, chordType and degree');
    }

    const bn = step.baseNote;
    if (!chromaticSharp.includes(bn) && !chromaticFlat.includes(bn)) {
      throw new Error(`Invalid baseNote in sequence: ${bn}`);
    }
  });

  let useFlatForRoot = false;
  let rootIndex = chromaticSharp.indexOf(newRoot);
  if (rootIndex === -1) {
    rootIndex = chromaticFlat.indexOf(newRoot);
    useFlatForRoot = true;
  }
  if (rootIndex === -1) {
    throw new Error(`Invalid newRoot: ${newRoot}`);
  }

  // 🔥 Исправлено: ищем I или i
  const tonicStep =
    baseSequence.find(step => step.degree.toUpperCase() === 'I') || baseSequence[0];
  const tonicNote = tonicStep.baseNote;

  let tonicIndex;
  if (chromaticSharp.includes(tonicNote)) {
    tonicIndex = chromaticSharp.indexOf(tonicNote);
  } else {
    tonicIndex = chromaticFlat.indexOf(tonicNote);
  }

  const semitoneShift = (rootIndex - tonicIndex + 12) % 12;

  return baseSequence.map(({ baseNote, chordType, degree }) => {
    const srcChromatic = chromaticSharp.includes(baseNote)
      ? chromaticSharp
      : chromaticFlat;
    const baseIndex = srcChromatic.indexOf(baseNote);

    const shiftedIndex = (baseIndex + semitoneShift) % 12;

    const outChromatic = (useFlatForRoot || baseNote.includes('b'))
      ? chromaticFlat
      : chromaticSharp;
    const newNote = outChromatic[shiftedIndex];

    return {
      chord: `${newNote}${chordType}`,
      degree
    };
  });
}

module.exports = shiftSequenceToNewRoot;
