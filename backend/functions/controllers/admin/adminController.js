const admin = require('firebase-admin');
const db = admin.firestore();

/**
 * Добавляет новую композицию в коллекцию "compositions".
 *
 * @route POST /admin/composition
 * @param {Object} req - HTTP-запрос с телом { id: string, ... }
 * @param {Object} res - HTTP-ответ
 */
exports.addComposition = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('compositions').doc(data.id).set(data);
    console.log('[AdminController] Composition added:', data.id);
    res.status(200).send('Composition added successfully');
  } catch (err) {
    console.error('[AdminController] Failed to add composition:', err);
    res.status(500).send('Failed to add composition');
  }
};

/**
 * Добавляет новую прогрессию в коллекцию "progressions".
 *
 * @route POST /admin/progression
 * @param {Object} req - HTTP-запрос с телом { id: string, ... }
 * @param {Object} res - HTTP-ответ
 */
exports.addProgression = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('progressions').doc(data.id).set(data);
    console.log('[AdminController] Progression added:', data.id);
    res.status(200).send('Progression added successfully');
  } catch (err) {
    console.error('[AdminController] Failed to add progression:', err);
    res.status(500).send('Failed to add progression');
  }
};

/**
 * Добавляет новый ритм в коллекцию "rhythms".
 *
 * @route POST /admin/rhythm
 * @param {Object} req - HTTP-запрос с телом { id: string, ... }
 * @param {Object} res - HTTP-ответ
 */
exports.addRhythm = async (req, res) => {
  try {
    const data = req.body;
    await db.collection('rhythms').doc(data.id).set(data);
    console.log('[AdminController] Rhythm added:', data.id);
    res.status(200).send('Rhythm added successfully');
  } catch (err) {
    console.error('[AdminController] Failed to add rhythm:', err);
    res.status(500).send('Failed to add rhythm');
  }
};

/**
 * Удаляет прогрессию из коллекции "progressions" по ID.
 *
 * @route DELETE /admin/progression
 * @param {Object} req - HTTP-запрос с телом { id: string }
 * @param {Object} res - HTTP-ответ
 */
exports.deleteProgression = async (req, res) => {
  try {
    const { id } = req.body;
    await db.collection('progressions').doc(id).delete();
    console.log('[AdminController] Progression deleted:', id);
    res.status(200).send('Progression deleted successfully');
  } catch (err) {
    console.error('[AdminController] Failed to delete progression:', err);
    res.status(500).send('Failed to delete progression');
  }
};

/**
 * Удаляет ритм из коллекции "rhythms" по ID.
 *
 * @route DELETE /admin/rhythm
 * @param {Object} req - HTTP-запрос с телом { id: string }
 * @param {Object} res - HTTP-ответ
 */
exports.deleteRhythm = async (req, res) => {
  try {
    const { id } = req.body;
    await db.collection('rhythms').doc(id).delete();
    console.log('[AdminController] Rhythm deleted:', id);
    res.status(200).send('Rhythm deleted successfully');
  } catch (err) {
    console.error('[AdminController] Failed to delete rhythm:', err);
    res.status(500).send('Failed to delete rhythm');
  }
};
