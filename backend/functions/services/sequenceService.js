const { getRandomProgression } = require("./progressionService");
const { getRandomRhythm } = require("./rhythmService");
const {
  getRandomTonalityForDegrees,
  transposeDegreesToChords
} = require("./harmonyService");

const generateSequence = async (db) => {
  try {
    const progression = await getRandomProgression(db);
    console.log("🔁 Selected degrees:", progression.degrees);

    const tonality = getRandomTonalityForDegrees(progression.degrees);
    console.log("🎼 Selected tonality:", tonality);

    const chords = transposeDegreesToChords(progression.degrees, tonality);
    console.log("🎹 Transposed chords:", chords);

    const rhythm = await getRandomRhythm(db);
    console.log("🥁 Rhythm meter:", rhythm.meter);
    console.log("🪗 Left hand:", rhythm.left);
    console.log("🎵 Right hand:", rhythm.right);

    return {
      degrees: progression.degrees,
      progression_examples: progression.examples,
      tonality,
      chords,
      meter: rhythm.meter,
      left: rhythm.left,
      right: rhythm.right,
      rhythm_examples: rhythm.examples
    };
  } catch (err) {
    console.error("❌ Ошибка внутри generateSequence:", err);
    throw err;
  }
};

module.exports = { generateSequence };
