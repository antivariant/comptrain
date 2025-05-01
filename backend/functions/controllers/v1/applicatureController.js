const sequenceToApplicature = require('../../services/sequenceToApplicature');

/**
 * Генерирует аппликатуру по последовательности аккордов.
 *
 * @route POST /generateApplicature
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
 * @throws {Error} Если входные данные некорректны или возникает ошибка генерации
 */
exports.getApplicature = (req, res) => {
  const { chords } = req.body;

  console.log('[ApplicatureController] Incoming chords:', chords);

  // 🔍 Валидация: должен быть массив непустых строк
  if (!Array.isArray(chords)) {
    console.error('[ApplicatureController] Invalid input: chords must be an array');
    return res.status(400).json({ error: 'Invalid input: chords must be an array of strings' });
  }

  const invalidChord = chords.find(ch => typeof ch !== 'string' || !ch.trim());
  if (invalidChord !== undefined) {
    console.error('[ApplicatureController] Invalid chord in array:', invalidChord);
    return res.status(400).json({ error: 'Each chord must be a non-empty string' });
  }

  try {
    const applicatureMatrix = sequenceToApplicature(chords);

    const response = applicatureMatrix.map(chordMarkers =>
      chordMarkers.map(marker => ({
        noteCode: marker.noteCode ?? '',
        degree: marker.degree ?? '',
        isChanged: !!marker.isChanged,
      }))
    );

    console.log('[ApplicatureController] Generated applicature:', JSON.stringify(response));
    res.status(200).json(response);
  } catch (error) {
    console.error('[ApplicatureController] Applicature generation error:', error);
    res.status(500).json({ error: error.message });
  }
};
