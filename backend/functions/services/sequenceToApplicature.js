// File: sequenceToApplicature.js
const getNotesOfChord = require('./getNotesOfChord');
const sortNotesFromC = require('../utils/sortNotesFromC');
const noteToKey = require('../models/noteToKeyMap');
const parseChordSymbol = require('../utils/parseChordSymbol');

/**
 * Проверяет, относится ли клавиша к ноте C (номер 1 или 8).
 * @param {string} noteCode
 * @returns {boolean}
 */
function isNoteC(noteCode) {
  return noteCode === '1' || noteCode === '8';
}

/**
 * Преобразует последовательность аккордов в аппликатуры (позиции нот на миниатюрной клавиатуре).
 * @param {Array.<string>} chords
 * @returns {Array.<Array.<{noteCode: string, degree: string, isChanged: boolean}>>}
 */
function sequenceToApplicature(chords) {
  const result = [];
  let previous = [];

  const chordEntries = chords.map((chord) => {
    const { root, type } = parseChordSymbol(chord);
    const notes = getNotesOfChord(chord);
    return { chord, root, type, notes };
  });

  for (let i = 0; i < chordEntries.length; i++) {
    const { chord, notes } = chordEntries[i];
    const codesWithDegrees = notes.map((note, idx) => ({
      code: noteToKey[note],
      degree: ['I', 'III', 'V', 'VII', 'IX'][idx] || '?',
    }));

    const degreeMap = {};
    for (const { code, degree } of codesWithDegrees) {
      degreeMap[code] = degree;
    }

    let rawNotes = codesWithDegrees.map(e => e.code);
    let sorted = sortNotesFromC(rawNotes);
    const previousCodes = previous.map(m => m.noteCode);
    const isFirst = i === 0;

    // ✅ Правило: для первого аккорда — всегда использовать C = 8
    if (isFirst && sorted.includes('1')) {
      sorted = sorted.map(c => (c === '1' ? '8' : c));
      degreeMap['8'] = degreeMap['1'];
      delete degreeMap['1'];
    }

    // ✅ Правило: для остальных — выбор позиции C на основе крайних нот
    if (!isFirst && (sorted.includes('1') || sorted.includes('8'))) {
      const currentWithoutC = sorted.filter(c => !isNoteC(c)).map(Number);
      const previousWithoutC = previous
        .filter(m => !isNoteC(m.noteCode))
        .map(m => Number(m.noteCode));

      const prevMin = Math.min(...previousWithoutC);
      const prevMax = Math.max(...previousWithoutC);
      const currMin = Math.min(...currentWithoutC);
      const currMax = Math.max(...currentWithoutC);

      let chosenC = '8'; // по умолчанию — правая C

      if (currMin === prevMin) {
        chosenC = '8'; // совпала левая граница — выбираем C справа
      } else if (currMax === prevMax) {
        chosenC = '1'; // совпала правая граница — выбираем C слева
      }

      // заменим текущую C на выбранную (если отличается)
      sorted = sorted.map(c => (isNoteC(c) && c !== chosenC ? chosenC : c));

      if (chosenC === '8') {
        degreeMap['8'] = degreeMap['1'] || degreeMap['8'];
        delete degreeMap['1'];
      } else {
        degreeMap['1'] = degreeMap['8'] || degreeMap['1'];
        delete degreeMap['8'];
      }
    }

    // финальная сортировка после возможной замены C
    sorted = sortNotesFromC(sorted);

    const markers = sorted.map(code => ({
      noteCode: code,
      degree: degreeMap[code],
      isChanged: !previousCodes.includes(code),
    }));

    result.push(markers);
    previous = markers;
  }

  return result;
}

module.exports = sequenceToApplicature;
