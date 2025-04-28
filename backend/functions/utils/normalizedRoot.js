const enharmonicMap = require('../models/enharmonicMap');
const accidentalPreferenceMap = require('../models/accidentalPreferenceMap');

/**
 * Возвращает нормализованный корень аккорда в соответствии с предпочтением записи (диезы или бемоли).
 *
 * @param {string} root - Корневая нота аккорда, например "Bb" или "A#"
 * @param {string} type - Тип аккорда, например "m", "7" или "" (мажор)
 * @returns {string} Нормализованная нота аккорда, например "A#" или "Bb"
 *
 * @throws {Error} Если root невалидный (в коде фактически не проверяется, но можно добавить для будущего)
 */
function normalizedRoot(root, type) {
  const prefersFlat = accidentalPreferenceMap[type] === 'flat';

  if (!prefersFlat && enharmonicMap[root]) {
    // Если предпочитаются диезы и нота бемольная — заменить на диез
    return enharmonicMap[root];
  }

  if (prefersFlat) {
    const entry = Object.entries(enharmonicMap).find(([, sharp]) => sharp === root);
    if (entry) return entry[0]; // A# → Bb
  }

  return root;
}

module.exports = normalizedRoot;
