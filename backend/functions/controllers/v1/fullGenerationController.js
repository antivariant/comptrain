const admin = require('firebase-admin');
const genRandSeqAndRythm = require('../../services/genRandSeqAndRythm');

/**
 * Генерирует полную случайную секвенцию: прогрессия, тональность, аккорды, аппликатура и ритм.
 *
 * @route POST /v1/full-sequence
 *
 * @param {Object} req - HTTP-запрос (без тела)
 * @param {Object} res - HTTP-ответ
 *
 * @returns {Promise<void>} Отправляет JSON с полной структурой:
 * {
 *   progression: {
 *     degrees: "I-IV-V",
 *     examples: [ { compositionId, artist, title, ... } ]
 *   },
 *   root: "C",
 *   sequence: ["C", "F", "G"],
 *   applicature: [ [...], [...], [...] ],
 *   rhythm: {
 *     meter: "4/4",
 *     left: "I",
 *     right: "X-1-(2,3)-1",
 *     examples: [ { compositionId, ... } ]
 *   }
 * }
 *
 * @throws {Error} В случае ошибки генерации или обращения к Firestore
 */
const handleGenerateSequence = async (req, res) => {
  try {
    const db = admin.firestore();
    const result = await genRandSeqAndRythm(db);

    console.log('[FullGenerationController] Full sequence generated');
    res.status(200).json(result);
  } catch (error) {
    console.error('[FullGenerationController] Generation error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { handleGenerateSequence };
