// File: sortNotesFromC.js


const noteWeight = require('./noteWeight');

/**
 * Сортирует список кодов нот по возрастанию веса относительно ноты C.
 *
 * @param {Array.<string>} notes - Массив кодов нот, например ["5", "1", "3#"]
 * @returns {Array.<string>} Отсортированный массив кодов нот
 */
function sortNotesFromC(notes) {
  return [...notes].sort((a, b) => noteWeight(a) - noteWeight(b));
}

module.exports = sortNotesFromC;
