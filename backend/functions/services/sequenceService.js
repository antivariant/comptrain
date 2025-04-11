const { getAllProgressions } = require("../models/progressionModel");
const { getAllRhythms } = require("../models/rhythmModel");
const { getRandomScale, degreesToChords } = require("../models/harmonyModel");

const admin = require("firebase-admin");
const db = admin.firestore();

exports.generateSequence = async () => {
  const progressions = await getAllProgressions();
  const rhythms = await getAllRhythms();

  const prog = progressions[Math.floor(Math.random() * progressions.length)];
  const rhythm = rhythms[Math.floor(Math.random() * rhythms.length)];

  const progCompSnap = await db.collection("compositions").doc(prog.composition_id).get();
  const rhythmCompSnap = await db.collection("compositions").doc(rhythm.composition_id).get();

  const progComp = progCompSnap.exists ? progCompSnap.data() : {};
  const rhythmComp = rhythmCompSnap.exists ? rhythmCompSnap.data() : {};

  const { tonality, scale } = getRandomScale(prog.degrees);
  const chords = degreesToChords(prog.degrees, scale, tonality);

  return {
    degrees: prog.degrees,
    tonality,
    chords,
    progression: {
      artist: progComp.artist || "Unknown",
      title: progComp.title || "Unknown",
      section: prog.section_type,
      youtube: progComp.youtube || null
    },
    rhythm: {
      left: rhythm.left,
      right: rhythm.right,
      meter: rhythm.meter,
      artist: rhythmComp.artist || "Unknown",
      title: rhythmComp.title || "Unknown",
      section: rhythm.section_type,
      youtube: rhythmComp.youtube || null
    }
  };
};
