const getNotesOfChord = require('./getNotesOfChord');
const sortNotesFromC = require('../utils/sortNotesFromC');
const noteToKey = require('../models/noteToKeyMap');
const parseChordSymbol = require('../utils/parseChordSymbol');

/**
 * Проверяет, относится ли клавиша к ноте C (номер 1 или 8).
 *
 * @param {string} noteCode - Код ноты на клавиатуре
 * @returns {boolean} True, если это нота C
 */
function isNoteC(noteCode) {
  return noteCode === '1' || noteCode === '8';
}

/**
 * Получает базовый номер ноты (без альтерации): 1–7.
 *
 * @param {string} code - Код ноты на клавиатуре
 * @returns {number} Базовый номер ступени аккорда
 */
function noteBase(code) {
  return code === '8' ? 1 : parseInt(code) % 7 || 7;
}

/**
 * Преобразует последовательность аккордов в аппликатуры (позиции нот на миниатюрной клавиатуре).
 *
 * @param {Array.<string>} chords - Список аккордов, например ['C', 'F', 'G'] или ['Am', 'Dm', 'G']
 * @returns {Array.<Array.<{noteCode: string, degree: string, isChanged: boolean}>>} Массив аппликатур для каждого аккорда
 *
 * @throws {Error} Если аккорд некорректный или содержит неизвестные ноты
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

    if (isFirst && sorted.includes('1')) {
      sorted = sorted.map(c => (c === '1' ? '8' : c));
      degreeMap['8'] = degreeMap['1'];
      delete degreeMap['1'];
    }

    const previousC = previous.find(m => isNoteC(m.noteCode));
    const currentCIndex = sorted.findIndex(c => isNoteC(c));

    if (!isFirst && previousC && currentCIndex !== -1) {
      const currentC = sorted[currentCIndex];
      if (currentC !== previousC.noteCode) {
        sorted[currentCIndex] = previousC.noteCode;
        degreeMap[previousC.noteCode] = degreeMap[currentC];
        delete degreeMap[currentC];
      }
    }

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
