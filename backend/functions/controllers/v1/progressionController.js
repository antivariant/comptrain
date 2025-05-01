const admin = require('firebase-admin');
const { getRandomProgression } = require('../../services/getRandomProgression');

/**
 * Возвращает случайную аккордовую прогрессию из Firestore.
 *
 * @route GET /v1/progression
 *
 * @param {Object} req - HTTP-запрос
 * @param {Object} res - HTTP-ответ
 *
 * @returns {Promise<void>} Отправляет JSON с полями:
 * - degrees: строка вида "I-IV-V"
 * - examples: массив объектов с описанием композиций
 *
 * @example
 * {
 *   "degrees": "I-IV-V",
 *   "examples": [
 *     {
 *       "compositionId": "abc123",
 *       "artist": "The Beatles",
 *       "title": "Let It Be",
 *       "section": "Chorus",
 *       "number": 1,
 *       "youtube": "https://youtube.com/..."
 *     },
 *     ...
 *   ]
 * }
 *
 * @throws {Error} В случае ошибки обращения к Firestore
 */
exports.getRandomProgression = async (req, res) => {
  try {
    const db = admin.firestore();
    const result = await getRandomProgression(db);

    console.log('[ProgressionController] Fetched progression:', JSON.stringify(result));
    res.status(200).json(result);
  } catch (err) {
    console.error('[ProgressionController] Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch progression' });
  }
};
