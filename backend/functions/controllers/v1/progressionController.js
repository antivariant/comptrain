const admin = require('firebase-admin');
const { getRandomProgression } = require('../../services/getRandomProgression');

/**
 * Получает случайную аккордовую прогрессию из коллекции "progressions" Firestore.
 *
 * @route GET /v1/progression
 *
 * @param {Object} req - HTTP-запрос
 * @param {Object} res - HTTP-ответ
 *
 * @returns {Promise<void>} Отправляет JSON с полями degrees и examples
 *
 * @example
 * // Ответ:
 * {
 *   "degrees": "I-IV-V",
 *   "examples": [
 *     { "artist": "The Beatles", "title": "Let It Be", "section": "Chorus", "youtube": "..." },
 *     ...
 *   ]
 * }
 *
 * @throws {Error} Если происходит ошибка получения данных из Firestore
 */
exports.getRandomProgression = async (req, res) => {
  try {
    const db = admin.firestore(); // 🔒 Firestore инициализация для удобства мокинга
    const result = await getRandomProgression(db);

    console.info('[progression] ✅ Fetched random progression:', result);
    res.status(200).json(result);
  } catch (err) {
    console.error('[progression] 🛑 Fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch progression' });
  }
};
