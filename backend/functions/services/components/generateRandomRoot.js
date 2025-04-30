// File: generateRandomRoot.js


/**
 * Генерирует случайную тонику (root) из ограниченного списка.
 * Используются только популярные тональности, применимые в поп- и рок-музыке.
 *
 * @returns {string} Root note, например: "C", "F#", "Bb"
 */
function genRandomRoot() {
  const popularRoots = [
    'C', 'D', 'E', 'F', 'G', 'A', 'B',     // белые клавиши
    'C#', 'D#', 'F#', 'Eb', 'Bb'           // часто используемые полутона
  ];

  const index = Math.floor(Math.random() * popularRoots.length);
  return popularRoots[index];
}

module.exports = genRandomRoot;
