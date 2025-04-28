/**
 * Карта соответствия между ступенями аккордов и индексами в прогрессии.
 *
 * @type {Object.<string, number>}
 *
 * @example
 * // Примеры:
 * // "I"  → 0
 * // "vi" → 5
 * // "bVII" → 6
 */
const degreeMap = {
  "I": 0, "II": 1, "III": 2, "IV": 3, "V": 4, "VI": 5, "VII": 6,
  "i": 0, "ii": 1, "iii": 2, "iv": 3, "v": 4, "vi": 5, "vii": 6,
  "bVII": 6,
};

module.exports = degreeMap;
