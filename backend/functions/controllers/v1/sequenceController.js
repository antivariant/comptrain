// File: sequenceController.js


const admin = require('firebase-admin');
const genRandSeqAndRythm = require('../../services/genRandSeqAndRythm');

const db = admin.firestore();

/**
 * Генерирует полную случайную секвенцию: прогрессия, тональность, аккорды, ритм и примеры.
 *
 * @route GET /generateSequence
 *
 * @param {Object} req - HTTP-запрос
 * @param {Object} res - HTTP-ответ
 *
 * @returns {Promise<void>} Отправляет JSON-объект с полными данными
 *
 * @example
 * // Ответ:
 * {
 *   "degrees": "i-iv-VII",
 *   "progression_examples": [
 *     { "compositionId": "xyz789", "artist": "Aerosmith", "title": "Dream On", "section": "Verse", "number": 1, "youtube": "..." },
 *     ...
 *   ],
 *   "tonality": "Am",
 *   "chords": ["Am", "Dm", "G"],
 *   "meter": "4/4",
 *   "left": "I",
 *   "right": "X-1-(2,3)-1",
 *   "rhythm_examples": [
 *     { "compositionId": "abc123", "artist": "Bon Jovi", "title": "Always", "section": "Verse", "number": 1, "youtube": "..." },
 *     ...
 *   ]
 * }
 *
 * @throws {Error} В случае ошибок генерации или обращения к базе данных
 */
exports.getGeneratedSequence = async (req, res) => {
  try {
    const {
      progression,
      root,
      sequence,
      rhythm
    } = await genRandSeqAndRythm(db);

    res.status(200).json({
      degrees: progression.degrees,
      progression_examples: progression.examples ?? [],
      tonality: root,
      chords: sequence ?? [],
      meter: rhythm.meter ?? '',
      left: rhythm.left ?? '',
      right: rhythm.right ?? '',
      rhythm_examples: rhythm.examples ?? [],
    });

  } catch (err) {
    console.error('[v1] Sequence generation error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
