const admin = require("firebase-admin");
const db = admin.firestore();

/**
 * Получает все ритмы из коллекции "rhythms" в Firestore.
 *
 * @returns {Promise<Array.<object>>} Массив объектов ритмических рисунков
 *
 * @throws {Error} Если происходит ошибка при запросе к базе данных
 */
exports.getAllRhythms = async () => {
  const snapshot = await db.collection("rhythms").get();
  return snapshot.docs.map(doc => doc.data());
};
