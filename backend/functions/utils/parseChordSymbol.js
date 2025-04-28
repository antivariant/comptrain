/**
 * Разбирает обозначение аккорда на корень и тип аккорда.
 *
 * @param {string} chord - Обозначение аккорда, например "F#m7", "C", "Bbmaj7"
 * @returns {{ root: string, type: string }} Объект с корнем аккорда и его типом
 *
 * @throws {Error} Если аккорд имеет неверный формат
 */
function parseChordSymbol(chord) {
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) {
    throw new Error(`Invalid chord symbol: ${chord}`);
  }
  return {
    root: match[1],
    type: match[2] || ''
  };
}

module.exports = parseChordSymbol;
