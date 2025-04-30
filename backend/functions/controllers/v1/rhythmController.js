// File: rhythmController.js


const admin = require('firebase-admin');
const getRandomRhythm = require('../../services/getRandomRhythm');

const db = admin.firestore();

/**
 * Получает случайный ритмический рисунок из коллекции "rhythms" Firestore.
 *
 * @route GET /getRandomRhythm
 *
 * @param {Object} req - HTTP-запрос
 * @param {Object} res - HTTP-ответ
 *
 * @returns {Promise<void>} Отправляет JSON с ритмическим рисунком
 *
 * @example
 * // Ответ:
 * {
 *   "meter": "4/4",
 *   "left": "I",
 *   "right": "X-1-(2,3)-1",
 *   "rhythm_examples": [
 *     { "compositionId": "abc123", "artist": "Bon Jovi", "title": "Always", "section": "Verse", "number": 1, "youtube": "..." },
 *     ...
 *   ]
 * }
 *
 * @throws {Error} В случае ошибок обращения к базе данных или генерации ритма
 */
exports.getRandomRhythm = async (req, res) => {
  try {
    const rhythm = await getRandomRhythm(db);

    res.status(200).json({
      meter: rhythm.meter ?? '',
      left: rhythm.left ?? '',
      right: rhythm.right ?? '',
      rhythm_examples: rhythm.examples ?? [],
    });

  } catch (err) {
    console.error('[v1] Rhythm generation error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
