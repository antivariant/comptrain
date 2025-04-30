// File: services/components/parseProgression.js

const chordTypeMap = require('../../models/chordTypeMap');

/**
 * Разбирает строку прогрессии аккордов в массив структурированных объектов.
 *
 * @param {string} progression - строка вида "i-iv-V7"
 * @returns {Array<{ original: string, accidental: string, degree: string, chordType: string }>}
 */
function parseProgression(progression) {
  if (typeof progression !== 'string' || !progression.trim()) {
    throw new Error('Progression must be a non-empty string');
  }

  return progression.split('-').map((original) => {
    let chordType = '';
    let base = original;

    // Находим chordType с конца строки
    for (const key of Object.keys(chordTypeMap).sort((a, b) => b.length - a.length)) {
      if (key && original.endsWith(key)) {
        chordType = key;
        base = original.slice(0, original.length - key.length);
        break;
      }
    }

    // Если ничего не нашли и ступень в нижнем регистре — это минор
    if (!chordType && /^[iv]+$/.test(base)) {
      chordType = 'm';
    }

    // Определяем ступень и знак (слева или справа)
    let accidental = '';
    let degree = base;

    if (base.length > 1 && (base.startsWith('b') || base.startsWith('#'))) {
      accidental = base[0];
      degree = base.slice(1);
    } else if (base.length > 1 && (base.endsWith('b') || base.endsWith('#'))) {
      accidental = base.slice(-1);
      degree = base.slice(0, -1);
    }

    // Валидация chordType
    if (chordType && !chordTypeMap.hasOwnProperty(chordType)) {
      throw new Error(`Unknown chord type: ${chordType}`);
    }

    return { original, accidental, degree, chordType };
  });
}

module.exports = parseProgression;
