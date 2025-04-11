const scales = {
    "Am":  ["Am", "Bm♭5", "C", "Dm", "Em", "F", "G"],
    "Em":  ["Em", "F#dim", "G", "Am", "Bm", "C", "D"],
    "G":   ["G", "Am", "Bm", "C", "D", "Em", "F#dim"],
    "D":   ["D", "Em", "F#m", "G", "A", "Bm", "C#dim"],
    "Bm":  ["Bm", "C#dim", "D", "Em", "F#m", "G", "A"],
    "F#m": ["F#m", "G#dim", "A", "Bm", "C#m", "D", "E"],
    "E":   ["E", "F#m", "G#m", "A", "B", "C#m", "D#dim"],
    "Eb":  ["Eb", "Fm", "Gm", "Ab", "Bb", "Cm", "Ddim"],
  };
  
  const degreeMap = {
    "I": 0, "II": 1, "III": 2, "IV": 3, "V": 4, "VI": 5, "VII": 6,
    "i": 0, "ii": 1, "iii": 2, "iv": 3, "v": 4, "vi": 5, "vii": 6,
    "bVII": 6,
  };
  
  const majorKeys = ["C", "D", "E", "F", "G", "A", "B", "Eb"];
  const minorKeys = ["Am", "Em", "Gm", "Bm", "F#m", "Dm", "Fm", "Cm"];
  
  exports.getRandomScale = (progressionDegrees) => {
    const isMajor = progressionDegrees.trim().startsWith("I");
    const candidates = isMajor ? majorKeys : minorKeys;
  
    // 🔐 Выбираем только те тональности, которые реально описаны в scales
    const available = candidates.filter(key => scales[key]);
    const tonality = available[Math.floor(Math.random() * available.length)];
  
    return { tonality, scale: scales[tonality] };
  };
  
  
  
  exports.degreesToChords = (degreesStr, scale, tonality) => {
    if (!scale || !Array.isArray(scale)) {
      console.warn(`⚠️ Невалидная тональность: ${tonality}`);
      return ["INVALID_SCALE"];
    }
  
    const isMinorKey = tonality.endsWith("m");
    const degrees = degreesStr.split("-").map(d => d.trim());
  
    return degrees.map(deg => {
      // Специальная обработка bVII
      if (deg === "bVII") {
        const known = {
          "G": "F", "D": "C", "C": "Bb", "A": "G",
          "E": "D", "F": "Eb", "B": "A", "Eb": "Db"
        };
        return known[tonality] || scale[5];
      }
  
      let idx;
      if (deg.includes("b")) {
        const base = deg.replace("b", "");
        idx = (degreeMap[base.toUpperCase()] || 0) - 1;
      } else {
        idx = degreeMap[deg] || 0;
      }
  
      let chord = scale[(idx + scale.length) % scale.length];
  
      // ⚠️ Если минорная тональность и ступень V — делаем мажор
      if (isMinorKey && deg === "V" && chord.endsWith("m")) {
        chord = chord.replace(/m$/, ""); // Bm → B
      }
  
      return chord;
    });
  };
    
