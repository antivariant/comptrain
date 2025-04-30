// File: services/adjustSequenceToTonality.js

/**
 * Карта соответствия между диезами и бемолями для энгармонической замены
 * @type {Object.<string,string>}
 */
const enharmonicMap = {
  'C#': 'Db', 'Db': 'C#',
  'D#': 'Eb', 'Eb': 'D#',
  'F#': 'Gb', 'Gb': 'F#',
  'G#': 'Ab', 'Ab': 'G#',
  'A#': 'Bb', 'Bb': 'A#',
};

/**
 * Определяет, стоит ли в данной тональности использовать диезы.
 *
 * @param {string|null|undefined} tonality — Тональность, например "C", "Bb" или null/undefined
 * @returns {boolean}
 */
function shouldPreferSharps(tonality) {
  const flatKeys = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];
  return typeof tonality === 'string' && !flatKeys.includes(tonality);
}

/**
 * Корректирует массив аккордов по тональности.
 *
 * @param {Array.<{ baseNote: string, chordType: string, degree: string }>} sequence
 * @param {string} [tonality]
 * @returns {Array.<{ baseNote: string, chordType: string, degree: string }>}
 *
 * @throws {Error} При некорректном входе:
 *   • sequence не массив
 *   • шаг без полей baseNote/chordType/degree
 *   • explicit-тональность не строка
 */
function adjustSequenceToTonality(sequence, tonality) {
  if (!Array.isArray(sequence)) {
    throw new Error('sequence must be an array');
  }
  if (sequence.length === 0) {
    return [];
  }

  // Валидация шагов
  sequence.forEach((step, i) => {
    if (
      !step ||
      typeof step.baseNote  !== 'string' ||
      typeof step.chordType !== 'string' ||
      typeof step.degree    !== 'string'
    ) {
      throw new Error(`Invalid sequence step at index ${i}`);
    }
  });

  // Определяем режим
  const explicit = tonality != null && tonality !== '';
  if (explicit && typeof tonality !== 'string') {
    throw new Error('tonality must be a string');
  }

  // Вычисляем preferSharp
  let preferSharp;
  if (explicit) {
    preferSharp = shouldPreferSharps(tonality);
  } else {
    const tonicStep = sequence.find(s => s.degree === 'I' || s.degree === 'i');
    const key = tonicStep ? tonicStep.baseNote : null;
    preferSharp = shouldPreferSharps(key);
  }

  // Применяем маппинг
  return sequence.map(({ baseNote, chordType, degree }) => {
    let note = baseNote;

    if (explicit) {
      // полный обмен всех accidentals
      if (enharmonicMap[note]) {
        note = enharmonicMap[note];
      }
    } else if (preferSharp) {
      // sharp-режим: только b → #
      if (note.includes('b') && enharmonicMap[note]) {
        note = enharmonicMap[note];
      }
    } else {
      // flat-режим: только # → b
      if (note.includes('#') && enharmonicMap[note]) {
        note = enharmonicMap[note];
      }
    }

    return { baseNote: note, chordType, degree };
  });
}

module.exports = adjustSequenceToTonality;
