const admin = require('firebase-admin');
const genRandSeqAndRythm = require('../../services/genRandSeqAndRythm');

const db = admin.firestore();

/**
 * Генерирует полную случайную секвенцию: прогрессия, тональность, аккорды, ритм и примеры.
 *
 * @route POST /generateSequence
 * @route POST /v1/sequence
 *
 * @param {Object} req - HTTP-запрос (тело запроса не требуется)
 * @param {Object} res - HTTP-ответ
 *
 * @returns {Promise<void>} Отправляет JSON-объект с полными данными:
 * - degrees: строка вида "i-iv-VII"
 * - progression_examples: массив примеров
 * - tonality: корень (например, "Am")
 * - chords: массив аккордов
 * - meter, left, right: данные ритма
 * - rhythm_examples: массив примеров ритма
 *
 * @example
 * {
 *   "degrees": "i-iv-VII",
 *   "progression_examples": [{ "compositionId": "xyz789", ... }],
 *   "tonality": "Am",
 *   "chords": ["Am", "Dm", "G"],
 *   "meter": "4/4",
 *   "left": "I",
 *   "right": "X-1-(2,3)-1",
 *   "rhythm_examples": [{ "compositionId": "abc123", ... }]
 * }
 *
 * @throws {Error} В случае ошибки генерации или Firestore
 */
exports.getGeneratedSequence = async (req, res) => {
  try {
    console.log('[SequenceController] Generating random sequence...');

    const {
      progression,
      root,
      sequence,
      rhythm
    } = await genRandSeqAndRythm(db);

    const result = {
      degrees: progression.degrees,
      progression_examples: progression.examples ?? [],
      tonality: root,
      chords: sequence ?? [],
      meter: rhythm.meter ?? '',
      left: rhythm.left ?? '',
      right: rhythm.right ?? '',
      rhythm_examples: rhythm.examples ?? [],
    };

    console.log('[SequenceController] Success:', JSON.stringify(result));
    res.status(200).json(result);
  } catch (err) {
    console.error('[SequenceController] Generation error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
