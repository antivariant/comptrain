const admin = require('firebase-admin');
const getRandomRhythm = require('../../services/getRandomRhythm');

const db = admin.firestore();

/**
 * Получает случайный ритмический рисунок из коллекции "rhythms" Firestore.
 *
 * @route GET /v1/rhythm
 *
 * @param {Object} req - HTTP-запрос
 * @param {Object} res - HTTP-ответ
 *
 * @returns {Promise<void>} Отправляет JSON с полями:
 * - meter: размер ("4/4", "3/4" и т.п.)
 * - left: ритм левой руки (например, "I" или "I-V")
 * - right: ритм правой руки (например, "X-1-(2,3)-1")
 * - rhythm_examples: массив привязанных примеров
 *
 * @example
 * {
 *   "meter": "4/4",
 *   "left": "I",
 *   "right": "X-1-(2,3)-1",
 *   "rhythm_examples": [
 *     {
 *       "compositionId": "abc123",
 *       "artist": "Bon Jovi",
 *       "title": "Always",
 *       "section": "Verse",
 *       "number": 1,
 *       "youtube": "https://youtube.com/..."
 *     }
 *   ]
 * }
 *
 * @throws {Error} Если возникает ошибка при получении ритма из Firestore
 */
exports.getRandomRhythm = async (req, res) => {
  try {
    const rhythm = await getRandomRhythm(db);

    const result = {
      meter: rhythm.meter ?? '',
      left: rhythm.left ?? '',
      right: rhythm.right ?? '',
      rhythm_examples: rhythm.examples ?? [],
    };

    console.log('[RhythmController] Fetched rhythm:', JSON.stringify(result));
    res.status(200).json(result);
  } catch (err) {
    console.error('[RhythmController] Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
