/**
 * Вычисляет числовой "вес" ноты для упорядочивания.
 *
 * @param {string} code - Код ноты, например "1", "3#", "5b" или "8" (специальная C)
 * @returns {number} Вес ноты: целое или дробное значение (например, 1, 3.5, 5.5, 8.1)
 *
 * @throws {Error} (не выбрасывается, но некорректные коды получают вес 99)
 */
function noteWeight(code) {
  if (code === '8') return 8.1;
  const match = code.match(/^(\d)(#|b)?$/);
  if (!match) return 99;
  let weight = parseInt(match[1]);
  if (match[2] === '#') weight += 0.5;
  if (match[2] === 'b') weight -= 0.5;
  if (weight > 7.5) weight -= 7;
  return weight;
}

module.exports = noteWeight;
