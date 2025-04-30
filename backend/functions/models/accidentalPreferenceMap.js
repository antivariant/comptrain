// File: accidentalPreferenceMap.js


/**
 * @module accidentalPreferenceMap
 *
 * Карта предпочтений записи знаков для аккордов:
 * выбирает использование диеза ("sharp") или бемоля ("flat") для отображения нот аккорда.
 *
 * @type {Object.<string, string>}
 */
module.exports = {
  '': 'sharp',      // major
  'm': 'flat',      // minor
  '7': 'sharp',
  'maj7': 'sharp',
  'm7': 'flat',
  'dim': 'flat',
  'dim7': 'flat',
  'mMaj7': 'flat',
  'aug': 'sharp',
};
