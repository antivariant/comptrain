// File: fullGenerationController.js


const admin = require('firebase-admin');
const genRandSeqAndRythm = require('../../services/genRandSeqAndRythm');

/**
 * Генерирует полную случайную секвенцию: прогрессия, тональность, аккорды, аппликатура и ритм.
 *
 * @route GET /v1/full-sequence
 *
 * @param {Object} req - HTTP-запрос
 * @param {Object} res - HTTP-ответ
 *
 * @returns {Promise<void>} Отправляет JSON с полной структурой секвенции
 *
 * @example
 * // Ответ:
 * {
 *   "progression": { "degrees": "I-IV-V", "examples": [...] },
 *   "root": "C",
 *   "sequence": ["C", "F", "G"],
 *   "applicature": [ [...], [...], [...] ],
 *   "rhythm": { "meter": "4/4", "left": "I", "right": "X-1-(2,3)-1", "examples": [...] }
 * }
 *
 * @throws {Error} В случае ошибок генерации или обращения к базе данных
 */
const handleGenerateSequence = async (req, res) => {
  try {
    const db = admin.firestore(); // 🔒 Firestore инициализация
    const result = await genRandSeqAndRythm(db);

    console.info('[fullSequence] ✅ Sequence generated');
    res.status(200).json(result);
  } catch (error) {
    console.error('[fullSequence] 🛑 Generation error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { handleGenerateSequence };
