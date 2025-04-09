const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// 👉 Получение всех аккордовых прогрессий
exports.getProgressions = functions.https.onRequest(async (req, res) => {
  try {
    const snapshot = await db.collection("progressions").get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (err) {
    console.error("Ошибка при получении progressions:", err);
    res.status(500).send("Ошибка сервера");
  }
});

// 👉 Получение всех ритмических паттернов
exports.getRhythms = functions.https.onRequest(async (req, res) => {
  try {
    const snapshot = await db.collection("rhythms").get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (err) {
    console.error("Ошибка при получении rhythms:", err);
    res.status(500).send("Ошибка сервера");
  }
});
