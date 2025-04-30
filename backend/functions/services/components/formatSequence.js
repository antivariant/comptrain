// File: services/components/formatSequence.js

/**
 * Форматирует массив аккордов в строку или массив строк.
 *
 * @param {Array<{ baseNote: string, chordType: string }>} sequence - Массив аккордов
 * @param {Object} [options] - Опции форматирования
 * @param {string} [options.joiner] - Разделитель между аккордами (если нужно объединить в строку)
 *
 * @returns {string[]|string} Форматированная последовательность
 */
function formatSequence(sequence, options = {}) {
  const { joiner } = options;
  const formatted = sequence.map(({ baseNote, chordType }) => `${baseNote}${chordType}`);
  return joiner ? formatted.join(joiner) : formatted;
}

module.exports = formatSequence;
