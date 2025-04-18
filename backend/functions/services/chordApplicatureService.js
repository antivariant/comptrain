const noteToKey = {
  'C': '1', 'C#': '1#', 'Db': '2b',
  'D': '2', 'D#': '2#', 'Eb': '3b',
  'E': '3', 'F': '4', 'F#': '4#', 'Gb': '5b',
  'G': '5', 'G#': '5#', 'Ab': '6b',
  'A': '6', 'A#': '6#', 'Bb': '7b',
  'B': '7',
};

const enharmonicMap = {
  'A#': 'Bb', 'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab',
  'Bb': 'A#', 'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#',
};

const flatFriendlyTonalities = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Dm', 'Gm', 'Cm', 'Fm', 'Bbm', 'Ebm'];

// ⬅ Обновлённый полный хроматический круг с бемолями и диезами
const chromaticScale = [
  'C', 'C#', 'Db', 'D', 'D#', 'Eb',
  'E', 'F', 'F#', 'Gb', 'G', 'G#',
  'Ab', 'A', 'A#', 'Bb', 'B'
];

const chordTypes = {
  '': ['1', '3', '5'],
  'm': ['1', '3b', '5'],
  'dim': ['1', '3b', '5b'],
  'aug': ['1', '3', '5#'],
};

const noteDegreeMap = {
  1: 'I', 3: 'III', 5: 'V', 7: 'VII',
};

function transpose(root, degrees, prefersFlat) {
  const rootIndex = chromaticScale.indexOf(root);
  if (rootIndex === -1) throw new Error(`Unknown root: ${root}`);

  return degrees.map(degree => {
    const match = degree.match(/^(\d)(#|b)?$/);
    if (!match) throw new Error(`Invalid degree: ${degree}`);
    let semitones = degreeToSemitone(+match[1]);
    if (match[2] === '#') semitones += 1;
    if (match[2] === 'b') semitones -= 1;

    let note = chromaticScale[(rootIndex + semitones + chromaticScale.length) % chromaticScale.length];

    if (prefersFlat && enharmonicMap[note]) {
      note = enharmonicMap[note];
    }

    return {
      note,
      degree: noteDegreeMap[+match[1]] || 'I',
    };
  });
}

function degreeToSemitone(step) {
  switch (step) {
    case 1: return 0;
    case 2: return 2;
    case 3: return 4;
    case 4: return 5;
    case 5: return 7;
    case 6: return 9;
    case 7: return 11;
    default: throw new Error(`Unsupported step: ${step}`);
  }
}

function _noteWeight(code) {
  if (code === '8') return 8.1;
  const match = code.match(/^(\d)(#|b)?$/);
  if (!match) return 99;
  let weight = parseInt(match[1]);
  if (match[2] === '#') weight += 0.5;
  if (match[2] === 'b') weight -= 0.5;
  if (weight > 7.5) weight -= 7;
  return weight;
}

function _sortFromC(notes) {
  return [...notes].sort((a, b) => _noteWeight(a) - _noteWeight(b));
}

function generateApplicature(chords) {
  const result = [];
  let previous = [];

  const prefersFlat = chords.some(c =>
    flatFriendlyTonalities.some(t => c.startsWith(t))
  );

  for (const chord of chords) {
    const match = chord.match(/^([A-G]#?b?)(.*)$/);
    if (!match) throw new Error(`Invalid chord: ${chord}`);
    const root = match[1];
    const suffix = match[2] || '';
    const degrees = chordTypes[suffix];
    if (!degrees) throw new Error(`Unknown chord type: ${suffix}`);

    const semitonePairs = transpose(root, degrees, prefersFlat);
    const codesWithDegrees = semitonePairs.map(({ note, degree }) => ({
      code: noteToKey[note],
      degree,
    }));

    const degreeMap = {};
    for (const { code, degree } of codesWithDegrees) {
      degreeMap[code] = degree;
    }

    let rawNotes = codesWithDegrees.map(e => e.code);
    let sorted = _sortFromC(rawNotes);
    const previousCodes = previous.map(m => m.noteCode);
    const indexC = sorted.indexOf('1');
    const hadC = previousCodes.includes('1') || previousCodes.includes('8');
    const isFirstChord = previous.length === 0;

    if (isFirstChord && sorted.includes('1')) {
      const i = sorted.indexOf('1');
      sorted.splice(i, 1);
      sorted.push('8');
      degreeMap['8'] = degreeMap['1'];
      delete degreeMap['1'];
    }

    if (indexC !== -1 && !hadC) {
      const prevLeft = previousCodes[0];
      const prevRight = previousCodes[previousCodes.length - 1];
      const leftChanged = prevLeft && !rawNotes.includes(prevLeft) && prevLeft !== '8';
      const rightChanged = prevRight && !rawNotes.includes(prevRight) && prevRight !== '8';
      if (rightChanged || (leftChanged && rightChanged)) {
        sorted.splice(indexC, 1);
        sorted.push('8');
        degreeMap['8'] = degreeMap['1'];
        delete degreeMap['1'];
      }
    }

    sorted = _sortFromC(sorted);

    const markers = sorted.map(note => ({
      noteCode: note,
      degree: degreeMap[note],
      isChanged: !previousCodes.includes(note),
    }));

    result.push(markers);
    previous = markers;
  }

  return result;
}

module.exports = { generateApplicature };
