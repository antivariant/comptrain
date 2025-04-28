const admin = require('firebase-admin');
const db = admin.firestore();

/**
 * Добавляет новую композицию в коллекцию "compositions".
 *
 * @param {Object} req - HTTP-запрос с телом, содержащим данные композиции
 * @param {Object} res - HTTP-ответ
 * @returns {Promise<void>}
 */
exports.addComposition = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('compositions').doc(data.id).set(data);
    res.status(200).send('Composition added successfully');
  } catch (err) {
    console.error('[v1] Failed to add composition:', err);
    res.status(500).send('Failed to add composition');
  }
};

/**
 * Добавляет новую прогрессию в коллекцию "progressions".
 *
 * @param {Object} req - HTTP-запрос с телом, содержащим данные прогрессии
 * @param {Object} res - HTTP-ответ
 * @returns {Promise<void>}
 */
exports.addProgression = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('progressions').doc(data.id).set(data);
    res.status(200).send('Progression added successfully');
  } catch (err) {
    console.error('[v1] Failed to add progression:', err);
    res.status(500).send('Failed to add progression');
  }
};

/**
 * Добавляет новый ритм в коллекцию "rhythms".
 *
 * @param {Object} req - HTTP-запрос с телом, содержащим данные ритма
 * @param {Object} res - HTTP-ответ
 * @returns {Promise<void>}
 */
exports.addRhythm = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('rhythms').doc(data.id).set(data);
    res.status(200).send('Rhythm added successfully');
  } catch (err) {
    console.error('[v1] Failed to add rhythm:', err);
    res.status(500).send('Failed to add rhythm');
  }
};

/**
 * Удаляет прогрессию из коллекции "progressions" по ID.
 *
 * @param {Object} req - HTTP-запрос с телом, содержащим ID прогрессии
 * @param {Object} res - HTTP-ответ
 * @returns {Promise<void>}
 */
exports.deleteProgression = async (req, res) => {
  try {
    const { id } = req.body;
    await db.collection('progressions').doc(id).delete();
    res.status(200).send('Progression deleted successfully');
  } catch (err) {
    console.error('[v1] Failed to delete progression:', err);
    res.status(500).send('Failed to delete progression');
  }
};

/**
 * Удаляет ритм из коллекции "rhythms" по ID.
 *
 * @param {Object} req - HTTP-запрос с телом, содержащим ID ритма
 * @param {Object} res - HTTP-ответ
 * @returns {Promise<void>}
 */
exports.deleteRhythm = async (req, res) => {
  try {
    const { id } = req.body;
    await db.collection('rhythms').doc(id).delete();
    res.status(200).send('Rhythm deleted successfully');
  } catch (err) {
    console.error('[v1] Failed to delete rhythm:', err);
    res.status(500).send('Failed to delete rhythm');
  }
};
