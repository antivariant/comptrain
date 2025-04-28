const getRandomProgression = require('./getRandomProgression');
const getRandomRhythm = require('./getRandomRhythm');
const generateRandomRoot = require('./components/generateRandomRoot');
const progressionAndRootToSequence = require('./progressionAndRootToSequence');
const sequenceToApplicature = require('./sequenceToApplicature');

/**
 * Генерирует случайную прогрессию, ритм, root, последовательность аккордов и аппликатуру.
 *
 * @param {object} db - Экземпляр Firestore базы данных
 * @returns {Promise<{
 *   progression: { degrees: string, examples: Array.<object> },
 *   root: string,
 *   sequence: Array.<string>,
 *   applicature: Array.<Array.<{noteCode: string, degree: string, isChanged: boolean}>>,
 *   rhythm: { meter: string, left: string, right: string, examples: Array.<object> }
 * }>} Объект с данными прогрессии, root, последовательности аккордов, аппликатурой и ритмом
 */
async function genRandSeqAndRythm(db) {
  const progression = await getRandomProgression(db);
  const rhythm = await getRandomRhythm(db);
  const root = generateRandomRoot();

  const sequence = progressionAndRootToSequence(progression.degrees, root);
  const applicature = sequenceToApplicature(sequence);

  return {
    progression: {
      degrees: progression.degrees,
      examples: progression.examples,
    },
    root,
    sequence,
    applicature,
    rhythm: {
      meter: rhythm.meter,
      left: rhythm.left,
      right: rhythm.right,
      examples: rhythm.examples,
    }
  };
}

module.exports = genRandSeqAndRythm;
