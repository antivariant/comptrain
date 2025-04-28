const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// 🔹 V1 Controllers
const progressionV1 = require('./controllers/v1/progressionController');
const applicatureV1 = require('./controllers/v1/applicatureController');
const rhythmV1 = require('./controllers/v1/rhythmController');
const sequenceV1 = require('./controllers/v1/sequenceController');
const fullGenV1 = require('./controllers/v1/fullGenerationController');
const adminV1 = require('./controllers/admin/adminController');

// 🔸 MVP endpoints (remain accessible without version suffix)
exports.generateSequence = functions.https.onRequest(sequenceV1.getGeneratedSequence);
exports.generateApplicature = functions.https.onRequest(applicatureV1.getApplicature);


// 🔹 V1 endpoints
exports.v1_generateSequence = functions.https.onRequest(sequenceV1.getGeneratedSequence);
exports.v1_getApplicature = functions.https.onRequest(applicatureV1.getApplicature);
exports.v1_getRandomProgression = functions.https.onRequest(progressionV1.getRandomProgression);
exports.v1_getRandomRhythm = functions.https.onRequest(rhythmV1.getRandomRhythm);
exports.v1_getFullSequence = functions.https.onRequest(fullGenV1.handleGenerateSequence);

// 🔧 Admin endpoints (non-versioned)
exports.addComposition = functions.https.onRequest(adminV1.addComposition);
exports.addProgression = functions.https.onRequest(adminV1.addProgression);
exports.addRhythm = functions.https.onRequest(adminV1.addRhythm);
exports.deleteProgression = functions.https.onRequest(adminV1.deleteProgression);
exports.deleteRhythm = functions.https.onRequest(adminV1.deleteRhythm);
