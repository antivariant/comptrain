const { getAllRhythms } = require('../models/rhythmModel');

/**
 * Возвращает случайный ритм из базы данных.
 *
 * @returns {Promise<{
 *   meter: string,
 *   left: string,
 *   right: string,
 *   examples: Array.<object>
 * }>} Объект с размером такта, рисунками рук и примерами
 *
 * @throws {Error} Если в базе данных нет ритмов
 */
const getRandomRhythm = async () => {
  const all = await getAllRhythms();

  if (!all.length) {
    throw new Error("❌ Нет ритмов в базе");
  }

  const random = all[Math.floor(Math.random() * all.length)];
  return {
    meter: random.meter,
    left: random.left,
    right: random.right,
    examples: random.examples || [],
  };
};

module.exports = getRandomRhythm;
