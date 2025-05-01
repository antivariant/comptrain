const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// 🔹 V1 Controllers
const progressionV1 = require('./controllers/v1/progressionController');
const applicatureV1 = require('./controllers/v1/applicatureController');
const rhythmV1 = require('./controllers/v1/rhythmController');
const sequenceV1 = require('./controllers/v1/sequenceController');
const fullGenV1 = require('./controllers/v1/fullGenerationController');

// 🔧 Admin Controllers
const adminV1 = require('./controllers/admin/adminController');

// 🔸 MVP-compatible routes (без версии, для поддержки v0.1.0)
app.get('/generateSequence', sequenceV1.getGeneratedSequence);
app.post('/generateApplicature', applicatureV1.getApplicature);

// 🔹 V1 REST API
const v1 = express.Router();

v1.get('/sequence', sequenceV1.getGeneratedSequence);
v1.post('/applicature', applicatureV1.getApplicature);
v1.get('/progression', progressionV1.getRandomProgression);
v1.get('/rhythm', rhythmV1.getRandomRhythm);
v1.post('/full-sequence', fullGenV1.handleGenerateSequence);

// 🔧 Admin API (без версионирования)
const adminApi = express.Router();

adminApi.post('/composition', adminV1.addComposition);
adminApi.post('/progression', adminV1.addProgression);
adminApi.post('/rhythm', adminV1.addRhythm);
adminApi.delete('/progression', adminV1.deleteProgression);
adminApi.delete('/rhythm', adminV1.deleteRhythm);

// 🔗 Подключаем версии
app.use('/v1', v1);
app.use('/admin', adminApi);

// 🔥 Экспорт как Firebase Function
exports.api = functions.https.onRequest(app);
