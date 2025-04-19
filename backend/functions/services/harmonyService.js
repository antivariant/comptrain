
const chromaticScale = [
    "C", "C#", "D", "D#", "E", "F",
    "F#", "G", "G#", "A", "A#", "B"
  ];
  
  const enharmonicMap = {
    "C#": "Db", "D#": "Eb", "F#": "Gb",
    "G#": "Ab", "A#": "Bb",
    "Db": "C#", "Eb": "D#", "Gb": "F#",
    "Ab": "G#", "Bb": "A#"
  };
  
  const flatFriendlyKeys = [
    "F", "Bb", "Eb", "Ab", "Db", "Gb",
    "Dm", "Gm", "Cm", "Fm", "Bbm", "Ebm"
  ];
  
  const baseScales = {
    "C": "C", "G": "G", "D": "D", "A": "A", "E": "E", "F": "F", "B": "B",
    "Am": "A", "Em": "E", "Dm": "D", "Bm": "B", "F#m": "F#", "Cm": "C",
    "Gm": "G", "Bbm": "Bb", "Ebm": "Eb"
  };
  
  const degreeSemitoneMap = {
    "I": 0, "II": 2, "III": 4, "IV": 5,
    "V": 7, "VI": 9, "VII": 11,
    "i": 0, "ii": 2, "iii": 4, "iv": 5,
    "v": 7, "vi": 9, "vii": 11
  };
  
  const normalizeNote = (note) => enharmonicMap[note] || note;
  
  const getRandomTonalityForDegrees = (degreesStr) => {
    const firstDegree = degreesStr.trim().split("-")[0];
    const isMinor = firstDegree === firstDegree.toLowerCase();
    const all = Object.keys(baseScales);
    const candidates = all.filter(t => (isMinor ? t.endsWith("m") : !t.endsWith("m")));
    return candidates[Math.floor(Math.random() * candidates.length)];
  };
  
  const transposeDegreesToChords = (degreesStr, tonality) => {
    const tonic = baseScales[tonality];
    if (!tonic) throw new Error(`Unknown tonality: ${tonality}`);
  
    const tonicIndex = chromaticScale.indexOf(normalizeNote(tonic));
    if (tonicIndex === -1) throw new Error(`Invalid tonic note: ${tonic}`);
  
    const prefersFlat = flatFriendlyKeys.includes(tonality);
  
    return degreesStr.split("-").map(degree => {
      const accidentalOffset =
        degree.includes("b") ? -1 : degree.includes("#") ? 1 : 0;
  
      const baseDegree = degree.replace(/[^A-Za-z]/g, "");
      const isMinorChord = degree === degree.toLowerCase();
  
      const baseSemitone = degreeSemitoneMap[baseDegree];
      if (baseSemitone === undefined)
        throw new Error(`Invalid degree: ${degree}`);
  
      const absoluteSemitone =
        (tonicIndex + baseSemitone + accidentalOffset + 12) % 12;
  
      let note = chromaticScale[absoluteSemitone];
  
      // 🔁 flat-friendly keys: use flat names if available
      if (prefersFlat && enharmonicMap[note]) {
        note = enharmonicMap[note];
      }
  
      return isMinorChord ? `${note}m` : note;
    });
  };
  
  module.exports = {
    getRandomTonalityForDegrees,
    transposeDegreesToChords,
  };
  