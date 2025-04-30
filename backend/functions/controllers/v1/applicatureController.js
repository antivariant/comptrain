// File: applicatureController.js


const sequenceToApplicature = require('../../services/sequenceToApplicature');

/**
 * Генерирует аппликатуру по последовательности аккордов.
 *
 * @route POST /v1/applicature
 *
 * @param {Object} req - HTTP-запрос
 * @param {Object} req.body - Тело запроса
 * @param {string[]} req.body.chords - Массив строк аккордов (например, ['C', 'F', 'G'])
 * @param {Object} res - HTTP-ответ
 * 
 * @returns {Promise<void>} Отправляет JSON-массив массивов NoteMarker'ов
 *
 * @example
 * // Вход:
 * { "chords": ["C", "F", "G"] }
 * 
 * // Ответ:
 * [
 *   [ { noteCode: "1", degree: "I", isChanged: true }, ... ],
 *   [ { noteCode: "3#", degree: "III", isChanged: false }, ... ],
 *   ...
 * ]
 *
 * NoteMarker:
 * - noteCode: {string} — код ноты ("1", "3#", "5b")
 * - degree: {"I"|"III"|"V"} — роль ноты в аккорде
 * - isChanged: {boolean} — изменилась ли нота по сравнению с предыдущим аккордом
 *
 * @throws {Error} Если входные данные некорректные или возникает ошибка генерации
 */
exports.getApplicature = (req, res) => {
  const { chords } = req.body;

  console.log('[v1] Incoming chords:', chords);

  if (!Array.isArray(chords)) {
    console.error('[v1] Invalid input: chords must be an array');
    return res.status(400).json({ error: 'Invalid input: chords must be an array' });
  }

  try {
    const applicatureMatrix = sequenceToApplicature(chords);

    const response = applicatureMatrix.map((chordMarkers) =>
      chordMarkers.map((marker) => ({
        noteCode: marker.noteCode ?? '',
        degree: marker.degree ?? '',
        isChanged: !!marker.isChanged,
      }))
    );

    console.log('[v1] Generated applicature:', response);
    res.status(200).json(response);
  } catch (e) {
    console.error('[v1] Applicature generation error:', e);
    res.status(500).json({ error: e.message });
  }
};
