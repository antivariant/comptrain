// File: getRandomProgression.js


const { getAllProgressions } = require('../models/progressionModel');

/**
 * Возвращает случайную прогрессию из базы данных.
 *
 * @returns {Promise<{ degrees: string, examples: Array.<object> }>} Прогрессия с полем degrees и примерами
 *
 * @throws {Error} Если в базе данных не найдено прогрессий
 */
async function getRandomProgression() {
  const all = await getAllProgressions();

  if (!all.length) {
    throw new Error("❌ No progressions found in the database");
  }

  const random = all[Math.floor(Math.random() * all.length)];
  return {
    degrees: random.degrees,
    examples: random.examples || [],
  };
}

module.exports = getRandomProgression;
