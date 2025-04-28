const admin = require('firebase-admin');
const db = admin.firestore();

/**
 * Получает все прогрессии из коллекции "progressions" в Firestore.
 *
 * @returns {Promise<Array.<object>>} Массив объектов прогрессий
 *
 * @throws {Error} Если происходит ошибка при запросе к базе данных
 */
exports.getAllProgressions = async () => {
  const snapshot = await db.collection("progressions").get();
  return snapshot.docs.map(doc => doc.data());
};
