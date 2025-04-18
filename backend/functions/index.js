const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const { handleGenerateSequence } = require("./controllers/sequenceController");
const {
  addComposition,
  addProgression,
  addRhythm,
} = require("./controllers/adminAddController");

const { getApplicature } = require('./controllers/chordApplicatureController');


exports.generateSequence = functions.https.onRequest(handleGenerateSequence);
exports.addComposition = functions.https.onRequest(addComposition);
exports.addProgression = functions.https.onRequest(addProgression);
exports.addRhythm = functions.https.onRequest(addRhythm);
exports.generateApplicature = functions.https.onRequest(getApplicature);
